import { Zap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ size = 'lg' }: LogoProps) {
  const sizeClasses = {
    sm: {
      icon: 'h-5 w-5',
      iconPadding: 'p-1.5',
      text: 'text-xl',
      gap: 'gap-2',
    },
    md: {
      icon: 'h-5 w-5',
      iconPadding: 'p-1.5',
      text: 'text-2xl',
      gap: 'gap-2.5',
    },
    lg: {
      icon: 'h-6 w-6',
      iconPadding: 'p-2',
      text: 'text-3xl',
      gap: 'gap-3',
    },
  };

  const s = sizeClasses[size];

  return (
    <div className={`flex items-center ${s.gap}`}>
      <div className={`flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 ${s.iconPadding}`}>
        <Zap className={`${s.icon} fill-white text-white`} strokeWidth={1.5} />
      </div>
      <span className={`${s.text} tracking-tight`}>
        <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text font-bold text-transparent">snel</span>
        <span className="font-serif italic text-foreground">stack</span>
      </span>
    </div>
  );
}
