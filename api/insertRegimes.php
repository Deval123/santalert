<?php
/** insertRegimes.php — création. Body: {champs..., patients:[{id}]}. */
require __DIR__ . "/_bootstrap.php";
$in = input();
reply(crud_insert($pdo, "regime", $in, ["patients_id" => patient_id_from($in)]));
