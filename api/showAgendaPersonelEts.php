<?php
/**
 * showAgendaPersonelEts.php — agenda de l'établissement du personnel connecté.
 * Body: {personel:[{id, etablissement_id}]}
 * Réponse: {"server_response":[ {agenda + infos patient jointes} ]}
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$etsId = 0;
if (isset($in->personel) && is_array($in->personel) && isset($in->personel[0])) {
    $etsId = (int) ($in->personel[0]->etablissement_id ?? 0);
}

$rows = [];
if ($etsId > 0) {
    $stmt = $pdo->prepare(
        'SELECT a.*, p.nom, p.prenom, p.telephone, p.email
           FROM agenda_personel_ets a
           LEFT JOIN patients p ON p.id = a.patients_id
          WHERE a.etablissement_id = ?
          ORDER BY a.id DESC'
    );
    $stmt->execute([$etsId]);
    $rows = $stmt->fetchAll();
}

reply_rows($rows);
