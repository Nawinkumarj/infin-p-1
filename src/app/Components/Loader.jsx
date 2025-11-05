'use client';
import React, { useState, useEffect } from 'react';

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="infinity-container">
          {/* SVG for border only */}
          <svg
            className="infinity-symbol"
            viewBox="0 0 300 150"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Infinity border outline */}
            <path
              d="M 85,75 C 85,42 62,20 40,20 C 18,20 0,42 0,75 C 0,108 18,130 40,130 C 62,130 85,108 85,75 M 85,75 C 85,108 108,130 130,130 L 170,130 C 192,130 215,108 215,75 M 215,75 C 215,108 238,130 260,130 C 282,130 300,108 300,75 C 300,42 282,20 260,20 C 238,20 215,42 215,75 M 215,75 C 215,42 192,20 170,20 L 130,20 C 108,20 85,42 85,75"
              fill="none"
              stroke="#ceae95"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="infinity-border"
            />
          </svg>

          {/* Liquid fill wrapper */}
          <div className="liquid-wrapper">
            <div className="liquid-fill" style={{ height: `${progress}%` }}>
              <svg
                className="liquid-svg"
                viewBox="0 0 300 150"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M 85,75 C 85,42 62,20 40,20 C 18,20 0,42 0,75 C 0,108 18,130 40,130 C 62,130 85,108 85,75 M 85,75 C 85,108 108,130 130,130 L 170,130 C 192,130 215,108 215,75 M 215,75 C 215,108 238,130 260,130 C 282,130 300,108 300,75 C 300,42 282,20 260,20 C 238,20 215,42 215,75 M 215,75 C 215,42 192,20 170,20 L 130,20 C 108,20 85,42 85,75"
                  fill="#ceae95"
                  className="liquid-path"
                />
              </svg>
              <div className="liquid-wave"></div>
              <div className="liquid-wave liquid-wave-2"></div>
              <div className="glassmorphism-overlay"></div>
            </div>
          </div>
        </div>

        <div className="progress-text">{progress}%</div>
      </div>
    </div>
  );
}
