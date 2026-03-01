import { ChevronRight, Home } from 'lucide-react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const [, navigate] = useLocation();
  const { t } = useLanguage();

  return (
    <nav className="flex items-center gap-2 px-6 py-3 bg-[#F5F7FA] border-b border-[#DEE2E6]" aria-label="Breadcrumb" data-testid="breadcrumb">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-1 text-[14px] text-[#006EB3] font-medium active:text-[#005a94] focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
        aria-label={t('home')}
        data-testid="breadcrumb-home"
      >
        <Home size={16} />
        {t('home')}
      </button>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-[#6C757D]" />
          {item.path ? (
            <button
              onClick={() => navigate(item.path!)}
              className="text-[14px] text-[#006EB3] font-medium active:text-[#005a94] focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
              data-testid={`breadcrumb-${index}`}
            >
              {item.label}
            </button>
          ) : (
            <span className="text-[14px] text-[#6C757D] font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
