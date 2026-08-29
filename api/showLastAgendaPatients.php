<?php
/** showLastAgendaPatients.php — dernier RDV du patient. Body: {patients:[{id}]}. */
require __DIR__ . "/_bootstrap.php";
$in = input();
$rows = crud_list_by_patient($pdo, "patientsagenda", patient_id_from($in));
reply_rows(array_slice($rows, 0, 1));
