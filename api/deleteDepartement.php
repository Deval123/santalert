<?php
/** deleteDepartement.php — suppression. Body: {id}. */
require __DIR__ . "/_bootstrap.php";
reply(crud_delete($pdo, "departement_geo", input()));
