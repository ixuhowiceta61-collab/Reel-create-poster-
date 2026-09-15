/**
 * High-definition procedural vector artwork generator for vintage postcards
 * Provides instant, zero-latency, razor-sharp vintage imagery that can be exported
 * at high resolution or easily swapped with custom webp images.
 */

export const VINTAGE_ARTWORK_TYPES = [
  'rainy-umbrella',
  'vintage-rose',
  'railway-station',
  'moonlight-lake',
  'old-cafe',
  'typewriter-petals',
  'vintage-bicycle',
  'sunset-riverboat',
  'antique-letter',
  'gramophone-music',
  'candlelight-window',
  'couple-lamppost',
  'bengali-village',
  'autumn-park-bench',
  'old-cinema-hall',
  'vintage-pocket-watch',
  'tea-garden-mist',
  'starry-midnight',
  'wildflowers-bouquet',
  'vintage-camera-film',
] as const;

export type ArtworkType = typeof VINTAGE_ARTWORK_TYPES[number];

/**
 * Returns a self-contained inline SVG string representing a vintage etched artwork
 */
export function getVintageArtworkSvg(type: string, accentColor = '#d4af37'): string {
  switch (type) {
    case 'rainy-umbrella':
      return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <defs>
          <radialGradient id="rainGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#2a2421" />
            <stop offset="60%" stop-color="#181311" />
            <stop offset="100%" stop-color="#0c0a09" />
          </radialGradient>
          <linearGradient id="lampGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f6d365" stop-opacity="0.9" />
            <stop offset="30%" stop-color="#d4af37" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#241e1b" stop-opacity="0" />
          </linearGradient>
          <pattern id="rainPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="10" y1="0" x2="0" y2="40" stroke="#7a7066" stroke-width="0.7" stroke-opacity="0.35" />
            <line x1="30" y1="0" x2="20" y2="40" stroke="#7a7066" stroke-width="0.7" stroke-opacity="0.25" />
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#rainGrad)" />
        <rect width="800" height="600" fill="url(#rainPattern)" />
        
        <!-- Distant Foggy Silhouette of City / Trees -->
        <path d="M0,450 Q180,410 320,440 T600,430 T800,450 L800,600 L0,600 Z" fill="#120e0c" opacity="0.8" />
        
        <!-- Vintage Street Lamp -->
        <path d="M260,180 L270,180 L268,480 L262,480 Z" fill="#3b322a" />
        <path d="M250,180 L280,180 L285,195 L245,195 Z" fill="#54483d" />
        <polygon points="252,195 278,195 272,230 258,230" fill="#fce49f" opacity="0.85" />
        <polygon points="265,190 200,500 330,500" fill="url(#lampGlow)" />
        
        <!-- Puddle reflection -->
        <ellipse cx="265" cy="510" rx="90" ry="18" fill="#574635" opacity="0.3" />
        <ellipse cx="440" cy="530" rx="140" ry="24" fill="#3d3328" opacity="0.4" />

        <!-- Silhouette Couple with Vintage Umbrella -->
        <path d="M380,310 C380,260 480,260 480,310 C460,312 440,315 430,315 C410,315 390,312 380,310 Z" fill="#1c1613" stroke="#8c7353" stroke-width="2" />
        <!-- Umbrella ribs & handle -->
        <line x1="430" y1="260" x2="430" y2="380" stroke="#8c7353" stroke-width="2.5" />
        <path d="M430,380 C430,395 442,395 442,388" fill="none" stroke="#8c7353" stroke-width="2.5" />
        
        <!-- Couple figures silhouette -->
        <circle cx="415" cy="340" r="14" fill="#15110f" />
        <circle cx="442" cy="344" r="13" fill="#15110f" />
        <path d="M400,358 C400,358 410,355 425,362 C435,355 455,358 455,358 L460,490 L395,490 Z" fill="#15110f" />
        
        <!-- Subtle rain splash ripples -->
        <ellipse cx="380" cy="515" rx="12" ry="4" fill="none" stroke="#a39281" stroke-width="0.8" opacity="0.5" />
        <ellipse cx="490" cy="535" rx="18" ry="5" fill="none" stroke="#a39281" stroke-width="0.8" opacity="0.4" />
      </svg>`;

    case 'vintage-rose':
      return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <defs>
          <radialGradient id="roseBg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stop-color="#2c1819" />
            <stop offset="70%" stop-color="#190e10" />
            <stop offset="100%" stop-color="#0d0708" />
          </radialGradient>
          <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#991b1b" />
            <stop offset="50%" stop-color="#7f1d1d" />
            <stop offset="100%" stop-color="#450a0a" />
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#roseBg)" />
        
        <!-- Victorian Etched Rose Illustration -->
        <g transform="translate(250, 100) scale(1.1)">
          <!-- Leaves and stem -->
          <path d="M140,250 Q160,350 150,420" stroke="#364936" stroke-width="6" fill="none" stroke-linecap="round" />
          <!-- Thorns -->
          <polygon points="144,300 134,310 146,314" fill="#364936" />
          <polygon points="152,360 162,370 150,374" fill="#364936" />
          
          <!-- Leaf Left -->
          <path d="M142,320 C100,300 70,340 100,370 C125,360 140,335 142,320 Z" fill="#203322" stroke="#48694a" stroke-width="1.5" />
          <line x1="142" y1="320" x2="95" y2="350" stroke="#48694a" stroke-width="1.2" />
          
          <!-- Leaf Right -->
          <path d="M148,340 C190,320 220,360 190,390 C165,380 150,355 148,340 Z" fill="#203322" stroke="#48694a" stroke-width="1.5" />
          
          <!-- Rose Petals Layering -->
          <ellipse cx="140" cy="220" rx="60" ry="50" fill="url(#petalGrad)" stroke="#b91c1c" stroke-width="1.5" />
          <path d="M95,210 C85,160 140,150 145,190 C165,145 205,175 185,215 C215,225 180,265 145,260 C105,270 85,240 95,210 Z" fill="#881337" stroke="#fb7185" stroke-width="1" />
          
          <!-- Inner tight petals -->
          <path d="M120,195 C120,170 165,170 165,195 C165,220 120,220 120,195 Z" fill="#4c0519" stroke="#fda4af" stroke-width="1.2" />
          <path d="M130,190 C130,178 155,178 155,190 C155,202 130,202 130,190 Z" fill="#fda4af" opacity="0.7" />
          
          <!-- Dew drops -->
          <circle cx="170" cy="210" r="3" fill="#ffffff" opacity="0.6" />
          <circle cx="115" cy="235" r="2.5" fill="#ffffff" opacity="0.5" />
        </g>
        
        <!-- Antique Corner Filigree Accents -->
        <g stroke="${accentColor}" stroke-width="1" fill="none" opacity="0.6">
          <path d="M60,60 L140,60 M60,60 L60,140" />
          <circle cx="75" cy="75" r="8" />
          <path d="M740,60 L660,60 M740,60 L740,140" />
          <circle cx="725" cy="75" r="8" />
          <path d="M60,540 L140,540 M60,540 L60,460" />
          <circle cx="75" cy="525" r="8" />
          <path d="M740,540 L660,540 M740,540 L740,460" />
          <circle cx="725" cy="525" r="8" />
        </g>
      </svg>`;

    case 'railway-station':
      return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <defs>
          <linearGradient id="mistSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1c1917" />
            <stop offset="60%" stop-color="#292524" />
            <stop offset="100%" stop-color="#44403c" />
          </linearGradient>
          <radialGradient id="locoLight" cx="400" cy="330" r="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9" />
            <stop offset="40%" stop-color="#ca8a04" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#292524" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="600" fill="url(#mistSky)" />
        
        <!-- Station roof trusses -->
        <path d="M50,40 L750,40 L700,120 L100,120 Z" fill="#171412" stroke="#574f48" stroke-width="1.5" />
        <line x1="150" y1="40" x2="200" y2="120" stroke="#3b3531" stroke-width="2" />
        <line x1="300" y1="40" x2="330" y2="120" stroke="#3b3531" stroke-width="2" />
        <line x1="500" y1="40" x2="470" y2="120" stroke="#3b3531" stroke-width="2" />
        <line x1="650" y1="40" x2="600" y2="120" stroke="#3b3531" stroke-width="2" />

        <!-- Steam Train Silhouette in Distance -->
        <ellipse cx="400" cy="330" rx="140" ry="120" fill="url(#locoLight)" />
        <!-- Locomotive Body -->
        <rect x="340" y="270" width="120" height="90" rx="10" fill="#141110" />
        <circle cx="400" cy="305" r="16" fill="#fef08a" stroke="#ca8a04" stroke-width="3" />
        <!-- Chimney steam -->
        <path d="M385,250 C370,220 340,180 390,140 C430,100 480,120 460,170 C440,210 415,240 410,250 Z" fill="#a8a29e" opacity="0.25" />
        
        <!-- Rails converging -->
        <line x1="380" y1="360" x2="100" y2="600" stroke="#78716c" stroke-width="3" />
        <line x1="420" y1="360" x2="700" y2="600" stroke="#78716c" stroke-width="3" />
        <!-- Sleepers -->
        <line x1="375" y1="380" x2="425" y2="380" stroke="#44403c" stroke-width="3" />
        <line x1="360" y1="410" x2="440" y2="410" stroke="#44403c" stroke-width="4" />
        <line x1="330" y1="450" x2="470" y2="450" stroke="#44403c" stroke-width="5" />
        <line x1="280" y1="500" x2="520" y2="500" stroke="#44403c" stroke-width="6" />
        <line x1="200" y1="560" x2="600" y2="560" stroke="#44403c" stroke-width="7" />

        <!-- Platform Clock -->
        <g transform="translate(140, 160)">
          <line x1="0" y1="-40" x2="0" y2="0" stroke="#854d0e" stroke-width="4" />
          <circle cx="0" cy="30" r="26" fill="#fef3c7" stroke="#78350f" stroke-width="4" />
          <!-- Hands showing 11:15 -->
          <line x1="0" y1="30" x2="12" y2="30" stroke="#1c1917" stroke-width="2.5" />
          <line x1="0" y1="30" x2="0" y2="12" stroke="#1c1917" stroke-width="3" />
        </g>

        <!-- Waiting lover silhouette with suitcase on platform -->
        <g transform="translate(620, 390)">
          <circle cx="10" cy="-30" r="10" fill="#1c1917" />
          <path d="M-5,-18 C-5,-18 5,-20 18,-18 L22,80 L-2,80 Z" fill="#1c1917" />
          <!-- Suitcase -->
          <rect x="26" y="50" width="28" height="22" rx="3" fill="#451a03" stroke="#92400e" stroke-width="1.5" />
          <path d="M34,50 L34,44 L46,44 L46,50" fill="none" stroke="#92400e" stroke-width="2" />
        </g>
      </svg>`;

    case 'moonlight-lake':
      return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <defs>
          <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#090d16" />
            <stop offset="50%" stop-color="#111827" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fef9c3" />
            <stop offset="40%" stop-color="#fde047" stop-opacity="0.7" />
            <stop offset="100%" stop-color="#111827" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="600" fill="url(#nightSky)" />

        <!-- Distant stars -->
        <circle cx="120" cy="80" r="1.5" fill="#f8fafc" opacity="0.8" />
        <circle cx="280" cy="110" r="1" fill="#f8fafc" opacity="0.7" />
        <circle cx="480" cy="60" r="1.8" fill="#f8fafc" opacity="0.9" />
        <circle cx="650" cy="95" r="1.2" fill="#f8fafc" opacity="0.8" />
        <circle cx="720" cy="150" r="1" fill="#f8fafc" opacity="0.6" />

        <!-- Glowing Full Moon -->
        <ellipse cx="560" cy="160" rx="90" ry="90" fill="url(#moonGlow)" />
        <circle cx="560" cy="160" r="45" fill="#fef08a" />
        <circle cx="575" cy="150" r="8" fill="#fef9c3" opacity="0.7" />
        <circle cx="545" cy="170" r="12" fill="#fde047" opacity="0.4" />

        <!-- Mountains on horizon -->
        <path d="M0,320 Q200,240 380,310 T800,280 L800,380 L0,380 Z" fill="#0b1120" />

        <!-- Calm Lake Water -->
        <rect x="0" y="340" width="800" height="260" fill="#0f172a" />
        <!-- Moon reflection on water waves -->
        <ellipse cx="560" cy="380" rx="40" ry="3" fill="#fef08a" opacity="0.6" />
        <ellipse cx="560" cy="410" rx="55" ry="4" fill="#fef08a" opacity="0.5" />
        <ellipse cx="560" cy="445" rx="70" ry="5" fill="#fef08a" opacity="0.4" />
        <ellipse cx="560" cy="485" rx="85" ry="6" fill="#fef08a" opacity="0.3" />
        <ellipse cx="560" cy="530" rx="100" ry="7" fill="#fef08a" opacity="0.2" />

        <!-- Silhouetted Pine trees on Left bank -->
        <path d="M30,360 L50,220 L70,360 Z" fill="#050811" />
        <path d="M60,370 L85,250 L110,370 Z" fill="#050811" />
        <path d="M90,380 L115,270 L140,380 Z" fill="#050811" />

        <!-- Small Wooden Rowboat with lantern -->
        <g transform="translate(320, 430)">
          <!-- Boat Hull -->
          <path d="M0,20 Q60,45 140,20 Q70,26 0,20 Z" fill="#0b0f19" stroke="#334155" stroke-width="1.5" />
          <line x1="50" y1="20" x2="80" y2="4" stroke="#475569" stroke-width="2" />
          <!-- Little lantern glow in boat -->
          <circle cx="70" cy="10" r="14" fill="#f59e0b" opacity="0.4" />
          <circle cx="70" cy="10" r="3" fill="#fef3c7" />
        </g>
      </svg>`;

    case 'old-cafe':
      return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <defs>
          <linearGradient id="cafeWall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#2e1b15" />
            <stop offset="70%" stop-color="#1f110c" />
            <stop offset="100%" stop-color="#120805" />
          </linearGradient>
          <linearGradient id="coffeeSteam" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#e2d4c0" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#cafeWall)" />

        <!-- Wooden window frame looking out to cobblestone street -->
        <rect x="80" y="60" width="640" height="320" rx="8" fill="#1a1412" stroke="#694b37" stroke-width="12" />
        <line x1="400" y1="60" x2="400" y2="380" stroke="#694b37" stroke-width="8" />
        <line x1="80" y1="220" x2="720" y2="220" stroke="#694b37" stroke-width="8" />

        <!-- Window glass reflection & bokeh lights outside -->
        <circle cx="220" cy="140" r="25" fill="#fde047" opacity="0.25" />
        <circle cx="310" cy="190" r="18" fill="#fb923c" opacity="0.2" />
        <circle cx="520" cy="130" r="22" fill="#fde047" opacity="0.2" />
        <circle cx="610" cy="180" r="16" fill="#f87171" opacity="0.18" />

        <!-- Wooden café table surface -->
        <path d="M0,420 L800,420 L800,600 L0,600 Z" fill="#3b2219" stroke="#523124" stroke-width="4" />
        
        <!-- Antique porcelain coffee cup on saucer -->
        <g transform="translate(380, 420)">
          <!-- Saucer -->
          <ellipse cx="0" cy="70" rx="90" ry="24" fill="#f5edd8" stroke="#b08968" stroke-width="3" />
          <ellipse cx="0" cy="70" rx="60" ry="16" fill="#edd6bd" />
          <!-- Cup -->
          <path d="M-45,30 Q-40,70 0,70 Q40,70 45,30 Z" fill="#faf5ee" stroke="#b08968" stroke-width="2.5" />
          <ellipse cx="0" cy="30" rx="45" ry="14" fill="#542e18" stroke="#b08968" stroke-width="2" />
          <!-- Cup handle -->
          <path d="M42,36 C65,36 65,58 40,62" fill="none" stroke="#b08968" stroke-width="4" />
          <!-- Coffee heart foam art -->
          <path d="M0,25 C-8,18 -16,26 0,34 C16,26 8,18 0,25 Z" fill="#f5edd8" opacity="0.9" />
          <!-- Gentle aromatic steam -->
          <path d="M-10,15 C-20,-10 -5,-30 -15,-60" fill="none" stroke="url(#coffeeSteam)" stroke-width="4" stroke-linecap="round" />
          <path d="M10,15 C20,-15 5,-35 15,-65" fill="none" stroke="url(#coffeeSteam)" stroke-width="3" stroke-linecap="round" />
        </g>

        <!-- Old closed book with fountain pen -->
        <g transform="translate(140, 470)">
          <rect x="0" y="0" width="130" height="24" rx="3" fill="#6b21a8" stroke="#4a154b" stroke-width="2" />
          <rect x="2" y="-12" width="126" height="12" rx="2" fill="#faf5eb" stroke="#c084fc" stroke-width="1" />
          <!-- Golden fountain pen -->
          <line x1="80" y1="-8" x2="160" y2="-30" stroke="#d4af37" stroke-width="4" stroke-linecap="round" />
          <polygon points="160,-30 168,-34 163,-26" fill="#ca8a04" />
        </g>
      </svg>`;

    case 'antique-letter':
      return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <defs>
          <radialGradient id="deskBg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stop-color="#261710" />
            <stop offset="100%" stop-color="#0f0906" />
          </radialGradient>
        </defs>
        <rect width="800" height="600" fill="url(#deskBg)" />

        <!-- Weathered parchment envelope & letter -->
        <g transform="translate(240, 140) rotate(-4)">
          <!-- Envelope back -->
          <rect x="0" y="0" width="340" height="220" rx="6" fill="#eed9b7" stroke="#b39268" stroke-width="3" />
          <!-- Envelope flap folds -->
          <polygon points="0,0 170,120 340,0" fill="#e0c7a2" stroke="#b39268" stroke-width="2" />
          <polygon points="0,220 170,110 340,220" fill="#e7d2af" stroke="#b39268" stroke-width="2" />

          <!-- Royal Crimson Wax Seal with Heart / Monogram -->
          <circle cx="170" cy="115" r="28" fill="#881337" stroke="#4c0519" stroke-width="3" />
          <circle cx="170" cy="115" r="20" fill="none" stroke="#be123c" stroke-width="1.5" stroke-dasharray="3 2" />
          <path d="M170,110 C165,102 155,108 170,122 C185,108 175,102 170,110 Z" fill="#fda4af" />

          <!-- Vintage Postal Stamp in Corner -->
          <g transform="translate(260, 20)">
            <rect x="0" y="0" width="55" height="65" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" />
            <rect x="5" y="5" width="45" height="55" fill="#0284c7" />
            <circle cx="27" cy="28" r="12" fill="#e0f2fe" />
            <!-- Circular Postmark stamp cancelling it -->
            <circle cx="25" cy="55" r="24" fill="none" stroke="#1e293b" stroke-width="1.8" opacity="0.75" />
            <line x1="2" y1="50" x2="48" y2="50" stroke="#1e293b" stroke-width="1.2" opacity="0.7" />
            <line x1="2" y1="60" x2="48" y2="60" stroke="#1e293b" stroke-width="1.2" opacity="0.7" />
          </g>
        </g>

        <!-- Antique Quill and Glass Inkpot -->
        <g transform="translate(560, 360)">
          <!-- Glass inkpot -->
          <rect x="0" y="20" width="60" height="50" rx="8" fill="#1e293b" stroke="#475569" stroke-width="2" />
          <ellipse cx="30" cy="20" rx="20" ry="8" fill="#0f172a" stroke="#475569" stroke-width="2" />
          <!-- Black ink pool inside -->
          <ellipse cx="30" cy="45" rx="22" ry="12" fill="#020617" />
          <!-- Swan Feather Quill resting in inkpot -->
          <path d="M28,24 C10,-70 -30,-160 -80,-240 C-60,-220 -40,-180 -10,-100 Z" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
          <line x1="28" y1="24" x2="-80" y2="-240" stroke="#94a3b8" stroke-width="2" />
        </g>
      </svg>`;

    case 'sunset-riverboat':
      return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <defs>
          <linearGradient id="riverSunset" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#4a0404" />
            <stop offset="35%" stop-color="#9a3412" />
            <stop offset="65%" stop-color="#d97706" />
            <stop offset="100%" stop-color="#fbbf24" />
          </linearGradient>
          <linearGradient id="riverWater" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#b45309" />
            <stop offset="50%" stop-color="#78350f" />
            <stop offset="100%" stop-color="#291609" />
          </linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#riverSunset)" />
        <rect y="380" width="800" height="220" fill="url(#riverWater)" />

        <!-- Glowing Setting Sun -->
        <circle cx="400" cy="340" r="75" fill="#fef08a" />
        <ellipse cx="400" cy="380" rx="90" ry="14" fill="#fef08a" opacity="0.6" />
        <ellipse cx="400" cy="420" rx="120" ry="8" fill="#fde047" opacity="0.5" />
        <ellipse cx="400" cy="460" rx="150" ry="8" fill="#f59e0b" opacity="0.4" />

        <!-- Distant Bengal riverbank with palms silhouette -->
        <path d="M0,380 L180,365 L260,375 L400,370 L550,378 L800,368 L800,385 L0,385 Z" fill="#1c0f0a" />
        <!-- Palm trees on left -->
        <g transform="translate(90, 368) scale(0.7)">
          <path d="M0,0 Q10,-70 5,-130" stroke="#1c0f0a" stroke-width="7" fill="none" />
          <path d="M5,-130 Q-40,-160 -80,-140" stroke="#1c0f0a" stroke-width="4" fill="none" />
          <path d="M5,-130 Q-20,-180 0,-190" stroke="#1c0f0a" stroke-width="4" fill="none" />
          <path d="M5,-130 Q40,-180 60,-160" stroke="#1c0f0a" stroke-width="4" fill="none" />
          <path d="M5,-130 Q50,-150 80,-130" stroke="#1c0f0a" stroke-width="4" fill="none" />
        </g>

        <!-- Traditional Bengali Country Sailboat (নৌকা) -->
        <g transform="translate(320, 385)">
          <!-- Curved wooden boat hull -->
          <path d="M-60,35 Q0,50 110,25 Q15,40 -60,35 Z" fill="#140a06" />
          <!-- Triangular vintage sail -->
          <polygon points="10,30 20,-90 90,20" fill="#edd5b3" stroke="#b45309" stroke-width="1.5" opacity="0.85" />
          <line x1="20" y1="30" x2="20" y2="-90" stroke="#1c0f0a" stroke-width="3" />
          <!-- Boatman silhouette with oar -->
          <circle cx="-15" cy="18" r="8" fill="#140a06" />
          <line x1="-15" y1="26" x2="-45" y2="55" stroke="#140a06" stroke-width="2.5" />
        </g>

        <!-- Migrating birds flying towards horizon -->
        <path d="M260,160 Q270,150 280,160 Q290,150 300,160" fill="none" stroke="#1c0f0a" stroke-width="2" />
        <path d="M310,130 Q318,122 326,130 Q334,122 342,130" fill="none" stroke="#1c0f0a" stroke-width="1.8" />
        <path d="M240,190 Q246,184 252,190 Q258,184 264,190" fill="none" stroke="#1c0f0a" stroke-width="1.5" />
      </svg>`;

    case 'vintage-bicycle':
      return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <defs>
          <radialGradient id="gardenBg" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stop-color="#2a221a" />
            <stop offset="100%" stop-color="#110d0a" />
          </radialGradient>
        </defs>
        <rect width="800" height="600" fill="url(#gardenBg)" />

        <!-- Stone wall / cobblestone path -->
        <rect y="460" width="800" height="140" fill="#1e1814" stroke="#4a3b30" stroke-width="2" />

        <!-- Vintage Roadster Bicycle with flower basket -->
        <g transform="translate(250, 240)">
          <!-- Wheels -->
          <!-- Rear Wheel -->
          <circle cx="50" cy="160" r="70" fill="none" stroke="#a8896c" stroke-width="4" />
          <circle cx="50" cy="160" r="5" fill="#d4af37" />
          <!-- Spokes -->
          <line x1="50" y1="90" x2="50" y2="230" stroke="#715c48" stroke-width="1" />
          <line x1="-20" y1="160" x2="120" y2="160" stroke="#715c48" stroke-width="1" />
          
          <!-- Front Wheel -->
          <circle cx="270" cy="160" r="70" fill="none" stroke="#a8896c" stroke-width="4" />
          <circle cx="270" cy="160" r="5" fill="#d4af37" />
          <line x1="270" y1="90" x2="270" y2="230" stroke="#715c48" stroke-width="1" />
          <line x1="200" y1="160" x2="340" y2="160" stroke="#715c48" stroke-width="1" />

          <!-- Frame tubes -->
          <polygon points="50,160 140,160 190,80 110,80" fill="none" stroke="#8c2e2e" stroke-width="6" stroke-linejoin="round" />
          <line x1="140" y1="160" x2="190" y2="80" stroke="#8c2e2e" stroke-width="6" />
          <line x1="270" y1="160" x2="240" y2="50" stroke="#8c2e2e" stroke-width="6" />
          
          <!-- Saddle -->
          <path d="M90,75 C90,75 125,70 135,78" stroke="#422006" stroke-width="9" stroke-linecap="round" />

          <!-- Curved Handlebars -->
          <path d="M240,50 Q235,30 220,38" fill="none" stroke="#d4af37" stroke-width="4" stroke-linecap="round" />

          <!-- Woven Wicker Basket full of Wildflowers -->
          <path d="M235,45 L285,45 L275,85 L245,85 Z" fill="#b45309" stroke="#78350f" stroke-width="2" />
          <!-- Flowers spilling out of basket -->
          <circle cx="245" cy="40" r="8" fill="#fb7185" />
          <circle cx="260" cy="35" r="9" fill="#fef08a" />
          <circle cx="275" cy="42" r="7" fill="#f43f5e" />
          <circle cx="255" cy="46" r="6" fill="#a7f3d0" />
        </g>
      </svg>`;

    case 'candlelight-window':
      return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <defs>
          <radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fffbeb" />
            <stop offset="25%" stop-color="#fde047" stop-opacity="0.9" />
            <stop offset="60%" stop-color="#d97706" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#1c1917" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="600" fill="#140f0d" />
        <!-- Dark nighttime window sill -->
        <rect x="100" y="40" width="600" height="380" rx="6" fill="#080c14" stroke="#443227" stroke-width="14" />
        <line x1="400" y1="40" x2="400" y2="420" stroke="#443227" stroke-width="10" />
        <!-- Starry night outside window -->
        <circle cx="240" cy="120" r="1.5" fill="#f8fafc" opacity="0.8" />
        <circle cx="560" cy="180" r="2" fill="#f8fafc" opacity="0.7" />
        <circle cx="480" cy="90" r="1.2" fill="#f8fafc" opacity="0.9" />
        <path d="M480,140 Q490,125 510,135 Q500,150 480,140 Z" fill="#fef08a" opacity="0.8" /> <!-- Crescent moon -->

        <!-- Window sill wooden surface -->
        <rect y="400" width="800" height="200" fill="#2d1c15" stroke="#452c22" stroke-width="4" />

        <!-- Vintage Brass Candlestick -->
        <ellipse cx="400" cy="310" rx="190" ry="170" fill="url(#candleGlow)" />
        <g transform="translate(400, 310)">
          <!-- Candle holder base -->
          <ellipse cx="0" cy="140" rx="55" ry="16" fill="#ca8a04" stroke="#854d0e" stroke-width="2.5" />
          <path d="M-10,140 L-6,80 L6,80 L10,140 Z" fill="#eab308" stroke="#854d0e" stroke-width="2" />
          <!-- Wax candle pillar -->
          <rect x="-14" y="0" width="28" height="80" rx="2" fill="#fdfbf7" stroke="#e2d9c8" stroke-width="1.5" />
          <!-- Melted wax drips -->
          <path d="M-14,20 Q-16,35 -14,40 M6,15 Q8,30 6,36" stroke="#f5ebd7" stroke-width="3" fill="none" stroke-linecap="round" />
          <!-- Candle wick -->
          <line x1="0" y1="0" x2="0" y2="-12" stroke="#1c1917" stroke-width="2.5" />
          <!-- Dancing Flame -->
          <path d="M0,-12 C-8,-25 -6,-40 0,-52 C6,-40 8,-25 0,-12 Z" fill="#fef08a" stroke="#f59e0b" stroke-width="1.5" />
          <path d="M0,-14 C-4,-22 -3,-32 0,-40 C3,-32 4,-22 0,-14 Z" fill="#ffffff" />
        </g>
      </svg>`;

    case 'typewriter-petals':
      return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <defs>
          <radialGradient id="deskWood" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stop-color="#2c1a11" />
            <stop offset="100%" stop-color="#0e0704" />
          </radialGradient>
        </defs>
        <rect width="800" height="600" fill="url(#deskWood)" />

        <!-- Antique Underwood Typewriter -->
        <g transform="translate(230, 180)">
          <!-- Typewriter main chassis -->
          <path d="M40,120 L300,120 L320,240 L20,240 Z" fill="#18181b" stroke="#3f3f46" stroke-width="4" />
          <!-- Carriage roller and platen -->
          <rect x="10" y="50" width="320" height="35" rx="8" fill="#27272a" stroke="#52525b" stroke-width="2" />
          <!-- Sheet of vintage parchment paper loaded in carriage -->
          <path d="M80,-80 L260,-80 L260,60 L80,60 Z" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" />
          <!-- Faint typed lines on paper -->
          <line x1="100" y1="-50" x2="240" y2="-50" stroke="#78350f" stroke-width="1.5" stroke-dasharray="8 4" opacity="0.7" />
          <line x1="100" y1="-30" x2="220" y2="-30" stroke="#78350f" stroke-width="1.5" stroke-dasharray="8 4" opacity="0.7" />
          <line x1="100" y1="-10" x2="250" y2="-10" stroke="#78350f" stroke-width="1.5" stroke-dasharray="8 4" opacity="0.7" />

          <!-- Circular mechanical keys with chrome rims -->
          <g fill="#09090b" stroke="#d4af37" stroke-width="1.5">
            <circle cx="70" cy="160" r="10" />
            <circle cx="100" cy="160" r="10" />
            <circle cx="130" cy="160" r="10" />
            <circle cx="160" cy="160" r="10" />
            <circle cx="190" cy="160" r="10" />
            <circle cx="220" cy="160" r="10" />
            <circle cx="250" cy="160" r="10" />
            <circle cx="280" cy="160" r="10" />

            <circle cx="85" cy="190" r="10" />
            <circle cx="115" cy="190" r="10" />
            <circle cx="145" cy="190" r="10" />
            <circle cx="175" cy="190" r="10" />
            <circle cx="205" cy="190" r="10" />
            <circle cx="235" cy="190" r="10" />
            <circle cx="265" cy="190" r="10" />
          </g>
          <!-- Spacebar -->
          <rect x="110" y="220" width="120" height="12" rx="4" fill="#09090b" stroke="#d4af37" stroke-width="1.5" />
        </g>

        <!-- Red Rose Petals scattered on keyboard and desk -->
        <g fill="#991b1b" stroke="#dc2626" stroke-width="0.8">
          <ellipse cx="210" cy="420" rx="14" ry="9" transform="rotate(25, 210, 420)" />
          <ellipse cx="440" cy="400" rx="16" ry="10" transform="rotate(-15, 440, 400)" />
          <ellipse cx="530" cy="450" rx="13" ry="8" transform="rotate(40, 530, 450)" />
          <ellipse cx="330" cy="460" rx="15" ry="9" transform="rotate(-30, 330, 460)" />
          <ellipse cx="580" cy="380" rx="12" ry="7" transform="rotate(10, 580, 380)" />
        </g>
      </svg>`;

    case 'couple-lamppost':
      return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <defs>
          <radialGradient id="lampCone" cx="380" cy="180" r="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#fef08a" stop-opacity="0.85" />
            <stop offset="40%" stop-color="#ca8a04" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#0f0c0b" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="600" fill="#100c0a" />

        <!-- Romantic Victorian Gaslight Street Lamp -->
        <ellipse cx="380" cy="300" rx="200" ry="240" fill="url(#lampCone)" />
        <path d="M375,120 L385,120 L382,540 L378,540 Z" fill="#292524" />
        <polygon points="360,110 400,110 392,160 368,160" fill="#fef08a" stroke="#44403c" stroke-width="2" />
        <path d="M350,110 Q380,80 410,110 Z" fill="#1c1917" stroke="#ca8a04" stroke-width="1.5" />

        <!-- Silhouette Couple Holding Hands Beneath Lamp -->
        <g transform="translate(380, 360)">
          <!-- Man -->
          <circle cx="-25" cy="0" r="14" fill="#09090b" />
          <path d="M-40,18 C-40,18 -30,16 -15,18 L-10,150 L-38,150 Z" fill="#09090b" />
          <!-- Vintage Trenchcoat collar & Fedora hat -->
          <ellipse cx="-25" cy="-6" rx="20" ry="4" fill="#1c1917" />
          <path d="M-34,-6 Q-25,-20 -16,-6 Z" fill="#1c1917" />

          <!-- Woman -->
          <circle cx="18" cy="6" r="13" fill="#09090b" />
          <path d="M5,22 C10,20 25,20 30,22 L45,150 L2,150 Z" fill="#09090b" />
          <!-- Woman flowing dress & wavy hair -->
          <path d="M15,10 C5,20 8,40 12,50" stroke="#09090b" stroke-width="8" fill="none" />

          <!-- Intertwined Hands -->
          <circle cx="-2" cy="75" r="5" fill="#09090b" />
        </g>
      </svg>`;

    case 'bengali-village':
      return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <defs>
          <linearGradient id="bengalMorning" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#142119" />
            <stop offset="50%" stop-color="#2d3725" />
            <stop offset="100%" stop-color="#4a3e28" />
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#bengalMorning)" />

        <!-- Golden Morning Sun behind bamboo groves -->
        <circle cx="560" cy="220" r="50" fill="#fde047" opacity="0.8" />

        <!-- Traditional Bengali Thatched Cottage (মাটির ঘর) -->
        <g transform="translate(180, 240)">
          <!-- Thatched straw roof with curved bamboo eves -->
          <path d="M20,90 Q120,40 220,90 L200,105 Q120,60 40,105 Z" fill="#ca8a04" stroke="#713f12" stroke-width="2" />
          <!-- Mud wall -->
          <rect x="40" y="100" width="160" height="90" fill="#92400e" stroke="#451a03" stroke-width="2" />
          <!-- Wooden window and door -->
          <rect x="65" y="120" width="30" height="35" rx="3" fill="#451a03" />
          <rect x="130" y="120" width="40" height="70" fill="#451a03" />
        </g>

        <!-- Kadam Flower (কদম ফুল) Branch in foreground -->
        <g transform="translate(620, 120)">
          <path d="M0,0 Q-40,60 -90,90" stroke="#364936" stroke-width="5" fill="none" />
          <!-- Ball of Kadam flower -->
          <circle cx="-90" cy="90" r="28" fill="#f59e0b" stroke="#b45309" stroke-width="2" />
          <!-- White spikes of kadam -->
          <g stroke="#fef3c7" stroke-width="2">
            <line x1="-90" y1="58" x2="-90" y2="122" />
            <line x1="-122" y1="90" x2="-58" y2="90" />
            <line x1="-112" y1="68" x2="-68" y2="112" />
            <line x1="-112" y1="112" x2="-68" y2="68" />
          </g>
          <!-- Raindrops on kadam -->
          <circle cx="-80" cy="115" r="3" fill="#38bdf8" opacity="0.8" />
        </g>

        <!-- Green fields and river reflection -->
        <path d="M0,420 Q200,380 400,430 T800,410 L800,600 L0,600 Z" fill="#1b2e1e" />
      </svg>`;

    case 'gramophone-music':
    default:
      return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <defs>
          <radialGradient id="gramoBg" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stop-color="#2d1c15" />
            <stop offset="60%" stop-color="#190e0b" />
            <stop offset="100%" stop-color="#0b0605" />
          </radialGradient>
          <linearGradient id="brassHorn" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="40%" stop-color="#d4af37" />
            <stop offset="70%" stop-color="#854d0e" />
            <stop offset="100%" stop-color="#451a03" />
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#gramoBg)" />

        <!-- Gramophone Player -->
        <g transform="translate(250, 150)">
          <!-- Polished wooden cabinet base -->
          <rect x="50" y="240" width="220" height="90" rx="8" fill="#451a03" stroke="#78350f" stroke-width="4" />
          <rect x="65" y="255" width="190" height="60" rx="4" fill="#2d1003" stroke="#9a3412" stroke-width="1.5" />
          <line x1="40" y1="330" x2="280" y2="330" stroke="#78350f" stroke-width="5" />

          <!-- Vinyl record turntable -->
          <ellipse cx="160" cy="235" rx="85" ry="25" fill="#09090b" stroke="#27272a" stroke-width="3" />
          <!-- Grooves on vinyl -->
          <ellipse cx="160" cy="235" rx="70" ry="20" fill="none" stroke="#27272a" stroke-width="1" />
          <ellipse cx="160" cy="235" rx="55" ry="15" fill="none" stroke="#27272a" stroke-width="1" />
          <!-- Center red label -->
          <ellipse cx="160" cy="235" rx="24" ry="7" fill="#dc2626" />
          
          <!-- Golden Fluted Brass Horn -->
          <path d="M190,200 Q260,180 320,80 Q240,-40 120,40 Q170,120 190,200 Z" fill="url(#brassHorn)" stroke="#ca8a04" stroke-width="2" />
          <ellipse cx="220" cy="60" rx="85" ry="75" fill="none" stroke="#fef08a" stroke-width="2" transform="rotate(35, 220, 60)" />

          <!-- Golden Tone Arm needle -->
          <path d="M80,210 Q110,215 130,230" fill="none" stroke="#eab308" stroke-width="3.5" />
        </g>

        <!-- Musical notes floating into the air -->
        <g fill="#d4af37" opacity="0.65">
          <text x="560" y="160" font-size="28" font-family="serif">♪</text>
          <text x="610" y="120" font-size="34" font-family="serif">♫</text>
          <text x="660" y="150" font-size="24" font-family="serif">♩</text>
          <text x="590" y="80" font-size="38" font-family="serif">♬</text>
        </g>
      </svg>`;
  }
}

/**
 * Converts SVG to a base64 Data URL for zero-latency <img> and canvas loading
 */
export function getArtworkDataUrl(type: string, accentColor?: string): string {
  const svg = getVintageArtworkSvg(type, accentColor);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
