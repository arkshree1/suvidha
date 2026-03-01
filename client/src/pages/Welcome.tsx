import { useState, useEffect, useCallback } from 'react';
import { Smartphone, ShieldCheck, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useSession } from '@/context/SessionContext';
import { useLocation } from 'wouter';
import NumericKeypad from '@/components/common/NumericKeypad';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import slideSuryaghar from '@assets/Picsart_26-03-01_23-23-13-947_1772393768205.png';
import slideUjjwala from '@assets/Picsart_26-03-01_23-35-07-959_1772393768205.png';

type AuthStep = 'select' | 'mobile-input' | 'otp-input' | 'aadhaar-input' | 'verifying';

type BannerSlide = {
  type: 'image';
  image: string;
} | {
  type: 'gradient';
  gradient: string;
  titleEn: string;
  subtitleEn: string;
  titleHi: string;
  subtitleHi: string;
};

const bannerSlides: BannerSlide[] = [
  {
    type: 'image',
    image: slideSuryaghar,
  },
  {
    type: 'image',
    image: slideUjjwala,
  },
  {
    type: 'gradient',
    gradient: 'linear-gradient(135deg, #004A7C 0%, #006EB3 50%, #0288D1 100%)',
    titleEn: 'Empowering Citizen Services',
    subtitleEn: 'with Modern Tech - Digital India.',
    titleHi: 'नागरिक सेवाओं को सशक्त बनाना',
    subtitleHi: 'आधुनिक तकनीक के साथ - डिजिटल इंडिया।',
  },
  {
    type: 'gradient',
    gradient: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)',
    titleEn: 'Pay Bills, File Complaints',
    subtitleEn: 'All services at your fingertips.',
    titleHi: 'बिल भुगतान, शिकायत दर्ज करें',
    subtitleHi: 'सभी सेवाएं आपकी उंगलियों पर।',
  },
  {
    type: 'gradient',
    gradient: 'linear-gradient(135deg, #BF360C 0%, #E65100 50%, #F57C00 100%)',
    titleEn: 'Transparent & Accountable',
    subtitleEn: 'Government services made simple.',
    titleHi: 'पारदर्शी और जवाबदेह',
    subtitleHi: 'सरकारी सेवाएं सरल बनाई गईं।',
  },
];

export default function Welcome() {
  const { t, language } = useLanguage();
  const { loginWithMobile, loginWithAadhaar, loginAsGuest } = useAuth();
  const { setSessionActive, resetTimer } = useSession();
  const [, navigate] = useLocation();
  const [step, setStep] = useState<AuthStep>('select');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % bannerSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  }, []);

  useEffect(() => {
    if (step !== 'select') return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [step, nextSlide]);

  const handleLogin = (method: 'mobile' | 'aadhaar' | 'guest') => {
    setStep('verifying');
    setTimeout(() => {
      if (method === 'mobile') loginWithMobile(mobileNumber);
      else if (method === 'aadhaar') loginWithAadhaar(aadhaarNumber);
      else loginAsGuest();
      setSessionActive(true);
      resetTimer();
      navigate('/dashboard');
    }, 1500);
  };

  const formatAadhaar = (val: string) => {
    const clean = val.replace(/\s/g, '');
    return clean.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  if (step === 'verifying') {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[80vh]">
        <LoadingSpinner message={t('processing')} />
      </div>
    );
  }

  if (step === 'mobile-input') {
    return (
      <div className="flex-1 px-6 py-8 animate-fadeIn">
        <button onClick={() => setStep('select')} className="text-[18px] text-[#006EB3] font-semibold mb-6 flex items-center gap-2 active:opacity-80 focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2" aria-label={t('back')} data-testid="button-back">
          &larr; {t('back')}
        </button>
        <h2 className="text-[28px] font-bold text-[#212529] text-center mb-2">{t('mobileOtp')}</h2>
        <p className="text-[18px] text-[#6C757D] text-center mb-6">{t('enterMobile')}</p>
        <div className="bg-white rounded-2xl p-6 border-2 border-[#DEE2E6] mb-6 text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <div className="text-[36px] font-bold text-[#212529] tracking-widest min-h-[48px]" data-testid="text-mobile-display">
            {mobileNumber || '\u00A0'}
          </div>
        </div>
        <NumericKeypad
          value={mobileNumber}
          onChange={setMobileNumber}
          maxLength={10}
          onSubmit={() => setStep('otp-input')}
          submitLabel={t('sendOtp')}
        />
      </div>
    );
  }

  if (step === 'otp-input') {
    return (
      <div className="flex-1 px-6 py-8 animate-fadeIn">
        <button onClick={() => setStep('mobile-input')} className="text-[18px] text-[#006EB3] font-semibold mb-6 flex items-center gap-2 active:opacity-80 focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2" aria-label={t('back')} data-testid="button-back">
          &larr; {t('back')}
        </button>
        <h2 className="text-[28px] font-bold text-[#212529] text-center mb-2">{t('verifyOtp')}</h2>
        <p className="text-[18px] text-[#6C757D] text-center mb-6">{t('enterOtp')}</p>
        <div className="bg-white rounded-2xl p-6 border-2 border-[#DEE2E6] mb-6 text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <div className="text-[40px] font-bold text-[#212529] tracking-[12px] min-h-[48px]" data-testid="text-otp-display">
            {otp.split('').map(() => '\u2022').join('') || '\u00A0'}
          </div>
        </div>
        <NumericKeypad
          value={otp}
          onChange={setOtp}
          maxLength={6}
          onSubmit={() => handleLogin('mobile')}
          submitLabel={t('verifyOtp')}
        />
      </div>
    );
  }

  if (step === 'aadhaar-input') {
    return (
      <div className="flex-1 px-6 py-8 animate-fadeIn">
        <button onClick={() => setStep('select')} className="text-[18px] text-[#006EB3] font-semibold mb-6 flex items-center gap-2 active:opacity-80 focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2" aria-label={t('back')} data-testid="button-back">
          &larr; {t('back')}
        </button>
        <h2 className="text-[28px] font-bold text-[#212529] text-center mb-2">{t('aadhaarLogin')}</h2>
        <p className="text-[18px] text-[#6C757D] text-center mb-6">{t('enterAadhaar')}</p>
        <div className="bg-white rounded-2xl p-6 border-2 border-[#DEE2E6] mb-6 text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <div className="text-[32px] font-bold text-[#212529] tracking-widest min-h-[48px]" data-testid="text-aadhaar-display">
            {formatAadhaar(aadhaarNumber) || '\u00A0'}
          </div>
        </div>
        <NumericKeypad
          value={aadhaarNumber}
          onChange={setAadhaarNumber}
          maxLength={12}
          onSubmit={() => handleLogin('aadhaar')}
          submitLabel={t('verify')}
        />
      </div>
    );
  }

  const slide = bannerSlides[currentSlide];
  const isHindi = language === 'hi' || language === 'mr';

  return (
    <div className="flex-1 flex flex-col animate-fadeIn">
      <div className="relative w-full overflow-hidden" style={{ height: '180px' }}>
        {slide.type === 'image' ? (
          <img
            src={slide.image}
            alt="Government scheme banner"
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700"
            data-testid="img-carousel-banner"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-700"
            style={{ background: slide.gradient }}
          >
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <circle cx="650" cy="60" r="90" fill="white" opacity="0.08" />
                <circle cx="150" cy="160" r="60" fill="white" opacity="0.05" />
              </svg>
            </div>
            <div className="relative z-10 text-center px-8">
              <h2 className="text-[24px] font-bold text-white mb-1 drop-shadow-lg" data-testid="text-carousel-title">
                {isHindi ? slide.titleHi : slide.titleEn}
              </h2>
              <p className="text-[16px] text-white/90 font-medium drop-shadow">
                {isHindi ? slide.subtitleHi : slide.subtitleEn}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-[36px] h-[36px] rounded-full bg-black/30 flex items-center justify-center text-white active:bg-black/50 transition-colors z-20"
          aria-label="Previous slide"
          data-testid="button-prev-slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-[36px] h-[36px] rounded-full bg-black/30 flex items-center justify-center text-white active:bg-black/50 transition-colors z-20"
          aria-label="Next slide"
          data-testid="button-next-slide"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all ${i === currentSlide ? 'w-[10px] h-[10px] bg-white' : 'w-[8px] h-[8px] bg-white/50'}`}
              aria-label={`Slide ${i + 1}`}
              data-testid={`dot-slide-${i}`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 py-4 flex flex-col lg:flex-row items-center lg:items-center justify-center gap-6 lg:gap-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none animate-flag-swirl" aria-hidden="true">
          <svg viewBox="0 0 900 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="saffron" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF9933" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#FF9933" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#FF9933" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="flagWhite" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="green" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#138808" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#138808" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#138808" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d="M-100,0 Q100,30 300,10 T700,40 T1000,20 V130 Q800,100 500,130 T100,110 T-100,130Z" fill="url(#saffron)">
              <animate attributeName="d" dur="8s" repeatCount="indefinite" values="
                M-100,0 Q100,30 300,10 T700,40 T1000,20 V130 Q800,100 500,130 T100,110 T-100,130Z;
                M-100,20 Q100,0 300,30 T700,10 T1000,40 V140 Q800,120 500,100 T100,130 T-100,110Z;
                M-100,0 Q100,30 300,10 T700,40 T1000,20 V130 Q800,100 500,130 T100,110 T-100,130Z
              " />
            </path>
            <path d="M-100,120 Q150,150 350,130 T750,160 T1000,140 V270 Q800,240 500,270 T100,250 T-100,260Z" fill="url(#flagWhite)">
              <animate attributeName="d" dur="10s" repeatCount="indefinite" values="
                M-100,120 Q150,150 350,130 T750,160 T1000,140 V270 Q800,240 500,270 T100,250 T-100,260Z;
                M-100,140 Q150,120 350,150 T750,130 T1000,160 V260 Q800,270 500,240 T100,270 T-100,250Z;
                M-100,120 Q150,150 350,130 T750,160 T1000,140 V270 Q800,240 500,270 T100,250 T-100,260Z
              " />
            </path>
            <circle cx="450" cy="200" r="28" fill="none" stroke="#000080" strokeWidth="2" opacity="0.15">
              <animateTransform attributeName="transform" type="rotate" from="0 450 200" to="360 450 200" dur="20s" repeatCount="indefinite" />
            </circle>
            {[...Array(24)].map((_, i) => {
              const angle = (i * 15 * Math.PI) / 180;
              const x1 = 450 + 22 * Math.cos(angle);
              const y1 = 200 + 22 * Math.sin(angle);
              const x2 = 450 + 28 * Math.cos(angle);
              const y2 = 200 + 28 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000080" strokeWidth="1.5" opacity="0.12" />;
            })}
            <path d="M-100,260 Q150,290 350,270 T750,300 T1000,280 V400 Q800,380 500,400 T100,390 T-100,400Z" fill="url(#green)">
              <animate attributeName="d" dur="9s" repeatCount="indefinite" values="
                M-100,260 Q150,290 350,270 T750,300 T1000,280 V400 Q800,380 500,400 T100,390 T-100,400Z;
                M-100,280 Q150,260 350,290 T750,270 T1000,300 V400 Q800,400 500,380 T100,400 T-100,390Z;
                M-100,260 Q150,290 350,270 T750,300 T1000,280 V400 Q800,380 500,400 T100,390 T-100,400Z
              " />
            </path>
          </svg>
        </div>
        <div className="text-center lg:text-left lg:flex-1 lg:max-w-[380px]">
          <h1 className="text-[32px] font-bold text-[#212529] mb-1 leading-tight" data-testid="text-namaste">
            {t('namaste')} / Welcome
          </h1>
          <h2 className="text-[20px] font-bold text-[#006EB3] mb-2">{t('welcome')}</h2>
          <p className="text-[16px] text-[#6C757D]">{t('tapToContinue')}</p>
        </div>

        <div className="w-full max-w-[420px] lg:max-w-[380px]">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <button
              onClick={() => setStep('mobile-input')}
              className="bg-white rounded-2xl p-4 border-2 border-[#DEE2E6] flex flex-col items-center justify-center gap-2 min-h-[130px] active:border-[#006EB3] active:bg-[#F0F7FF] transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
              aria-label={t('mobileOtp')}
              data-testid="card-mobile-otp"
            >
              <div className="w-[52px] h-[52px] rounded-xl bg-[#E3F2FD] flex items-center justify-center">
                <Smartphone size={26} className="text-[#006EB3]" />
              </div>
              <div className="text-center">
                <h3 className="text-[16px] font-bold text-[#212529] mb-0.5">{t('mobileOtp')}</h3>
                <p className="text-[12px] text-[#6C757D] leading-snug">{t('mobileOtpDesc')}</p>
              </div>
            </button>

            <button
              onClick={() => setStep('aadhaar-input')}
              className="bg-white rounded-2xl p-4 border-2 border-[#DEE2E6] flex flex-col items-center justify-center gap-2 min-h-[130px] active:border-[#006EB3] active:bg-[#F0F7FF] transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
              aria-label={t('aadhaarLogin')}
              data-testid="card-aadhaar"
            >
              <div className="w-[52px] h-[52px] rounded-xl bg-[#FFF3E0] flex items-center justify-center">
                <ShieldCheck size={26} className="text-[#F26522]" />
              </div>
              <div className="text-center">
                <h3 className="text-[16px] font-bold text-[#212529] mb-0.5">{t('aadhaarLogin')}</h3>
                <p className="text-[12px] text-[#6C757D] leading-snug">{t('aadhaarDesc')}</p>
              </div>
            </button>
          </div>

          <button
            onClick={() => handleLogin('guest')}
            className="w-full flex items-center justify-center gap-2 text-[16px] text-[#006EB3] font-semibold py-2 active:opacity-80 focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
            aria-label={t('guestAccess')}
            data-testid="button-guest"
          >
            <UserCircle size={20} />
            {t('guestAccess')}
          </button>
        </div>
      </div>
    </div>
  );
}
