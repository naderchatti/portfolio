// Geometry ported from portfolio-media/_build/canvas/Diagrams.dc.html — pins in physical silkscreen order.
import { DiagramSvg } from '../diagram-svg';

export function SmartUsbKvmSvg({ label }: { label: string }) {
  return (
    <DiagramSvg prefix="smart-usb-kvm" width={980} height={380} label={label}>
      {(marker) => (
        <>
          <rect x="80" y="100" width="150" height="250" rx="10" className="bd"/>
          <rect x="135" y="84" width="40" height="30" rx="6" className="ft"/>
          <text x="155" y="130" className="ft-t" textAnchor="middle">USB-C</text>
          <rect x="130" y="220" width="50" height="50" rx="3" className="ft" transform="rotate(45 155 245)"/>
          <rect x="120" y="148" width="14" height="12" rx="3" className="ft"/>
          <rect x="176" y="148" width="14" height="12" rx="3" className="ft"/>
          <rect x="87" y="145" width="10" height="10" rx="2" className="pu"/>
          <text x="102" y="153" className="pl b" textAnchor="start">5V</text>
          <rect x="87" y="165" width="10" height="10" rx="2" className="pu"/>
          <text x="102" y="173" className="pl b" textAnchor="start">GND</text>
          <rect x="87" y="185" width="10" height="10" rx="2" className="pn"/>
          <text x="102" y="193" className="pl f" textAnchor="start">3V3</text>
          <rect x="87" y="205" width="10" height="10" rx="2" className="pu"/>
          <text x="102" y="213" className="pl b" textAnchor="start">GP1</text>
          <rect x="87" y="225" width="10" height="10" rx="2" className="pu"/>
          <text x="102" y="233" className="pl b" textAnchor="start">GP2</text>
          <rect x="87" y="245" width="10" height="10" rx="2" className="pn"/>
          <text x="102" y="253" className="pl f" textAnchor="start">GP3</text>
          <rect x="87" y="265" width="10" height="10" rx="2" className="pu"/>
          <text x="102" y="273" className="pl b" textAnchor="start">GP4</text>
          <rect x="87" y="285" width="10" height="10" rx="2" className="pn"/>
          <text x="102" y="293" className="pl f" textAnchor="start">GP5</text>
          <rect x="87" y="305" width="10" height="10" rx="2" className="pn"/>
          <text x="102" y="313" className="pl f" textAnchor="start">GP6</text>
          <rect x="213" y="145" width="10" height="10" rx="2" className="pn"/>
          <text x="208" y="153" className="pl f" textAnchor="end">TX 43</text>
          <rect x="213" y="165" width="10" height="10" rx="2" className="pn"/>
          <text x="208" y="173" className="pl f" textAnchor="end">RX 44</text>
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
          <rect x="580" y="140" width="320" height="190" rx="8" className="bd"/>
          <text x="740" y="320" className="bl" textAnchor="middle">UGREEN 30768 · PCB (simplified)</text>
          <text x="740" y="160" className="vn" textAnchor="middle">pad positions illustrative</text>
          <circle cx="620" cy="210" r="7" className="pu"/>
          <text x="620" y="236" className="pl b" textAnchor="middle">USB 5V</text>
          <circle cx="660" cy="210" r="7" className="pu"/>
          <text x="660" y="236" className="pl b" textAnchor="middle">GND</text>
          <circle cx="720" cy="210" r="7" className="pu"/>
          <text x="720" y="236" className="pl b" textAnchor="middle">LED 1</text>
          <circle cx="780" cy="210" r="7" className="pu"/>
          <text x="780" y="236" className="pl b" textAnchor="middle">LED 2</text>
          <circle cx="840" cy="210" r="7" className="pu"/>
          <text x="840" y="236" className="pl b" textAnchor="middle">select btn</text>
          <path d="M 92 270 L 28 270 L 28 24 L 840 24 L 840 203" className="halo"/>
          <path d="M 92 270 L 28 270 L 28 24 L 840 24 L 840 203" className="wa" markerEnd={marker('ah-a')}/>
          <path d="M 92 230 L 36 230 L 36 36 L 780 36 L 780 203" className="halo"/>
          <path d="M 92 230 L 36 230 L 36 36 L 780 36 L 780 203" className="ws" markerStart={marker('as-w')}/>
          <path d="M 92 210 L 44 210 L 44 48 L 720 48 L 720 203" className="halo"/>
          <path d="M 92 210 L 44 210 L 44 48 L 720 48 L 720 203" className="ws" markerStart={marker('as-w')}/>
          <path d="M 92 170 L 52 170 L 52 60 L 660 60 L 660 203" className="halo"/>
          <path d="M 92 170 L 52 170 L 52 60 L 660 60 L 660 203" className="wg"/>
          <path d="M 92 150 L 60 150 L 60 72 L 620 72 L 620 203" className="halo"/>
          <path d="M 92 150 L 60 150 L 60 72 L 620 72 L 620 203" className="ws"/>
        </>
      )}
    </DiagramSvg>
  );
}
