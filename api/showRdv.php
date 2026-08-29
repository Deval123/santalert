<?php
/** showRdv.php — liste par consultation_id. Body: {consultation_id} ou {consultation:[{id}]} / {hospitalisation:[{id}]}. */
require __DIR__ . '/_bootstrap.php';
$in = input();
$pid = (int) ($in->consultation_id ?? 0);
if (!$pid && isset($in->consultation[0]->id)) $pid = (int) $in->consultation[0]->id;
if (!$pid && isset($in->hospitalisation[0]->id)) $pid = (int) $in->hospitalisation[0]->id;
reply_rows($pid ? crud_list_by($pdo, 'rdv', 'consultation_id', $pid) : []);
