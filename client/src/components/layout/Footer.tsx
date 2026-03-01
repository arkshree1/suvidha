import { Phone, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useSession } from '@/context/SessionContext';

export default function Footer() {
  const { t } = useLanguage();
  const { timeRemaining, isSessionActive } = useSession();

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <footer className="bg-[#212529] text-white px-4 py-3 flex items-center justify-between z-50" style={{ minHeight: '56px' }} data-testid="footer">
      <div className="flex items-center gap-2">
        <Phone size={18} className="text-[#28A745]" />
        <span className="text-[14px] font-medium">{t('needHelp')}</span>
      </div>
      {isSessionActive && (
        <div className="flex items-center gap-2">
          <Clock size={18} className={timeRemaining <= 30 ? 'text-[#DC3545]' : 'text-[#FFC107]'} />
          <span className={`text-[14px] font-semibold ${timeRemaining <= 30 ? 'text-[#DC3545]' : 'text-white'}`}>
            {t('sessionExpires')} {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      )}
    </footer>
  );
}
