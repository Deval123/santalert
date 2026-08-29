<?php
/**
 * showExamensLabo.php — file des examens à traiter par le laboratoire.
 * Body: {personel:[{etablissement_id}]}  (facultatif : filtre par établissement)
 * Réponse: {"server_response":[ {examen + patient + médecin + date consultation} ]}
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$etsId = 0;
if (isset($in->personel[0]->etablissement_id)) {
    $etsId = (int) $in->personel[0]->etablissement_id;
}

$sql =
    'SELECT x.*, p.nom AS patient_nom, p.prenom AS patient_prenom,
            c.nom_medecin AS medecin, c.datecreate AS consultation_date, c.hopital_id
       FROM examen x
       JOIN consultation c ON c.id = x.consultation_id
       LEFT JOIN patients p ON p.id = c.patients_id';
$params = [];
if ($etsId) {
    $sql .= ' WHERE c.hopital_id = ?';
    $params[] = $etsId;
}
$sql .= ' ORDER BY (x.resultat IS NULL OR x.resultat = "") DESC, x.id DESC';

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
reply_rows($stmt->fetchAll());
