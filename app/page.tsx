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
  
  const [cardState, setCardState] = useState<'idle' | 'scaling' | 'bursting' | 'opening' | 'done'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenCard = () => {
    if (cardState !== 'idle') return;
    
    // 1. Phóng to bìa
    setCardState('scaling');
    
    // 2. Tim đập & Pháo hoa hồng nhạt
    setTimeout(() => {
      setCardState('bursting');
    }, 500); 

    // 3. Lật 3D thiệp (Rút ngắn thời gian đợi cho đỡ sốt ruột)
    setTimeout(() => {
      setCardState('opening'); 
    }, 1500);

    // 4. Mở xong: Trượt nhẹ bằng CSS Smooth Scroll gốc của trình duyệt (cực kỳ mượt, không giật trên mobile)
    setTimeout(() => {
      setCardState('done');
      if (scrollRef.current) {
        // Trượt xuống 380px để người dùng thấy ảnh cưới, phần còn lại họ sẽ tự vuốt
        scrollRef.current.scrollBy({ top: 380, behavior: 'smooth' });
      }
      setShowHint(true);
      setTimeout(() => setShowHint(false), 4000); 
    }, 2500); 
  };

  if (!isMounted) return <div className="min-h-[100dvh] bg-[#8C8076]"></div>;

  return (
    <div className={`relative selection:bg-[#E5D9CC] selection:text-[#4A3C31] font-sans text-[#5C4F44] bg-[#8C8076] w-full flex flex-col items-center mx-auto overflow-hidden h-[100dvh]`}>
      
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
           0% { opacity: 0; transform: translate(0, 0) scale(0); }
           20% { opacity: 1; transform: translate(calc(var(--tx) * 0.4), calc(var(--ty) * 0.4)) scale(var(--s)); }
           70% { opacity: 0.8; }
           100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
        }
        .animate-gentle-burst { animation: gentle-burst 2.5s cubic-bezier(0.2, 0.8, 0.3, 1) forwards; }
        
        @keyframes sway-forest { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
        
        /* HIỆU ỨNG HOA NỔI LÊN XUỐNG MỀM MẠI DÀNH CHO CẢ 2 HOA */
        @keyframes float-up-down { 
            0%, 100% { transform: translateY(0); } 
            50% { transform: translateY(-20px); } 
        }

        @keyframes sparkle {
           0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
           50% { opacity: 0.9; transform: scale(1) rotate(90deg); filter: drop-shadow(0 0 4px rgba(255,255,255,0.9)); }
        }
        .animate-sparkle { animation: sparkle 2.5s ease-in-out infinite; }

        /* Khóa scrollbar hiển thị nhưng vẫn cuộn được mượt */
        .custom-scrollbar { scroll-behavior: smooth; }
        .custom-scrollbar::-webkit-scrollbar { width: 0px; background: transparent; }
        
        .art-paper-bg {
           background-color: #F8F4ED;
           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
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

      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-black/40 text-white px-5 py-2.5 rounded-full backdrop-blur-sm text-[10px] md:text-[11px] uppercase tracking-widest transition-opacity duration-1000 pointer-events-none flex items-center gap-2 shadow-lg ${showHint ? 'opacity-100' : 'opacity-0'}`}>
          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
          Vuốt để xem thiệp
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
          
          <div className="relative w-full max-w-[460px] h-full max-h-[850px] shadow-2xl md:rounded-lg border-x border-[#EAE3DB] overflow-hidden bg-[#FDFBF7]" style={{ perspective: '2000px' }}>
              
              {/* === BÌA THIỆP (Z-50) === */}
              {cardState !== 'done' && (
              <div 
                  className={`absolute inset-0 w-full h-full bg-[#FDFBF7] z-50 overflow-hidden flex flex-col
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
                  
                  <div className="absolute inset-x-0 bottom-0 pointer-events-none z-[15]">
                     {FOREST_FLOWERS.map((flower) => (
                        <div key={flower.id} className="absolute" style={{ left: flower.left, bottom: flower.bottom, width: flower.width, transform: `rotate(${flower.rotate})`, animation: `sway-forest ${flower.duration} ease-in-out infinite`, animationDelay: flower.delay }}>
                            <img src={flower.src} alt="Flower" className="w-full h-auto origin-bottom opacity-90" />
                        </div>
                     ))}
                  </div>

                  <div className="relative z-40 flex flex-col items-center justify-center text-center px-4 md:px-6 w-full h-full pt-10 pb-32">
                    
                    <div className="relative mb-6 mt-2">
                        {/* Ẩn pháo hoa khi ở trạng thái idle */}
                        {cardState !== 'idle' && cardState !== 'scaling' && Array.from({ length: 30 }).map((_, i) => {
                            const shapes = ['heart', 'star', 'bubble'];
                            const colors = ['#FFC0CB', '#FFB6C1', '#FFD1DC', '#FFE4E1', '#FFF0F5', '#FFFFFF'];
                            const p = {
                                id: i,
                                shape: shapes[Math.floor(Math.random() * shapes.length)],
                                color: colors[Math.floor(Math.random() * colors.length)],
                                tx: (Math.random() - 0.5) * 200, 
                                ty: (Math.random() - 0.5) * 200 - 50, 
                                scale: 0.6 + Math.random() * 1,
                                delay: Math.random() * 0.3 
                            };
                            return (
                            <div key={`cf-${p.id}`} className="absolute top-1/2 left-1/2 pointer-events-none z-0" style={{ transform: 'translate(-50%, -50%)' }}>
                                <svg 
                                    className="animate-gentle-burst drop-shadow-sm"
                                    viewBox="0 0 24 24" 
                                    fill={p.color}
                                    style={{ 
                                        width: '24px', height: '24px',
                                        '--tx': `${p.tx}px`, '--ty': `${p.ty}px`, '--s': p.scale,
                                        animationDelay: `${p.delay}s`
                                    } as React.CSSProperties}
                                >
                                    {p.shape === 'heart' && <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>}
                                    {p.shape === 'star' && <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>}
                                    {p.shape === 'bubble' && <circle cx="12" cy="12" r="8" opacity="0.8"/>}
                                </svg>
                            </div>
                        )})}

                        <div className="relative z-10 bg-[#8C7A6B] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.15)] shrink-0">
                          <svg className={`w-5 h-5 md:w-6 md:h-6 text-white ${cardState === 'bursting' ? 'animate-fast-beat text-[#FF99C2]' : ''}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
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

                    <p className="text-[#8C7A6B] text-lg md:text-xl font-serif tracking-wide mb-2">3 tháng 1, 2027</p>
                    <p className="text-[#8C7A6B] text-[13px] md:text-[14px] mt-2 mb-12 uppercase tracking-[0.2em] font-medium">Thân Mời</p>

                    <button onClick={(e) => { e.stopPropagation(); handleOpenCard(); }} className={`px-10 md:px-12 py-3.5 md:py-4 bg-[#8C7A6B] text-white text-[13px] md:text-[14px] uppercase tracking-widest rounded-full shadow-lg hover:bg-[#7A6A5E] transition-all duration-300 relative z-50 ${cardState !== 'idle' ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100'}`}>
                        Mở thiệp
                    </button>
                  </div>
              </div>
              )}

              {/* === RUỘT THIỆP CHÍNH (Z-10) === */}
              {/* Khu vực vuốt mượt mà của người dùng */}
              <div 
                  ref={scrollRef}
                  className="absolute inset-0 w-full h-full bg-[#FDFBF7] relative z-10 overflow-y-auto overflow-x-hidden custom-scrollbar pb-32"
              >
                 <WatermarkPurpleFlowers />

                 <div className="relative w-full flex flex-col items-center pt-24 z-20">
                     <p className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-[#8C7A6B] font-medium mb-3">The Wedding Of</p>
                     <h2 className="text-4xl md:text-5xl font-serif italic text-[#5C4F44] mb-12">Đỗ Trung <span className="font-serif italic text-[#8C7A6B] mx-2">&</span> Đặng Hải</h2>
                     
                     <div className="relative w-[88%] max-w-[340px] bg-white p-3 md:p-4 pb-16 shadow-xl rotate-[2deg] mx-auto mb-16 mt-4">
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
                        
                        <div className="absolute -bottom-10 -left-12 z-20 pointer-events-none" style={{ animation: 'float-up-down 5s ease-in-out infinite' }}>
                            {/* HOAT1 NỔI LÊN XUỐNG VÀ CÓ BÓNG CHUẨN */}
                            <img src="/HoaT1.png" alt="Hoa" className="w-[180px] h-auto origin-bottom-left opacity-90" style={{ filter: 'drop-shadow(4px 10px 8px rgba(0,0,0,0.3))' }} onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/HoaT1.jpg"; }} />
                        </div>
                     </div>

                     {/* ÉP KHOẢNG CÁCH DỒN LẠI NGẮN HƠN: Giảm padding và margin */}
                     <div className="relative w-[90%] max-w-[400px] art-paper-bg rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.08)] mt-6 mb-8 border border-[#EAE3DB]">
                         
                         {/* Cành hoa 3 phóng to (380px), chuyển động lên xuống chậm rãi và đổ bóng thật */}
                         <div className="absolute top-1/2 -left-[140px] -translate-y-1/2 z-30 pointer-events-none" style={{ animation: 'float-up-down 6s ease-in-out infinite' }}>
                             <img src="/hoa3.png" alt="Hoa" className="w-[380px] h-auto opacity-95" style={{ filter: 'drop-shadow(6px 15px 12px rgba(0,0,0,0.35))' }} onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/hoa3.jpg"; }} />
                         </div>
                         
                         <div className="absolute -bottom-[50px] -right-[40px] z-30 pointer-events-none" style={{ animation: 'float-up-down 7s ease-in-out infinite reverse' }}>
                            <img src="/HoaT1.png" alt="Hoa" className="w-[160px] h-auto" style={{ transform: 'scaleX(-1) rotate(15deg)', filter: 'drop-shadow(-4px 10px 8px rgba(0,0,0,0.3))' }} onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/HoaT1.jpg"; }} />
                         </div>

                         {/* DỒN LẠI NGẮN HƠN: py-10 thay vì py-16 */}
                         <div className="px-6 py-10 flex flex-col items-center text-center relative z-20 w-full">
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

                             {/* BỎ HIỆU ỨNG KIM LOẠI: Chữ đen tuyền sắc nét */}
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

                     <FadeIn delay={100}>
                        <p className="mt-6 text-[#5C4F44] font-serif text-sm tracking-[0.3em] uppercase opacity-80">Album Ảnh</p>
                     </FadeIn>
                 </div>
              </div>

          </div>
      </div>
    </div>
  );
}