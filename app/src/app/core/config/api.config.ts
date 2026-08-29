import { environment } from '../../../environments/environment';

/**
 * Remplace l'ancien `src/enums/enums.ts` (APIURL.URL1/URL2/URL3).
 * L'URL de base est désormais pilotée par `environment(.prod).ts`.
 */
export const API = {
  /** Base du backend PHP historique — se termine SANS slash. */
  base: environment.apiUrl,
  /** Base de l'API Slim REST. */
  slim: environment.apiSlimUrl,
};

/** Construit une URL vers un script PHP du backend historique. */
export function apiUrl(script: string): string {
  return `${API.base}/${script.replace(/^\/+/, '')}`;
}
