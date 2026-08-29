<?php
/**
 * showPatients.php — liste de tous les patients (usage personnel médical).
 * Body: ignoré. Réponse: {"server_response":[...]}
 */
require __DIR__ . '/_bootstrap.php';

$rows = $pdo->query('SELECT * FROM patients ORDER BY nom')->fetchAll();
foreach ($rows as &$r) {
    unset($r['password']);
}
reply_rows($rows);
