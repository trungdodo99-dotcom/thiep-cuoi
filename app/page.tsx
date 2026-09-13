`git add . ; git commit -m "Fix Turbopack build error by removing escape characters in template literals" ; git push`

Lỗi bạn gặp phải trên Vercel (Turbopack) xảy ra do các dấu gạch chéo ngược (`\`) bị thừa bên trong Template Literal của biến `pStyle` (chỗ `\$\` và `\``), khiến trình biên dịch không thể hiểu cú pháp. Tôi đã xóa bỏ toàn bộ các dấu escape thừa đó để đưa về đúng chuẩn JS/TS (ví dụ: `${p.tx}px`).

Dưới đây là toàn bộ code đã được fix hoàn chỉnh, bạn chỉ việc Ctrl + A -> Delete -> Paste nhé:

```tsx
"use client";

import React, { useState, useEffect, useRef } from "react";

// ==========================================
// 1. DỮ LIỆU TĨNH, CSS & COMPONENT TRANG TRÍ
// ==========================================
const customCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');
  .force-serif { font-family: 'Cormorant Garamond', serif !important; }
  .font-serif { font-family: 'Cormorant Garamond', serif; }
  .font-sans { font-family: 'Montserrat', sans-serif; }
  .font-script { font-family: 'Great Vibes', cursive; }
  @keyframes float-up-down { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
  @keyframes music-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes music-pulse { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.15); opacity: 1; box-shadow: 0 0 15px rgba(140, 122, 107, 0.6); } }
  .animate-music-on { animation: music-rotate 4s linear infinite, music-pulse 2s ease-in-out infinite; }
  @keyframes slide-in-right { 0% { transform: translateX(120%); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
  @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
  .animate-marquee { animation: marquee 6s linear infinite; }
  @keyframes float-note { 0% { transform: translate(0, 0) scale(0.6) rotate(0deg); opacity: 0; } 30% { opacity: 0.9; } 100% { transform: translate(20px, -90px) scale(1.2) rotate(30deg); opacity: 0; } }
  .animate-float-note { animation: float-note 3s ease-out infinite; }
  @keyframes split-up { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-120%); opacity: 0; } }
  @keyframes split-down { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(120%); opacity: 0; } }
  .animate-split-up { animation: split-up 1.2s cubic-bezier(0.5, 0, 0.1, 1) forwards; }
  .animate-split-down { animation: split-down 1.2s cubic-bezier(0.5, 0, 0.1, 1) forwards; }
  .custom-scrollbar::-webkit-scrollbar { width: 0px; background: transparent; }
  .art-paper-bg { background-color: #F8F4ED; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E"); }
`;

const PARTICLES = [
  { id: 1, left: "12%", delay: "0s", duration: "18s", size: "12px", content: "❤" },
  { id: 2, left: "20%", delay: "4s", duration: "22s", size: "10px", content: "✿" },
  { id: 3, left: "5%", delay: "8s", duration: "16s", size: "14px", content: "❤" },
  { id: 4, left: "80%", delay: "2s", duration: "25s", size: "12px", content: "✿" },
  { id: 5, left: "88%", delay: "1s", duration: "20s", size: "15px", content: "❤" },
  { id: 6, left: "75%", delay: "6s", duration: "18s", size: "10px", content: "✿" },
  { id: 7, left: "95%", delay: "3s", duration: "24s", size: "16px", content: "❤" },
  { id: 8, left: "15%", delay: "5s", duration: "21s", size: "11px", content: "✿" },
];

const GENTLE_CONFETTI = Array.from({ length: 60 }).map((_, i) => {
  const shapes = ['heart', 'heart', 'heart', 'bubble', 'bubble']; 
  const colors = ['#FFC0CB', '#FF99C2', '#FFD1DC', '#FFE4E1', '#8C7A6B', '#FFFFFF'];
  const angle = Math.random() * Math.PI * 2;
  const distance = 50 + Math.random() * 100; 
  return {
    id: i,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    tx: Math.cos(angle) * distance, 
    ty: Math.sin(angle) * distance, 
    scale: 0.4 + Math.random() * 1.2,
    delay: Math.random() * 0.1 
  };
});

const ALBUM_IMAGES = [
  "/Ab1.jpg", 
  "/Ab2.jpg", 
  "/Ab3.jpg", 
  "/Ab4.jpg", 
  "/Ab5.jpg"
];

const GoldenVintageOrnaments = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none z-[15] flex justify-center items-end overflow-hidden ${className}`}>
    <svg viewBox="0 0 600 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[90%] md:w-[80%] h-auto opacity-95 drop-shadow-md">
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C89D3C" />
            <stop offset="25%" stopColor="#F9E08E" />
            <stop offset="50%" stopColor="#C89D3C" />
            <stop offset="75%" stopColor="#F9E08E" />
            <stop offset="100%" stopColor="#A67B27" />
        </linearGradient>
      </defs>
      <path d="M300,10 C350,10 380,60 450,60 C520,60 550,20 600,20 L600,150 L0,150 L0,20 C50,20 80,60 150,60 C220,60 250,10 300,10 Z" fill="url(#gold)" opacity="0.15"/>
      <path d="M300,10 C350,10 380,60 450,60 C520,60 550,20 600,20" stroke="url(#gold)" strokeWidth="2.5" fill="none"/>
      <path d="M300,10 C250,10 220,60 150,60 C80,60 50,20 0,20" stroke="url(#gold)" strokeWidth="2.5" fill="none"/>
      <circle cx="300" cy="10" r="8" fill="url(#gold)"/>
      <path d="M280,30 Q300,70 320,30 Q300,-10 280,30 Z" fill="url(#gold)"/>
      <path d="M250,80 Q300,120 350,80 Q300,40 250,80 Z" stroke="url(#gold)" strokeWidth="2" fill="none"/>
      <circle cx="150" cy="60" r="5" fill="url(#gold)"/>
      <circle cx="450" cy="60" r="5" fill="url(#gold)"/>
      <path d="M250,80 Q300,120 350,80" stroke="url(#gold)" strokeWidth="1" fill="none"/>
    </svg>
  </div>
);

const VintageDivider = () => (
  <div className="flex items-center justify-center w-full my-3 opacity-70">
     <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C3B09B]"></div>
     <svg className="w-6 h-6 mx-3 text-[#C3B09B]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.4 9.6H22L15.8 14.4L18.2 22L12 17.2L5.8 22L8.2 14.4L2 9.6H9.6L12 2Z" opacity="0.8"/>
     </svg>
     <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C3B09B]"></div>
  </div>
);

const WatermarkPurpleFlowers = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply opacity-[0.08]">
      <img src="/Hoa_chim.png" alt="watermark 1" className="absolute top-[2%] -left-[5%] w-[120px] opacity-60 -rotate-12" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoa_chim.jpg"; }} />
      <img src="/Hoa_chim.png" alt="watermark 2" className="absolute top-[18%] -right-[5%] w-[150px] opacity-50 rotate-45" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoa_chim.jpg"; }} />
      <img src="/Hoa_chim.png" alt="watermark 3" className="absolute top-[35%] -left-[10%] w-[180px] opacity-40 -rotate-45" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoa_chim.jpg"; }} />
      <img src="/Hoa_chim.png" alt="watermark 4" className="absolute top-[50%] -right-[8%] w-[140px] opacity-60 rotate-12" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoa_chim.jpg"; }} />
      <img src="/Hoa_chim.png" alt="watermark 5" className="absolute top-[70%] -left-[5%] w-[160px] opacity-45 -rotate-12" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoa_chim.jpg"; }} />
      <img src="/Hoa_chim.png" alt="watermark 6" className="absolute bottom-[5%] -right-[5%] w-[130px] opacity-55 rotate-45" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoa_chim.jpg"; }} />
  </div>
);

const FadeIn = ({ children, delay = 0, threshold = 0.05, className = "" }: { children: React.ReactNode, delay?: number, threshold?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`transition-all duration-[700ms] ease-out w-full flex flex-col items-center ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.98]'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

export default function WeddingCardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [cardState, setCardState] = useState<'idle' | 'bursting' | 'opening' | 'gramophone' | 'done'>('idle');
  const [showMusicTitle, setShowMusicTitle] = useState(false);
  const [stageProgress, setStageProgress] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  
  // States cho các Popups
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  
  // States cho Form RSVP
  const [rsvpForm, setRsvpForm] = useState({ name: "", attendance: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const musicTriggeredRef = useRef(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeout(() => setIsPageLoaded(true), 150);
    if (audioRef.current) audioRef.current.loop = true; 
  }, []);

  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;
    if (isAutoScrolling && scrollRef.current && !isRsvpOpen && lightboxIndex === null) {
        scrollInterval = setInterval(() => {
            if (scrollRef.current) scrollRef.current.scrollTop += 1;
        }, 25);
    }
    return () => { if (scrollInterval) clearInterval(scrollInterval); };
  }, [isAutoScrolling, isRsvpOpen, lightboxIndex]);

  const handleVideoTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    if (time >= 2.5 && stageProgress < 1) setStageProgress(1);
    if (time >= 4.0 && stageProgress < 2) setStageProgress(2);
    if (time >= 4.5 && !musicTriggeredRef.current) {
        musicTriggeredRef.current = true;
        setShowMusicTitle(true);
        if (audioRef.current) {
            audioRef.current.currentTime = 0; 
            audioRef.current.muted = false;   
            audioRef.current.volume = 0;
            audioRef.current.play().then(() => {
                setIsMusicPlaying(true);
                let vol = 0;
                const fadeInterval = setInterval(() => {
                    vol += 0.05;
                    if (vol >= 0.7) { clearInterval(fadeInterval); if(audioRef.current) audioRef.current.volume = 0.7; } 
                    else { if(audioRef.current) audioRef.current.volume = vol; }
                }, 150);
            }).catch(e => { console.error("Auto-play song block:", e); setIsMusicPlaying(false); });
        }
    }
    if (time >= 7.5 && stageProgress < 3) setStageProgress(3);
    if (time >= 9.5 && !videoRef.current.paused) videoRef.current.pause();
    if (time >= 9.5 && stageProgress < 4) {
        setStageProgress(4); 
        setTimeout(() => { setCardState('done'); setTimeout(() => setIsAutoScrolling(true), 2500); }, 1200); 
    }
  };

  const handleOpenCard = () => {
    if (cardState !== 'idle') return;
    setIsVideoMuted(false);
    if (audioRef.current) {
        audioRef.current.muted = true; 
        audioRef.current.play().catch(e => console.log("Audio unlock failed", e));
    }
    if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log("Video unlock failed", e));
    }
    setCardState('bursting');
    setTimeout(() => setCardState('opening'), 1300); 
    setTimeout(() => { setCardState('gramophone'); musicTriggeredRef.current = false; }, 2500); 
  };

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isMusicPlaying) { audioRef.current.pause(); setIsMusicPlaying(false); } 
    else { audioRef.current.play().then(() => setIsMusicPlaying(true)).catch(e => console.error(e)); }
  };

  // LOGIC GỬI DATA VỀ GOOGLE SHEETS
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpForm.name.trim() || !rsvpForm.attendance) return;
    setIsSubmitting(true);

    const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxDKiud9GAzFYapySIsTnjbOE-Oo0CisDt0iD6SujqYWx_R7lYaKbN8dHRK4Wj_55bD/exec";

    try {
        const params = new URLSearchParams();
        params.append("name", rsvpForm.name);
        params.append("attendance", rsvpForm.attendance === "yes" ? "Sẽ đến" : "Không thể đến");
        params.append("message", rsvpForm.message);

        await fetch(GOOGLE_SHEET_URL, {
            method: "POST",
            body: params,
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        alert(`Cảm ơn bạn ${rsvpForm.name} đã gửi xác nhận tham dự!`);
        setIsRsvpOpen(false);
        setRsvpForm({ name: "", attendance: "", message: "" });
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (!isMounted) return <div className="min-h-[100dvh] bg-[#8C8076]"></div>;

  return (
    <React.Fragment>
      {/* ========================================================================= 
          LỚP CHÍNH CỦA THIỆP CƯỚI 
          ========================================================================= */}
      <div className={`relative selection:bg-[#E5D9CC] selection:text-[#4A3C31] font-sans text-[#5C4F44] bg-[#8C8076] w-full flex flex-col items-center mx-auto overflow-hidden h-[100dvh] transition-opacity duration-[1200ms] ease-in-out ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        <audio ref={audioRef} src="/Nhac.mp3" preload="auto" />

        {/* Chèn CSS từ biến customCSS để không bị lỗi Vercel Turbopack */}
        <style dangerouslySetInnerHTML={{ __html: customCSS }} />

        {/* Thông báo Auto Scroll */}
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-black/40 text-white px-5 py-2.5 rounded-full backdrop-blur-sm text-[10px] md:text-[11px] uppercase tracking-widest transition-opacity duration-1000 pointer-events-none flex items-center gap-2 shadow-lg ${isAutoScrolling ? 'opacity-100' : 'opacity-0'}`}>
            <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
            Chạm vào để Dừng cuộn
        </div>

        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[30]">
            {PARTICLES.map((p) => (
              <div key={`bg-${p.id}`} className="absolute top-[-5%]" style={{ left: p.left, width: p.size, height: p.size, animation: `fall ${p.duration} linear infinite`, animationDelay: p.delay }}>
                <svg viewBox="0 0 24 24" fill="#FFC0CB" className="w-full h-full animate-heart opacity-70" style={{ animationDelay: p.delay, overflow: 'visible' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
            ))}
        </div>

        {/* TỔ HỢP THIỆP CHÍNH */}
        <div className="w-full h-[100dvh] flex justify-center items-center p-0 md:p-6 relative">
            
            {cardState === 'done' && (
              <button 
                  onClick={toggleMusic}
                  className={`fixed top-6 right-6 z-[70] w-12 h-12 rounded-full backdrop-blur-sm border transition-all duration-300 flex items-center justify-center shadow-lg group
                      ${isMusicPlaying ? 'bg-[#8C7A6B]/80 border-[#A09386] animate-music-on' : 'bg-white/40 border-white/60 hover:bg-white/60'}
                  `}
              >
                  {isMusicPlaying ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                  ) : (
                    <svg className="w-6 h-6 text-[#8C7A6B] group-hover:text-[#5C4F44]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                  )}
              </button>
            )}

            <div className="relative w-full max-w-[460px] h-full max-h-[850px] shadow-2xl md:rounded-lg border-x border-[#EAE3DB] overflow-hidden bg-[#FDFBF7]" style={{ perspective: '2000px' }}>
                
                {/* CẢNH GRAMOPHONE */}
                <div className={`absolute inset-0 w-full h-full bg-white flex flex-col items-center justify-center transition-all duration-1000
                    ${(cardState === 'idle' || cardState === 'bursting') ? 'opacity-0 z-0' : 'opacity-100 z-[40]'}
                    ${cardState === 'done' ? 'hidden' : ''}`}
                >
                    <div className={`relative w-[90%] max-w-[340px] mx-auto mt-4 flex flex-col items-center justify-center ${stageProgress === 4 ? 'animate-split-up' : ''}`}>
                        {showMusicTitle && (
                            <div className="absolute top-4 right-[-10px] bg-white/85 backdrop-blur-md border border-[#EAE3DB] rounded-l-full pr-1 pl-4 py-1.5 flex items-center gap-2 animate-slide-in-right shadow-[0_4px_15px_rgba(0,0,0,0.06)] z-50">
                                <div className="overflow-hidden w-[140px] relative">
                                    <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-white/90 to-transparent z-10 pointer-events-none"></div>
                                    <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none"></div>
                                    <div className="whitespace-nowrap animate-marquee flex items-center h-full text-[#5C4F44] text-[10px] font-sans tracking-widest uppercase opacity-90 font-medium">
                                        Beautiful In White - Westlife Beautiful In White - Westlife Beautiful In White - Westlife
                                    </div>
                                </div>
                                <div className="w-7 h-7 rounded-full border border-[#D5C7B8] bg-[#F8F4ED] flex items-center justify-center shrink-0 shadow-sm">
                                    <span className="text-[#8C7A6B] text-xs pb-0.5">♫</span>
                                </div>
                            </div>
                        )}

                        <div className="relative w-full flex items-center justify-center z-10">
                            <video 
                                ref={videoRef}
                                src="/video1.mov" 
                                muted={isVideoMuted} 
                                playsInline
                                preload="auto"
                                onTimeUpdate={handleVideoTimeUpdate}
                                className="w-full h-auto object-cover scale-[1.02] z-10"
                                style={{ mixBlendMode: 'multiply' }}
                            />
                            
                            {stageProgress >= 1 && (
                                <div className="absolute inset-0 pointer-events-none z-40">
                                    <div className="absolute top-[25%] left-[55%] text-[#d4af37] text-2xl animate-float-note opacity-0 drop-shadow-md" style={{ animationDelay: '0s' }}>♪</div>
                                    <div className="absolute top-[30%] left-[60%] text-[#d4af37] text-xl animate-float-note opacity-0 drop-shadow-md" style={{ animationDelay: '1.2s' }}>♫</div>
                                    <div className="absolute top-[15%] left-[50%] text-[#d4af37] text-3xl animate-float-note opacity-0 drop-shadow-md" style={{ animationDelay: '2.5s' }}>♬</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={`relative mt-6 h-36 flex flex-col items-center justify-center w-full px-4 text-center ${stageProgress === 4 ? 'animate-split-down' : ''}`}>
                      <p className={`absolute top-0 transition-all duration-1000 ease-out text-[11px] md:text-[13px] force-serif text-[#8C7A6B] font-bold tracking-[0.25em] uppercase ${stageProgress >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Xin chào bạn...</p>
                      <div className={`absolute top-10 w-full transition-all duration-1000 ease-out px-2 ${stageProgress >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                          <p className="force-serif text-[clamp(14px,4.5vw,20px)] text-[#5C4F44] italic tracking-wide whitespace-nowrap overflow-visible">Chào mừng bạn đã đến với lễ cưới của chúng tôi!</p>
                      </div>
                      <p className={`absolute top-24 transition-all duration-1000 ease-out text-[13px] md:text-[15px] force-serif font-bold tracking-[0.25em] text-[#8C7A6B] uppercase ${stageProgress >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Xin Cảm Ơn</p>
                    </div>
                </div>

                {/* BÌA THIỆP */}
                <div 
                    className={`absolute inset-0 w-full h-full bg-[#FDFBF7] z-50 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-[1500ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] ${cardState === 'done' ? 'hidden' : ''}`}
                    style={{ 
                        transformOrigin: 'left center', 
                        transform: (cardState === 'opening' || cardState === 'gramophone') ? 'perspective(2000px) rotateY(-120deg)' : 'perspective(2000px) rotateY(0deg)',
                        opacity: (cardState === 'opening' || cardState === 'gramophone') ? 0 : 1,
                        pointerEvents: (cardState === 'opening' || cardState === 'gramophone') ? 'none' : 'auto'
                    }}
                >
                    {/* LỒNG ẢNH BÌA TRÀN VIỀN BẰNG OBJECT-COVER */}
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10">
                        <img src="/bia.png" alt="Bìa" className="w-full h-full object-cover object-center select-none" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/bia.jpg"; }} />
                    </div>
                    
                    <div className="relative z-20 flex flex-col items-center justify-center w-full mt-4 px-6">
                      <div className="mb-6 relative z-30">
                         {/* HIỆU ỨNG TRÁI TIM BUNG ĐÃ SỬA LỖI VERCEL BẰNG CÁCH DÙNG ANY VÀ XÓA BACKSLASH */}
                         {cardState === 'bursting' && (
                              <div className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none z-40 overflow-visible">
                                  {GENTLE_CONFETTI.map((p) => {
                                      const pStyle: any = {
                                          '--tx': `${p.tx}px`,
                                          '--ty': `${p.ty}px`,
                                          left: '-12px',
                                          top: '-12px',
                                          width: p.shape === 'heart' ? '24px' : '18px',
                                          color: p.color,
                                          animationDelay: `${p.delay}s`
                                      };

                                      return (
                                          <div key={p.id} className="absolute animate-gentle-burst opacity-0" style={pStyle}>
                                              {p.shape === 'heart' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>}
                                              {p.shape === 'bubble' && <div className="w-3 h-3 bg-currentColor rounded-full opacity-60 mt-1 ml-1"></div>}
                                          </div>
                                      );
                                  })}
                              </div>
                         )}
                         <div className={`bg-[#8C7A6B] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ${cardState === 'bursting' ? 'scale-110' : ''}`}>
                           <svg className={`w-5 h-5 md:w-6 md:h-6 text-white ${cardState === 'bursting' ? 'animate-fast-beat' : ''}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                         </div>
                      </div>
                      
                      <h1 className="text-3xl md:text-4xl force-serif text-[#5C4F44] font-light mb-1 drop-shadow-md">Đỗ Trung</h1>
                      <span className="text-xl md:text-2xl force-serif text-[#8C7A6B] italic my-1 drop-shadow-md">&amp;</span>
                      <h1 className="text-3xl md:text-4xl force-serif text-[#5C4F44] font-light mt-1 drop-shadow-md">Đặng Hải</h1>
                      
                      <p className="text-[#8C7A6B] text-base md:text-lg force-serif tracking-wide mt-4 mb-8 drop-shadow-md">3 tháng 1, 2027</p>
                      <button onClick={(e) => { e.stopPropagation(); handleOpenCard(); }} className="px-10 py-3.5 bg-[#8C7A6B] text-white text-xs md:text-sm uppercase tracking-widest rounded-full shadow-lg hover:bg-[#7A6A5E] active:scale-90 transition-all z-50">Mở thiệp</button>
                    </div>
                </div>

                {/* RUỘT THIỆP CHÍNH */}
                <div 
                    ref={scrollRef}
                    className={`absolute inset-0 w-full h-full bg-[#FDFBF7] custom-scrollbar ${cardState === 'done' ? 'z-50 overflow-y-auto pb-24' : 'hidden'}`}
                    style={{ WebkitOverflowScrolling: 'touch', transform: 'translateZ(0)' }}
                    onTouchStart={() => setIsAutoScrolling(false)}
                    onTouchMove={() => setIsAutoScrolling(false)}
                    onWheel={() => setIsAutoScrolling(false)}
                >
                   <WatermarkPurpleFlowers />

                   <div className="w-full flex justify-center pt-6 opacity-60">
                      <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 10H45M75 10H110" stroke="#C3B09B" strokeWidth="1"/>
                          <circle cx="60" cy="10" r="3" fill="#C3B09B"/>
                          <circle cx="50" cy="10" r="1.5" fill="#C3B09B"/>
                          <circle cx="70" cy="10" r="1.5" fill="#C3B09B"/>
                      </svg>
                   </div>

                   <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-16 pb-16 z-20"> 
                       <p className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-[#8C7A6B] font-medium mb-3">The Wedding Of</p> 
                       <h2 className="text-4xl md:text-5xl force-serif italic text-[#5C4F44] mb-8">Đỗ Trung <span className="force-serif italic text-[#8C7A6B] mx-2">&amp;</span> Đặng Hải</h2> 
                       
                       <div className="relative w-[85%] max-w-[320px] bg-white p-3 pb-12 shadow-xl rotate-[2deg] mx-auto mt-2 border border-[#F2EBE1]">
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#DBCBB5] opacity-85 rotate-[-3deg] shadow-sm z-10"></div>
                          <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden relative border border-[#F2EBE1]">
                              <img src="/AnhT1.jpg" alt="Wedding Photo" className="w-full h-full object-cover" onError={(e) => { if (!e.currentTarget.src.includes('.png')) e.currentTarget.src = "/AnhT1.png"; }} />
                          </div>
                          <img src="/Con_dau1.png" alt="Wax Seal" className="absolute -bottom-6 -right-5 w-16 h-16 z-30 drop-shadow-md object-contain" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Con_dau1.jpg"; }} />
                          
                          <div className="absolute -bottom-[40px] -left-[30px] z-30 pointer-events-none origin-bottom-left" style={{ animation: 'float-up-down 6s ease-in-out infinite' }}>
                              <img src="/HoaT1.png" alt="Hoa" className="w-[120px] h-auto" style={{ filter: 'drop-shadow(4px 8px 6px rgba(0,0,0,0.25))' }} onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/HoaT1.jpg"; }} />
                          </div>
                       </div>
                   </div>

                   {/* THẺ 1: THÔNG TIN LỄ CƯỚI */}
                   <FadeIn className="relative w-full flex justify-center mt-4 mb-12 px-2" threshold={0.05}>
                       <div className="absolute top-[-40px] right-[-5px] md:top-[-50px] md:right-[-10px] z-30 pointer-events-none origin-top-right" style={{ animation: 'float-up-down 6s ease-in-out infinite' }}>
                           <img src="/goc1.png" alt="Hoa goc 1" className="w-[240px] md:w-[300px] h-auto opacity-100" style={{ filter: 'drop-shadow(-4px 8px 6px rgba(0,0,0,0.15))' }} onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/goc1.jpg"; }} />
                       </div>

                       <div className="absolute -bottom-[40px] -left-[10px] md:-bottom-[50px] md:-left-[20px] z-30 pointer-events-none origin-bottom-left" style={{ animation: 'float-up-down 7s ease-in-out infinite' }}>
                           <img src="/goc2.png" alt="Hoa goc 2" className="w-[240px] md:w-[300px] h-auto opacity-100" style={{ filter: 'drop-shadow(4px 8px 6px rgba(0,0,0,0.15))' }} onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/goc2.jpg"; }} />
                       </div>

                       <div className="relative w-[95%] max-w-[400px] art-paper-bg rounded-sm border border-[#EAE3DB] pt-16 pb-16 px-6 text-center">
                           <h3 className="text-[#5C4F44] force-serif text-[18px] md:text-xl tracking-[0.2em] uppercase font-bold mb-5">Thông Tin Lễ Cưới</h3>

                           <div className="w-full flex justify-between items-start text-[#5C4F44] text-[11px] md:text-[12px] mb-6 relative px-1">
                               <div className="w-[48%] flex flex-col items-center">
                                   <span className="text-[#8C7A6B] mb-1.5 uppercase tracking-[0.1em] text-[9px]">Ông Bà</span>
                                   <span className="font-bold mb-1">Võ Nhật Minh</span>
                                   <span className="font-bold mb-2">Trần Thu Thảo</span>
                                   <span className="text-[#8C7A6B] leading-relaxed opacity-90 text-[10px] md:text-[11px]">Quận 1, TP. HCM</span>
                               </div>
                               <div className="w-[48%] flex flex-col items-center">
                                   <span className="text-[#8C7A6B] mb-1.5 uppercase tracking-[0.1em] text-[9px]">Ông Bà</span>
                                   <span className="font-bold mb-1">Lê Văn Thành</span>
                                   <span className="font-bold mb-2">Phạm Thị Lan</span>
                                   <span className="text-[#8C7A6B] leading-relaxed opacity-90 text-[10px] md:text-[11px]">Quận 3, TP. HCM</span>
                               </div>
                           </div>

                           <VintageDivider/>

                           <p className="text-[#8C7A6B] text-[10px] md:text-[11px] uppercase tracking-[0.15em] leading-relaxed mb-4 mt-3">Trân trọng báo tin<br/>Lễ thành hôn của con chúng tôi</p>

                           <div className="w-full flex flex-col items-center">
                              <h1 className="text-4xl md:text-5xl force-serif mb-1 text-[#5C4F44]">Đỗ Trung</h1>
                              <span className="text-[#8C7A6B] text-[8px] uppercase tracking-[0.3em] mt-1 mb-2">Trưởng Nam</span>
                              <span className="text-2xl force-serif text-[#C3B09B] italic my-1">❦</span>
                              <h1 className="text-4xl md:text-5xl force-serif mt-2 mb-1 text-[#5C4F44]">Đặng Hải</h1>
                              <span className="text-[#8C7A6B] text-[8px] uppercase tracking-[0.3em] mt-1 mb-5">Út Nữ</span>
                           </div>

                           <VintageDivider/>

                           <p className="text-[#5C4F44] text-[11px] md:text-[12px] uppercase tracking-[0.15em] leading-relaxed mb-3 mt-4">Lễ thành hôn được cử hành tại<br/><span className="font-bold text-base md:text-lg">Tư Gia</span><br/>Vào lúc</p>
                           <div className="text-3xl force-serif text-[#5C4F44] mb-4">09:00</div>

                           <div className="flex items-center justify-center gap-3 md:gap-4 text-[#5C4F44] mb-3">
                               <span className="uppercase tracking-[0.2em] text-[10px] font-medium">Chủ Nhật</span>
                               <div className="h-6 w-[1px] bg-[#C3B09B]"></div>
                               <span className="text-4xl font-serif">03</span>
                               <div className="h-6 w-[1px] bg-[#C3B09B]"></div>
                               <span className="uppercase tracking-[0.2em] text-[10px] font-medium">Tháng 01</span>
                           </div>
                           <span className="text-lg force-serif text-[#5C4F44] mb-1">2027</span>
                           <span className="text-[#8C7A6B] text-[9px] md:text-[10px] uppercase tracking-[0.1em] opacity-90">(Tức ngày 26 tháng 11 năm Bính Ngọ)</span>
                       </div>
                   </FadeIn>

                   {/* THẺ 2: ALBUM ẢNH */}
                   <FadeIn className="relative w-full flex flex-col items-center mt-4 mb-12 z-20 px-2" threshold={0.05}>
                       <div className="relative w-[95%] max-w-[400px] art-paper-bg rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-[#EAE3DB] p-6 flex flex-col items-center overflow-hidden">
                           
                           <h3 className="text-[#5C4F44] force-serif text-[18px] md:text-xl tracking-[0.25em] uppercase font-bold mb-8 mt-4 text-center">Album Ảnh</h3>
                           
                           <div className="grid grid-cols-2 gap-3 w-full mb-4 z-10 relative">
                              {ALBUM_IMAGES.slice(0, 4).map((src, idx) => (
                                  <div 
                                      key={idx} 
                                      className="relative aspect-[4/5] overflow-hidden shadow-sm cursor-pointer bg-gray-200 rounded-sm border-2 border-[#F2EBE1]"
                                      onClick={(e) => { 
                                          e.stopPropagation(); 
                                          setLightboxIndex(idx); 
                                      }}
                                  >
                                      <img 
                                          src={src} 
                                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                                          onError={(e) => { if (!e.currentTarget.src.includes('.png')) e.currentTarget.src = src.replace('.jpg', '.png'); }} 
                                      />
                                  </div>
                              ))}
                           </div>
                       </div>
                   </FadeIn>

                   {/* THẺ 3: THÔNG TIN TIỆC CƯỚI */}
                   <FadeIn className="relative w-full flex justify-center mt-4 mb-20 px-2" threshold={0.05}>
                       
                       <div className="absolute top-[-50px] right-[-45px] md:top-[-60px] md:right-[-55px] z-30 pointer-events-none origin-top-right" style={{ animation: 'float-up-down 6s ease-in-out infinite' }}>
                           <img src="/goc3.png" alt="Hoa goc 3" className="w-[160px] md:w-[180px] h-auto opacity-100" style={{ filter: 'drop-shadow(-4px 8px 6px rgba(0,0,0,0.15))' }} onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/goc3.jpg"; }} />
                       </div>

                       <div className="absolute bottom-[5%] left-[-50px] md:left-[-70px] z-30 pointer-events-none origin-bottom-left" style={{ animation: 'float-up-down 6s ease-in-out infinite' }}>
                           <img src="/Hoa_kho_trai.png" alt="Hoa khô" className="w-[220px] md:w-[240px] h-auto opacity-90" style={{ filter: 'drop-shadow(4px 8px 6px rgba(0,0,0,0.25))' }} onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoa_kho_trai.jpg"; }} />
                       </div>

                       <div className="relative w-[95%] max-w-[400px] art-paper-bg rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-[#EAE3DB]">
                           <div className="px-5 md:px-6 pt-16 pb-12 flex flex-col items-center text-center relative z-20 w-full">
                               <h3 className="text-[#5C4F44] force-serif text-[18px] md:text-xl tracking-[0.2em] uppercase font-bold mb-6">Thông Tin Tiệc Cưới</h3>
                               <p className="text-[#8C7A6B] text-[10px] md:text-[11px] uppercase tracking-[0.15em] mb-8">Tiệc cưới sẽ diễn ra vào lúc:</p>

                               <div className="text-4xl force-serif text-[#5C4F44] mb-6">18:00</div>

                               <div className="flex items-center justify-center gap-3 md:gap-4 text-[#5C4F44] mb-5">
                                   <span className="uppercase tracking-[0.2em] text-[10px] font-medium">Chủ Nhật</span>
                                   <div className="h-4 w-[1px] bg-[#C3B09B]"></div>
                                   <span className="text-3xl font-serif">03</span>
                                   <div className="h-4 w-[1px] bg-[#C3B09B]"></div>
                                   <span className="uppercase tracking-[0.2em] text-[10px] font-medium">Tháng 01</span>
                               </div>
                               <span className="text-lg force-serif text-[#5C4F44] mb-2">2027</span>
                               <span className="text-[#8C7A6B] text-[9px] md:text-[10px] uppercase tracking-[0.1em] opacity-90 mb-10">(Tức ngày 26 tháng 11 năm Bính Ngọ)</span>

                               <div className="flex w-full justify-center gap-10 md:gap-14 mb-10 text-[#5C4F44]">
                                  <div className="flex flex-col items-center">
                                     <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#8C7A6B] mb-2">Đón Khách</span>
                                     <span className="text-xl md:text-2xl force-serif">17:30</span>
                                  </div>
                                  <div className="flex flex-col items-center">
                                     <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#8C7A6B] mb-2">Khai Tiệc</span>
                                     <span className="text-xl md:text-2xl force-serif">18:00</span>
                                  </div>
                               </div>

                               <div className="w-[95%] md:w-[90%] bg-[#77665B] rounded-lg p-5 text-[#F2EBE1] shadow-inner mb-8 border border-[#8C7A6B] relative z-40">
                                  
                                  <div className="absolute top-[-15px] -right-[25px] md:top-[-20px] md:-right-[30px] z-50 pointer-events-none origin-bottom-right" style={{ animation: 'float-up-down 8s ease-in-out infinite' }}>
                                      <img src="/La_phai.png" alt="Lá" className="w-[85px] md:w-[95px] h-auto opacity-95" style={{ filter: 'drop-shadow(-4px 8px 6px rgba(0,0,0,0.15))' }} onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/La_phai.jpg"; }} />
                                  </div>

                                  <div className="text-center font-script text-3xl md:text-4xl mb-4 tracking-wider">Tháng 1 / 2027</div>
                                  <div className="grid grid-cols-7 gap-y-3 text-center text-[10px] opacity-80 mb-2 border-b border-[#F2EBE1]/20 pb-3 font-medium">
                                      <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
                                  </div>
                                  <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center text-[12px] md:text-[13px] force-serif pt-2 items-center">
                                     <span className="opacity-0"></span><span className="opacity-0"></span><span className="opacity-0"></span><span className="opacity-0"></span>
                                     <span>1</span><span>2</span>
                                     <span className="relative flex justify-center items-center h-6 w-full">
                                        <svg className="absolute w-7 h-7 text-[#F2EBE1] drop-shadow-md z-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                        <span className="relative z-10 text-[#77665B] font-bold text-[13px]">3</span>
                                     </span>
                                     <span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                                     <span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span>
                                     <span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span>
                                     <span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
                                  </div>
                               </div>

                               <button className="text-[#8C7A6B] text-[11px] md:text-[12px] font-medium underline underline-offset-4 mb-6 hover:text-[#5C4F44] transition-colors relative z-40">
                                  Thêm vào lịch
                               </button>

                               {/* NÚT MỞ POPUP BẢNG ĐIỀN THÔNG TIN RSVP */}
                               <button 
                                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsRsvpOpen(true); }} 
                                  className="bg-[#77665B] text-white px-8 py-3.5 rounded-full text-[10px] md:text-[11px] tracking-[0.2em] uppercase shadow-[0_4px_15px_rgba(119,102,91,0.4)] hover:bg-[#5C4F44] active:scale-95 transition-all relative z-50 cursor-pointer"
                               >
                                  Xác nhận tham dự
                               </button>

                           </div>
                       </div>
                   </FadeIn>

                   <GoldenVintageOrnaments className="opacity-60 mb-20"/>

                </div>

            </div>
        </div>

      {/* ========================================================================= 
          LỚP POPUP HIỂN THỊ TRÊN CÙNG (KHÔNG BỊ CHE KHUẤT BỞI BẤT CỨ THỨ GÌ)
          ========================================================================= */}
      
      {/* Lightbox Album */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 flex flex-col items-center justify-center touch-none" style={{ zIndex: 999998, backgroundColor: 'rgba(0,0,0,0.95)' }} onClick={() => setLightboxIndex(null)}>
            <button className="absolute top-4 right-4 text-white/70 hover:text-white p-4" onClick={() => setLightboxIndex(null)}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="relative w-full h-full flex items-center justify-center px-2">
                <img src={ALBUM_IMAGES[lightboxIndex]} alt="Zoom" className="max-h-[85vh] max-w-full object-contain select-none shadow-2xl" onClick={(e) => e.stopPropagation()} onError={(e) => { if (!e.currentTarget.src.includes('.png')) e.currentTarget.src = ALBUM_IMAGES[lightboxIndex].replace('.jpg', '.png'); }}/>
                <div className="absolute inset-y-0 left-0 w-1/4 flex items-center justify-start p-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => prev === 0 ? ALBUM_IMAGES.length - 1 : prev! - 1); }}>
                    <svg className="w-10 h-10 text-white drop-shadow-lg opacity-60 hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </div>
                <div className="absolute inset-y-0 right-0 w-1/4 flex items-center justify-end p-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => prev === ALBUM_IMAGES.length - 1 ? 0 : prev! + 1); }}>
                    <svg className="w-10 h-10 text-white drop-shadow-lg opacity-60 hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
            </div>
            <div className="absolute bottom-8 text-white/80 tracking-[0.2em] text-sm font-sans">{lightboxIndex + 1} / {ALBUM_IMAGES.length}</div>
        </div>
      )}

      {/* POPUP RSVP MODAL - GIAO DIỆN MỚI CHUẨN 100% HÌNH CỦA BẠN */}
      {isRsvpOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300" style={{ zIndex: 999999, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={() => setIsRsvpOpen(false)}>
            <div className="relative w-full max-w-[380px] bg-white rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col font-sans max-h-[90vh] overflow-y-auto custom-scrollbar" onClick={(e) => e.stopPropagation()}>
                {/* Nút đóng X */}
                <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer" onClick={() => setIsRsvpOpen(false)}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                
                <h3 className="text-[#333333] text-xl font-bold mb-2">Xác nhận tham dự</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi. Xin xác nhận để chúng tôi chuẩn bị chu đáo nhất.</p>
                
                <form onSubmit={handleRsvpSubmit} className="w-full flex flex-col gap-5 text-[#333333]">
                    {/* Tên */}
                    <div>
                        <label className="block text-[13px] font-semibold mb-2">Tên của bạn</label>
                        <input type="text" required value={rsvpForm.name} onChange={(e) => setRsvpForm({...rsvpForm, name: e.target.value})} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C3B09B] focus:ring-1 focus:ring-[#C3B09B] transition-all rounded-lg placeholder:text-gray-400" placeholder="Nhập tên của bạn" />
                    </div>

                    {/* Lựa chọn */}
                    <div>
                        <label className="block text-[13px] font-semibold mb-2">Bạn sẽ đến chứ?</label>
                        <div className="flex flex-col gap-3">
                            {/* Nút Có đến */}
                            <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${rsvpForm.attendance === 'yes' ? 'border-[#C3B09B] bg-[#FAF8F5]' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}>
                                <input type="radio" name="attendance" value="yes" className="hidden" checked={rsvpForm.attendance === 'yes'} onChange={(e) => setRsvpForm({...rsvpForm, attendance: e.target.value})} />
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${rsvpForm.attendance === 'yes' ? 'bg-[#C3B09B] text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span className={`text-sm font-medium ${rsvpForm.attendance === 'yes' ? 'text-[#8C7A6B]' : 'text-gray-600'}`}>Tôi sẽ đến</span>
                            </label>

                            {/* Nút Không đến */}
                            <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${rsvpForm.attendance === 'no' ? 'border-[#C3B09B] bg-[#FAF8F5]' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}>
                                <input type="radio" name="attendance" value="no" className="hidden" checked={rsvpForm.attendance === 'no'} onChange={(e) => setRsvpForm({...rsvpForm, attendance: e.target.value})} />
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${rsvpForm.attendance === 'no' ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </div>
                                <span className={`text-sm font-medium ${rsvpForm.attendance === 'no' ? 'text-[#8C7A6B]' : 'text-gray-600'}`}>Rất tiếc, tôi không thể đến</span>
                            </label>
                        </div>
                    </div>

                    {/* Lời nhắn (Không bắt buộc) */}
                    <div>
                        <label className="flex items-center justify-between text-[13px] font-semibold mb-2">
                            <span>Lời nhắn</span>
                            <span className="text-gray-400 text-[11px] font-normal italic">(Không bắt buộc)</span>
                        </label>
                        <textarea 
                            rows={2} 
                            value={rsvpForm.message} 
                            onChange={(e) => setRsvpForm({...rsvpForm, message: e.target.value})} 
                            className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C3B09B] focus:ring-1 focus:ring-[#C3B09B] transition-all rounded-lg placeholder:text-gray-400 resize-none custom-scrollbar" 
                            placeholder="Gửi vài lời chúc tốt đẹp nhất..." 
                        />
                    </div>
                    
                    <button type="submit" disabled={isSubmitting || !rsvpForm.attendance || !rsvpForm.name.trim()} className="mt-2 bg-[#D1C6B8] hover:bg-[#C3B09B] text-white w-full py-3.5 rounded-xl text-[14px] font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Đang gửi...' : 'Gửi xác nhận'}
                    </button>
                </form>
            </div>
        </div>
      )}
    </React.Fragment>
  );
}

```