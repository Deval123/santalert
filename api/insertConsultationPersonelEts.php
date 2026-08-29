<?php
/**
 * insertConsultationPersonelEts.php — nouvelle consultation.
 * Body: {patients_id, nom_medecin, datecreate, observation?, hopital:[{id}], personel:[{id}]}
 * Réponse: "Successfull" | "Error: ..."
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$patientId = (int) (field($in, 'patients_id', 0) ?: patient_id_from($in));

$stmt = $pdo->prepare(
    'INSERT INTO consultation (patients_id, personel_ets_id, nom_medecin, datecreate, hopital_id, observation)
     VALUES (?,?,?,?,?,?)'
);
$stmt->execute([
    $patientId ?: null,
    ctx_personel_id($in),
    (string) field($in, 'nom_medecin', ''),
    (string) field($in, 'datecreate', ''),
    ctx_hopital_id($in),
    (string) field($in, 'observation', ''),
]);

reply('Successfull');
