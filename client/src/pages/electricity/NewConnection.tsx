import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/layout/Breadcrumb';
import VirtualKeyboard from '@/components/common/VirtualKeyboard';
import NumericKeypad from '@/components/common/NumericKeypad';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { CheckCircle } from 'lucide-react';
import { useLocation } from 'wouter';
import QrUpload from '@/components/common/QrUpload';

export default function NewConnection() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [activeField, setActiveField] = useState<'name' | 'address' | 'load' | null>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [connType, setConnType] = useState('Residential');
  const [load, setLoad] = useState('');
  const [fileName, setFileName] = useState('');
  const refNo = `APP-${Date.now().toString().slice(-8)}`;

  const handleSubmit = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 1500);
  };

  if (step === 'processing') return <div className="py-20"><LoadingSpinner message={t('processing')} /></div>;

  if (step === 'success') {
    return (
      <div className="animate-fadeIn">
        <Breadcrumb items={[{ label: t('electricity'), path: '/electricity' }, { label: t('newConnection') }]} />
        <div className="px-6 py-6">
          <div className="max-w-[500px] mx-auto bg-white rounded-2xl p-8 border-2 border-[#DEE2E6] text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <CheckCircle size={64} className="text-[#28A745] mx-auto mb-4" />
            <h2 className="text-[28px] font-bold text-[#212529] mb-2">{t('success')}</h2>
            <p className="text-[18px] text-[#6C757D] mb-4">{t('applicationRef')}</p>
            <div className="bg-[#E8F5E9] rounded-xl p-4 mb-6">
              <span className="text-[24px] font-bold text-[#2E7D32]" data-testid="text-ref-no">{refNo}</span>
            </div>
            <button onClick={() => navigate('/electricity')} className="w-full h-[64px] rounded-xl text-[20px] font-semibold bg-[#006EB3] text-white active:bg-[#005a94] focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2" aria-label={t('done')} data-testid="button-done">{t('done')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('electricity'), path: '/electricity' }, { label: t('newConnection') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('newConnection')}</h1>
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('name')}</label>
            <div onClick={() => setActiveField('name')} className={`bg-white rounded-xl p-4 border-2 text-[18px] min-h-[56px] cursor-pointer ${activeField === 'name' ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`} data-testid="input-name">{name || <span className="text-[#6C757D]">Tap to enter name</span>}</div>
          </div>
          <div>
            <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('address')}</label>
            <div onClick={() => setActiveField('address')} className={`bg-white rounded-xl p-4 border-2 text-[18px] min-h-[56px] cursor-pointer ${activeField === 'address' ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`} data-testid="input-address">{address || <span className="text-[#6C757D]">Tap to enter address</span>}</div>
          </div>
          <div>
            <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('connectionType')}</label>
            <div className="flex gap-3">
              {['Residential', 'Commercial'].map(type => (
                <button key={type} onClick={() => setConnType(type)} className={`flex-1 h-[64px] rounded-xl text-[18px] font-semibold border-2 transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2 ${connType === type ? 'border-[#006EB3] bg-[#E3F2FD] text-[#006EB3]' : 'border-[#DEE2E6] bg-white text-[#212529]'}`} aria-label={type} data-testid={`type-${type}`}>{type === 'Residential' ? t('residential') : t('commercial')}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('loadRequired')}</label>
            <div onClick={() => setActiveField('load')} className={`bg-white rounded-xl p-4 border-2 text-[18px] min-h-[56px] cursor-pointer ${activeField === 'load' ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`} data-testid="input-load">{load ? `${load} kW` : <span className="text-[#6C757D]">Tap to enter</span>}</div>
          </div>
          <div>
            <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('uploadDocument')}</label>
            <QrUpload onFileReceived={setFileName} label={t('uploadDocument')} />
          </div>
        </div>

        {activeField === 'name' && <VirtualKeyboard value={name} onChange={setName} maxLength={100} />}
        {activeField === 'address' && <VirtualKeyboard value={address} onChange={setAddress} maxLength={200} />}
        {activeField === 'load' && <NumericKeypad value={load} onChange={setLoad} maxLength={4} />}

        <button onClick={handleSubmit} disabled={!name || !address || !load} className="w-full mt-6 h-[72px] rounded-xl text-[22px] font-semibold bg-[#006EB3] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:bg-[#005a94] transition-colors focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2" aria-label={t('submit')} data-testid="button-submit">{t('submit')}</button>
      </div>
    </div>
  );
}
