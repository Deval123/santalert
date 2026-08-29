<?php
/**
 * showPersonel.php — fiche du personnel connecté + son établissement.
 * Body: {username, password}
 * Réponse: {"personel": [ {...} ], "etablissement": [ {...} ]}
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$nom = (string) field($in, 'username', '');
$password = (string) field($in, 'password', '');

$stmt = $pdo->prepare('SELECT * FROM personel_ets WHERE nom = ? LIMIT 1');
$stmt->execute([$nom]);
$p = $stmt->fetch();

$personel = [];
$etablissement = [];

if ($p && password_check($password, (string) $p['password'])) {
    unset($p['password']);
    $personel[] = $p;

    if (!empty($p['etablissement_id'])) {
        $e = $pdo->prepare('SELECT * FROM etablissement WHERE id = ? LIMIT 1');
        $e->execute([(int) $p['etablissement_id']]);
        if ($eRow = $e->fetch()) {
            $etablissement[] = $eRow;
        }
    }
}

reply(['personel' => $personel, 'etablissement' => $etablissement]);
