import admin from 'firebase-admin';

// Normaliza a chave privada para o formato PEM, aceitando "\n" literais
// ou a chave inteira numa linha só (como está salva na Vercel).
function normalizePrivateKey(rawKey?: string) {
  if (!rawKey) return undefined;

  const header = '-----BEGIN PRIVATE KEY-----';
  const footer = '-----END PRIVATE KEY-----';
  const body = rawKey
    .replace(/^"|"$/g, '')
    .replace(/\\n/g, '')
    .replace(header, '')
    .replace(footer, '')
    .replace(/\s/g, '');

  const lines = body.match(/.{1,64}/g) ?? [];
  return `${header}\n${lines.join('\n')}\n${footer}\n`;
}

// Inicializa só na primeira requisição (não no import), para o `next build`
// não precisar das credenciais ao coletar os dados das rotas.
function getAdminApp() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY),
      }),
      databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`,
    });
  }
  return admin.app();
}

export const verifyIdToken = async (token: string) => {
  try {
    const decodedToken = await getAdminApp().auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid or expired token');
  }
};

