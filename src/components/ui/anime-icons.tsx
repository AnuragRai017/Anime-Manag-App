"use client";

import React from "react";
import { ThemeType } from "@/lib/themes";

interface AnimeIconProps {
  theme: ThemeType;
  className?: string;
  size?: number;
}

export function AnimeIcon({ theme, className = "", size = 24 }: AnimeIconProps) {
  const iconSize = `${size}px`;

  switch (theme) {
    case "naruto":
      return (
        <div className={`relative ${className}`} style={{ width: iconSize, height: iconSize }}>
          {/* Naruto's headband with spiral leaf symbol */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize}>
            <rect x="2" y="6" width="20" height="12" rx="2" fill="#3A76F0" />
            <circle cx="12" cy="12" r="5" fill="#D6D6D6" />
            <path d="M12 7C12 7 9 9 9 12C9 15 12 17 12 17C12 17 15 15 15 12C15 9 12 7 12 7Z" fill="#3A76F0" />
            <path d="M12 9L11 12L12 15L13 12L12 9Z" fill="#3A76F0" />
            <path d="M9 12H15" stroke="#3A76F0" strokeWidth="1" />
          </svg>
        </div>
      );

    case "bleach":
      return (
        <div className={`relative ${className}`} style={{ width: iconSize, height: iconSize }}>
          {/* Ichigo's Zanpakuto sword */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize}>
            <path d="M12 2L13 6L12 22L11 6L12 2Z" fill="#CCCCCC" />
            <path d="M10.5 5H13.5L13 7H11L10.5 5Z" fill="#333333" />
            <path d="M11 7H13L12.5 22H11.5L11 7Z" fill="#CCCCCC" />
            <path d="M11.5 22H12.5L12 24L11.5 22Z" fill="#CCCCCC" />
          </svg>
        </div>
      );

    case "onePiece":
      return (
        <div className={`relative ${className}`} style={{ width: iconSize, height: iconSize }}>
          {/* Luffy's Straw Hat */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize}>
            <path d="M5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12H5Z" fill="#FFD700" />
            <path d="M4 12H20C20 12 19 14 12 14C5 14 4 12 4 12Z" fill="#8B4513" />
            <ellipse cx="12" cy="5" rx="7" ry="2" fill="#FFD700" />
            <path d="M12 3C15.866 3 19 3.89543 19 5C19 6.10457 15.866 7 12 7C8.13401 7 5 6.10457 5 5C5 3.89543 8.13401 3 12 3Z" fill="#FFD700" stroke="#8B4513" strokeWidth="0.5" />
          </svg>
        </div>
      );

    case "jjk":
      return (
        <div className={`relative ${className}`} style={{ width: iconSize, height: iconSize }}>
          {/* Jujutsu Kaisen cursed energy symbol */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize}>
            <circle cx="12" cy="12" r="9" stroke="#4B0082" strokeWidth="2" />
            <path d="M12 3V21" stroke="#4B0082" strokeWidth="2" />
            <path d="M3 12H21" stroke="#4B0082" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="#9370DB" />
            <path d="M12 8L14 12L12 16L10 12L12 8Z" fill="#4B0082" />
          </svg>
        </div>
      );

    case "soloLeveling":
      return (
        <div className={`relative ${className}`} style={{ width: iconSize, height: iconSize }}>
          {/* Solo Leveling shadow monarch symbol */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize}>
            <path d="M12 2L14 6L16 10L12 22L8 10L10 6L12 2Z" fill="#800080" />
            <path d="M12 2L10 6L8 10L12 22L16 10L14 6L12 2Z" fill="#4B0082" />
            <circle cx="12" cy="8" r="2" fill="#FFFFFF" />
          </svg>
        </div>
      );

    case "demonSlayer":
      return (
        <div className={`relative ${className}`} style={{ width: iconSize, height: iconSize }}>
          {/* Demon Slayer's Nichirin Blade */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize}>
            <path d="M12 2L13 4L12 22L11 4L12 2Z" fill="#4169E1" />
            <path d="M10.5 4H13.5L13 6H11L10.5 4Z" fill="#FF1493" />
            <path d="M11 6H13L12.5 22H11.5L11 6Z" fill="#4169E1" />
            <path d="M11.5 22H12.5L12 24L11.5 22Z" fill="#4169E1" />
            <path d="M9 8L15 8" stroke="#FF1493" strokeWidth="0.5" />
            <path d="M8 10L16 10" stroke="#FF1493" strokeWidth="0.5" />
          </svg>
        </div>
      );

    case "dragonBall":
      return (
        <div className={`relative ${className}`} style={{ width: iconSize, height: iconSize }}>
          {/* Dragon Ball with stars */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize}>
            <circle cx="12" cy="12" r="8" fill="#FFA500" />
            <circle cx="9" cy="10" r="1" fill="#FF4500" />
            <circle cx="13" cy="9" r="1" fill="#FF4500" />
            <circle cx="15" cy="13" r="1" fill="#FF4500" />
            <circle cx="11" cy="15" r="1" fill="#FF4500" />
            <circle cx="12" cy="12" r="1" fill="#FF4500" />
            <circle cx="8" cy="13" r="1" fill="#FF4500" />
            <circle cx="14" cy="16" r="1" fill="#FF4500" />
          </svg>
        </div>
      );

    default:
      return (
        <div className={`relative ${className}`} style={{ width: iconSize, height: iconSize }}>
          {/* Default manga page icon */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize}>
            <rect x="4" y="2" width="16" height="20" rx="2" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
            <path d="M7 6H17" stroke="#000000" strokeWidth="1" />
            <path d="M7 10H17" stroke="#000000" strokeWidth="1" />
            <path d="M7 14H13" stroke="#000000" strokeWidth="1" />
            <path d="M7 18H10" stroke="#000000" strokeWidth="1" />
          </svg>
        </div>
      );
  }
}
