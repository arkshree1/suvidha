import { useLanguage } from '@/context/LanguageContext';
import { mockCitizen } from '@/data/mockData';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { Zap, Flame, Droplets, Building2 } from 'lucide-react';

export default function ServiceSummary() {
  const { t } = useLanguage();
  const accounts = mockCitizen.accounts;

  const services = [
    { icon: Zap, color: '#1565C0', bg: '#E3F2FD', name: t('electricity'), accountNo: accounts.electricity.consumerId, status: t('active'), outstanding: accounts.electricity.outstanding },
    { icon: Flame, color: '#E65100', bg: '#FFF3E0', name: t('gas'), accountNo: accounts.gas.customerId, status: t('active'), outstanding: accounts.gas.outstanding },
    { icon: Droplets, color: '#00695C', bg: '#E0F2F1', name: t('water'), accountNo: accounts.water.accountId, status: t('active'), outstanding: accounts.water.outstanding },
    { icon: Building2, color: '#2E7D32', bg: '#E8F5E9', name: t('municipal'), accountNo: accounts.municipal.propertyId, status: t('active'), outstanding: accounts.municipal.outstanding },
  ];

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('documents'), path: '/documents' }, { label: t('serviceSummary') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('serviceSummary')}</h1>
        <div className="space-y-4">
          {services.map((svc, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border-2 border-[#DEE2E6]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-4">
                <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: svc.bg }}>
                  <svc.icon size={28} style={{ color: svc.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[18px] font-bold text-[#212529]">{svc.name}</h3>
                  <p className="text-[14px] text-[#6C757D]">{t('accountNo')}: {svc.accountNo}</p>
                </div>
                <div className="text-right">
                  <span className="text-[12px] font-semibold px-3 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32]">{svc.status}</span>
                  {svc.outstanding > 0 && <p className="text-[14px] font-semibold text-[#DC3545] mt-1">Rs. {svc.outstanding.toFixed(2)}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
