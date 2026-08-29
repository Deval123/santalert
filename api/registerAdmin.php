<?php
/**
 * registerAdmin.php — création d'un compte admin.
 * Body: {login, password, description, email, telephone, gender}
 * Réponse: "Registration successfull" | "Error: ..."
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$login = trim((string) field($in, 'login', ''));
$password = (string) field($in, 'password', '');

if ($login === '' || $password === '') {
    reply('Error: login and password are required');
}

$exists = $pdo->prepare('SELECT id FROM admin WHERE login = ? LIMIT 1');
$exists->execute([$login]);
if ($exists->fetch()) {
    reply('Error: this login already exists');
}

$stmt = $pdo->prepare(
    'INSERT INTO admin (login, password, description, email, telephone, gender)
     VALUES (?,?,?,?,?,?)'
);
$stmt->execute([
    $login,
    password_hash_value($password),
    (string) field($in, 'description', ''),
    (string) field($in, 'email', ''),
    (string) field($in, 'telephone', ''),
    (string) field($in, 'gender', ''),
]);

reply('Registration successfull');
