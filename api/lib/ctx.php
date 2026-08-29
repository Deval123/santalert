<?php
/** Contexte personnel : id du personnel + id de l'établissement depuis le body. */
function ctx_personel_id(object $in): ?int
{
    if (isset($in->personel[0]->id)) return (int) $in->personel[0]->id ?: null;
    return null;
}
function ctx_hopital_id(object $in): ?int
{
    if (isset($in->hopital[0]->id)) return (int) $in->hopital[0]->id ?: null;
    if (isset($in->personel[0]->etablissement_id)) return (int) $in->personel[0]->etablissement_id ?: null;
    return null;
}
function ctx_consultation_id(object $in): ?int
{
    if (isset($in->consultation[0]->id)) return (int) $in->consultation[0]->id ?: null;
    if (isset($in->consultation) && is_numeric($in->consultation)) return (int) $in->consultation;
    return null;
}
