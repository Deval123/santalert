<?php
/** showHospPatient.php — hospitalisations d un patient. */
require __DIR__ . "/_bootstrap.php";
$in = input();
$id = (int) (field($in, "patients_id", 0) ?: patient_id_from($in));
reply_rows($id ? crud_list_by_patient($pdo, "hospitalisation", $id) : []);
