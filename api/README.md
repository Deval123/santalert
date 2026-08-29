# Sant'alert — API (backend reconstruit)

Backend PHP de l'app `../app`. Un fichier `.php` par endpoint, socle commun
`_bootstrap.php` (CORS + JSON + PDO préparé). Contrats JSON **identiques** à
l'ancien backend `devdb` (2018) : le front n'a rien à changer.

## Prérequis (déjà installés sur cette machine)

- PHP 8.4 (`/opt/homebrew/bin/php`)
- MySQL 8.0 (serveur en cours d'exécution)

## Installation (une fois)

```bash
cd /Users/devalere/IdeaProjects/santalert/api

# 1. Base + utilisateur dédié (demande le mot de passe root MySQL)
mysql -u root -p < schema/000_create_db.sql

# 2. Config : copier .env.example -> .env (valeurs par défaut OK avec l'étape 1)
cp .env.example .env

# 3. Schéma
mysql -u santalert -psantalert santalert < schema/001_schema.sql
mysql -u santalert -psantalert santalert < schema/002_remaining_domains.sql

# 4. Données de test
php schema/seed.php
```

### Comptes de test (mot de passe = identifiant)

| Rôle | login | mot de passe |
|---|---|---|
| Patient | `deval` | `deval` |
| Personnel (médecin) | `medecin1` | `medecin1` |
| Personnel (pharmacien) | `pharma1` | `pharma1` |
| Personnel (laborantin) | `labo1` | `labo1` |
| Admin | `admin` | `admin` |
| Code établissement | `hpdeido` | — |

## Lancer le serveur

```bash
cd /Users/devalere/IdeaProjects/santalert/api
php -S localhost:8000 -t .
```

Le front (`../app/src/environments/environment.ts`) pointe sur
`http://localhost:8000`.

## Test rapide

```bash
curl -s -XPOST localhost:8000/login.php -H 'Content-Type: application/json' \
  -d '{"username":"deval","password":"deval"}'
# -> "Your Login success"

curl -s -XPOST localhost:8000/showPays.php -d '{}'
# -> {"server_response":[{"id":1,"pays":"Cameroun",...}]}
```

## Contrats (rappel)

| Endpoint | Body | Réponse |
|---|---|---|
| `login.php` | `{username,password}` | `"Your Login success"` \| autre |
| `loginPersonel.php` | `{nom,password}` | `"Your Login success"` \| `"Pharmacien"` \| `"laborentin"` \| autre |
| `loginAdmin.php` | `{login,password}` | `"Your Login success"` \| autre |
| `register.php` | `{username,password,firstname,mobile,email,...}` | `"Registration successfull"` \| `"Error: ..."` |
| `registerAdmin.php` | `{login,password,description,email,telephone,gender}` | `"Registration successfull"` \| `"Error: ..."` |
| `insertPersonnel.php` | `{nom,matricule,telephone,emailpers,type_personnel,passwordpers,code}` | `"Registration successfull"` \| `"don't exist"` |
| `countEts.php` | `{code}` | `"Exist"` \| autre |
| `show_users.php` | `{nom,password}` | `{server_response:[patient]}` |
| `showPatients.php` | — | `{server_response:[patients]}` |
| `editPatients.php` | `{id,new<Col>...}` | `"data update successfull"` |
| `rechecherPatients.php` | `{nom}` | `{server_response:[...]}` |
| `showPersonel.php` | `{username,password}` | `{personel:[...],etablissement:[...]}` |
| `editPersonel.php` | `{id,newnom,newmatricule,...}` | `"data update successfull"` |
| `showAdmin.php` | — | `{server_response:[admins]}` |
| `showPays.php` | — | `{server_response:[pays]}` |

## Ajouter un endpoint (lots suivants)

1. Lire la page front appelante (`../src/pages/<x>/<x>.ts`) : payload envoyé
   (`data = {...}`) et champs lus dans la réponse (`res.xxx`).
2. Si l'entité concernée est encore « minimale » dans `schema/001_schema.sql`,
   `ALTER TABLE` pour ajouter les colonnes (= les clés du payload).
3. Créer `<endpoint>.php` : `require __DIR__.'/_bootstrap.php';` puis `$in = input();`,
   requêtes via `$pdo->prepare()`, `reply(...)` / `reply_rows(...)`.
4. Retirer la route `/pending/<x>` correspondante dans `../app` quand la page est portée.

Reste à faire : rdv, grossesse (suivi détaillé), upload photo (caméra web),
`aksi_*` héritées. Fait : bilan, regime, param-regime, soins (auto_med),
agenda patients, maladie chronique, consultation, hospitalisation, examen,
visite, vaccin, pharmacie, recommandation, infos-urgence, parametres,
etablissement (`insertEts` / `showEts`), departement, ordonnance / traitement /
auscultation.

### Lot « domaines restants » (`schema/002_remaining_domains.sql`)

- `showParamRegime.php` | `{id}` (regime_id) | `{server_response:[relevés]}`
- `insertParamRegime.php` | `{regime_id, dateParam, poids, temperature, tension, observation}` | `"Successfull"`
- `editParamRegime.php` | `{id, new<Col>...}` | `"data update successfull"`
- `deleteParamRegime.php` | `{id}` | `"data deleted successfully"`
- `showDepartement.php` | `{code?}` | `{server_response:[départements]}`
- `insertDepartement.php` | `{nom, description, code}` | `"Successfull"`
- `deleteDepartement.php` | `{id}` | `"data deleted successfully"`
- `insertEts.php` | `{statut, nom, code, telephone, email, type, adresse, ville}` | `"Registration successfull"` \| `"Error: ..."`
- `showEts.php` | — | `{server_response:[établissements]}`
