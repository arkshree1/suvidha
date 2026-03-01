import { CreditCard, Plus, Gauge, Droplets, AlertTriangle, Beaker } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'wouter';
import ServiceCard from '@/components/common/ServiceCard';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function WaterMenu() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();

  const items = [
    { icon: CreditCard, titleKey: 'payWaterBill', gradient: 'linear-gradient(135deg, #00695C, #4DB6AC)', path: '/water/pay-bill' },
    { icon: Plus, titleKey: 'newWaterConnection', gradient: 'linear-gradient(135deg, #004D40, #26A69A)', path: '/water/new-connection' },
    { icon: Gauge, titleKey: 'submitMeterReading', gradient: 'linear-gradient(135deg, #1B5E20, #43A047)', path: '/water/meter-reading' },
    { icon: Droplets, titleKey: 'reportLeakage', gradient: 'linear-gradient(135deg, #0D47A1, #1E88E5)', path: '/water/report-leakage' },
    { icon: AlertTriangle, titleKey: 'sewageComplaint', gradient: 'linear-gradient(135deg, #B71C1C, #EF5350)', path: '/water/sewage' },
    { icon: Beaker, titleKey: 'waterQuality', gradient: 'linear-gradient(135deg, #4A148C, #AB47BC)', path: '/water/quality' },
  ];

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('water') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('water')}</h1>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <ServiceCard key={item.titleKey} icon={item.icon} title={t(item.titleKey)} description="" gradient={item.gradient} onClick={() => navigate(item.path)} testId={`card-${item.titleKey}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
