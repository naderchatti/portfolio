// Geometry ported from portfolio-media/_build/canvas/Diagrams.dc.html — pins in physical silkscreen order.
import { DiagramSvg } from '../diagram-svg';

export function SpeakersBackSvg({ label }: { label: string }) {
  return (
    <DiagramSvg prefix="speakers-back" width={640} height={400} label={label}>
      {() => (
        <>
          <rect x="40" y="40" width="560" height="300" rx="10" className="bd"/>
          <rect x="40" y="300" width="96" height="64" rx="4" className="ft"/>
          <circle cx="88" cy="350" r="12" className="ft"/>
          <text x="88" y="384" className="ft-t" textAnchor="middle">3.5 mm jack</text>
          <circle cx="90" cy="70" r="4.5" className="pn"/>
          <text x="86" y="88" className="pl f" textAnchor="start" transform="rotate(90 86 88)">LROUT</text>
          <circle cx="130" cy="70" r="4.5" className="pn"/>
          <text x="126" y="88" className="pl f" textAnchor="start" transform="rotate(90 126 88)">AGND</text>
          <circle cx="170" cy="70" r="4.5" className="pn"/>
          <text x="166" y="88" className="pl f" textAnchor="start" transform="rotate(90 166 88)">ROUT</text>
          <circle cx="210" cy="70" r="4.5" className="pn"/>
          <text x="206" y="88" className="pl f" textAnchor="start" transform="rotate(90 206 88)">AGND</text>
          <circle cx="250" cy="70" r="4.5" className="pn"/>
          <text x="246" y="88" className="pl f" textAnchor="start" transform="rotate(90 246 88)">A3V3</text>
          <circle cx="290" cy="70" r="4.5" className="pn"/>
          <text x="286" y="88" className="pl f" textAnchor="start" transform="rotate(90 286 88)">FMT</text>
          <circle cx="330" cy="70" r="4.5" className="pn"/>
          <text x="326" y="88" className="pl f" textAnchor="start" transform="rotate(90 326 88)">XSMT</text>
          <circle cx="370" cy="70" r="4.5" className="pn"/>
          <text x="366" y="88" className="pl f" textAnchor="start" transform="rotate(90 366 88)">DEMP</text>
          <circle cx="410" cy="70" r="4.5" className="pn"/>
          <text x="406" y="88" className="pl f" textAnchor="start" transform="rotate(90 406 88)">FLT</text>
          <circle cx="570" cy="90" r="4.5" className="pu"/>
          <text x="552" y="94" className="pl b" textAnchor="end">SCK</text>
          <circle cx="570" cy="130" r="4.5" className="pu"/>
          <text x="552" y="134" className="pl b" textAnchor="end">BCK</text>
          <circle cx="570" cy="170" r="4.5" className="pu"/>
          <text x="552" y="174" className="pl b" textAnchor="end">DIN</text>
          <circle cx="570" cy="210" r="4.5" className="pu"/>
          <text x="552" y="214" className="pl b" textAnchor="end">LRCK</text>
          <circle cx="570" cy="250" r="4.5" className="pu"/>
          <text x="552" y="254" className="pl b" textAnchor="end">GND</text>
          <circle cx="570" cy="290" r="4.5" className="pu"/>
          <text x="552" y="294" className="pl b" textAnchor="end">VIN</text>
          <text x="170" y="250" className="ft-t" textAnchor="start">PCM5100</text>
          <text x="170" y="272" className="ft-t" textAnchor="start">PCM5101</text>
          <text x="170" y="294" className="ft-t" textAnchor="start">PCM5102</text>
          <rect x="362" y="172" width="76" height="36" rx="6" className="jb"/>
          <rect x="374" y="181" width="12" height="18" rx="2" className="pad"/>
          <rect x="394" y="181" width="12" height="18" rx="2" className="pad"/>
          <rect x="414" y="181" width="12" height="18" rx="2" className="pad"/>
          <rect x="395" y="183" width="30" height="14" rx="6" className="blob"/>
          <text x="380" y="166" className="pl f" textAnchor="middle">H</text>
          <text x="420" y="166" className="pl f" textAnchor="middle">L</text>
          <text x="400" y="224" className="pl b" textAnchor="middle">H2L · DEMP</text>
          <text x="400" y="238" className="pl" textAnchor="middle">= L (low)</text>
          <rect x="452" y="172" width="76" height="36" rx="6" className="jb"/>
          <rect x="464" y="181" width="12" height="18" rx="2" className="pad"/>
          <rect x="484" y="181" width="12" height="18" rx="2" className="pad"/>
          <rect x="504" y="181" width="12" height="18" rx="2" className="pad"/>
          <rect x="485" y="183" width="30" height="14" rx="6" className="blob"/>
          <text x="470" y="166" className="pl f" textAnchor="middle">H</text>
          <text x="510" y="166" className="pl f" textAnchor="middle">L</text>
          <text x="490" y="224" className="pl b" textAnchor="middle">H1L · FLT</text>
          <text x="490" y="238" className="pl" textAnchor="middle">= L (low)</text>
          <rect x="362" y="262" width="76" height="36" rx="6" className="jb"/>
          <rect x="374" y="271" width="12" height="18" rx="2" className="pad"/>
          <rect x="394" y="271" width="12" height="18" rx="2" className="pad"/>
          <rect x="414" y="271" width="12" height="18" rx="2" className="pad"/>
          <rect x="395" y="273" width="30" height="14" rx="6" className="blob"/>
          <text x="380" y="256" className="pl f" textAnchor="middle">H</text>
          <text x="420" y="256" className="pl f" textAnchor="middle">L</text>
          <text x="400" y="314" className="pl b" textAnchor="middle">H4L · FMT</text>
          <text x="400" y="328" className="pl" textAnchor="middle">= L (low)</text>
          <rect x="452" y="262" width="76" height="36" rx="6" className="ja"/>
          <rect x="464" y="271" width="12" height="18" rx="2" className="pad"/>
          <rect x="484" y="271" width="12" height="18" rx="2" className="pad"/>
          <rect x="504" y="271" width="12" height="18" rx="2" className="pad"/>
          <rect x="465" y="273" width="30" height="14" rx="6" className="blob a"/>
          <text x="470" y="256" className="pl f" textAnchor="middle">H</text>
          <text x="510" y="256" className="pl f" textAnchor="middle">L</text>
          <text x="490" y="314" className="pl b acc" textAnchor="middle">H3L · XSMT</text>
          <text x="490" y="328" className="pl acc" textAnchor="middle">= H (high)</text>
          <text x="320" y="32" className="bl" textAnchor="middle">GY-PCM5102 · BACK VIEW · header on the right</text>
          <text x="170" y="140" className="pl" textAnchor="start">left pad = H (high)</text>
          <text x="170" y="156" className="pl" textAnchor="start">right pad = L (low)</text>
          <text x="170" y="172" className="pl f" textAnchor="start">blob = centre + chosen pad</text>
        </>
      )}
    </DiagramSvg>
  );
}
