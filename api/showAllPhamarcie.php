<?php
/**
 * showAllPhamarcie.php (orthographe historique) — pharmacies d'une ville.
 * Body: {city_id}
 * Réponse: {"server_response": [pharmacies de la ville]}
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$cityId = (int) field($in, 'city_id', 0);

$stmt = $pdo->prepare('SELECT * FROM pharmacie WHERE city_id = ? ORDER BY deGarde DESC, nom');
$stmt->execute([$cityId]);
reply_rows($stmt->fetchAll());
