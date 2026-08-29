<?php
/**
 * showExamenPatient.php — polymorphe :
 *  - {consultation_id} | {consultation:[{id}]}  -> examens de cette consultation (vue personnel)
 *  - {patients_id} | {patients:[{id}]}          -> tous les examens du patient (vue patient),
 *                                                  enrichis médecin + date de consultation
 * Réponse: {"server_response":[...]}
 */
require __DIR__ . '/_bootstrap.php';

$in = input();

$consId = (int) ($in->consultation_id ?? 0);
if (!$consId && isset($in->consultation[0]->id)) {
    $consId = (int) $in->consultation[0]->id;
}

if ($consId) {
    reply_rows(crud_list_by($pdo, 'examen', 'consultation_id', $consId));
}

$patId = (int) (field($in, 'patients_id', 0) ?: patient_id_from($in));
$rows = [];
if ($patId) {
    $stmt = $pdo->prepare(
        'SELECT x.*, c.nom_medecin AS medecin, c.datecreate AS consultation_date
           FROM examen x
           JOIN consultation c ON c.id = x.consultation_id
          WHERE c.patients_id = ?
          ORDER BY x.id DESC'
    );
    $stmt->execute([$patId]);
    $rows = $stmt->fetchAll();
}
reply_rows($rows);
