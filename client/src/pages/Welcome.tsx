import { useState, useEffect, useCallback } from 'react';
import { Smartphone, ShieldCheck, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useSession } from '@/context/SessionContext';
import { useLocation } from 'wouter';
import NumericKeypad from '@/components/common/NumericKeypad';
import LoadingSpinner from '@/components/common/LoadingSpinner';

type AuthStep = 'select' | 'mobile-input' | 'otp-input' | 'aadhaar-input' | 'verifying';

const bannerSlides = [
  {
    gradient: 'linear-gradient(135deg, #004A7C 0%, #006EB3 50%, #0288D1 100%)',
    titleEn: 'Empowering Citizen Services',
    subtitleEn: 'with Modern Tech - Digital India.',
    titleHi: 'नागरिक सेवाओं को सशक्त बनाना',
    subtitleHi: 'आधुनिक तकनीक के साथ - डिजिटल इंडिया।',
  },
  {
    gradient: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)',
    titleEn: 'Pay Bills, File Complaints',
    subtitleEn: 'All services at your fingertips.',
    titleHi: 'बिल भुगतान, शिकायत दर्ज करें',
    subtitleHi: 'सभी सेवाएं आपकी उंगलियों पर।',
  },
  {
    gradient: 'linear-gradient(135deg, #BF360C 0%, #E65100 50%, #F57C00 100%)',
    titleEn: 'Transparent & Accountable',
    subtitleEn: 'Government services made simple.',
    titleHi: 'पारदर्शी और जवाबदेह',
    subtitleHi: 'सरकारी सेवाएं सरल बनाई गईं।',
  },
  {
    gradient: 'linear-gradient(135deg, #4A148C 0%, #6A1B9A 50%, #8E24AA 100%)',
    titleEn: 'Grievance Redressal',
    subtitleEn: 'Your voice matters. File & track complaints.',
    titleHi: 'शिकायत निवारण',
    subtitleHi: 'आपकी आवाज़ मायने रखती है।',
  },
  {
    gradient: 'linear-gradient(135deg, #006064 0%, #00838F 50%, #0097A7 100%)',
    titleEn: 'Water & Sanitation Services',
    subtitleEn: 'Clean water for every household.',
    titleHi: 'जल एवं स्वच्छता सेवाएं',
    subtitleHi: 'हर घर में स्वच्छ जल।',
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
      <div className="relative w-full overflow-hidden" style={{ minHeight: '240px' }}>
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-700"
          style={{ background: slide.gradient }}
        >
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <circle cx="650" cy="80" r="120" fill="white" opacity="0.08" />
              <circle cx="150" cy="220" r="80" fill="white" opacity="0.05" />
              <path d="M0,250 Q200,180 400,220 T800,200 V300 H0Z" fill="white" opacity="0.06" />
            </svg>
          </div>
          <div className="relative z-10 text-center px-8">
            <h2 className="text-[32px] font-bold text-white mb-2 drop-shadow-lg" data-testid="text-carousel-title">
              {isHindi ? slide.titleHi : slide.titleEn}
            </h2>
            <p className="text-[20px] text-white/90 font-medium drop-shadow">
              {isHindi ? slide.subtitleHi : slide.subtitleEn}
            </p>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-[44px] h-[44px] rounded-full bg-black/30 flex items-center justify-center text-white active:bg-black/50 transition-colors z-20"
          aria-label="Previous slide"
          data-testid="button-prev-slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-[44px] h-[44px] rounded-full bg-black/30 flex items-center justify-center text-white active:bg-black/50 transition-colors z-20"
          aria-label="Next slide"
          data-testid="button-next-slide"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all ${i === currentSlide ? 'w-[12px] h-[12px] bg-white' : 'w-[10px] h-[10px] bg-white/50'}`}
              aria-label={`Slide ${i + 1}`}
              data-testid={`dot-slide-${i}`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 py-8 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12">
        <div className="text-center lg:text-left lg:flex-1 lg:max-w-[400px]">
          <h1 className="text-[38px] font-bold text-[#212529] mb-1 leading-tight" data-testid="text-namaste">
            {t('namaste')} / Welcome
          </h1>
          <h2 className="text-[24px] font-bold text-[#006EB3] mb-3">{t('welcome')}</h2>
          <p className="text-[18px] text-[#6C757D]">{t('tapToContinue')}</p>
        </div>

        <div className="w-full max-w-[480px] lg:max-w-[420px]">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <button
              onClick={() => setStep('mobile-input')}
              className="bg-white rounded-2xl p-5 border-2 border-[#DEE2E6] flex flex-col items-center justify-center gap-3 min-h-[170px] active:border-[#006EB3] active:bg-[#F0F7FF] transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
              aria-label={t('mobileOtp')}
              data-testid="card-mobile-otp"
            >
              <div className="w-[64px] h-[64px] rounded-2xl bg-[#E3F2FD] flex items-center justify-center">
                <Smartphone size={32} className="text-[#006EB3]" />
              </div>
              <div className="text-center">
                <h3 className="text-[18px] font-bold text-[#212529] mb-1">{t('mobileOtp')}</h3>
                <p className="text-[13px] text-[#6C757D] leading-snug">{t('mobileOtpDesc')}</p>
              </div>
            </button>

            <button
              onClick={() => setStep('aadhaar-input')}
              className="bg-white rounded-2xl p-5 border-2 border-[#DEE2E6] flex flex-col items-center justify-center gap-3 min-h-[170px] active:border-[#006EB3] active:bg-[#F0F7FF] transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
              aria-label={t('aadhaarLogin')}
              data-testid="card-aadhaar"
            >
              <div className="w-[64px] h-[64px] rounded-2xl bg-[#FFF3E0] flex items-center justify-center">
                <ShieldCheck size={32} className="text-[#F26522]" />
              </div>
              <div className="text-center">
                <h3 className="text-[18px] font-bold text-[#212529] mb-1">{t('aadhaarLogin')}</h3>
                <p className="text-[13px] text-[#6C757D] leading-snug">{t('aadhaarDesc')}</p>
              </div>
            </button>
          </div>

          <button
            onClick={() => handleLogin('guest')}
            className="w-full flex items-center justify-center gap-2 text-[17px] text-[#006EB3] font-semibold py-3 active:opacity-80 focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
            aria-label={t('guestAccess')}
            data-testid="button-guest"
          >
            <UserCircle size={22} />
            {t('guestAccess')}
          </button>
        </div>
      </div>
    </div>
  );
}
