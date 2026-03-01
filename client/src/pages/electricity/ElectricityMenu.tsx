import { CreditCard, BarChart3, Plus, Gauge, AlertTriangle, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'wouter';
import ServiceCard from '@/components/common/ServiceCard';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function ElectricityMenu() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();

  const items = [
    { icon: CreditCard, titleKey: 'payBill', gradient: 'linear-gradient(135deg, #1565C0, #42A5F5)', path: '/electricity/pay-bill' },
    { icon: BarChart3, titleKey: 'consumptionHistory', gradient: 'linear-gradient(135deg, #0D47A1, #1E88E5)', path: '/electricity/consumption' },
    { icon: Plus, titleKey: 'newConnection', gradient: 'linear-gradient(135deg, #1B5E20, #43A047)', path: '/electricity/new-connection' },
    { icon: Gauge, titleKey: 'submitMeterReading', gradient: 'linear-gradient(135deg, #E65100, #FB8C00)', path: '/electricity/meter-reading' },
    { icon: AlertTriangle, titleKey: 'reportOutage', gradient: 'linear-gradient(135deg, #B71C1C, #EF5350)', path: '/electricity/report-outage' },
    { icon: Search, titleKey: 'checkStatus', gradient: 'linear-gradient(135deg, #4A148C, #AB47BC)', path: '/electricity/connection-status' },
  ];

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('electricity') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('electricity')}</h1>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <ServiceCard
              key={item.titleKey}
              icon={item.icon}
              title={t(item.titleKey)}
              description=""
              gradient={item.gradient}
              onClick={() => navigate(item.path)}
              testId={`card-${item.titleKey}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
