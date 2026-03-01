import { createContext, useContext, useState, type ReactNode } from 'react';
import { mockCitizen } from '@/data/mockData';

interface AuthContextType {
  isAuthenticated: boolean;
  isGuest: boolean;
  citizen: typeof mockCitizen | null;
  loginWithMobile: (mobile: string) => void;
  loginWithAadhaar: (aadhaar: string) => void;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [citizen, setCitizen] = useState<typeof mockCitizen | null>(null);

  const loginWithMobile = (_mobile: string) => {
    setIsAuthenticated(true);
    setIsGuest(false);
    setCitizen(mockCitizen);
  };

  const loginWithAadhaar = (_aadhaar: string) => {
    setIsAuthenticated(true);
    setIsGuest(false);
    setCitizen(mockCitizen);
  };

  const loginAsGuest = () => {
    setIsAuthenticated(true);
    setIsGuest(true);
    setCitizen({ ...mockCitizen, name: "Guest User", mobile: "XXXXXXXXXX", aadhaar: "XXXX-XXXX-XXXX" });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsGuest(false);
    setCitizen(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isGuest, citizen, loginWithMobile, loginWithAadhaar, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
