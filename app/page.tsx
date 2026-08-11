"use client";

import React, { useState, useEffect, useRef } from "react";

// ==========================================
// 1. DỮ LIỆU TĨNH
// ==========================================
// Trái tim đã được đẩy sang 2 lề và rơi chậm hơn (12s - 20s)
const PARTICLES = [
  { id: 1, left: "3%", delay: "0s", duration: "15s", size: "12px", content: "❤" },
  { id: 2, left: "8%", delay: "3s", duration: "18s", size: "10px", content: "✿" },
  { id: 3, left: "12%", delay: "7s", duration: "14s", size: "14px", content: "❤" },
  { id: 4, left: "6%", delay: "2s", duration: "19s", size: "12px", content: "✿" },
  { id: 5, left: "85%", delay: "1s", duration: "16s", size: "15px", content: "❤" },
  { id: 6, left: "92%", delay: "6s", duration: "14s", size: "10px", content: "✿" },
  { id: 7, left: "97%", delay: "2s", duration: "17s", size: "16px", content: "❤" },
  { id: 8, left: "89%", delay: "4s", duration: "18s", size: "11px", content: "✿" },
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

const BG_WATERMARK = [
  { id: 1, src: "/Hoa.png", top: "2%", left: "-10%", width: "200px", rotate: "10deg" },
  { id: 2, src: "/Hoa.png", top: "25%", right: "-15%", width: "250px", rotate: "-20deg" },
  { id: 3, src: "/Hoa.png", top: "50%", left: "-5%", width: "220px", rotate: "170deg" },
  { id: 4, src: "/Hoa.png", bottom: "10%", right: "-10%", width: "240px", rotate: "45deg" },
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

// ==========================================
// 2. TRANG CHÍNH
// ==========================================
export default function WeddingCardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true); 
  const [isOpen, setIsOpen] = useState(false); 
  
  // Trạng thái tự động cuộn
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [showHint, setShowHint] = useState(false); // Hint "Chạm để dừng"
  const requestRef = useRef<number>();

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Khóa cuộn trang khi chưa mở thiệp
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  // Logic Tự động cuộn mượt mà
  const scroll = () => {
    if (isAutoScrolling) {
      window.scrollBy(0, 0.6); // Tốc độ cuộn: 0.6px mỗi frame
      requestRef.current = requestAnimationFrame(scroll);
    }
  };

  useEffect(() => {
    if (isAutoScrolling) {
      requestRef.current = requestAnimationFrame(scroll);
    } else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isAutoScrolling]);

  // Xử lý mở thiệp
  const handleOpenCard = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsAutoScrolling(true);
      setShowHint(true);
      setTimeout(() => setShowHint(false), 4000); // Ẩn hint sau 4s
    }, 1200); // Đợi bìa lật xong mới bắt đầu cuộn
  };

  // Toggle Play/Pause cuộn khi chạm vào màn hình
  const toggleAutoScroll = () => {
    if (isOpen) {
      setIsAutoScrolling(prev => !prev);
    }
  };

  if (!isMounted) return <div className="min-h-screen bg-[#8C8076]"></div>;

  return (
    <div 
        className="relative selection:bg-[#E5D9CC] selection:text-[#4A3C31] font-sans text-[#5C4F44] min-h-screen bg-[#8C8076] cursor-pointer"
        onClick={toggleAutoScroll} // Chạm bất cứ đâu để Dừng / Chạy cuộn
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        
        @keyframes fall { 0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(110vh) translateX(-20px) rotate(360deg); opacity: 0; } }
        @keyframes heart-blink { 0%, 100% { stroke: transparent; stroke-width: 0px; transform: scale(1); opacity: 0.5; } 50% { stroke: #FF99C2; stroke-width: 1.5px; transform: scale(1.15); opacity: 0.85; } }
        .animate-heart { animation: heart-blink 2s ease-in-out infinite; }
        
        @keyframes sway-forest { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }

        @keyframes sparkle {
           0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
           50% { opacity: 0.9; transform: scale(1) rotate(90deg); filter: drop-shadow(0 0 4px rgba(255,255,255,0.9)); }
        }
        .animate-sparkle { animation: sparkle 2.5s ease-in-out infinite; }
      `}} />

      {/* Hạt rơi nền 2 bên (Fixed) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {PARTICLES.map((p) => (
            <div key={`bg-${p.id}`} className="absolute top-[-5%]" style={{ left: p.left, width: p.size, height: p.size, animation: `fall ${p.duration} linear infinite`, animationDelay: p.delay }}>
              <svg viewBox="0 0 24 24" fill="#FFC0CB" className="w-full h-full animate-heart opacity-70" style={{ animationDelay: p.delay, overflow: 'visible' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
          ))}
      </div>

      {/* MÀN HÌNH CHÀO */}
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F4EFEA] transition-all duration-1000 ease-in-out ${showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <div className="flex flex-col items-center justify-center text-center px-6">
            <span className="text-[#8C7A6B] text-4xl mb-4 animate-bounce">❦</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#5C4F44] italic mb-6 leading-relaxed">Chào mừng bạn đến với<br/>Lễ Cưới của chúng tôi</h2>
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#8C7A6B] rounded-full animate-ping"></div>
                <p className="text-[10px] md:text-xs text-[#8C7A6B] tracking-[0.3em] uppercase">Đang mở thiệp mời</p>
                <div className="w-1.5 h-1.5 bg-[#8C7A6B] rounded-full animate-ping delay-150"></div>
            </div>
         </div>
      </div>

      {/* GỢI Ý CHẠM ĐỂ DỪNG (Hiện lên một lúc rồi tắt) */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] bg-black/40 text-white px-5 py-2 rounded-full backdrop-blur-sm text-[11px] uppercase tracking-widest transition-opacity duration-1000 pointer-events-none ${showHint ? 'opacity-100' : 'opacity-0'}`}>
          Chạm màn hình để dừng / cuộn
      </div>

      {/* ============================================== */}
      {/* OVERLAY BÌA THIỆP (LẬT VÀO HƯ KHÔNG & TAN BIẾN) */}
      {/* ============================================== */}
      <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-[1500ms] ${isOpen ? 'pointer-events-none' : ''}`} 
          style={{ perspective: '2000px' }}
      >
          <div 
              className="relative w-[92%] sm:w-full max-w-[420px] aspect-[3/4] min-h-[550px] shadow-2xl bg-[#FDFBF7] rounded-lg border border-[#EAE3DB] overflow-hidden"
              style={{
                  transformOrigin: 'left center',
                  transform: isOpen ? 'rotateY(-110deg)' : 'rotateY(0deg)',
                  opacity: isOpen ? 0 : 1, // Mờ dần khi lật
                  transition: 'transform 1.4s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 1s 0.2s ease-out'
              }}
          >
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                {PARTICLES.slice(0, 8).map((p) => (
                  <div key={`card-${p.id}`} className="absolute top-[-5%]" style={{ left: p.left, width: p.size, height: p.size, animation: `fall ${p.duration} linear infinite`, animationDelay: p.delay }}>
                    <svg viewBox="0 0 24 24" fill="#FFC0CB" className="w-full h-full animate-heart" style={{ animationDelay: p.delay, overflow: 'visible' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </div>
                ))}
              </div>

              <LuxuryCorner className="top-4 left-4" />
              <LuxuryCorner className="top-4 right-4 rotate-90" />
              <LuxuryCorner className="bottom-4 right-4 rotate-180" />
              <LuxuryCorner className="bottom-4 left-4 -rotate-90" />

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 overflow-hidden">
                 <div className="absolute flex items-center justify-center">
                    <div className="absolute w-[200px] h-[200px] md:w-[240px] md:h-[240px] border-[1px] border-[#D5C7B8] rounded-full opacity-40 -translate-x-4 md:-translate-x-6"></div>
                    <div className="absolute w-[200px] h-[200px] md:w-[240px] md:h-[240px] border-[1px] border-[#D5C7B8] rounded-full opacity-40 translate-x-4 md:translate-x-6"></div>
                 </div>
                 <div className="text-[130px] md:text-[160px] font-serif text-[#D5C7B8] opacity-20 select-none">囍</div>
              </div>
              
              <div className="absolute inset-x-0 bottom-0 pointer-events-none z-[15]">
                 {FOREST_FLOWERS.map((flower) => (
                    <div key={flower.id} className="absolute" style={{ left: flower.left, bottom: flower.bottom, width: flower.width, transform: `rotate(${flower.rotate})`, animation: `sway-forest ${flower.duration} ease-in-out infinite`, animationDelay: flower.delay }}>
                        <img src={flower.src} alt="Flower" className="w-full h-auto origin-bottom opacity-90" />
                    </div>
                 ))}
              </div>

              <div className="relative z-40 flex flex-col items-center justify-center text-center px-6 w-full h-full pt-8 pb-32">
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
                    onClick={(e) => { e.stopPropagation(); handleOpenCard(); }} 
                    className="px-10 py-3.5 bg-[#8C7A6B] text-white text-[13px] uppercase tracking-widest rounded-full shadow-lg hover:bg-[#6A5A4E] hover:scale-105 transition-all duration-300 relative z-50"
                >
                    Mở thiệp
                </button>
              </div>
          </div>
      </div>

      {/* ============================================== */}
      {/* CUỘN GIẤY THIỆP CHÍNH (SINGLE LONG SHEET) */}
      {/* Bắt đầu bị mờ & thu nhỏ, sau khi mở sẽ phóng to và rõ nét */}
      {/* ============================================== */}
      <div 
          className={`relative z-10 w-[92%] sm:w-full max-w-2xl bg-[#FCF8F2] shadow-2xl mx-auto border border-[#EAE3DB] overflow-hidden transition-all duration-[1200ms] ease-out
              ${isOpen ? 'opacity-100 scale-100 translate-y-0 my-10' : 'opacity-0 scale-[0.9] translate-y-16 mt-20'}
          `}
      >
         
         {/* HỌA TIẾT HOA IN CHÌM TRẢI DÀI KHẮP CUỘN GIẤY */}
         <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {BG_WATERMARK.map((flower) => (
                <img key={`wm-${flower.id}`} src={flower.src} className="absolute opacity-[0.06] pointer-events-none" style={{ top: flower.top, left: flower.left, right: flower.right, bottom: flower.bottom, width: flower.width, transform: `rotate(${flower.rotate})` }} />
            ))}
         </div>

         {/* PHẦN ĐẦU: ẢNH POLAROID */}
         <div className="relative z-20 flex flex-col items-center pt-16 pb-12 px-4">
             <p className="uppercase tracking-[0.25em] text-[10px] md:text-xs text-[#8C7A6B] font-medium mb-1">The Wedding Of</p>
             <h2 className="text-3xl md:text-4xl font-serif italic text-[#5C4F44] mb-8">Đỗ Trung & Đặng Hải</h2>
             
             <div className="relative w-[85%] max-w-[320px] bg-white p-3 md:p-4 pb-14 shadow-xl rotate-[2deg] mt-1">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 md:w-24 h-6 md:h-8 bg-[#DBCBB5] opacity-85 rotate-[-3deg] shadow-sm z-10"></div>
                
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

                <img src="/Con_dau1.png" alt="Wax Seal" className="absolute -bottom-6 -right-5 md:-bottom-8 md:-right-6 w-16 h-16 md:w-20 md:h-20 z-30 drop-shadow-md object-contain" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Con_dau1.jpg"; }} />
                
                <div className="absolute -bottom-8 -left-8 md:-bottom-10 md:-left-12 w-32 md:w-40 z-20 pointer-events-none drop-shadow-lg" style={{ transform: 'rotate(-12deg)' }}>
                    <img src="/HoaT1.png" alt="Hoa Polaroid" className="w-full h-auto origin-bottom-left" style={{ animation: 'sway-forest 6s ease-in-out infinite' }} onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/HoaT1.jpg"; }} />
                </div>
             </div>
         </div>

         {/* PHẦN DƯỚI: THÔNG TIN LỄ CƯỚI TRANG TRỌNG */}
         <div className="relative z-20 w-full flex flex-col items-center">
            
            {/* Thanh tiêu đề xanh rêu */}
            <div className="w-full bg-[#253627] py-4 md:py-5 text-center shadow-sm">
                <h2 className="text-[#FAF6EE] font-serif text-xl md:text-2xl tracking-widest uppercase">Thông Tin Lễ Cưới</h2>
            </div>

            <div className="px-6 py-12 md:px-12 w-full flex flex-col items-center text-center">
                {/* Thông tin Gia đình 2 bên */}
                <div className="w-full flex justify-between items-start text-[#4A5D4E] text-[11px] md:text-sm font-medium mb-12 relative">
                    {/* Nhà Trai */}
                    <div className="w-[45%] flex flex-col items-center">
                        <span className="text-[#8C7A6B] mb-2 uppercase tracking-[0.2em] text-[9px] md:text-[10px]">Ông Bà</span>
                        <span className="font-bold text-[#253627] mb-1">Võ Nhật Minh</span>
                        <span className="font-bold text-[#253627] mb-2">Trần Thu Thảo</span>
                        <span className="text-[#6B6154] font-normal leading-relaxed text-[10px] md:text-xs">63 Nguyễn Huệ, Quận 1,<br/>TP. Hồ Chí Minh</span>
                    </div>

                    {/* Đường phân cách */}
                    <div className="absolute left-1/2 top-[10%] bottom-[10%] w-[1px] bg-[#D5C7B8] -translate-x-1/2"></div>

                    {/* Nhà Gái */}
                    <div className="w-[45%] flex flex-col items-center">
                        <span className="text-[#8C7A6B] mb-2 uppercase tracking-[0.2em] text-[9px] md:text-[10px]">Ông Bà</span>
                        <span className="font-bold text-[#253627] mb-1">Huỳnh Thanh Nam</span>
                        <span className="font-bold text-[#253627] mb-2">Nguyễn Thị Kim Oanh</span>
                        <span className="text-[#6B6154] font-normal leading-relaxed text-[10px] md:text-xs">456 Lê Lợi, Quận 3,<br/>TP. Hồ Chí Minh</span>
                    </div>
                </div>

                <p className="text-[#253627] text-[11px] md:text-xs uppercase tracking-[0.2em] leading-loose mb-8 font-medium">
                    Trân trọng báo tin<br/>Lễ thành hôn của con chúng tôi
                </p>

                <h1 className="text-4xl md:text-5xl font-serif text-[#253627] mb-2">Đỗ Trung</h1>
                <span className="text-[#8C7A6B] text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-4">Trưởng Nam</span>

                <span className="text-2xl font-serif text-[#8C7A6B] italic my-3">&</span>

                <h1 className="text-4xl md:text-5xl font-serif text-[#253627] mt-4 mb-2">Đặng Hải</h1>
                <span className="text-[#8C7A6B] text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-12">Út Nữ</span>

                <p className="text-[#253627] text-[11px] md:text-xs uppercase tracking-[0.15em] leading-loose mb-8 font-medium">
                    Lễ thành hôn được cử hành tại<br/>
                    <span className="font-bold text-sm md:text-base text-[#253627]">Tư Gia</span><br/>
                    Vào lúc 09:00
                </p>

                <div className="flex items-center justify-center gap-4 md:gap-6 text-[#253627] mb-5">
                    <span className="uppercase tracking-widest text-[10px] md:text-xs font-medium">Chủ Nhật</span>
                    <div className="h-8 w-[1px] bg-[#D5C7B8]"></div>
                    <span className="text-4xl md:text-5xl font-serif">03</span>
                    <div className="h-8 w-[1px] bg-[#D5C7B8]"></div>
                    <span className="uppercase tracking-widest text-[10px] md:text-xs font-medium">Tháng 01</span>
                </div>
                <span className="text-xl md:text-2xl font-serif text-[#253627] mb-2">2027</span>
                <span className="text-[#6B6154] text-[10px] md:text-xs uppercase tracking-wider mb-8">
                    (Tức ngày 26 tháng 11 năm Bính Ngọ)
                </span>
            </div>
         </div>

      </div>
    </div>
  );
}