import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { wardAreas } from '@/data/mockData';
import Breadcrumb from '@/components/layout/Breadcrumb';
import VirtualKeyboard from '@/components/common/VirtualKeyboard';
import NumericKeypad from '@/components/common/NumericKeypad';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { CheckCircle } from 'lucide-react';
import { useLocation } from 'wouter';

interface Props {
  titleKey: string;
  isConnection?: boolean;
  isMeterReading?: boolean;
}

export default function GenericWaterForm({ titleKey, isConnection, isMeterReading }: Props) {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [reading, setReading] = useState('');
  const [fileName, setFileName] = useState('');
  const refNo = `WTR-${Date.now().toString().slice(-8)}`;

  const handleSubmit = () => { setStep('processing'); setTimeout(() => setStep('success'), 1500); };

  if (step === 'processing') return <div className="py-20"><LoadingSpinner message={t('processing')} /></div>;
  if (step === 'success') return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('water'), path: '/water' }, { label: t(titleKey) }]} />
      <div className="px-6 py-6">
        <div className="max-w-[500px] mx-auto bg-white rounded-2xl p-8 border-2 border-[#DEE2E6] text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <CheckCircle size={64} className="text-[#28A745] mx-auto mb-4" />
          <h2 className="text-[28px] font-bold text-[#212529] mb-2">{t('success')}</h2>
          <p className="text-[18px] text-[#6C757D] mb-4">{isMeterReading ? t('submitMeterReading') : isConnection ? t('applicationRef') : t('ticketId')}</p>
          <div className="bg-[#E8F5E9] rounded-xl p-4 mb-6"><span className="text-[24px] font-bold text-[#2E7D32]">{refNo}</span></div>
          <button onClick={() => navigate('/water')} className="w-full h-[64px] rounded-xl text-[20px] font-semibold bg-[#006EB3] text-white active:bg-[#005a94] focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">{t('done')}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('water'), path: '/water' }, { label: t(titleKey) }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t(titleKey)}</h1>
        <div className="space-y-4 mb-6">
          {isConnection && (
            <>
              <div>
                <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('name')}</label>
                <div onClick={() => setActiveField('name')} className={`bg-white rounded-xl p-4 border-2 text-[18px] min-h-[56px] cursor-pointer ${activeField === 'name' ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`}>{name || <span className="text-[#6C757D]">Tap to enter</span>}</div>
              </div>
              <div>
                <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('address')}</label>
                <div onClick={() => setActiveField('address')} className={`bg-white rounded-xl p-4 border-2 text-[18px] min-h-[56px] cursor-pointer ${activeField === 'address' ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`}>{address || <span className="text-[#6C757D]">Tap to enter</span>}</div>
              </div>
              <div>
                <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('uploadDocument')}</label>
                <label className="block"><input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
                  <div className="bg-white rounded-xl p-4 border-2 border-dashed border-[#006EB3] text-[16px] text-[#006EB3] font-medium text-center cursor-pointer">{fileName || 'Tap to select'}</div>
                </label>
              </div>
            </>
          )}
          {isMeterReading && (
            <>
              <p className="text-[18px] text-[#6C757D]">{t('currentReading')}</p>
              <div className="bg-white rounded-2xl p-6 border-2 border-[#DEE2E6] text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                <div className="text-[36px] font-bold text-[#212529]">{reading || '0'} <span className="text-[18px] text-[#6C757D]">KL</span></div>
              </div>
              <label className="block"><input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
                <div className="bg-white rounded-xl p-4 border-2 border-dashed border-[#006EB3] text-[16px] text-[#006EB3] font-medium text-center cursor-pointer">{fileName || t('uploadPhoto')}</div>
              </label>
            </>
          )}
          {!isConnection && !isMeterReading && (
            <>
              <div>
                <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('selectArea')}</label>
                <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                  {wardAreas.map(w => (
                    <button key={w} onClick={() => setArea(w)} className={`rounded-xl p-3 text-[14px] font-medium text-left border-2 transition-colors ${area === w ? 'border-[#00695C] bg-[#E0F2F1] text-[#00695C]' : 'border-[#DEE2E6] bg-white text-[#212529]'}`}>{w}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('issueDescription')}</label>
                <div onClick={() => setActiveField('description')} className={`bg-white rounded-xl p-4 border-2 text-[18px] min-h-[80px] cursor-pointer ${activeField === 'description' ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`}>{description || <span className="text-[#6C757D]">Tap to describe</span>}</div>
              </div>
            </>
          )}
        </div>
        {activeField === 'name' && <VirtualKeyboard value={name} onChange={setName} maxLength={100} />}
        {activeField === 'address' && <VirtualKeyboard value={address} onChange={setAddress} maxLength={200} />}
        {activeField === 'description' && <VirtualKeyboard value={description} onChange={setDescription} maxLength={500} />}
        {isMeterReading && <NumericKeypad value={reading} onChange={setReading} maxLength={6} />}
        <button onClick={handleSubmit} className="w-full mt-4 h-[72px] rounded-xl text-[22px] font-semibold bg-[#00695C] text-white active:opacity-90 focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">{t('submit')}</button>
      </div>
    </div>
  );
}
