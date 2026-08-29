<?php
/**
 * loginPersonel.php — connexion personnel médical. Body: {nom, password}.
 * Réponses attendues par le front (AuthService.loginStaff) :
 *   "Your Login success"  -> type_personnel = medecin (ou autre non spécial)
 *   "Pharmacien"          -> type_personnel = Pharmacien
 *   "laborentin"          -> type_personnel = laborentin
 *   autre chaîne          -> échec
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$nom = (string) field($in, 'nom', '');
$password = (string) field($in, 'password', '');

$row = null;
if ($nom !== '') {
    $stmt = $pdo->prepare('SELECT id, password, type_personnel FROM personel_ets WHERE nom = ? LIMIT 1');
    $stmt->execute([$nom]);
    $row = $stmt->fetch();
}

if (!$row || !password_check($password, $row['password'])) {
    reply('Your Login Email or Password is invalid');
}

$type = strtolower((string) $row['type_personnel']);
if ($type === 'pharmacien') {
    reply('Pharmacien');
}
if ($type === 'laborentin' || $type === 'laborantin') {
    reply('laborentin');
}
reply('Your Login success');
