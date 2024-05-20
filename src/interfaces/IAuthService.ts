import type { ApplicationUser } from '@/types/ApplicationUser';

export interface IAuthService {
  login(email: string, password: string): Promise<ApplicationUser | null>;
  register(email: string, password: string): Promise<ApplicationUser | null>;
  logout(): Promise<void>;
  onAuthStateChanged(callback: (user: ApplicationUser | null) => void): void;
  getCurrentUser(): ApplicationUser | null;
  getAuthState(): Promise<void>;
  isAuthenticated(): boolean
}
