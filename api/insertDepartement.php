<?php
/** insertDepartement.php — création. Body: {nom, description, code}. */
require __DIR__ . "/_bootstrap.php";
$in = input();
$eid = null;
if (!empty($in->code)) {
    $s = $pdo->prepare("SELECT id FROM `etablissement` WHERE code = ? LIMIT 1");
    $s->execute([$in->code]);
    $eid = ($r = $s->fetch()) ? (int) $r["id"] : null;
}
reply(crud_insert($pdo, "departement_geo", $in, ["etablissement_id" => $eid]));
