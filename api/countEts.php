<?php
/** countEts.php — vérifie l'existence d'un code établissement. Body: {code}. */
require __DIR__ . '/_bootstrap.php';

$in = input();
$stmt = $pdo->prepare('SELECT id FROM etablissement WHERE code = ? LIMIT 1');
$stmt->execute([(string) field($in, 'code', '')]);

reply($stmt->fetch() ? 'Exist' : 'This code is invalid');
