<?php
/** showEts.php — liste des établissements (pour les sélecteurs). Body: {nom?, password?} (ignorés). */
require __DIR__ . "/_bootstrap.php";
reply_rows($pdo->query("SELECT * FROM `etablissement` ORDER BY nom")->fetchAll());
