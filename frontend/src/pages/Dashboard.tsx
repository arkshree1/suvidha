import { Zap, Flame, Droplets, Building2, FileText, ClipboardList, LogOut } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useSession } from '@/context/SessionContext';
import { useLocation } from 'wouter';
import ServiceCard from '@/components/common/ServiceCard';

export default function Dashboard() {
  const { t } = useLanguage();
  const { citizen, isGuest, logout } = useAuth();
  const { setSessionActive } = useSession();
  const [, navigate] = useLocation();

  const handleLogout = () => {
    setSessionActive(false);
    logout();
    navigate('/');
  };

  const services = [
    { icon: Zap, titleKey: 'electricity', descKey: 'electricityDesc', gradient: 'linear-gradient(135deg, #1565C0, #42A5F5)', path: '/electricity' },
    { icon: Flame, titleKey: 'gas', descKey: 'gasDesc', gradient: 'linear-gradient(135deg, #E65100, #FFA726)', path: '/gas' },
    { icon: Droplets, titleKey: 'water', descKey: 'waterDesc', gradient: 'linear-gradient(135deg, #00695C, #4DB6AC)', path: '/water' },
    { icon: Building2, titleKey: 'municipal', descKey: 'municipalDesc', gradient: 'linear-gradient(135deg, #2E7D32, #81C784)', path: '/municipal' },
    { icon: ClipboardList, titleKey: 'grievance', descKey: 'grievanceDesc', gradient: 'linear-gradient(135deg, #6A1B9A, #CE93D8)', path: '/grievance' },
    { icon: FileText, titleKey: 'documents', descKey: 'documentsDesc', gradient: 'linear-gradient(135deg, #37474F, #90A4AE)', path: '/documents' },
  ];

  return (
    <div className="px-6 py-6 animate-fadeIn">
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center justify-between border-2 border-[#DEE2E6]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} data-testid="welcome-strip">
        <div>
          <h2 className="text-[20px] font-bold text-[#212529]">{t('welcomeUser', { name: citizen?.name || '' })}</h2>
          {!isGuest && citizen?.mobile && (
            <p className="text-[14px] text-[#6C757D]">{t('mobile')}: {citizen.mobile.slice(0, 6) + '****'}</p>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="h-[48px] px-4 rounded-xl bg-[#DC3545] text-white text-[16px] font-semibold flex items-center gap-2 active:bg-[#c82333] transition-colors focus:outline-2 focus:outline-[#006EB3] focus:outline-offset-2"
          aria-label={t('logout')}
          data-testid="button-logout"
        >
          <LogOut size={20} />
          {t('logout')}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {services.map((svc) => (
          <ServiceCard
            key={svc.titleKey}
            icon={svc.icon}
            title={t(svc.titleKey)}
            description={t(svc.descKey)}
            gradient={svc.gradient}
            onClick={() => navigate(svc.path)}
            testId={`card-${svc.titleKey}`}
          />
        ))}
      </div>
    </div>
  );
}
