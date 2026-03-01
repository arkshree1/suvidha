import { useLanguage } from '@/context/LanguageContext';
import { mockPaymentHistory } from '@/data/mockData';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function PaymentHistoryPage() {
  const { t } = useLanguage();

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('documents'), path: '/documents' }, { label: t('paymentHistory') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('paymentHistory')}</h1>
        <div className="bg-white rounded-2xl border-2 border-[#DEE2E6] overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <table className="w-full" data-testid="payment-history-table">
            <thead>
              <tr className="bg-[#37474F] text-white">
                <th className="text-left p-3 text-[14px] font-semibold">{t('date')}</th>
                <th className="text-left p-3 text-[14px] font-semibold">{t('service')}</th>
                <th className="text-right p-3 text-[14px] font-semibold">{t('amount')}</th>
                <th className="text-right p-3 text-[14px] font-semibold">{t('status')}</th>
              </tr>
            </thead>
            <tbody>
              {mockPaymentHistory.map((p, i) => (
                <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F5F7FA]'}>
                  <td className="p-3 text-[14px] text-[#212529]">{p.date}</td>
                  <td className="p-3 text-[14px] text-[#212529]">{p.service}</td>
                  <td className="p-3 text-[14px] text-[#212529] text-right font-semibold">Rs. {p.amount.toFixed(2)}</td>
                  <td className="p-3 text-right">
                    <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${p.status === 'Success' ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFEBEE] text-[#C62828]'}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
