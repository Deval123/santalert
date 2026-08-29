<?php
/** insertSoins.php — création. Body: {champs..., patients:[{id}]}. */
require __DIR__ . "/_bootstrap.php";
$in = input();
reply(crud_insert($pdo, "auto_med", $in, ["patients_id" => patient_id_from($in)]));
