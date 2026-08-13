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

const DRESS_SPARKLES = [
  { id: 1, bottom: "10%", left: "30%", delay: "0s", size: "12px" },
  { id: 2, bottom: "25%", left: "55%", delay: "0.5s", size: "8px" },
  { id: 3, bottom: "15%", left: "70%", delay: "1.2s", size: "14px" },
  { id: 4, bottom: "35%", left: "45%", delay: "0.8s", size: "10px" },
  { id: 5, bottom: "5%", left: "50%", delay: "1.5s", size: "16px" },
];

// Tạo mảng hạt màu bung nhẹ nhàng (Chỉ dùng tone Hồng nhạt/Trắng lãng mạn)
const GENTLE_CONFETTI = Array.from({ length: 30 }).map((_, i) => {
  const shapes = ['heart', 'star', 'bubble'];
  const colors = ['#FFC0CB', '#FFB6C1', '#FFD1DC', '#FFE4E1', '#FFF0F5', '#FFFFFF']; // Tone hồng nhạt
  return {
    id: i,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    tx: (Math.random() - 0.5) * 200, 
    ty: (Math.random() - 0.5) * 200 - 50, 
    scale: 0.6 + Math.random() * 1,
    delay: Math.random() * 0.3 
  };
});

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

const WaterColorLeafBranch = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 200 400" className={`pointer-events-none drop-shadow-md ${className}`} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 400 Q80 250 120 0" stroke="#8A9A86" strokeWidth="3" fill="none" />
    <path d="M105 320 Q50 300 20 250 Q60 260 105 320" fill="#A9B5A3" opacity="0.8" />
    <path d="M98 260 Q150 240 180 180 Q140 210 98 260" fill="#8A9A86" opacity="0.8" />
    <path d="M110 200 Q40 160 10 90 Q60 130 110 200" fill="#C2C9BE" opacity="0.9" />
    <path d="M105 130 Q160 100 190 30 Q140 70 105 130" fill="#A9B5A3" opacity="0.8" />
    <path d="M115 60 Q70 20 50 -30 Q80 0 115 60" fill="#8A9A86" opacity="0.7" />
  </svg>
);

const WatermarkLeaves = () => (
  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.06] z-0" viewBox="0 0 1000 2000" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M -50 500 C 150 300, 200 100, 150 -50" stroke="#5C4F44" strokeWidth="15" fill="none" />
    <path d="M -20 400 C 100 350, 250 450, 300 300 C 250 200, 100 250, -20 400 Z" fill="#5C4F44" />
    <path d="M 50 250 C 150 150, 300 200, 350 50 C 250 0, 150 50, 50 250 Z" fill="#5C4F44" />
    <path d="M 120 100 C 200 0, 350 0, 400 -100 C 300 -150, 200 -50, 120 100 Z" fill="#5C4F44" />
    <path d="M 1050 1500 C 850 1700, 800 1900, 850 2050" stroke="#5C4F44" strokeWidth="15" fill="none" />
    <path d="M 1020 1600 C 900 1650, 750 1550, 700 1700 C 750 1800, 900 1750, 1020 1600 Z" fill="#5C4F44" />
  </svg>
);

// Component cảm biến hiện chữ THÔNG THƯỜNG
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

// Component TÊN CÔ DÂU CHÚ RỂ (Bùng nổ sao trắng ấm rồi quét sáng 1 lần)
const ExplosiveNameReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const [particles] = useState(() => Array.from({ length: 30 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 30 + (Math.random() * 0.5);
      const distance = 60 + Math.random() * 80; 
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const size = 2 + Math.random() * 4; 
      const delayObj = Math.random() * 0.2; 
      return { id: i, tx, ty, size, delayObj };
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 } 
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative w-full flex flex-col items-center ${className}`}>
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
         {isVisible && particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-[#FFF3E3] opacity-0 animate-particle-burst"
              style={{
                width: p.size, height: p.size,
                '--tx': `${p.tx}px`, '--ty': `${p.ty}px`,
                boxShadow: '0 0 10px 2px rgba(255, 243, 227, 0.8)',
                animationDelay: `${delay + p.delayObj * 1000}ms`
              } as React.CSSProperties}
            />
         ))}
      </div>

      <div className={`relative z-10 flex flex-col items-center opacity-0 w-full ${isVisible ? 'animate-text-pop' : ''}`} style={{ animationDelay: `${delay}ms` }}>
        {children}
      </div>
    </div>
  );
};

// ==========================================
// 2. TRANG CHÍNH
// ==========================================
export default function WeddingCardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true); 
  
  // Trạng thái luồng chuyển cảnh
  const [cardState, setCardState] = useState<'idle' | 'scaling' | 'bursting' | 'opening' | 'done'>('idle');
  const [isInnerVisible, setIsInnerVisible] = useState(false); 
  
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let accumulator = 0;
    let lastTime = performance.now();

    const performScroll = (time: number) => {
      if (isAutoScrolling) {
        const deltaTime = time - lastTime;
        lastTime = time;

        accumulator += deltaTime * 0.04;

        if (accumulator >= 1) {
          const step = Math.floor(accumulator);
          window.scrollBy(0, step);
          accumulator -= step;
        }
        animationFrameId = requestAnimationFrame(performScroll);
      }
    };

    if (isAutoScrolling) {
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(performScroll);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoScrolling]);

  // ==========================================
  // KỊCH BẢN CHUYỂN CẢNH MỚI: Tỷ lệ thật -> Nổ tim hồng nhạt -> Phóng to -> Lật 3D biến mất
  // ==========================================
  const handleOpenCard = () => {
    if (cardState !== 'idle') return;
    
    // 1. Ấn nút -> Bìa thiệp từ từ phóng to bằng kích thước thật (max-w 460px)
    setCardState('scaling');
    
    // 2. Tim đập & Pháo hoa nổ nhẹ nhàng lơ lửng (Tone hồng nhạt lãng mạn)
    setTimeout(() => {
      setCardState('bursting');
    }, 800); 

    // 3. Đổi hiệu ứng: Bìa lật 3D sang trái và mờ dần biến mất
    setTimeout(() => {
      setCardState('opening'); 
      setIsInnerVisible(true); // Ruột thiệp hiện sẵn phía sau
    }, 2500);

    // 4. Hoàn tất dọn dẹp và tự động cuộn chữ
    setTimeout(() => {
      setCardState('done');
      setIsAutoScrolling(true);
      setShowHint(true);
      setTimeout(() => setShowHint(false), 4500); 
    }, 3800); 
  };

  const toggleAutoScroll = () => {
    if (cardState === 'done') setIsAutoScrolling(prev => !prev);
  };

  if (!isMounted) return <div className="min-h-[100dvh] bg-[#8C8076]"></div>;

  return (
    // Đã thêm flex flex-col items-center mx-auto để luôn căn giữa mọi màn hình
    <div className={`relative selection:bg-[#E5D9CC] selection:text-[#4A3C31] font-sans text-[#5C4F44] bg-[#8C8076] cursor-pointer w-full flex flex-col items-center overflow-x-hidden mx-auto ${cardState !== 'done' ? 'h-[100dvh] overflow-y-hidden' : 'min-h-[100dvh]'}`} onClick={toggleAutoScroll}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        
        @keyframes fall { 0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(110vh) translateX(-20px) rotate(360deg); opacity: 0; } }
        @keyframes heart-blink { 0%, 100% { stroke: transparent; stroke-width: 0px; transform: scale(1); opacity: 0.5; } 50% { stroke: #FF99C2; stroke-width: 1.5px; transform: scale(1.15); opacity: 0.85; } }
        .animate-heart { animation: heart-blink 2s ease-in-out infinite; }

        /* Icon đập nhịp tim */
        @keyframes fast-beat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.3); }
            50% { transform: scale(1); }
            75% { transform: scale(1.3); }
        }
        .animate-fast-beat { animation: fast-beat 1.5s ease-in-out forwards; }

        /* Hạt nổ bung màu sắc NHẸ NHÀNG */
        @keyframes gentle-burst {
           0% { opacity: 0; transform: translate(0, 0) scale(0); }
           20% { opacity: 1; transform: translate(calc(var(--tx) * 0.4), calc(var(--ty) * 0.4)) scale(var(--s)); }
           70% { opacity: 0.8; }
           100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
        }
        .animate-gentle-burst { animation: gentle-burst 2.5s cubic-bezier(0.2, 0.8, 0.3, 1) forwards; }
        
        @keyframes sway-forest { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
        @keyframes sway-slow { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(3deg); } }

        @keyframes sparkle {
           0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
           50% { opacity: 0.9; transform: scale(1) rotate(90deg); filter: drop-shadow(0 0 4px rgba(255,255,255,0.9)); }
        }
        .animate-sparkle { animation: sparkle 2.5s ease-in-out infinite; }

        @keyframes particle-burst {
           0% { opacity: 0; transform: translate(0, 0) scale(0.5); }
           15% { opacity: 1; transform: translate(calc(var(--tx) * 0.3), calc(var(--ty) * 0.3)) scale(1.5); }
           100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
        }
        .animate-particle-burst { animation: particle-burst 1.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards; }

        @keyframes text-pop {
           0% { opacity: 0; transform: scale(0.85); filter: blur(3px); }
           40% { opacity: 1; transform: scale(1.05); filter: blur(0px); }
           100% { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        .animate-text-pop { animation: text-pop 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        /* HIỆU ỨNG QUÉT ÁNH SÁNG 1 LẦN */
        @keyframes text-sweep {
           0% { background-position: -150% center; }
           100% { background-position: 150% center; }
        }
        .text-sweep-once {
           background: linear-gradient(to right, #5C4F44 35%, #FDE4C3 50%, #5C4F44 65%);
           background-size: 300% auto;
           background-position: -150% center; 
           color: transparent;
           -webkit-background-clip: text;
           background-clip: text;
        }
        .animate-text-pop .text-sweep-once {
           animation: text-sweep 1.8s ease-in-out 1.2s forwards;
        }
      `}} />

      {/* MÀN HÌNH CHÀO */}
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDFBF7] transition-all duration-1000 ease-in-out ${showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <div className="flex flex-col items-center justify-center text-center px-6">
            <span className="text-[#8C7A6B] text-4xl mb-4 animate-bounce">❦</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#5C4F44] italic mb-6 leading-relaxed">Chào mừng bạn đến với<br/>Lễ Cưới của chúng tôi</h2>
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#8C7A6B] rounded-full animate-ping"></div>
                <p className="text-[10px] md:text-xs text-[#8C7A6B] tracking-[0.3em] uppercase">Đang tải thiệp mời</p>
                <div className="w-1.5 h-1.5 bg-[#8C7A6B] rounded-full animate-ping delay-150"></div>
            </div>
         </div>
      </div>

      {/* GỢI Ý DỪNG CUỘN */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-black/40 text-white px-5 py-2.5 rounded-full backdrop-blur-sm text-[10px] md:text-[11px] uppercase tracking-widest transition-opacity duration-1000 pointer-events-none flex items-center gap-2 shadow-lg ${showHint ? 'opacity-100' : 'opacity-0'}`}>
          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
          Chạm màn hình để Dừng / Cuộn
      </div>

      {/* TRÁI TIM RƠI NỀN BÊN DƯỚI (Z-30) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[30]">
          {PARTICLES.map((p) => (
            <div key={`bg-${p.id}`} className="absolute top-[-5%]" style={{ left: p.left, width: p.size, height: p.size, animation: `fall ${p.duration} linear infinite`, animationDelay: p.delay }}>
              <svg viewBox="0 0 24 24" fill="#FFC0CB" className="w-full h-full animate-heart opacity-70" style={{ animationDelay: p.delay, overflow: 'visible' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
          ))}
      </div>

      {/* ============================================== */}
      {/* TỔ HỢP THIỆP CHÍNH CĂN GIỮA */}
      {/* ============================================== */}
      <div className="w-full flex justify-center py-10 min-h-screen">
          <div className="relative w-[92%] sm:w-full max-w-[460px] mx-auto flex flex-col items-center" style={{ perspective: '2000px' }}>
              
              {/* === BÌA THIỆP (NẰM TRÊN CÙNG) === */}
              {/* Lật 3D kết hợp opacity=0 để tan biến hoàn toàn, không lòi ruột */}
              {cardState !== 'done' && (
              <div 
                  className={`absolute top-0 left-0 right-0 mx-auto aspect-[3/4] min-h-[550px] bg-[#FDFBF7] shadow-2xl rounded-lg border border-[#EAE3DB] z-50 overflow-hidden
                      ${cardState === 'idle' ? 'scale-[0.85] max-w-[420px] transition-transform duration-500' : ''}
                      ${(cardState === 'scaling' || cardState === 'bursting') ? 'scale-100 max-w-[460px] transition-all duration-[1000ms] ease-in-out' : ''}
                      ${cardState === 'opening' ? 'scale-100 max-w-[460px] rotate-y-[-110deg] opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]' : ''}
                  `}
                  style={{
                      transformOrigin: 'left center' 
                  }}
              >
                  <LuxuryCorner className="top-4 left-4" />
                  <LuxuryCorner className="top-4 right-4 rotate-90" />
                  <LuxuryCorner className="bottom-4 right-4 rotate-180" />
                  <LuxuryCorner className="bottom-4 left-4 -rotate-90" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 overflow-hidden">
                     <div className="absolute flex items-center justify-center">
                        <div className="absolute w-[200px] h-[200px] border-[1px] border-[#D5C7B8] rounded-full opacity-40 -translate-x-4"></div>
                        <div className="absolute w-[200px] h-[200px] border-[1px] border-[#D5C7B8] rounded-full opacity-40 translate-x-4"></div>
                     </div>
                     <div className="text-[130px] font-serif text-[#D5C7B8] opacity-20 select-none">囍</div>
                  </div>
                  
                  <div className="absolute inset-x-0 bottom-0 pointer-events-none z-[15]">
                     {FOREST_FLOWERS.map((flower) => (
                        <div key={flower.id} className="absolute" style={{ left: flower.left, bottom: flower.bottom, width: flower.width, transform: `rotate(${flower.rotate})`, animation: `sway-forest ${flower.duration} ease-in-out infinite`, animationDelay: flower.delay }}>
                            <img src={flower.src} alt="Flower" className="w-full h-auto origin-bottom opacity-90" />
                        </div>
                     ))}
                  </div>

                  <div className="relative z-40 flex flex-col items-center justify-center text-center px-4 md:px-6 w-full h-full pb-20 md:pb-28 pt-6">
                    
                    {/* KHỐI CHỨA ICON & HIỆU ỨNG PHÁO HOA TONE HỒNG NHẠT */}
                    <div className="relative mb-4 mt-2">
                        {cardState !== 'idle' && cardState !== 'scaling' && GENTLE_CONFETTI.map((p) => (
                            <div key={`cf-${p.id}`} className="absolute top-1/2 left-1/2 pointer-events-none z-0" style={{ transform: 'translate(-50%, -50%)' }}>
                                <svg 
                                    className="animate-gentle-burst drop-shadow-sm"
                                    viewBox="0 0 24 24" 
                                    fill={p.color}
                                    style={{ 
                                        width: '20px', height: '20px',
                                        '--tx': `${p.tx}px`, '--ty': `${p.ty}px`, '--s': p.scale,
                                        animationDelay: `${p.delay}s`
                                    } as React.CSSProperties}
                                >
                                    {p.shape === 'heart' && <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>}
                                    {p.shape === 'star' && <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>}
                                    {p.shape === 'bubble' && <circle cx="12" cy="12" r="8" opacity="0.8"/>}
                                </svg>
                            </div>
                        ))}

                        <div className="relative z-10 bg-[#8C7A6B] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.15)] shrink-0">
                          <svg className={`w-4 h-4 md:w-5 md:h-5 text-white ${cardState === 'bursting' ? 'animate-fast-beat text-[#FF99C2]' : ''}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif text-[#5C4F44] font-light mb-1">Đỗ Trung</h1>
                    <span className="text-xl font-serif text-[#8C7A6B] italic my-1">&</span>
                    <h1 className="text-4xl md:text-5xl font-serif text-[#5C4F44] font-light mt-1">Đặng Hải</h1>

                    <div className="flex items-center gap-2 my-4 text-[#A09386] pointer-events-none">
                      <span className="w-10 h-[1px] bg-[#D5C7B8]"></span>
                      <span className="text-lg font-serif">❦</span>
                      <span className="w-10 h-[1px] bg-[#D5C7B8]"></span>
                    </div>

                    <p className="text-[#8C7A6B] text-base md:text-lg font-serif tracking-wide mb-1">3 tháng 1, 2027</p>
                    <p className="text-[#8C7A6B] text-xs md:text-sm mt-2 mb-8 md:mb-10 uppercase tracking-[0.2em] font-medium">Thân Mời</p>

                    <button onClick={(e) => { e.stopPropagation(); handleOpenCard(); }} className={`px-8 md:px-10 py-3 md:py-3.5 bg-[#8C7A6B] text-white text-[12px] md:text-[13px] uppercase tracking-widest rounded-full shadow-lg hover:bg-[#7A6A5E] transition-all duration-300 relative z-50 ${cardState !== 'idle' ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100'}`}>
                        Mở thiệp
                    </button>
                  </div>
              </div>
              )}

              {/* === RUỘT THIỆP (NẰM DƯỚI) === */}
              {isInnerVisible && (
              <div className="w-full bg-[#FDFBF7] shadow-2xl rounded-lg border border-[#EAE3DB] overflow-hidden relative z-10 pb-32 animate-fade-in mx-auto">
                 <WatermarkLeaves />

                 <div className="relative w-full flex flex-col items-center pt-24 z-20">
                     <FadeIn delay={100}>
                         <p className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-[#8C7A6B] font-medium mb-3">The Wedding Of</p>
                     </FadeIn>
                     
                     <FadeIn delay={300}>
                         <h2 className="text-4xl md:text-5xl font-serif italic text-[#5C4F44] mb-12">Đỗ Trung <span className="font-serif italic text-[#8C7A6B] mx-2">&</span> Đặng Hải</h2>
                     </FadeIn>
                     
                     <FadeIn delay={500}>
                         <div className="relative w-[88%] max-w-[340px] bg-white p-3 md:p-4 pb-16 shadow-xl rotate-[2deg] mx-auto">
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
                            
                            <div className="absolute -bottom-10 -left-12 w-40 z-20 pointer-events-none drop-shadow-lg" style={{ transform: 'rotate(-12deg)' }}>
                                <img src="/HoaT1.png" alt="Hoa" className="w-full h-auto origin-bottom-left" style={{ animation: 'sway-forest 6s ease-in-out infinite' }} onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/HoaT1.jpg"; }} />
                            </div>
                         </div>
                     </FadeIn>

                     <div className="relative w-[90%] max-w-[400px] bg-[#F5EFE6] rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.05)] mt-24 mb-10 border border-[#EAE3DB]">
                         <WaterColorLeafBranch className="absolute top-1/2 -left-[60px] -translate-y-1/2 w-[120px] h-[240px] z-30" style={{ animation: 'sway-slow 7s ease-in-out infinite', transformOrigin: 'bottom center' }} />
                         <div className="absolute -bottom-[60px] -right-[40px] w-[140px] z-30 pointer-events-none drop-shadow-lg" style={{ animation: 'sway-slow 8s ease-in-out infinite reverse', transformOrigin: 'bottom right' }}>
                            <img src="/HoaT1.png" alt="Hoa" className="w-full h-auto" style={{ transform: 'scaleX(-1) rotate(15deg)' }} onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/HoaT1.jpg"; }} />
                         </div>

                         <div className="px-6 py-14 flex flex-col items-center text-center relative z-20 w-full">
                             <FadeIn delay={100}>
                                <h3 className="text-[#5C4F44] font-serif text-lg tracking-[0.2em] uppercase font-bold mb-10">Thông Tin Lễ Cưới</h3>
                             </FadeIn>

                             <FadeIn delay={200}>
                                <div className="w-full flex justify-between items-start text-[#5C4F44] text-[10px] md:text-[11px] mb-10 relative px-2">
                                    <div className="w-[45%] flex flex-col items-center">
                                        <span className="text-[#8C7A6B] mb-1.5 uppercase tracking-[0.1em] text-[8px]">Ông Bà</span>
                                        <span className="font-bold mb-1">Võ Nhật Minh</span>
                                        <span className="font-bold mb-2">Trần Thu Thảo</span>
                                        <span className="text-[#8C7A6B] leading-relaxed">Quận 1, TP. HCM</span>
                                    </div>
                                    <div className="w-[45%] flex flex-col items-center">
                                        <span className="text-[#8C7A6B] mb-1.5 uppercase tracking-[0.1em] text-[8px]">Ông Bà</span>
                                        <span className="font-bold mb-1">Lê Văn Thành</span>
                                        <span className="font-bold mb-2">Phạm Thị Lan</span>
                                        <span className="text-[#8C7A6B] leading-relaxed">Quận 3, TP. HCM</span>
                                    </div>
                                </div>
                             </FadeIn>

                             <FadeIn delay={300}>
                                <p className="text-[#8C7A6B] text-[9px] md:text-[10px] uppercase tracking-[0.15em] leading-loose mb-8">Trân trọng báo tin<br/>Lễ thành hôn của con chúng tôi</p>
                             </FadeIn>

                             <ExplosiveNameReveal delay={200} className="w-full">
                                <h1 className="text-4xl md:text-5xl font-serif mb-2 text-sweep-once" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}>Đỗ Trung</h1>
                                <span className="text-[#8C7A6B] text-[8px] uppercase tracking-[0.3em] mt-2 mb-6">Trưởng Nam</span>
                                <span className="text-2xl font-serif text-[#C3B09B] italic my-2">❦</span>
                                <h1 className="text-4xl md:text-5xl font-serif mt-4 mb-2 text-sweep-once" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}>Đặng Hải</h1>
                                <span className="text-[#8C7A6B] text-[8px] uppercase tracking-[0.3em] mt-2 mb-12">Út Nữ</span>
                             </ExplosiveNameReveal>

                             <FadeIn delay={600}>
                                <p className="text-[#5C4F44] text-[10px] md:text-[11px] uppercase tracking-[0.15em] leading-loose mb-6 mt-2">Lễ thành hôn được cử hành tại<br/><span className="font-bold text-sm md:text-base">Tư Gia</span><br/>Vào lúc</p>
                                <div className="text-2xl font-serif text-[#5C4F44] mb-6">09:00</div>
                             </FadeIn>

                             <FadeIn delay={700}>
                                <div className="flex items-center justify-center gap-4 text-[#5C4F44] mb-4">
                                    <span className="uppercase tracking-[0.2em] text-[9px] font-medium">Chủ Nhật</span>
                                    <div className="h-6 w-[1px] bg-[#C3B09B]"></div>
                                    <span className="text-4xl font-serif">03</span>
                                    <div className="h-6 w-[1px] bg-[#C3B09B]"></div>
                                    <span className="uppercase tracking-[0.2em] text-[9px] font-medium">Tháng 01</span>
                                </div>
                                <span className="text-lg font-serif text-[#5C4F44] mb-2">2027</span>
                                <span className="text-[#8C7A6B] text-[9px] uppercase tracking-[0.1em]">(Tức ngày 26 tháng 11 năm Bính Ngọ)</span>
                             </FadeIn>

                         </div>
                     </div>

                     <FadeIn delay={300}>
                        <p className="mt-10 text-[#5C4F44] font-serif text-sm tracking-[0.3em] uppercase opacity-80">Album Ảnh</p>
                     </FadeIn>
                 </div>
              </div>
              )}

          </div>
      </div>

    </div>
  );
}