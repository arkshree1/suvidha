import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'wouter';
import NumericKeypad from '@/components/common/NumericKeypad';
import VirtualKeyboard from '@/components/common/VirtualKeyboard';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleLogin = () => {
    if (password === 'admin123') {
      sessionStorage.setItem('adminAuth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-6" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      <div className="max-w-[480px] w-full bg-white rounded-2xl p-8 border-2 border-[#DEE2E6] animate-fadeIn" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
        <div className="text-center mb-8">
          <div className="w-[72px] h-[72px] rounded-2xl bg-[#E3F2FD] flex items-center justify-center mx-auto mb-4">
            <Lock size={36} className="text-[#006EB3]" />
          </div>
          <h1 className="text-[28px] font-bold text-[#212529]">{t('admin')}</h1>
          <p className="text-[18px] text-[#6C757D] mt-2">{t('enterPassword')}</p>
        </div>

        <div onClick={() => setShowKeyboard(true)} className={`bg-[#F5F7FA] rounded-xl p-5 border-2 mb-4 text-center cursor-pointer ${showKeyboard ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`}>
          <div className="text-[28px] font-bold text-[#212529] tracking-[8px]" data-testid="text-password">
            {password.split('').map(() => '\u2022').join('') || '\u00A0'}
          </div>
        </div>

        {error && <p className="text-[16px] text-[#DC3545] text-center mb-4 font-semibold">{error}</p>}

        {showKeyboard && <VirtualKeyboard value={password} onChange={setPassword} maxLength={20} />}

        <button onClick={handleLogin} disabled={!password} className="w-full mt-4 h-[72px] rounded-xl text-[22px] font-semibold bg-[#006EB3] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:bg-[#005a94] transition-colors focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2" aria-label={t('login')} data-testid="button-admin-login">
          {t('login')}
        </button>
      </div>
    </div>
  );
}
