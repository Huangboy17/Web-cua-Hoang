import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  Building,
  Briefcase,
  Loader2,
  Check
} from 'lucide-react';
import { UserProfile } from '../types';
import { submitContactMessage } from '../firebase';

interface ContactSectionProps {
  profile: UserProfile;
  darkMode: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, darkMode }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    recruiterName: '',
    company: '',
    email: '',
    roleTitle: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savedToCloud, setSavedToCloud] = useState(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Submit message directly to Google Cloud Firestore
      await submitContactMessage({
        name: formData.recruiterName,
        email: formData.email,
        company: formData.company,
        roleTitle: formData.roleTitle,
        message: formData.message,
      });
      setSavedToCloud(true);
    } catch (err) {
      console.warn('Firestore contact message submission note:', err);
    }

    // 2. Open mail client as backup
    const subject = encodeURIComponent(`[Liên Hệ] Trao đổi công việc ${formData.roleTitle ? `- Vị trí/Dự án: ${formData.roleTitle}` : ''} từ ${formData.company || 'Đối tác'}`);
    const body = encodeURIComponent(
      `Chào ${profile.fullName},\n\nTôi là ${formData.recruiterName} đại diện từ ${formData.company}.\n` +
      `Email liên hệ: ${formData.email}\n` +
      `Chủ đề / Vị trí trao đổi: ${formData.roleTitle}\n\n` +
      `Nội dung tin nhắn:\n${formData.message}\n\n` +
      `Rất mong sớm nhận được phản hồi từ bạn.`
    );
    
    // Slight timeout so UI feedback is instant
    setTimeout(() => {
      window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, '_blank');
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <section 
      id="contact" 
      className={`py-20 md:py-28 relative border-t transition-colors ${
        darkMode ? 'bg-[#08090D] border-white/10 text-[#F8FAFC]' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border mb-4 shadow-sm ${
            darkMode 
              ? 'bg-[#7C3AED]/15 text-[#A78BFA] border-[#7C3AED]/40' 
              : 'bg-purple-50 text-[#7C3AED] border-purple-200'
          }`}>
            <Send className="w-4 h-4 text-[#A78BFA]" />
            <span className="uppercase tracking-[0.2em]">Liên Hệ Trực Tiếp</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Liên Hệ & <span className="text-gradient-tech">Hợp Tác</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed font-normal ${darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            Tôi luôn sẵn sàng trao đổi về các cơ hội hợp tác, dự án Quản lý Chi phí - Hợp đồng hoặc phát triển ứng dụng Tự động hóa & AI. Bạn có thể liên hệ nhanh qua các kênh dưới đây!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className={`p-6 rounded-3xl border transition-all ${
              darkMode ? 'bg-[#11131A] border-white/10 shadow-lg' : 'bg-white border-[#E2E8F0] shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#7C3AED]/15 text-[#A78BFA] border border-[#7C3AED]/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#A78BFA]">Email chính thức</p>
                    <p className={`font-mono text-base font-semibold break-all ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>{profile.email}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                <a
                  href={`mailto:${profile.email}?subject=[Liên Hệ] Trao đổi công việc & hợp tác`}
                  className="flex-1 text-center py-2 px-4 rounded-full text-xs uppercase tracking-wider font-semibold bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] text-white transition-all shadow-md shadow-purple-500/20"
                >
                  Gửi Email Ngay
                </a>
                <button
                  onClick={() => handleCopy(profile.email, 'email')}
                  className={`p-2 px-3.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    darkMode ? 'bg-[#08090D] hover:bg-white/5 text-[#F8FAFC] border-white/10' : 'bg-slate-100 hover:bg-slate-200 text-[#0F172A] border-[#E2E8F0]'
                  }`}
                  title="Sao chép email"
                >
                  {copiedField === 'email' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#7C3AED]" />
                  )}
                  <span>{copiedField === 'email' ? 'Đã chép' : 'Sao chép'}</span>
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className={`p-6 rounded-3xl border transition-all ${
              darkMode ? 'bg-[#11131A] border-white/10 shadow-lg' : 'bg-white border-[#E2E8F0] shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-[#2563EB]">Điện thoại / Zalo</p>
                    <p className={`font-mono text-base font-semibold ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>{profile.phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                  className="flex-1 text-center py-2 px-4 rounded-full text-xs uppercase tracking-wider font-semibold bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white transition-all shadow-md shadow-blue-500/20"
                >
                  Gọi Trực Tiếp
                </a>
                <button
                  onClick={() => handleCopy(profile.phone, 'phone')}
                  className={`p-2 px-3.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    darkMode ? 'bg-[#08090D] hover:bg-white/5 text-[#F8FAFC] border-white/10' : 'bg-slate-100 hover:bg-slate-200 text-[#0F172A] border-[#E2E8F0]'
                  }`}
                  title="Sao chép số điện thoại"
                >
                  {copiedField === 'phone' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#2563EB]" />
                  )}
                  <span>{copiedField === 'phone' ? 'Đã chép' : 'Sao chép'}</span>
                </button>
              </div>
            </div>

            {/* Location & Work Availability */}
            <div className={`p-5 rounded-3xl border text-xs space-y-2.5 ${
              darkMode ? 'bg-[#11131A] border-white/10 text-[#94A3B8]' : 'bg-white border-[#E2E8F0] text-[#64748B]'
            }`}>
              <div className="flex items-center gap-2 font-mono">
                <MapPin className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Sparkles className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span>Khu vực làm việc: <strong className={darkMode ? 'text-white' : 'text-[#0F172A]'}>Hà Nội / Toàn quốc (Hybrid & Remote)</strong></span>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
              darkMode ? 'bg-[#11131A] border-white/10' : 'bg-white border-[#E2E8F0]'
            }`}>
              <h3 className={`text-xl font-bold mb-2 flex items-center gap-2 ${darkMode ? 'text-[#F8FAFC]' : 'text-[#0F172A]'}`}>
                <MessageSquare className="w-5 h-5 text-[#A78BFA]" />
                <span>Gửi Lời Nhắn Trực Tiếp</span>
              </h3>
              <p className={`text-xs sm:text-sm mb-6 ${darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                Lời nhắn của bạn sẽ được lưu trực tiếp vào hộp thư Google Cloud và gửi email thông báo tới Bùi Việt Hoàng.
              </p>

              {submitted && (
                <div className="p-4 mb-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-emerald-400">Đã gửi tin nhắn thành công!</p>
                    <p className="text-xs opacity-90 mt-0.5">
                      Cảm ơn bạn đã để lại thông tin liên hệ. Tôi sẽ phản hồi lại bạn trong thời gian sớm nhất.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs uppercase tracking-wider font-mono font-semibold mb-1.5 ${
                      darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
                    }`}>
                      Họ và Tên / Người liên hệ *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.recruiterName}
                      onChange={(e) => setFormData({ ...formData, recruiterName: e.target.value })}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className={`w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm border focus:outline-none transition-all ${
                        darkMode ? 'bg-[#08090D] border-white/10 text-white placeholder-[#94A3B8]/50 focus:border-[#7C3AED]' : 'bg-white border-[#E2E8F0] text-[#0F172A] focus:border-[#2563EB]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs uppercase tracking-wider font-mono font-semibold mb-1.5 ${
                      darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
                    }`}>
                      Công Ty / Đơn Vị Công Tác
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Ví dụ: Tên công ty / Tổ chức / Cá nhân"
                      className={`w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm border focus:outline-none transition-all ${
                        darkMode ? 'bg-[#08090D] border-white/10 text-white placeholder-[#94A3B8]/50 focus:border-[#7C3AED]' : 'bg-white border-[#E2E8F0] text-[#0F172A] focus:border-[#2563EB]'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs uppercase tracking-wider font-mono font-semibold mb-1.5 ${
                      darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
                    }`}>
                      Email Của Bạn *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className={`w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm border focus:outline-none transition-all ${
                        darkMode ? 'bg-[#08090D] border-white/10 text-white placeholder-[#94A3B8]/50 focus:border-[#7C3AED]' : 'bg-white border-[#E2E8F0] text-[#0F172A] focus:border-[#2563EB]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs uppercase tracking-wider font-mono font-semibold mb-1.5 ${
                      darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
                    }`}>
                      Chủ Đề / Vị Trí Trao Đổi
                    </label>
                    <input
                      type="text"
                      value={formData.roleTitle}
                      onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                      placeholder="Ví dụ: Hợp tác dự án / Trao đổi công việc..."
                      className={`w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm border focus:outline-none transition-all ${
                        darkMode ? 'bg-[#08090D] border-white/10 text-white placeholder-[#94A3B8]/50 focus:border-[#7C3AED]' : 'bg-white border-[#E2E8F0] text-[#0F172A] focus:border-[#2563EB]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs uppercase tracking-wider font-mono font-semibold mb-1.5 ${
                    darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
                  }`}>
                    Nội dung trao đổi / Lời nhắn *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Nhập nội dung bạn muốn trao đổi hoặc hợp tác..."
                    className={`w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm border focus:outline-none transition-all ${
                      darkMode ? 'bg-[#08090D] border-white/10 text-white placeholder-[#94A3B8]/50 focus:border-[#7C3AED]' : 'bg-white border-[#E2E8F0] text-[#0F172A] focus:border-[#2563EB]'
                    }`}
                  />
                </div>

                <button
                  id="btn-submit-contact"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang Gửi Lời Nhắn...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Gửi Lời Nhắn Đến {profile.fullName}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
