import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/layout/Breadcrumb';
import NumericKeypad from '@/components/common/NumericKeypad';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { CheckCircle } from 'lucide-react';
import { useLocation } from 'wouter';

export default function MeterReading() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [step, setStep] = useState<'input' | 'processing' | 'success'>('input');
  const [reading, setReading] = useState('');
  const [fileName, setFileName] = useState('');

  const handleSubmit = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 1500);
  };

  if (step === 'processing') return <div className="py-20"><LoadingSpinner message={t('processing')} /></div>;

  if (step === 'success') {
    return (
      <div className="animate-fadeIn">
        <Breadcrumb items={[{ label: t('electricity'), path: '/electricity' }, { label: t('submitMeterReading') }]} />
        <div className="px-6 py-6">
          <div className="max-w-[500px] mx-auto bg-white rounded-2xl p-8 border-2 border-[#DEE2E6] text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <CheckCircle size={64} className="text-[#28A745] mx-auto mb-4" />
            <h2 className="text-[28px] font-bold text-[#212529] mb-4">{t('success')}</h2>
            <div className="space-y-2 text-left mb-6">
              <div className="flex justify-between py-2 border-b border-[#F5F7FA]">
                <span className="text-[16px] text-[#6C757D]">{t('currentReading')}</span>
                <span className="text-[16px] font-semibold">{reading} kWh</span>
              </div>
              {fileName && <div className="flex justify-between py-2 border-b border-[#F5F7FA]">
                <span className="text-[16px] text-[#6C757D]">{t('uploadPhoto')}</span>
                <span className="text-[16px] font-semibold">{fileName}</span>
              </div>}
            </div>
            <button onClick={() => navigate('/electricity')} className="w-full h-[64px] rounded-xl text-[20px] font-semibold bg-[#006EB3] text-white active:bg-[#005a94] focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2" aria-label={t('done')} data-testid="button-done">{t('done')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('electricity'), path: '/electricity' }, { label: t('submitMeterReading') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('submitMeterReading')}</h1>
        <p className="text-[18px] text-[#6C757D] mb-4">{t('currentReading')}</p>
        <div className="bg-white rounded-2xl p-6 border-2 border-[#DEE2E6] mb-4 text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <div className="text-[36px] font-bold text-[#212529]" data-testid="text-reading">{reading || '0'} <span className="text-[18px] text-[#6C757D]">kWh</span></div>
        </div>
        <div className="mb-4">
          <label className="block">
            <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} data-testid="input-photo" />
            <div className="bg-white rounded-xl p-4 border-2 border-dashed border-[#006EB3] text-[16px] text-[#006EB3] font-medium text-center cursor-pointer active:bg-[#E3F2FD]">
              {fileName || t('uploadPhoto')}
            </div>
          </label>
        </div>
        <NumericKeypad value={reading} onChange={setReading} maxLength={6} onSubmit={handleSubmit} submitLabel={t('submit')} />
      </div>
    </div>
  );
}
