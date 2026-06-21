import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

interface AboutAppProps {
  githubUrl: string;
  downloadUrl: string;
  accentColor: string;
  onOpenApp: (appId: string) => void;
}

const animationStyles = `
  @keyframes morph {
    0% { border-radius: 40% 60% 60% 40% / 40% 60% 40% 60%; transform: rotate(0deg) scale(1); }
    33% { border-radius: 60% 40% 50% 50% / 50% 40% 60% 50%; transform: rotate(90deg) scale(1.05); }
    66% { border-radius: 50% 50% 40% 60% / 60% 50% 40% 50%; transform: rotate(180deg) scale(0.95); }
    100% { border-radius: 40% 60% 60% 40% / 40% 60% 40% 60%; transform: rotate(360deg) scale(1); }
  }
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(180deg); }
    100% { transform: translateY(0px) rotate(360deg); }
  }
`;

export default function AboutApp({ githubUrl, downloadUrl, accentColor }: AboutAppProps) {
  const defaultVersion = 'v3.5.6';
  const defaultDownloadUrl = downloadUrl && downloadUrl.includes('/releases/download/') 
    ? downloadUrl 
    : 'https://github.com/SehajveerSingh2005/bloom/releases/download/v3.5.6/bloom_3.5.6_x64_en-US.msi';

  const [releaseInfo, setReleaseInfo] = useState({
    version: defaultVersion,
    downloadUrl: defaultDownloadUrl,
  });

  useEffect(() => {
    fetch('https://api.github.com/repos/SehajveerSingh2005/bloom/releases/latest')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.tag_name) {
          const asset = data.assets?.find((a: any) =>
            a.name.endsWith('.exe') || a.name.endsWith('.msi') || a.name.endsWith('.zip')
          );
          const versionStr = data.tag_name;
          const rawVer = versionStr.replace('v', '');

          setReleaseInfo({
            version: versionStr,
            downloadUrl: asset ? asset.browser_download_url : `https://github.com/SehajveerSingh2005/bloom/releases/download/${versionStr}/bloom_${rawVer}_x64_en-US.msi`,
          });
        }
      })
      .catch(() => {
        // Keep defaults
      });
  }, []);

  return (
    <div className="relative h-full w-full bg-transparent text-white flex flex-col justify-between p-7 select-none overflow-hidden font-sans">
      <style>{animationStyles}</style>

      {/* Background Animated Gradient Mesh Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-5%] w-[250px] h-[250px] rounded-full mix-blend-screen opacity-70 filter blur-[45px]"
          style={{
            background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)`,
            animation: 'float 12s infinite ease-in-out'
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[280px] h-[280px] rounded-full mix-blend-screen opacity-60 filter blur-[45px]"
          style={{
            background: 'radial-gradient(circle, #38bdf818 0%, transparent 70%)',
            animation: 'morph 16s infinite linear'
          }}
        />
      </div>

      {/* Top Header: Brand Title & Dynamic Version Meta */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex items-center gap-2">
          <img src="/bloom.png" alt="logo" className="w-[18px] h-[18px] object-contain" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">bloom</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-0.75 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8.5px] font-bold text-white/70 font-mono">{releaseInfo.version}</span>
        </div>
      </div>

      {/* Middle: Giant Editorial Display Typography & Tech Highlights */}
      <div className="relative z-10 my-auto py-2 text-left">
        <span className="text-[9px] tracking-[0.25em] font-extrabold text-[#fa243c] uppercase block mb-1">
          EXCLUSIVE WINDOWS DESKTOP ENVIRONMENT
        </span>
        <h1
          className="text-[48px] font-black tracking-tighter leading-[0.85] text-white uppercase"
          style={{
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.05em'
          }}
        >
          YOUR WINDOWS,<br />ALIVE.
        </h1>
        
        {/* Cool, bold content instead of small text buzzwords */}
        <div className="mt-5 space-y-4">
          <p className="text-[11px] leading-relaxed text-white/70 font-medium max-w-[420px]">
            Bloom is a ground-up reconstruction of the Windows desktop experience. Operating as a low-level shell override, it silences the legacy taskbar and binds context-aware desktop elements with hardware-level hooks.
          </p>
          
          <div className="border-t border-white/10 pt-4">
            <span className="text-[8.5px] tracking-widest font-black text-white/30 block mb-2.5 uppercase">SYSTEM ARCHITECTURE</span>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3">
              <div>
                <span className="text-[10px] text-white font-semibold block">Active Shell Override</span>
                <p className="text-[9px] leading-[1.3] text-white/40 mt-0.5">
                  Suppresses the explorer taskbar using Win32 window management hooks, replacing it with an reactive, clickable app dock.
                </p>
              </div>
              <div>
                <span className="text-[10px] text-white font-semibold block">Hardware-Direct WASAPI</span>
                <p className="text-[9px] leading-[1.3] text-white/40 mt-0.5">
                  Captures system audio loopback feeds at the kernel level to drive the spring-physics 5-bar hardware visualizer.
                </p>
              </div>
              <div>
                <span className="text-[10px] text-white font-semibold block">Spring-Loaded Simulation</span>
                <p className="text-[9px] leading-[1.3] text-white/40 mt-0.5">
                  Motion designed as a physical mass-spring-damper model, executing animations dynamically rather than relying on easing curves.
                </p>
              </div>
              <div>
                <span className="text-[10px] text-white font-semibold block">Coordinated Webviews</span>
                <p className="text-[9px] leading-[1.3] text-white/40 mt-0.5">
                  Tauri v2 runs 5 independent, sandboxed process layers communicating over IPC pipelines while keeping idle CPU usage near zero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Minimalist pill actions */}
      <div className="relative z-10 flex gap-2.5 mt-auto">
        <a
          href={releaseInfo.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-5 rounded-full flex items-center gap-1.5 text-[11px] font-extrabold text-black transition-all hover:brightness-105 active:scale-[0.98] cursor-pointer shadow-lg"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 6px 20px -4px ${accentColor}40`
          }}
        >
          <Download size={11} strokeWidth={2.5} />
          Download Installer
        </a>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-5 rounded-full bg-white/[0.06] hover:bg-white/[0.09] border border-white/[0.08] flex items-center gap-1.5 text-[11px] font-semibold text-white transition-all active:scale-[0.98] cursor-pointer"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  );
}
