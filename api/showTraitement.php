<?php
/** showTraitement.php — liste par hospitalisation_id. Body: {hospitalisation_id} ou {consultation:[{id}]} / {hospitalisation:[{id}]}. */
require __DIR__ . '/_bootstrap.php';
$in = input();
$pid = (int) ($in->hospitalisation_id ?? 0);
if (!$pid && isset($in->consultation[0]->id)) $pid = (int) $in->consultation[0]->id;
if (!$pid && isset($in->hospitalisation[0]->id)) $pid = (int) $in->hospitalisation[0]->id;
reply_rows($pid ? crud_list_by($pdo, 'traitement', 'hospitalisation_id', $pid) : []);
