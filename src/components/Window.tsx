import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isFocused: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: ReactNode;
  width?: string;
  height?: string;
  defaultPosition?: { x: number; y: number };
}

export default function Window({
  id,
  title,
  isOpen,
  isFocused,
  isMinimized,
  onClose,
  onMinimize,
  onFocus,
  children,
  width = 'w-[680px]',
  height = 'h-[440px]',
  defaultPosition = { x: 80, y: 120 },
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          id={`window-${id}`}
          onClick={onFocus}
          drag={!isMaximized}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          dragElastic={0.05}
          dragConstraints={{ left: -300, right: windowSize.width - 200, top: 0, bottom: windowSize.height - 150 }}
          onDragEnd={() => {
            const el = document.getElementById(`window-${id}`);
            if (el) {
              const style = window.getComputedStyle(el);
              const matrix = new DOMMatrix(style.transform);
              console.log(`Window "${id}" dragged to: x: ${Math.round(matrix.m41)}, y: ${Math.round(matrix.m42)}`);
            }
          }}
          initial={{ scale: 0.92, opacity: 0, y: defaultPosition.y + 30, x: defaultPosition.x }}
          animate={{
            scale: 1,
            opacity: 1,
            x: isMaximized ? 0 : undefined,
            y: isMaximized ? 0 : undefined,
            width: isMaximized ? '100vw' : undefined,
            height: isMaximized ? 'calc(100vh - 48px)' : undefined, // Subtract taskbar/notch room
            top: isMaximized ? '48px' : undefined,
            left: isMaximized ? '0px' : undefined,
            zIndex: isFocused ? 50 : 20,
          }}
          exit={{
            scale: 0.92,
            opacity: 0,
            transition: { duration: 0.15 }
          }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          className={`absolute flex flex-col glass-panel-dark rounded-xl overflow-hidden border border-white/8 shadow-2xl max-w-[calc(100vw-32px)] max-h-[calc(100vh-80px)] ${
            isMaximized ? '' : `${width} ${height}`
          }`}
          style={{
            transformOrigin: 'center center',
            backdropFilter: 'blur(25px) saturate(140%)',
            WebkitBackdropFilter: 'blur(25px) saturate(140%)',
          }}
        >
          {/* Header/Titlebar */}
          <div 
            onPointerDown={(e) => dragControls.start(e)}
            className="window-titlebar flex items-center justify-between pl-4 pr-1 py-1.5 bg-white/[0.02] border-b border-white/[0.05] cursor-grab active:cursor-grabbing select-none"
          >
            {/* Title on the left */}
            <span className="text-[11px] font-semibold tracking-wide text-white/55 select-none">
              {title}
            </span>

            {/* Windows-style Control buttons on the right */}
            <div className="flex items-center">
              {/* Minimize */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                className="w-10 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                title="Minimize"
              >
                <svg width="10" height="1" viewBox="0 0 10 1" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <line x1="0" y1="0.5" x2="10" y2="0.5" />
                </svg>
              </button>

              {/* Maximize / Restore */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMaximized(!isMaximized);
                }}
                className="w-10 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                title={isMaximized ? "Restore" : "Maximize"}
              >
                {isMaximized ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M2.5 2.5V0.5H9.5V7.5H7.5M0.5 2.5H7.5V9.5H0.5V2.5Z" />
                  </svg>
                ) : (
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="0.5" y="0.5" width="9" height="9" />
                  </svg>
                )}
              </button>

              {/* Close */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-10 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#ff3b30] transition-colors"
                title="Close"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M1 1L9 9M9 1L1 9" />
                </svg>
              </button>
            </div>
          </div>

          {/* Window Client Area */}
          <div className="flex-1 overflow-auto bg-black/[0.1] relative">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
