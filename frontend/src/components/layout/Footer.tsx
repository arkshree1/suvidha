import { Phone, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useSession } from '@/context/SessionContext';

function NicLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#1A237E" />
        <text x="20" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">NIC</text>
        <rect x="8" y="19" width="24" height="1" fill="#FF9800" opacity="0.8" />
        <text x="20" y="28" textAnchor="middle" fill="#90CAF9" fontSize="4.5" fontFamily="sans-serif">National</text>
        <text x="20" y="33" textAnchor="middle" fill="#90CAF9" fontSize="4.5" fontFamily="sans-serif">Informatics</text>
      </svg>
      <div className="hidden sm:flex flex-col">
        <span className="text-[10px] text-white/80 font-semibold leading-tight">National</span>
        <span className="text-[10px] text-white/80 font-semibold leading-tight">Informatics</span>
        <span className="text-[10px] text-white/80 font-semibold leading-tight">Centre</span>
      </div>
    </div>
  );
}

function MeityLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#004D40" />
        <circle cx="20" cy="14" r="6" stroke="#A5D6A7" strokeWidth="1.2" fill="none" />
        <circle cx="20" cy="14" r="2.5" fill="#A5D6A7" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x = 20 + 5 * Math.cos(rad);
          const y = 14 + 5 * Math.sin(rad);
          return <circle key={angle} cx={x} cy={y} r="0.8" fill="#A5D6A7" />;
        })}
        <text x="20" y="27" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="sans-serif">MeitY</text>
        <rect x="10" y="29" width="20" height="0.8" fill="#FF9800" opacity="0.6" />
        <text x="20" y="35" textAnchor="middle" fill="#A5D6A7" fontSize="3.5" fontFamily="sans-serif">Govt of India</text>
      </svg>
      <div className="hidden sm:flex flex-col">
        <span className="text-[10px] text-white/80 font-semibold leading-tight">Ministry of</span>
        <span className="text-[10px] text-white/80 font-semibold leading-tight">Electronics &</span>
        <span className="text-[10px] text-white/80 font-semibold leading-tight">Info. Technology</span>
      </div>
    </div>
  );
}

function DigitalIndiaLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#0D47A1" />
        <path d="M10 20 Q15 10, 20 14 T30 12" stroke="#42A5F5" strokeWidth="1.5" fill="none" />
        <path d="M10 24 Q15 14, 20 18 T30 16" stroke="#66BB6A" strokeWidth="1.5" fill="none" />
        <path d="M10 28 Q15 18, 20 22 T30 20" stroke="#FFA726" strokeWidth="1.5" fill="none" />
        <text x="20" y="32" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif">Digital India</text>
      </svg>
      <div className="hidden sm:flex flex-col">
        <span className="text-[11px] text-white/80 font-bold leading-tight">Digital</span>
        <span className="text-[11px] text-white/80 font-bold leading-tight">India</span>
      </div>
    </div>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  const { timeRemaining, isSessionActive } = useSession();

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <footer className="bg-[#212529] text-white z-50" data-testid="footer">
      <div className="px-6 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-[#28A745]" />
          <span className="text-[13px] font-medium">{t('needHelp')}</span>
        </div>
        {isSessionActive && (
          <div className="flex items-center gap-2">
            <Clock size={16} className={timeRemaining <= 30 ? 'text-[#DC3545]' : 'text-[#FFC107]'} />
            <span className={`text-[13px] font-semibold ${timeRemaining <= 30 ? 'text-[#DC3545]' : 'text-white'}`}>
              {t('sessionExpires')} {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
        )}
      </div>
      <div className="px-6 py-2 flex items-center justify-between">
        <p className="text-[11px] text-white/50">
          &copy; {new Date().getFullYear()}, National Informatics Centre (NIC), Ministry of Electronics &amp; IT
        </p>
        <div className="flex items-center gap-5">
          <NicLogo />
          <div className="w-px h-[28px] bg-white/20" />
          <MeityLogo />
          <div className="w-px h-[28px] bg-white/20" />
          <DigitalIndiaLogo />
        </div>
      </div>
    </footer>
  );
}
