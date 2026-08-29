<?php
/**
 * insertHospitalisationPersonelEts.php — nouvelle hospitalisation.
 * Body: {patients_id, date_entree, date_sortie, symptome, causes, medecinTraitant,
 *        diagnostique, recommandationsAlimentaire, numeroChambre, numeroLit,
 *        numeroDossier, hopital:[{id}], personel:[{id}], consultation?:[{id}]}
 * Réponse: "Successfull" | "Error: ..."
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$patientId = (int) (field($in, 'patients_id', 0) ?: patient_id_from($in));

$cols = [
    'date_entree', 'date_sortie', 'symptome', 'causes', 'medecinTraitant', 'diagnostique',
    'recommandationsAlimentaire', 'numeroChambre', 'numeroLit', 'numeroDossier',
];
$fields = ['patients_id', 'personel_ets_id', 'consultation_id', 'hopital_id'];
$values = [$patientId ?: null, ctx_personel_id($in), ctx_consultation_id($in), ctx_hopital_id($in)];
foreach ($cols as $c) {
    $fields[] = $c;
    $values[] = (string) field($in, $c, '');
}

$sql = 'INSERT INTO hospitalisation (`' . implode('`,`', $fields) . '`) VALUES ('
     . implode(',', array_fill(0, count($fields), '?')) . ')';
$pdo->prepare($sql)->execute($values);

reply('Successfull');
