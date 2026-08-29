<?php
/** editVisite.php — Body: {id, new<Col>...}. */
require __DIR__ . "/_bootstrap.php";
reply(crud_update($pdo, "visite", input()));
