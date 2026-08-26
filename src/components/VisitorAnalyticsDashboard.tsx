import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Activity, 
  Globe2, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Clock, 
  Eye, 
  Download, 
  Trash2, 
  RefreshCw, 
  Search, 
  Filter, 
  ExternalLink, 
  Shield, 
  Zap, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle,
  MapPin,
  Compass,
  Layers,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Sparkles,
  MousePointerClick,
  Wifi,
  Flame,
  QrCode,
  Tag,
  Laptop,
  Maximize2,
  X,
  Navigation,
  FileText,
  Moon,
  Sun,
  Radio
} from 'lucide-react';
import { VisitorLog, VisitorEvent } from '../types';
import { 
  subscribeToVisitorLogs, 
  deleteVisitorLog, 
  clearAllVisitorLogs 
} from '../services/analytics';

interface VisitorAnalyticsDashboardProps {
  darkMode: boolean;
}

export const VisitorAnalyticsDashboard: React.FC<VisitorAnalyticsDashboardProps> = ({ darkMode }) => {
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<string>('all');
  const [selectedLeadScore, setSelectedLeadScore] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<'all' | 'today' | '7days' | '30days'>('all');
  const [selectedSourceType, setSelectedSourceType] = useState<string>('all');
  const [selectedConversion, setSelectedConversion] = useState<'all' | 'any' | 'demo' | 'cv' | 'contact' | 'copy'>('all');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [selectedLogForModal, setSelectedLogForModal] = useState<VisitorLog | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  // Subscribe to real-time logs
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToVisitorLogs((newLogs) => {
      setLogs(newLogs);
      setLoading(false);
    }, 400);

    return () => unsubscribe();
  }, []);

  // Filter logs
  const filteredLogs = useMemo(() => {
    const now = new Date().getTime();
    return logs.filter((log) => {
      // Time range filter
      if (selectedTimeRange !== 'all') {
        const logTime = new Date(log.timestamp).getTime();
        const diffHours = (now - logTime) / (1000 * 60 * 60);
        if (selectedTimeRange === 'today' && diffHours > 24) return false;
        if (selectedTimeRange === '7days' && diffHours > 24 * 7) return false;
        if (selectedTimeRange === '30days' && diffHours > 24 * 30) return false;
      }

      // Device filter
      if (selectedDevice !== 'all' && log.device !== selectedDevice) {
        return false;
      }

      // Lead Score filter
      if (selectedLeadScore !== 'all') {
        const score = log.leadScore || 'new';
        if (score !== selectedLeadScore) return false;
      }

      // Source type filter
      if (selectedSourceType !== 'all') {
        const ref = log.referrer || '';
        if (selectedSourceType === 'ref' && !log.refTag && !ref.includes('Ref')) return false;
        if (selectedSourceType === 'linkedin' && !ref.toLowerCase().includes('linkedin')) return false;
        if (selectedSourceType === 'google' && !ref.toLowerCase().includes('google')) return false;
        if (selectedSourceType === 'direct' && !ref.toLowerCase().includes('direct')) return false;
      }

      // Conversion filter
      if (selectedConversion !== 'all') {
        const events = log.events || [];
        const visitedProjects = log.visitedProjects || [];

        if (selectedConversion === 'any') {
          const hasAny = visitedProjects.length > 0 || events.some(ev => 
            ev.type.includes('demo') || 
            ev.type.includes('project') || 
            ev.type.includes('cv') || 
            ev.type.includes('download') || 
            ev.type.includes('contact') || 
            ev.type.includes('message') || 
            ev.type.includes('copy')
          );
          if (!hasAny) return false;
        } else if (selectedConversion === 'demo') {
          const hasDemo = visitedProjects.length > 0 || events.some(ev => 
            ev.type.includes('demo') || ev.type.includes('project')
          );
          if (!hasDemo) return false;
        } else if (selectedConversion === 'cv') {
          const hasCV = events.some(ev => 
            ev.type.includes('cv') || ev.type.includes('download')
          );
          if (!hasCV) return false;
        } else if (selectedConversion === 'contact') {
          const hasContact = events.some(ev => 
            ev.type.includes('contact') || ev.type.includes('message')
          );
          if (!hasContact) return false;
        } else if (selectedConversion === 'copy') {
          const hasCopy = events.some(ev => 
            ev.type.includes('copy')
          );
          if (!hasCopy) return false;
        }
      }

      // Search query across all fields
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCity = log.city?.toLowerCase().includes(q);
        const matchCountry = log.country?.toLowerCase().includes(q);
        const matchIp = log.ip?.toLowerCase().includes(q);
        const matchIsp = log.isp?.toLowerCase().includes(q);
        const matchOrg = log.org?.toLowerCase().includes(q);
        const matchBrowser = log.browser?.toLowerCase().includes(q);
        const matchOs = log.os?.toLowerCase().includes(q);
        const matchReferrer = log.referrer?.toLowerCase().includes(q);
        const matchRefTag = log.refTag?.toLowerCase().includes(q);
        const matchUtm = (log.utmSource || log.utmCampaign)?.toLowerCase().includes(q);
        const matchProjects = log.visitedProjects?.some(p => p.toLowerCase().includes(q));
        const matchEvents = log.events?.some(ev => ev.details?.toLowerCase().includes(q) || ev.type.toLowerCase().includes(q));

        return matchCity || matchCountry || matchIp || matchIsp || matchOrg || 
               matchBrowser || matchOs || matchReferrer || matchRefTag || 
               matchUtm || matchProjects || matchEvents;
      }

      return true;
    });
  }, [logs, searchQuery, selectedDevice, selectedLeadScore, selectedTimeRange, selectedSourceType, selectedConversion]);

  // Analytics Aggregations
  const stats = useMemo(() => {
    const totalVisits = logs.length;
    const uniqueVisitors = new Set(logs.map(l => l.visitorId)).size;
    
    // Today's visits
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const todayVisits = logs.filter(l => l.timestamp?.startsWith(todayStr)).length;

    // Average duration
    const totalDuration = logs.reduce((acc, l) => acc + (l.durationSeconds || 0), 0);
    const avgDurationSec = totalVisits > 0 ? Math.round(totalDuration / totalVisits) : 0;

    // Average scroll depth
    const totalScroll = logs.reduce((acc, l) => acc + (l.scrollDepth || 0), 0);
    const avgScrollDepth = totalVisits > 0 ? Math.round(totalScroll / totalVisits) : 0;

    // Lead Scores
    let hotLeads = 0;
    let warmLeads = 0;
    logs.forEach(l => {
      if (l.leadScore === 'hot') hotLeads++;
      else if (l.leadScore === 'warm') warmLeads++;
    });

    // Device distribution
    const devices: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0 };
    logs.forEach(l => {
      if (l.device && devices[l.device] !== undefined) {
        devices[l.device]++;
      } else {
        devices.Desktop++;
      }
    });

    // Top Cities
    const cities: Record<string, number> = {};
    logs.forEach(l => {
      const cityName = l.city && l.city !== 'Không xác định' ? l.city : (l.country || 'Việt Nam');
      cities[cityName] = (cities[cityName] || 0) + 1;
    });
    const topCities = Object.entries(cities)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Top ISPs / Organizations
    const isps: Record<string, number> = {};
    logs.forEach(l => {
      if (l.isp && l.isp !== 'Internet Provider') {
        isps[l.isp] = (isps[l.isp] || 0) + 1;
      }
    });
    const topISPs = Object.entries(isps)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    // Top Clicked / Viewed Projects
    const projectViews: Record<string, number> = {};
    logs.forEach(l => {
      l.visitedProjects?.forEach(p => {
        projectViews[p] = (projectViews[p] || 0) + 1;
      });
      l.events?.forEach(ev => {
        if (ev.details?.includes('Live App:') || ev.details?.includes('chi tiết dự án:')) {
          const match = ev.details.split(':')[1]?.trim();
          if (match) {
            projectViews[match] = (projectViews[match] || 0) + 1;
          }
        }
      });
    });
    const topProjects = Object.entries(projectViews)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    // Key Conversions & Events (Counted per Unique Converted Visitor)
    // When 1 visitor performs multiple conversion actions, they are counted as 1 converted visitor
    let convertedVisitors = 0;
    let demoVisitors = 0;
    let cvVisitors = 0;
    let contactVisitors = 0;
    let credentialsCopiedVisitors = 0;

    logs.forEach(l => {
      const events = l.events || [];
      const visitedProjects = l.visitedProjects || [];
      
      const hasDemo = visitedProjects.length > 0 || events.some(ev => 
        ev.type.includes('demo') || ev.type.includes('project')
      );
      const hasCV = events.some(ev => 
        ev.type.includes('cv') || ev.type.includes('download')
      );
      const hasContact = events.some(ev => 
        ev.type.includes('contact') || ev.type.includes('message')
      );
      const hasCopy = events.some(ev => 
        ev.type.includes('copy')
      );

      if (hasDemo || hasCV || hasContact || hasCopy) {
        convertedVisitors++;
      }
      if (hasDemo) demoVisitors++;
      if (hasCV) cvVisitors++;
      if (hasContact) contactVisitors++;
      if (hasCopy) credentialsCopiedVisitors++;
    });

    return {
      totalVisits,
      uniqueVisitors,
      todayVisits,
      avgDurationSec,
      avgScrollDepth,
      hotLeads,
      warmLeads,
      devices,
      topCities,
      topISPs,
      topProjects,
      convertedVisitors,
      demoVisitors,
      cvVisitors,
      contactVisitors,
      credentialsCopiedVisitors,
      // Backward compatibility aliases if referenced
      demoClicks: demoVisitors,
      cvDownloads: cvVisitors,
      contactSubmits: contactVisitors,
      credentialsCopied: credentialsCopiedVisitors
    };
  }, [logs]);

  // Format Duration
  const formatDuration = (seconds: number) => {
    if (!seconds || seconds <= 0) return '< 10 giây';
    if (seconds < 60) return `${seconds} giây`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}p ${s > 0 ? `${s}s` : ''}`;
  };

  // Format Relative / Date Time
  const formatDateTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return isoString;
    }
  };

  const getCountryFlag = (countryCode?: string) => {
    if (!countryCode) return '🌐';
    if (countryCode === 'VN') return '🇻🇳';
    if (countryCode === 'US') return '🇺🇸';
    if (countryCode === 'KR') return '🇰🇷';
    if (countryCode === 'CN') return '🇨🇳';
    if (countryCode === 'JP') return '🇯🇵';
    if (countryCode === 'SG') return '🇸🇬';
    if (countryCode === 'GB' || countryCode === 'UK') return '🇬🇧';
    if (countryCode === 'DE') return '🇩🇪';
    if (countryCode === 'FR') return '🇫🇷';
    if (countryCode === 'AU') return '🇦🇺';
    return '🌐';
  };

  const renderLeadBadge = (score?: string) => {
    if (score === 'hot') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-rose-500/20 to-orange-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
          <Flame className="w-3 h-3 text-rose-500 fill-rose-500" />
          Rất Tiềm Năng
        </span>
      );
    }
    if (score === 'warm') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
          <Zap className="w-3 h-3 text-amber-400" />
          Quan Tâm
        </span>
      );
    }
    if (score === 'casual') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-500/15 text-slate-400 border border-slate-500/20">
          Lướt nhanh
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
        Khách mới
      </span>
    );
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDeletingId(id);
    try {
      await deleteVisitorLog(id);
      if (selectedLogForModal?.id === id) {
        setSelectedLogForModal(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử lượt truy cập?')) return;
    setIsClearing(true);
    try {
      await clearAllVisitorLogs(logs);
    } catch (e) {
      console.error(e);
    } finally {
      setIsClearing(false);
    }
  };

  // Export to Comprehensive CSV
  const handleExportCSV = () => {
    if (logs.length === 0) return;
    const headers = [
      'Thời gian',
      'Đánh giá tiềm năng',
      'IP',
      'Nhà mạng (ISP / Org)',
      'Thành phố',
      'Quốc gia',
      'Tọa độ Lat-Lng',
      'Múi giờ',
      'Thiết bị',
      'HĐH',
      'Trình duyệt',
      'Độ phân giải',
      'Kích thước cửa sổ',
      'Nguồn (Referrer)',
      'Mã Ref / Nhà tuyển dụng',
      'Chiến dịch (UTM)',
      'Ngôn ngữ',
      'Chế độ giao diện',
      'Loại kết nối mạng',
      'Độ sâu đọc bài (%)',
      'Thời gian xem (giây)',
      'Dự án đã xem',
      'Tổng số tương tác'
    ];

    const rows = logs.map(l => [
      `"${l.timestamp}"`,
      `"${l.leadScore || 'new'}"`,
      `"${l.ip || ''}"`,
      `"${l.isp || l.org || ''}"`,
      `"${l.city || ''}"`,
      `"${l.country || ''}"`,
      `"${l.latitude ? `${l.latitude}, ${l.longitude}` : ''}"`,
      `"${l.timezone || ''}"`,
      `"${l.device || ''}"`,
      `"${l.os || ''}"`,
      `"${l.browser || ''} ${l.browserVersion || ''}"`,
      `"${l.screenResolution || ''}"`,
      `"${l.windowSize || ''}"`,
      `"${l.referrer || ''}"`,
      `"${l.refTag || ''}"`,
      `"${l.utmSource || l.utmCampaign || ''}"`,
      `"${l.language || ''}"`,
      `"${l.colorScheme || ''}"`,
      `"${l.connectionType || ''}"`,
      l.scrollDepth || 0,
      l.durationSeconds || 0,
      `"${(l.visitedProjects || []).join('; ')}"`,
      l.events?.length || 0
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Deep_Visitor_Intelligence_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className={`p-6 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
        darkMode 
          ? 'bg-gradient-to-r from-[#11131A] via-[#161824] to-[#11131A] border-white/10 text-white' 
          : 'bg-gradient-to-r from-white via-blue-50/40 to-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h2 className="text-xl font-extrabold flex items-center gap-2.5">
              <Activity className="w-6 h-6 text-[#3B82F6]" />
              Trung Tâm Giám Sát Khách & Hành Vi Tuyển Dụng
            </h2>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Realtime Active
            </span>
          </div>
          <p className={`text-xs ${darkMode ? 'text-[#94A3B8]' : 'text-slate-500'} max-w-3xl leading-relaxed`}>
            Ghi nhận toàn diện: <strong>Nhà mạng (ISP)</strong>, <strong>Tọa độ địa lý</strong>, <strong>Mã Ref Nhà Tuyển Dụng</strong>, <strong>Độ sâu cuộn trang</strong>, <strong>Web App được quan tâm</strong> và <strong>Đánh giá mức độ tiềm năng (Lead Score)</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            disabled={logs.length === 0}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border shadow-sm ${
              darkMode
                ? 'bg-white/10 hover:bg-white/15 text-white border-white/15 hover:border-white/30'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            Xuất Báo Cáo Đầy Đủ (CSV)
          </button>

          <button
            onClick={handleClearAll}
            disabled={logs.length === 0 || isClearing}
            className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 text-rose-400 hover:bg-rose-500/15 border border-rose-500/30 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            {isClearing ? 'Đang xóa...' : 'Xóa Lịch Sử'}
          </button>
        </div>
      </div>

      {/* Helper scroll and filter handlers */}
      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Total Visits (Click to reset all & show all) */}
        <button
          type="button"
          onClick={() => {
            setSelectedLeadScore('all');
            setSelectedDevice('all');
            setSelectedTimeRange('all');
            setSelectedSourceType('all');
            setSelectedConversion('all');
            setSearchQuery('');
            const el = document.getElementById('visitor-logs-table');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group focus:outline-none relative overflow-hidden ${
            darkMode 
              ? 'bg-[#11131A] hover:bg-blue-500/10 border-white/10 hover:border-blue-500/40 text-white' 
              : 'bg-white hover:bg-blue-50/70 border-slate-200 hover:border-blue-300 text-slate-900 shadow-sm'
          }`}
          title="Nhấn để xem toàn bộ danh sách khách truy cập (hoàn tác các bộ lọc)"
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-[#94A3B8]' : 'text-slate-500'}`}>
              Tổng Lượt Xem
            </span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-all">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#3B82F6] flex items-baseline justify-between">
            <span>{stats.totalVisits}</span>
            <span className="text-[10px] font-normal text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">Xem tất cả ↓</span>
          </div>
          <div className={`text-[11px] mt-1 flex items-center gap-1 ${darkMode ? 'text-[#64748B]' : 'text-slate-400'}`}>
            <span>Duy nhất:</span>
            <strong className="text-[#38BDF8]">{stats.uniqueVisitors} Khách</strong>
          </div>
        </button>

        {/* Card 2: Hot Leads (Click to filter Hot Leads) */}
        <button
          type="button"
          onClick={() => {
            setSelectedLeadScore('hot');
            const el = document.getElementById('visitor-logs-table');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group focus:outline-none relative overflow-hidden ${
            selectedLeadScore === 'hot'
              ? (darkMode ? 'bg-rose-500/20 border-rose-500/60 ring-2 ring-rose-500/40' : 'bg-rose-50 border-rose-400 ring-2 ring-rose-400/30')
              : (darkMode ? 'bg-[#11131A] hover:bg-rose-500/10 border-white/10 hover:border-rose-500/40' : 'bg-white hover:bg-rose-50/70 border-slate-200 hover:border-rose-300 shadow-sm')
          }`}
          title="Nhấn để lọc riêng danh sách khách Rất Tiềm Năng (Hot Leads)"
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-rose-400' : 'text-rose-600'}`}>
              Khách Tiềm Năng
            </span>
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 transition-all">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-400 flex items-baseline justify-between">
            <span>{stats.hotLeads}</span>
            <span className="text-[10px] font-normal text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">Lọc Hot ↓</span>
          </div>
          <div className={`text-[11px] mt-1 ${darkMode ? 'text-[#64748B]' : 'text-slate-400'}`}>
            🔥 Đã xem Demo / Tải CV
          </div>
        </button>

        {/* Card 3: Today Visits (Click to filter Today) */}
        <button
          type="button"
          onClick={() => {
            setSelectedTimeRange('today');
            const el = document.getElementById('visitor-logs-table');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group focus:outline-none relative overflow-hidden ${
            selectedTimeRange === 'today'
              ? (darkMode ? 'bg-emerald-500/20 border-emerald-500/60 ring-2 ring-emerald-500/40' : 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-400/30')
              : (darkMode ? 'bg-[#11131A] hover:bg-emerald-500/10 border-white/10 hover:border-emerald-500/40' : 'bg-white hover:bg-emerald-50/70 border-slate-200 hover:border-emerald-300 shadow-sm')
          }`}
          title="Nhấn để lọc danh sách khách truy cập hôm nay (trong 24h qua)"
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              Trong 24h Qua
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-all">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 flex items-baseline justify-between">
            <span>{stats.todayVisits}</span>
            <span className="text-[10px] font-normal text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">Lọc 24h ↓</span>
          </div>
          <div className={`text-[11px] mt-1 ${darkMode ? 'text-[#64748B]' : 'text-slate-400'}`}>
            Lượt truy cập hôm nay
          </div>
        </button>

        {/* Card 4: Avg Read Time (Click to filter warm/engaged) */}
        <button
          type="button"
          onClick={() => {
            setSelectedLeadScore('warm');
            const el = document.getElementById('visitor-logs-table');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group focus:outline-none relative overflow-hidden ${
            selectedLeadScore === 'warm'
              ? (darkMode ? 'bg-amber-500/20 border-amber-500/60 ring-2 ring-amber-500/40' : 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/30')
              : (darkMode ? 'bg-[#11131A] hover:bg-amber-500/10 border-white/10 hover:border-amber-500/40' : 'bg-white hover:bg-amber-50/70 border-slate-200 hover:border-amber-300 shadow-sm')
          }`}
          title="Nhấn để lọc danh sách khách tương tác & đọc bài quan tâm (Warm Leads)"
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              Thời Gian Đọc TB
            </span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-all">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400 flex items-baseline justify-between">
            <span>{formatDuration(stats.avgDurationSec)}</span>
            <span className="text-[10px] font-normal text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">Lọc Quan Tâm ↓</span>
          </div>
          <div className={`text-[11px] mt-1 ${darkMode ? 'text-[#64748B]' : 'text-slate-400'}`}>
            Độ sâu cuộn: <strong>{stats.avgScrollDepth}%</strong>
          </div>
        </button>

        {/* Card 5: Actions / Conversions (Click to filter conversions) */}
        <div
          className={`p-4 rounded-2xl border col-span-2 sm:col-span-2 lg:col-span-1 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
            selectedConversion !== 'all'
              ? (darkMode ? 'bg-purple-500/20 border-purple-500/60 ring-2 ring-purple-500/40' : 'bg-purple-50 border-purple-400 ring-2 ring-purple-400/30')
              : (darkMode ? 'bg-[#11131A] hover:bg-purple-500/10 border-white/10 hover:border-purple-500/40' : 'bg-white hover:bg-purple-50/70 border-slate-200 hover:border-purple-300 shadow-sm')
          }`}
        >
          <button
            type="button"
            onClick={() => {
              setSelectedConversion(selectedConversion === 'any' ? 'all' : 'any');
              const el = document.getElementById('visitor-logs-table');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="w-full text-left focus:outline-none cursor-pointer group"
            title="Nhấn để lọc khách có phát sinh chuyển đổi (Demo, Tải CV, Liên hệ)"
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                Khách Chuyển Đổi
              </span>
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-all">
                <MousePointerClick className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-purple-400 flex items-baseline justify-between">
              <span>{stats.convertedVisitors}</span>
              <span className="text-[10px] font-normal text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {selectedConversion === 'any' ? 'Đang lọc ✓' : 'Lọc khách ↓'}
              </span>
            </div>
          </button>
          
          <div className="text-[11px] mt-2 flex flex-wrap items-center gap-1.5 pt-2 border-t border-purple-500/20">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedConversion(selectedConversion === 'demo' ? 'all' : 'demo');
                const el = document.getElementById('visitor-logs-table');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                selectedConversion === 'demo'
                  ? 'bg-purple-500 text-white shadow-xs'
                  : (darkMode ? 'bg-white/5 hover:bg-purple-500/20 text-purple-300' : 'bg-purple-100 hover:bg-purple-200 text-purple-800')
              }`}
              title={`Số khách xem Demo Web Apps: ${stats.demoVisitors}`}
            >
              🚀 {stats.demoVisitors}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedConversion(selectedConversion === 'cv' ? 'all' : 'cv');
                const el = document.getElementById('visitor-logs-table');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                selectedConversion === 'cv'
                  ? 'bg-purple-500 text-white shadow-xs'
                  : (darkMode ? 'bg-white/5 hover:bg-purple-500/20 text-purple-300' : 'bg-purple-100 hover:bg-purple-200 text-purple-800')
              }`}
              title={`Số khách tải / mở CV: ${stats.cvVisitors}`}
            >
              📄 {stats.cvVisitors}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedConversion(selectedConversion === 'contact' ? 'all' : 'contact');
                const el = document.getElementById('visitor-logs-table');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                selectedConversion === 'contact'
                  ? 'bg-purple-500 text-white shadow-xs'
                  : (darkMode ? 'bg-white/5 hover:bg-purple-500/20 text-purple-300' : 'bg-purple-100 hover:bg-purple-200 text-purple-800')
              }`}
              title={`Số khách gửi tin nhắn liên hệ: ${stats.contactVisitors}`}
            >
              ✉️ {stats.contactVisitors}
            </button>
            {stats.credentialsCopiedVisitors > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedConversion(selectedConversion === 'copy' ? 'all' : 'copy');
                  const el = document.getElementById('visitor-logs-table');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  selectedConversion === 'copy'
                    ? 'bg-purple-500 text-white shadow-xs'
                    : (darkMode ? 'bg-white/5 hover:bg-purple-500/20 text-purple-300' : 'bg-purple-100 hover:bg-purple-200 text-purple-800')
                }`}
                title={`Số khách sao chép SĐT / Email: ${stats.credentialsCopiedVisitors}`}
              >
                📋 {stats.credentialsCopiedVisitors}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Intelligence Breakdowns 3-Column Section (Interactive Filters) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Column 1: Top Cities & ISPs */}
        <div className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-[#11131A] border-white/10' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center justify-between text-[#38BDF8]">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Địa Điểm & Nhà Mạng (ISP)
            </span>
            <span className="text-[10px] font-normal text-slate-400 lowercase">nhấn để lọc</span>
          </h3>

          <div className="space-y-3">
            <div>
              <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Thành phố hàng đầu:
              </div>
              <div className="space-y-1.5">
                {stats.topCities.length === 0 ? (
                  <p className="text-xs text-slate-500">Chưa có dữ liệu</p>
                ) : (
                  stats.topCities.map((city, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSearchQuery(city.name);
                        const el = document.getElementById('visitor-logs-table');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className={`w-full flex items-center justify-between text-xs p-1.5 rounded-lg transition-all text-left ${
                        searchQuery.toLowerCase() === city.name.toLowerCase()
                          ? (darkMode ? 'bg-blue-500/20 text-blue-300 font-bold' : 'bg-blue-100 text-blue-800 font-bold')
                          : (darkMode ? 'hover:bg-white/5 text-slate-200' : 'hover:bg-slate-100 text-slate-700')
                      }`}
                      title={`Nhấn để lọc khách tại ${city.name}`}
                    >
                      <span className="font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        {city.name}
                      </span>
                      <span className="font-mono font-bold text-blue-400">{city.count} lượt →</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {stats.topISPs.length > 0 && (
              <div className="pt-3 border-t border-white/10">
                <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Nhà mạng / Tổ chức (ISP):
                </div>
                <div className="space-y-1.5">
                  {stats.topISPs.map((isp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSearchQuery(isp.name);
                        const el = document.getElementById('visitor-logs-table');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className={`w-full flex items-center justify-between text-xs p-1.5 rounded-lg transition-all text-left ${
                        searchQuery.toLowerCase() === isp.name.toLowerCase()
                          ? (darkMode ? 'bg-indigo-500/20 text-indigo-300 font-bold' : 'bg-indigo-100 text-indigo-800 font-bold')
                          : (darkMode ? 'hover:bg-white/5 text-slate-300' : 'hover:bg-slate-100 text-slate-700')
                      }`}
                      title={`Nhấn để lọc khách dùng mạng ${isp.name}`}
                    >
                      <span className="truncate max-w-[180px] font-medium" title={isp.name}>
                        {isp.name}
                      </span>
                      <span className="font-mono text-xs text-indigo-400">{isp.count} →</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Web Apps Opened / Demo Interest (Interactive Filter) */}
        <div className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-[#11131A] border-white/10' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center justify-between text-purple-400">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Dự Án Web App Được Quan Tâm
            </span>
            <span className="text-[10px] font-normal text-slate-400 lowercase">nhấn để lọc</span>
          </h3>

          {stats.topProjects.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              Khách chưa bấm mở dự án cụ thể nào
            </div>
          ) : (
            <div className="space-y-2.5">
              {stats.topProjects.map((p, idx) => {
                const total = stats.demoClicks || 1;
                const pct = Math.min(100, Math.round((p.count / total) * 100));
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchQuery(p.title);
                      const el = document.getElementById('visitor-logs-table');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`w-full space-y-1 p-2 rounded-xl text-left transition-all ${
                      searchQuery.toLowerCase() === p.title.toLowerCase()
                        ? (darkMode ? 'bg-purple-500/20 border border-purple-500/40 text-purple-200' : 'bg-purple-50 border border-purple-300 text-purple-900')
                        : (darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50')
                    }`}
                    title={`Nhấn để lọc khách quan tâm đến ${p.title}`}
                  >
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="truncate max-w-[200px]" title={p.title}>{p.title}</span>
                      <span className="font-mono font-bold text-purple-400">{p.count} lượt →</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Column 3: Devices & Connection Tech (Interactive Filter) */}
        <div className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-[#11131A] border-white/10' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center justify-between text-emerald-400">
            <span className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Thiết Bị & Môi Trường Duyệt
            </span>
            <span className="text-[10px] font-normal text-slate-400 lowercase">nhấn để lọc</span>
          </h3>

          <div className="space-y-3">
            {/* Desktop */}
            <button
              type="button"
              onClick={() => {
                setSelectedDevice(selectedDevice === 'Desktop' ? 'all' : 'Desktop');
                const el = document.getElementById('visitor-logs-table');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`w-full space-y-1 p-2 rounded-xl text-left transition-all ${
                selectedDevice === 'Desktop'
                  ? (darkMode ? 'bg-blue-500/20 border border-blue-500/40 text-blue-200' : 'bg-blue-50 border border-blue-300 text-blue-900')
                  : (darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50')
              }`}
              title="Nhấn để lọc khách dùng Máy tính (Desktop)"
            >
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2">
                  <Monitor className="w-3.5 h-3.5 text-blue-400" />
                  <span>Máy tính (Desktop)</span>
                </span>
                <span className="font-mono font-bold text-blue-400">
                  {stats.devices.Desktop} ({stats.totalVisits > 0 ? Math.round((stats.devices.Desktop / stats.totalVisits) * 100) : 0}%) →
                </span>
              </div>
              <div className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${stats.totalVisits > 0 ? (stats.devices.Desktop / stats.totalVisits) * 100 : 0}%` }} />
              </div>
            </button>

            {/* Mobile */}
            <button
              type="button"
              onClick={() => {
                setSelectedDevice(selectedDevice === 'Mobile' ? 'all' : 'Mobile');
                const el = document.getElementById('visitor-logs-table');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`w-full space-y-1 p-2 rounded-xl text-left transition-all ${
                selectedDevice === 'Mobile'
                  ? (darkMode ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-200' : 'bg-emerald-50 border border-emerald-300 text-emerald-900')
                  : (darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50')
              }`}
              title="Nhấn để lọc khách dùng Điện thoại (Mobile)"
            >
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Điện thoại (Mobile)</span>
                </span>
                <span className="font-mono font-bold text-emerald-400">
                  {stats.devices.Mobile} ({stats.totalVisits > 0 ? Math.round((stats.devices.Mobile / stats.totalVisits) * 100) : 0}%) →
                </span>
              </div>
              <div className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats.totalVisits > 0 ? (stats.devices.Mobile / stats.totalVisits) * 100 : 0}%` }} />
              </div>
            </button>

            {/* Tablet */}
            <button
              type="button"
              onClick={() => {
                setSelectedDevice(selectedDevice === 'Tablet' ? 'all' : 'Tablet');
                const el = document.getElementById('visitor-logs-table');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`w-full space-y-1 p-2 rounded-xl text-left transition-all ${
                selectedDevice === 'Tablet'
                  ? (darkMode ? 'bg-purple-500/20 border border-purple-500/40 text-purple-200' : 'bg-purple-50 border border-purple-300 text-purple-900')
                  : (darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50')
              }`}
              title="Nhấn để lọc khách dùng Máy tính bảng (Tablet)"
            >
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2">
                  <Tablet className="w-3.5 h-3.5 text-purple-400" />
                  <span>Máy tính bảng (Tablet)</span>
                </span>
                <span className="font-mono font-bold text-purple-400">
                  {stats.devices.Tablet} ({stats.totalVisits > 0 ? Math.round((stats.devices.Tablet / stats.totalVisits) * 100) : 0}%) →
                </span>
              </div>
              <div className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${stats.totalVisits > 0 ? (stats.devices.Tablet / stats.totalVisits) * 100 : 0}%` }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <div className={`p-4 rounded-2xl border space-y-3 ${
        darkMode ? 'bg-[#11131A] border-white/10' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo IP, Nhà mạng ISP, Thành phố, Mã Ref, Tên dự án, Trình duyệt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs border transition-all ${
                darkMode
                  ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500'
              }`}
            />
          </div>

          {/* Quick Filter Selects */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Lead Score Select */}
            <select
              value={selectedLeadScore}
              onChange={(e) => setSelectedLeadScore(e.target.value)}
              className={`px-3 py-2 rounded-xl text-xs border font-bold ${
                darkMode 
                  ? 'bg-[#08090D] border-white/10 text-rose-400' 
                  : 'bg-slate-50 border-slate-200 text-rose-600'
              }`}
            >
              <option value="all">🔥 Tất cả mức tiềm năng</option>
              <option value="hot">🔥 Rất Tiềm Năng (Hot Lead)</option>
              <option value="warm">⚡ Khách Quan Tâm (Warm)</option>
              <option value="new">🌟 Khách Mới (New)</option>
              <option value="casual">👀 Lướt Nhanh (Casual)</option>
            </select>

            {/* Time range select */}
            <select
              value={selectedTimeRange}
              onChange={(e: any) => setSelectedTimeRange(e.target.value)}
              className={`px-3 py-2 rounded-xl text-xs border font-medium ${
                darkMode 
                  ? 'bg-[#08090D] border-white/10 text-white' 
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <option value="all">Tất cả thời gian</option>
              <option value="today">Hôm nay (24h)</option>
              <option value="7days">7 ngày qua</option>
              <option value="30days">30 ngày qua</option>
            </select>

            {/* Device select */}
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className={`px-3 py-2 rounded-xl text-xs border font-medium ${
                darkMode 
                  ? 'bg-[#08090D] border-white/10 text-white' 
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <option value="all">Mọi thiết bị</option>
              <option value="Desktop">Desktop</option>
              <option value="Mobile">Mobile</option>
              <option value="Tablet">Tablet</option>
            </select>

            {/* Conversion select */}
            <select
              value={selectedConversion}
              onChange={(e: any) => setSelectedConversion(e.target.value)}
              className={`px-3 py-2 rounded-xl text-xs border font-medium ${
                darkMode 
                  ? 'bg-[#08090D] border-white/10 text-purple-400' 
                  : 'bg-slate-50 border-slate-200 text-purple-700'
              }`}
            >
              <option value="all">⚡ Tất cả hành vi</option>
              <option value="any">🎯 Có chuyển đổi (bất kỳ)</option>
              <option value="demo">🚀 Xem Demo Web App</option>
              <option value="cv">📄 Tải / Mở CV</option>
              <option value="contact">✉️ Gửi liên hệ / tin nhắn</option>
              <option value="copy">📋 Copy SĐT / Email / Zalo</option>
            </select>

            {/* Source Type */}
            <select
              value={selectedSourceType}
              onChange={(e) => setSelectedSourceType(e.target.value)}
              className={`px-3 py-2 rounded-xl text-xs border font-medium ${
                darkMode 
                  ? 'bg-[#08090D] border-white/10 text-white' 
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <option value="all">Mọi nguồn dẫn</option>
              <option value="ref">Có gắn mã Ref/Tuyển dụng</option>
              <option value="linkedin">Từ LinkedIn</option>
              <option value="google">Từ Google</option>
              <option value="direct">Trực tiếp / QR</option>
            </select>
          </div>
        </div>

        {/* Active Filters Pill Bar */}
        {(selectedLeadScore !== 'all' || selectedDevice !== 'all' || selectedTimeRange !== 'all' || selectedSourceType !== 'all' || selectedConversion !== 'all' || searchQuery.trim() !== '') && (
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3 text-blue-400" />
              Đang lọc theo:
            </span>

            {searchQuery.trim() && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                darkMode ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' : 'bg-blue-100 text-blue-800 border-blue-300'
              }`}>
                <span>Tìm: "{searchQuery}"</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedConversion !== 'all' && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                darkMode ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-purple-100 text-purple-800 border-purple-300'
              }`}>
                <span>
                  Chuyển đổi: {
                    selectedConversion === 'any' ? 'Tất cả chuyển đổi' :
                    selectedConversion === 'demo' ? '🚀 Xem Demo Web App' :
                    selectedConversion === 'cv' ? '📄 Tải / Mở CV' :
                    selectedConversion === 'contact' ? '✉️ Gửi liên hệ' : '📋 Copy thông tin'
                  }
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedConversion('all')}
                  className="hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedLeadScore !== 'all' && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                darkMode ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-rose-100 text-rose-800 border-rose-300'
              }`}>
                <span>Tiềm năng: {selectedLeadScore.toUpperCase()}</span>
                <button
                  type="button"
                  onClick={() => setSelectedLeadScore('all')}
                  className="hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedDevice !== 'all' && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                darkMode ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                <span>Thiết bị: {selectedDevice}</span>
                <button
                  type="button"
                  onClick={() => setSelectedDevice('all')}
                  className="hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedTimeRange !== 'all' && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                darkMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-amber-100 text-amber-800 border-amber-300'
              }`}>
                <span>Thời gian: {selectedTimeRange === 'today' ? 'Hôm nay (24h)' : selectedTimeRange === '7days' ? '7 ngày qua' : '30 ngày qua'}</span>
                <button
                  type="button"
                  onClick={() => setSelectedTimeRange('all')}
                  className="hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedSourceType !== 'all' && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                darkMode ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' : 'bg-indigo-100 text-indigo-800 border-indigo-300'
              }`}>
                <span>Nguồn: {selectedSourceType}</span>
                <button
                  type="button"
                  onClick={() => setSelectedSourceType('all')}
                  className="hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={() => {
                setSelectedLeadScore('all');
                setSelectedDevice('all');
                setSelectedTimeRange('all');
                setSelectedSourceType('all');
                setSelectedConversion('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-rose-400 hover:text-rose-300 underline ml-2 transition-colors cursor-pointer"
            >
              Xóa tất cả bộ lọc
            </button>
          </div>
        )}
      </div>

      {/* Main Visitor Log Table */}
      <div id="visitor-logs-table" className={`rounded-2xl border overflow-hidden scroll-mt-6 ${
        darkMode ? 'bg-[#11131A] border-white/10' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-extrabold flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-400" />
            Nhật Ký Chi Tiết Từng Phiên Khách ({filteredLogs.length})
          </h3>
          <span className={`text-xs ${darkMode ? 'text-[#94A3B8]' : 'text-slate-500'}`}>
            Nhấp vào từng hàng để mở <strong>Bảng Soi Hồ Sơ Kỹ Thuật Chi Tiết</strong>
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <RefreshCw className="w-7 h-7 animate-spin mx-auto text-blue-500 mb-2" />
            <p className="text-xs text-slate-400">Đang đồng bộ dữ liệu trực tiếp từ Google Cloud Firestore...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center">
            <Activity className="w-8 h-8 mx-auto text-slate-500 mb-2 opacity-50" />
            <p className="text-sm font-medium">Chưa có bản ghi nào khớp với điều kiện tìm kiếm</p>
            <p className={`text-xs mt-1 ${darkMode ? 'text-[#64748B]' : 'text-slate-400'}`}>
              Hệ thống đang sẵn sàng ghi nhận khách truy cập mới theo thời gian thực.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className={`border-b ${darkMode ? 'bg-white/[0.02] border-white/10 text-[#94A3B8]' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                  <th className="py-3 px-3.5 font-bold">Thời Gian</th>
                  <th className="py-3 px-3 font-bold">Tiềm Năng</th>
                  <th className="py-3 px-3.5 font-bold">Vị Trí & Nhà Mạng (ISP)</th>
                  <th className="py-3 px-3 font-bold">Nguồn / Mã Ref</th>
                  <th className="py-3 px-3 font-bold">Thiết Bị & Màn Hình</th>
                  <th className="py-3 px-3 font-bold">Độ Cuộn</th>
                  <th className="py-3 px-3 font-bold">Thời Lượng</th>
                  <th className="py-3 px-3 font-bold text-center">Hành Vi</th>
                  <th className="py-3 px-3 font-bold text-right">Chi Tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLogs.map((log) => {
                  const isExpanded = expandedLogId === log.id;
                  return (
                    <React.Fragment key={log.id}>
                      <tr 
                        onClick={() => setSelectedLogForModal(log)}
                        className={`cursor-pointer transition-colors ${
                          darkMode 
                            ? 'hover:bg-white/[0.04]' 
                            : 'hover:bg-blue-50/50'
                        }`}
                      >
                        {/* Timestamp */}
                        <td className="py-3 px-3.5 font-mono text-[11px] whitespace-nowrap text-slate-300">
                          {formatDateTime(log.timestamp)}
                        </td>

                        {/* Lead Score */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          {renderLeadBadge(log.leadScore)}
                        </td>

                        {/* Location & ISP */}
                        <td className="py-3 px-3.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">{getCountryFlag(log.countryCode)}</span>
                            <div>
                              <div className="font-bold text-white/90">
                                {log.city && log.city !== 'Không xác định' ? `${log.city}, ` : ''}{log.country || 'Việt Nam'}
                              </div>
                              <div className="text-[10px] text-indigo-400 font-medium truncate max-w-[180px]" title={log.isp || log.org}>
                                {log.isp || log.org || `IP: ${log.ip || 'Ẩn danh'}`}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Referrer & Ref Tag */}
                        <td className="py-3 px-3">
                          {log.refTag ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              <Tag className="w-3 h-3" />
                              Ref: {log.refTag}
                            </span>
                          ) : (
                            <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium border truncate max-w-[140px] ${
                              log.referrer?.includes('LinkedIn')
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                : log.referrer?.includes('Google')
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : log.referrer?.includes('Direct')
                                ? 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                            }`} title={log.referrer}>
                              {log.referrer}
                            </span>
                          )}
                        </td>

                        {/* Device & Resolution */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            {log.device === 'Mobile' ? (
                              <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : log.device === 'Tablet' ? (
                              <Tablet className="w-4 h-4 text-purple-400 shrink-0" />
                            ) : (
                              <Monitor className="w-4 h-4 text-blue-400 shrink-0" />
                            )}
                            <div>
                              <div className="font-medium text-white/90 truncate max-w-[130px]" title={`${log.os} • ${log.browser}`}>
                                {log.os || 'HĐH'} • {log.browser || 'Browser'}
                              </div>
                              <div className="text-[10px] font-mono text-[#64748B]">
                                {log.screenResolution}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Scroll Depth */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1.5 rounded-full bg-white/10 overflow-hidden shrink-0">
                              <div 
                                className={`h-full rounded-full transition-all ${
                                  (log.scrollDepth || 0) >= 75 ? 'bg-emerald-400' :
                                  (log.scrollDepth || 0) >= 50 ? 'bg-sky-400' :
                                  (log.scrollDepth || 0) >= 25 ? 'bg-amber-400' : 'bg-slate-400'
                                }`}
                                style={{ width: `${Math.min(100, Math.max(8, log.scrollDepth || 0))}%` }}
                              />
                            </div>
                            <span className={`font-mono font-bold text-xs ${
                              (log.scrollDepth || 0) >= 75 ? 'text-emerald-400' :
                              (log.scrollDepth || 0) >= 50 ? 'text-sky-400' :
                              (log.scrollDepth || 0) >= 25 ? 'text-amber-400' : 'text-slate-400'
                            }`}>
                              {log.scrollDepth ? `${log.scrollDepth}%` : '0%'}
                            </span>
                          </div>
                        </td>

                        {/* Duration */}
                        <td className="py-3 px-3 font-mono text-[11px] text-amber-400 font-bold whitespace-nowrap">
                          {formatDuration(log.durationSeconds)}
                        </td>

                        {/* Events Triggered Count */}
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedLogId(isExpanded ? null : log.id);
                            }}
                            className={`px-2 py-1 rounded-lg text-[11px] font-semibold border flex items-center gap-1 mx-auto transition-all ${
                              isExpanded
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                : 'bg-white/5 hover:bg-white/10 text-[#94A3B8] border-white/10'
                            }`}
                          >
                            <span>{log.events?.length || 1} SK</span>
                            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                          </button>
                        </td>

                        {/* Open Modal Inspect Button */}
                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedLogForModal(log);
                              }}
                              className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-500/10 border border-blue-500/20 transition-all"
                              title="Soi toàn bộ hồ sơ kỹ thuật"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleDelete(log.id, e)}
                              disabled={deletingId === log.id}
                              title="Xóa bản ghi này"
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Inline Expanded Timeline */}
                      {isExpanded && log.events && (
                        <tr>
                          <td colSpan={9} className={`p-4 ${darkMode ? 'bg-black/40' : 'bg-slate-50'}`}>
                            <div className="pl-6 border-l-2 border-blue-500/40 space-y-2">
                              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-2">
                                Dòng Sự Kiện Khách Đã Tương Tác:
                              </div>
                              {log.events.map((ev, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-xs">
                                  <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                                  <span className="font-mono text-[10px] text-slate-400">
                                    {new Date(ev.timestamp).toLocaleTimeString('vi-VN')}
                                  </span>
                                  <span className="font-semibold text-white/90">
                                    {ev.details || ev.type}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Deep Inspection Modal / Profile Drawer */}
      {selectedLogForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${
            darkMode ? 'bg-[#0E1017] border-white/15 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            {/* Modal Header */}
            <div className={`sticky top-0 z-10 p-5 border-b flex items-center justify-between backdrop-blur-md ${
              darkMode ? 'bg-[#0E1017]/90 border-white/10' : 'bg-white/90 border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold flex items-center gap-2">
                    Hồ Sơ Kỹ Thuật Khách Truy Cập
                    {renderLeadBadge(selectedLogForModal.leadScore)}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Phiên: {selectedLogForModal.sessionId}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedLogForModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Section 1: Geo & Network */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                  <Globe2 className="w-4 h-4" />
                  Địa Lý & Nhà Mạng Viễn Thông
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Quốc gia:</span>
                    <span className="font-semibold flex items-center gap-1.5 mt-0.5">
                      {getCountryFlag(selectedLogForModal.countryCode)}
                      {selectedLogForModal.country || 'Việt Nam'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Thành phố:</span>
                    <span className="font-semibold mt-0.5 block">{selectedLogForModal.city || 'Không xác định'}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Địa chỉ IP:</span>
                    <span className="font-mono font-bold text-sky-400 mt-0.5 block">{selectedLogForModal.ip || 'Ẩn danh'}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Nhà mạng (ISP):</span>
                    <span className="font-semibold text-purple-400 mt-0.5 block">{selectedLogForModal.isp || 'Chưa xác định'}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Tọa độ GPS (Ước tính):</span>
                    <span className="font-mono text-emerald-400 mt-0.5 block">
                      {selectedLogForModal.latitude ? `${selectedLogForModal.latitude.toFixed(3)}, ${selectedLogForModal.longitude?.toFixed(3)}` : 'Chưa định vị'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Múi giờ:</span>
                    <span className="font-mono text-amber-400 mt-0.5 block">{selectedLogForModal.timezone || 'Asia/Ho_Chi_Minh'}</span>
                  </div>
                </div>
              </div>

              {/* Section 2: Attribution & Campaign */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Nguồn Gốc & Nhận Diện Nhà Tuyển Dụng
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Nguồn chuyển hướng (Referrer):</span>
                    <span className="font-semibold mt-0.5 block">{selectedLogForModal.referrer}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Mã Ref / Nhà Tuyển Dụng:</span>
                    <span className="font-bold text-purple-400 mt-0.5 block">
                      {selectedLogForModal.refTag || 'Truy cập thông thường'}
                    </span>
                  </div>

                  {selectedLogForModal.utmSource && (
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">UTM Source / Campaign:</span>
                      <span className="font-mono text-indigo-300 mt-0.5 block">
                        {selectedLogForModal.utmSource} {selectedLogForModal.utmCampaign ? `(${selectedLogForModal.utmCampaign})` : ''}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Thời điểm vào xem:</span>
                    <span className="font-mono mt-0.5 block">{formatDateTime(selectedLogForModal.timestamp)}</span>
                  </div>
                </div>
              </div>

              {/* Section 3: Hardware & Environment */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Laptop className="w-4 h-4" />
                  Phần Cứng & Môi Trường Duyệt
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Loại thiết bị:</span>
                    <span className="font-bold text-white mt-0.5 block">{selectedLogForModal.device}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Hệ điều hành:</span>
                    <span className="font-semibold mt-0.5 block">{selectedLogForModal.os}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Trình duyệt:</span>
                    <span className="font-semibold mt-0.5 block">{selectedLogForModal.browser} {selectedLogForModal.browserVersion}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Độ phân giải màn hình:</span>
                    <span className="font-mono text-sky-400 mt-0.5 block">{selectedLogForModal.screenResolution}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Kích thước cửa sổ:</span>
                    <span className="font-mono mt-0.5 block">{selectedLogForModal.windowSize || 'Tự động'}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Chế độ giao diện:</span>
                    <span className="font-semibold mt-0.5 flex items-center gap-1">
                      {selectedLogForModal.colorScheme === 'light' ? (
                        <>
                          <Sun className="w-3.5 h-3.5 text-amber-400" /> Sáng (Light)
                        </>
                      ) : (
                        <>
                          <Moon className="w-3.5 h-3.5 text-purple-400" /> Tối (Dark)
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 4: Engagement & Event Journey */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <MousePointerClick className="w-4 h-4" />
                    Hành Vi & Tương Tác Trong Phiên
                  </h4>
                  <span className="font-mono text-xs font-bold text-amber-400">
                    Tổng thời lượng: {formatDuration(selectedLogForModal.durationSeconds)} (Cuộn: {selectedLogForModal.scrollDepth || 0}%)
                  </span>
                </div>

                {selectedLogForModal.events && selectedLogForModal.events.length > 0 ? (
                  <div className="pl-4 border-l-2 border-amber-500/40 space-y-2 mt-3">
                    {selectedLogForModal.events.map((ev, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs">
                        <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <div>
                          <span className="font-mono text-[10px] text-slate-400 mr-2">
                            {new Date(ev.timestamp).toLocaleTimeString('vi-VN')}
                          </span>
                          <span className="font-semibold text-white/90">
                            {ev.details || ev.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Chưa ghi nhận sự kiện tương tác nâng cao</p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`p-4 border-t flex items-center justify-between ${
              darkMode ? 'bg-black/30 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <button
                onClick={() => handleDelete(selectedLogForModal.id)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Xóa bản ghi này
              </button>

              <button
                onClick={() => setSelectedLogForModal(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
