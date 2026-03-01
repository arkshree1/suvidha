import { useState } from 'react';
import { Smartphone, ShieldCheck, UserCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useSession } from '@/context/SessionContext';
import { useLocation } from 'wouter';
import NumericKeypad from '@/components/common/NumericKeypad';
import LoadingSpinner from '@/components/common/LoadingSpinner';

type AuthStep = 'select' | 'mobile-input' | 'otp-input' | 'aadhaar-input' | 'verifying';

export default function Welcome() {
  const { t } = useLanguage();
  const { loginWithMobile, loginWithAadhaar, loginAsGuest } = useAuth();
  const { setSessionActive, resetTimer } = useSession();
  const [, navigate] = useLocation();
  const [step, setStep] = useState<AuthStep>('select');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');

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

  return (
    <div className="flex-1 px-6 py-8 flex flex-col items-center justify-center min-h-[80vh] animate-fadeIn">
      <div className="text-center mb-10">
        <h1 className="text-[42px] font-bold text-[#212529] mb-2 leading-tight">
          {t('namaste')} / Welcome
        </h1>
        <h2 className="text-[28px] font-bold text-[#006EB3] mb-4">{t('welcome')}</h2>
        <p className="text-[20px] text-[#6C757D] animate-pulse">{t('tapToContinue')}</p>
      </div>

      <div className="w-full max-w-[600px] grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setStep('mobile-input')}
          className="bg-white rounded-2xl p-6 border-2 border-[#DEE2E6] flex flex-col items-center justify-center gap-4 min-h-[200px] active:border-[#006EB3] active:bg-[#F0F7FF] transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
          aria-label={t('mobileOtp')}
          data-testid="card-mobile-otp"
        >
          <div className="w-[72px] h-[72px] rounded-2xl bg-[#E3F2FD] flex items-center justify-center">
            <Smartphone size={36} className="text-[#006EB3]" />
          </div>
          <div className="text-center">
            <h3 className="text-[22px] font-bold text-[#212529] mb-1">{t('mobileOtp')}</h3>
            <p className="text-[15px] text-[#6C757D]">{t('mobileOtpDesc')}</p>
          </div>
        </button>

        <button
          onClick={() => setStep('aadhaar-input')}
          className="bg-white rounded-2xl p-6 border-2 border-[#DEE2E6] flex flex-col items-center justify-center gap-4 min-h-[200px] active:border-[#006EB3] active:bg-[#F0F7FF] transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
          aria-label={t('aadhaarLogin')}
          data-testid="card-aadhaar"
        >
          <div className="w-[72px] h-[72px] rounded-2xl bg-[#E8F5E9] flex items-center justify-center">
            <ShieldCheck size={36} className="text-[#28A745]" />
          </div>
          <div className="text-center">
            <h3 className="text-[22px] font-bold text-[#212529] mb-1">{t('aadhaarLogin')}</h3>
            <p className="text-[15px] text-[#6C757D]">{t('aadhaarDesc')}</p>
          </div>
        </button>
      </div>

      <button
        onClick={() => handleLogin('guest')}
        className="text-[18px] text-[#006EB3] font-semibold flex items-center gap-2 active:opacity-80 focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
        aria-label={t('guestAccess')}
        data-testid="button-guest"
      >
        <UserCircle size={24} />
        {t('guestAccess')}
      </button>
    </div>
  );
}
