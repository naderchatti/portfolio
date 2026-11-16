// Geometry ported from portfolio-media/_build/canvas/Diagrams.dc.html — pins in physical silkscreen order.
import { DiagramSvg } from '../diagram-svg';

export function VoiceSatelliteSvg({ label }: { label: string }) {
  return (
    <DiagramSvg prefix="voice-satellite" width={980} height={700} label={label}>
      {(marker) => (
        <>
          <rect x="100" y="40" width="200" height="580" rx="10" className="bd"/>
          <rect x="152" y="50" width="96" height="140" rx="4" className="ft"/>
          <text x="200" y="124" className="ft-t" textAnchor="middle">ESP32-S3</text>
          <text x="200" y="140" className="ft-t" textAnchor="middle">WROOM-1</text>
          <rect x="150" y="606" width="36" height="30" rx="6" className="ft"/>
          <rect x="214" y="606" width="36" height="30" rx="6" className="ft"/>
          <circle cx="116" cy="100" r="4.5" className="pu"/>
          <text x="126" y="103" className="pl b" textAnchor="start">3V3</text>
          <circle cx="116" cy="120" r="4.5" className="pn"/>
          <text x="126" y="123" className="pl f" textAnchor="start">3V3</text>
          <circle cx="116" cy="140" r="4.5" className="pn"/>
          <text x="126" y="143" className="pl f" textAnchor="start">RST</text>
          <circle cx="116" cy="160" r="4.5" className="pu"/>
          <text x="126" y="163" className="pl b" textAnchor="start">4</text>
          <circle cx="116" cy="180" r="4.5" className="pn"/>
          <text x="126" y="183" className="pl f" textAnchor="start">5</text>
          <circle cx="116" cy="200" r="4.5" className="pu"/>
          <text x="126" y="203" className="pl b" textAnchor="start">6</text>
          <circle cx="116" cy="220" r="4.5" className="pu"/>
          <text x="126" y="223" className="pl b" textAnchor="start">7</text>
          <circle cx="116" cy="240" r="4.5" className="pn"/>
          <text x="126" y="243" className="pl f" textAnchor="start">15</text>
          <circle cx="116" cy="260" r="4.5" className="pn"/>
          <text x="126" y="263" className="pl f" textAnchor="start">16</text>
          <circle cx="116" cy="280" r="4.5" className="pn"/>
          <text x="126" y="283" className="pl f" textAnchor="start">17</text>
          <circle cx="116" cy="300" r="4.5" className="pn"/>
          <text x="126" y="303" className="pl f" textAnchor="start">18</text>
          <circle cx="116" cy="320" r="4.5" className="pu"/>
          <text x="126" y="323" className="pl b" textAnchor="start">8</text>
          <circle cx="116" cy="340" r="4.5" className="pu"/>
          <text x="126" y="343" className="pl b" textAnchor="start">3</text>
          <circle cx="116" cy="360" r="4.5" className="pn"/>
          <text x="126" y="363" className="pl f" textAnchor="start">46</text>
          <circle cx="116" cy="380" r="4.5" className="pn"/>
          <text x="126" y="383" className="pl f" textAnchor="start">9</text>
          <circle cx="116" cy="400" r="4.5" className="pn"/>
          <text x="126" y="403" className="pl f" textAnchor="start">10</text>
          <circle cx="116" cy="420" r="4.5" className="pn"/>
          <text x="126" y="423" className="pl f" textAnchor="start">11</text>
          <circle cx="116" cy="440" r="4.5" className="pn"/>
          <text x="126" y="443" className="pl f" textAnchor="start">12</text>
          <circle cx="116" cy="460" r="4.5" className="pn"/>
          <text x="126" y="463" className="pl f" textAnchor="start">13</text>
          <circle cx="116" cy="480" r="4.5" className="pn"/>
          <text x="126" y="483" className="pl f" textAnchor="start">14</text>
          <circle cx="116" cy="500" r="4.5" className="pu"/>
          <text x="126" y="503" className="pl b" textAnchor="start">5V</text>
          <circle cx="116" cy="520" r="4.5" className="pu"/>
          <text x="126" y="523" className="pl b" textAnchor="start">GND</text>
          <circle cx="284" cy="100" r="4.5" className="pu"/>
          <text x="274" y="103" className="pl b" textAnchor="end">GND</text>
          <circle cx="284" cy="120" r="4.5" className="pn"/>
          <text x="274" y="123" className="pl f" textAnchor="end">TX</text>
          <circle cx="284" cy="140" r="4.5" className="pn"/>
          <text x="274" y="143" className="pl f" textAnchor="end">RX</text>
          <circle cx="284" cy="160" r="4.5" className="pn"/>
          <text x="274" y="163" className="pl f" textAnchor="end">1</text>
          <circle cx="284" cy="180" r="4.5" className="pu"/>
          <text x="274" y="183" className="pl b" textAnchor="end">2</text>
          <circle cx="284" cy="200" r="4.5" className="pn"/>
          <text x="274" y="203" className="pl f" textAnchor="end">42</text>
          <circle cx="284" cy="220" r="4.5" className="pn"/>
          <text x="274" y="223" className="pl f" textAnchor="end">41</text>
          <circle cx="284" cy="240" r="4.5" className="pn"/>
          <text x="274" y="243" className="pl f" textAnchor="end">40</text>
          <circle cx="284" cy="260" r="4.5" className="pn"/>
          <text x="274" y="263" className="pl f" textAnchor="end">39</text>
          <circle cx="284" cy="280" r="4.5" className="pn"/>
          <text x="274" y="283" className="pl f" textAnchor="end">38</text>
          <circle cx="284" cy="300" r="4.5" className="pn"/>
          <text x="274" y="303" className="pl f" textAnchor="end">37</text>
          <circle cx="284" cy="320" r="4.5" className="pn"/>
          <text x="274" y="323" className="pl f" textAnchor="end">36</text>
          <circle cx="284" cy="340" r="4.5" className="pn"/>
          <text x="274" y="343" className="pl f" textAnchor="end">35</text>
          <circle cx="284" cy="360" r="4.5" className="pn"/>
          <text x="274" y="363" className="pl f" textAnchor="end">0</text>
          <circle cx="284" cy="380" r="4.5" className="pn"/>
          <text x="274" y="383" className="pl f" textAnchor="end">45</text>
          <circle cx="284" cy="400" r="4.5" className="pn"/>
          <text x="274" y="403" className="pl f" textAnchor="end">48 · LED</text>
          <circle cx="284" cy="420" r="4.5" className="pn"/>
          <text x="274" y="423" className="pl f" textAnchor="end">47</text>
          <circle cx="284" cy="440" r="4.5" className="pn"/>
          <text x="274" y="443" className="pl f" textAnchor="end">21</text>
          <circle cx="284" cy="460" r="4.5" className="pn"/>
          <text x="274" y="463" className="pl f" textAnchor="end">20</text>
          <circle cx="284" cy="480" r="4.5" className="pn"/>
          <text x="274" y="483" className="pl f" textAnchor="end">19</text>
          <circle cx="284" cy="500" r="4.5" className="pn"/>
          <text x="274" y="503" className="pl f" textAnchor="end">GND</text>
          <circle cx="284" cy="520" r="4.5" className="pn"/>
          <text x="274" y="523" className="pl f" textAnchor="end">GND</text>
          <text x="200" y="588" className="bl" textAnchor="middle">ESP32-S3-DevKitC-1</text>
          <text x="200" y="602" className="ft-t" textAnchor="middle">N8R2 · USB-C ×2</text>
          <circle cx="640" cy="175" r="70" className="bd"/>
          <circle cx="640" cy="175" r="9" className="ft"/>
          <text x="640" y="265" className="bl" textAnchor="middle">INMP441</text>
          <text x="640" y="280" className="vn" textAnchor="middle">layout per vendor pinout</text>
          <circle cx="600" cy="150" r="4.5" className="pu"/>
          <text x="590" y="153" className="pl b" textAnchor="end">L/R</text>
          <circle cx="600" cy="175" r="4.5" className="pu"/>
          <text x="590" y="178" className="pl b" textAnchor="end">WS</text>
          <circle cx="600" cy="200" r="4.5" className="pu"/>
          <text x="590" y="203" className="pl b" textAnchor="end">SCK</text>
          <circle cx="680" cy="150" r="4.5" className="pu"/>
          <text x="690" y="153" className="pl b" textAnchor="start">SD</text>
          <circle cx="680" cy="175" r="4.5" className="pu"/>
          <text x="690" y="178" className="pl b" textAnchor="start">VDD</text>
          <circle cx="680" cy="200" r="4.5" className="pu"/>
          <text x="690" y="203" className="pl b" textAnchor="start">GND</text>
          <rect x="560" y="420" width="240" height="120" rx="8" className="bd"/>
          <text x="680" y="474" className="ft-t" textAnchor="middle">MAX98357A</text>
          <text x="680" y="490" className="vn" textAnchor="middle">layout per vendor pinout</text>
          <rect x="680" y="404" width="80" height="26" rx="3" className="ft"/>
          <text x="700" y="421" className="pl b" textAnchor="middle">+</text>
          <text x="740" y="421" className="pl b" textAnchor="middle">−</text>
          <circle cx="600" cy="526" r="4.5" className="pu"/>
          <text x="603" y="514" className="pl b" textAnchor="start" transform="rotate(-90 603 514)">LRC</text>
          <circle cx="620" cy="526" r="4.5" className="pu"/>
          <text x="623" y="514" className="pl b" textAnchor="start" transform="rotate(-90 623 514)">BCLK</text>
          <circle cx="640" cy="526" r="4.5" className="pu"/>
          <text x="643" y="514" className="pl b" textAnchor="start" transform="rotate(-90 643 514)">DIN</text>
          <circle cx="660" cy="526" r="4.5" className="pn"/>
          <text x="663" y="514" className="pl f" textAnchor="start" transform="rotate(-90 663 514)">GAIN</text>
          <circle cx="680" cy="526" r="4.5" className="pn"/>
          <text x="683" y="514" className="pl f" textAnchor="start" transform="rotate(-90 683 514)">SD</text>
          <circle cx="700" cy="526" r="4.5" className="pu"/>
          <text x="703" y="514" className="pl b" textAnchor="start" transform="rotate(-90 703 514)">GND</text>
          <circle cx="720" cy="526" r="4.5" className="pu"/>
          <text x="723" y="514" className="pl b" textAnchor="start" transform="rotate(-90 723 514)">VIN</text>
          <circle cx="900" cy="470" r="38" className="bd"/>
          <circle cx="900" cy="470" r="16" className="ft"/>
          <text x="900" y="530" className="bl" textAnchor="middle">3 W speaker</text>
          <path d="M 700 404 L 700 384 L 892 384 L 892 432" className="halo"/>
          <path d="M 700 404 L 700 384 L 892 384 L 892 432" className="ws"/>
          <path d="M 740 404 L 740 394 L 908 394 L 908 432" className="halo"/>
          <path d="M 740 404 L 740 394 L 908 394 L 908 432" className="ws"/>
          <path d="M 116 340 L 76 340 L 76 16 L 520 16 L 520 175 L 600 175" className="halo"/>
          <path d="M 116 340 L 76 340 L 76 16 L 520 16 L 520 175 L 600 175" className="ws" markerEnd={marker('ah-w')}/>
          <path d="M 284 180 L 480 180 L 480 200 L 600 200" className="halo"/>
          <path d="M 284 180 L 480 180 L 480 200 L 600 200" className="ws" markerEnd={marker('ah-w')}/>
          <path d="M 284 100 L 760 100 L 760 200 L 680 200" className="halo"/>
          <path d="M 284 100 L 760 100 L 760 200 L 680 200" className="wg"/>
          <path d="M 116 100 L 84 100 L 84 28 L 750 28 L 750 175 L 680 175" className="halo"/>
          <path d="M 116 100 L 84 100 L 84 28 L 750 28 L 750 175 L 680 175" className="ws"/>
          <path d="M 116 160 L 68 160 L 68 8 L 740 8 L 740 150 L 680 150" className="halo"/>
          <path d="M 116 160 L 68 160 L 68 8 L 740 8 L 740 150 L 680 150" className="wa" markerStart={marker('as-a')}/>
          <path d="M 600 150 L 600 128 L 720 128 L 720 200 L 688 200" className="halo"/>
          <path d="M 600 150 L 600 128 L 720 128 L 720 200 L 688 200" className="wg"/>
          <path d="M 116 200 L 60 200 L 60 640 L 600 640 L 600 526" className="halo"/>
          <path d="M 116 200 L 60 200 L 60 640 L 600 640 L 600 526" className="ws" markerEnd={marker('ah-w')}/>
          <path d="M 116 220 L 52 220 L 52 652 L 620 652 L 620 526" className="halo"/>
          <path d="M 116 220 L 52 220 L 52 652 L 620 652 L 620 526" className="ws" markerEnd={marker('ah-w')}/>
          <path d="M 116 320 L 44 320 L 44 664 L 640 664 L 640 526" className="halo"/>
          <path d="M 116 320 L 44 320 L 44 664 L 640 664 L 640 526" className="wa" markerEnd={marker('ah-a')}/>
          <path d="M 116 520 L 36 520 L 36 676 L 700 676 L 700 526" className="halo"/>
          <path d="M 116 520 L 36 520 L 36 676 L 700 676 L 700 526" className="wg"/>
          <path d="M 116 500 L 28 500 L 28 688 L 720 688 L 720 526" className="halo"/>
          <path d="M 116 500 L 28 500 L 28 688 L 720 688 L 720 526" className="ws"/>
        </>
      )}
    </DiagramSvg>
  );
}
