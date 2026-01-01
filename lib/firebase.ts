import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

// Firebase configuration
// These should be set as environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const requiredFields = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
  ] as const;

  const missingFields = requiredFields.filter(
    (field) => !firebaseConfig[field] || firebaseConfig[field] === 'your_' + field
  );

  if (missingFields.length > 0) {
    console.error(
      '❌ Firebase configuration is missing or invalid. Please check your .env.local file.\n' +
        'Missing fields: ' +
        missingFields.join(', ') +
        '\n\n' +
        'Required environment variables:\n' +
        requiredFields
          .map((field) => `  NEXT_PUBLIC_${field.toUpperCase().replace(/([A-Z])/g, '_$1')}`)
          .join('\n') +
        '\n\n' +
        'Get your Firebase config from: https://console.firebase.google.com/'
    );
    return false;
  }

  return true;
};

// Initialize Firebase
let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

if (typeof window !== 'undefined') {
  if (validateFirebaseConfig()) {
    try {
      if (!getApps().length) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApps()[0];
      }
      db = getFirestore(app);
      auth = getAuth(app);
    } catch (error) {
      console.error('Error initializing Firebase:', error);
    }
  } else {
    console.warn(
      '⚠️ Firebase is not initialized. Please configure your environment variables.'
    );
  }
}

export { db, auth };
export default app;

