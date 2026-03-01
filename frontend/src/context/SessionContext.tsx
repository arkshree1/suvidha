import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';

interface SessionContextType {
  timeRemaining: number;
  showWarning: boolean;
  resetTimer: () => void;
  isSessionActive: boolean;
  setSessionActive: (active: boolean) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SESSION_TIMEOUT = 120;
const WARNING_THRESHOLD = 30;

export function SessionProvider({ children, onTimeout }: { children: ReactNode; onTimeout: () => void }) {
  const [timeRemaining, setTimeRemaining] = useState(SESSION_TIMEOUT);
  const [showWarning, setShowWarning] = useState(false);
  const [isSessionActive, setSessionActive] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const lastActivityRef = useRef(Date.now());

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    setTimeRemaining(SESSION_TIMEOUT);
    setShowWarning(false);
  }, []);

  useEffect(() => {
    if (!isSessionActive) return;

    const handleActivity = () => {
      resetTimer();
    };

    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [isSessionActive, resetTimer]);

  useEffect(() => {
    if (!isSessionActive) return;

    intervalRef.current = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastActivityRef.current) / 1000);
      const remaining = Math.max(0, SESSION_TIMEOUT - elapsed);
      setTimeRemaining(remaining);
      setShowWarning(remaining <= WARNING_THRESHOLD && remaining > 0);

      if (remaining <= 0) {
        onTimeout();
        setSessionActive(false);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSessionActive, onTimeout]);

  return (
    <SessionContext.Provider value={{ timeRemaining, showWarning, resetTimer, isSessionActive, setSessionActive }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used within SessionProvider');
  return context;
}
