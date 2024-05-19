import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { IAuthService } from '@/interfaces/IAuthService';
import type { ApplicationUser } from '@/types/ApplicationUser';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

class AuthService implements IAuthService {
  async login(email: string, password: string): Promise<ApplicationUser | null> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user as ApplicationUser;
  }

  async register(email: string, password: string): Promise<ApplicationUser | null> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user as ApplicationUser;
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }

  onAuthStateChanged(callback: (user: ApplicationUser | null) => void): void {
    onAuthStateChanged(auth, (user) => {
      callback(user as ApplicationUser);
    });
  }

  getCurrentUser(): ApplicationUser | null {
    return auth.currentUser as ApplicationUser;
  }
}

const authService = new AuthService();
export default authService;
export type { ApplicationUser };
