<?php
/**
 * aksi_patient.php — actions diverses sur un patient, dispatchées par `aksi`.
 * Reproduit l'ancien endpoint fourre-tout.
 *
 *   aksi = "add_infos" : met à jour la fiche d'urgence du patient
 *          Body: {id, sexe, groupeSanguin, allergie, incapacite, medecinFamille,
 *                 assurance, rhesus, signeParticulier, observationPhisyque, filename?}
 *          Réponse: "Successfull"
 */
require __DIR__ . '/_bootstrap.php';

$in = input();
$aksi = (string) field($in, 'aksi', '');
$id = (int) field($in, 'id', 0);

if ($id <= 0) {
    reply('Error: missing id');
}

switch ($aksi) {
    case 'add_infos':
        $cols = [
            'sexe', 'groupeSanguin', 'allergie', 'incapacite', 'medecinFamille',
            'assurance', 'rhesus', 'signeParticulier', 'observationPhisyque', 'filename',
        ];
        $set = [];
        $params = [];
        foreach ($cols as $c) {
            if (isset($in->$c) && $in->$c !== null && $in->$c !== '') {
                $set[] = "`$c` = ?";
                $params[] = (string) $in->$c;
            }
        }
        if ($set) {
            $params[] = $id;
            $pdo->prepare('UPDATE patients SET ' . implode(', ', $set) . ' WHERE id = ?')->execute($params);
        }
        reply('Successfull');

    case 'get_patients':
        $stmt = $pdo->prepare('SELECT * FROM patients WHERE id = ?');
        $stmt->execute([$id]);
        $rows = $stmt->fetchAll();
        foreach ($rows as &$r) {
            unset($r['password']);
        }
        reply(['result' => $rows]);

    case 'update_profile':
        $editable = array_diff(table_columns($pdo, 'patients'), ['id', 'password', 'created_at']);
        $set = [];
        $params = [];
        foreach ($editable as $c) {
            if (property_exists($in, $c) && $in->$c !== null) {
                $set[] = "`$c` = ?";
                $params[] = (string) $in->$c;
            }
        }
        if ($set) {
            $params[] = $id;
            $pdo->prepare('UPDATE patients SET ' . implode(', ', $set) . ' WHERE id = ?')->execute($params);
        }
        reply('data update successfull');

    default:
        reply('Error: unknown aksi "' . $aksi . '"');
}
