"use client";

import React, { useState, useEffect, useRef } from "react";

// ==========================================
// 1. DỮ LIỆU TĨNH & COMPONENT TRANG TRÍ
// ==========================================
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

const FOREST_FLOWERS = [
  { id: 1, src: "/Hoa.png", left: "-15%", bottom: "-110px", width: "240px", rotate: "-20deg", duration: "5s", delay: "0s" },
  { id: 2, src: "/Hoa.png", left: "-5%", bottom: "-130px", width: "200px", rotate: "-10deg", duration: "6.5s", delay: "1.2s" },
  { id: 3, src: "/Hoa.png", left: "5%", bottom: "-100px", width: "260px", rotate: "-5deg", duration: "4.5s", delay: "0.5s" },
  { id: 4, src: "/Hoa.png", left: "15%", bottom: "-120px", width: "220px", rotate: "2deg", duration: "7s", delay: "2.1s" },
  { id: 5, src: "/Hoa.png", left: "25%", bottom: "-90px", width: "280px", rotate: "8deg", duration: "5.5s", delay: "1.5s" },
  { id: 6, src: "/Hoa.png", left: "35%", bottom: "-115px", width: "210px", rotate: "-3deg", duration: "6s", delay: "0.8s" },
  { id: 7, src: "/Hoa.png", left: "45%", bottom: "-135px", width: "190px", rotate: "5deg", duration: "4.8s", delay: "2.5s" },
  { id: 8, src: "/Hoa.png", left: "55%", bottom: "-95px", width: "270px", rotate: "12deg", duration: "7.2s", delay: "0.3s" },
  { id: 9, src: "/Hoa.png", left: "65%", bottom: "-125px", width: "230px", rotate: "18deg", duration: "5.2s", delay: "1.8s" },
  { id: 10, src: "/Hoa.png", left: "75%", bottom: "-105px", width: "250px", rotate: "22deg", duration: "6.8s", delay: "0.9s" },
  { id: 11, src: "/Hoa.png", left: "85%", bottom: "-140px", width: "180px", rotate: "25deg", duration: "4.5s", delay: "2.2s" },
  { id: 12, src: "/Hoa.png", left: "95%", bottom: "-110px", width: "240px", rotate: "30deg", duration: "5.8s", delay: "1.1s" },
];

const GENTLE_CONFETTI = Array.from({ length: 40 }).map((_, i) => {
  const shapes = ['heart', 'star', 'bubble'];
  const colors = ['#FFC0CB', '#FFB6C1', '#FFD1DC', '#FFE4E1', '#FFF0F5', '#FFFFFF'];
  const angle = Math.random() * Math.PI * 2;
  const distance = 60 + Math.random() * 120;
  return {
    id: i,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    tx: Math.cos(angle) * distance, 
    ty: Math.sin(angle) * distance, 
    scale: 0.5 + Math.random() * 0.8
  };
});

// MẢNG CHỨA TÊN ẢNH ALBUM
const ALBUM_IMAGES = [
  "/Ab1.jpg", 
  "/Ab2.jpg", 
  "/Ab3.jpg", 
  "/Ab4.jpg", 
  "/Ab5.jpg"
];

const LuxuryCorner = ({ className }: { className?: string }) => (
  <svg className={`absolute w-12 h-12 md:w-16 md:h-16 pointer-events-none opacity-90 z-40 ${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 98 V2 H98" stroke="#C3B09B" strokeWidth="2"/>
    <path d="M14 98 V14 H98" stroke="#C3B09B" strokeWidth="1"/>
    <path d="M26 98 V26 H98" stroke="#C3B09B" strokeWidth="0.5"/>
    <path d="M2 38 H14" stroke="#C3B09B" strokeWidth="2"/>
    <path d="M38 2 V14" stroke="#C3B09B" strokeWidth="2"/>
    <path d="M14 54 H26" stroke="#C3B09B" strokeWidth="1"/>
    <path d="M54 14 V26" stroke="#C3B09B" strokeWidth="1"/>
    <rect x="11" y="11" width="6" height="6" transform="rotate(45 14 14)" fill="#C3B09B"/>
  </svg>
);

const WatermarkPurpleFlowers = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply opacity-[0.1]">
      <img src="/Hoa_chim.png" alt="" className="absolute top-[2%] -left-[5%] w-[120px] opacity-60 -rotate-12" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoa_chim.jpg"; }} />
      <img src="/Hoa_chim.png" alt="" className="absolute top-[18%] -right-[5%] w-[150px] opacity-50 rotate-45" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoa_chim.jpg"; }} />
      <img src="/Hoa_chim.png" alt="" className="absolute top-[35%] -left-[10%] w-[180px] opacity-40 -rotate-45" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoa_chim.jpg"; }} />
      <img src="/Hoa_chim.png" alt="" className="absolute top-[50%] -right-[8%] w-[140px] opacity-60 rotate-12" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoa_chim.jpg"; }} />
      <img src="/Hoa_chim.png" alt="" className="absolute top-[70%] -left-[5%] w-[160px] opacity-45 -rotate-12" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoa_chim.jpg"; }} />
      <img src="/Hoa_chim.png" alt="" className="absolute bottom-[5%] -right-[5%] w-[130px] opacity-55 rotate-45" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoa_chim.jpg"; }} />
  </div>
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] w-full flex flex-col items-center ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// ==========================================
// 2. TRANG CHÍNH
// ==========================================
export default function WeddingCardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true); 
  const [loadingPercentage, setLoadingPercentage] = useState(0); // Bộ đếm loading

  const [cardState, setCardState] = useState<'idle' | 'scaling' | 'bursting' | 'gramophone' | 'done'>('idle');
  
  // Trạng thái Gramophone: entry -> needleIn -> playing -> text1 -> text2 -> text3 -> end
  const [gramophoneStage, setGramophoneStage] = useState<'entry' | 'needleIn' | 'playing' | 'text1' | 'text2' | 'text3' | 'end'>('entry');

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // === ÂM THANH ===
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // ĐIỀU KHIỂN BỘ ĐẾM LOADING (không đều)
    let currentPercentage = 0;
    const intervalId = setInterval(() => {
        currentPercentage += Math.floor(Math.random() * 5) + 1; // Tăng ngẫu nhiên từ 1 đến 5%
        if (currentPercentage >= 100) {
            currentPercentage = 100;
            clearInterval(intervalId);
            setTimeout(() => setShowSplash(false), 500); // Ẩn splash sau khi đạt 100%
        }
        setLoadingPercentage(currentPercentage);
    }, Math.floor(Math.random() * 100) + 50); // Khoảng thời gian ngẫu nhiên từ 50 đến 150ms

    if (audioRef.current) {
        audioRef.current.loop = true; 
        audioRef.current.volume = 0.5; 
    }
    return () => clearInterval(intervalId);
  }, []);

  // ĐIỀU KHIỂN LOGIC CHUYỂN CẢNH GRAMOPHONE 
  useEffect(() => {
    if (cardState === 'gramophone' && gramophoneStage === 'entry') {
      
      // 1. Sau 1 giây, kim hát bắt đầu gạt vào
      setTimeout(() => setGramophoneStage('needleIn'), 1000);
      
      // 2. Kim chạm đĩa -> Bắt đầu quay đĩa và phát nhạc
      setTimeout(() => {
          setGramophoneStage('playing');
          if (audioRef.current && !isMusicPlaying) {
            audioRef.current.play().then(() => setIsMusicPlaying(true)).catch(e => console.error("Audio blocked:", e));
          }
      }, 2200); // Khớp với thời gian transition của CSS

      // 3. Hiện từng câu văn bản cảm xúc
      setTimeout(() => setGramophoneStage('text1'), 2500);
      setTimeout(() => setGramophoneStage('text2'), 4500);
      setTimeout(() => setGramophoneStage('text3'), 7000);
      
      // 4. Kết thúc cảnh và chuyển vào ruột thiệp
      setTimeout(() => setGramophoneStage('end'), 10000);
    }
  }, [cardState, gramophoneStage, isMusicPlaying]);

  // Khi gramophone kết thúc, hiển thị thiệp chính và cuộn
  useEffect(() => {
      if (gramophoneStage === 'end' && cardState === 'gramophone') {
          setCardState('done');
          setIsAutoScrolling(true);
      }
  }, [gramophoneStage, cardState]);

  // Cuộn mượt
  useEffect(() => {
    let rafId: number;
    const smoothScroll = () => {
        if (isAutoScrolling && scrollRef.current && lightboxIndex === null) {
            scrollRef.current.scrollTop += 1; 
            if (scrollRef.current.scrollTop + scrollRef.current.clientHeight >= scrollRef.current.scrollHeight - 2) {
                setIsAutoScrolling(false);
            } else {
                rafId = requestAnimationFrame(smoothScroll);
            }
        }
    };
    if (isAutoScrolling && lightboxIndex === null) {
        rafId = requestAnimationFrame(smoothScroll);
    }
    return () => { if (rafId) cancelAnimationFrame(rafId); };
  }, [isAutoScrolling, lightboxIndex]);

  const handleOpenCard = () => {
    if (cardState !== 'idle') return;
    setCardState('scaling');
    
    setTimeout(() => setCardState('bursting'), 800); 

    setTimeout(() => {
      setCardState('gramophone'); 
      setGramophoneStage('entry');
    }, 1800); 
  };

  const toggleAutoScroll = () => {
    if (cardState === 'done') setIsAutoScrolling(prev => !prev);
  };

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsMusicPlaying(true)).catch(e => console.error(e));
    }
  };

  if (!isMounted) return <div className="min-h-[100dvh] bg-[#8C8076]"></div>;

  return (
    <div className={`relative selection:bg-[#E5D9CC] selection:text-[#4A3C31] font-sans text-[#5C4F44] bg-[#8C8076] w-full flex flex-col items-center mx-auto overflow-hidden h-[100dvh]`}>
      
      {/* ÂM THANH */}
      <audio ref={audioRef} src="/Nhac.mp3" preload="auto" />

      {/* LIGHTBOX ALBUM */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center touch-none" onClick={() => setLightboxIndex(null)}>
            <button className="absolute top-4 right-4 text-white/70 hover:text-white p-4 z-50" onClick={() => setLightboxIndex(null)}>
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
            <div className="absolute bottom-8 text-white/80 tracking-[0.2em] text-sm font-sans z-50">{lightboxIndex + 1} / {ALBUM_IMAGES.length}</div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        
        @keyframes fall { 0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(110vh) translateX(-20px) rotate(360deg); opacity: 0; } }
        @keyframes heart-blink { 0%, 100% { stroke: transparent; stroke-width: 0px; transform: scale(1); opacity: 0.5; } 50% { stroke: #FF99C2; stroke-width: 1.5px; transform: scale(1.15); opacity: 0.85; } }
        .animate-heart { animation: heart-blink 2s ease-in-out infinite; }

        @keyframes fast-beat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.3); }
            50% { transform: scale(1); }
            75% { transform: scale(1.3); }
        }
        .animate-fast-beat { animation: fast-beat 1.5s ease-in-out forwards; }

        @keyframes gentle-burst {
           0% { opacity: 1; transform: translate(0, 0) scale(0) rotate(0deg); }
           80% { opacity: 0.9; transform: translate(calc(var(--tx) * 0.8), calc(var(--ty) * 0.8)) scale(var(--s)) rotate(15deg); }
           100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(calc(var(--s) * 1.1)) rotate(30deg); }
        }
        .animate-gentle-burst { animation: gentle-burst 1.5s cubic-bezier(0.25, 1, 0.3, 1) forwards; }
        
        @keyframes sway-slow { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        
        /* THAY ĐỔI: Chuyển hoa từ lắc qua lắc lại sang chuyển động lên xuống */
        @keyframes float-vertical { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes float-up-down { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes float-up-down-small { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

        @keyframes sparkle {
           0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
           50% { opacity: 0.9; transform: scale(1) rotate(90deg); filter: drop-shadow(0 0 4px rgba(255,255,255,0.9)); }
        }
        .animate-sparkle { animation: sparkle 2.5s ease-in-out infinite; }

        @keyframes music-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes music-pulse { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.15); opacity: 1; box-shadow: 0 0 15px rgba(140, 122, 107, 0.6); } }
        .animate-music-on { animation: music-rotate 4s linear infinite, music-pulse 2s ease-in-out infinite; }

        @keyframes spin-record { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin-record { animation: spin-record 3s linear infinite; }

        @keyframes float-note {
            0% { transform: translate(0, 0) scale(0.8) rotate(0deg); opacity: 0; }
            30% { opacity: 0.8; }
            100% { transform: translate(-50px, -80px) scale(1.5) rotate(-30deg); opacity: 0; }
        }
        .animate-float-note { animation: float-note 4s ease-out infinite; }

        /* KEYFRAMES CHO CHUYỂN CẢNH MỞ ĐÔI (Split Transition) */
        @keyframes split-up { 
            0% { transform: translateY(0); opacity: 1; } 
            100% { transform: translateY(-100%); opacity: 0; } 
        }
        @keyframes split-down { 
            0% { transform: translateY(0); opacity: 1; } 
            100% { transform: translateY(100%); opacity: 0; } 
        }
        .animate-split-up { animation: split-up 1s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-split-down { animation: split-down 1s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

        .custom-scrollbar::-webkit-scrollbar { width: 0px; background: transparent; }
        .art-paper-bg {
           background-color: #F8F4ED;
           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
      `}} />

      {/* THAY ĐỔI: Chỉnh sửa màn hình chào với bộ đếm phần trăm */}
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDFBF7] transition-all duration-1000 ease-in-out ${showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <div className="flex flex-col items-center justify-center text-center px-6">
            <span className="text-[#8C7A6B] text-4xl mb-4 animate-bounce">❦</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#5C4F44] italic mb-6 leading-relaxed">Kết nối trái tim Loading...</h2>
            <div className="relative flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#8C7A6B] rounded-full animate-ping"></div>
                <div className="w-1.5 h-1.5 bg-[#8C7A6B] rounded-full animate-ping delay-150 ml-1.5"></div>
            </div>
            {/* Bộ đếm phần trăm */}
            <div className="mt-8 text-xl font-sans font-bold text-[#8C7A6B] tracking-widest">{loadingPercentage}%</div>
         </div>
      </div>

      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-black/40 text-white px-5 py-2.5 rounded-full backdrop-blur-sm text-[10px] md:text-[11px] uppercase tracking-widest transition-opacity duration-1000 pointer-events-none flex items-center gap-2 shadow-lg ${isAutoScrolling ? 'opacity-100' : 'opacity-0'}`}>
          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
          Chạm vào thiệp để Dừng / Cuộn
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[30]">
          {PARTICLES.map((p) => (
            <div key={`bg-${p.id}`} className="absolute top-[-5%]" style={{ left: p.left, width: p.size, height: p.size, animation: `fall ${p.duration} linear infinite`, animationDelay: p.delay }}>
              <svg viewBox="0 0 24 24" fill="#FFC0CB" className="w-full h-full animate-heart opacity-70" style={{ animationDelay: p.delay, overflow: 'visible' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
          ))}
      </div>

      {/* TỔ HỢP THIỆP */}
      <div className="w-full h-[100dvh] flex justify-center items-center p-0 md:p-6 relative">
          
          {/* === ICON NHẠC KHI ĐÃ VÀO THIỆP === */}
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
              
              {/* =========================================================
                  CẢNH GRAMOPHONE (BIRD'S-EYE VIEW - CHI TIẾT SIÊU MƯỢT)
                 ========================================================= */}
              {cardState === 'gramophone' && (
              <div className="absolute inset-0 w-full h-full bg-[#FDFBF7] z-[60] flex flex-col items-center justify-center">
                  <LuxuryCorner className="top-4 left-4" />
                  <LuxuryCorner className="top-4 right-4 rotate-90" />
                  <LuxuryCorner className="bottom-4 right-4 rotate-180" />
                  <LuxuryCorner className="bottom-4 left-4 -rotate-90" />

                  {/* KHỐI MÁY PHÁT NHẠC (Phần trên - split up) */}
                  <div className={`relative w-72 h-80 mx-auto mt-12 mb-4 drop-shadow-2xl flex items-center justify-center transition-transform duration-[1200ms] ease-in-out origin-center
                      ${gramophoneStage === 'end' ? 'animate-split-up' : ''}
                  `}>
                      
                      {/* 1. Hộp gỗ (Đế) */}
                      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-b from-[#8b5a2b] to-[#4a2e1b] rounded-b-xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] border-t-[8px] border-[#a06b3a] z-10 flex justify-center">
                          <div className="absolute -bottom-2 left-6 w-5 h-4 bg-gradient-to-b from-[#3a2210] to-[#1a0f05] rounded-b-lg shadow-md"></div>
                          <div className="absolute -bottom-2 right-6 w-5 h-4 bg-gradient-to-b from-[#3a2210] to-[#1a0f05] rounded-b-lg shadow-md"></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-8 bg-gradient-to-r from-[#d4af37] via-[#fff8dc] to-[#aa801e] rounded-sm shadow-md border border-[#8b6508] flex items-center justify-center">
                              <div className="w-16 h-5 border border-[#8b6508]/40 flex items-center justify-center gap-3">
                                  <div className="w-1.5 h-1.5 bg-[#8b6508] rounded-full shadow-inner"></div>
                                  <div className="w-1.5 h-1.5 bg-[#8b6508] rounded-full shadow-inner"></div>
                              </div>
                          </div>
                      </div>

                      {/* 2. Đĩa than */}
                      <div className={`absolute bottom-[92px] left-1/2 -translate-x-1/2 w-52 h-52 rounded-full bg-[#111] shadow-[0_15px_25px_rgba(0,0,0,0.6)] border-[4px] border-[#2c2c2c] z-20 flex items-center justify-center origin-center
                           ${gramophoneStage >= 'playing' ? 'animate-spin-record' : ''}`}
                           style={{ backgroundImage: 'repeating-radial-gradient(circle, #111 0, #111 3px, #2a2a2a 4px, #111 5px)' }}>
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/10 to-white/0 transform rotate-45 pointer-events-none"></div>
                          <div className="w-16 h-16 bg-gradient-to-br from-[#c4a682] to-[#8C7A6B] rounded-full flex flex-col items-center justify-center border-2 border-[#5C4F44] shadow-inner relative">
                              <span className="text-[6px] uppercase tracking-widest text-[#4A3C31] font-bold mt-1">Wedding</span>
                              <span className="text-[10px] font-serif text-[#4A3C31] italic">Hải & Trung</span>
                              <div className="w-3 h-3 bg-[#000] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-sm border border-gray-700"></div>
                          </div>
                      </div>

                      {/* 3. Cần kim (Tonearm) */}
                      <div className={`absolute bottom-[90px] -right-[5px] w-24 h-40 z-30 transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-[bottom_right] 
                          ${gramophoneStage >= 'needleIn' ? 'rotate-[-32deg]' : 'rotate-12'}`}>
                          <div className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#aa801e] rounded-full shadow-lg border border-[#8b6508] z-10 flex items-center justify-center">
                              <div className="w-5 h-5 bg-gradient-to-br from-[#fff8dc] to-[#d4af37] rounded-full shadow-inner"></div>
                          </div>
                          <div className="absolute bottom-5 right-4 w-[6px] h-36 bg-gradient-to-r from-[#d4af37] to-[#aa801e] rounded-full shadow-md origin-bottom transform -rotate-12"></div>
                          <div className="absolute top-[8px] right-[24px] w-7 h-12 bg-gradient-to-br from-[#333] to-[#111] rounded-sm shadow-md transform rotate-[70deg] border border-[#555] flex flex-col items-center justify-end pb-1">
                              <div className="w-5 h-1 bg-red-800 rounded-sm mb-1 shadow-inner"></div>
                              <div className="w-0.5 h-2.5 bg-gray-400"></div>
                          </div>
                      </div>

                      {/* 4. Loa kèn vàng (Brass Horn) - Bird's-eye view scale nhẹ cho đúng phối cảnh */}
                      <div className="absolute -top-6 -right-16 w-64 h-64 z-0 pointer-events-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] transform -rotate-[15deg] scale-x-[-1]">
                          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                              <defs>
                                  <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor="#fff8dc"/>
                                      <stop offset="25%" stopColor="#d4af37"/>
                                      <stop offset="50%" stopColor="#8b6508"/>
                                      <stop offset="85%" stopColor="#d4af37"/>
                                      <stop offset="100%" stopColor="#4a3500"/>
                                  </linearGradient>
                                  <radialGradient id="horn-depth" cx="45%" cy="45%" r="55%">
                                      <stop offset="0%" stopColor="#1a1100"/>
                                      <stop offset="60%" stopColor="#8b6508"/>
                                      <stop offset="100%" stopColor="#d4af37"/>
                                  </radialGradient>
                              </defs>
                              <path d="M40,180 Q20,130 50,90 C80,50 120,20 180,10 C160,50 140,80 110,120 C80,160 60,170 40,180 Z" fill="url(#brass-grad)"/>
                              <ellipse cx="150" cy="40" rx="38" ry="75" transform="rotate(50 150 40)" fill="url(#horn-depth)" stroke="url(#brass-grad)" strokeWidth="6"/>
                          </svg>
                      </div>
                      
                      {/* Nốt nhạc bay ra khi đang phát */}
                      {gramophoneStage >= 'playing' && (
                          <div className="absolute inset-0 pointer-events-none z-40">
                              <div className="absolute top-10 right-20 text-[#d4af37] text-2xl animate-float-note opacity-0 drop-shadow-md" style={{ animationDelay: '0s' }}>♪</div>
                              <div className="absolute top-24 right-10 text-[#d4af37] text-xl animate-float-note opacity-0 drop-shadow-md" style={{ animationDelay: '1.5s' }}>♫</div>
                              <div className="absolute top-4 right-12 text-[#d4af37] text-3xl animate-float-note opacity-0 drop-shadow-md" style={{ animationDelay: '3s' }}>♬</div>
                          </div>
                      )}
                  </div>

                  {/* KHỐI VĂN BẢN Seq (Phần dưới - split down) */}
                  <div className={`relative mt-2 h-32 flex flex-col items-center w-full px-6 transition-transform duration-[1200ms] ease-in-out
                      ${gramophoneStage === 'end' ? 'animate-split-down' : ''}
                  `}>
                    {/* THAY ĐỔI: Sử dụng Sans font cho cả 3 câu văn bản chào mừng */}
                    <p className={`absolute top-0 transition-all duration-1000 ease-out text-lg font-sans italic text-[#8C7A6B] font-bold 
                        ${gramophoneStage >= 'text1' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      ❦ Xin chào bạn,... ❦
                    </p>
                    <p className={`absolute top-12 transition-all duration-1000 ease-out text-[15px] font-sans tracking-wide leading-relaxed text-center font-medium
                        ${gramophoneStage >= 'text2' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      Cảm ơn bạn đã đến với đám cưới của chúng tôi!
                    </p>
                    <p className={`absolute top-24 transition-all duration-1000 ease-out text-[15px] font-sans tracking-widest font-bold text-[#8C7A6B] uppercase
                        ${gramophoneStage >= 'text3' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      Xin cảm ơn
                    </p>
                  </div>
              </div>
              )}

              {/* === BÌA THIỆP === */}
              {cardState !== 'done' && cardState !== 'gramophone' && (
              <div 
                  className={`absolute inset-0 w-full h-full bg-[#FDFBF7] z-50 overflow-hidden flex flex-col items-center justify-center text-center px-4 md:px-6 
                      ${cardState === 'opening' ? 'rotate-y-[-110deg] opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]' : ''}
                  `}
                  style={{ transformOrigin: 'left center' }}
              >
                  <LuxuryCorner className="top-4 left-4" />
                  <LuxuryCorner className="top-4 right-4 rotate-90" />
                  <LuxuryCorner className="bottom-4 right-4 rotate-180" />
                  <LuxuryCorner className="bottom-4 left-4 -rotate-90" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 overflow-hidden">
                     <div className="absolute flex items-center justify-center">
                        <div className="absolute w-[220px] h-[220px] border-[1px] border-[#D5C7B8] rounded-full opacity-40 -translate-x-4"></div>
                        <div className="absolute w-[220px] h-[220px] border-[1px] border-[#D5C7B8] rounded-full opacity-40 translate-x-4"></div>
                     </div>
                     <div className="text-[150px] font-serif text-[#D5C7B8] opacity-20 select-none">囍</div>
                  </div>
                  
                  {/* THAY ĐỔI: Các hoa lắc qua lắc lại -> chuyển động lên xuống */}
                  <div className="absolute inset-x-0 bottom-0 pointer-events-none z-[15]">
                     {FOREST_FLOWERS.map((flower) => (
                        <div key={flower.id} className="absolute" style={{ left: flower.left, bottom: flower.bottom, width: flower.width, transform: `rotate(${flower.rotate})`, animation: `float-vertical ${flower.duration} ease-in-out infinite`, animationDelay: flower.delay }}>
                            <img src={flower.src} alt="Flower" className="w-full h-auto origin-bottom opacity-90" />
                        </div>
                     ))}
                  </div>

                  {/* THAY ĐỔI: Hiệu ứng mở thiệp, trái tim bung ra được cho xuất hiện lại */}
                  {cardState === 'bursting' && (
                      <div className="absolute top-1/2 left-1/2 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-40 w-full h-full">
                          {GENTLE_CONFETTI.map((p) => (
                              <div key={p.id} className="absolute animate-gentle-burst opacity-0" style={{'--tx': `${p.tx}px`, '--ty': `${p.ty}px`, left: '50%', top: '50%', width: p.shape === 'heart' ? '24px' : '18px', color: p.color } as React.CSSProperties}>
                                  {p.shape === 'heart' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>}
                                  {p.shape === 'star' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>}
                                  {p.shape === 'bubble' && <div className="w-3 h-3 bg-currentColor rounded-full opacity-60"></div>}
                              </div>
                          ))}
                      </div>
                  )}

                  <div className={`relative z-40 flex flex-col items-center justify-center pt-8 pb-12 w-full transition-opacity duration-300 ${cardState === 'bursting' ? 'opacity-0' : 'opacity-100'}`}>
                    
                    <div className="relative mb-6 mt-2">
                        <div className="relative z-10 bg-[#8C7A6B] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-luxury-btn group">
                          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-serif text-[#5C4F44] font-light mb-2">Đỗ Trung</h1>
                    <span className="text-2xl font-serif text-[#8C7A6B] italic my-2">&</span>
                    <h1 className="text-5xl md:text-6xl font-serif text-[#5C4F44] font-light mt-2">Đặng Hải</h1>

                    <div className="flex items-center gap-2 my-6 text-[#A09386] pointer-events-none">
                      <span className="w-12 h-[1px] bg-[#D5C7B8]"></span>
                      <span className="text-xl font-serif">❦</span>
                      <span className="w-12 h-[1px] bg-[#D5C7B8]"></span>
                    </div>

                    <p className="text-[#8C7A6B] text-lg md:text-xl font-serif tracking-wide mb-12">3 tháng 1, 2027</p>

                    <button onClick={(e) => { e.stopPropagation(); handleOpenCard(); }} className="px-10 md:px-12 py-3.5 md:py-4 bg-[#8C7A6B] text-white text-[13px] md:text-[14px] uppercase tracking-widest rounded-full shadow-luxury-btn hover:bg-[#7A6A5E] transition-all duration-300 relative z-50">
                        Mở thiệp
                    </button>
                  </div>
              </div>
              )}

              {/* === RUỘT THIỆP (Z-10 khi idle, Z-50 khi done) === */}
              <div 
                  ref={scrollRef}
                  className={`absolute inset-0 w-full h-full bg-[#FDFBF7] relative custom-scrollbar
                      ${cardState === 'done' ? 'z-50 overflow-y-auto pb-24' : 'z-10 overflow-hidden'}
                  `}
                  onClick={toggleAutoScroll}
              >
                 <WatermarkPurpleFlowers />

                 <div className="relative w-full flex flex-col items-center pt-24 z-20">
                     <p className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-[#8C7A6B] font-medium mb-3">The Wedding Of</p>
                     <h2 className="text-4xl md:text-5xl font-serif italic text-[#5C4F44] mb-12">Đỗ Trung <span className="font-serif italic text-[#8C7A6B] mx-2">&</span> Đặng Hải</h2>
                     
                     {/* BỨC ẢNH ĐẦU TIÊN */}
                     <div className="relative w-[88%] max-w-[340px] bg-white p-3 md:p-4 pb-16 shadow-xl rotate-[2deg] mx-auto mb-32 mt-4">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#DBCBB5] opacity-85 rotate-[-3deg] shadow-sm z-10"></div>
                        <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden relative">
                            <img src="/AnhT1.jpg" alt="Wedding Photo" className="w-full h-full object-cover" onError={(e) => { if (!e.currentTarget.src.includes('.png')) e.currentTarget.src = "/AnhT1.png"; }} />
                            <div className="absolute inset-0 pointer-events-none z-10">
                                {DRESS_SPARKLES.map((sparkle) => (
                                    <svg key={`sp-${sparkle.id}`} className="absolute text-white animate-sparkle drop-shadow-md" style={{ bottom: sparkle.bottom, left: sparkle.left, width: sparkle.size, height: sparkle.size, animationDelay: sparkle.delay }} viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        <img src="/Con_dau1.png" alt="Wax Seal" className="absolute -bottom-8 -right-6 w-20 h-20 z-30 drop-shadow-md object-contain" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Con_dau1.jpg"; }} />
                        
                        {/* THAY ĐỔI: Ảnh đầu thêm lại phần hoa dưới góc trái, lắc -> lên xuống */}
                        <div className="absolute -bottom-[60px] -left-[40px] z-30 pointer-events-none origin-bottom-left" style={{ animation: 'float-up-down 7s ease-in-out infinite' }}>
                            <img src="/HoaT1.png" alt="Hoa" className="w-[150px] h-auto" style={{ filter: 'drop-shadow(4px 10px 8px rgba(0,0,0,0.3))' }} onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/HoaT1.jpg"; }} />
                        </div>
                     </div>

                     {/* THẺ THÔNG TIN LỄ CƯỚI */}
                     <div className="relative w-[90%] max-w-[400px] art-paper-bg rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.08)] mt-12 mb-8 border border-[#EAE3DB]">
                         
                         {/* THAY ĐỔI: Thông tin lễ cưới cho lại phần hoa bên trên góc phải, lắc -> lên xuống */}
                         <div className="absolute top-[-50px] -right-[25px] z-30 pointer-events-none origin-top-right" style={{ animation: 'float-up-down 6s ease-in-out infinite' }}>
                             <img src="/goc1.png" alt="Hoa goc" className="w-[140px] h-auto opacity-95" style={{ filter: 'drop-shadow(-4px 8px 6px rgba(0,0,0,0.25))' }} onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/goc1.jpg"; }} />
                         </div>
                         
                         <div className="px-6 pt-12 pb-16 flex flex-col items-center text-center relative z-20 w-full">
                             <h3 className="text-[#5C4F44] font-serif text-xl tracking-[0.25em] uppercase font-bold mb-8">Thông Tin Lễ Cưới</h3>

                             <div className="w-full flex justify-between items-start text-[#5C4F44] text-[11px] md:text-[12px] mb-8 relative px-2">
                                 <div className="w-[45%] flex flex-col items-center">
                                     <span className="text-[#8C7A6B] mb-1.5 uppercase tracking-[0.1em] text-[9px]">Ông Bà</span>
                                     <span className="font-bold mb-1">Võ Nhật Minh</span>
                                     <span className="font-bold mb-2">Trần Thu Thảo</span>
                                     <span className="text-[#8C7A6B] leading-relaxed opacity-90">Quận 1, TP. HCM</span>
                                 </div>
                                 <div className="w-[45%] flex flex-col items-center">
                                     <span className="text-[#8C7A6B] mb-1.5 uppercase tracking-[0.1em] text-[9px]">Ông Bà</span>
                                     <span className="font-bold mb-1">Lê Văn Thành</span>
                                     <span className="font-bold mb-2">Phạm Thị Lan</span>
                                     <span className="text-[#8C7A6B] leading-relaxed opacity-90">Quận 3, TP. HCM</span>
                                 </div>
                             </div>

                             <p className="text-[#8C7A6B] text-[10px] md:text-[11px] uppercase tracking-[0.15em] leading-loose mb-6">Trân trọng báo tin<br/>Lễ thành hôn của con chúng tôi</p>

                             <div className="w-full flex flex-col items-center">
                                <h1 className="text-4xl md:text-5xl font-serif mb-1 text-[#5C4F44]">Đỗ Trung</h1>
                                <span className="text-[#8C7A6B] text-[8px] uppercase tracking-[0.3em] mt-2 mb-4">Trưởng Nam</span>
                                <span className="text-2xl font-serif text-[#C3B09B] italic my-1">❦</span>
                                <h1 className="text-4xl md:text-5xl font-serif mt-3 mb-1 text-[#5C4F44]">Đặng Hải</h1>
                                <span className="text-[#8C7A6B] text-[8px] uppercase tracking-[0.3em] mt-2 mb-8">Út Nữ</span>
                             </div>

                             <p className="text-[#5C4F44] text-[11px] md:text-[12px] uppercase tracking-[0.15em] leading-loose mb-4">Lễ thành hôn được cử hành tại<br/><span className="font-bold text-base md:text-lg">Tư Gia</span><br/>Vào lúc</p>
                             <div className="text-3xl font-serif text-[#5C4F44] mb-6">09:00</div>

                             <div className="flex items-center justify-center gap-4 text-[#5C4F44] mb-4">
                                 <span className="uppercase tracking-[0.2em] text-[10px] font-medium">Chủ Nhật</span>
                                 <div className="h-6 w-[1px] bg-[#C3B09B]"></div>
                                 <span className="text-4xl font-serif">03</span>
                                 <div className="h-6 w-[1px] bg-[#C3B09B]"></div>
                                 <span className="uppercase tracking-[0.2em] text-[10px] font-medium">Tháng 01</span>
                             </div>
                             <span className="text-lg font-serif text-[#5C4F44] mb-2">2027</span>
                             <span className="text-[#8C7A6B] text-[10px] uppercase tracking-[0.1em] opacity-90">(Tức ngày 26 tháng 11 năm Bính Ngọ)</span>
                         </div>
                     </div>

                     {/* KHU VỰC ALBUM ẢNH (2x2 grid như cũ) */}
                     {/* THAY ĐỔI: Phục hồi phần album cho phần hiển thị nhiều ảnh như cũ (lưới 2x2) */}
                     <FadeIn delay={100} className="relative w-full flex flex-col items-center mt-12 mb-16 z-20">
                         
                         <h3 className="text-[#5C4F44] font-serif text-xl tracking-[0.25em] uppercase font-bold mb-10 text-center drop-shadow-sm">Album Ảnh</h3>
                         
                         <div className="grid grid-cols-2 gap-3 w-[90%] max-w-[400px]">
                            {ALBUM_IMAGES.slice(0, 4).map((src, idx) => (
                                <div 
                                    key={idx} 
                                    className="relative aspect-[4/5] overflow-hidden shadow-sm cursor-pointer bg-gray-200 rounded-sm border-2 border-white"
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        setLightboxIndex(idx); 
                                    }}
                                >
                                    <img 
                                        src={src} 
                                        alt={`Album ${idx + 1}`} 
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                                        onError={(e) => { if (!e.currentTarget.src.includes('.png')) e.currentTarget.src = src.replace('.jpg', '.png'); }} 
                                    />
                                    
                                    {/* Lớp phủ đen và chữ +1 ở bức ảnh thứ 4 */}
                                    {idx === 3 && ALBUM_IMAGES.length > 4 && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors hover:bg-black/30">
                                            <span className="text-white text-3xl font-sans font-light tracking-widest">+{ALBUM_IMAGES.length - 4 + 1}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                         </div>
                     </FadeIn>
                 </div>
              </div>

          </div>
      </div>
    </div>
  );
}