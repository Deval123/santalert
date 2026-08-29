<?php
/** login.php — connexion patient. Body: {username, password}. */
require __DIR__ . '/_bootstrap.php';

$in = input();
$username = (string) field($in, 'username', '');
$password = (string) field($in, 'password', '');

$row = null;
if ($username !== '') {
    $stmt = $pdo->prepare('SELECT id, password FROM patients WHERE nom = ? LIMIT 1');
    $stmt->execute([$username]);
    $row = $stmt->fetch();
}

if ($row && password_check($password, $row['password'])) {
    reply('Your Login success');
}
reply('Your Login Email or Password is invalid');
