<?php
/**
 * showConsulpers.php — consultations du patient (vue patient), enrichies :
 * médecin, établissement, et contenu concaténé des actes liés (ordonnances,
 * examens, auscultations, RDV, paramètres).
 * Body: {patients_id} | {patients:[{id}]} | {nom, password}
 * Réponse: {"server_response":[ {consultation enrichie} ]}
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$id = (int) (field($in, 'patients_id', 0) ?: patient_id_from($in));

if (!$id && field($in, 'nom')) {
    $q = $pdo->prepare('SELECT id FROM patients WHERE nom = ? LIMIT 1');
    $q->execute([(string) field($in, 'nom')]);
    $id = (int) ($q->fetchColumn() ?: 0);
}

$rows = [];
if ($id) {
    $stmt = $pdo->prepare(
        'SELECT c.*, e.nom AS Etsnom, e.adresse AS Etsadresse, e.telephone AS Etstelephone,
                e.statut AS Etsstatut,
                (SELECT GROUP_CONCAT(o.contenu SEPARATOR " | ") FROM ordonnance o WHERE o.consultation_id = c.id) AS ordo_contenu,
                (SELECT GROUP_CONCAT(x.contenu SEPARATOR " | ") FROM examen x WHERE x.consultation_id = c.id) AS examen_contenu,
                (SELECT GROUP_CONCAT(a.contenu SEPARATOR " | ") FROM auscultation a WHERE a.consultation_id = c.id) AS auscul_contenu,
                (SELECT MIN(r.datedebut) FROM rdv r WHERE r.consultation_id = c.id) AS rdv_datedebut
           FROM consultation c
           LEFT JOIN etablissement e ON e.id = c.hopital_id
          WHERE c.patients_id = ?
          ORDER BY c.id DESC'
    );
    $stmt->execute([$id]);
    $rows = $stmt->fetchAll();
}

reply_rows($rows);
