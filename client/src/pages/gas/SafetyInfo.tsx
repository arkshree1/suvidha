import { ShieldAlert, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function SafetyInfo() {
  const { t } = useLanguage();

  const steps = ['step1', 'step2', 'step3', 'step4', 'step5'] as const;

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('gas'), path: '/gas' }, { label: t('safetyInfo') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('safetyInfo')}</h1>
        <div className="bg-[#DC3545] text-white rounded-2xl p-6 mb-6" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert size={36} />
            <h2 className="text-[24px] font-bold">{t('emergencySteps')}</h2>
          </div>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                <div className="w-[36px] h-[36px] rounded-full bg-white text-[#DC3545] flex items-center justify-center text-[18px] font-bold flex-shrink-0">{i + 1}</div>
                <span className="text-[18px] font-medium">{t(s)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-[#DEE2E6] text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <Phone size={32} className="text-[#DC3545] mx-auto mb-2" />
          <p className="text-[20px] font-bold text-[#212529]">Emergency Helpline</p>
          <p className="text-[32px] font-bold text-[#DC3545]">1906</p>
        </div>
      </div>
    </div>
  );
}
