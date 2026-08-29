<?php
/**
 * Données de test. À lancer une fois le schéma chargé :
 *   php api/schema/seed.php
 * Idempotent : vide puis re-remplit les tables de référence + comptes de test.
 *
 * Comptes créés (mot de passe en clair -> haché en base) :
 *   patient   nom="deval"        password="deval"
 *   personnel nom="medecin1"     password="medecin1"   (type_personnel=medecin)
 *   personnel nom="pharma1"      password="pharma1"     (type_personnel=Pharmacien)
 *   personnel nom="labo1"        password="labo1"       (type_personnel=laborentin)
 *   admin     login="admin"      password="admin"
 *   etablissement code="hpdeido"
 */

require __DIR__ . '/../db.php';          // -> $pdo
require __DIR__ . '/../lib/auth.php';

function reset_table(PDO $pdo, string $t): void
{
    $pdo->exec("DELETE FROM `$t`");
    $pdo->exec("ALTER TABLE `$t` AUTO_INCREMENT = 1");
}

$pdo->exec('SET foreign_key_checks = 0');
foreach (['patients', 'users', 'personel_ets', 'etablissement', 'admin', 'pays', 'regions', 'departement', 'city', 'pharmacie'] as $t) {
    reset_table($pdo, $t);
}

// --- Établissement ---
$pdo->prepare(
    'INSERT INTO etablissement (statut, nom, code, telephone, email, type, adresse, ville)
     VALUES (?,?,?,?,?,?,?,?)'
)->execute(['actif', 'Hôpital de District Deido', 'hpdeido', '233000000', 'contact@hpdeido.cm', 'hopital', 'Rue 1', 'Douala']);
$etsId = (int) $pdo->lastInsertId();

// --- Patient de test ---
$pdo->prepare(
    'INSERT INTO patients (nom, password, prenom, telephone, email, country, groupeSanguin, rhesus, allergie)
     VALUES (?,?,?,?,?,?,?,?,?)'
)->execute(['deval', password_hash_value('deval'), 'Valere', '676467228', 'deval@gmail.com', 'Cameroun', 'O', '+', 'Aucune connue']);

// --- users (héritage fetch_data2.php) ---
$pdo->prepare('INSERT INTO users (username, password, telephone, email) VALUES (?,?,?,?)')
    ->execute(['deval', password_hash_value('deval'), '676467228', 'deval@gmail.com']);

// --- Personnel médical ---
$staff = [
    ['medecin1', 'medecin1', 'MAT-001', 'medecin1@hpdeido.cm', 'medecin'],
    ['pharma1',  'pharma1',  'MAT-002', 'pharma1@hpdeido.cm',  'Pharmacien'],
    ['labo1',    'labo1',    'MAT-003', 'labo1@hpdeido.cm',    'laborentin'],
];
$stmt = $pdo->prepare(
    'INSERT INTO personel_ets (nom, password, matricule, telephone, email, type_personnel, etablissement_id)
     VALUES (?,?,?,?,?,?,?)'
);
foreach ($staff as [$nom, $pass, $mat, $mail, $type]) {
    $stmt->execute([$nom, password_hash_value($pass), $mat, '233000000', $mail, $type, $etsId]);
}

// --- Admin ---
$pdo->prepare('INSERT INTO admin (nom, login, password) VALUES (?,?,?)')
    ->execute(['Administrateur', 'admin', password_hash_value('admin')]);

// --- Pays ---
$stmt = $pdo->prepare('INSERT INTO pays (pays, capitale) VALUES (?,?)');
foreach ([
    ['Cameroun', 'Yaoundé'], ['France', 'Paris'], ['Sénégal', 'Dakar'],
    ["Côte d'Ivoire", 'Yamoussoukro'], ['Canada', 'Ottawa'],
] as [$p, $c]) {
    $stmt->execute([$p, $c]);
}

// --- Géo + pharmacies (pour showAllPharmacie.php / showAllPhamarcie.php) ---
$pdo->prepare('INSERT INTO regions (name) VALUES (?)')->execute(['Littoral']);
$regId = (int) $pdo->lastInsertId();
$pdo->prepare('INSERT INTO departement (name, regions_id) VALUES (?,?)')->execute(['Wouri', $regId]);
$depId = (int) $pdo->lastInsertId();

$cityStmt = $pdo->prepare('INSERT INTO city (name, departement_id) VALUES (?,?)');
$cityIds = [];
foreach (['Douala', 'Yaoundé', 'Bafoussam'] as $city) {
    $cityStmt->execute([$city, $depId]);
    $cityIds[$city] = (int) $pdo->lastInsertId();
}

$phStmt = $pdo->prepare(
    'INSERT INTO pharmacie (nom, localisation, tel, heure_ouverture, heure_fermeture, city_id, deGarde)
     VALUES (?,?,?,?,?,?,?)'
);
foreach ([
    ['Pharmacie de la Cité', 'Akwa', '233111111', '00:00', '23:59', 'Douala', 1],
    ['Pharmacie du Soleil', 'Bonabéri', '233222222', '00:00', '23:59', 'Douala', 1],
    ['Pharmacie Centrale', 'Bali', '233333333', '08:00', '20:00', 'Douala', 0],
    ['Pharmacie du Centre', 'Centre-ville', '242000001', '00:00', '23:59', 'Yaoundé', 1],
    ['Pharmacie Bastos', 'Bastos', '242000002', '08:00', '19:00', 'Yaoundé', 0],
    ['Pharmacie de la Gare', 'Gare routière', '233000003', '00:00', '23:59', 'Bafoussam', 1],
] as [$n, $loc, $tel, $ho, $hf, $city, $g]) {
    $phStmt->execute([$n, $loc, $tel, $ho, $hf, $cityIds[$city], $g]);
}

// --- Recommandations (liste globale, lecture seule) ---
reset_table($pdo, 'recommandation');
$stmt = $pdo->prepare('INSERT INTO recommandation (categorie, contenu) VALUES (?,?)');
foreach ([
    ['Nutrition', 'Limiter le sel à moins de 5 g par jour et privilégier fruits et légumes.'],
    ['Activité physique', 'Au moins 30 minutes de marche rapide, 5 jours par semaine.'],
    ['Suivi médical', 'Contrôler sa tension au moins une fois par mois.'],
    ['Hydratation', "Boire 1,5 à 2 litres d'eau par jour, davantage en cas de forte chaleur."],
] as [$c, $t]) {
    $stmt->execute([$c, $t]);
}

// --- Départements / services de l'établissement de test ---
reset_table($pdo, 'departement_geo');
$stmt = $pdo->prepare(
    'INSERT INTO departement_geo (nom, description, code, etablissement_id) VALUES (?,?,?,?)'
);
foreach ([
    ['Cardiologie', 'Consultations et explorations cardiovasculaires.'],
    ['Pédiatrie', 'Suivi et soins des enfants.'],
    ['Laboratoire', 'Analyses biologiques et examens.'],
] as [$nom, $desc]) {
    $stmt->execute([$nom, $desc, 'hpdeido', $etsId]);
}

$pdo->exec('SET foreign_key_checks = 1');

echo "Seed OK :\n";
foreach (['patients', 'personel_ets', 'etablissement', 'admin', 'pays', 'pharmacie'] as $t) {
    echo sprintf("  %-16s %d\n", $t, $pdo->query("SELECT COUNT(*) FROM `$t`")->fetchColumn());
}
