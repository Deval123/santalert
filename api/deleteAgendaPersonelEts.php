<?php
/** deleteAgendaPersonelEts.php — supprime une entrée. Body: {id}. */
require __DIR__ . "/_bootstrap.php";
reply(crud_delete($pdo, "agenda_personel_ets", input()));
