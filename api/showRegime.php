<?php
/** showRegime.php — liste par patient. Body: {patients:[{id}]}. */
require __DIR__ . "/_bootstrap.php";
$in = input();
reply_rows(crud_list_by_patient($pdo, "regime", patient_id_from($in)));
