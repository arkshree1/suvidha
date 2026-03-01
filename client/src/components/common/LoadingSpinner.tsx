interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6" data-testid="loading-spinner">
      <div className="w-[64px] h-[64px] border-4 border-[#DEE2E6] border-t-[#006EB3] rounded-full animate-spin" />
      {message && <p className="text-[20px] text-[#6C757D] font-medium">{message}</p>}
    </div>
  );
}
