<?php
/** showMaladieChronique.php */
require __DIR__ . "/_bootstrap.php";
$in = input();
reply_rows(crud_list_by_patient($pdo, "maladie_chronique", patient_id_from($in)));
