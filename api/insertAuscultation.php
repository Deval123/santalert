<?php
/** insertAuscultation.php — acte rattaché à consultation_id. */
require __DIR__ . '/_bootstrap.php';
$in = input();
$parent = 0;
if (isset($in->consultation) && is_array($in->consultation) && isset($in->consultation[0]->id)) $parent = (int) $in->consultation[0]->id;
elseif (isset($in->consultation) && is_numeric($in->consultation)) $parent = (int) $in->consultation;
reply(crud_insert($pdo, 'auscultation', $in, ['consultation_id' => $parent ?: null, 'personel_ets_id' => ctx_personel_id($in)]));
