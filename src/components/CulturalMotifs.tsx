import React from 'react';

// Elegant cultural line art components for Bharat Travels landing page
// Designed with stroke="currentColor" and premium thin line styling.

export function KonarkWheelSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Outer Circle */}
      <circle cx="100" cy="100" r="85" />
      <circle cx="100" cy="100" r="77" strokeDasharray="3,4" />
      <circle cx="100" cy="100" r="68" />
      
      {/* Inner Hub */}
      <circle cx="100" cy="100" r="18" fill="rgba(234, 88, 12, 0.02)" />
      <circle cx="100" cy="100" r="10" />
      <circle cx="100" cy="100" r="4" fill="currentColor" />

      {/* Primary 8 Spokes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x2_outer = 100 + 68 * Math.cos(angle);
        const y2_outer = 100 + 68 * Math.sin(angle);
        return (
          <g key={`primary-${i}`}>
            <line x1="100" y1="100" x2={x2_outer} y2={y2_outer} strokeWidth="1.8" />
            <circle cx={100 + 38 * Math.cos(angle)} cy={100 + 38 * Math.sin(angle)} r="5" fill="white" strokeWidth="1.2" />
          </g>
        );
      })}

      {/* Secondary 8 Spokes (Thinner) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4 + Math.PI / 8;
        const x2_outer = 100 + 68 * Math.cos(angle);
        const y2_outer = 100 + 68 * Math.sin(angle);
        return (
          <line
            key={`secondary-${i}`}
            x1="100"
            y1="100"
            x2={x2_outer}
            y2={y2_outer}
            strokeWidth="0.8"
            strokeDasharray="4,2"
          />
        );
      })}

      {/* Decorative Ornaments on Rim outer edge */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * Math.PI) / 12;
        const x = 100 + 81 * Math.cos(angle);
        const y = 100 + 81 * Math.sin(angle);
        return <circle key={`decor-${i}`} cx={x} cy={y} r="1.5" fill="currentColor" />;
      })}
    </svg>
  );
}

export function JagannathTempleSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 300"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Base Platform */}
      <path d="M10 290h140v-10H10z" />
      <path d="M20 280h120v-8H20z" />

      {/* Lower Temple Structure (Prasana) */}
      <path d="M30 272h100v-45H30z" />
      {/* Structural Vertical Grooves */}
      <line x1="50" y1="272" x2="50" y2="227" />
      <line x1="70" y1="272" x2="70" y2="227" />
      <line x1="90" y1="272" x2="90" y2="227" />
      <line x1="110" y1="272" x2="110" y2="227" />

      {/* Middle tiered spires (Jagamohana) */}
      <path d="M40 227l5-15h70l5 15" />
      <path d="M45 212l6-12h58l6 12" />
      <path d="M51 200l5-10h48l5 10" />

      {/* Main Shikhara (Curvilinear spire tower) */}
      <path d="M55 190c-2-35 5-110 20-130h10c15 20 22 95 20 130z" />
      
      {/* Horizontal banding carvings (Amalaka ribs) */}
      <path d="M55 155c10-2 40-2 50 0" />
      <path d="M57 125c8-2 38-2 46 0" />
      <path d="M60 95c6-2 34-2 40 0" />
      <path d="M64 70s8-2 16 0" />

      {/* Temple Crown Amalaka */}
      <ellipse cx="80" cy="50" rx="12" ry="6" fill="white" />
      <circle cx="80" cy="40" r="4" />
      
      {/* Flag (Patita Pavana) flapping in wind */}
      <path d="M80 36V15" />
      <path d="M80 15c8-1 18-5 25 1 5 4-5 9-25 5" fill="rgba(234, 88, 12, 0.1)" />
      
      {/* Decorative vertical center band */}
      <path d="M78 190V60" strokeDasharray="3,3" />
      <path d="M82 190V60" strokeDasharray="3,3" />
    </svg>
  );
}

export function OdissiDancerSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 150 250"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Head & Crown (Mukut) */}
      <circle cx="75" cy="45" r="8" />
      <path d="M68 39c0-6 14-6 14 0" />
      <path d="M75 35v-6" />
      
      {/* Neck & Elegant Arms in Classical Mudra */}
      <path d="M75 53v6" />
      
      {/* Torso & Waist (Tribhanga curve - torso bent left, hips right) */}
      <path d="M75 59c-6 12-4 24 5 35 8 10 3 25-2 36" />
      
      {/* Left arm bent up, hand in mudra */}
      <path d="M72 59c-12-2-18-12-16-20s8-6 12-2" />
      
      {/* Right arm stretched out, elbow bent down */}
      <path d="M78 59c15 3 24 10 22 18s-10 12-18 6" />
      
      {/* Waist belt accessories */}
      <path d="M68 130c14 4 22 0 28-5" strokeWidth="1.8" />
      <path d="M72 131s5 15-2 20M82 129s-1 12 4 18" />

      {/* Decorative Traditional Skirt Pleat outlines */}
      <path d="M65 130l-15 65h60l-12-65" />
      <path d="M70 134l-5 61" strokeDasharray="2,2" />
      <path d="M80 133l4 62" strokeDasharray="2,2" />
      <path d="M75 131v64" strokeWidth="1.5" />

      {/* Legs in Chauk/Bend stance */}
      <path d="M50 195c-5 10-15 15-5 25" />
      <path d="M50 195h50" />
      <path d="M100 195c5 10 15 15 5 25" />
      <path d="M45 220h15M95 220h15" />
    </svg>
  );
}

export function RajasthanPalaceSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 180"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Palace Walls and Fortifications */}
      <path d="M10 170h200v-50H10z" />
      
      {/* Battlements along the wall */}
      {Array.from({ length: 15 }).map((_, i) => (
        <path key={i} d={`M${15 + i * 13} 120h6v-5h-6z`} />
      ))}

      {/* Large Center archway entry */}
      <path d="M90 170v-35c0-10 8-15 20-15s20 5 20 15v35" strokeWidth="1.5" />
      
      {/* Majestic dome (Chhatri dome) left side */}
      <path d="M30 120V90l-12 15h34l-12-15z" />
      <path d="M25 90c0-14 10-18 10-25 0 7 10 11 10 25z" fill="rgba(234, 88, 12, 0.05)" />
      <line x1="35" y1="65" x2="35" y2="55" />

      {/* Majestic dome center */}
      <path d="M100 110V75l-18 20h46l-18-20z" />
      <path d="M95 75c0-20 15-28 15-38 0 10 15 18 15 38z" fill="rgba(234, 88, 12, 0.05)" />
      <line x1="110" y1="37" x2="110" y2="25" />

      {/* Majestic dome right side */}
      <path d="M175 120V90l-12 15h34l-12-15z" />
      <path d="M170 90c0-14 10-18 10-25 0 7 10 11 10 25z" fill="rgba(234, 88, 12, 0.05)" />
      <line x1="180" y1="65" x2="180" y2="55" />

      {/* Small Jharokha window balconies with miniature arches */}
      <path d="M60 145h15v-18H60z" />
      <path d="M60 127c5-5 10-5 15 0" />
      
      <path d="M145 145h15v-18h-15z" />
      <path d="M145 127c5-5 10-5 15 0" />
    </svg>
  );
}

export function KeralaHouseboatSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 140"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Water line ripples */}
      <path d="M10 125c15 2 25-2 40 0s25 2 40 0 25-2 40 0 25 2 40 0 25-2 40 0" strokeDasharray="3,3" />

      {/* Boat Curved hull */}
      <path d="M20 100c30 18 150 18 200-5l10-15c-30-2-180 5-215 12z" fill="rgba(10, 37, 64, 0.02)" />
      <path d="M15 92l6-4" />
      <path d="M220 80l12-3" />

      {/* Bamboo Thatch Roof curved canopy */}
      <path d="M45 80c5-35 25-45 65-45s55 10 75 45" strokeWidth="1.6" />
      <path d="M55 80c5-30 22-38 55-38s45 8 65 38" />
      <path d="M68 80c5-25 18-32 42-32s35 7 50 32" />
      <path d="M85 80c5-18 12-25 25-25s20 7 28 25" />

      {/* Supporting pillars */}
      <line x1="45" y1="80" x2="45" y2="100" strokeWidth="2" />
      <line x1="110" y1="80" x2="110" y2="101" />
      <line x1="140" y1="80" x2="140" y2="101" />
      <line x1="185" y1="80" x2="185" y2="99" strokeWidth="2" />

      {/* Handcrafted wooden lantern hanging from roof */}
      <path d="M110 55v8" />
      <rect x="107" y="63" width="6" height="8" rx="1" fill="rgba(234, 88, 12, 0.1)" />
      
      {/* Sailor oar / steering rod outline */}
      <line x1="205" y1="85" x2="225" y2="115" strokeWidth="1.5" />
    </svg>
  );
}

export function VaranasiGhatsSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 180"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* River Ganges wavy flow at base */}
      <path d="M10 160c20 3 40-3 60 0s40 3 60 0 40-3 60 0 40 3 60 0" />
      <path d="M20 170c20 2 40-2 60 0s40 2 60 0 40-2 60 0 40 2 60 0" strokeDasharray="4,4" />

      {/* Ghat steps descending into water */}
      <path d="M30 155h180M50 145h140M70 135h100M90 125h60" />
      
      {/* Verticals for steps */}
      <line x1="30" y1="155" x2="30" y2="160" />
      <line x1="210" y1="155" x2="210" y2="160" />
      
      <line x1="50" y1="145" x2="50" y2="155" />
      <line x1="190" y1="145" x2="190" y2="155" />

      <line x1="70" y1="135" x2="70" y2="145" />
      <line x1="170" y1="135" x2="170" y2="145" />

      <line x1="90" y1="125" x2="90" y2="135" />
      <line x1="150" y1="125" x2="150" y2="135" />

      {/* Riverbank temple spires and chhatris */}
      <path d="M105 125v-30h30v30z" />
      <path d="M100 95c0-10 10-15 10-25 0 10 10 15 10 25z" fill="rgba(234, 88, 12, 0.04)" />
      <line x1="110" y1="70" x2="110" y2="60" />

      {/* Tall spire spire temple */}
      <path d="M135 125l5-45h15l5 45z" />
      <path d="M140 80c0-12 5-18 5-25 0 7 5 13 5 25z" fill="rgba(234, 88, 12, 0.04)" />
      <line x1="145" y1="55" x2="145" y2="45" />

      {/* Ceremonial Ganga Aarti umbrella stands */}
      <path d="M40 145v-25c0-8 12-12 18-5" />
      <path d="M35 120s10-10 25-5" strokeWidth="1.5" />
      
      <path d="M190 145v-25c0-8-12-12-18-5" />
      <path d="M205 120s-10-10-25-5" strokeWidth="1.5" />
    </svg>
  );
}

export function DeitiesFacesSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 350 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 1. Lord Balabhadra (White Face) - Left */}
      <g transform="translate(15, 5)">
        {/* Face Outline */}
        <path d="M50 0 C77 0, 95 20, 95 55 C95 90, 77 110, 50 110 C23 110, 5 90, 5 55 C5 20, 23 0, 50 0 Z" fill="#ffffff" stroke="#bb5a06" strokeWidth="1.5" />
        {/* Black Forehead Band / Crown base */}
        <path d="M15 15 C35 8, 65 8, 85 15 L88 5 C68 -2, 32 -2, 12 5 Z" fill="#1e293b" />
        {/* Large Round Eyes */}
        <circle cx="32" cy="50" r="14" fill="#000000" />
        <circle cx="68" cy="50" r="14" fill="#000000" />
        <circle cx="32" cy="50" r="11" fill="#ffffff" />
        <circle cx="68" cy="50" r="11" fill="#ffffff" />
        <circle cx="32" cy="50" r="8" fill="none" stroke="#dc2626" strokeWidth="1.5" />
        <circle cx="68" cy="50" r="8" fill="none" stroke="#dc2626" strokeWidth="1.5" />
        <circle cx="32" cy="50" r="4" fill="#000000" />
        <circle cx="68" cy="50" r="4" fill="#000000" />
        
        {/* Tilak */}
        <path d="M44 15 L44 38 C44 42, 56 42, 56 38 L56 15 Z" fill="#dc2626" />
        <path d="M46 15 L46 36 C46 38, 54 38, 54 36 L54 15 Z" fill="#facc15" />
        {/* Smile */}
        <path d="M35 75 Q50 88, 65 75" stroke="#dc2626" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Ear Ornaments */}
        <circle cx="2" cy="55" r="5" fill="#facc15" stroke="#ea580c" strokeWidth="1" />
        <circle cx="98" cy="55" r="5" fill="#facc15" stroke="#ea580c" strokeWidth="1" />
      </g>

      {/* 2. Lord Jagannath (Black Face) - Center */}
      <g transform="translate(125, 5)">
        {/* Face Outline */}
        <path d="M50 0 C77 0, 95 20, 95 55 C95 90, 77 110, 50 110 C23 110, 5 90, 5 55 C5 20, 23 0, 50 0 Z" fill="#1e293b" stroke="#000000" strokeWidth="1" />
        {/* Large Round Eyes */}
        <circle cx="28" cy="50" r="16" fill="#ffffff" stroke="#dc2626" strokeWidth="2" />
        <circle cx="72" cy="50" r="16" fill="#ffffff" stroke="#dc2626" strokeWidth="2" />
        <circle cx="28" cy="50" r="9" fill="#000000" />
        <circle cx="72" cy="50" r="9" fill="#000000" />
        <circle cx="28" cy="50" r="3" fill="#ffffff" />
        <circle cx="72" cy="50" r="3" fill="#ffffff" />
        
        {/* Tilak */}
        <path d="M43 12 Q50 -5, 57 12 Q50 20, 43 12 Z" fill="#ea580c" />
        <circle cx="50" cy="30" r="3.5" fill="#facc15" />
        <path d="M48 30 L48 48 L52 48 L52 30 Z" fill="#facc15" />

        {/* Smile */}
        <path d="M30 75 Q50 92, 70 75" stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M35 75 Q50 86, 65 75" fill="#ea580c" />

        {/* Cheek Decor */}
        <path d="M12 75 Q20 80, 24 75" stroke="#facc15" strokeWidth="1.5" fill="none" />
        <path d="M88 75 Q80 80, 76 75" stroke="#facc15" strokeWidth="1.5" fill="none" />

        {/* Ear Ornaments */}
        <circle cx="2" cy="55" r="5" fill="#facc15" stroke="#ea580c" strokeWidth="1" />
        <circle cx="98" cy="55" r="5" fill="#facc15" stroke="#ea580c" strokeWidth="1" />
      </g>

      {/* 3. Subhadra (Yellow Face) - Right */}
      <g transform="translate(235, 10)">
        {/* Face Outline */}
        <path d="M45 0 C69 0, 85 18, 85 50 C85 82, 69 100, 45 100 C21 100, 5 82, 5 50 C5 18, 21 0, 45 0 Z" fill="#facc15" stroke="#eab308" strokeWidth="1" />
        {/* Eyes */}
        <path d="M15 48 C20 40, 32 40, 36 48 C32 54, 20 54, 15 48 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
        <circle cx="25" cy="48" r="5" fill="#000000" />
        <circle cx="26" cy="47" r="1.5" fill="#ffffff" />
        
        <path d="M54 48 C58 40, 70 40, 74 48 C70 54, 58 54, 54 48 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
        <circle cx="64" cy="48" r="5" fill="#000000" />
        <circle cx="65" cy="47" r="1.5" fill="#ffffff" />
        
        {/* Red Tilak */}
        <line x1="45" y1="12" x2="45" y2="35" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
        <circle cx="45" cy="38" r="3" fill="#dc2626" />

        {/* Smile */}
        <path d="M30 70 Q45 80, 60 70" stroke="#dc2626" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Cheek spots */}
        <circle cx="20" cy="65" r="1" fill="#dc2626" />
        <circle cx="70" cy="65" r="1" fill="#dc2626" />

        {/* Ear Ornaments */}
        <circle cx="2" cy="50" r="4" fill="#ffffff" stroke="#eab308" strokeWidth="1" />
        <circle cx="88" cy="50" r="4" fill="#ffffff" stroke="#eab308" strokeWidth="1" />
      </g>
    </svg>
  );
}
