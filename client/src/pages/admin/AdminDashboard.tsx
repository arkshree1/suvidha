import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockAdminTransactions, mockWeeklyUsage, mockAnnouncements } from '@/data/mockData';
import CssBarChart from '@/components/common/CssBarChart';
import VirtualKeyboard from '@/components/common/VirtualKeyboard';
import { Zap, Flame, Droplets, Building2, Users, Server, Plus, Trash2, LogOut } from 'lucide-react';
import { useLocation } from 'wouter';

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem('adminAuth') !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);

  const serviceCounts = {
    Electricity: mockAdminTransactions.filter(t => t.service === 'Electricity').length,
    Gas: mockAdminTransactions.filter(t => t.service === 'Gas').length,
    Water: mockAdminTransactions.filter(t => t.service === 'Water').length,
    Municipal: mockAdminTransactions.filter(t => t.service === 'Municipal').length,
  };

  const chartData = mockWeeklyUsage.map(d => ({
    label: d.day,
    value: d.transactions,
    displayValue: `${d.transactions}`,
  }));

  const cards = [
    { icon: Zap, label: 'Electricity', count: serviceCounts.Electricity, color: '#1565C0', bg: '#E3F2FD' },
    { icon: Flame, label: 'Gas', count: serviceCounts.Gas, color: '#E65100', bg: '#FFF3E0' },
    { icon: Droplets, label: 'Water', count: serviceCounts.Water, color: '#00695C', bg: '#E0F2F1' },
    { icon: Building2, label: 'Municipal', count: serviceCounts.Municipal, color: '#2E7D32', bg: '#E8F5E9' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      <div className="bg-[#006EB3] text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-[24px] font-bold">{t('admin')}</h1>
        <button onClick={() => { sessionStorage.removeItem('adminAuth'); navigate('/admin'); }} className="h-[44px] px-4 rounded-xl bg-white/20 text-white text-[16px] font-semibold flex items-center gap-2 active:bg-white/30 focus:outline-2 focus:outline-white focus:outline-offset-2" data-testid="button-admin-logout">
          <LogOut size={18} />{t('logout')}
        </button>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div>
          <h2 className="text-[20px] font-bold text-[#212529] mb-4">{t('todayTransactions')}</h2>
          <div className="grid grid-cols-4 gap-3">
            {cards.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border-2 border-[#DEE2E6] text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div className="w-[44px] h-[44px] rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: c.bg }}>
                  <c.icon size={24} style={{ color: c.color }} />
                </div>
                <div className="text-[28px] font-bold text-[#212529]">{c.count}</div>
                <div className="text-[12px] text-[#6C757D] font-medium">{c.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 border-2 border-[#DEE2E6] text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Users size={32} className="text-[#006EB3] mx-auto mb-2" />
            <div className="text-[28px] font-bold text-[#212529]">3</div>
            <div className="text-[14px] text-[#6C757D]">{t('activeSessions')}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border-2 border-[#DEE2E6] text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Server size={32} className="text-[#28A745] mx-auto mb-2" />
            <div className="text-[14px] font-bold text-[#28A745] mt-2">{t('systemStatus')}</div>
            <div className="flex gap-2 mt-2 justify-center">
              {['DB', 'API', 'Auth', 'Pay'].map(s => (
                <span key={s} className="text-[11px] font-semibold px-2 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32]">{s} OK</span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-[#DEE2E6]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 className="text-[18px] font-bold text-[#212529] mb-4">{t('weeklyUsage')}</h2>
          <CssBarChart data={chartData} barColor="#006EB3" height={140} />
        </div>

        <div className="bg-white rounded-2xl border-2 border-[#DEE2E6] overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div className="bg-[#37474F] text-white p-4 flex justify-between items-center">
            <h2 className="text-[18px] font-bold">{t('recentTransactions')}</h2>
            <button onClick={() => alert('Report downloaded')} className="text-[14px] font-semibold bg-white/20 px-3 py-1.5 rounded-lg active:bg-white/30" data-testid="button-export">{t('exportReport')}</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="admin-transactions-table">
              <thead>
                <tr className="bg-[#F5F7FA]">
                  <th className="text-left p-3 text-[13px] font-semibold text-[#6C757D]">Time</th>
                  <th className="text-left p-3 text-[13px] font-semibold text-[#6C757D]">Citizen</th>
                  <th className="text-left p-3 text-[13px] font-semibold text-[#6C757D]">{t('service')}</th>
                  <th className="text-right p-3 text-[13px] font-semibold text-[#6C757D]">{t('amount')}</th>
                  <th className="text-right p-3 text-[13px] font-semibold text-[#6C757D]">{t('status')}</th>
                </tr>
              </thead>
              <tbody>
                {mockAdminTransactions.map((txn, i) => (
                  <tr key={txn.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F5F7FA]'}>
                    <td className="p-3 text-[13px] text-[#212529]">{txn.time}</td>
                    <td className="p-3 text-[13px] text-[#212529]">{txn.citizenId}</td>
                    <td className="p-3 text-[13px] text-[#212529]">{txn.service}</td>
                    <td className="p-3 text-[13px] text-[#212529] text-right font-semibold">Rs. {txn.amount.toFixed(2)}</td>
                    <td className="p-3 text-right">
                      <span className={`text-[11px] font-semibold px-2 py-1 rounded-full ${txn.status === 'Success' ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFEBEE] text-[#C62828]'}`}>{txn.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-[#DEE2E6]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 className="text-[18px] font-bold text-[#212529] mb-4">{t('announcements')}</h2>
          <div className="space-y-2 mb-4">
            {announcements.map((a, i) => (
              <div key={i} className="flex items-center justify-between bg-[#F5F7FA] rounded-xl p-3">
                <span className="text-[14px] text-[#212529] flex-1">{a}</span>
                <button onClick={() => setAnnouncements(prev => prev.filter((_, idx) => idx !== i))} className="w-[36px] h-[36px] rounded-lg bg-[#FFEBEE] flex items-center justify-center ml-2 active:bg-[#EF9A9A] flex-shrink-0" aria-label="Remove">
                  <Trash2 size={16} className="text-[#C62828]" />
                </button>
              </div>
            ))}
          </div>
          <div onClick={() => setShowKeyboard(true)} className={`bg-[#F5F7FA] rounded-xl p-4 border-2 text-[16px] min-h-[56px] cursor-pointer mb-3 ${showKeyboard ? 'border-[#006EB3]' : 'border-[#DEE2E6]'}`}>
            {newAnnouncement || <span className="text-[#6C757D]">Type new announcement...</span>}
          </div>
          {showKeyboard && <VirtualKeyboard value={newAnnouncement} onChange={setNewAnnouncement} maxLength={200} />}
          <button onClick={() => { if (newAnnouncement) { setAnnouncements(prev => [...prev, newAnnouncement]); setNewAnnouncement(''); } }} disabled={!newAnnouncement} className="w-full h-[56px] rounded-xl text-[18px] font-semibold bg-[#006EB3] text-white disabled:bg-[#DEE2E6] disabled:text-[#6C757D] active:bg-[#005a94] flex items-center justify-center gap-2 focus:outline-2 focus:outline-[#F26522] focus:outline-offset-2" data-testid="button-add-announcement">
            <Plus size={20} />Add Announcement
          </button>
        </div>
      </div>
    </div>
  );
}
