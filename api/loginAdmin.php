<?php
/** loginAdmin.php — connexion admin. Body: {login, password}. */
require __DIR__ . '/_bootstrap.php';

$in = input();
$login = (string) field($in, 'login', '');
$password = (string) field($in, 'password', '');

$row = null;
if ($login !== '') {
    $stmt = $pdo->prepare('SELECT id, password FROM admin WHERE login = ? LIMIT 1');
    $stmt->execute([$login]);
    $row = $stmt->fetch();
}

if ($row && password_check($password, $row['password'])) {
    reply('Your Login success');
}
reply('Your Login Email or Password is invalid');
