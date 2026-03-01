import { Check } from 'lucide-react';

interface StatusTrackerProps {
  steps: string[];
  currentStep: number;
  vertical?: boolean;
}

export default function StatusTracker({ steps, currentStep, vertical }: StatusTrackerProps) {
  if (vertical) {
    return (
      <div className="flex flex-col gap-0" data-testid="status-tracker-vertical">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <div key={index} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-[40px] h-[40px] rounded-full flex items-center justify-center text-[16px] font-bold border-2 flex-shrink-0 ${
                    isCompleted
                      ? 'bg-[#28A745] border-[#28A745] text-white'
                      : isCurrent
                      ? 'bg-[#006EB3] border-[#006EB3] text-white'
                      : 'bg-[#F5F7FA] border-[#DEE2E6] text-[#6C757D]'
                  }`}
                >
                  {isCompleted ? <Check size={20} /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-[3px] h-[40px] ${isCompleted ? 'bg-[#28A745]' : 'bg-[#DEE2E6]'}`} />
                )}
              </div>
              <div className="pt-2">
                <span className={`text-[18px] font-semibold ${isCompleted ? 'text-[#28A745]' : isCurrent ? 'text-[#006EB3]' : 'text-[#6C757D]'}`}>
                  {step}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full" data-testid="status-tracker">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        return (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-[44px] h-[44px] rounded-full flex items-center justify-center text-[16px] font-bold border-2 ${
                  isCompleted
                    ? 'bg-[#28A745] border-[#28A745] text-white'
                    : isCurrent
                    ? 'bg-[#006EB3] border-[#006EB3] text-white'
                    : 'bg-[#F5F7FA] border-[#DEE2E6] text-[#6C757D]'
                }`}
              >
                {isCompleted ? <Check size={20} /> : index + 1}
              </div>
              <span className={`text-[13px] font-medium text-center max-w-[80px] leading-tight ${
                isCompleted ? 'text-[#28A745]' : isCurrent ? 'text-[#006EB3]' : 'text-[#6C757D]'
              }`}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-[3px] mx-1 mt-[-24px] ${isCompleted ? 'bg-[#28A745]' : 'bg-[#DEE2E6]'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
