import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/layout/Breadcrumb';
import NumericKeypad from '@/components/common/NumericKeypad';
import StatusTracker from '@/components/common/StatusTracker';

export default function ConnectionStatus() {
  const { t } = useLanguage();
  const [appNo, setAppNo] = useState('');
  const [showStatus, setShowStatus] = useState(false);

  const steps = [t('applied'), t('underReview'), t('approved'), t('installScheduled'), t('active')];

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('electricity'), path: '/electricity' }, { label: t('checkStatus') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('checkStatus')}</h1>

        {!showStatus ? (
          <div>
            <p className="text-[18px] text-[#6C757D] mb-4">{t('applicationNumber')}</p>
            <div className="bg-white rounded-2xl p-6 border-2 border-[#DEE2E6] mb-6 text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div className="text-[28px] font-bold text-[#212529]" data-testid="text-app-no">{appNo || '\u00A0'}</div>
            </div>
            <NumericKeypad value={appNo} onChange={setAppNo} maxLength={10} onSubmit={() => setShowStatus(true)} submitLabel={t('search')} />
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-2xl p-6 border-2 border-[#DEE2E6] mb-6" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <h3 className="text-[18px] font-bold text-[#212529] mb-6">{t('applicationNumber')}: APP-{appNo}</h3>
              <StatusTracker steps={steps} currentStep={3} />
            </div>
            <button onClick={() => { setShowStatus(false); setAppNo(''); }} className="w-full h-[64px] rounded-xl text-[20px] font-semibold bg-[#006EB3] text-white active:bg-[#005a94] focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2" aria-label={t('back')} data-testid="button-back">{t('back')}</button>
          </div>
        )}
      </div>
    </div>
  );
}
