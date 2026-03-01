import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/layout/Breadcrumb';
import VirtualKeyboard from '@/components/common/VirtualKeyboard';
import NumericKeypad from '@/components/common/NumericKeypad';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ReceiptScreen from '@/components/common/ReceiptScreen';

export default function TradeLicense() {
  const { t } = useLanguage();
  const [step, setStep] = useState<'form' | 'payment' | 'processing' | 'receipt'>('form');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [licenseNo, setLicenseNo] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const renewalFee = 2500;
  const txnId = `TXN-${Date.now().toString().slice(-8)}`;

  const handlePay = () => { setStep('processing'); setTimeout(() => setStep('receipt'), 1500); };

  if (step === 'processing') return <div className="py-20"><LoadingSpinner message={t('processing')} /></div>;
  if (step === 'receipt') return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('municipal'), path: '/municipal' }, { label: t('tradeLicense') }]} />
      <div className="px-6 py-6"><ReceiptScreen title={t('paymentSuccess')} transactionId={txnId} fields={[
        { label: t('licenseNumber'), value: `TL-${licenseNo}` },
        { label: t('businessName'), value: businessName },
        { label: t('renewalFee'), value: `Rs. ${renewalFee}` },
        { label: t('paymentMethod'), value: paymentMethod },
      ]} /></div>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('municipal'), path: '/municipal' }, { label: t('tradeLicense') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('tradeLicense')}</h1>
        {step === 'form' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('licenseNumber')}</label>
              <div onClick={() => setActiveField('license')} className={`bg-white rounded-xl p-4 border-2 text-[18px] min-h-[56px] cursor-pointer ${activeField === 'license' ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`}>{licenseNo || <span className="text-[#6C757D]">Tap to enter</span>}</div>
            </div>
            <div>
              <label className="text-[16px] font-semibold text-[#212529] mb-2 block">{t('businessName')}</label>
              <div onClick={() => setActiveField('business')} className={`bg-white rounded-xl p-4 border-2 text-[18px] min-h-[56px] cursor-pointer ${activeField === 'business' ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`}>{businessName || <span className="text-[#6C757D]">Tap to enter</span>}</div>
            </div>
            <div className="bg-[#E8F5E9] rounded-xl p-4">
              <span className="text-[16px] text-[#6C757D]">{t('renewalFee')}: </span>
              <span className="text-[20px] font-bold text-[#2E7D32]">Rs. {renewalFee}</span>
            </div>
            {activeField === 'license' && <NumericKeypad value={licenseNo} onChange={setLicenseNo} maxLength={10} />}
            {activeField === 'business' && <VirtualKeyboard value={businessName} onChange={setBusinessName} maxLength={100} />}
            <button onClick={() => setStep('payment')} disabled={!licenseNo || !businessName} className="w-full h-[72px] rounded-xl text-[22px] font-semibold bg-[#2E7D32] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:opacity-90 focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2">{t('payNow')}</button>
          </div>
        )}
        {step === 'payment' && (
          <div>
            <p className="text-[20px] font-semibold text-[#212529] mb-4">{t('paymentMethod')}</p>
            <div className="space-y-3 mb-6">
              {['UPI', 'Card', 'Cash'].map(m => (
                <button key={m} onClick={() => setPaymentMethod(m)} className={`w-full rounded-xl p-5 text-left border-2 transition-colors ${paymentMethod === m ? 'border-[#2E7D32] bg-[#E8F5E9]' : 'border-[#DEE2E6] bg-white'}`}>
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
