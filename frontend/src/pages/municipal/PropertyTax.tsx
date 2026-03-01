import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockCitizen } from '@/data/mockData';
import Breadcrumb from '@/components/layout/Breadcrumb';
import NumericKeypad from '@/components/common/NumericKeypad';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ReceiptScreen from '@/components/common/ReceiptScreen';

export default function PropertyTax() {
  const { t } = useLanguage();
  const [step, setStep] = useState<'input' | 'details' | 'payment' | 'processing' | 'receipt'>('input');
  const [propertyId, setPropertyId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const bill = mockCitizen.accounts.municipal;
  const txnId = `TXN-${Date.now().toString().slice(-8)}`;

  const handlePay = () => { setStep('processing'); setTimeout(() => setStep('receipt'), 1500); };

  if (step === 'processing') return <div className="py-20"><LoadingSpinner message={t('processing')} /></div>;
  if (step === 'receipt') return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('municipal'), path: '/municipal' }, { label: t('propertyTax') }]} />
      <div className="px-6 py-6"><ReceiptScreen title={t('paymentSuccess')} transactionId={txnId} fields={[
        { label: t('propertyId'), value: bill.propertyId },
        { label: t('name'), value: bill.name },
        { label: t('amount'), value: `Rs. ${bill.outstanding.toFixed(2)}` },
        { label: t('paymentMethod'), value: paymentMethod },
      ]} /></div>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('municipal'), path: '/municipal' }, { label: t('propertyTax') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('propertyTax')}</h1>
        {step === 'input' && (
          <div>
            <p className="text-[18px] text-[#6C757D] mb-4">{t('enterPropertyId')}</p>
            <div className="bg-white rounded-2xl p-6 border-2 border-[#DEE2E6] mb-6 text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div className="text-[28px] font-bold text-[#212529]">{propertyId || '\u00A0'}</div>
            </div>
            <NumericKeypad value={propertyId} onChange={setPropertyId} maxLength={12} onSubmit={() => setStep('details')} submitLabel={t('search')} />
          </div>
        )}
        {step === 'details' && (
          <div>
            <div className="bg-white rounded-2xl border-2 border-[#DEE2E6] overflow-hidden mb-6" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div className="bg-[#2E7D32] text-white p-4"><h3 className="text-[20px] font-bold">Property Tax Details</h3></div>
              <div className="p-5 space-y-3">
                {[[t('propertyId'), bill.propertyId], [t('name'), bill.name], [t('outstandingAmount'), `Rs. ${bill.outstanding.toFixed(2)}`]].map(([l, v], i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-[#F5F7FA]">
                    <span className="text-[16px] text-[#6C757D]">{l}</span>
                    <span className="text-[16px] font-semibold text-[#212529]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setStep('payment')} className="w-full h-[72px] rounded-xl text-[22px] font-semibold bg-[#2E7D32] text-white active:opacity-90 focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">{t('payNow')} - Rs. {bill.outstanding.toFixed(2)}</button>
          </div>
        )}
        {step === 'payment' && (
          <div>
            <p className="text-[20px] font-semibold text-[#212529] mb-4">{t('paymentMethod')}</p>
            <div className="space-y-3 mb-6">
              {['UPI', 'Card', 'Cash'].map(m => (
                <button key={m} onClick={() => setPaymentMethod(m)} className={`w-full rounded-xl p-5 text-left border-2 transition-colors ${paymentMethod === m ? 'border-[#2E7D32] bg-[#E8F5E9]' : 'border-[#DEE2E6] bg-white'}`} data-testid={`payment-${m}`}>
                  <span className="text-[20px] font-semibold text-[#212529]">{m === 'Cash' ? t('cashAtCounter') : m}</span>
                </button>
              ))}
            </div>
            <button onClick={handlePay} disabled={!paymentMethod} className="w-full h-[72px] rounded-xl text-[22px] font-semibold bg-[#28A745] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:bg-[#218838] focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">{t('confirm')}</button>
          </div>
        )}
      </div>
    </div>
  );
}
