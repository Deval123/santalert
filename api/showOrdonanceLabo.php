<?php
/**
 * showOrdonanceLabo.php — ordonnances (pharmacie) et examens (labo) d'un patient,
 * toutes consultations confondues.
 * Body: {patients_id} ou {patients:[{id}]}
 * Réponse: {"ordonnances":[...], "examens":[...]} (chaque ligne enrichie du
 *          médecin et de la date de la consultation liée).
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$id = (int) (field($in, 'patients_id', 0) ?: patient_id_from($in));

$q = function (string $table) use ($pdo, $id): array {
    if (!$id) {
        return [];
    }
    $stmt = $pdo->prepare(
        "SELECT t.*, c.nom_medecin AS medecin, c.datecreate AS consultation_date
           FROM `$table` t
           JOIN consultation c ON c.id = t.consultation_id
          WHERE c.patients_id = ?
          ORDER BY t.id DESC"
    );
    $stmt->execute([$id]);
    return $stmt->fetchAll();
};

reply([
    'ordonnances' => $q('ordonnance'),
    'examens'     => $q('examen'),
]);
