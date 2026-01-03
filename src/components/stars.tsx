"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const Stars = ({ count = 50 }) => {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: count }).map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 5 + 2}s`,
        };
        const sizeClass = ['w-0.5 h-0.5', 'w-1 h-1', 'w-[1.5px] h-[1.5px]'][Math.floor(Math.random() * 3)];
        return <div key={i} className={cn("star", sizeClass)} style={style} />;
      });
      setStars(newStars);
    };

    generateStars();
  }, [count]);

  return <div className="absolute inset-0 -z-10 h-full w-full">{stars}</div>;
};
