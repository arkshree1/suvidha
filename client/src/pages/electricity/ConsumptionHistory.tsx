import { useLanguage } from '@/context/LanguageContext';
import { mockConsumption } from '@/data/mockData';
import Breadcrumb from '@/components/layout/Breadcrumb';
import CssBarChart from '@/components/common/CssBarChart';

export default function ConsumptionHistory() {
  const { t } = useLanguage();

  const chartData = mockConsumption.map(c => ({
    label: c.month.split(' ')[0],
    value: c.units,
    displayValue: `${c.units}`,
  }));

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('electricity'), path: '/electricity' }, { label: t('consumptionHistory') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('consumptionHistory')}</h1>

        <div className="bg-white rounded-2xl p-6 border-2 border-[#DEE2E6] mb-6" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <h3 className="text-[18px] font-bold text-[#212529] mb-4">{t('units')} ({t('consumptionHistory')})</h3>
          <CssBarChart data={chartData} barColor="#1565C0" height={180} />
        </div>

        <div className="bg-white rounded-2xl border-2 border-[#DEE2E6] overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <table className="w-full" data-testid="consumption-table">
            <thead>
              <tr className="bg-[#1565C0] text-white">
                <th className="text-left p-4 text-[16px] font-semibold">{t('month')}</th>
                <th className="text-right p-4 text-[16px] font-semibold">{t('units')}</th>
                <th className="text-right p-4 text-[16px] font-semibold">{t('billAmount')}</th>
              </tr>
            </thead>
            <tbody>
              {mockConsumption.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F5F7FA]'}>
                  <td className="p-4 text-[16px] text-[#212529]">{row.month}</td>
                  <td className="p-4 text-[16px] text-[#212529] text-right">{row.units} kWh</td>
                  <td className="p-4 text-[16px] text-[#212529] text-right font-semibold">Rs. {row.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
