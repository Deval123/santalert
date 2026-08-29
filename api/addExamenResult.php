<?php
/**
 * addExamenResult.php — le laboratoire renseigne le résultat d'un examen.
 * Body: {id | examen_id, resultat, image?}
 * Réponse: "data update successfull" | "Error: ..."
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$id = (int) (field($in, 'id', 0) ?: field($in, 'examen_id', 0));
if ($id <= 0) {
    reply('Error: missing examen id');
}

$set = ['`resultat` = ?', '`date_resultat` = ?'];
$params = [(string) field($in, 'resultat', ''), date('Y-m-d H:i:s')];
if (field($in, 'image')) {
    $set[] = '`image` = ?';
    $params[] = (string) field($in, 'image');
}
$params[] = $id;

$pdo->prepare('UPDATE examen SET ' . implode(', ', $set) . ' WHERE id = ?')->execute($params);
reply('data update successfull');
