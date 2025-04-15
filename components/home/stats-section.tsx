"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

const stats: Stat[] = [
  {
    label: "Students",
    value: 25000,
    suffix: "+",
  },
  {
    label: "Courses",
    value: 120,
    suffix: "+",
  },
  {
    label: "Success Rate",
    value: 94,
    suffix: "%",
  },
  {
    label: "Countries",
    value: 150,
    suffix: "+",
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Impact In Numbers</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Join thousands of students who have already transformed their
            careers with our courses.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCounter key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const animateCount = useCallback(() => {
    const duration = 2000; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(easingFunction(progress) * stat.value);

      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(stat.value);
      } else {
        setCount(currentCount);
      }
    }, frameDuration);
  }, [stat.value]);

  useEffect(() => {
    const currentRef = counterRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          animateCount();
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, animateCount]);

  // Easing function for smoother animation
  const easingFunction = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  return (
    <div className="text-center" ref={counterRef}>
      <div className="text-4xl md:text-5xl font-bold mb-2">
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>
      <p className="text-blue-100">{stat.label}</p>
    </div>
  );
}
