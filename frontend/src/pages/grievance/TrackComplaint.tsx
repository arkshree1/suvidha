import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockGrievances } from '@/data/mockData';
import Breadcrumb from '@/components/layout/Breadcrumb';
import VirtualKeyboard from '@/components/common/VirtualKeyboard';

export default function TrackComplaint() {
  const { t } = useLanguage();
  const [searchId, setSearchId] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const grievance = mockGrievances[0];
  const statusSteps = [
    { label: t('submitted'), date: grievance.filedDate, done: true },
    { label: t('assigned'), date: grievance.updatedDate, done: grievance.status !== 'Submitted', officer: grievance.officerName },
    { label: t('underInvestigation'), date: grievance.updatedDate, done: grievance.status === 'Under Investigation' || grievance.status === 'Resolved' },
    { label: t('resolved'), date: grievance.updatedDate, done: grievance.status === 'Resolved' },
  ];

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('grievance'), path: '/grievance' }, { label: t('trackComplaint') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('trackComplaint')}</h1>
        {!showResult ? (
          <div>
            <p className="text-[18px] text-[#6C757D] mb-4">{t('enterGrievanceId')}</p>
            <div onClick={() => setShowKeyboard(true)} className={`bg-white rounded-2xl p-6 border-2 mb-6 text-center cursor-pointer ${showKeyboard ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`} style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div className="text-[24px] font-bold text-[#212529]" data-testid="text-search-id">{searchId || <span className="text-[#6C757D]">GRV-2024-XXXXX</span>}</div>
            </div>
            {showKeyboard && <VirtualKeyboard value={searchId} onChange={setSearchId} maxLength={20} />}
            <button onClick={() => setShowResult(true)} disabled={!searchId} className="w-full mt-4 h-[72px] rounded-xl text-[22px] font-semibold bg-[#6A1B9A] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:opacity-90 focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">{t('search')}</button>
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-2xl border-2 border-[#DEE2E6] overflow-hidden mb-6" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div className="bg-[#6A1B9A] text-white p-4">
                <h3 className="text-[18px] font-bold">{grievance.id}</h3>
                <p className="text-[14px] opacity-90">{grievance.department} - {grievance.category}</p>
              </div>
              <div className="p-6">
                <p className="text-[16px] text-[#212529] mb-6">{grievance.description}</p>
                <div className="space-y-0">
                  {statusSteps.map((s, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center text-[14px] font-bold border-2 flex-shrink-0 ${s.done ? 'bg-[#28A745] border-[#28A745] text-white' : 'bg-[#F5F7FA] border-[#DEE2E6] text-[#6C757D]'}`}>
                          {s.done ? '\u2713' : i + 1}
                        </div>
                        {i < statusSteps.length - 1 && <div className={`w-[3px] h-[32px] ${s.done ? 'bg-[#28A745]' : 'bg-[#DEE2E6]'}`} />}
                      </div>
                      <div className="pt-1">
                        <span className={`text-[16px] font-semibold block ${s.done ? 'text-[#28A745]' : 'text-[#6C757D]'}`}>{s.label}</span>
                        {s.done && <span className="text-[13px] text-[#6C757D]">{s.date}</span>}
                        {s.officer && <span className="text-[13px] text-[#006EB3] block">{s.officer}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => { setShowResult(false); setSearchId(''); }} className="w-full h-[64px] rounded-xl text-[20px] font-semibold bg-[#006EB3] text-white active:bg-[#005a94] focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">{t('back')}</button>
          </div>
        )}
      </div>
    </div>
  );
}
