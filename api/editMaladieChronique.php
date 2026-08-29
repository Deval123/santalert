<?php
/** editMaladieChronique.php */
require __DIR__ . "/_bootstrap.php";
reply(crud_update($pdo, "maladie_chronique", input()));
