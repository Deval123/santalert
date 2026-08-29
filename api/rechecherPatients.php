<?php
/**
 * rechecherPatients.php — recherche de patients par nom. Body: {nom}.
 * Réponse: {"server_response":[...]}
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$nom = trim((string) field($in, 'nom', ''));

if ($nom === '') {
    reply_rows([]);
}

$stmt = $pdo->prepare('SELECT * FROM patients WHERE nom LIKE ? OR prenom LIKE ? ORDER BY nom');
$like = '%' . $nom . '%';
$stmt->execute([$like, $like]);
$rows = $stmt->fetchAll();
foreach ($rows as &$r) {
    unset($r['password']);
}
reply_rows($rows);
