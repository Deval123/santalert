<?php
/**
 * showAllPharmacie.php — référentiel complet pharmacies + géo.
 * Body: {nom, password} (ignoré ici).
 * Réponse: {
 *   server_response  : [pharmacies],
 *   server_response1 : [regions],
 *   server_response2 : [departements],
 *   server_response3 : [villes]
 * }
 */
require __DIR__ . '/_bootstrap.php';

reply([
    'server_response'  => $pdo->query('SELECT * FROM pharmacie ORDER BY nom')->fetchAll(),
    'server_response1' => $pdo->query('SELECT * FROM regions ORDER BY name')->fetchAll(),
    'server_response2' => $pdo->query('SELECT * FROM departement ORDER BY name')->fetchAll(),
    'server_response3' => $pdo->query('SELECT * FROM city ORDER BY name')->fetchAll(),
]);
