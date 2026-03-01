import { Building2, FileText, Award, Trash2, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'wouter';
import ServiceCard from '@/components/common/ServiceCard';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function MunicipalMenu() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();

  const items = [
    { icon: Building2, titleKey: 'propertyTax', gradient: 'linear-gradient(135deg, #2E7D32, #81C784)', path: '/municipal/property-tax' },
    { icon: FileText, titleKey: 'tradeLicense', gradient: 'linear-gradient(135deg, #1B5E20, #43A047)', path: '/municipal/trade-license' },
    { icon: Award, titleKey: 'birthDeathCert', gradient: 'linear-gradient(135deg, #0D47A1, #1E88E5)', path: '/municipal/certificates' },
    { icon: Trash2, titleKey: 'wastePickup', gradient: 'linear-gradient(135deg, #B71C1C, #EF5350)', path: '/municipal/waste-pickup' },
    { icon: Search, titleKey: 'buildingPlan', gradient: 'linear-gradient(135deg, #4A148C, #AB47BC)', path: '/municipal/building-plan' },
  ];

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('municipal') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('municipal')}</h1>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <ServiceCard key={item.titleKey} icon={item.icon} title={t(item.titleKey)} description="" gradient={item.gradient} onClick={() => navigate(item.path)} testId={`card-${item.titleKey}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
