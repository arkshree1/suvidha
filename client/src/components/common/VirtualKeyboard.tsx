import { useState } from 'react';
import { Delete, ArrowUp, Space } from 'lucide-react';

interface VirtualKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export default function VirtualKeyboard({ value, onChange, maxLength }: VirtualKeyboardProps) {
  const [isUpperCase, setIsUpperCase] = useState(false);

  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];

  const handleKey = (key: string) => {
    if (maxLength && value.length >= maxLength) return;
    const char = isUpperCase ? key.toUpperCase() : key;
    onChange(value + char);
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  const handleSpace = () => {
    if (maxLength && value.length >= maxLength) return;
    onChange(value + ' ');
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="w-full max-w-[700px] mx-auto" data-testid="virtual-keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1.5 mb-1.5">
          {rowIndex === 2 && (
            <button
              onClick={() => setIsUpperCase(!isUpperCase)}
              className={`min-w-[60px] h-[60px] rounded-lg text-[16px] font-semibold border-2 flex items-center justify-center transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2 ${isUpperCase ? 'bg-[#006EB3] text-white border-[#006EB3]' : 'bg-white text-[#212529] border-[#DEE2E6]'}`}
              aria-label="Shift"
              data-testid="key-shift"
            >
              <ArrowUp size={22} />
            </button>
          )}
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className="min-w-[52px] h-[60px] rounded-lg text-[20px] font-semibold bg-white border-2 border-[#DEE2E6] text-[#212529] active:bg-[#006EB3] active:text-white active:border-[#006EB3] transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
              aria-label={`Key ${isUpperCase ? key.toUpperCase() : key}`}
              data-testid={`key-${key}`}
            >
              {isUpperCase ? key.toUpperCase() : key}
            </button>
          ))}
          {rowIndex === 2 && (
            <button
              onClick={handleBackspace}
              className="min-w-[60px] h-[60px] rounded-lg text-[16px] font-semibold bg-[#DC3545] border-2 border-[#DC3545] text-white active:opacity-80 transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2 flex items-center justify-center"
              aria-label="Backspace"
              data-testid="keyboard-backspace"
            >
              <Delete size={22} />
            </button>
          )}
        </div>
      ))}
      <div className="flex justify-center gap-1.5">
        <button
          onClick={handleClear}
          className="min-w-[100px] h-[60px] rounded-lg text-[16px] font-semibold bg-[#FFC107] border-2 border-[#FFC107] text-[#212529] active:opacity-80 transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
          aria-label="Clear all"
          data-testid="keyboard-clear"
        >
          Clear
        </button>
        <button
          onClick={handleSpace}
          className="flex-1 max-w-[350px] h-[60px] rounded-lg text-[16px] font-semibold bg-white border-2 border-[#DEE2E6] text-[#6C757D] active:bg-[#006EB3] active:text-white transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2 flex items-center justify-center gap-2"
          aria-label="Space"
          data-testid="keyboard-space"
        >
          <Space size={20} />
          Space
        </button>
      </div>
    </div>
  );
}
