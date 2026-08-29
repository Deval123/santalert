<?php
/**
 * Connexion PDO à MySQL. Lit api/.env (fallback sur api/.env.example).
 * Expose $pdo (PDO, exceptions activées, fetch assoc par défaut).
 */

function env_load(string $path): array
{
    $vars = [];
    if (!is_file($path)) {
        return $vars;
    }
    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') {
            continue;
        }
        [$k, $v] = array_pad(explode('=', $line, 2), 2, '');
        $vars[trim($k)] = trim($v);
    }
    return $vars;
}

$__envFile = is_file(__DIR__ . '/.env') ? __DIR__ . '/.env' : __DIR__ . '/.env.example';
$env = env_load($__envFile);

$host = $env['DB_HOST'] ?? '127.0.0.1';
$port = $env['DB_PORT'] ?? '3306';
$name = $env['DB_NAME'] ?? 'santalert';
$user = $env['DB_USER'] ?? 'santalert';
$pass = $env['DB_PASS'] ?? '';

try {
    $pdo = new PDO(
        "mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode('DB connection failed: ' . $e->getMessage());
    exit;
}
