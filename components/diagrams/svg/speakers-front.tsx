// Geometry ported from portfolio-media/_build/canvas/Diagrams.dc.html — pins in physical silkscreen order.
import { DiagramSvg } from '../diagram-svg';

export function SpeakersFrontSvg({ label }: { label: string }) {
  return (
    <DiagramSvg prefix="speakers-front" width={980} height={480} label={label}>
      {(marker) => (
        <>
          <rect x="40" y="200" width="480" height="220" rx="10" className="bd"/>
          <rect x="22" y="288" width="40" height="44" rx="8" className="ft"/>
          <text x="66" y="314" className="ft-t" textAnchor="start">USB-C</text>
          <rect x="70" y="262" width="18" height="14" rx="3" className="ft"/>
          <rect x="70" y="344" width="18" height="14" rx="3" className="ft"/>
          <rect x="320" y="258" width="190" height="104" rx="4" className="ft"/>
          <line x1="470" y1="258" x2="470" y2="362" className="ft-d"/>
          <text x="395" y="306" className="ft-t" textAnchor="middle">ESP32-WROVER</text>
          <text x="395" y="322" className="ft-t" textAnchor="middle">module</text>
          <text x="490" y="314" className="ft-t" textAnchor="middle">ant.</text>
          <circle cx="82" cy="214" r="4.5" className="pu"/>
          <text x="85" y="226" className="pl b" textAnchor="end" transform="rotate(-90 85 226)">5V</text>
          <circle cx="102" cy="214" r="4.5" className="pn"/>
          <text x="105" y="226" className="pl f" textAnchor="end" transform="rotate(-90 105 226)">CMD</text>
          <circle cx="122" cy="214" r="4.5" className="pn"/>
          <text x="125" y="226" className="pl f" textAnchor="end" transform="rotate(-90 125 226)">D3</text>
          <circle cx="142" cy="214" r="4.5" className="pn"/>
          <text x="145" y="226" className="pl f" textAnchor="end" transform="rotate(-90 145 226)">D2</text>
          <circle cx="162" cy="214" r="4.5" className="pn"/>
          <text x="165" y="226" className="pl f" textAnchor="end" transform="rotate(-90 165 226)">13</text>
          <circle cx="182" cy="214" r="4.5" className="pu"/>
          <text x="185" y="226" className="pl b" textAnchor="end" transform="rotate(-90 185 226)">GND</text>
          <circle cx="202" cy="214" r="4.5" className="pn"/>
          <text x="205" y="226" className="pl f" textAnchor="end" transform="rotate(-90 205 226)">12</text>
          <circle cx="222" cy="214" r="4.5" className="pn"/>
          <text x="225" y="226" className="pl f" textAnchor="end" transform="rotate(-90 225 226)">14</text>
          <circle cx="242" cy="214" r="4.5" className="pn"/>
          <text x="245" y="226" className="pl f" textAnchor="end" transform="rotate(-90 245 226)">27</text>
          <circle cx="262" cy="214" r="4.5" className="pu"/>
          <text x="265" y="226" className="pl b" textAnchor="end" transform="rotate(-90 265 226)">26</text>
          <circle cx="282" cy="214" r="4.5" className="pu"/>
          <text x="285" y="226" className="pl b" textAnchor="end" transform="rotate(-90 285 226)">25</text>
          <circle cx="302" cy="214" r="4.5" className="pn"/>
          <text x="305" y="226" className="pl f" textAnchor="end" transform="rotate(-90 305 226)">33</text>
          <circle cx="322" cy="214" r="4.5" className="pn"/>
          <text x="325" y="226" className="pl f" textAnchor="end" transform="rotate(-90 325 226)">32</text>
          <circle cx="342" cy="214" r="4.5" className="pn"/>
          <text x="345" y="226" className="pl f" textAnchor="end" transform="rotate(-90 345 226)">35</text>
          <circle cx="362" cy="214" r="4.5" className="pn"/>
          <text x="365" y="226" className="pl f" textAnchor="end" transform="rotate(-90 365 226)">34</text>
          <circle cx="382" cy="214" r="4.5" className="pn"/>
          <text x="385" y="226" className="pl f" textAnchor="end" transform="rotate(-90 385 226)">VN</text>
          <circle cx="402" cy="214" r="4.5" className="pn"/>
          <text x="405" y="226" className="pl f" textAnchor="end" transform="rotate(-90 405 226)">VP</text>
          <circle cx="422" cy="214" r="4.5" className="pn"/>
          <text x="425" y="226" className="pl f" textAnchor="end" transform="rotate(-90 425 226)">EN</text>
          <circle cx="442" cy="214" r="4.5" className="pn"/>
          <text x="445" y="226" className="pl f" textAnchor="end" transform="rotate(-90 445 226)">3V3</text>
          <circle cx="82" cy="406" r="4.5" className="pn"/>
          <text x="85" y="394" className="pl f" textAnchor="start" transform="rotate(-90 85 394)">CLK</text>
          <circle cx="102" cy="406" r="4.5" className="pn"/>
          <text x="105" y="394" className="pl f" textAnchor="start" transform="rotate(-90 105 394)">D0</text>
          <circle cx="122" cy="406" r="4.5" className="pn"/>
          <text x="125" y="394" className="pl f" textAnchor="start" transform="rotate(-90 125 394)">D1</text>
          <circle cx="142" cy="406" r="4.5" className="pn"/>
          <text x="145" y="394" className="pl f" textAnchor="start" transform="rotate(-90 145 394)">15</text>
          <circle cx="162" cy="406" r="4.5" className="pn"/>
          <text x="165" y="394" className="pl f" textAnchor="start" transform="rotate(-90 165 394)">2</text>
          <circle cx="182" cy="406" r="4.5" className="pn"/>
          <text x="185" y="394" className="pl f" textAnchor="start" transform="rotate(-90 185 394)">0</text>
          <circle cx="202" cy="406" r="4.5" className="pn"/>
          <text x="205" y="394" className="pl f" textAnchor="start" transform="rotate(-90 205 394)">4</text>
          <circle cx="222" cy="406" r="4.5" className="pn"/>
          <text x="225" y="394" className="pl f" textAnchor="start" transform="rotate(-90 225 394)">16</text>
          <circle cx="242" cy="406" r="4.5" className="pn"/>
          <text x="245" y="394" className="pl f" textAnchor="start" transform="rotate(-90 245 394)">17</text>
          <circle cx="262" cy="406" r="4.5" className="pn"/>
          <text x="265" y="394" className="pl f" textAnchor="start" transform="rotate(-90 265 394)">5</text>
          <circle cx="282" cy="406" r="4.5" className="pn"/>
          <text x="285" y="394" className="pl f" textAnchor="start" transform="rotate(-90 285 394)">18</text>
          <circle cx="302" cy="406" r="4.5" className="pn"/>
          <text x="305" y="394" className="pl f" textAnchor="start" transform="rotate(-90 305 394)">19</text>
          <circle cx="322" cy="406" r="4.5" className="pn"/>
          <text x="325" y="394" className="pl f" textAnchor="start" transform="rotate(-90 325 394)">GND</text>
          <circle cx="342" cy="406" r="4.5" className="pn"/>
          <text x="345" y="394" className="pl f" textAnchor="start" transform="rotate(-90 345 394)">21</text>
          <circle cx="362" cy="406" r="4.5" className="pn"/>
          <text x="365" y="394" className="pl f" textAnchor="start" transform="rotate(-90 365 394)">RX</text>
          <circle cx="382" cy="406" r="4.5" className="pn"/>
          <text x="385" y="394" className="pl f" textAnchor="start" transform="rotate(-90 385 394)">TX</text>
          <circle cx="402" cy="406" r="4.5" className="pu"/>
          <text x="405" y="394" className="pl b" textAnchor="start" transform="rotate(-90 405 394)">22</text>
          <circle cx="422" cy="406" r="4.5" className="pn"/>
          <text x="425" y="394" className="pl f" textAnchor="start" transform="rotate(-90 425 394)">23</text>
          <circle cx="442" cy="406" r="4.5" className="pn"/>
          <text x="445" y="394" className="pl f" textAnchor="start" transform="rotate(-90 445 394)">GND</text>
          <text x="280" y="440" className="bl" textAnchor="middle">ESP32-WROVER DevKitC (clone)</text>
          <rect x="700" y="60" width="200" height="300" rx="8" className="bd"/>
          <rect x="790" y="34" width="80" height="58" rx="4" className="ft"/>
          <circle cx="830" cy="63" r="12" className="ft"/>
          <text x="830" y="104" className="ft-t" textAnchor="middle">LINE OUT 3.5 mm</text>
          <rect x="770" y="170" width="80" height="60" rx="3" className="ft"/>
          <text x="810" y="204" className="ft-t" textAnchor="middle">PCM5102A</text>
          <circle cx="716" cy="100" r="4.5" className="pn"/>
          <text x="728" y="103" className="pl" textAnchor="start">L</text>
          <text x="742" y="103" className="pl f" textAnchor="start">LROUT</text>
          <circle cx="716" cy="120" r="4.5" className="pn"/>
          <text x="728" y="123" className="pl" textAnchor="start">G</text>
          <text x="742" y="123" className="pl f" textAnchor="start">AGND</text>
          <circle cx="716" cy="140" r="4.5" className="pn"/>
          <text x="728" y="143" className="pl" textAnchor="start">R</text>
          <text x="742" y="143" className="pl f" textAnchor="start">ROUT</text>
          <circle cx="716" cy="160" r="4.5" className="pn"/>
          <text x="728" y="163" className="pl" textAnchor="start">G</text>
          <text x="742" y="163" className="pl f" textAnchor="start">AGND</text>
          <circle cx="716" cy="180" r="4.5" className="pn"/>
          <text x="728" y="183" className="pl" textAnchor="start">·</text>
          <text x="742" y="183" className="pl f" textAnchor="start">A3V3</text>
          <circle cx="716" cy="200" r="4.5" className="pn"/>
          <text x="728" y="203" className="pl" textAnchor="start">4</text>
          <text x="742" y="203" className="pl f" textAnchor="start">FMT</text>
          <circle cx="716" cy="220" r="4.5" className="pn"/>
          <text x="728" y="223" className="pl" textAnchor="start">3</text>
          <text x="742" y="223" className="pl f" textAnchor="start">XSMT</text>
          <circle cx="716" cy="240" r="4.5" className="pn"/>
          <text x="728" y="243" className="pl" textAnchor="start">2</text>
          <text x="742" y="243" className="pl f" textAnchor="start">DEMP</text>
          <circle cx="716" cy="260" r="4.5" className="pn"/>
          <text x="728" y="263" className="pl" textAnchor="start">1</text>
          <text x="742" y="263" className="pl f" textAnchor="start">FLT</text>
          <circle cx="740" cy="344" r="4.5" className="pu"/>
          <text x="743" y="334" className="pl b" textAnchor="start" transform="rotate(-90 743 334)">SCK</text>
          <circle cx="760" cy="344" r="4.5" className="pu"/>
          <text x="763" y="334" className="pl b" textAnchor="start" transform="rotate(-90 763 334)">BCK</text>
          <circle cx="780" cy="344" r="4.5" className="pu"/>
          <text x="783" y="334" className="pl b" textAnchor="start" transform="rotate(-90 783 334)">DIN</text>
          <circle cx="800" cy="344" r="4.5" className="pu"/>
          <text x="803" y="334" className="pl b" textAnchor="start" transform="rotate(-90 803 334)">LCK</text>
          <circle cx="820" cy="344" r="4.5" className="pu"/>
          <text x="823" y="334" className="pl b" textAnchor="start" transform="rotate(-90 823 334)">GND</text>
          <circle cx="840" cy="344" r="4.5" className="pu"/>
          <text x="843" y="334" className="pl b" textAnchor="start" transform="rotate(-90 843 334)">VIN</text>
          <text x="800" y="380" className="bl" textAnchor="middle">GY-PCM5102</text>
          <text x="600" y="24" className="wl" textAnchor="start">LINE OUT → Mackie CR3 · RCA in</text>
          <path d="M 82 214 L 82 188 L 620 188 L 620 440 L 840 440 L 840 344" className="halo"/>
          <path d="M 82 214 L 82 188 L 620 188 L 620 440 L 840 440 L 840 344" className="ws"/>
          <path d="M 182 214 L 182 176 L 635 176 L 635 428 L 820 428 L 820 344" className="halo"/>
          <path d="M 182 214 L 182 176 L 635 176 L 635 428 L 820 428 L 820 344" className="wg"/>
          <path d="M 262 214 L 262 152 L 680 152 L 680 392 L 760 392 L 760 344" className="halo"/>
          <path d="M 262 214 L 262 152 L 680 152 L 680 392 L 760 392 L 760 344" className="ws" markerEnd={marker('ah-w')}/>
          <path d="M 282 214 L 282 164 L 650 164 L 650 416 L 800 416 L 800 344" className="halo"/>
          <path d="M 282 214 L 282 164 L 650 164 L 650 416 L 800 416 L 800 344" className="ws" markerEnd={marker('ah-w')}/>
          <path d="M 402 406 L 402 456 L 665 456 L 665 404 L 780 404 L 780 344" className="halo"/>
          <path d="M 402 406 L 402 456 L 665 456 L 665 404 L 780 404 L 780 344" className="wa" markerEnd={marker('ah-a')}/>
          <path d="M 740 344 L 740 366 L 820 366 L 820 352" className="halo"/>
          <path d="M 740 344 L 740 366 L 820 366 L 820 352" className="wg"/>
        </>
      )}
    </DiagramSvg>
  );
}
