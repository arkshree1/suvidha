import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockPaymentHistory } from '@/data/mockData';
import Breadcrumb from '@/components/layout/Breadcrumb';
import VirtualKeyboard from '@/components/common/VirtualKeyboard';
import ReceiptScreen from '@/components/common/ReceiptScreen';

export default function PrintReceipt() {
  const { t } = useLanguage();
  const [txnId, setTxnId] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const payment = mockPaymentHistory[0];

  if (showReceipt) {
    return (
      <div className="animate-fadeIn">
        <Breadcrumb items={[{ label: t('documents'), path: '/documents' }, { label: t('printReceipt') }]} />
        <div className="px-6 py-6">
          <ReceiptScreen title={t('printReceipt')} transactionId={payment.id} fields={[
            { label: t('date'), value: payment.date },
            { label: t('service'), value: payment.service },
            { label: t('description'), value: payment.description },
            { label: t('amount'), value: `Rs. ${payment.amount.toFixed(2)}` },
            { label: t('status'), value: payment.status },
          ]} />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('documents'), path: '/documents' }, { label: t('printReceipt') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('printReceipt')}</h1>
        <p className="text-[18px] text-[#6C757D] mb-4">{t('enterTransactionId')}</p>
        <div onClick={() => setShowKeyboard(true)} className={`bg-white rounded-2xl p-6 border-2 mb-6 text-center cursor-pointer ${showKeyboard ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`} style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <div className="text-[24px] font-bold text-[#212529]">{txnId || <span className="text-[#6C757D]">TXN-XXXX-XXX</span>}</div>
        </div>
        {showKeyboard && <VirtualKeyboard value={txnId} onChange={setTxnId} maxLength={20} />}
        <button onClick={() => setShowReceipt(true)} disabled={!txnId} className="w-full mt-4 h-[72px] rounded-xl text-[22px] font-semibold bg-[#37474F] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:opacity-90 focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">{t('search')}</button>
      </div>
    </div>
  );
}
