import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  onClick: () => void;
  testId?: string;
}

export default function ServiceCard({ icon: Icon, title, description, gradient, onClick, testId }: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl p-6 text-left text-white transition-transform active:scale-[0.98] focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2 min-h-[160px] flex flex-col justify-between"
      style={{ background: gradient, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
      aria-label={title}
      data-testid={testId}
    >
      <div className="flex items-start gap-4">
        <div className="w-[56px] h-[56px] rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <Icon size={32} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[22px] font-bold leading-tight mb-1">{title}</h3>
          <p className="text-[16px] opacity-90 leading-snug">{description}</p>
        </div>
      </div>
    </button>
  );
}
