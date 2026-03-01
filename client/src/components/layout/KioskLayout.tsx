import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import AnnouncementTicker from './AnnouncementTicker';
import SessionWarningModal from '@/components/common/SessionWarningModal';
import AryaChatbot from '@/components/common/AryaChatbot';
import { useSession } from '@/context/SessionContext';

interface KioskLayoutProps {
  children: ReactNode;
}

export default function KioskLayout({ children }: KioskLayoutProps) {
  const { isSessionActive } = useSession();

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]" style={{ fontFamily: "'Noto Sans', 'Noto Sans Devanagari', sans-serif" }}>
      <Header />
      <AnnouncementTicker />
      <main className="flex-1 overflow-y-auto flex flex-col">
        {children}
      </main>
      <Footer />
      {isSessionActive && <SessionWarningModal />}
      <AryaChatbot />
    </div>
  );
}
