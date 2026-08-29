<?php
/**
 * insertAgendaPersonelEts.php — nouvelle entrée d'agenda pour l'établissement.
 * Body: {personel:[{id, etablissement_id}], patient, datedebut, datefin,
 *        nature, lieu, observation, tiers}
 *   `patient` = nom (ou id) du patient concerné.
 * Réponse: "Successfull" | "Error: ..."
 */
require __DIR__ . '/_bootstrap.php';

$in = input();

$etsId = 0;
$persId = null;
if (isset($in->personel) && is_array($in->personel) && isset($in->personel[0])) {
    $etsId = (int) ($in->personel[0]->etablissement_id ?? 0);
    $persId = (int) ($in->personel[0]->id ?? 0) ?: null;
}

$patientRef = trim((string) field($in, 'patient', ''));
$patientId = null;
if ($patientRef !== '') {
    if (ctype_digit($patientRef)) {
        $patientId = (int) $patientRef;
    } else {
        $q = $pdo->prepare('SELECT id FROM patients WHERE nom = ? LIMIT 1');
        $q->execute([$patientRef]);
        $patientId = ($r = $q->fetch()) ? (int) $r['id'] : null;
    }
}

$stmt = $pdo->prepare(
    'INSERT INTO agenda_personel_ets
       (personel_ets_id, etablissement_id, patients_id, datedebut, datefin, nature, lieu, observation, tiers)
     VALUES (?,?,?,?,?,?,?,?,?)'
);
$stmt->execute([
    $persId,
    $etsId ?: null,
    $patientId,
    (string) field($in, 'datedebut', ''),
    (string) field($in, 'datefin', ''),
    (string) field($in, 'nature', ''),
    (string) field($in, 'lieu', ''),
    (string) field($in, 'observation', ''),
    (string) field($in, 'tiers', ''),
]);

reply('Successfull');
