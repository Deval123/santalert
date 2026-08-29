<?php
/**
 * register.php — inscription patient.
 * Body: {username, password, firstname, mobile, mobile1?, email, email1?, country?}
 * Réponse: "Registration successfull" | "Error: ..."
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$username = trim((string) field($in, 'username', ''));
$password = (string) field($in, 'password', '');

if ($username === '' || $password === '') {
    reply('Error: username and password are required');
}

$exists = $pdo->prepare('SELECT id FROM patients WHERE nom = ? LIMIT 1');
$exists->execute([$username]);
if ($exists->fetch()) {
    reply('Error: this username already exists');
}

$stmt = $pdo->prepare(
    'INSERT INTO patients (nom, password, prenom, telephone, mobile1, email, email1, country)
     VALUES (:nom, :password, :prenom, :telephone, :mobile1, :email, :email1, :country)'
);
$stmt->execute([
    ':nom'       => $username,
    ':password'  => password_hash_value($password),
    ':prenom'    => (string) field($in, 'firstname', ''),
    ':telephone' => (string) field($in, 'mobile', ''),
    ':mobile1'   => (string) field($in, 'mobile1', ''),
    ':email'     => (string) field($in, 'email', ''),
    ':email1'    => (string) field($in, 'email1', ''),
    ':country'   => is_scalar(field($in, 'country')) ? (string) field($in, 'country') : json_encode(field($in, 'country')),
]);

reply('Registration successfull');
