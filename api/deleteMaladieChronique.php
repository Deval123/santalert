<?php
/** deleteMaladieChronique.php */
require __DIR__ . "/_bootstrap.php";
reply(crud_delete($pdo, "maladie_chronique", input()));
