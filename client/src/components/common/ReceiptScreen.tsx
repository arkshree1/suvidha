import { useState, useEffect } from 'react';
import { Printer, Smartphone, CheckCircle, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'wouter';

interface ReceiptField {
  label: string;
  value: string;
}

interface ReceiptScreenProps {
  title: string;
  fields: ReceiptField[];
  transactionId: string;
}

export default function ReceiptScreen({ title, fields, transactionId }: ReceiptScreenProps) {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="max-w-[500px] mx-auto animate-fadeIn" data-testid="receipt-screen">
      <div className="bg-white rounded-2xl border-2 border-[#DEE2E6] overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}>
        <div className="bg-[#006EB3] text-white p-6 text-center">
          <CheckCircle size={48} className="mx-auto mb-3" />
          <h2 className="text-[28px] font-bold">{title}</h2>
          <p className="text-[16px] opacity-90 mt-1">{t('transactionId')}: {transactionId}</p>
        </div>

        <div className="p-6">
          <div className="border-b-2 border-dashed border-[#DEE2E6] pb-4 mb-4">
            <p className="text-[14px] text-[#6C757D] text-center font-medium">{t('receiptHeader')}</p>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-[#F5F7FA]">
                <span className="text-[16px] text-[#6C757D]">{field.label}</span>
                <span className="text-[16px] font-semibold text-[#212529]">{field.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-[#F5F7FA] rounded-xl text-center">
            <div className="w-[120px] h-[120px] mx-auto bg-[#DEE2E6] rounded-lg flex items-center justify-center mb-2">
              <span className="text-[12px] text-[#6C757D]">QR Code</span>
            </div>
            <p className="text-[13px] text-[#6C757D]">Scan for digital copy</p>
          </div>
        </div>

        <div className="p-6 pt-0 space-y-3">
          <button
            onClick={() => window.print()}
            className="w-full h-[64px] rounded-xl text-[20px] font-semibold bg-[#006EB3] text-white active:bg-[#005a94] transition-colors flex items-center justify-center gap-3 focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2"
            aria-label={t('print')}
            data-testid="button-print"
          >
            <Printer size={24} />
            {t('print')}
          </button>
          <button
            onClick={() => alert('SMS sent to registered mobile number')}
            className="w-full h-[64px] rounded-xl text-[20px] font-semibold bg-[#28A745] text-white active:bg-[#218838] transition-colors flex items-center justify-center gap-3 focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2"
            aria-label={t('sendSms')}
            data-testid="button-send-sms"
          >
            <Smartphone size={24} />
            {t('sendSms')}
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full h-[64px] rounded-xl text-[20px] font-semibold bg-[#F5F7FA] text-[#212529] border-2 border-[#DEE2E6] active:bg-[#DEE2E6] transition-colors flex items-center justify-center gap-3 focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
            aria-label={t('backToHome')}
            data-testid="button-back-home"
          >
            <Home size={24} />
            {t('done')}
          </button>
        </div>

        <div className="bg-[#F5F7FA] py-3 text-center">
          <p className="text-[14px] text-[#6C757D]">
            {t('autoRedirect', { seconds: countdown })}
          </p>
        </div>
      </div>
    </div>
  );
}
