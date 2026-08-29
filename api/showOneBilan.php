<?php
/** showOneBilan.php — une ligne. Body: {id}. */
require __DIR__ . "/_bootstrap.php";
$in = input();
reply_rows(crud_show_one($pdo, "bilan", (int)($in->id ?? 0)));
