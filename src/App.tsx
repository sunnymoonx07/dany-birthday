/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Gift, Music, Music2, Volume2, VolumeX, Star, Sparkles, Calendar, Flower, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Hello Kitty Bow SVG Component
const Bow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 60" className={className} fill="currentColor">
    <path d="M50 30 C30 10 10 10 10 30 C10 50 30 50 50 30 C70 50 90 50 90 30 C90 10 70 10 50 30" />
    <circle cx="50" cy="30" r="8" fill="white" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// Tulip SVG Component
const Tulip = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22v-7" />
    <path d="M12 15c-3.5 0-6-2.5-6-6 0-2 1.5-4 1.5-4s1.5 2 1.5 4c0 1.5 1 2 3 2s3-.5 3-2c0-2 1.5-4 1.5-4s1.5 2 1.5 4c0 3.5-2.5 6-6 6Z" fill="currentColor" fillOpacity="0.3" />
    <path d="M12 22c4 0 6-3 6-3" />
    <path d="M12 22c-4 0-6-3-6-3" />
  </svg>
);

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'story', 'gallery'
  const [storyStep, setStoryStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showGift, setShowGift] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const storyContent = [
    {
      title: "Happy Birthday, My Pretty Baby :)",
      text: "I wish you the best year of your life, honey <3",
      icon: <Heart className="w-12 h-12 text-hk-red fill-hk-red" />,
      bg: "bg-hk-pink"
    },
    {
      title: "I Love You So Much",
      text: "You mean everything to me. I hope you have an amazing year ahead.",
      icon: <Sparkles className="w-12 h-12 text-hk-hot-pink" />,
      bg: "bg-hk-hot-pink"
    },
    {
      title: "I'm Really Grateful For You",
      text: "I'm so lucky to have you in my life. You deserve everything good, always.",
      icon: <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />,
      bg: "bg-hk-red"
    },
    {
      title: "You Are So Special",
      text: "I just wanted you to know how much I appreciate you and how special you are to me, love.",
      icon: <Bow className="w-16 h-12 text-white" />,
      bg: "bg-slate-900"
    }
  ];

  // Birthday is April 16th
  const birthdayDate = new Date('2026-04-16T00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = birthdayDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    setCurrentPage('story');
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    
    // Initial confetti burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFB7C5', '#FF69B4', '#FF0000', '#FFFFFF']
    });
  };

  const nextStoryStep = () => {
    if (storyStep < storyContent.length - 1) {
      setStoryStep(prev => prev + 1);
    } else {
      setCurrentPage('gallery');
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FFB7C5', '#FF69B4', '#FF0000', '#FFFFFF']
      });
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const openGift = () => {
    setShowGift(true);
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.8 },
      colors: ['#FFB7C5', '#FF69B4', '#FFD700']
    });
  };

  return (
    <div className="min-h-screen bg-hk-pink overflow-hidden relative selection:bg-hk-hot-pink selection:text-white">
      {/* Background Pattern */}
      <div className="bg-pattern" />

      {/* Background Audio */}
      <audio 
        ref={audioRef}
        src="/Song/Golden Brown - The Stranglers Best part (slowedreverb).mp3" 
        loop
      />

      {/* Floating Hearts (Decorative) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[15%] text-3xl text-hk-red opacity-60 -rotate-[15deg] animate-pulse">♥</div>
        <div className="absolute bottom-[20%] right-[15%] text-4xl text-hk-red opacity-60 rotate-[10deg] animate-pulse delay-700">♥</div>
        <div className="absolute top-[10%] right-[20%] text-2xl text-hk-red opacity-60 rotate-[20deg] animate-pulse delay-1000">♥</div>
      </div>

      {/* Floating Elements (Confetti-like) */}
      <AnimatePresence>
        {isStarted && Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: '110vh', 
              x: `${Math.random() * 100}vw`,
              rotate: 0,
              opacity: 0.6
            }}
            animate={{ 
              y: '-10vh',
              rotate: 360,
              x: `${(Math.random() * 100) + (Math.sin(i) * 10)}vw`
            }}
            transition={{ 
              duration: 10 + Math.random() * 15, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute pointer-events-none z-0"
          >
            {i % 6 === 0 ? (
              <Bow className="w-8 h-8 text-hk-red" />
            ) : i % 6 === 1 ? (
              <Heart className="w-6 h-6 text-hk-hot-pink fill-hk-hot-pink" />
            ) : i % 6 === 2 ? (
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ) : i % 6 === 3 ? (
              <Flower className="w-7 h-7 text-hk-hot-pink" />
            ) : i % 6 === 4 ? (
              <Flower2 className="w-6 h-6 text-hk-red" />
            ) : (
              <Tulip className="w-8 h-8 text-hk-hot-pink" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Music Player (Immersive Theme) */}
      {isStarted && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md h-20 immersive-player flex items-center px-5"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-hk-hot-pink rounded-xl flex items-center justify-center text-white text-lg md:text-xl mr-3 md:mr-4 shadow-sm shrink-0">
            ♫
          </div>
          <div className="flex-grow text-left min-w-0">
            <div className="font-bold text-xs md:text-sm text-hk-hot-pink truncate">Golden Brown</div>
            <div className="text-[10px] md:text-xs text-hk-hot-pink/80 truncate">Slowed + Reverb</div>
          </div>
          <div className="flex gap-2 md:gap-4 items-center text-hk-red shrink-0">
            <button className="text-xs md:text-sm hover:scale-110 transition-transform hidden sm:block">⏮</button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMusic}
              className="w-8 h-8 rounded-full bg-hk-red text-white hover:bg-hk-red/90 hover:text-white flex items-center justify-center p-0"
            >
              {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <button className="text-xs md:text-sm hover:scale-110 transition-transform hidden sm:block">⏭</button>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 rounded-b-[20px] overflow-hidden">
            <motion.div 
              animate={{ width: isPlaying ? '100%' : '65%' }}
              transition={{ duration: 10, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              className="h-full bg-hk-red"
            />
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <AnimatePresence mode="wait">
          {!isStarted && (
            <motion.div 
              key="welcome"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0, filter: 'blur(20px)' }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-center space-y-8 immersive-card w-full max-w-2xl min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center p-6 md:p-12"
            >
              <div className="relative w-full">
                {/* Decorative Flowers in Corners */}
                <Flower className="absolute -top-6 -left-6 w-12 h-12 text-hk-hot-pink/40 rotate-[-15deg] hidden md:block" />
                <Tulip className="absolute -bottom-6 -right-6 w-12 h-12 text-hk-red/40 rotate-[15deg] hidden md:block" />
                
                <div className="absolute -top-[100px] md:-top-[140px] left-1/2 -translate-x-1/2 w-[100px] md:w-[120px] h-[60px] md:h-[80px]">
                  <div className="absolute left-0 w-[50px] md:w-[60px] h-[50px] md:h-[60px] bg-hk-red rounded-[12px] md:rounded-[15px] top-[10px] -rotate-[10deg]" />
                  <div className="absolute right-0 w-[50px] md:w-[60px] h-[50px] md:h-[60px] bg-hk-red rounded-[12px] md:rounded-[15px] top-[10px] rotate-[10deg]" />
                  <div className="absolute left-[38px] md:left-[45px] top-[20px] md:top-[25px] w-[25px] md:w-[30px] h-[25px] md:h-[30px] bg-hk-red rounded-full border-2 border-white" />
                </div>
                
                <div className="space-y-4">
                  <div className="text-[12px] md:text-[14px] font-bold uppercase tracking-[3px] md:tracking-[4px] text-hk-red mb-3 md:mb-5">
                    April 16th • 2026
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-[64px] font-extrabold leading-[1.1] text-hk-hot-pink [text-shadow:2px_2px_0_white]">
                    Happy Birthday
                  </h1>
                  <div className="font-serif italic text-5xl sm:text-6xl md:text-[72px] text-white [text-shadow:3px_3px_10px_#FF69B4] mb-6 md:mb-8">
                    Danya
                  </div>
                  <div className="flex justify-center">
                    <div className="immersive-badge text-xl md:text-2xl">Sweet 20</div>
                  </div>
                  <p className="mt-6 md:mt-8 text-base md:text-[18px] opacity-80 font-medium text-hk-hot-pink">
                    You make every day feel like a celebration.
                  </p>
                </div>
              </div>

              <Button 
                onClick={handleStart}
                className="mt-6 md:mt-8 px-8 md:px-12 py-6 md:py-8 text-xl md:text-2xl font-cute bg-hk-red hover:bg-hk-red/90 text-white rounded-full shadow-[0_4px_15px_rgba(230,0,18,0.3)] transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Open Surprise 🎀
              </Button>
            </motion.div>
          )}

          {isStarted && currentPage === 'story' && (
            <motion.div
              key={`story-${storyStep}`}
              initial={{ x: 100, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -100, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="w-full max-w-2xl text-center space-y-8 md:space-y-12"
            >
              <div className="flex flex-col items-center space-y-6 md:space-y-8">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="p-6 md:p-8 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 shadow-2xl"
                >
                  {storyContent[storyStep].icon}
                </motion.div>

                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white [text-shadow:2px_2px_10px_rgba(0,0,0,0.1)] leading-tight">
                    {storyContent[storyStep].title}
                  </h2>
                  <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-white/90 leading-relaxed px-4">
                    "{storyContent[storyStep].text}"
                  </p>
                </div>

                <Button
                  onClick={nextStoryStep}
                  className="px-8 md:px-10 py-4 md:py-6 text-lg md:text-xl bg-white text-hk-hot-pink hover:bg-white/90 rounded-full shadow-xl font-bold transition-all hover:translate-y-[-4px]"
                >
                  {storyStep === storyContent.length - 1 ? "See Your Surprise ✨" : "Next Moment ❤️"}
                </Button>
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center gap-2 md:gap-3">
                {storyContent.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${i === storyStep ? 'w-8 md:w-12 bg-white' : 'w-1.5 md:w-2 bg-white/30'}`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {isStarted && currentPage === 'gallery' && (
            <motion.div 
              key="gallery"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-4xl space-y-12 py-12"
            >
              {/* Header */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center space-y-4 md:space-y-6"
              >
                <div className="flex flex-col items-center gap-2 md:gap-4">
                  <div className="text-[10px] md:text-[14px] font-bold uppercase tracking-[3px] md:tracking-[4px] text-hk-red">
                    April 16th • 2026
                  </div>
                  <h2 className="text-4xl sm:text-5xl md:text-[64px] font-extrabold leading-[1.1] text-hk-hot-pink [text-shadow:2px_2px_0_white]">
                    Happy 20th Birthday!
                  </h2>
                  <div className="font-serif italic text-4xl md:text-[48px] text-white [text-shadow:3px_3px_10px_#FF69B4]">
                    Danya
                  </div>
                </div>
              </motion.div>

              {/* Countdown */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map((item, i) => (
                  <div key={i} className="immersive-card p-6 text-center space-y-2 transform hover:-translate-y-1 transition-transform">
                    <div className="text-4xl md:text-5xl font-extrabold text-hk-hot-pink">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs uppercase tracking-widest text-hk-red font-bold">
                      {item.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Message Card */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="immersive-card p-6 md:p-10 relative overflow-hidden group border-none">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Bow className="w-24 h-24 md:w-32 md:h-32 text-hk-hot-pink" />
                  </div>
                  
                  <div className="relative z-10 space-y-4 md:space-y-6">
                    <div className="flex items-center gap-2 text-hk-red">
                      <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                      <span className="font-bold uppercase tracking-widest text-xs md:text-sm">April 16th, 2026</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-4xl font-extrabold text-hk-hot-pink [text-shadow:1px_1px_0_white]">A little note for my birthday girl...</h3>
                    
                    <p className="text-base md:text-lg leading-relaxed text-slate-700 font-medium">
                      Danya, having you in my life is one of the best things that’s ever happened to me. 
                      You make everything feel softer, happier, and more special just by being you. 
                      I’m so thankful for every moment with you, and I really hope this year brings you 
                      as much love and happiness as you give to everyone around you. 
                      You deserve the most beautiful birthday and the most amazing year ahead.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      <Badge className="bg-hk-red text-white border-none px-3 md:px-4 py-1 text-xs md:text-sm">Beautiful</Badge>
                      <Badge className="bg-hk-hot-pink text-white border-none px-3 md:px-4 py-1 text-xs md:text-sm">Kind</Badge>
                      <Badge className="bg-hk-red text-white border-none px-3 md:px-4 py-1 text-xs md:text-sm">Amazing</Badge>
                      <Badge className="bg-hk-hot-pink text-white border-none px-3 md:px-4 py-1 text-xs md:text-sm">Sweet 20</Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Polaroid Gallery */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="space-y-8"
              >
                <h3 className="text-4xl font-extrabold text-hk-hot-pink text-center [text-shadow:1px_1px_0_white]">Our Magical Moments ✨</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { title: "Our First Date", color: "bg-hk-pink", img: "/Pictures/1.jpg", tint: "bg-hk-pink/30" },
                    { title: "Our First Date", color: "bg-hk-pink", img: "/Pictures/2.jpg", tint: "bg-hk-pink/30" },
                    { title: "My Soulmate 💖", color: "bg-hk-hot-pink", img: "/Pictures/3.jpg", tint: "bg-hk-hot-pink/30" },
                    { title: "Always & Forever 💍", color: "bg-hk-red", img: "/Pictures/4.jpg", tint: "bg-hk-red/30" },
                  ].map((photo, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ rotate: i % 2 === 0 ? 5 : -5, scale: 1.05 }}
                      className="bg-white p-4 pb-12 shadow-2xl border-2 border-white transform rotate-[-2deg] even:rotate-[3deg] rounded-sm"
                    >
                      <div className={`aspect-square ${photo.color} flex items-center justify-center rounded-sm overflow-hidden relative`}>
                        <img 
                          src={photo.img} 
                          alt={photo.title}
                          className="w-full h-full object-cover opacity-90"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/birthday${i}/400/400`;
                          }}
                        />
                        {/* Tint Overlay */}
                        <div className={`absolute inset-0 ${photo.tint} mix-blend-multiply pointer-events-none`} />
                        
                        <Bow className="absolute top-2 right-2 w-8 h-8 text-white drop-shadow-md z-10" />
                      </div>
                      <p className="mt-4 font-serif italic text-hk-hot-pink text-center text-xl">{photo.title}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Gift Interaction */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col items-center gap-6"
              >
                {!showGift ? (
                  <div className="text-center space-y-4">
                    <p className="text-2xl font-extrabold text-hk-hot-pink [text-shadow:1px_1px_0_white]">You have a gift! Click to open it 🎁</p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={openGift}
                      className="relative"
                    >
                      <Gift className="w-32 h-32 text-hk-red drop-shadow-xl cursor-pointer" />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 bg-white/40 rounded-full blur-2xl -z-10"
                      />
                    </motion.button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="immersive-card max-w-md text-center p-10 space-y-4 border-dashed border-hk-red"
                  >
                    <div className="flex justify-center">
                      <Heart className="w-16 h-16 text-hk-red fill-hk-red animate-bounce" />
                    </div>
                    <h4 className="text-3xl font-extrabold text-hk-hot-pink">My Heart is Yours!</h4>
                    <p className="text-slate-700 italic font-medium">
                      "Out of everything in my life, having you is one of the most beautiful things."
                    </p>
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowGift(false)}
                      className="text-hk-red hover:text-hk-hot-pink hover:bg-transparent font-bold"
                    >
                      Close Gift
                    </Button>
                  </motion.div>
                )}
              </motion.div>

              {/* Footer */}
              <footer className="text-center pt-12 text-hk-hot-pink/60 font-bold uppercase tracking-widest text-xs">
                <p>Made with ❤️ for Danya</p>
                <div className="flex justify-center gap-2 mt-2">
                  <Star className="w-4 h-4 fill-hk-hot-pink text-hk-hot-pink" />
                  <Star className="w-4 h-4 fill-hk-hot-pink text-hk-hot-pink" />
                  <Star className="w-4 h-4 fill-hk-hot-pink text-hk-hot-pink" />
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Hello Kitty Face (Decorative) */}
      {isStarted && (
        <div className="fixed -bottom-20 -left-20 opacity-20 pointer-events-none rotate-12 hidden lg:block">
          <div className="w-80 h-64 bg-white rounded-[100px] border-8 border-slate-900 relative">
            {/* Ears */}
            <div className="absolute -top-10 left-10 w-24 h-24 bg-white border-8 border-slate-900 rounded-tl-[50px] rounded-tr-[20px] -rotate-12" />
            <div className="absolute -top-10 right-10 w-24 h-24 bg-white border-8 border-slate-900 rounded-tr-[50px] rounded-tl-[20px] rotate-12" />
            {/* Bow */}
            <div className="absolute -top-12 right-4 z-10">
              <Bow className="w-32 h-20 text-hk-red drop-shadow-md" />
            </div>
            {/* Eyes */}
            <div className="absolute top-24 left-20 w-6 h-8 bg-slate-900 rounded-full" />
            <div className="absolute top-24 right-20 w-6 h-8 bg-slate-900 rounded-full" />
            {/* Nose */}
            <div className="absolute top-36 left-1/2 -translate-x-1/2 w-8 h-6 bg-yellow-400 border-4 border-slate-900 rounded-full" />
            {/* Whiskers */}
            <div className="absolute top-32 -left-4 w-12 h-2 bg-slate-900 rounded-full rotate-12" />
            <div className="absolute top-40 -left-6 w-12 h-2 bg-slate-900 rounded-full" />
            <div className="absolute top-48 -left-4 w-12 h-2 bg-slate-900 rounded-full -rotate-12" />
            
            <div className="absolute top-32 -right-4 w-12 h-2 bg-slate-900 rounded-full -rotate-12" />
            <div className="absolute top-40 -right-6 w-12 h-2 bg-slate-900 rounded-full" />
            <div className="absolute top-48 -right-4 w-12 h-2 bg-slate-900 rounded-full rotate-12" />
          </div>
        </div>
      )}
    </div>
  );
}
