import type { ApplicationUser } from '@/types/ApplicationUser';
import type { IAuthService } from '@/interfaces/IAuthService';

class MockAuthService implements IAuthService {
  private currentUser: ApplicationUser | null = null;

  async login(email: string, password: string): Promise<ApplicationUser | null> {
    this.currentUser = { uid: 'mock-uid', email } as ApplicationUser;
    return this.currentUser;
  }

  async register(email: string, password: string): Promise<ApplicationUser | null> {
    this.currentUser = { uid: 'mock-uid', email } as ApplicationUser;
    return this.currentUser;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
  }

  onAuthStateChanged(callback: (user: ApplicationUser | null) => void): void {
    callback(this.currentUser);
  }

  getCurrentUser(): ApplicationUser | null {
    return this.currentUser;
  }
}

const mockAuthService = new MockAuthService();
export default mockAuthService;
