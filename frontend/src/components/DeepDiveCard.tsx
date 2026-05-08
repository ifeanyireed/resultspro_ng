'use client';

import { useTheme } from './ThemeContext';

export default function DeepDiveCard({ 
  title, 
  subtitle, 
  tag, 
  features, 
  color, 
  image 
}: { 
  title: string; 
  subtitle: string; 
  tag: string; 
  features: string[]; 
  color: string;
  image?: React.ReactNode;
}) {
  return (
    <div className="py-24 px-6 md:px-16 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className={`inline-flex items-center px-4 py-1.5 rounded-full glass border-primary/10 text-[11px] font-black tracking-[0.2em] ${color} uppercase`}>
            {tag}
          </div>
          <h2 className="heading-premium text-4xl md:text-7xl">{title}</h2>
          <p className="text-muted text-xl md:text-2xl font-medium tracking-tight leading-tight">{subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-2xl glass border-foreground/5">
                <div className={`w-2 h-2 rounded-full ${color.replace('text-', 'bg-')}`} />
                <span className="text-muted text-xs font-bold uppercase tracking-widest">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-square md:aspect-video lg:aspect-square glass rounded-[4rem] border-foreground/5 overflow-hidden flex items-center justify-center p-12 group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--foreground),transparent_98%)_0,transparent_70%)]" />
          {image ? image : (
            <div className={`w-full h-full rounded-[3rem] ${color.replace('text-', 'bg-')}/5 border-2 border-dashed ${color.replace('text-', 'border-')}/20 flex flex-col items-center justify-center gap-4 transition-all group-hover:scale-[1.02]`}>
               <div className={`w-20 h-20 rounded-3xl glass flex items-center justify-center ${color}`}>
                 <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin opacity-20" />
               </div>
               <p className={`${color} font-black text-xs uppercase tracking-[0.3em]`}>Preview Coming Soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
