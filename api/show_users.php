<?php
/**
 * show_users.php — fiche du patient connecté. Body: {nom, password}.
 * Réponse: {"server_response": [ {id, nom, telephone, email, prenom, ...} ]}
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$nom = (string) field($in, 'nom', '');
$password = (string) field($in, 'password', '');

$stmt = $pdo->prepare('SELECT * FROM patients WHERE nom = ? LIMIT 1');
$stmt->execute([$nom]);
$row = $stmt->fetch();

$rows = [];
if ($row && password_check($password, (string) $row['password'])) {
    unset($row['password']);
    $rows[] = $row;
}

reply_rows($rows);
