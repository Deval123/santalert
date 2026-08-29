<?php
/** showPays.php — référentiel des pays. Body: {} — Réponse: {"server_response":[...]}. */
require __DIR__ . '/_bootstrap.php';

$rows = $pdo->query('SELECT id, pays, capitale FROM pays ORDER BY pays')->fetchAll();
reply_rows($rows);
