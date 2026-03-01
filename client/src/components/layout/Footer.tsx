import { Phone, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useSession } from '@/context/SessionContext';

export default function Footer() {
  const { t } = useLanguage();
  const { timeRemaining, isSessionActive } = useSession();

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <footer className="bg-[#212529] text-white z-50" data-testid="footer">
      <div className="px-6 py-3 flex items-center justify-between border-b border-white/10">
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
      </div>
      <div className="px-6 py-2 flex items-center justify-between">
        <p className="text-[12px] text-white/60">
          &copy; {new Date().getFullYear()}, National Informatics Centre (NIC), Ministry of Electronics &amp; IT
        </p>
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-white/40 font-semibold tracking-wider">NIC</span>
          <span className="text-[11px] text-white/40 font-semibold tracking-wider">MeitY</span>
          <span className="text-[11px] text-white/40 font-semibold tracking-wider">Digital India</span>
        </div>
      </div>
    </footer>
  );
}
