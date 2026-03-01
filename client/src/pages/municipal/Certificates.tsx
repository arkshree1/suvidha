import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/layout/Breadcrumb';
import VirtualKeyboard from '@/components/common/VirtualKeyboard';
import { CheckCircle, Download } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Certificates() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [certType, setCertType] = useState('');
  const [personName, setPersonName] = useState('');
  const [dateOfEvent, setDateOfEvent] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeField, setActiveField] = useState<'name' | 'date' | null>(null);
  const [showCert, setShowCert] = useState(false);
  const regNo = `REG-${Date.now().toString().slice(-8)}`;

  if (showCert) {
    return (
      <div className="animate-fadeIn">
        <Breadcrumb items={[{ label: t('municipal'), path: '/municipal' }, { label: t('birthDeathCert') }]} />
        <div className="px-6 py-6">
          <div className="max-w-[500px] mx-auto bg-white rounded-2xl border-2 border-[#DEE2E6] overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <div className="bg-[#0D47A1] text-white p-6 text-center">
              <h2 className="text-[24px] font-bold">{certType === 'birth' ? t('birth') : t('death')}</h2>
              <p className="text-[14px] opacity-90">{t('registrationNo')}: {regNo}</p>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between py-2 border-b border-[#F5F7FA]">
                <span className="text-[16px] text-[#6C757D]">{t('personName')}</span>
                <span className="text-[16px] font-semibold">{personName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F5F7FA]">
                <span className="text-[16px] text-[#6C757D]">{t('dateOfEvent')}</span>
                <span className="text-[16px] font-semibold">{dateOfEvent}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F5F7FA]">
                <span className="text-[16px] text-[#6C757D]">{t('selectType')}</span>
                <span className="text-[16px] font-semibold">{certType === 'birth' ? t('birth') : t('death')}</span>
              </div>
            </div>
            <div className="p-6 pt-0 space-y-3">
              <button onClick={() => alert('Download initiated')} className="w-full h-[64px] rounded-xl text-[20px] font-semibold bg-[#0D47A1] text-white flex items-center justify-center gap-3 active:opacity-90 focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">
                <Download size={24} />{t('download')}
              </button>
              <button onClick={() => navigate('/municipal')} className="w-full h-[64px] rounded-xl text-[20px] font-semibold bg-[#F5F7FA] text-[#212529] border-2 border-[#DEE2E6] active:bg-[#DEE2E6] focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2">{t('done')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('municipal'), path: '/municipal' }, { label: t('birthDeathCert') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('birthDeathCert')}</h1>
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('selectType')}</label>
            <div className="flex gap-3">
              {['birth', 'death'].map(type => (
                <button key={type} onClick={() => setCertType(type)} className={`flex-1 h-[64px] rounded-xl text-[18px] font-semibold border-2 transition-colors ${certType === type ? 'border-[#0D47A1] bg-[#E3F2FD] text-[#0D47A1]' : 'border-[#DEE2E6] bg-white text-[#212529]'}`}>{type === 'birth' ? t('birth') : t('death')}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('personName')}</label>
            <div onClick={() => { setActiveField('name'); setShowKeyboard(true); }} className={`bg-white rounded-xl p-4 border-2 text-[18px] min-h-[56px] cursor-pointer ${activeField === 'name' ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`}>{personName || <span className="text-[#6C757D]">Tap to enter</span>}</div>
          </div>
          <div>
            <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('dateOfEvent')}</label>
            <div onClick={() => { setActiveField('date'); setShowKeyboard(true); }} className={`bg-white rounded-xl p-4 border-2 text-[18px] min-h-[56px] cursor-pointer ${activeField === 'date' ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`}>{dateOfEvent || <span className="text-[#6C757D]">DD/MM/YYYY</span>}</div>
          </div>
        </div>
        {showKeyboard && activeField && <VirtualKeyboard value={activeField === 'name' ? personName : dateOfEvent} onChange={activeField === 'name' ? setPersonName : setDateOfEvent} maxLength={100} />}
        <button onClick={() => setShowCert(true)} disabled={!certType || !personName || !dateOfEvent} className="w-full mt-4 h-[72px] rounded-xl text-[22px] font-semibold bg-[#0D47A1] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:opacity-90 focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">{t('generate')}</button>
      </div>
    </div>
  );
}
