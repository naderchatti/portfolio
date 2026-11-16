// Geometry ported from portfolio-media/_build/canvas/Diagrams.dc.html — pins in physical silkscreen order.
import { DiagramSvg } from '../diagram-svg';

export function StandingDeskSvg({ label }: { label: string }) {
  return (
    <DiagramSvg prefix="standing-desk" width={980} height={380} label={label}>
      {(marker) => (
        <>
          <rect x="80" y="100" width="150" height="250" rx="10" className="bd"/>
          <rect x="135" y="84" width="40" height="30" rx="6" className="ft"/>
          <text x="155" y="130" className="ft-t" textAnchor="middle">USB-C</text>
          <rect x="130" y="220" width="50" height="50" rx="3" className="ft" transform="rotate(45 155 245)"/>
          <rect x="100" y="118" width="14" height="12" rx="3" className="ft"/>
          <rect x="196" y="118" width="14" height="12" rx="3" className="ft"/>
          <rect x="87" y="145" width="10" height="10" rx="2" className="pu"/>
          <text x="102" y="153" className="pl b" textAnchor="start">5V</text>
          <rect x="87" y="165" width="10" height="10" rx="2" className="pu"/>
          <text x="102" y="173" className="pl b" textAnchor="start">GND</text>
          <rect x="87" y="185" width="10" height="10" rx="2" className="pn"/>
          <text x="102" y="193" className="pl f" textAnchor="start">3V3</text>
          <rect x="87" y="205" width="10" height="10" rx="2" className="pn"/>
          <text x="102" y="213" className="pl f" textAnchor="start">GP1</text>
          <rect x="87" y="225" width="10" height="10" rx="2" className="pn"/>
          <text x="102" y="233" className="pl f" textAnchor="start">GP2</text>
          <rect x="87" y="245" width="10" height="10" rx="2" className="pn"/>
          <text x="102" y="253" className="pl f" textAnchor="start">GP3</text>
          <rect x="87" y="265" width="10" height="10" rx="2" className="pn"/>
          <text x="102" y="273" className="pl f" textAnchor="start">GP4</text>
          <rect x="87" y="285" width="10" height="10" rx="2" className="pn"/>
          <text x="102" y="293" className="pl f" textAnchor="start">GP5</text>
          <rect x="87" y="305" width="10" height="10" rx="2" className="pn"/>
          <text x="102" y="313" className="pl f" textAnchor="start">GP6</text>
          <rect x="213" y="145" width="10" height="10" rx="2" className="pu"/>
          <text x="208" y="153" className="pl b" textAnchor="end">TX 43</text>
          <rect x="213" y="165" width="10" height="10" rx="2" className="pu"/>
          <text x="208" y="173" className="pl b" textAnchor="end">RX 44</text>
          <rect x="213" y="185" width="10" height="10" rx="2" className="pn"/>
          <text x="208" y="193" className="pl f" textAnchor="end">GP13</text>
          <rect x="213" y="205" width="10" height="10" rx="2" className="pn"/>
          <text x="208" y="213" className="pl f" textAnchor="end">GP12</text>
          <rect x="213" y="225" width="10" height="10" rx="2" className="pn"/>
          <text x="208" y="233" className="pl f" textAnchor="end">GP11</text>
          <rect x="213" y="245" width="10" height="10" rx="2" className="pn"/>
          <text x="208" y="253" className="pl f" textAnchor="end">GP10</text>
          <rect x="213" y="265" width="10" height="10" rx="2" className="pn"/>
          <text x="208" y="273" className="pl f" textAnchor="end">GP9</text>
          <rect x="213" y="285" width="10" height="10" rx="2" className="pn"/>
          <text x="208" y="293" className="pl f" textAnchor="end">GP8</text>
          <rect x="213" y="305" width="10" height="10" rx="2" className="pn"/>
          <text x="208" y="313" className="pl f" textAnchor="end">GP7</text>
          <text x="155" y="372" className="bl" textAnchor="middle">ESP32-S3-Zero</text>
          <rect x="600" y="140" width="180" height="130" rx="6" className="bd"/>
          <rect x="670" y="262" width="40" height="16" rx="2" className="ft"/>
          <line x1="640" y1="165" x2="640" y2="205" className="ct f"/>
          <text x="640" y="222" className="pl f" textAnchor="middle">1</text>
          <text x="640" y="240" className="pl f" textAnchor="middle" />
          <line x1="660" y1="165" x2="660" y2="205" className="ct"/>
          <text x="660" y="222" className="pl b" textAnchor="middle">2</text>
          <text x="660" y="240" className="pl f" textAnchor="middle">GND</text>
          <line x1="680" y1="165" x2="680" y2="205" className="ct"/>
          <text x="680" y="222" className="pl b" textAnchor="middle">3</text>
          <text x="680" y="240" className="pl f" textAnchor="middle">TX</text>
          <line x1="700" y1="165" x2="700" y2="205" className="ct"/>
          <text x="700" y="222" className="pl b" textAnchor="middle">4</text>
          <text x="700" y="240" className="pl f" textAnchor="middle">5V</text>
          <line x1="720" y1="165" x2="720" y2="205" className="ct"/>
          <text x="720" y="222" className="pl b" textAnchor="middle">5</text>
          <text x="720" y="240" className="pl f" textAnchor="middle">RX</text>
          <line x1="740" y1="165" x2="740" y2="205" className="ct f"/>
          <text x="740" y="222" className="pl f" textAnchor="middle">6</text>
          <text x="740" y="240" className="pl f" textAnchor="middle" />
          <text x="690" y="300" className="bl" textAnchor="middle">Maidesite RJ12 · handset port</text>
          <text x="690" y="316" className="vn" textAnchor="middle">layout per vendor pinout</text>
          <path d="M 218 150 L 236 150 L 236 24 L 720 24 L 720 165" className="halo"/>
          <path d="M 218 150 L 236 150 L 236 24 L 720 24 L 720 165" className="wa" markerEnd={marker('ah-a')}/>
          <path d="M 92 150 L 56 150 L 56 36 L 700 36 L 700 165" className="halo"/>
          <path d="M 92 150 L 56 150 L 56 36 L 700 36 L 700 165" className="ws"/>
          <path d="M 218 170 L 248 170 L 248 48 L 680 48 L 680 165" className="halo"/>
          <path d="M 218 170 L 248 170 L 248 48 L 680 48 L 680 165" className="wa" markerStart={marker('as-a')}/>
          <path d="M 92 170 L 44 170 L 44 60 L 660 60 L 660 165" className="halo"/>
          <path d="M 92 170 L 44 170 L 44 60 L 660 60 L 660 165" className="wg"/>
        </>
      )}
    </DiagramSvg>
  );
}
