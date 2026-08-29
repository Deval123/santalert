<?php
/** deleteAuto_med.php — suppression. Body: {id}. */
require __DIR__ . "/_bootstrap.php";
reply(crud_delete($pdo, "auto_med", input()));
