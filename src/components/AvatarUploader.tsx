import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Trash2, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  Camera
} from 'lucide-react';
import { compressAndResizeImage } from '../utils/imageUtils';

interface AvatarUploaderProps {
  currentAvatarUrl: string;
  onAvatarChange: (newUrl: string) => void;
  darkMode?: boolean;
  label?: string;
  defaultAvatarUrl?: string;
}

const PRESET_AVATARS = [
  {
    name: 'Kỹ sư Xây dựng Chuyên nghiệp',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Chuyên gia Công nghệ / AI',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Quản lý Dự án & Chi phí',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Kiến trúc Sư / Tech Lead',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
  }
];

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  currentAvatarUrl,
  onAvatarChange,
  darkMode = true,
  label = 'Ảnh Đại Diện (Avatar)',
  defaultAvatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'url' | 'presets'>('upload');
  const [urlInput, setUrlInput] = useState(currentAvatarUrl);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = async (file: File) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsProcessing(true);

    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('Vui lòng tải lên định dạng hình ảnh hợp lệ (PNG, JPG, WEBP, GIF, SVG).');
      }

      // Automatically resize & compress to lightweight WebP/JPEG under ~80KB
      const optimizedBase64 = await compressAndResizeImage(file, 480, 480, 0.88);
      onAvatarChange(optimizedBase64);
      setUrlInput(optimizedBase64);
      setSuccessMsg('Đã import và tối ưu ảnh đại diện thành công!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi xử lý hình ảnh.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) {
      setErrorMsg('Vui lòng nhập đường dẫn hình ảnh hợp lệ.');
      return;
    }
    setErrorMsg(null);
    onAvatarChange(urlInput.trim());
    setSuccessMsg('Đã cập nhật liên kết ảnh đại diện!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleSelectPreset = (presetUrl: string) => {
    onAvatarChange(presetUrl);
    setUrlInput(presetUrl);
    setSuccessMsg('Đã áp dụng ảnh đại diện mẫu!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleResetDefault = () => {
    onAvatarChange(defaultAvatarUrl);
    setUrlInput(defaultAvatarUrl);
    setSuccessMsg('Đã khôi phục ảnh đại diện mặc định.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div 
      id="avatar-uploader-container"
      className={`p-5 sm:p-6 rounded-3xl border transition-all ${
        darkMode ? 'bg-[#0E1017] border-white/10 text-white' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <label className="text-xs uppercase font-mono font-bold tracking-wider text-[#A78BFA] flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#7C3AED]" />
            <span>{label}</span>
          </label>
          <p className={`text-xs mt-0.5 ${darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            Tải ảnh từ máy tính, kéo thả hoặc dán liên kết URL ảnh cá nhân.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/30 border border-white/10 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'upload'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Tải Ảnh Lên</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('url')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'url'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Link URL</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('presets')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'presets'
                ? 'bg-[#6366F1] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ảnh Mẫu</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Live Preview & Reset (4 cols) */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-black/20 border border-white/10 text-center">
          <div className="relative group mb-3">
            <img 
              src={currentAvatarUrl || defaultAvatarUrl} 
              alt="Avatar Preview" 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#7C3AED] shadow-xl transition-transform group-hover:scale-105"
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-white">
                <Loader2 className="w-6 h-6 animate-spin text-[#A78BFA] mb-1" />
                <span className="text-[10px] font-mono">Đang tối ưu...</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 p-2 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-white shadow-lg hover:scale-110 transition-transform"
              title="Chọn tệp ảnh mới từ máy tính"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs font-bold text-white mb-0.5">Xem trước hiển thị</p>
          <span className="text-[10px] font-mono text-[#94A3B8]">
            {currentAvatarUrl?.startsWith('data:') ? 'Ảnh nén Base64 (Đã tối ưu)' : 'Liên kết Web URL'}
          </span>

          <button
            type="button"
            onClick={handleResetDefault}
            className="mt-3 text-[11px] font-semibold text-[#94A3B8] hover:text-amber-400 flex items-center gap-1 transition-colors"
            title="Khôi phục ảnh avatar mặc định"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Đặt lại ảnh mặc định</span>
          </button>
        </div>

        {/* Right Column: Interaction Modes (8 cols) */}
        <div className="md:col-span-8">
          
          {/* Mode 1: File Upload & Drag-and-Drop */}
          {activeMode === 'upload' && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-[#7C3AED] bg-[#7C3AED]/10 scale-[1.01]' 
                  : darkMode 
                    ? 'border-white/15 bg-white/5 hover:bg-white/10 hover:border-[#7C3AED]/60' 
                    : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-[#7C3AED]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml"
                onChange={handleFileChange}
                className="hidden"
                id="avatar-file-input"
              />

              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#2563EB]/20 text-[#A78BFA] flex items-center justify-center mb-3">
                <Upload className="w-6 h-6" />
              </div>

              <h4 className="text-sm font-bold text-white mb-1">
                Kéo & thả ảnh vào đây, hoặc <span className="text-[#A78BFA] underline">Duyệt tệp máy tính</span>
              </h4>
              <p className={`text-xs ${darkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                Hỗ trợ PNG, JPG, JPEG, WEBP. Ảnh tự động cắt & nén tối ưu (480x480) để load siêu nhanh.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-md">
                <ImageIcon className="w-4 h-4" />
                <span>Chọn File Ảnh Từ Máy</span>
              </div>
            </div>
          )}

          {/* Mode 2: Direct URL Input */}
          {activeMode === 'url' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase font-mono font-semibold text-[#94A3B8] mb-1.5">
                  Nhập đường dẫn URL ảnh (Google Drive, Imgur, Cloudinary, Unsplash...)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-[#08090D] border border-white/10 text-white focus:outline-none focus:border-[#2563EB]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-2.5 rounded-xl text-xs uppercase font-semibold tracking-wider bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center gap-1.5 shrink-0"
                  >
                    <Check className="w-4 h-4" />
                    <span>Áp Dụng</span>
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-[#94A3B8]">
                💡 Mẹo: Bạn có thể sao chép liên kết ảnh trực tiếp từ trang cá nhân Facebook, LinkedIn hoặc dịch vụ lưu trữ ảnh.
              </p>
            </div>
          )}

          {/* Mode 3: Presets */}
          {activeMode === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-[#94A3B8]">
                Chọn một trong các ảnh đại diện chất lượng cao phong cách chuyên gia bên dưới:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PRESET_AVATARS.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectPreset(preset.url)}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#7C3AED] cursor-pointer transition-all text-center group"
                  >
                    <img 
                      src={preset.url} 
                      alt={preset.name}
                      className="w-14 h-14 mx-auto rounded-xl object-cover mb-1.5 border border-white/10 group-hover:border-[#7C3AED]"
                    />
                    <p className="text-[10px] text-white font-medium truncate">{preset.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notification Alerts */}
          {errorMsg && (
            <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
