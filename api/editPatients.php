<?php
/**
 * editPatients.php — mise à jour d'une fiche patient.
 * Body: {id, new<Champ>: valeur, ...}  (ex: newnom, newprenom, newtelephone, ...)
 * Réponse: "data update successfull" | "Error: ..."
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$id = (int) field($in, 'id', 0);
if ($id <= 0) {
    reply('Error: missing patient id');
}

// Colonnes modifiables (le front envoie "new" + nom de colonne).
$columns = [
    'nom', 'prenom', 'telephone', 'email', 'anneeNais', 'lieuNais', 'profession', 'filename',
    'lieuService', 'telBureau', 'residencePrincipal', 'residenceSecondaire',
    'nomPere', 'telPere', 'emailPere', 'professionPere', 'quartierPere', 'ruePere',
    'nomMere', 'telMere', 'emailMere', 'professionMere', 'quartierMere', 'rueMere',
    'nomTuteur', 'telTuteur', 'emailTuteur', 'professionTuteur', 'quartierTuteur', 'rueTuteur',
    'proche1', 'tel_proche1', 'emailProche1', 'residenceProche1', 'professionProche1',
    'proche2', 'tel_proche2', 'emailProche2', 'residenceProche2', 'professionProche2',
    'proche3', 'tel_proche3', 'emailProche3', 'residenceProche3', 'professionProche3',
    'groupeSanguin', 'rhesus', 'allergie', 'incapacite', 'medecinFamille', 'assurance',
    'observationPhisyque', 'signeParticulier',
];

$set = [];
$params = [];
foreach ($columns as $col) {
    $key = 'new' . $col;
    if (isset($in->$key) && $in->$key !== null && $in->$key !== '') {
        $set[] = "`$col` = ?";
        $params[] = (string) $in->$key;
    }
}

if (!$set) {
    reply('data update successfull'); // rien à modifier -> on considère OK
}

$params[] = $id;
$sql = 'UPDATE patients SET ' . implode(', ', $set) . ' WHERE id = ?';
$pdo->prepare($sql)->execute($params);

reply('data update successfull');
