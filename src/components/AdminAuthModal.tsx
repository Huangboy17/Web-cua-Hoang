import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  LogOut, 
  LogIn, 
  Loader2, 
  Edit3, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { User } from 'firebase/auth';
import { signInAdminWithGoogle, logoutAdmin, ADMIN_EMAILS } from '../firebase';

interface AdminAuthModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User | null;
  isAdmin: boolean;
  onOpenCMS?: () => void;
  onOpenEditor?: () => void;
  darkMode: boolean;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen = true,
  onClose,
  currentUser,
  isAdmin,
  onOpenCMS,
  onOpenEditor,
  darkMode,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (isOpen === false) return null;

  const handleOpenAdminPanel = () => {
    onClose();
    if (onOpenCMS) {
      onOpenCMS();
    } else if (onOpenEditor) {
      onOpenEditor();
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { user, isAdmin: isUserAdmin } = await signInAdminWithGoogle();
      if (isUserAdmin) {
        // Automatically open the Admin CMS upon successful login
        handleOpenAdminPanel();
      } else {
        setErrorMsg(`Tài khoản ${user.email || 'này'} không có quyền quản trị. Chỉ có ${ADMIN_EMAILS[0]} mới được phép chỉnh sửa dữ liệu.`);
      }
    } catch (err: any) {
      console.error(err);
      if (err?.code !== 'auth/popup-closed-by-user') {
        setErrorMsg(err?.message || 'Đăng nhập Google không thành công. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await logoutAdmin();
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 sm:p-8 relative transition-all ${
          darkMode ? 'bg-[#0F1117] border-white/10 text-white' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
            darkMode ? 'hover:bg-white/10 text-[#94A3B8]' : 'hover:bg-slate-100 text-[#64748B]'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center shadow-lg shadow-purple-500/25">
            {isAdmin ? (
              <ShieldCheck className="w-6 h-6 text-white" />
            ) : (
              <Lock className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <span>Xác Thực Quản Trị</span>
              {isAdmin && (
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Admin Active
                </span>
              )}
            </h3>
            <p className={`text-xs font-mono ${darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              {ADMIN_EMAILS[0]}
            </p>
          </div>
        </div>

        {/* Status Content */}
        {isAdmin ? (
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Đã Đăng Nhập Quản Trị Viên</p>
                  <p className="text-xs mt-1 font-mono break-all text-emerald-400">
                    {currentUser?.email}
                  </p>
                  <p className={`text-[11px] mt-1.5 ${darkMode ? 'text-[#94A3B8]' : 'text-slate-600'}`}>
                    Bạn có toàn quyền thêm, sửa, xóa sản phẩm Web App, kinh nghiệm và lưu trữ trực tiếp lên Google Cloud Firestore.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleOpenAdminPanel}
                className="w-full py-3 px-5 rounded-2xl font-semibold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <Edit3 className="w-4 h-4" />
                <span>Mở Bảng Quản Trị Admin CMS</span>
              </button>

              <button
                onClick={handleLogout}
                disabled={loading}
                className={`w-full py-2.5 px-4 rounded-2xl text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
                  darkMode ? 'bg-white/5 hover:bg-white/10 text-[#94A3B8] border-white/10 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-[#475569] border-[#E2E8F0]'
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng Xuất Quyền Quản Trị</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                Trang web đã được kích hoạt chế độ bảo vệ quyền riêng tư. Chỉ tài khoản Gmail chính chủ <strong className="text-[#A78BFA] font-mono">{ADMIN_EMAILS[0]}</strong> mới có quyền chỉnh sửa cấu hình hệ thống.
              </p>
              <p className={`text-[11px] mt-2 leading-relaxed ${darkMode ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                Mọi người dùng khác khi truy cập liên kết này sẽ xem đầy đủ thông tin, demo dự án và có thể gửi biểu mẫu liên hệ trực tiếp.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {currentUser && !isAdmin && (
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Tài khoản chưa được phân quyền:</p>
                  <p className="font-mono text-[11px] mt-0.5">{currentUser.email}</p>
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 px-5 rounded-2xl font-semibold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {/* Google Icon SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.54 0 2.92.54 4.01 1.43l3.01-3.01C17.2 1.7 14.77 1 12 1 7.42 1 3.53 3.61 1.63 7.37l3.66 2.84C6.18 7.33 8.84 5 12 5z"/>
                  <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.66 2.84c2.14-1.98 3.76-4.9 3.76-8.66z"/>
                  <path fill="#FBBC05" d="M5.29 14.79C5.03 13.99 4.89 13.14 4.89 12.25s.14-1.74.4-2.54L1.63 6.87C.59 8.94 0 11.03 0 12.25s.59 3.31 1.63 5.38l3.66-2.84z"/>
                  <path fill="#34A853" d="M12 23.5c3.24 0 5.95-1.08 7.93-2.91l-3.66-2.84c-1.07.72-2.45 1.16-4.27 1.16-3.16 0-5.82-2.33-6.71-5.21L1.63 16.54C3.53 20.39 7.42 23.5 12 23.5z"/>
                </svg>
                <span>{loading ? 'Đang xác thực...' : 'Đăng Nhập Với Google (Admin)'}</span>
              </button>

              {currentUser && !isAdmin && (
                <button
                  onClick={handleLogout}
                  className={`w-full py-2.5 px-4 rounded-2xl text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
                    darkMode ? 'bg-white/5 hover:bg-white/10 text-[#94A3B8] border-white/10' : 'bg-slate-100 hover:bg-slate-200 text-[#475569] border-[#E2E8F0]'
                  }`}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng xuất tài khoản hiện tại</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
