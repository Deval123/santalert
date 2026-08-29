<?php
/** insertTraitement.php — acte rattaché à hospitalisation_id. */
require __DIR__ . '/_bootstrap.php';
$in = input();
$parent = 0;
if (isset($in->hospitalisation) && is_array($in->hospitalisation) && isset($in->hospitalisation[0]->id)) $parent = (int) $in->hospitalisation[0]->id;
elseif (isset($in->hospitalisation) && is_numeric($in->hospitalisation)) $parent = (int) $in->hospitalisation;
reply(crud_insert($pdo, 'traitement', $in, ['hospitalisation_id' => $parent ?: null, 'personel_ets_id' => ctx_personel_id($in)]));
