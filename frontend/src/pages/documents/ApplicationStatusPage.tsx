import { useLanguage } from '@/context/LanguageContext';
import { mockApplications } from '@/data/mockData';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function ApplicationStatusPage() {
  const { t } = useLanguage();

  const statusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-[#E3F2FD] text-[#1565C0]';
      case 'Under Review': return 'bg-[#FFF3E0] text-[#E65100]';
      case 'Approved': return 'bg-[#E8F5E9] text-[#2E7D32]';
      case 'Scrutiny': return 'bg-[#F3E5F5] text-[#6A1B9A]';
      default: return 'bg-[#F5F7FA] text-[#6C757D]';
    }
  };

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('documents'), path: '/documents' }, { label: t('applicationStatus') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('applicationStatus')}</h1>
        <div className="space-y-3">
          {mockApplications.map(app => (
            <div key={app.id} className="bg-white rounded-2xl p-5 border-2 border-[#DEE2E6]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[16px] font-bold text-[#212529]">{app.id}</span>
                <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${statusColor(app.status)}`}>{app.status}</span>
              </div>
              <p className="text-[16px] text-[#6C757D]">{app.type}</p>
              <p className="text-[13px] text-[#6C757D] mt-1">{t('date')}: {app.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
