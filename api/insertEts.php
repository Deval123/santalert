<?php
/** insertEts.php — création d'un établissement. Body: {statut, nom, code, telephone, email, type, adresse, ville}. */
require __DIR__ . "/_bootstrap.php";
$in = input();
if (empty($in->nom) || empty($in->code)) {
    reply("Error: nom et code sont requis");
}
$s = $pdo->prepare("SELECT id FROM `etablissement` WHERE code = ? LIMIT 1");
$s->execute([$in->code]);
if ($s->fetch()) {
    reply("Error: ce code d'etablissement existe deja");
}
$res = crud_insert($pdo, "etablissement", $in);
reply($res === "Successfull" ? "Registration successfull" : $res);
