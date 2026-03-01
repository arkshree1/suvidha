import { useState, useEffect, useRef } from 'react';
import { Home, Sun, ZoomIn, ZoomOut, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'wouter';
import { languageOptions, type Language } from '@/data/translations';

function AshokEmblem({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
      <circle cx="50" cy="38" r="16" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="50" cy="38" r="6" fill="white" opacity="0.9" />
      <path d="M50 54 L50 72" stroke="white" strokeWidth="2.5" />
      <path d="M50 72 L34 82" stroke="white" strokeWidth="2" />
      <path d="M50 72 L66 82" stroke="white" strokeWidth="2" />
      <path d="M50 54 L38 48" stroke="white" strokeWidth="1.5" opacity="0.7" />
      <path d="M50 54 L62 48" stroke="white" strokeWidth="1.5" opacity="0.7" />
      {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + 14 * Math.cos(rad);
        const y1 = 38 + 14 * Math.sin(rad);
        const x2 = 50 + 16.5 * Math.cos(rad);
        const y2 = 38 + 16.5 * Math.sin(rad);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1" opacity="0.6" />;
      })}
    </svg>
  );
}

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [, navigate] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languageOptions.find(l => l.code === language);

  return (
    <header className="bg-[#006EB3] text-white px-4 py-2 flex items-center justify-between gap-3 z-50" style={{ minHeight: '72px' }} data-testid="header">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-[40px] h-[40px] rounded-lg bg-white/20 flex items-center justify-center active:bg-white/30 transition-colors focus:outline-2 focus:outline-white focus:outline-offset-2"
          aria-label={t('home')}
          data-testid="button-home"
        >
          <Home size={20} />
        </button>
        <AshokEmblem size={48} />
        <div className="flex flex-col">
          <span className="text-[20px] font-bold leading-tight tracking-wide">{t('suvidhaKiosk')}</span>
          <span className="text-[11px] font-semibold opacity-90 tracking-wider uppercase">{t('govOfIndia')}</span>
          <span className="text-[10px] opacity-70">Digital India Initiative</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-[13px] font-medium opacity-90 hidden sm:block text-right">
          <div>{currentTime.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          <div>{currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="h-[40px] px-3 rounded-lg bg-white/20 text-white text-[13px] font-semibold flex items-center gap-2 active:bg-white/30 transition-colors focus:outline-2 focus:outline-white focus:outline-offset-2"
            aria-label={t('selectLanguage')}
            data-testid="language-dropdown-toggle"
          >
            <Globe size={16} />
            <span className="max-w-[70px] truncate">{currentLang?.nativeLabel || 'English'}</span>
            <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 top-[48px] w-[260px] max-h-[420px] overflow-y-auto bg-white rounded-xl border-2 border-[#DEE2E6] z-[100] animate-fadeIn"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
              data-testid="language-dropdown-list"
            >
              <div className="p-2 border-b border-[#DEE2E6]">
                <p className="text-[13px] text-[#6C757D] font-semibold px-2 py-1">{t('selectLanguage')}</p>
              </div>
              <div className="p-1">
                {languageOptions.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-3 rounded-lg text-[15px] flex items-center justify-between transition-colors ${
                      language === l.code
                        ? 'bg-[#E3F2FD] text-[#006EB3] font-bold'
                        : 'text-[#212529] hover:bg-[#F5F7FA] active:bg-[#E3F2FD]'
                    }`}
                    data-testid={`lang-${l.code}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-semibold">{l.nativeLabel}</span>
                      <span className="text-[13px] text-[#6C757D]">{l.label}</span>
                    </span>
                    {language === l.code && (
                      <span className="w-[8px] h-[8px] rounded-full bg-[#006EB3]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setHighContrast(!highContrast)}
          className={`w-[36px] h-[36px] rounded-lg flex items-center justify-center transition-colors focus:outline-2 focus:outline-white focus:outline-offset-2 ${highContrast ? 'bg-yellow-400 text-black' : 'bg-white/20 text-white active:bg-white/30'}`}
          aria-label={t('highContrast')}
          data-testid="button-high-contrast"
        >
          <Sun size={18} />
        </button>

        <button
          onClick={() => setFontSize(prev => Math.min(prev + 10, 140))}
          className="w-[36px] h-[36px] rounded-lg bg-white/20 flex items-center justify-center text-white active:bg-white/30 transition-colors focus:outline-2 focus:outline-white focus:outline-offset-2"
          aria-label="Increase font size"
          data-testid="button-zoom-in"
        >
          <ZoomIn size={18} />
        </button>
        <button
          onClick={() => setFontSize(prev => Math.max(prev - 10, 80))}
          className="w-[36px] h-[36px] rounded-lg bg-white/20 flex items-center justify-center text-white active:bg-white/30 transition-colors focus:outline-2 focus:outline-white focus:outline-offset-2"
          aria-label="Decrease font size"
          data-testid="button-zoom-out"
        >
          <ZoomOut size={18} />
        </button>

      </div>
    </header>
  );
}
