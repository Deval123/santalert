<?php
/** insertParamRegime.php — nouveau relevé. Body: {regime_id, dateParam, poids, temperature, tension, observation}. */
require __DIR__ . "/_bootstrap.php";
$in = input();
reply(crud_insert($pdo, "param_regime", $in, ["regime_id" => (int) ($in->regime_id ?? 0)]));
