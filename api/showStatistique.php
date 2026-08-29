<?php
/**
 * showStatistique.php — synthèse chiffrée du dossier d'un patient.
 * Body: {patients:[{id}]}
 * Réponse: {"server_response":[{ bilans, regimes, soins, agenda, maladies }]}
 *
 * (La page `statistique` legacy était vide — endpoint créé pour lui donner du contenu.)
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$id = patient_id_from($in);

function count_for(PDO $pdo, string $table, int $id): int
{
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM `$table` WHERE patients_id = ?");
    $stmt->execute([$id]);
    return (int) $stmt->fetchColumn();
}

reply_rows([[
    'bilans'   => $id ? count_for($pdo, 'bilan', $id) : 0,
    'regimes'  => $id ? count_for($pdo, 'regime', $id) : 0,
    'soins'    => $id ? count_for($pdo, 'auto_med', $id) : 0,
    'agenda'   => $id ? count_for($pdo, 'patientsagenda', $id) : 0,
    'maladies' => $id ? count_for($pdo, 'maladie_chronique', $id) : 0,
]]);
