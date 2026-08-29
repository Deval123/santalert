export const environment = {
  production: false,
  // Backend PHP reconstruit — santalert/api, servi par `php -S localhost:8000 -t .`
  apiUrl: 'http://localhost:8000',
  // Ancienne API Slim REST (non reconstruite) — laissée pour compat éventuelle.
  apiSlimUrl: 'http://localhost:8000',
};
