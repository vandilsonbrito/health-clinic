// UID do administrador da clínica. Precisa ser o mesmo usado em database.rules.json.
export const ADMIN_UID = 'byDjjPQWiOae22LomZ3IkYE9GC73';

export const isAdmin = (uid?: string | null) => !!uid && uid === ADMIN_UID;
