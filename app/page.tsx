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
  { id: 5, left: "80%", delay: "3s", duration: "7s", size: "15px", content: "❤" },
  { id: 6, left: "95%", delay: "5s", duration: "8s", size: "10px", content: "✿" },
  { id: 7, left: "15%", delay: "1s", duration: "7s", size: "16px", content: "❤" },
  { id: 8, left: "30%", delay: "2.5s", duration: "8.5s", size: "11px", content: "✿" },
  { id: 9, left: "50%", delay: "4.5s", duration: "6s", size: "13px", content: "❤" },
  { id: 10, left: "70%", delay: "1.5s", duration: "9s", size: "12px", content: "✿" },
  { id: 11, left: "85%", delay: "3.5s", duration: "7s", size: "17px", content: "❤" },
];

const FOREST_FLOWERS = [
  { id: 1, src: "/Hoa.png", left: "-15%", bottom: "-80px", width: "240px", rotate: "-20deg", duration: "5s", delay: "0s", zIndex: 12 },
  { id: 2, src: "/Hoa.png", left: "-5%", bottom: "-100px", width: "200px", rotate: "-10deg", duration: "6.5s", delay: "1.2s", zIndex: 10 },
  { id: 3, src: "/Hoa.png", left: "5%", bottom: "-70px", width: "260px", rotate: "-5deg", duration: "4.5s", delay: "0.5s", zIndex: 13 },
  { id: 4, src: "/Hoa.png", left: "15%", bottom: "-90px", width: "220px", rotate: "2deg", duration: "7s", delay: "2.1s", zIndex: 11 },
  { id: 5, src: "/Hoa.png", left: "25%", bottom: "-60px", width: "280px", rotate: "8deg", duration: "5.5s", delay: "1.5s", zIndex: 14 },
  { id: 6, src: "/Hoa.png", left: "35%", bottom: "-85px", width: "210px", rotate: "-3deg", duration: "6s", delay: "0.8s", zIndex: 12 },
  { id: 7, src: "/Hoa.png", left: "45%", bottom: "-105px", width: "190px", rotate: "5deg", duration: "4.8s", delay: "2.5s", zIndex: 10 },
  { id: 8, src: "/Hoa.png", left: "55%", bottom: "-65px", width: "270px", rotate: "12deg", duration: "7.2s", delay: "0.3s", zIndex: 15 },
  { id: 9, src: "/Hoa.png", left: "65%", bottom: "-95px", width: "230px", rotate: "18deg", duration: "5.2s", delay: "1.8s", zIndex: 11 },
  { id: 10, src: "/Hoa.png", left: "75%", bottom: "-75px", width: "250px", rotate: "22deg", duration: "6.8s", delay: "0.9s", zIndex: 13 },
  { id: 11, src: "/Hoa.png", left: "85%", bottom: "-110px", width: "180px", rotate: "25deg", duration: "4.5s", delay: "2.2s", zIndex: 10 },
  { id: 12, src: "/Hoa.png", left: "95%", bottom: "-80px", width: "240px", rotate: "30deg", duration: "5.8s", delay: "1.1s", zIndex: 12 },
];

export default function WeddingCardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở thiệp
  const [showContent, setShowContent] = useState(false); // Hiển thị ruột thiệp

  useEffect(() => setIsMounted(true), []);

  const handleOpenCard = () => {
    setIsOpen(true); // Bắt đầu hiệu ứng bão cánh hoa
    setTimeout(() => {
      setShowContent(true); // Sau 1.2s chuyển sang ruột thiệp
    }, 1200);
  };

  if (!isMounted) return <div className="min-h-screen bg-[#8C8076]"></div>;

  return (
    <div className="relative selection:bg-[#E5D9CC] selection:text-[#4A3C31] font-sans overflow-x-hidden text-[#5C4F44] min-h-screen bg-[#8C8076]">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@300;400;500&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        
        @keyframes fall { 
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; } 
          10% { opacity: 1; } 
          100% { transform: translateY(110vh) translateX(-20px) rotate(360deg); opacity: 0; } 
        }
        @keyframes heart-blink { 
          0%, 100% { stroke: transparent; stroke-width: 0px; transform: scale(1); opacity: 0.5; } 
          50% { stroke: #FF99C2; stroke-width: 1.5px; transform: scale(1.15); opacity: 0.85; } 
        }
        .animate-heart { animation: heart-blink 2s ease-in-out infinite; }

        @keyframes sway-forest { 
            0%, 100% { transform: rotate(-4deg); } 
            50% { transform: rotate(4deg); } 
        }

        /* Hiệu ứng bão cánh hoa che màn hình */
        @keyframes storm-in {
          0% { transform: scale(0.2); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(25); opacity: 1; }
        }
        .animate-storm {
          animation: storm-in 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}} />

      {/* ========================================== */}
      {/* 1. MÀN HÌNH BÌA THƯ                         */}
      {/* ========================================== */}
      {!showContent && (
        <section className={`w-full h-screen relative flex items-center justify-center p-4 bg-[#8C8076] z-20 transition-opacity duration-700 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          
          {/* Hạt rơi nền */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {PARTICLES.map((p) => (
              <div key={`bg-${p.id}`} className="absolute top-[-5%]" style={{ left: p.left, width: p.size, height: p.size, animation: `fall ${p.duration} linear infinite`, animationDelay: p.delay }}>
                <svg viewBox="0 0 24 24" fill="#FFC0CB" className="w-full h-full animate-heart opacity-70" style={{ animationDelay: p.delay, overflow: 'visible' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
            ))}
          </div>

          {/* Khung Bìa Thư */}
          <div className="relative bg-[#FDFBF7] w-full max-w-md aspect-[4/5] md:aspect-[3/4] rounded-lg shadow-2xl overflow-hidden flex flex-col items-center justify-center border border-[#EAE3DB]">
            
            {/* Rừng hoa bên dưới */}
            <div className="absolute inset-x-0 bottom-0 pointer-events-none">
               {FOREST_FLOWERS.map((flower) => (
                  <div key={flower.id} className="absolute" style={{ left: flower.left, bottom: flower.bottom, width: flower.width, zIndex: flower.zIndex, transform: `rotate(${flower.rotate})`, transformOrigin: 'bottom center' }}>
                      <img src={flower.src} alt={`Flower ${flower.id}`} className="w-full h-auto origin-bottom opacity-90" style={{ animation: `sway-forest ${flower.duration} ease-in-out infinite`, animationDelay: flower.delay }} />
                  </div>
               ))}
            </div>

            {/* CHỮ VÀ NÚT (Đã được đẩy lên cao hơn để không bị hoa che) */}
            <div className="relative z-30 flex flex-col items-center text-center px-6 w-full -mt-10">
              <div className="bg-[#6A5A4E] w-12 h-12 rounded-full flex items-center justify-center shadow-md mb-4 pointer-events-none">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif text-[#5C4F44] font-light pointer-events-none drop-shadow-md">Đỗ Trung</h1>
              <span className="text-xl font-serif text-[#8C7A6B] italic my-1 pointer-events-none">&</span>
              <h1 className="text-4xl md:text-5xl font-serif text-[#5C4F44] font-light pointer-events-none drop-shadow-md">Đặng Hải</h1>

              <div className="flex items-center gap-2 my-4 text-[#A09386] pointer-events-none">
                <span className="w-10 h-[1px] bg-[#D5C7B8]"></span>
                <span className="text-lg font-serif">❦</span>
                <span className="w-10 h-[1px] bg-[#D5C7B8]"></span>
              </div>

              <p className="text-[#8C7A6B] text-lg font-serif tracking-wide pointer-events-none mb-1">3 tháng 1, 2027</p>
              <p className="text-[#8C7A6B] text-sm mt-1 mb-6 uppercase tracking-[0.2em] font-medium pointer-events-none">Thân Mời</p>

              <button 
                  onClick={handleOpenCard}
                  className="px-10 py-3.5 bg-[#8C7A6B] text-white text-[13px] uppercase tracking-widest rounded-full shadow-lg hover:bg-[#6A5A4E] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                  Mở thiệp
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ========================================== */}
      {/* 2. HIỆU ỨNG BÃO CÁNH HOA / TRÁI TIM TỎA RA  */}
      {/* ========================================== */}
      {isOpen && !showContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#8C8076] overflow-hidden pointer-events-none">
          <div className="relative flex items-center justify-center animate-storm">
            <svg viewBox="0 0 100 100" className="w-40 h-40 fill-[#FFC0CB] drop-shadow-2xl">
              <path d="M50 88.9l-4.7-4.3C24.4 65.3 10 52.3 10 36.3 10 23.2 20.2 13 33.3 13c7.3 0 14.3 3.4 18.7 8.8 4.4-5.4 11.4-8.8 18.7-8.8C79.8 13 90 23.2 90 36.3c0 16-14.4 29-35.3 48.3L50 88.9z"/>
            </svg>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. RUỘT THIỆP (HIỆN RA SAU KHI BÃO HOA ĐÓNG) */}
      {/* ========================================== */}
      {showContent && (
        <main className="w-full min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-center p-6 animate-fadeIn transition-opacity duration-1000">
          <div className="max-w-xl w-full bg-white shadow-2xl rounded-2xl p-8 text-center border border-[#EAE3DB]">
            <h2 className="text-3xl md:text-4xl font-serif text-[#5C4F44] mb-4">Thiệp Mời Chính Thức</h2>
            <p className="text-[#8C7A6B] text-sm uppercase tracking-widest mb-6">Chào mừng bạn đến với ngày vui của chúng tôi</p>
            <div className="w-full h-[300px] bg-[#FDFBF7] rounded-lg border-2 border-dashed border-[#D5C7B8] flex items-center justify-center text-[#A09386] italic">
              (Phần ruột thiệp - Bạn có thể thiết kế tiếp ở đây)
            </div>
            <button 
              onClick={() => { setShowContent(false); setIsOpen(false); }}
              className="mt-8 px-6 py-2 bg-[#8C7A6B] text-white text-xs uppercase tracking-widest rounded-full hover:bg-[#6A5A4E] transition-colors"
            >
              ← Quay lại bìa thiệp
            </button>
          </div>
        </main>
      )}

    </div>
  );
}