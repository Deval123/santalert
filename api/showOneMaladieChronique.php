<?php
/** showOneMaladieChronique.php */
require __DIR__ . "/_bootstrap.php";
$in = input();
reply_rows(crud_show_one($pdo, "maladie_chronique", (int)($in->id ?? 0)));
