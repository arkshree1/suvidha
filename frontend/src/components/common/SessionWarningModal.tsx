import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useSession } from '@/context/SessionContext';

export default function SessionWarningModal() {
  const { t } = useLanguage();
  const { timeRemaining, showWarning, resetTimer } = useSession();

  if (!showWarning) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-8"
      onClick={resetTimer}
      data-testid="session-warning-modal"
    >
      <div className="bg-white rounded-3xl p-10 max-w-[480px] w-full text-center animate-fadeIn" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
        <AlertTriangle size={64} className="text-[#FFC107] mx-auto mb-4" />
        <h2 className="text-[28px] font-bold text-[#212529] mb-4">
          {t('sessionWarning', { seconds: timeRemaining })}
        </h2>
        <div className="w-[80px] h-[80px] rounded-full bg-[#FFC107] mx-auto flex items-center justify-center">
          <span className="text-[36px] font-bold text-[#212529]">{timeRemaining}</span>
        </div>
      </div>
    </div>
  );
}
