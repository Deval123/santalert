<?php
/** insertMaladieChronique.php */
require __DIR__ . "/_bootstrap.php";
$in = input();
reply(crud_insert($pdo, "maladie_chronique", $in, ["patients_id" => patient_id_from($in)]));
