<?php
/** showConsultation.php — consultations d un patient. Body: {patients_id} ou {patients:[{id}]}. */
require __DIR__ . "/_bootstrap.php";
$in = input();
$id = (int) (field($in, "patients_id", 0) ?: patient_id_from($in));
reply_rows($id ? crud_list_by_patient($pdo, "consultation", $id) : []);
