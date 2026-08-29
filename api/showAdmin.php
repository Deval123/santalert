<?php
/** showAdmin.php — liste des admins. Body: ignoré. Réponse: {"server_response":[...]}. */
require __DIR__ . '/_bootstrap.php';

$rows = $pdo->query('SELECT id, nom, login, description, email, telephone, gender FROM admin ORDER BY login')->fetchAll();
reply_rows($rows);
