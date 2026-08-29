<?php
/** deleteVaccin.php — Body: {id}. */
require __DIR__ . "/_bootstrap.php";
reply(crud_delete($pdo, "vaccin", input()));
