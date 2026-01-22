"use client";
import { useEffect, useState } from "react";
import { IconSnowflake } from "@tabler/icons-react";

export default function Snow() {
  const [flakes, setFlakes] = useState<any[]>([]);

  useEffect(() => {
    const totalFlakes = 50; 
    const arr = [];

    for (let i = 0; i < totalFlakes; i++) {
      arr.push({
        id: i,
        size: Math.random() * 10 + 15, 
        left: Math.random() * 100,
        delay: Math.random() * -20, 
        duration: Math.random() * 10 + 10,
        drift: Math.random() * 40 - 20,
      });
    }
    setFlakes(arr);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={
            {
              left: flake.left + "%",
              animationDelay: flake.delay + "s",
              animationDuration: flake.duration + "s",
              "--drift": flake.drift + "px",
            } as any
          }
        >
          <IconSnowflake size={flake.size} stroke={1} />
        </div>
      ))}
    </div>
  );
}
