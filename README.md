# santalert

## Migration en cours : Ionic 3 → Ionic 9 / Angular 22 / Capacitor 8

- `src/` — **ancienne app** Ionic 3 / Angular 5 / Cordova (référence de portage, ne compile plus).
- `app/` — **nouvelle app** (branche `migration-ionic8`). Build web + APK Android fonctionnels.
  Voir [`app/MIGRATION.md`](app/MIGRATION.md) pour l'état, la recette de portage et les commandes.

### Démarrage rapide

```bash
export PATH="$HOME/.local/node-v22.23.2-darwin-arm64/bin:$PATH"   # Node >= 22.22.3
cd app && npm install
npx ng serve                                      # web : http://localhost:8100
npx ng build && npx cap sync android \
  && (cd android && ./gradlew assembleDebug)      # APK debug
```
