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
  "/AnhT1.jpg", 
  "/AnhT1.jpg", 
  "/AnhT1.jpg", 
  "/AnhT1.jpg", 
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

const FadeIn = ({ children, delay = 0, duration = 1200, className = "" }: { children: React.ReactNode, delay?: number, duration?: number, className?: string }) => {
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
    <div ref={ref} className={`transition-all ease-[cubic-bezier(0.25,1,0.5,1)] w-full flex flex-col items-center ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'} ${className}`} style={{ transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` }}>
      {children}
    </div>
  );
};

const TypingText = ({ text, delay = 100, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsTypingComplete(false);
    let currentIdx = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[currentIdx]);
      currentIdx++;
      if (currentIdx === text.length) {
        clearInterval(intervalId);
        setIsTypingComplete(true);
        if (onComplete) onComplete();
      }
    }, delay);
    return () => clearInterval(intervalId);
  }, [text, delay, onComplete]);

  return <span className={isTypingComplete ? "" : "typing"}>{displayedText}</span>;
};

// ==========================================
// 2. TRANG CHÍNH
// ==========================================
export default function WeddingCardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true); 
  
  // Trạng thái thiệp: idle -> scaling -> bursting -> gramophone -> done
  const [cardState, setCardState] = useState<'idle' | 'scaling' | 'bursting' | 'gramophone' | 'done'>('idle');
  
  // Trạng thái cục bộ cho Gramophone Scene: recordIn -> needleIn -> playing -> texts
  const [gramophoneStage, setGramophoneStage] = useState<'entry' | 'recordIn' | 'needleIn' | 'playing' | 'text1' | 'text2' | 'text3' | 'end'>('entry');
  const [typingStage, setTypingStage] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const gramophoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Điều khiển trình tự thời gian cho Gramophone Scene
  useEffect(() => {
    if (cardState === 'gramophone' && gramophoneStage === 'entry') {
      // 1. Gramophone Entry (mượt mà, 0.5s fade-in)
      
      // 2. recordIn (gạt đĩa than vào, 0.8s)
      setTimeout(() => setGramophoneStage('recordIn'), 500);
      
      // 3. needleIn (gạt kim vào, 0.8s)
      setTimeout(() => setGramophoneStage('needleIn'), 1300);
      
      // 4. Kim chạm đĩa -> Bắt đầu chơi (quay đĩa, phát nhạc)
      setTimeout(() => {
          setGramophoneStage('playing');
          // audioRef.current?.play(); // PHÁT NHẠC Ở ĐÂY
      }, 2100);

      // 5. Hiển thị văn bản (mượt mà, từng câu)
      setTimeout(() => setGramophoneStage('text1'), 2100);
      setTimeout(() => setGramophoneStage('text2'), 4100);
      setTimeout(() => setGramophoneStage('text3'), 7100);
      
      // 6. Scene kết thúc
      setTimeout(() => setGramophoneStage('end'), 8600);
    }
  }, [cardState, gramophoneStage]);

  useEffect(() => {
      if (gramophoneStage === 'end' && cardState === 'gramophone') {
          // Hủy scene và chuyển card sang done
          setCardState('done');
      }
  }, [gramophoneStage, cardState]);

  const handleOpenCard = () => {
    if (cardState !== 'idle') return;
    setCardState('scaling');
    setTimeout(() => {
      setCardState('bursting'); 
    }, 800); 
    setTimeout(() => {
      // Chuyển card sang scene Gramophone cổ điển
      setCardState('gramophone'); 
      setGramophoneStage('entry'); // Bắt đầu scene
    }, 1500); // 1.5s scaling+bursting
  };

  if (!isMounted) return <div className="min-h-[100dvh] bg-[#8C8076]"></div>;

  return (
    <div className={`relative selection:bg-[#E5D9CC] selection:text-[#4A3C31] font-sans text-[#5C4F44] bg-[#8C8076] w-full flex flex-col items-center mx-auto overflow-hidden h-[100dvh]`}>
      
      {/* HTML5 Audio cho nhạc Gramophone */}
      {/* <audio ref={audioRef} src="/wedding-music.mp3" preload="auto" loop /> */}

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        
        @keyframes fall { 0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(110vh) translateX(-20px) rotate(360deg); opacity: 0; } }
        @keyframes heart-blink { 0%, 100% { stroke: transparent; stroke-width: 0px; transform: scale(1); opacity: 0.5; } 50% { stroke: #FF99C2; stroke-width: 1.5px; transform: scale(1.15); opacity: 0.85; } }
        .animate-heart { animation: heart-blink 2s ease-in-out infinite; }

        @keyframes bursting-fade {
            0% { transform: scale(1) translate(-50%, -50%); opacity: 1; }
            100% { transform: scale(2.5) translate(-50%, -50%); opacity: 0; }
        }
        .animate-bursting { animation: bursting-fade 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards; }

        @keyframes bursting-flower-fade {
            0% { transform: translate(-50%, -50%) translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(1.5); opacity: 0; }
        }
        .animate-bursting-flower { animation: bursting-flower-fade 1s cubic-bezier(0.19, 1, 0.22, 1) forwards; }

        @keyframes bubble-rise {
            0% { transform: translateY(10px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-120px); opacity: 0; }
        }
        .animate-bubble { animation: bubble-rise 4s ease-out infinite; }

        @keyframes sway { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
        
        @keyframes scale-up-invitation {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-invitation-scale { animation: scale-up-invitation 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

        /* KEYFRAMES CHO CẢNH GRAMOPHONE */
        @keyframes gramophone-fade-in {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        .animate-gramophone-entry { animation: gramophone-fade-in 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

        @keyframes record-in {
            0% { transform: translate(100%, 0) rotate(0deg); opacity: 0; }
            100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
        }
        .animate-record-in { animation: record-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

        @keyframes needle-in {
            0% { transform: rotate(-100deg); opacity: 0; }
            100% { transform: rotate(-45deg); opacity: 1; } /* Vị trí kim trên đĩa */
        }
        .animate-needle-in { animation: needle-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .animate-spin-linear { animation: spin 4s linear infinite; }

        @keyframes text-fade-in {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        .animate-text-fade-in { animation: text-fade-in 1s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

        @keyframes typing { from { width: 0 } to { width: 100% } }
        @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: #8C7A6B; } }
        .typing {
          overflow: hidden;
          border-right: 2px solid #8C7A6B;
          white-space: nowrap;
          animation: typing 1s steps(20, end), blink-caret 0.75s step-end infinite;
          display: inline-block;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 0px; background: transparent; }
        
        .art-paper-bg {
           background-color: #F8F4ED;
           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
        
        .shadow-luxury-btn { box-shadow: 0 4px 10px rgba(0,0,0,0.15); }
      `}} />

      {/* MÀN HÌNH CHÀO */}
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDFBF7] transition-all duration-1000 ease-in-out ${showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <div className="flex flex-col items-center justify-center text-center px-6">
            <span className="text-[#8C7A6B] text-4xl mb-4 animate-bounce">❦</span>
            <TypingText text="Chào mừng bạn đến với" />
            <TypingText text="Lễ Cưới của chúng tôi" delay={150} />
            <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-[#8C7A6B] rounded-full animate-bubble"></div>
                <div className="w-2 h-2 bg-[#8C7A6B] rounded-full animate-bubble delay-150"></div>
                <div className="w-2 h-2 bg-[#8C7A6B] rounded-full animate-bubble delay-300"></div>
            </div>
         </div>
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
          
          <div className="relative w-full max-w-[460px] h-full max-h-[850px] shadow-2xl md:rounded-lg border-x border-[#EAE3DB] overflow-hidden bg-[#FDFBF7]" style={{ perspective: '1000px' }}>
              
              {/* === Gramophone Classic Scene (Cảnh chuyển tiếp tương tác mượt mà) === */}
              {cardState === 'gramophone' && (
              <div 
                  ref={gramophoneRef}
                  className={`absolute top-1/2 left-1/2 inset-0 w-full h-full bg-[#FDFBF7] z-50 flex flex-col items-center justify-center text-center px-6 transition-all duration-500 ease-in-out shadow-luxury-btn border border-[#EAE3DB]
                      ${gramophoneStage === 'end' ? 'opacity-0 scale-105 pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]' : ''}
                      animate-gramophone-entry
                  `}
                  style={{ transform: 'translate(-50%, -50%)', origin: 'center center' }}
              >
                  <LuxuryCorner className="top-4 left-4" />
                  <LuxuryCorner className="top-4 right-4 rotate-90" />
                  <LuxuryCorner className="bottom-4 right-4 rotate-180" />
                  <LuxuryCorner className="bottom-4 left-4 -rotate-90" />

                  {/* Khu vực Gramophone Container */}
                  <div className="relative w-[80%] aspect-square flex items-center justify-center mb-12" style={{ perspective: '1000px' }}>
                     
                      {/* Đĩa Than (Vinyl Record) */}
                      <div className={`absolute w-[95%] aspect-square flex items-center justify-center bg-[#212121] rounded-full border-[6px] border-[#313131] shadow-[0_5px_15px_rgba(0,0,0,0.5)] transition-all duration-[800ms] ease-in-out
                          ${(gramophoneStage === 'recordIn' || gramophoneStage === 'needleIn' || gramophoneStage === 'playing' || gramophoneStage.startsWith('text')) ? 'animate-record-in opacity-100 scale-100' : 'opacity-0 scale-95'}
                          ${(gramophoneStage === 'playing' || gramophoneStage.startsWith('text')) ? 'animate-spin-linear' : ''}
                      `} style={{ origin: 'center center' }}>
                         {/* Nhãn Đĩa (Label) */}
                         <div className="relative w-24 h-24 bg-[#B5A593] rounded-full flex flex-col items-center justify-center p-2 text-[#4A3C31] shadow-[inset_0_0_8px_rgba(0,0,0,0.3)]">
                            <span className="text-[10px] font-medium uppercase tracking-widest mb-1">WEDDING</span>
                            <span className="text-xl font-serif italic mb-1">Hải & Trung</span>
                            <span className="text-[9px] tracking-[0.3em]">3.1.2027</span>
                         </div>
                         {/* Lỗ trung tâm */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full shadow-inner"></div>
                      </div>

                      {/* Kim Gạt (Needle Arm) */}
                      <div className={`absolute top-[10%] right-[10%] w-[120px] aspect-[1/5] flex items-center justify-center transition-all duration-[800ms] ease-in-out origin-[top_center]
                          ${(gramophoneStage === 'needleIn' || gramophoneStage === 'playing' || gramophoneStage.startsWith('text')) ? 'animate-needle-in opacity-100' : 'opacity-0'}
                      `} style={{ transform: 'rotate(-45deg)' }}>
                         {/* Cần Kim */}
                         <div className="w-2.5 h-[100%] bg-[#BDBDBD] rounded-full shadow-sm"></div>
                         {/* Đầu Kim */}
                         <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-8 h-10 bg-[#757575] rounded-t-sm shadow-md flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-[#424242] rounded-full"></div>
                         </div>
                      </div>

                      {/* Thân Gramophone Base (bằng divs, dummy) */}
                      <div className="absolute -bottom-6 w-full h-[25%] bg-[#FDFBF7] p-2 flex items-center justify-center">
                          <div className="absolute -bottom-2 w-[70%] h-3 bg-[#EAE3DB] rounded-b-md shadow-sm"></div>
                      </div>

                  </div>

                  {/* Khu vực Văn bản bên dưới máy phát nhạc (typing effect mượt mà) */}
                  <div className="flex flex-col items-center justify-center w-full px-2 text-[#5C4F44] space-y-4">
                    {gramophoneStage.startsWith('text') && <p className="animate-text-fade-in text-lg font-serif italic mb-2">❦ Xin chào bạn,...❦</p>}
                    {(gramophoneStage === 'text2' || gramophoneStage === 'text3') && <p className="animate-text-fade-in text-sm font-sans tracking-wide leading-relaxed delay-1000">Cảm ơn bạn đã đến với đám cưới của chúng tôi!</p>}
                    {gramophoneStage === 'text3' && <p className="animate-text-fade-in text-sm font-sans tracking-wide leading-relaxed delay-2000">Xin cảm ơn!</p>}
                  </div>
              </div>
              )}

              {/* === BÌA THIỆP (Z-10 khi mở xong, Z-50 khi đang idle/scaling/bursting) === */}
              {cardState !== 'done' && cardState !== 'gramophone' && (
              <div 
                  className={`absolute inset-0 w-full h-full bg-[#FDFBF7] overflow-hidden flex flex-col items-center justify-center text-center px-4 md:px-6 
                      ${cardState !== 'idle' ? 'z-50' : 'z-50'}
                      ${cardState === 'opening' ? 'rotate-y-[-110deg] transition-all duration-[1500ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]' : ''}
                      animate-invitation-scale
                  `}
                  style={{ transformOrigin: 'left center', transitionDelay: '0.1s' }}
              >
                  <LuxuryCorner className="top-4 left-4" />
                  <LuxuryCorner className="top-4 right-4 rotate-90" />
                  <LuxuryCorner className="bottom-4 right-4 rotate-180" />
                  <LuxuryCorner className="bottom-4 left-4 -rotate-90" />
                  
                  {/* Văn bản "Cưới" trung tâm nền */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 overflow-hidden">
                     <div className="absolute flex items-center justify-center">
                        <div className="absolute w-[220px] h-[220px] border-[1px] border-[#D5C7B8] rounded-full opacity-40 -translate-x-4"></div>
                        <div className="absolute w-[220px] h-[220px] border-[1px] border-[#D5C7B8] rounded-full opacity-40 translate-x-4"></div>
                     </div>
                     <div className="text-[150px] font-serif text-[#D5C7B8] opacity-20 select-none">囍</div>
                  </div>

                  {/* Hiệu ứng Bursting (0.7s, cubic-bezier mượt mà) */}
                  {(cardState === 'bursting' || cardState === 'opening' || cardState === 'gramophone') && (
                      <div className="absolute top-1/2 left-1/2 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-bursting origin-center z-40 w-[200px] aspect-square flex items-center justify-center">
                          <img src="/Hoadau1.png" alt="" className="w-full h-auto object-contain" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoadau1.jpg"; }} />
                          {GENTLE_CONFETTI.map((p) => (
                              <div key={p.id} className="absolute animate-bursting-flower opacity-0" style={{'--tx': `${p.tx}px`, '--ty': `${p.ty}px`, left: '50%', top: '50%', width: p.shape === 'heart' ? '18px' : '12px', aspectSquare: '1', color: p.color } as React.CSSProperties}>
                                  {p.shape === 'heart' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>}
                                  {p.shape === 'star' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>}
                                  {p.shape === 'bubble' && <div className="w-2 h-2 bg-currentColor rounded-full opacity-60"></div>}
                              </div>
                          ))}
                      </div>
                  )}

                  {/* Hoa treo treo (dummy hoặc gốc) */}
                  <div className={`absolute top-[-30px] -left-[20px] pointer-events-none z-30 transition-opacity duration-300 ${(cardState === 'bursting' || cardState === 'opening' || cardState === 'gramophone') ? 'opacity-0' : 'opacity-100'}`} style={{ animation: 'sway 6s ease-in-out infinite' }}>
                      <img src="/Hoadau1.png" alt="" className="w-[140px] h-auto opacity-95" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoadau1.jpg"; }} />
                  </div>

                  {/* Nội dung bìa thiệp (Đã tinh chỉnh cho mượt) */}
                  <div className={`relative z-40 flex flex-col items-center justify-center pt-8 pb-12 w-full transition-opacity duration-300 ${(cardState === 'bursting' || cardState === 'opening' || cardState === 'gramophone') ? 'opacity-0' : 'opacity-100'}`}>
                    
                    <div className="relative mb-6">
                      <div className="relative z-10 bg-[#8C7A6B] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-luxury-btn group">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-serif text-[#5C4F44] font-light mb-2">Đỗ Trung</h1>
                    <span className="text-2xl font-serif text-[#8C7A6B] italic my-2">&</span>
                    <h1 className="text-5xl md:text-6xl font-serif text-[#5C4F44] font-light mt-2">Đặng Hải</h1>

                    <div className="flex items-center gap-2 my-6 text-[#A09386]">
                      <span className="w-12 h-[1px] bg-[#D5C7B8]"></span>
                      <span className="text-xl font-serif">❦</span>
                      <span className="w-12 h-[1px] bg-[#D5C7B8]"></span>
                    </div>

                    <p className="text-[#8C7A6B] text-lg md:text-xl font-serif tracking-wide mb-12">3 tháng 1, 2027</p>

                    <button onClick={(e) => { e.stopPropagation(); handleOpenCard(); }} className={`px-10 md:px-12 py-3.5 md:py-4 bg-[#8C7A6B] text-white text-[13px] md:text-[14px] uppercase tracking-widest rounded-full shadow-luxury-btn hover:bg-[#7A6A5E] transition-all duration-300 relative z-50 ${cardState !== 'idle' ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100'}`}>
                        Mở thiệp
                    </button>
                  </div>
              </div>
              )}

              {/* === RUỘT THIỆP (Z-10 khi idle, Z-50 khi cardState === done) === */}
              <div 
                  ref={scrollRef}
                  className={`absolute inset-0 w-full h-full bg-[#FDFBF7] relative custom-scrollbar
                      ${cardState === 'done' ? 'z-50 overflow-y-auto pb-24' : 'z-10 overflow-hidden'}
                  `}
              >
                 {/* Lớp nền mờ chìm (Hoa chim) */}
                 <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply opacity-[0.1]">
                     <img src="/Hoa.png" alt="" className="absolute top-[2%] -left-[5%] w-[120px] opacity-60 -rotate-12" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoadau1.jpg"; }} />
                     <img src="/Hoa.png" alt="" className="absolute top-[18%] -right-[5%] w-[150px] opacity-50 rotate-45" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoadau1.jpg"; }} />
                     <img src="/Hoa.png" alt="" className="absolute top-[35%] -left-[10%] w-[180px] opacity-40 -rotate-45" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoadau1.jpg"; }} />
                     <img src="/Hoa.png" alt="" className="absolute top-[50%] -right-[8%] w-[140px] opacity-60 rotate-12" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoadau1.jpg"; }} />
                     <img src="/Hoa.png" alt="" className="absolute top-[70%] -left-[5%] w-[160px] opacity-45 -rotate-12" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoadau1.jpg"; }} />
                     <img src="/Hoa.png" alt="" className="absolute bottom-[5%] -right-[5%] w-[130px] opacity-55 rotate-45" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoadau1.jpg"; }} />
                 </div>

                 {/* Cấu trúc ruột thiệp (FadeIn delay mượt mà) */}
                 <div className="relative w-full flex flex-col items-center pt-24 z-20">
                     <p className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-[#8C7A6B] font-medium mb-2">The Wedding Of</p>
                     <h2 className="text-3xl md:text-4xl font-serif italic text-[#5C4F44] mb-12">Đỗ Trung <span className="font-serif italic text-[#8C7A6B] mx-2">&</span> Đặng Hải</h2>
                     
                     {/* ẢNH ĐẦU TIÊN (dummy hoặc gốc) */}
                     <div className="relative w-[88%] max-w-[340px] bg-white p-3 md:p-4 pb-16 shadow-xl rotate-[2deg] mx-auto mb-16">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#DBCBB5] opacity-85 rotate-[-3deg] shadow-sm z-10"></div>
                        <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden">
                            <img src="/AnhT1.jpg" alt="Wedding Photo" className="w-full h-full object-cover" onError={(e) => { if (!e.currentTarget.src.includes('.png')) e.currentTarget.src = "/Hoadau1.png"; }} />
                        </div>
                        <img src="/Hoa.png" alt="Dummy Seal" className="absolute -bottom-8 -right-6 w-20 h-20 z-30 drop-shadow-md object-contain" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoadau1.jpg"; }} />
                     </div>

                     {/* THẺ THÔNG TIN LỄ CƯỚI (Mượt) */}
                     {/* THAY ĐỔI: Văn bản ngày tháng chính xác và Hoa dưới (dummy hoặc gốc) */}
                     <div className="relative w-[90%] max-w-[400px] art-paper-bg rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.08)] mt-6 mb-8 border border-[#EAE3DB]">
                         
                         {/* Dummy Hoa treo ở góc trên (Tùy chọn) */}
                         <div className="absolute top-[-30px] -right-[15px] z-30 pointer-events-none origin-bottom" style={{ animation: 'sway 7s ease-in-out infinite' }}>
                             <img src="/Hoa.png" alt="" className="w-[120px] h-auto opacity-90" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoadau1.jpg"; }} />
                         </div>

                         {/* THAY ĐỔI: Thêm HoaDưới (dummy hoặc gốc) vào góc dưới */}
                         <div className="absolute -bottom-[60px] -left-[20px] z-30 pointer-events-none origin-top" style={{ animation: 'sway 8s ease-in-out infinite' }}>
                             <img src="/Hoa.png" alt="" className="w-[140px] h-auto opacity-95" onError={(e) => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = "/Hoadau1.jpg"; }} />
                         </div>

                         <div className="px-6 pt-12 pb-16 flex flex-col items-center text-center relative z-20 w-full">
                             {/* Tái tạo chính xác văn bản Ngày tháng */}
                             <div className="text-3xl font-serif text-[#5C4F44] mb-3">2027</div>
                             <div className="text-[#8C7A6B] text-[10px] md:text-[11px] uppercase tracking-[0.25em] leading-loose">(TỨC NGÀY 26 THÁNG 11 NĂM BÍNH NGỌ)</div>
                         </div>
                     </div>

                     {/* KHU VỰC ALBUM ẢNH LƯỚI (Mượt) */}
                     {/* THAY ĐỔI: Văn bản 'ALBUM ẢNH' được giữ lại */}
                     {/* THAY ĐỔI: Xóa cụm lá treo ở góc trên bên trái của 'ALBUM ẢNH' */}
                     <FadeIn delay={100} className="relative w-full flex flex-col items-center mt-12 mb-16">
                         
                         {/* THAY ĐỔI: Giữ lại văn bản 'ALBUM ẢNH' */}
                         <h3 className="text-[#5C4F44] font-serif text-xl tracking-[0.25em] uppercase font-bold mb-10 text-center drop-shadow-sm">Album Ảnh</h3>
                         
                         {/* Dummy Album Grid (2x2) */}
                         <div className="grid grid-cols-2 gap-4 w-[90%] max-w-[400px]">
                            {ALBUM_IMAGES.map((src, idx) => (
                                <div key={idx} className="relative aspect-[3/4] overflow-hidden rounded-md shadow-sm border-2 border-[#EAE3DB] group">
                                    <img src={src} alt={`Album ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => { if (!e.currentTarget.src.includes('.png')) e.currentTarget.src = "/Hoadau1.png"; }} />
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
"""

with open('/workspace/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(code_content)

result = subprocess.run(['git', 'add', '.'], capture_output=True, text=True, cwd='/workspace')
result2 = subprocess.run(['git', 'commit', '-m', '"Implement Gramophone scene, update text/leaf positions, remove album treo treo"'], capture_output=True, text=True, cwd='/workspace')
result3 = subprocess.run(['git', 'push'], capture_output=True, text=True, cwd='/workspace')
print(result3.stdout)
print(result3.stderr)
<ctrl46>}