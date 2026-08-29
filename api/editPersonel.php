<?php
/**
 * editPersonel.php — mise à jour d'une fiche personnel.
 * Body: {id, newnom, newmatricule, newtelephone, newemail, newtype_personnel}
 * Réponse: "data update successfull" | "Error: ..."
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$id = (int) field($in, 'id', 0);
if ($id <= 0) {
    reply('Error: missing personel id');
}

$columns = ['nom', 'matricule', 'telephone', 'email', 'type_personnel'];
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
    reply('data update successfull');
}

$params[] = $id;
$pdo->prepare('UPDATE personel_ets SET ' . implode(', ', $set) . ' WHERE id = ?')->execute($params);

reply('data update successfull');
