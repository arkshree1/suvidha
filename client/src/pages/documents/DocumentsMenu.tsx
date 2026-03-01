import { Printer, History, FileSearch, FileBadge, LayoutList } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'wouter';
import ServiceCard from '@/components/common/ServiceCard';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function DocumentsMenu() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();

  const items = [
    { icon: Printer, titleKey: 'printReceipt', gradient: 'linear-gradient(135deg, #37474F, #90A4AE)', path: '/documents/print-receipt' },
    { icon: History, titleKey: 'paymentHistory', gradient: 'linear-gradient(135deg, #1565C0, #42A5F5)', path: '/documents/payment-history' },
    { icon: FileSearch, titleKey: 'applicationStatus', gradient: 'linear-gradient(135deg, #4A148C, #AB47BC)', path: '/documents/application-status' },
    { icon: FileBadge, titleKey: 'noDuesCert', gradient: 'linear-gradient(135deg, #2E7D32, #81C784)', path: '/documents/no-dues' },
    { icon: LayoutList, titleKey: 'serviceSummary', gradient: 'linear-gradient(135deg, #E65100, #FFA726)', path: '/documents/service-summary' },
  ];

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('documents') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('documents')}</h1>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <ServiceCard key={item.titleKey} icon={item.icon} title={t(item.titleKey)} description="" gradient={item.gradient} onClick={() => navigate(item.path)} testId={`card-${item.titleKey}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
