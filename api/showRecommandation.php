<?php
/** showRecommandation.php — liste globale des recommandations (lecture seule). */
require __DIR__ . '/_bootstrap.php';

$rows = $pdo->query('SELECT id, categorie, titre, contenu FROM recommandation ORDER BY id')->fetchAll();
reply_rows($rows);
