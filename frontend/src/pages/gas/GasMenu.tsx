import { Package, CreditCard, Plus, MessageSquare, Truck, ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'wouter';
import ServiceCard from '@/components/common/ServiceCard';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function GasMenu() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();

  const items = [
    { icon: Package, titleKey: 'bookCylinder', gradient: 'linear-gradient(135deg, #E65100, #FFA726)', path: '/gas/book-cylinder' },
    { icon: CreditCard, titleKey: 'payPngBill', gradient: 'linear-gradient(135deg, #BF360C, #FF7043)', path: '/gas/pay-bill' },
    { icon: Plus, titleKey: 'newPngConnection', gradient: 'linear-gradient(135deg, #1B5E20, #43A047)', path: '/gas/new-connection' },
    { icon: MessageSquare, titleKey: 'registerComplaint', gradient: 'linear-gradient(135deg, #B71C1C, #EF5350)', path: '/gas/complaint' },
    { icon: Truck, titleKey: 'trackDelivery', gradient: 'linear-gradient(135deg, #4A148C, #AB47BC)', path: '/gas/track-delivery' },
    { icon: ShieldAlert, titleKey: 'safetyInfo', gradient: 'linear-gradient(135deg, #0D47A1, #1E88E5)', path: '/gas/safety' },
  ];

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('gas') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('gas')}</h1>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <ServiceCard key={item.titleKey} icon={item.icon} title={t(item.titleKey)} description="" gradient={item.gradient} onClick={() => navigate(item.path)} testId={`card-${item.titleKey}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
