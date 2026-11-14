// firebaseConfig.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'test-api-key',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'test-auth-domain',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'test-project-id',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'test-storage-bucket',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'test-sender-id',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'test-app-id',
};

// Inicializa o Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Exporta o auth
export const auth = getAuth(app);
