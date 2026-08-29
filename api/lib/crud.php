<?php
/**
 * Helpers CRUD génériques pour les endpoints "par patient" du dossier médical
 * (bilan, regime, auto_med, patientsagenda, maladie_chronique, ...).
 *
 * Conventions du front :
 *   - insert : body = { champ: valeur, ..., patients: [ {id, ...} ] }  -> "Successfull"
 *   - list   : body = { patients: [ {id, ...} ] }                      -> { server_response: [...] }
 *   - showOne: body = { id }                                          -> { server_response: [row] }
 *   - edit   : body = { id, new<Champ>: valeur, ... }                 -> "data update successfull"
 *   - delete : body = { id, ... }                                     -> "data deleted successfully"
 */

/** Récupère l'id patient depuis body.patients[0].id (ou body.patients_id, ou body.patient_id). */
function patient_id_from(object $in): int
{
    if (isset($in->patients) && is_array($in->patients) && isset($in->patients[0]->id)) {
        return (int) $in->patients[0]->id;
    }
    return (int) ($in->patients_id ?? $in->patient_id ?? 0);
}

/** Colonnes réelles d'une table, en cache. */
function table_columns(PDO $pdo, string $table): array
{
    static $cache = [];
    if (!isset($cache[$table])) {
        $cols = $pdo->query('SHOW COLUMNS FROM `' . str_replace('`', '', $table) . '`')->fetchAll();
        $cache[$table] = array_column($cols, 'Field');
    }
    return $cache[$table];
}

/**
 * Résout une clé de payload vers le nom de colonne réel (comparaison
 * insensible à la casse). Le front envoie parfois `datecreate` pour la
 * colonne `dateCreate`, etc. Retourne null si aucune colonne ne correspond.
 */
function resolve_column(array $columns, string $key): ?string
{
    foreach ($columns as $col) {
        if (strcasecmp($col, $key) === 0) {
            return $col;
        }
    }
    return null;
}

/** INSERT : ne garde que les clés du body qui sont des colonnes de la table. */
function crud_insert(PDO $pdo, string $table, object $in, array $extra = []): string
{
    $cols = table_columns($pdo, $table);
    // Les clés de $extra ne sont retenues que si la colonne existe vraiment.
    $data = [];
    foreach ($extra as $k => $v) {
        if (in_array($k, $cols, true)) {
            $data[$k] = $v;
        }
    }
    foreach ($in as $k => $v) {
        if ($k === 'id' || is_array($v) || is_object($v)) {
            continue;
        }
        $col = resolve_column($cols, $k);
        if ($col !== null) {
            $data[$col] = $v;
        }
    }
    if (!$data) {
        return 'Error: no data';
    }
    $fields = array_keys($data);
    $place = implode(',', array_fill(0, count($fields), '?'));
    $sql = 'INSERT INTO `' . $table . '` (`' . implode('`,`', $fields) . '`) VALUES (' . $place . ')';
    $pdo->prepare($sql)->execute(array_values($data));
    return 'Successfull';
}

/** LIST : toutes les lignes d'un patient. */
function crud_list_by_patient(PDO $pdo, string $table, int $patientId): array
{
    $stmt = $pdo->prepare('SELECT * FROM `' . $table . '` WHERE patients_id = ? ORDER BY id DESC');
    $stmt->execute([$patientId]);
    return $stmt->fetchAll();
}

/** LIST : lignes filtrées par une colonne parente (consultation_id, hospitalisation_id, ...). */
function crud_list_by(PDO $pdo, string $table, string $col, int $parentId): array
{
    $stmt = $pdo->prepare('SELECT * FROM `' . $table . '` WHERE `' . $col . '` = ? ORDER BY id DESC');
    $stmt->execute([$parentId]);
    return $stmt->fetchAll();
}

/** SHOW ONE : ligne par id. */
function crud_show_one(PDO $pdo, string $table, int $id): array
{
    $stmt = $pdo->prepare('SELECT * FROM `' . $table . '` WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    return $row ? [$row] : [];
}

/** EDIT : applique new<Col> -> Col. */
function crud_update(PDO $pdo, string $table, object $in): string
{
    $id = (int) ($in->id ?? 0);
    if ($id <= 0) {
        return 'Error: missing id';
    }
    $cols = table_columns($pdo, $table);
    $set = [];
    $params = [];
    foreach ($in as $k => $v) {
        if (strncmp($k, 'new', 3) !== 0 || is_array($v) || is_object($v) || $v === null || $v === '') {
            continue;
        }
        $col = resolve_column($cols, substr($k, 3));
        if ($col !== null) {
            $set[] = "`$col` = ?";
            $params[] = $v;
        }
    }
    if ($set) {
        $params[] = $id;
        $pdo->prepare('UPDATE `' . $table . '` SET ' . implode(', ', $set) . ' WHERE id = ?')->execute($params);
    }
    return 'data update successfull';
}

/** DELETE : par id. */
function crud_delete(PDO $pdo, string $table, object $in): string
{
    $id = (int) ($in->id ?? 0);
    if ($id <= 0) {
        return 'Error: missing id';
    }
    $pdo->prepare('DELETE FROM `' . $table . '` WHERE id = ?')->execute([$id]);
    return 'data deleted successfully';
}
