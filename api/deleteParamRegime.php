<?php
/** deleteParamRegime.php — suppression. Body: {id}. */
require __DIR__ . "/_bootstrap.php";
reply(crud_delete($pdo, "param_regime", input()));
