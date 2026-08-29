<?php
/**
 * Helpers de réponse. On conserve EXACTEMENT les formats attendus par le front :
 *  - actions  : une chaîne JSON  ("Your Login success", "Successfull", ...)
 *  - listes   : {"server_response": [ ... ]}  (parfois server_response1..3)
 */

/** Renvoie une valeur en JSON et termine la requête. */
function reply($value): never
{
    echo json_encode($value);
    exit;
}

/** {"server_response": $rows} (ou une autre clé). */
function reply_rows(array $rows, string $key = 'server_response'): never
{
    reply([$key => $rows]);
}

/** Renvoie plusieurs listes : reply_lists(['server_response' => [...], 'server_response1' => [...]]) */
function reply_lists(array $lists): never
{
    reply($lists);
}

/** Corps de requête JSON -> objet (stdClass) ou objet vide. */
function input(): object
{
    $raw = file_get_contents('php://input');
    if ($raw === '' || $raw === false) {
        return new stdClass();
    }
    $decoded = json_decode($raw);
    return is_object($decoded) ? $decoded : new stdClass();
}

/** Accès pratique à un champ du corps avec valeur par défaut. */
function field(object $in, string $name, $default = null)
{
    return $in->$name ?? $default;
}
