import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockCitizen } from '@/data/mockData';
import Breadcrumb from '@/components/layout/Breadcrumb';
import NumericKeypad from '@/components/common/NumericKeypad';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ReceiptScreen from '@/components/common/ReceiptScreen';

type Step = 'input' | 'details' | 'payment' | 'processing' | 'receipt';

export default function PayBill() {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>('input');
  const [consumerNo, setConsumerNo] = useState('MH042789456');
  const [paymentMethod, setPaymentMethod] = useState('');
  const bill = mockCitizen.accounts.electricity;
  const txnId = `TXN-${Date.now().toString().slice(-8)}`;

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => setStep('receipt'), 1500);
  };

  if (step === 'processing') return <div className="py-20"><LoadingSpinner message={t('processing')} /></div>;

  if (step === 'receipt') {
    return (
      <div className="animate-fadeIn">
        <Breadcrumb items={[{ label: t('electricity'), path: '/electricity' }, { label: t('payBill') }]} />
        <div className="px-6 py-6">
          <ReceiptScreen
            title={t('paymentSuccess')}
            transactionId={txnId}
            fields={[
              { label: t('consumerNumber'), value: bill.consumerId },
              { label: t('name'), value: bill.name },
              { label: t('amount'), value: `Rs. ${bill.outstanding.toFixed(2)}` },
              { label: t('paymentMethod'), value: paymentMethod },
              { label: t('date'), value: new Date().toLocaleDateString('en-IN') },
              { label: t('status'), value: t('success') },
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('electricity'), path: '/electricity' }, { label: t('payBill') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('payBill')} - {t('electricity')}</h1>

        {step === 'input' && (
          <div>
            <p className="text-[18px] text-[#6C757D] mb-4">{t('consumerNumber')}</p>
            <div className="bg-white rounded-2xl p-6 border-2 border-[#DEE2E6] mb-6 text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div className="text-[28px] font-bold text-[#212529] tracking-wider" data-testid="text-consumer-no">{consumerNo || '\u00A0'}</div>
            </div>
            <NumericKeypad value={consumerNo} onChange={setConsumerNo} maxLength={12} onSubmit={() => setStep('details')} submitLabel={t('search')} />
          </div>
        )}

        {step === 'details' && (
          <div>
            <div className="bg-white rounded-2xl border-2 border-[#DEE2E6] overflow-hidden mb-6" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div className="bg-[#1565C0] text-white p-4"><h3 className="text-[20px] font-bold">Bill Details</h3></div>
              <div className="p-5 space-y-3">
                {[
                  [t('consumerNumber'), bill.consumerId],
                  [t('name'), bill.name],
                  [t('amountDue'), `Rs. ${bill.outstanding.toFixed(2)}`],
                  [t('dueDate'), bill.dueDate],
                  [t('unitsConsumed'), `${bill.units} kWh`],
                  [t('arrears'), `Rs. ${bill.arrears.toFixed(2)}`],
                ].map(([label, val], i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-[#F5F7FA]">
                    <span className="text-[16px] text-[#6C757D]">{label}</span>
                    <span className="text-[16px] font-semibold text-[#212529]">{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setStep('payment')} className="w-full h-[72px] rounded-xl text-[22px] font-semibold bg-[#006EB3] text-white active:bg-[#005a94] transition-colors focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2" aria-label={t('payNow')} data-testid="button-pay-now">
              {t('payNow')} - Rs. {bill.outstanding.toFixed(2)}
            </button>
          </div>
        )}

        {step === 'payment' && (
          <div>
            <p className="text-[20px] font-semibold text-[#212529] mb-4">{t('paymentMethod')}</p>
            <div className="space-y-3 mb-6">
              {[
                { key: 'UPI', label: t('upi'), desc: 'Pay using UPI apps' },
                { key: 'Card', label: t('card'), desc: 'Debit / Credit Card' },
                { key: 'Cash', label: t('cashAtCounter'), desc: 'Pay at counter' },
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setPaymentMethod(opt.key)}
                  className={`w-full rounded-xl p-5 text-left border-2 transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2 ${paymentMethod === opt.key ? 'border-[#006EB3] bg-[#E3F2FD]' : 'border-[#DEE2E6] bg-white'}`}
                  aria-label={opt.label}
                  data-testid={`payment-${opt.key}`}
                >
                  <span className="text-[20px] font-semibold text-[#212529]">{opt.label}</span>
                  <span className="block text-[14px] text-[#6C757D] mt-1">{opt.desc}</span>
                </button>
              ))}
            </div>
            <button onClick={handlePay} disabled={!paymentMethod} className="w-full h-[72px] rounded-xl text-[22px] font-semibold bg-[#28A745] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:bg-[#218838] transition-colors focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2" aria-label={t('confirm')} data-testid="button-confirm-pay">
              {t('confirm')} {t('payNow')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
