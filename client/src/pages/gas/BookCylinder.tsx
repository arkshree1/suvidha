import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/layout/Breadcrumb';
import VirtualKeyboard from '@/components/common/VirtualKeyboard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ReceiptScreen from '@/components/common/ReceiptScreen';

export default function BookCylinder() {
  const { t } = useLanguage();
  const [step, setStep] = useState<'select' | 'address' | 'payment' | 'processing' | 'receipt'>('select');
  const [cylinderType, setCylinderType] = useState('');
  const [address, setAddress] = useState('123, Main Road, Pune Ward 12');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const bookingId = `BK-${Date.now().toString().slice(-8)}`;

  const cylinders = [
    { type: 'regular14kg', price: 903 },
    { type: 'small5kg', price: 435 },
    { type: 'compositeSuper', price: 780 },
  ];

  const selected = cylinders.find(c => c.type === cylinderType);

  const handleConfirm = () => {
    setStep('processing');
    setTimeout(() => setStep('receipt'), 1500);
  };

  if (step === 'processing') return <div className="py-20"><LoadingSpinner message={t('processing')} /></div>;

  if (step === 'receipt') {
    return (
      <div className="animate-fadeIn">
        <Breadcrumb items={[{ label: t('gas'), path: '/gas' }, { label: t('bookCylinder') }]} />
        <div className="px-6 py-6">
          <ReceiptScreen title={t('paymentSuccess')} transactionId={bookingId} fields={[
            { label: t('bookingId'), value: bookingId },
            { label: t('cylinderType'), value: t(cylinderType) },
            { label: t('amount'), value: `Rs. ${selected?.price || 0}` },
            { label: t('deliveryAddress'), value: address },
            { label: t('paymentMethod'), value: paymentMethod },
          ]} />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: t('gas'), path: '/gas' }, { label: t('bookCylinder') }]} />
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold text-[#212529] mb-6">{t('bookCylinder')}</h1>

        {step === 'select' && (
          <div className="space-y-3 mb-6">
            <p className="text-[18px] font-semibold text-[#212529]">{t('cylinderType')}</p>
            {cylinders.map(c => (
              <button key={c.type} onClick={() => setCylinderType(c.type)} className={`w-full rounded-xl p-5 text-left border-2 transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2 ${cylinderType === c.type ? 'border-[#E65100] bg-[#FFF3E0]' : 'border-[#DEE2E6] bg-white'}`} data-testid={`cylinder-${c.type}`}>
                <span className="text-[20px] font-semibold text-[#212529]">{t(c.type)}</span>
                <span className="block text-[16px] text-[#E65100] font-bold mt-1">Rs. {c.price}</span>
              </button>
            ))}
            <button onClick={() => setStep('address')} disabled={!cylinderType} className="w-full h-[72px] rounded-xl text-[22px] font-semibold bg-[#E65100] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:opacity-90 transition-colors focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2" data-testid="button-next">Next</button>
          </div>
        )}

        {step === 'address' && (
          <div>
            <p className="text-[18px] font-semibold text-[#212529] mb-2">{t('deliveryAddress')}</p>
            <div onClick={() => setShowKeyboard(!showKeyboard)} className={`bg-white rounded-xl p-4 border-2 text-[18px] min-h-[80px] cursor-pointer mb-4 ${showKeyboard ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`} data-testid="input-address">{address}</div>
            {showKeyboard && <VirtualKeyboard value={address} onChange={setAddress} maxLength={200} />}
            <button onClick={() => setStep('payment')} className="w-full mt-4 h-[72px] rounded-xl text-[22px] font-semibold bg-[#E65100] text-white active:opacity-90 transition-colors focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2" data-testid="button-next">Next</button>
          </div>
        )}

        {step === 'payment' && (
          <div>
            <p className="text-[20px] font-semibold text-[#212529] mb-4">{t('paymentMethod')}</p>
            <div className="space-y-3 mb-6">
              {['UPI', 'Card', 'Cash'].map(m => (
                <button key={m} onClick={() => setPaymentMethod(m)} className={`w-full rounded-xl p-5 text-left border-2 transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2 ${paymentMethod === m ? 'border-[#E65100] bg-[#FFF3E0]' : 'border-[#DEE2E6] bg-white'}`} data-testid={`payment-${m}`}>
                  <span className="text-[20px] font-semibold text-[#212529]">{m === 'Cash' ? t('cashAtCounter') : t(m.toLowerCase() as any)}</span>
                </button>
              ))}
            </div>
            <button onClick={handleConfirm} disabled={!paymentMethod} className="w-full h-[72px] rounded-xl text-[22px] font-semibold bg-[#28A745] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:bg-[#218838] transition-colors focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2" data-testid="button-confirm">{t('confirm')} - Rs. {selected?.price || 0}</button>
          </div>
        )}
      </div>
    </div>
  );
}
