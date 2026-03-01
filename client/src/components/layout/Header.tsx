import { useState, useEffect } from 'react';
import { Home, Sun, ZoomIn, ZoomOut } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'wouter';
import type { Language } from '@/data/translations';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [, navigate] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}%`);
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const langs: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: '\u0939\u093F\u0902' },
    { code: 'mr', label: '\u092E\u0930' },
  ];

  return (
    <header className="bg-[#006EB3] text-white px-4 py-3 flex items-center justify-between gap-3 z-50" style={{ minHeight: '72px' }} data-testid="header">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-[48px] h-[48px] rounded-lg bg-white/20 flex items-center justify-center active:bg-white/30 transition-colors focus:outline-2 focus:outline-white focus:outline-offset-2"
          aria-label={t('home')}
          data-testid="button-home"
        >
          <Home size={24} />
        </button>
        <div className="flex flex-col">
          <span className="text-[18px] font-bold leading-tight">{t('suvidhaKiosk')}</span>
          <span className="text-[12px] opacity-80">{t('govOfIndia')}</span>
        </div>
      </div>

      <div className="text-[14px] font-medium opacity-90 hidden sm:block">
        {currentTime.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        {' | '}
        {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex bg-white/20 rounded-lg overflow-hidden" data-testid="language-switcher">
          {langs.map(l => (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className={`px-3 py-2 text-[14px] font-semibold transition-colors focus:outline-2 focus:outline-white focus:outline-offset-[-2px] ${language === l.code ? 'bg-white text-[#006EB3]' : 'text-white active:bg-white/10'}`}
              aria-label={`Switch to ${l.code}`}
              data-testid={`lang-${l.code}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setHighContrast(!highContrast)}
          className={`w-[40px] h-[40px] rounded-lg flex items-center justify-center transition-colors focus:outline-2 focus:outline-white focus:outline-offset-2 ${highContrast ? 'bg-yellow-400 text-black' : 'bg-white/20 text-white active:bg-white/30'}`}
          aria-label={t('highContrast')}
          data-testid="button-high-contrast"
        >
          <Sun size={20} />
        </button>

        <button
          onClick={() => setFontSize(prev => Math.min(prev + 10, 140))}
          className="w-[40px] h-[40px] rounded-lg bg-white/20 flex items-center justify-center text-white active:bg-white/30 transition-colors focus:outline-2 focus:outline-white focus:outline-offset-2"
          aria-label="Increase font size"
          data-testid="button-zoom-in"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={() => setFontSize(prev => Math.max(prev - 10, 80))}
          className="w-[40px] h-[40px] rounded-lg bg-white/20 flex items-center justify-center text-white active:bg-white/30 transition-colors focus:outline-2 focus:outline-white focus:outline-offset-2"
          aria-label="Decrease font size"
          data-testid="button-zoom-out"
        >
          <ZoomOut size={20} />
        </button>
      </div>
    </header>
  );
}
