"use client";

import React, { useState, useEffect } from "react";

// ==========================================
// 1. DỮ LIỆU TĨNH
// ==========================================
const PARTICLES = [
  { id: 1, left: "5%", delay: "0s", duration: "7s", size: "12px", content: "❤" },
  { id: 2, left: "20%", delay: "2s", duration: "8s", size: "10px", content: "✿" },
  { id: 3, left: "40%", delay: "4s", duration: "6s", size: "14px", content: "❤" },
  { id: 4, left: "60%", delay: "1s", duration: "9s", size: "12px", content: "✿" },
];

const FOREST_FLOWERS = [
  { id: 1, src: "/Hoa.png", left: "-15%", bottom: "-110px", width: "240px", rotate: "-20deg", duration: "5s", delay: "0s", zIndex: 12 },
  { id: 2, src: "/Hoa.png", left: "-5%", bottom: "-130px", width: "200px", rotate: "-10deg", duration: "6.5s", delay: "1.2s", zIndex: 10 },
  { id: 3, src: "/Hoa.png", left: "5%", bottom: "-100px", width: "260px", rotate: "-5deg", duration: "4.5s", delay: "0.5s", zIndex: 13 },
  { id: 4, src: "/Hoa.png", left: "15%", bottom: "-120px", width: "220px", rotate: "2deg", duration: "7s", delay: "2.1s", zIndex: 11 },
];

// CÁC CÀNH HOA IN CHÌM (WATERMARK) CHO RUỘT THIỆP
const BG_WATERMARK = [
  { id: 1, src: "/Hoa.png", top: "5%", left: "-10%", width: "200px", rotate: "10deg" },
  { id: 2, src: "/Hoa.png", top: "40%", right: "-15%", width: "250px", rotate: "-20deg" },
  { id: 3, src: "/Hoa.png", bottom: "5%", left: "-5%", width: "220px", rotate: "170deg" },
];

const DRESS_SPARKLES = [
  { id: 1, bottom: "10%", left: "30%", delay: "0s", size: "12px" },
  { id: 2, bottom: "25%", left: "55%", delay: "0.5s", size: "8px" },
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

const ElegantPartingBow = ({ isUntying }: { isUntying: boolean }) => (
  <div className="absolute inset-x-0 bottom-[180px] md:bottom-[200px] h-[60px] z-[35] pointer-events-none overflow-hidden rounded-lg">
     <div className="absolute left-0 top-0 h-full w-1/2 flex items-center justify-end transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ transform: isUntying ? 'translateX(-110%)' : 'translateX(0)' }}>
        <div className="absolute right-0 w-[500px] h-[16px] bg-gradient-to-r from-[#4a3272] to-[#7552A8] shadow-md"></div>
        <svg width="60" height="60" viewBox="0 0 60 60" className="relative z-10 translate-x-[4px]"><path d="M 60 30 C 20 10, 0 10, 10 30 C 0 50, 20 50, 60 30 Z" fill="#845EC2" className="drop-shadow-md"/><path d="M 55 30 C 25 18, 15 20, 20 30 C 15 40, 25 42, 55 30 Z" fill="#4a3272" opacity="0.5"/><path d="M 45 35 C 30 50, 15 55, 10 70 C 25 60, 40 45, 55 35 Z" fill="#6b4c9a" /></svg>
     </div>
     <div className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-start transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ transform: isUntying ? 'translateX(110%)' : 'translateX(0)' }}>
        <div className="absolute left-0 w-[500px] h-[16px] bg-gradient-to-l from-[#4a3272] to-[#7552A8] shadow-md"></div>
        <svg width="60" height="60" viewBox="0 0 60 60" className="relative z-10 -translate-x-[4px]"><path d="M 0 30 C 40 10, 60 10, 50 30 C 60 50, 40 50, 0 30 Z" fill="#845EC2" className="drop-shadow-md"/><path d="M 5 30 C 35 18, 45 20, 40 30 C 45 40, 35 42, 5 30 Z" fill="#4a3272" opacity="0.5"/><path d="M 15 35 C 30 50, 45 55, 50 70 C 35 60, 20 45, 5 35 Z" fill="#6b4c9a" /><rect x="-8" y="20" width="16" height="20" rx="6" fill="#593D7C" className="drop-shadow-lg" /><path d="M -2 20 V 40 M 2 20 V 40" stroke="#3d2763" strokeWidth="1"/></svg>
     </div>
  </div>
);

// ==========================================
// 2. TRANG CHÍNH
// ==========================================
export default function WeddingCardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true); 
  const [isUntying, setIsUntying] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => { setShowSplash(false); }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenCard = () => { setIsUntying(true); setTimeout(() => setIsOpen(true), 600); };
  const handleCloseCard = () => { setIsOpen(false); setTimeout(() => setIsUntying(false), 1200); };

  if (!isMounted) return <div className="min-h-screen bg-[#8C8076]"></div>;

  return (
    <div className="relative selection:bg-[#E5D9CC] selection:text-[#4A3C31] font-sans overflow-hidden text-[#5C4F44]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        @keyframes fall { 0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(110vh) translateX(-20px) rotate(360deg); opacity: 0; } }
        @keyframes heart-blink { 0%, 100% { stroke: transparent; stroke-width: 0px; transform: scale(1); opacity: 0.5; } 50% { stroke: #FF99C2; stroke-width: 1.5px; transform: scale(1.15); opacity: 0.85; } }
        .animate-heart { animation: heart-blink 2s ease-in-out infinite; }
        @keyframes sway-forest { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
        @keyframes sparkle { 0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); } 50% { opacity: 0.9; transform: scale(1) rotate(90deg); filter: drop-shadow(0 0 4px rgba(255,255,255,0.9)); } }
        .animate-sparkle { animation: sparkle 2.5s ease-in-out infinite; }
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}} />

      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F4EFEA] transition-all duration-1000 ${showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <div className="flex flex-col items-center text-center px-6">
            <span className="text-[#8C7A6B] text-4xl mb-4 animate-bounce">❦</span>
            <h2 className="text-3xl font-serif text-[#5C4F44] italic mb-6">Chào mừng đến với<br/>Lễ Cưới</h2>
         </div>
      </div>

      <section className="perspective-2000 w-full min-h-screen relative flex items-center justify-center p-4 bg-[#8C8076] z-20 overflow-hidden">
        <div className="relative preserve-3d w-[92%] sm:w-full max-w-[420px] aspect-[3/4] min-h-[550px] shadow-2xl transition-all duration-[1200ms] ease-in-out" style={{ transform: isOpen ? 'scale(1.12) translateX(6%)' : 'scale(1) translateX(0)' }}>
            
          {/* RUỘT THIỆP VỚI HỌA TIẾT IN CHÌM */}
          <div className="absolute inset-0 z-10 bg-[#FDFBF7] rounded-lg border border-[#EAE3DB] flex flex-col items-center pt-8 pb-6 px-4 overflow-hidden shadow-2xl">
             
             {/* Lớp hoa in chìm (Watermark) */}
             <div className="absolute inset-0 pointer-events-none z-0">
                {BG_WATERMARK.map((flower) => (
                    <img key={flower.id} src={flower.src} className="absolute opacity-[0.07] pointer-events-none" style={{ top: flower.top, left: flower.left, right: flower.right, bottom: flower.bottom, width: flower.width, transform: `rotate(${flower.rotate})` }} />
                ))}
             </div>

             <p className="uppercase tracking-[0.25em] text-[10px] text-[#8C7A6B] font-medium mb-1 z-20">The Wedding Of</p>
             <h2 className="text-3xl font-serif italic text-[#5C4F44] mb-4 z-20">Đỗ Trung & Đặng Hải</h2>
             
             <div className="relative w-[80%] max-w-[280px] bg-white p-3 pb-12 shadow-xl rotate-[2deg] mt-1 z-20">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#DBCBB5] opacity-85 rotate-[-3deg] z-10"></div>
                <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden relative">
                    <img src="/AnhT1.jpg" alt="Photo" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 pointer-events-none">
                        {DRESS_SPARKLES.map((s) => (
                            <svg key={s.id} className="absolute text-white animate-sparkle" style={{ bottom: s.bottom, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
                        ))}
                    </div>
                </div>
                <img src="/Con_dau1.png" alt="Seal" className="absolute -bottom-6 -right-5 w-16 h-16 z-30 object-contain" />
                <div className="absolute -bottom-8 -left-8 w-32 z-20 rotate-[-12deg]">
                    <img src="/HoaT1.png" alt="Flower" className="w-full h-auto" style={{ animation: 'sway-forest 6s ease-in-out infinite' }} />
                </div>
             </div>

             <button onClick={handleCloseCard} className="mt-auto px-6 py-2 border border-[#D5C7B8] rounded-full text-[10px] uppercase tracking-widest text-[#8C7A6B] hover:bg-[#F9F6F0] z-20">← Đóng bìa thiệp</button>
          </div>

          {/* BÌA THIỆP */}
          <div className="absolute inset-0 z-40 preserve-3d" style={{ transformOrigin: 'left center', transform: isOpen ? 'rotateY(-140deg)' : 'rotateY(0deg)', transition: 'transform 1.4s cubic-bezier(0.645, 0.045, 0.355, 1)', pointerEvents: isOpen ? 'none' : 'auto' }}>
              <div className="absolute inset-0 bg-[#F4EFEA] rounded-lg border border-[#D5C7B8] backface-hidden shadow-inner flex items-center justify-center" style={{ transform: 'rotateY(180deg)' }}><div className="text-[120px] font-serif text-[#D5C7B8] opacity-30">囍</div></div>
              <div className="absolute inset-0 bg-[#FDFBF7] rounded-lg border border-[#EAE3DB] backface-hidden overflow-hidden">
                  <ElegantPartingBow isUntying={isUntying} />
                  <LuxuryCorner className="top-4 left-4" />
                  <LuxuryCorner className="top-4 right-4 rotate-90" />
                  <LuxuryCorner className="bottom-4 right-4 rotate-180" />
                  <LuxuryCorner className="bottom-4 left-4 -rotate-90" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-[160px] font-serif text-[#D5C7B8]">囍</div>
                  <div className="absolute inset-x-0 bottom-0 pointer-events-none z-[15]">{FOREST_FLOWERS.map((f) => (<img key={f.id} src={f.src} className="absolute opacity-90" style={{ left: f.left, bottom: f.bottom, width: f.width, transform: `rotate(${f.rotate})`, animation: `sway-forest ${f.duration} ease-in-out infinite` }} />))}</div>
                  <div className="relative z-40 flex flex-col items-center justify-center text-center px-6 w-full h-full pt-8 pb-32">
                    <h1 className="text-4xl font-serif italic text-[#5C4F44]">Đỗ Trung</h1>
                    <span className="text-xl font-serif text-[#8C7A6B] italic my-1">&</span>
                    <h1 className="text-4xl font-serif italic text-[#5C4F44]">Đặng Hải</h1>
                    <p className="text-[#8C7A6B] text-lg font-serif mt-5">3 tháng 1, 2027</p>
                    <button onClick={handleOpenCard} className="mt-10 px-10 py-3.5 bg-[#8C7A6B] text-white uppercase tracking-widest rounded-full shadow-lg">Mở thiệp</button>
                  </div>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}