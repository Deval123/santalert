<?php
/**
 * Mots de passe : hachés en base (bcrypt via password_hash).
 * Le front envoie toujours le mot de passe en clair -> vérif 100 % serveur.
 *
 * Compat : si une ligne a encore un mot de passe en clair (données héritées),
 * `password_check` accepte aussi l'égalité stricte.
 */

function password_hash_value(string $plain): string
{
    return password_hash($plain, PASSWORD_DEFAULT);
}

function password_check(string $plain, ?string $stored): bool
{
    if ($stored === null || $stored === '') {
        return false;
    }
    if (password_verify($plain, $stored)) {
        return true;
    }
    // repli données héritées non hachées
    return hash_equals($stored, $plain);
}
