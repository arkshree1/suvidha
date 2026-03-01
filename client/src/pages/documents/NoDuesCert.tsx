import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { CheckCircle, Download } from 'lucide-react';
import { useLocation } from 'wouter';

export default function NoDuesCert() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [serviceType, setServiceType] = useState('');
  const [showCert, setShowCert] = useState(false);

  const services = ['Electricity', 'Gas', 'Water', 'Municipal'];

  if (showCert) {
    return (
      <div className="animate-fadeIn">
        <Breadcrumb items={[{ label: t('documents'), path: '/documents' }, { label: t('noDuesCert') }]} />
        <div className="px-6 py-6">
          <div className="max-w-[500px] mx-auto bg-white rounded-2xl border-2 border-[#DEE2E6] overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <div className="bg-[#2E7D32] text-white p-6 text-center">
              <CheckCircle size={48} className="mx-auto mb-2" />
              <h2 className="text-[24px] font-bold">{t('noDuesCert')}</h2>
            </div>
            <div className="p-6 text-center">
              <p className="text-[18px] text-[#212529] mb-2">This is to certify that</p>
              <p className="text-[22px] font-bold text-[#212529] mb-2">Ramesh Kumar</p>
              <p className="text-[16px] text-[#6C757D] mb-4">has no outstanding dues for <strong>{serviceType}</strong> services.</p>
              <p className="text-[14px] text-[#6C757D]">Certificate No: NDC-{Date.now().toString().slice(-8)}</p>
              <p className="text-[14px] text-[#6C757D]">Date: {new Date().toLocaleDateString('en-IN')}</p>
            </div>
            <div className="p-6 pt-0 space-y-3">
              <button onClick={() => alert('Download initiated')} className="w-full h-[64px] rounded-xl text-[20px] font-semibold bg-[#2E7D32] text-white flex items-center justify-center gap-3 active:opacity-90 focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">
                <Download size={24} />{t('download')}
              </button>
              <button onClick={() => navigate('/documents')} className="w-full h-[64px] rounded-xl text-[20px] font-semibold bg-[#F5F7FA] text-[#212529] border-2 border-[#DEE2E6] active:bg-[#DEE2E6] focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2">{t('done')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('documents'), path: '/documents' }, { label: t('noDuesCert') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('noDuesCert')}</h1>
        <p className="text-[18px] text-[#6C757D] mb-4">{t('selectType')}</p>
        <div className="space-y-3 mb-6">
          {services.map(s => (
            <button key={s} onClick={() => setServiceType(s)} className={`w-full rounded-xl p-5 text-left border-2 transition-colors ${serviceType === s ? 'border-[#2E7D32] bg-[#E8F5E9]' : 'border-[#DEE2E6] bg-white'}`}>
              <span className="text-[20px] font-semibold text-[#212529]">{s}</span>
            </button>
          ))}
        </div>
        <button onClick={() => setShowCert(true)} disabled={!serviceType} className="w-full h-[72px] rounded-xl text-[22px] font-semibold bg-[#2E7D32] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:opacity-90 focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">{t('generate')}</button>
      </div>
    </div>
  );
}
