import { useState, useEffect, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useLanguage } from '@/context/LanguageContext';
import { Smartphone, CheckCircle2, X } from 'lucide-react';

interface QrUploadProps {
  onFileReceived: (fileName: string) => void;
  label?: string;
  accentColor?: string;
}

export default function QrUpload({ onFileReceived, label, accentColor = '#006EB3' }: QrUploadProps) {
  const { t } = useLanguage();
  const [showQr, setShowQr] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'waiting' | 'received'>('idle');
  const [receivedFileName, setReceivedFileName] = useState('');

  const uploadId = useMemo(() => `KIOSK-${Date.now().toString(36).toUpperCase()}`, []);
  const uploadUrl = `https://suvidha-kiosk.gov.in/upload/${uploadId}`;

  useEffect(() => {
    if (uploadStatus !== 'waiting') return;
    const timer = setTimeout(() => {
      const mockFileName = `photo_${Date.now().toString().slice(-6)}.jpg`;
      setReceivedFileName(mockFileName);
      setUploadStatus('received');
      onFileReceived(mockFileName);
    }, 4000);
    return () => clearTimeout(timer);
  }, [uploadStatus, onFileReceived]);

  if (uploadStatus === 'received') {
    return (
      <div
        className="rounded-xl p-4 border-2 flex items-center justify-between"
        style={{ borderColor: '#28A745', backgroundColor: '#E8F5E9' }}
        data-testid="qr-upload-success"
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 size={24} className="text-[#28A745]" />
          <div>
            <p className="text-[15px] font-semibold text-[#2E7D32]">{t('photoReceived')}</p>
            <p className="text-[13px] text-[#388E3C]">{receivedFileName}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setUploadStatus('idle');
            setShowQr(false);
            setReceivedFileName('');
            onFileReceived('');
          }}
          className="w-[36px] h-[36px] rounded-lg bg-white flex items-center justify-center border border-[#DEE2E6]"
          aria-label="Remove"
          data-testid="button-remove-upload"
        >
          <X size={18} className="text-[#6C757D]" />
        </button>
      </div>
    );
  }

  if (showQr) {
    return (
      <div
        className="rounded-xl p-5 border-2 border-dashed text-center"
        style={{ borderColor: accentColor }}
        data-testid="qr-upload-panel"
      >
        <div className="bg-white rounded-lg p-4 inline-block mb-3 border border-[#DEE2E6]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <QRCodeSVG
            value={uploadUrl}
            size={160}
            level="M"
            includeMargin={false}
            bgColor="#ffffff"
            fgColor="#212529"
          />
        </div>
        <p className="text-[16px] font-semibold text-[#212529] mb-1">{t('scanQrTitle')}</p>
        <p className="text-[14px] text-[#6C757D] mb-3">{t('scanQrDesc')}</p>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-[10px] h-[10px] rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
          <span className="text-[14px] font-medium" style={{ color: accentColor }}>{t('waitingForUpload')}</span>
        </div>
        <p className="text-[12px] text-[#6C757D] bg-[#F8F9FA] rounded-lg p-2">{t('uploadCode')}: <span className="font-bold">{uploadId}</span></p>
        <button
          onClick={() => { setShowQr(false); setUploadStatus('idle'); }}
          className="mt-3 text-[14px] text-[#DC3545] font-medium underline"
          data-testid="button-cancel-qr"
        >
          {t('cancel')}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => { setShowQr(true); setUploadStatus('waiting'); }}
      className="w-full rounded-xl p-4 border-2 border-dashed text-center cursor-pointer transition-colors active:opacity-80"
      style={{ borderColor: accentColor }}
      data-testid="button-qr-upload"
    >
      <Smartphone size={28} className="mx-auto mb-2" style={{ color: accentColor }} />
      <p className="text-[16px] font-medium" style={{ color: accentColor }}>
        {label || t('tapToScanUpload')}
      </p>
      <p className="text-[13px] text-[#6C757D] mt-1">{t('scanFromPhone')}</p>
    </button>
  );
}
