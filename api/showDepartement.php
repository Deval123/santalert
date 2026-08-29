<?php
/** showDepartement.php — services / départements. Body: {code?} (code établissement, optionnel). */
require __DIR__ . "/_bootstrap.php";
$in = input();
$code = $in->code ?? null;
if ($code) {
    $stmt = $pdo->prepare("SELECT * FROM `departement_geo` WHERE code = ? ORDER BY id DESC");
    $stmt->execute([$code]);
    reply_rows($stmt->fetchAll());
}
reply_rows($pdo->query("SELECT * FROM `departement_geo` ORDER BY id DESC")->fetchAll());
