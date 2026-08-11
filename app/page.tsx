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


// ==========================================
// 2. TRANG CHÍNH
// ==========================================
export default function WeddingCardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  
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
        @keyframes sway-forest { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }

        /* LỚP CSS TẠO MÔI TRƯỜNG 3D THỰC TẾ */
        .perspective-2000 { perspective: 2000px; -webkit-perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; -webkit-transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}} />

      {/* Bao bọc toàn bộ bằng Không gian 3D (Perspective) */}
      <section className="perspective-2000 w-full min-h-screen relative flex items-center justify-center p-4 bg-[#8C8076] z-20 overflow-hidden">
        
        {/* Hạt rơi nền */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 fixed">
          {PARTICLES.map((p) => (
            <div key={`bg-${p.id}`} className="absolute top-[-5%]" style={{ left: p.left, width: p.size, height: p.size, animation: `fall ${p.duration} linear infinite`, animationDelay: p.delay }}>
              <svg viewBox="0 0 24 24" fill="#FFC0CB" className="w-full h-full animate-heart opacity-70" style={{ animationDelay: p.delay, overflow: 'visible' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
          ))}
        </div>

        {/* ============================================== */}
        {/* CUỐN SÁCH TỔNG (CONTAINER): Phóng to ra khi mở */}
        {/* ============================================== */}
        <div 
            className="relative preserve-3d w-[92%] sm:w-full max-w-[420px] aspect-[3/4] min-h-[550px] md:min-h-[600px] shadow-2xl transition-all duration-[1200ms] ease-in-out"
            style={{ 
                // Khi mở thiệp, đẩy toàn bộ khung sang phải một chút và phóng to lên 12%
                transform: isOpen ? 'scale(1.12) translateX(4%)' : 'scale(1) translateX(0)',
                transitionDelay: isOpen ? '0.2s' : '0s' // Trễ 0.2s để chờ bìa bắt đầu lật
            }}
        >
            
          {/* ============================================== */}
          {/* RUỘT THIỆP (Nằm dưới đáy): Lộ ra khi lật bìa */}
          {/* ============================================== */}
          <div className="absolute inset-0 z-10 bg-[#FDFBF7] rounded-lg border border-[#EAE3DB] flex flex-col items-center pt-10 pb-6 px-4 overflow-hidden">
             
             {/* Text Heading */}
             <p className="uppercase tracking-[0.25em] text-[10px] md:text-xs text-[#8C7A6B] font-medium mb-2">The Wedding Of</p>
             <h2 className="text-3xl md:text-4xl font-serif italic text-[#5C4F44] mb-8">Đỗ Trung & Đặng Hải</h2>
             
             {/* Khung ảnh Polaroid chứa AnhT1 & Con_dau1 */}
             <div className="relative w-[85%] max-w-[300px] bg-white p-3 md:p-4 pb-12 md:pb-14 shadow-xl rotate-[2deg] mt-2">
                
                {/* Băng dính */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 md:w-24 h-6 md:h-8 bg-[#DBCBB5] opacity-85 rotate-[-3deg] shadow-sm z-10"></div>
                
                {/* Ảnh cưới */}
                <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden relative">
                    <img 
                        src="/AnhT1.jpg" 
                        alt="Wedding Photo" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            if (!e.currentTarget.src.includes('.png')) e.currentTarget.src = "/AnhT1.png";
                        }} 
                    />
                </div>

                {/* Dấu sáp (Con_dau1) */}
                <img 
                    src="/Con_dau1.png" 
                    alt="Wax Seal" 
                    className="absolute -bottom-6 -right-5 md:-bottom-8 md:-right-6 w-16 h-16 md:w-20 md:h-20 z-30 drop-shadow-md object-contain"
                    onError={(e) => {
                        if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Con_dau1.jpg";
                    }}
                />
                
                {/* Hoa trang trí đè lên góc trái ảnh */}
                <img src="/Hoa.png" className="absolute -bottom-8 -left-8 md:-bottom-10 md:-left-12 w-32 md:w-40 -rotate-[12deg] opacity-90 pointer-events-none z-20 drop-shadow-lg" />
             </div>

             {/* Nút Đóng */}
             <button 
                 onClick={() => setIsOpen(false)}
                 className="mt-auto px-6 py-2 border border-[#D5C7B8] rounded-full text-[10px] uppercase tracking-widest text-[#8C7A6B] hover:bg-[#F9F6F0] transition-colors"
             >
                 ← Đóng thiệp
             </button>
          </div>


          {/* ============================================== */}
          {/* CỤM BÌA THIỆP (Nằm trên cùng): Có 2 mặt trước sau */}
          {/* ============================================== */}
          <div 
              className="absolute inset-0 z-40 preserve-3d"
              style={{
                  transformOrigin: 'left center', // Bản lề lật ở mép trái thiệp
                  transform: isOpen ? 'rotateY(-140deg)' : 'rotateY(0deg)', // Lật 140 độ sang trái
                  transition: 'transform 1.4s cubic-bezier(0.645, 0.045, 0.355, 1)',
                  pointerEvents: isOpen ? 'none' : 'auto'
              }}
          >
              
              {/* --- MẶT SAU CỦA BÌA (Hiện ra khi thiệp lật sang trái) --- */}
              <div 
                  className="absolute inset-0 bg-[#F4EFEA] rounded-lg border border-[#D5C7B8] backface-hidden shadow-inner flex items-center justify-center"
                  style={{ transform: 'rotateY(180deg)' }}
              >
                  <div className="text-[120px] font-serif text-[#D5C7B8] opacity-30">囍</div>
              </div>

              {/* --- MẶT TRƯỚC CỦA BÌA (Giao diện cũ của bạn) --- */}
              <div className="absolute inset-0 bg-[#FDFBF7] rounded-lg border border-[#EAE3DB] backface-hidden overflow-hidden">
                  
                  {/* Hạt rơi bên trong bìa */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    {PARTICLES.slice(0, 8).map((p) => (
                      <div key={`card-${p.id}`} className="absolute top-[-5%]" style={{ left: p.left, width: p.size, height: p.size, animation: `fall ${p.duration} linear infinite`, animationDelay: p.delay }}>
                        <svg viewBox="0 0 24 24" fill="#FFC0CB" className="w-full h-full animate-heart" style={{ animationDelay: p.delay, overflow: 'visible' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      </div>
                    ))}
                  </div>

                  {/* Các góc viền cao cấp */}
                  <LuxuryCorner className="top-4 left-4" />
                  <LuxuryCorner className="top-4 right-4 rotate-90" />
                  <LuxuryCorner className="bottom-4 right-4 rotate-180" />
                  <LuxuryCorner className="bottom-4 left-4 -rotate-90" />

                  {/* Watermark in chìm */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 overflow-hidden">
                     <div className="absolute flex items-center justify-center">
                        <div className="absolute w-[200px] h-[200px] md:w-[240px] md:h-[240px] border-[1px] border-[#D5C7B8] rounded-full opacity-40 -translate-x-4 md:-translate-x-6"></div>
                        <div className="absolute w-[200px] h-[200px] md:w-[240px] md:h-[240px] border-[1px] border-[#D5C7B8] rounded-full opacity-40 translate-x-4 md:translate-x-6"></div>
                     </div>
                     <div className="text-[130px] md:text-[160px] font-serif text-[#D5C7B8] opacity-20 select-none">囍</div>
                  </div>
                  
                  {/* Rừng hoa đong đưa */}
                  <div className="absolute inset-x-0 bottom-0 pointer-events-none z-30">
                     {FOREST_FLOWERS.map((flower) => (
                        <div key={flower.id} className="absolute" style={{ left: flower.left, bottom: flower.bottom, width: flower.width, zIndex: flower.zIndex, transform: `rotate(${flower.rotate})`, transformOrigin: 'bottom center' }}>
                            <img src={flower.src} alt="Flower" className="w-full h-auto origin-bottom opacity-90" style={{ animation: `sway-forest ${flower.duration} ease-in-out infinite`, animationDelay: flower.delay }} />
                        </div>
                     ))}
                  </div>

                  {/* Chữ và Nút Bìa Thiệp */}
                  <div className="relative z-40 flex flex-col items-center justify-center text-center px-6 w-full h-full pt-8 pb-32 md:pb-36">
                    <div className="bg-[#6A5A4E] w-12 h-12 rounded-full flex items-center justify-center shadow-md mb-6 pointer-events-none">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif text-[#5C4F44] font-light pointer-events-none drop-shadow-md whitespace-nowrap">Đỗ Trung</h1>
                    <span className="text-xl font-serif text-[#8C7A6B] italic my-1 pointer-events-none">&</span>
                    <h1 className="text-4xl md:text-5xl font-serif text-[#5C4F44] font-light pointer-events-none drop-shadow-md whitespace-nowrap">Đặng Hải</h1>

                    <div className="flex items-center gap-2 my-5 text-[#A09386] pointer-events-none">
                      <span className="w-10 h-[1px] bg-[#D5C7B8]"></span>
                      <span className="text-lg font-serif">❦</span>
                      <span className="w-10 h-[1px] bg-[#D5C7B8]"></span>
                    </div>

                    <p className="text-[#8C7A6B] text-lg font-serif tracking-wide pointer-events-none mb-1">3 tháng 1, 2027</p>
                    <p className="text-[#8C7A6B] text-sm mt-2 mb-10 uppercase tracking-[0.2em] font-medium pointer-events-none">Thân Mời</p>

                    <button 
                        onClick={() => setIsOpen(true)} // Gắn sự kiện lật trang
                        className="px-10 py-3.5 bg-[#8C7A6B] text-white text-[13px] uppercase tracking-widest rounded-full shadow-lg hover:bg-[#6A5A4E] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                        Mở thiệp
                    </button>
                  </div>
              </div>
          </div>

        </div>
      </section>
    </div>
  );
}