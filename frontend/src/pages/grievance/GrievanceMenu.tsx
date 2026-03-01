import { FileEdit, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'wouter';
import ServiceCard from '@/components/common/ServiceCard';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function GrievanceMenu() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('grievance') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('grievance')}</h1>
        <div className="grid grid-cols-2 gap-4">
          <ServiceCard icon={FileEdit} title={t('fileComplaint')} description="" gradient="linear-gradient(135deg, #6A1B9A, #CE93D8)" onClick={() => navigate('/grievance/file')} testId="card-file-complaint" />
          <ServiceCard icon={Search} title={t('trackComplaint')} description="" gradient="linear-gradient(135deg, #4A148C, #AB47BC)" onClick={() => navigate('/grievance/track')} testId="card-track-complaint" />
        </div>
      </div>
    </div>
  );
}
