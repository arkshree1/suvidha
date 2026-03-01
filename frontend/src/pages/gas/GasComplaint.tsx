import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/layout/Breadcrumb';
import VirtualKeyboard from '@/components/common/VirtualKeyboard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { CheckCircle } from 'lucide-react';
import { useLocation } from 'wouter';

export default function GasComplaint() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const ticketId = `GAS-TKT-${Date.now().toString().slice(-6)}`;

  const categories = ['gasLeak', 'lowPressure', 'billingIssue'];

  const handleSubmit = () => { setStep('processing'); setTimeout(() => setStep('success'), 1500); };

  if (step === 'processing') return <div className="py-20"><LoadingSpinner message={t('processing')} /></div>;
  if (step === 'success') return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('gas'), path: '/gas' }, { label: t('registerComplaint') }]} />
      <div className="px-6 py-6">
        <div className="max-w-[500px] mx-auto bg-white rounded-2xl p-8 border-2 border-[#DEE2E6] text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <CheckCircle size={64} className="text-[#28A745] mx-auto mb-4" />
          <h2 className="text-[28px] font-bold text-[#212529] mb-2">{t('success')}</h2>
          <p className="text-[18px] text-[#6C757D] mb-4">{t('ticketId')}</p>
          <div className="bg-[#E8F5E9] rounded-xl p-4 mb-6"><span className="text-[24px] font-bold text-[#2E7D32]">{ticketId}</span></div>
          <button onClick={() => navigate('/gas')} className="w-full h-[64px] rounded-xl text-[20px] font-semibold bg-[#006EB3] text-white active:bg-[#005a94] focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">{t('done')}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('gas'), path: '/gas' }, { label: t('registerComplaint') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('registerComplaint')}</h1>
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('category')}</label>
            <div className="space-y-2">
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)} className={`w-full rounded-xl p-4 text-left border-2 transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2 ${category === c ? 'border-[#E65100] bg-[#FFF3E0]' : 'border-[#DEE2E6] bg-white'}`}>
                  <span className="text-[18px] font-semibold text-[#212529]">{t(c)}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('issueDescription')}</label>
            <div onClick={() => setShowKeyboard(true)} className={`bg-white rounded-xl p-4 border-2 text-[18px] min-h-[80px] cursor-pointer ${showKeyboard ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`}>{description || <span className="text-[#6C757D]">Tap to describe</span>}</div>
          </div>
        </div>
        {showKeyboard && <VirtualKeyboard value={description} onChange={setDescription} maxLength={500} />}
        <button onClick={handleSubmit} disabled={!category || !description} className="w-full mt-4 h-[72px] rounded-xl text-[22px] font-semibold bg-[#E65100] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:opacity-90 focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">{t('submit')}</button>
      </div>
    </div>
  );
}
