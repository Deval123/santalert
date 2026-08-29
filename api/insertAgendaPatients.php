<?php
/** insertAgendaPatients.php — création. Body: {champs..., patients:[{id}]}. */
require __DIR__ . "/_bootstrap.php";
$in = input();
reply(crud_insert($pdo, "patientsagenda", $in, ["patients_id" => patient_id_from($in)]));
