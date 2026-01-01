import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin (server-side only)
let adminApp: App;
let adminDb: Firestore;

if (!getApps().length) {
  // Initialize with service account or use default credentials
  // For production, use environment variables for service account
  try {
    adminApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    // Fallback to default credentials (for local development with Firebase emulator)
    adminApp = initializeApp();
  }
  adminDb = getFirestore(adminApp);
} else {
  adminApp = getApps()[0];
  adminDb = getFirestore(adminApp);
}

export { adminDb };
export default adminApp;

