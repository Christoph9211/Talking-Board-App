import type { ReactNode } from "react";
import type { IconName } from "./types";

export function PictureIcon({ name }: { name: IconName }) {
  return (
    <svg className="picture-icon" viewBox="0 0 120 120" role="img" aria-hidden="true" focusable="false">
      {pictures[name] ?? pictures.spark}
    </svg>
  );
}

const outline = {
  stroke: "#1f2d33",
  strokeWidth: 4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const pictures: Partial<Record<IconName, ReactNode>> = {
  spark: (
    <>
      <rect x="45" y="18" width="30" height="84" rx="8" fill="#42b847" {...outline} />
      <rect x="18" y="45" width="84" height="30" rx="8" fill="#42b847" {...outline} />
    </>
  ),
  hands: (
    <>
      <path d="M25 67c9-13 21-22 35-26" fill="none" stroke="#0f8f89" strokeWidth="7" strokeLinecap="round" />
      <path d="M95 67c-9-13-21-22-35-26" fill="none" stroke="#0f8f89" strokeWidth="7" strokeLinecap="round" />
      <path d="M27 72l21-25c4-5 12 1 8 6l-10 13 22-10c7-3 12 7 5 11L45 82c-8 5-17 3-22-3-2-3 1-6 4-7z" fill="#ffd0a0" {...outline} />
      <path d="M93 72L72 47c-4-5-12 1-8 6l10 13-22-10c-7-3-12 7-5 11l28 15c8 5 17 3 22-3 2-3-1-6-4-7z" fill="#9b6a43" {...outline} />
    </>
  ),
  stop: (
    <>
      <path d="M43 14h34l29 29v34l-29 29H43L14 77V43L43 14z" fill="#e44738" {...outline} />
      <path d="M41 25h38l16 16v38L79 95H41L25 79V41l16-16z" fill="none" stroke="#ffffff" strokeWidth="5" />
      <text x="60" y="71" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="900" fill="#ffffff">
        STOP
      </text>
    </>
  ),
  check: (
    <>
      <circle cx="60" cy="60" r="43" fill="#42aa46" {...outline} />
      <path d="M36 60l16 16 34-38" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  pause: (
    <>
      <path d="M26 86c0-23 15-39 34-39s34 16 34 39v10H26V86z" fill="#76a995" {...outline} />
      <circle cx="60" cy="39" r="15" fill="#f6c18d" {...outline} />
      <path d="M44 39c1-15 9-23 18-23 10 0 17 8 16 23-9-8-22-8-34 0z" fill="#7b4a2b" {...outline} />
      <path d="M49 56c6 8 16 8 22 0" fill="none" stroke="#c85f47" strokeWidth="4" strokeLinecap="round" />
      <path d="M37 101h46" stroke="#4c7566" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  food: (
    <>
      <ellipse cx="55" cy="66" rx="43" ry="31" fill="#d9efff" {...outline} />
      <path d="M31 68c10-18 41-20 57-2-12 17-42 20-57 2z" fill="#f0d18a" stroke="#9a6f2c" strokeWidth="3" />
      <circle cx="41" cy="55" r="12" fill="#e54836" stroke="#9a2019" strokeWidth="3" />
      <path d="M48 49c5-11 16-13 23-8-8 1-14 5-18 13" fill="#4d9b43" />
      <path d="M89 35v57M102 38v54" stroke="#5c6065" strokeWidth="6" strokeLinecap="round" />
      <path d="M80 36c0 18 18 18 18 0" fill="none" stroke="#5c6065" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  drink: (
    <>
      <path d="M36 23h47l-6 73c-.6 7-6 11-13 11H55c-7 0-12-4-13-11L36 23z" fill="#d9f3ff" {...outline} />
      <path d="M42 49h35l-4 43c-.4 4-4 7-8 7h-9c-4 0-7-3-8-7l-6-43z" fill="#67b7e8" />
      <path d="M78 30c5-14 15-19 25-17" fill="none" stroke="#1b83c6" strokeWidth="7" strokeLinecap="round" />
      <path d="M50 61v27" stroke="#bceaff" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  bathroom: (
    <>
      <path d="M39 23h43v19c0 8-6 14-14 14H53c-8 0-14-6-14-14V23z" fill="#f5f5f5" {...outline} />
      <path d="M44 55h33v28c0 12-8 21-17 21s-17-9-17-21V55z" fill="#ffffff" {...outline} />
      <path d="M36 55h49" stroke="#7b858b" strokeWidth="5" strokeLinecap="round" />
      <path d="M47 80c8 5 18 5 26 0" fill="none" stroke="#7b858b" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  yes: (
    <>
      <circle cx="60" cy="60" r="45" fill="#44ad4a" {...outline} />
      <path d="M36 60l16 16 34-38" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  no: (
    <>
      <circle cx="60" cy="60" r="45" fill="#f05243" {...outline} />
      <path d="M38 38l44 44M82 38L38 82" stroke="#ffffff" strokeWidth="13" strokeLinecap="round" />
    </>
  ),
  mom: (
    <>
      <circle cx="60" cy="42" r="23" fill="#f6c18d" {...outline} />
      <path d="M32 46c1-25 15-35 29-35 17 0 29 13 29 35-11-11-35-12-58 0z" fill="#6d3b24" {...outline} />
      <path d="M24 109c4-24 18-37 36-37s32 13 36 37H24z" fill="#9a73cf" {...outline} />
      <path d="M49 45h.1M71 45h.1" stroke="#1f2d33" strokeWidth="6" strokeLinecap="round" />
      <path d="M51 58c6 5 14 5 20 0" fill="none" stroke="#9b4f37" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  dad: (
    <>
      <circle cx="60" cy="42" r="23" fill="#f6c18d" {...outline} />
      <path d="M37 33c5-17 37-21 48 1-12-1-24-4-35-10-3 6-8 9-13 9z" fill="#6d3b24" {...outline} />
      <path d="M24 109c4-24 18-37 36-37s32 13 36 37H24z" fill="#55a866" {...outline} />
      <path d="M49 45h.1M71 45h.1" stroke="#1f2d33" strokeWidth="6" strokeLinecap="round" />
      <path d="M51 58c6 5 14 5 20 0" fill="none" stroke="#9b4f37" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  school: (
    <>
      <path d="M22 52l38-30 38 30v53H22V52z" fill="#f5c54c" {...outline} />
      <path d="M17 52h86" stroke="#c93f32" strokeWidth="9" strokeLinecap="round" />
      <rect x="48" y="69" width="24" height="36" fill="#2e91d1" {...outline} />
      <rect x="29" y="64" width="13" height="15" fill="#9bd6f6" stroke="#1f2d33" strokeWidth="3" />
      <rect x="78" y="64" width="13" height="15" fill="#9bd6f6" stroke="#1f2d33" strokeWidth="3" />
      <circle cx="60" cy="45" r="10" fill="#ffffff" {...outline} />
      <path d="M60 39v7l5 3" fill="none" stroke="#1f2d33" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  home: (
    <>
      <path d="M18 55l42-36 42 36-8 8-7-6v50H33V57l-7 6-8-8z" fill="#f7e3ad" {...outline} />
      <path d="M18 55l42-36 42 36" fill="none" stroke="#c94836" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="50" y="72" width="20" height="35" fill="#3c96d1" {...outline} />
      <rect x="75" y="66" width="14" height="16" fill="#9bd6f6" stroke="#1f2d33" strokeWidth="3" />
    </>
  ),
  car: (
    <>
      <path d="M24 58l9-19h54l9 19 9 8v25H93v10H78V91H42v10H27V91H15V66l9-8z" fill="#2e95dc" {...outline} />
      <path d="M39 44h42l5 13H34l5-13z" fill="#bfe8ff" stroke="#1f2d33" strokeWidth="3" />
      <circle cx="37" cy="91" r="9" fill="#30363b" />
      <circle cx="83" cy="91" r="9" fill="#30363b" />
      <path d="M24 70h13M83 70h13" stroke="#ffd45d" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  sun: (
    <>
      <circle cx="60" cy="60" r="26" fill="#ffd45d" {...outline} />
      <path d="M60 11v18M60 91v18M11 60h18M91 60h18M25 25l13 13M82 82l13 13M95 25L82 38M38 82L25 95" stroke="#f2a900" strokeWidth="7" strokeLinecap="round" />
    </>
  ),
  shirt: (
    <>
      <path d="M36 19l24 15 24-15 28 22-14 20-13-9v55H35V52l-13 9L8 41l28-22z" fill="#5aa7e8" {...outline} />
      <path d="M45 27c4 8 26 8 30 0" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  play: (
    <>
      <path d="M32 23l60 37-60 37V23z" fill="#45a5d6" {...outline} />
      <circle cx="38" cy="92" r="10" fill="#8a6ee8" stroke="#1f2d33" strokeWidth="3" />
      <circle cx="82" cy="86" r="8" fill="#f7c948" stroke="#1f2d33" strokeWidth="3" />
    </>
  ),
  bed: (
    <>
      <path d="M18 49h27c13 0 22 9 22 22v7h36v27H18V49z" fill="#7a67c7" {...outline} />
      <rect x="24" y="33" width="35" height="31" rx="8" fill="#fff0b8" {...outline} />
      <path d="M18 82h85M27 105v8M94 105v8" stroke="#1f2d33" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
};
