import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Globe, Loader2 } from 'lucide-react';

interface GdsRedirectLoaderProps {
  propertyName: string;
  targetUrl: string;
  onComplete: () => void;
}

export default function GdsRedirectLoader({ propertyName, targetUrl, onComplete }: GdsRedirectLoaderProps) {
  const [progress, setProgress] = useState(0);
  const isKirtee = propertyName.toLowerCase().includes('kirtee');

  useEffect(() => {
    const totalDuration = 400; // Snappy transfer in under 500ms
    const intervalMs = 15;
    const step = 100 / (totalDuration / intervalMs);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          onComplete();
          return 100;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 p-6 text-white overflow-hidden animate-fade-in" id="gds-redirector-portal">
      
      {/* Decorative premium vector background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl ${isKirtee ? 'bg-emerald-500/50' : 'bg-saffron-500/50'}`} />
      </div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        
        {/* Animated Brand Halo */}
        <div className="flex justify-center">
          <div className={`relative p-5 rounded-3xl border ${isKirtee ? 'bg-emerald-950/40 border-emerald-500/30' : 'bg-saffron-950/40 border-saffron-550/30'} flex items-center justify-center shadow-2xl animate-pulse`}>
            {/* Spinning background rings */}
            <div className={`absolute inset-0 rounded-3xl border-2 border-dashed animate-spin ${isKirtee ? 'border-emerald-500/20' : 'border-saffron-500/20'}`} style={{ animationDuration: '4s' }} />
            
            <Loader2 className={`w-10 h-10 animate-spin ${isKirtee ? 'text-emerald-400' : 'text-saffron-550'}`} />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-slate-300 font-bold uppercase">
            <Globe className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            Bharat GDS Express Link
          </div>
          
          <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
            Opening Property Experience...
          </h3>
          
          <div className={`p-4 rounded-2xl border ${isKirtee ? 'bg-emerald-950/30 border-emerald-500/20 text-emerald-300' : 'bg-saffron-950/30 border-saffron-500/20 text-saffron-300'} font-serif text-lg font-bold flex items-center justify-center gap-2 shadow-inner`}>
            <Sparkles className="w-4 h-4 shrink-0 animate-pulse" />
            {propertyName}
          </div>
        </div>

        {/* Custom Progress bar */}
        <div className="space-y-2">
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
            <div 
              className={`h-full rounded-full transition-all duration-75 ${isKirtee ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-saffron-500 to-amber-400'}`} 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* Footer badges */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-1 justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Seamless Direct Navigation
          </div>
          <div className="flex items-center gap-1 justify-center">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            Zero PMS Bottlenecks
          </div>
        </div>
        
      </div>
    </div>
  );
}
