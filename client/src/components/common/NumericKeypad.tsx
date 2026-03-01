import { Delete, X } from 'lucide-react';

interface NumericKeypadProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  onSubmit?: () => void;
  submitLabel?: string;
}

export default function NumericKeypad({ value, onChange, maxLength, onSubmit, submitLabel }: NumericKeypadProps) {
  const handlePress = (digit: string) => {
    if (maxLength && value.length >= maxLength) return;
    onChange(value + digit);
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    onChange('');
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className="w-full max-w-[400px] mx-auto" data-testid="numeric-keypad">
      <div className="grid grid-cols-3 gap-3">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => handlePress(key)}
            className="h-[80px] rounded-xl text-[28px] font-semibold bg-white border-2 border-[#DEE2E6] text-[#212529] active:bg-[#006EB3] active:text-white active:border-[#006EB3] transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
            aria-label={`Digit ${key}`}
            data-testid={`key-${key}`}
          >
            {key}
          </button>
        ))}
        <button
          onClick={handleClear}
          className="h-[80px] rounded-xl text-[18px] font-semibold bg-[#FFC107] border-2 border-[#FFC107] text-[#212529] active:opacity-80 transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2 flex items-center justify-center gap-2"
          aria-label="Clear all"
          data-testid="key-clear"
        >
          <X size={24} />
          Clear
        </button>
        <button
          onClick={() => handlePress('0')}
          className="h-[80px] rounded-xl text-[28px] font-semibold bg-white border-2 border-[#DEE2E6] text-[#212529] active:bg-[#006EB3] active:text-white active:border-[#006EB3] transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
          aria-label="Digit 0"
          data-testid="key-0"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="h-[80px] rounded-xl text-[18px] font-semibold bg-[#DC3545] border-2 border-[#DC3545] text-white active:opacity-80 transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2 flex items-center justify-center gap-2"
          aria-label="Backspace"
          data-testid="key-backspace"
        >
          <Delete size={24} />
        </button>
      </div>
      {onSubmit && (
        <button
          onClick={onSubmit}
          disabled={!value}
          className="w-full mt-4 h-[72px] rounded-xl text-[24px] font-semibold bg-[#006EB3] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:bg-[#005a94] transition-colors focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2"
          aria-label={submitLabel || 'Submit'}
          data-testid="keypad-submit"
        >
          {submitLabel || 'Submit'}
        </button>
      )}
    </div>
  );
}
