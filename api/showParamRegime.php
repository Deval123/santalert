<?php
/** showParamRegime.php — relevés d'un régime. Body: {id} (= regime_id). */
require __DIR__ . "/_bootstrap.php";
$in = input();
$stmt = $pdo->prepare("SELECT * FROM `param_regime` WHERE regime_id = ? ORDER BY id DESC");
$stmt->execute([(int) ($in->id ?? 0)]);
reply_rows($stmt->fetchAll());
