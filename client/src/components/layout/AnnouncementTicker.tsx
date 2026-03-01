import { Volume2 } from 'lucide-react';
import { mockAnnouncements } from '@/data/mockData';

export default function AnnouncementTicker() {
  const text = mockAnnouncements.join('  \u2022  ');

  return (
    <div className="bg-[#FFC107] text-[#212529] py-2 px-4 flex items-center gap-3 overflow-hidden" style={{ minHeight: '40px' }} data-testid="announcement-ticker">
      <Volume2 size={20} className="flex-shrink-0" />
      <div className="overflow-hidden flex-1">
        <div className="whitespace-nowrap animate-ticker inline-block">
          <span className="text-[14px] font-semibold">{text}  \u2022  {text}</span>
        </div>
      </div>
    </div>
  );
}
