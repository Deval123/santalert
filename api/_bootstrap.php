<?php
/**
 * Inclus en tête de CHAQUE endpoint.
 * Reproduit le préambule CORS de l'ancien backend (devdb) + JSON + PDO + helpers.
 *
 *   require __DIR__ . '/_bootstrap.php';
 *   $in = input();
 *   ... $pdo->prepare(...)->execute([...]) ...
 *   reply("Successfull");
 */

// --- CORS (identique à l'ancien devdb : renvoie l'Origin de l'appelant) ---
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
} else {
    header('Access-Control-Allow-Origin: *');
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

// Une erreur inattendue -> chaîne JSON "Error: ..." (le front affiche res tel quel)
// plutôt qu'une page HTML de 500 qui casse le parsing.
set_error_handler(function ($no, $str, $file, $line) {
    throw new ErrorException($str, 0, $no, $file, $line);
});
set_exception_handler(function (Throwable $e) {
    http_response_code(200);
    error_log('[api] ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
    echo json_encode('Error: ' . $e->getMessage());
});

require __DIR__ . '/db.php';         // -> $pdo
require __DIR__ . '/lib/respond.php';
require __DIR__ . '/lib/auth.php';
require __DIR__ . '/lib/crud.php';
require __DIR__ . '/lib/ctx.php';
