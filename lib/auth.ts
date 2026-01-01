import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebase';

// Check if Firebase Auth is initialized
const checkAuth = () => {
  if (!auth) {
    const errorMessage = 
      'Firebase Auth is not initialized. Please check your .env.local file.\n\n' +
      'Required environment variables:\n' +
      '  - NEXT_PUBLIC_FIREBASE_API_KEY\n' +
      '  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN\n' +
      '  - NEXT_PUBLIC_FIREBASE_PROJECT_ID\n' +
      '  - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET\n' +
      '  - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID\n' +
      '  - NEXT_PUBLIC_FIREBASE_APP_ID\n\n' +
      'Get your Firebase config from: https://console.firebase.google.com/';
    throw new Error(errorMessage);
  }
};

export const signIn = async (email: string, password: string) => {
  checkAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const signOut = async () => {
  checkAuth();
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  checkAuth();
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

export const isAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  if (!user) return false;
  
  // Check if user email is in admin list
  // In production, you might want to store admin status in Firestore
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
  return adminEmails.includes(user.email || '');
};

export const getIdToken = async (): Promise<string | null> => {
  const user = await getCurrentUser();
  if (!user) return null;
  return user.getIdToken();
};

