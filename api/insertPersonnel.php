<?php
/**
 * insertPersonnel.php — inscription d'un personnel rattaché à un établissement.
 * Body: {nom, matricule, telephone, emailpers, type_personnel, passwordpers, code}
 * Réponse: "Registration successfull" | "don't exist" | "Error: ..."
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$code = (string) field($in, 'code', '');

$ets = $pdo->prepare('SELECT id FROM etablissement WHERE code = ? LIMIT 1');
$ets->execute([$code]);
$row = $ets->fetch();

if (!$row) {
    reply("don't exist");
}

$stmt = $pdo->prepare(
    'INSERT INTO personel_ets (nom, password, matricule, telephone, email, type_personnel, etablissement_id)
     VALUES (?,?,?,?,?,?,?)'
);
$stmt->execute([
    (string) field($in, 'nom', ''),
    password_hash_value((string) field($in, 'passwordpers', '')),
    (string) field($in, 'matricule', ''),
    (string) field($in, 'telephone', ''),
    (string) field($in, 'emailpers', ''),
    (string) field($in, 'type_personnel', ''),
    (int) $row['id'],
]);

reply('Registration successfull');
