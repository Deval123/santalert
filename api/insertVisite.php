<?php
/** insertVisite.php — visite du patient. Body: {patients_id, nom, date_realisation, nom_hopital}. */
require __DIR__ . "/_bootstrap.php";
$in = input();
$id = (int) (field($in, "patients_id", 0) ?: patient_id_from($in));
reply(crud_insert($pdo, "visite", $in, ["patients_id" => $id ?: null]));
