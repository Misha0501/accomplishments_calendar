// src/services/authService.ts
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { type IAuthService } from '@/interfaces/IAuthService';
import { type ApplicationUser } from '@/types/ApplicationUser';

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
  private user: ApplicationUser | null = null;
  private authStateResolved = false;
  private authStatePromise: Promise<void>;

  constructor() {
    this.authStatePromise = new Promise<void>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        this.user = user as ApplicationUser;
        this.authStateResolved = true;
        resolve();
      });
    });
  }

  async login(email: string, password: string): Promise<ApplicationUser | null> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    this.user = userCredential.user as ApplicationUser;
    return this.user;
  }

  async register(email: string, password: string): Promise<ApplicationUser | null> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    this.user = userCredential.user as ApplicationUser;
    return this.user;
  }

  async logout(): Promise<void> {
    await signOut(auth);
    this.user = null;
  }

  onAuthStateChanged(callback: (user: ApplicationUser | null) => void): void {
    onAuthStateChanged(auth, (user) => {
      this.user = user as ApplicationUser;
      callback(this.user);
    });
  }

  getCurrentUser(): ApplicationUser | null {
    return this.user;
  }

  getAuthState(): Promise<void> {
    return this.authStatePromise;
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }
}

export default AuthService;
