import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { grievanceCategories } from '@/data/mockData';
import Breadcrumb from '@/components/layout/Breadcrumb';
import VirtualKeyboard from '@/components/common/VirtualKeyboard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { CheckCircle } from 'lucide-react';
import { useLocation } from 'wouter';
import QrUpload from '@/components/common/QrUpload';

export default function FileComplaint() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [department, setDepartment] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [contactPref, setContactPref] = useState('');
  const [fileName, setFileName] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const grvId = `GRV-2024-${Math.floor(10000 + Math.random() * 90000)}`;

  const departments = ['Electricity', 'Gas', 'Water', 'Municipal'];
  const categories = department ? (grievanceCategories[department] || []) : [];

  const handleSubmit = () => { setStep('processing'); setTimeout(() => setStep('success'), 1500); };

  if (step === 'processing') return <div className="py-20"><LoadingSpinner message={t('processing')} /></div>;
  if (step === 'success') return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('grievance'), path: '/grievance' }, { label: t('fileComplaint') }]} />
      <div className="px-6 py-6">
        <div className="max-w-[500px] mx-auto bg-white rounded-2xl p-8 border-2 border-[#DEE2E6] text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <CheckCircle size={64} className="text-[#28A745] mx-auto mb-4" />
          <h2 className="text-[28px] font-bold text-[#212529] mb-2">{t('success')}</h2>
          <p className="text-[18px] text-[#6C757D] mb-4">{t('grievanceId')}</p>
          <div className="bg-[#F3E5F5] rounded-xl p-4 mb-6"><span className="text-[24px] font-bold text-[#6A1B9A]" data-testid="text-grievance-id">{grvId}</span></div>
          <button onClick={() => navigate('/grievance')} className="w-full h-[64px] rounded-xl text-[20px] font-semibold bg-[#006EB3] text-white active:bg-[#005a94] focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">{t('done')}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('grievance'), path: '/grievance' }, { label: t('fileComplaint') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('fileComplaint')}</h1>
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('department')}</label>
            <div className="grid grid-cols-2 gap-2">
              {departments.map(d => (
                <button key={d} onClick={() => { setDepartment(d); setCategory(''); }} className={`rounded-xl p-4 text-[16px] font-semibold text-left border-2 transition-colors ${department === d ? 'border-[#6A1B9A] bg-[#F3E5F5] text-[#6A1B9A]' : 'border-[#DEE2E6] bg-white text-[#212529]'}`}>{d}</button>
              ))}
            </div>
          </div>
          {department && (
            <div>
              <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('category')}</label>
              <div className="space-y-2">
                {categories.map(c => (
                  <button key={c} onClick={() => setCategory(c)} className={`w-full rounded-xl p-4 text-left border-2 transition-colors ${category === c ? 'border-[#6A1B9A] bg-[#F3E5F5]' : 'border-[#DEE2E6] bg-white'}`}>
                    <span className="text-[18px] font-semibold text-[#212529]">{c}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('description')} <span className="text-[14px] text-[#6C757D] font-normal">({description.length}/500)</span></label>
            <div onClick={() => setShowKeyboard(true)} className={`bg-white rounded-xl p-4 border-2 text-[18px] min-h-[100px] cursor-pointer ${showKeyboard ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`} data-testid="input-description">{description || <span className="text-[#6C757D]">Tap to describe your complaint</span>}</div>
          </div>
          <div>
            <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('uploadPhoto')}</label>
            <QrUpload onFileReceived={setFileName} label={t('uploadPhoto')} accentColor="#6A1B9A" />
          </div>
          <div>
            <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('contactPref')}</label>
            <div className="flex gap-3">
              {['sms', 'whatsapp', 'both'].map(p => (
                <button key={p} onClick={() => setContactPref(p)} className={`flex-1 h-[56px] rounded-xl text-[16px] font-semibold border-2 transition-colors ${contactPref === p ? 'border-[#6A1B9A] bg-[#F3E5F5] text-[#6A1B9A]' : 'border-[#DEE2E6] bg-white text-[#212529]'}`}>{t(p)}</button>
              ))}
            </div>
          </div>
        </div>
        {showKeyboard && <VirtualKeyboard value={description} onChange={(v) => setDescription(v.slice(0, 500))} maxLength={500} />}
        <button onClick={handleSubmit} disabled={!department || !category || !description || !contactPref} className="w-full mt-4 h-[72px] rounded-xl text-[22px] font-semibold bg-[#6A1B9A] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:opacity-90 focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">{t('submit')}</button>
      </div>
    </div>
  );
}
