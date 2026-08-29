<?php
/**
 * showInfosUrgentPatients.php — fiche d'urgence du patient.
 * Body: {patients:[{id}]}
 * Réponse: {"infos": [ {ligne patient} ], "maladie": [ {maladies chroniques} ]}
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$id = patient_id_from($in);

$infos = [];
$maladie = [];

if ($id > 0) {
    $p = $pdo->prepare('SELECT * FROM patients WHERE id = ? LIMIT 1');
    $p->execute([$id]);
    if ($row = $p->fetch()) {
        unset($row['password']);
        $infos[] = $row;
    }

    $m = $pdo->prepare('SELECT * FROM maladie_chronique WHERE patients_id = ? ORDER BY id DESC');
    $m->execute([$id]);
    $maladie = $m->fetchAll();
}

reply(['infos' => $infos, 'maladie' => $maladie]);
