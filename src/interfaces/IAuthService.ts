import { type ApplicationUser } from './IApplicationUser';

export interface IAuthService {
  login(email: string, password: string): Promise<ApplicationUser | null>;
  register(email: string, password: string): Promise<ApplicationUser | null>;
  logout(): Promise<void>;
  onAuthStateChanged(callback: (user: ApplicationUser | null) => void): void;
  getCurrentUser(): ApplicationUser | null;
}
