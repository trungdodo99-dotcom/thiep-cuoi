"use client";

import React, { useState, useEffect } from "react";

// ==========================================
// 1. DỮ LIỆU TĨNH & COMPONENT PHỤ TRỢ
// ==========================================
const PARTICLES = [
  { id: 1, left: "5%", delay: "0s", duration: "7s", size: "12px", content: "❤" },
  { id: 2, left: "20%", delay: "2s", duration: "8s", size: "10px", content: "✿" },
  { id: 3, left: "40%", delay: "4s", duration: "6s", size: "14px", content: "❤" },
  { id: 4, left: "60%", delay: "1s", duration: "9s", size: "12px", content: "✿" },
  { id: 5, left: "80%", delay: "3s", duration: "7s", size: "15px", content: "❤" },
  { id: 6, left: "95%", delay: "5s", duration: "8s", size: "10px", content: "✿" },
  { id: 7, left: "15%", delay: "1s", duration: "7s", size: "16px", content: "❤" },
  { id: 8, left: "30%", delay: "2.5s", duration: "8.5s", size: "11px", content: "✿" },
  { id: 9, left: "50%", delay: "4.5s", duration: "6s", size: "13px", content: "❤" },
  { id: 10, left: "70%", delay: "1.5s", duration: "9s", size: "12px", content: "✿" },
  { id: 11, left: "85%", delay: "3.5s", duration: "7s", size: "17px", content: "❤" },
];

const FOREST_FLOWERS = [
  { id: 1, src: "/Hoa.png", left: "-15%", bottom: "-110px", width: "240px", rotate: "-20deg", duration: "5s", delay: "0s", zIndex: 12 },
  { id: 2, src: "/Hoa.png", left: "-5%", bottom: "-130px", width: "200px", rotate: "-10deg", duration: "6.5s", delay: "1.2s", zIndex: 10 },
  { id: 3, src: "/Hoa.png", left: "5%", bottom: "-100px", width: "260px", rotate: "-5deg", duration: "4.5s", delay: "0.5s", zIndex: 13 },
  { id: 4, src: "/Hoa.png", left: "15%", bottom: "-120px", width: "220px", rotate: "2deg", duration: "7s", delay: "2.1s", zIndex: 11 },
  { id: 5, src: "/Hoa.png", left: "25%", bottom: "-90px", width: "280px", rotate: "8deg", duration: "5.5s", delay: "1.5s", zIndex: 14 },
  { id: 6, src: "/Hoa.png", left: "35%", bottom: "-115px", width: "210px", rotate: "-3deg", duration: "6s", delay: "0.8s", zIndex: 12 },
  { id: 7, src: "/Hoa.png", left: "45%", bottom: "-135px", width: "190px", rotate: "5deg", duration: "4.8s", delay: "2.5s", zIndex: 10 },
  { id: 8, src: "/Hoa.png", left: "55%", bottom: "-95px", width: "270px", rotate: "12deg", duration: "7.2s", delay: "0.3s", zIndex: 15 },
  { id: 9, src: "/Hoa.png", left: "65%", bottom: "-125px", width: "230px", rotate: "18deg", duration: "5.2s", delay: "1.8s", zIndex: 11 },
  { id: 10, src: "/Hoa.png", left: "75%", bottom: "-105px", width: "250px", rotate: "22deg", duration: "6.8s", delay: "0.9s", zIndex: 13 },
  { id: 11, src: "/Hoa.png", left: "85%", bottom: "-140px", width: "180px", rotate: "25deg", duration: "4.5s", delay: "2.2s", zIndex: 10 },
  { id: 12, src: "/Hoa.png", left: "95%", bottom: "-110px", width: "240px", rotate: "30deg", duration: "5.8s", delay: "1.1s", zIndex: 12 },
];

// COMPONENT SVG GÓC VIỀN SANG TRỌNG (LUXURY CORNER)
const LuxuryCorner = ({ className }: { className?: string }) => (
  <svg className={`absolute w-14 h-14 md:w-16 md:h-16 pointer-events-none opacity-90 z-40 ${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Lớp ngoài cùng (Dày) */}
    <path d="M2 98 V2 H98" stroke="#C3B09B" strokeWidth="2"/>
    {/* Lớp giữa (Mỏng) */}
    <path d="M14 98 V14 H98" stroke="#C3B09B" strokeWidth="1"/>
    {/* Lớp trong cùng (Rất mỏng) */}
    <path d="M26 98 V26 H98" stroke="#C3B09B" strokeWidth="0.5"/>
    {/* Các thanh chốt ngang/dọc (Cross bridges) */}
    <path d="M2 38 H14" stroke="#C3B09B" strokeWidth="2"/>
    <path d="M38 2 V14" stroke="#C3B09B" strokeWidth="2"/>
    <path d="M14 54 H26" stroke="#C3B09B" strokeWidth="1"/>
    <path d="M54 14 V26" stroke="#C3B09B" strokeWidth="1"/>
    {/* Họa tiết hình thoi (Diamond) */}
    <rect x="11" y="11" width="6" height="6" transform="rotate(45 14 14)" fill="#C3B09B"/>
  </svg>
);


// ==========================================
// 2. TRANG CHÍNH
// ==========================================
export default function WeddingCardPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => setIsMounted(true), []);

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

        @keyframes sway-forest { 
            0%, 100% { transform: rotate(-4deg); } 
            50% { transform: rotate(4deg); } 
        }
      `}} />

      <section className="w-full h-screen relative flex items-center justify-center p-4 bg-[#8C8076] z-20">
        
        {/* Hạt rơi nền ngoài */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {PARTICLES.map((p) => (
            <div key={`bg-${p.id}`} className="absolute top-[-5%]" style={{ left: p.left, width: p.size, height: p.size, animation: `fall ${p.duration} linear infinite`, animationDelay: p.delay }}>
              <svg viewBox="0 0 24 24" fill="#FFC0CB" className="w-full h-full animate-heart opacity-70" style={{ animationDelay: p.delay, overflow: 'visible' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
          ))}
        </div>

        {/* Khung Bìa Thư */}
        <div className="relative bg-[#FDFBF7] w-[92%] sm:w-full max-w-md aspect-[3/4] min-h-[550px] md:min-h-[600px] rounded-lg shadow-2xl overflow-hidden flex flex-col items-center justify-center border border-[#EAE3DB]">
          
          {/* Hạt rơi bên trong bìa */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {PARTICLES.slice(0, 8).map((p) => (
              <div key={`card-${p.id}`} className="absolute top-[-5%]" style={{ left: p.left, width: p.size, height: p.size, animation: `fall ${p.duration} linear infinite`, animationDelay: p.delay }}>
                <svg viewBox="0 0 24 24" fill="#FFC0CB" className="w-full h-full animate-heart" style={{ animationDelay: p.delay, overflow: 'visible' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
            ))}
          </div>

          {/* ============================================== */}
          {/* GÓC VIỀN CAO CẤP (LUXURY CORNERS) */}
          {/* ============================================== */}
          <LuxuryCorner className="top-4 left-4" />
          <LuxuryCorner className="top-4 right-4 rotate-90" />
          <LuxuryCorner className="bottom-4 right-4 rotate-180" />
          <LuxuryCorner className="bottom-4 left-4 -rotate-90" />

          {/* ============================================== */}
          {/* HỌA TIẾT IN CHÌM (WATERMARK) */}
          {/* ============================================== */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 overflow-hidden">
             {/* Vòng tròn nhẫn */}
             <div className="absolute flex items-center justify-center">
                <div className="absolute w-[200px] h-[200px] md:w-[240px] md:h-[240px] border-[1px] border-[#D5C7B8] rounded-full opacity-40 -translate-x-4 md:-translate-x-6"></div>
                <div className="absolute w-[200px] h-[200px] md:w-[240px] md:h-[240px] border-[1px] border-[#D5C7B8] rounded-full opacity-40 translate-x-4 md:translate-x-6"></div>
             </div>
             {/* Chữ Hỷ */}
             <div className="text-[130px] md:text-[160px] font-serif text-[#D5C7B8] opacity-20 select-none">
                囍
             </div>
          </div>
          
          {/* RỪNG HOA */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none z-30">
             {FOREST_FLOWERS.map((flower) => (
                <div 
                    key={flower.id} 
                    className="absolute" 
                    style={{ 
                        left: flower.left, 
                        bottom: flower.bottom, 
                        width: flower.width, 
                        zIndex: flower.zIndex,
                        transform: `rotate(${flower.rotate})`, 
                        transformOrigin: 'bottom center' 
                    }}
                >
                    <img 
                        src={flower.src} 
                        alt={`Flower ${flower.id}`} 
                        className="w-full h-auto origin-bottom opacity-90"
                        style={{ 
                            animation: `sway-forest ${flower.duration} ease-in-out infinite`, 
                            animationDelay: flower.delay 
                        }} 
                    />
                </div>
             ))}
          </div>

          {/* CHỮ VÀ NÚT (z-40) */}
          <div className="relative z-40 flex flex-col items-center justify-center text-center px-6 w-full h-full pt-8 pb-32 md:pb-36">
            <div className="bg-[#6A5A4E] w-12 h-12 rounded-full flex items-center justify-center shadow-md mb-6 pointer-events-none">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-[#5C4F44] font-light pointer-events-none drop-shadow-md">Đỗ Trung</h1>
            <span className="text-xl font-serif text-[#8C7A6B] italic my-1 pointer-events-none">&</span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#5C4F44] font-light pointer-events-none drop-shadow-md">Đặng Hải</h1>

            <div className="flex items-center gap-2 my-5 text-[#A09386] pointer-events-none">
              <span className="w-10 h-[1px] bg-[#D5C7B8]"></span>
              <span className="text-lg font-serif">❦</span>
              <span className="w-10 h-[1px] bg-[#D5C7B8]"></span>
            </div>

            <p className="text-[#8C7A6B] text-lg font-serif tracking-wide pointer-events-none mb-1">3 tháng 1, 2027</p>
            <p className="text-[#8C7A6B] text-sm mt-2 mb-10 uppercase tracking-[0.2em] font-medium pointer-events-none">Thân Mời</p>

            <button 
                onClick={() => alert("Ruột thiệp đang được thiết kế!")}
                className="px-10 py-3.5 bg-[#8C7A6B] text-white text-[13px] uppercase tracking-widest rounded-full shadow-lg hover:bg-[#6A5A4E] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
                Mở thiệp
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}