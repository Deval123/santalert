/**
 * Accès centralisé à l'état de session stocké dans `window.localStorage`
 * (comme l'app historique). Les valeurs `username` / `password` sont
 * stockées `JSON.stringify`-ées — on conserve ce format pour rester
 * compatible avec le backend et l'ancien code.
 */
export type StaffKind = 'personal' | 'Pharmacien' | 'laborentin';

export const Session = {
  get username(): string | null {
    return safeParse(localStorage.getItem('username'));
  },
  get password(): string | null {
    return safeParse(localStorage.getItem('password'));
  },
  get isPatient(): boolean {
    return localStorage.getItem('userPatient') === 'patient';
  },
  get staffKind(): StaffKind | null {
    const v = localStorage.getItem('personaluser');
    return v === 'personal' || v === 'Pharmacien' || v === 'laborentin' ? v : null;
  },
  get typePerso(): string | null {
    return localStorage.getItem('typePerso');
  },
  /** Tableau `patients` mis en cache par la page profil (fiche du patient connecté). */
  get patients(): any[] {
    try {
      const v = JSON.parse(localStorage.getItem('patients') ?? '[]');
      return Array.isArray(v) ? v : v ? [v] : [];
    } catch {
      return [];
    }
  },
  get patientId(): number {
    return Number(this.patients[0]?.id ?? 0);
  },
  /** Fiche du personnel connecté (mise en cache par la page profil personnel). */
  get personel(): any[] {
    try {
      const v = JSON.parse(localStorage.getItem('personel') ?? '[]');
      return Array.isArray(v) ? v : v ? [v] : [];
    } catch {
      return [];
    }
  },
  get etablissement(): any[] {
    try {
      const v = JSON.parse(localStorage.getItem('etablissement') ?? '[]');
      return Array.isArray(v) ? v : v ? [v] : [];
    } catch {
      return [];
    }
  },
  get etablissementId(): number {
    return Number(this.etablissement[0]?.id ?? this.personel[0]?.etablissement_id ?? 0);
  },
  get isLoggedIn(): boolean {
    return !!this.username && !!this.password && (this.isPatient || !!this.staffKind);
  },
  setCredentials(username: string, password: string): void {
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('password', JSON.stringify(password));
  },
  setPatient(): void {
    localStorage.setItem('userPatient', 'patient');
  },
  setStaff(kind: StaffKind, typePerso: string): void {
    localStorage.setItem('personaluser', kind);
    localStorage.setItem('typePerso', typePerso);
  },
  clear(): void {
    localStorage.clear();
  },
};

function safeParse(raw: string | null): string | null {
  if (raw == null || raw === 'undefined') return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}
