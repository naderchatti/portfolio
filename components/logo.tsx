'use client';

import React, { useEffect, useRef } from 'react';
import { useMobileDetect } from '@/lib/hooks/use-mobile-detect';

export function Logo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const leftEyeRef = useRef<SVGPathElement>(null);
  const rightEyeRef = useRef<SVGPathElement>(null);
  const frameRef = useRef<number>();
  const isMobile = useMobileDetect();

  useEffect(() => {
    if (isMobile || typeof window === 'undefined') return;

    const svg = svgRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;
    if (!svg || !leftEye || !rightEye) return;

    const eyeMovementRange = 14;

    function calculateEyePosition(
      mouseX: number,
      mouseY: number,
      eye: SVGPathElement
    ) {
      const eyeRect = eye.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
      const distance = Math.min(
        1,
        Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY) / 150
      );

      const moveX = Math.cos(angle) * distance * eyeMovementRange;
      const moveY = Math.sin(angle) * distance * eyeMovementRange;

      return { moveX, moveY };
    }

    let isAnimating = false;

    function updateEyes(e: MouseEvent) {
      if (isAnimating) return;
      isAnimating = true;

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        if (!leftEye || !rightEye) return;

        const leftPos = calculateEyePosition(e.clientX, e.clientY, leftEye);
        const rightPos = calculateEyePosition(e.clientX, e.clientY, rightEye);

        leftEye.style.transition = 'transform 0.1s ease-out';
        rightEye.style.transition = 'transform 0.1s ease-out';
        leftEye.style.transform = `translate(${leftPos.moveX}px, ${leftPos.moveY}px)`;
        rightEye.style.transform = `translate(${rightPos.moveX}px, ${rightPos.moveY}px)`;

        isAnimating = false;
      });
    }

    window.addEventListener('mousemove', updateEyes, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateEyes);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isMobile]);

  return (
    <svg
      ref={svgRef}
      viewBox="50 30 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <circle cx="250" cy="230" r="190" fill="hsl(var(--logo-primary))" />
      <path
        fill="hsl(var(--logo-secondary))"
        d="M164.609,278.815C169.066,276.638 177.274,272.684 184.109,272.181C190.944,271.679 199.455,272.315 205.62,275.8C211.785,279.284 217.682,287.091 221.099,293.089C224.294,298.695 225.924,306.323 226.125,311.784C226.304,316.642 224.963,321.787 222.305,325.857C219.591,330.011 214.775,334.261 209.841,336.712C204.514,339.359 197.027,341.136 190.341,341.738C183.64,342.341 175.264,341.671 169.635,340.331C164.883,339.199 160.153,336.88 156.568,333.697C152.983,330.514 149.901,324.382 148.125,321.233C147.011,319.258 146.039,317.064 145.914,314.8C145.78,312.387 146.594,309.381 147.321,306.759C148.259,303.375 149.867,298.081 151.542,294.496C153.085,291.194 155.194,287.862 157.372,285.248C159.439,282.769 161.71,280.233 164.609,278.815Z"
      />
      <path
        ref={leftEyeRef}
        fill="hsl(var(--logo-primary))"
        className="transition-transform duration-100"
        d="M195.568,327.264C193.692,325.689 192.716,321.528 192.151,318.418C191.481,314.733 191.179,308.802 191.548,305.15C191.852,302.135 193.223,298.349 194.362,296.506C195.184,295.177 197.009,294.328 198.383,294.094C199.756,293.859 201.391,294.312 202.604,295.099C203.844,295.903 205.211,297.37 205.821,298.918C206.692,301.13 207.545,305.16 207.831,308.367C208.133,311.751 207.898,316.676 207.63,319.223C207.468,320.761 206.902,322.255 206.223,323.645C205.519,325.086 205.01,327.323 203.408,327.867C201.633,328.47 197.444,328.838 195.568,327.264Z"
      />
      <path
        fill="hsl(var(--logo-secondary))"
        d="M253.465,332.893C255.676,332.759 259.094,333.797 261.305,334.3C263.145,334.718 265.761,335.204 266.733,335.908C267.447,336.425 267.645,337.803 267.135,338.521C266.398,339.56 263.818,341.269 262.31,342.14C261.006,342.893 259.529,343.581 258.089,343.748C256.648,343.916 255.111,343.5 253.666,343.145C251.89,342.71 248.942,341.704 247.434,341.135C246.453,340.764 245.256,340.331 244.62,339.728C244.032,339.171 243.133,338.167 243.614,337.516C244.184,336.746 246.517,335.817 248.037,335.104C249.679,334.333 251.515,333.011 253.465,332.893Z"
      />
      <path
        fill="hsl(var(--logo-secondary))"
        d="M284.625,318.217C283.452,315.15 284.01,311.592 284.625,308.367C285.429,304.145 287.019,297.715 289.449,292.888C291.929,287.962 295.916,282.501 299.501,278.815C302.755,275.471 306.54,272.27 310.96,270.774C315.416,269.266 321.547,269.467 326.238,269.769C330.619,270.051 335.217,270.707 339.104,272.583C342.991,274.46 346.558,277.701 349.558,281.027C352.64,284.444 355.488,289.436 357.599,293.089C359.414,296.229 361.284,299.622 362.223,302.939C363.139,306.179 363.671,309.653 363.228,312.991C362.725,316.777 361.833,322.089 359.207,325.656C356.493,329.341 351.199,332.859 346.944,335.104C342.857,337.26 338.239,338.391 333.676,339.125C328.885,339.895 323.156,340.197 318.197,339.728C313.326,339.267 308.212,338.119 303.924,336.31C299.728,334.54 295.681,331.887 292.465,328.872C289.248,325.857 285.931,321.635 284.625,318.217Z"
      />
      <path
        ref={rightEyeRef}
        fill="hsl(var(--logo-primary))"
        className="transition-transform duration-100"
        d="M300.908,311.382C301.109,308.568 301.545,303.911 302.315,301.13C302.956,298.819 304.292,295.936 305.532,294.697C306.555,293.674 308.348,293.348 309.754,293.692C311.261,294.06 313.539,295.279 314.578,296.908C315.818,298.851 316.968,302.414 317.192,305.351C317.46,308.869 316.622,315.068 316.187,318.016C315.929,319.756 315.65,321.735 314.578,323.042C313.506,324.349 311.462,325.823 309.754,325.857C308.045,325.89 305.766,324.55 304.326,323.243C302.885,321.936 301.676,319.982 301.109,318.016C300.54,316.04 300.751,313.589 300.908,311.382Z"
      />
      <path
        fill="hsl(var(--logo-secondary))"
        d="M136.666,270.975C135.594,269.099 133.309,263.606 132.243,259.717C130.803,254.457 128.879,246.273 128.022,239.413C126.916,230.568 125.893,217.594 125.609,206.645C125.274,193.712 125.308,174.313 126.012,161.816C126.581,151.7 128.256,140.406 129.831,131.661C131.191,124.111 134.086,113.133 135.46,109.347C135.761,108.518 137.45,108.321 138.073,108.944C140.553,111.424 146.724,118.782 150.336,124.223C155.764,132.398 165.011,148.246 170.64,157.996C175.333,166.124 179.955,174.681 184.109,182.723C188.113,190.471 193.759,201.988 195.568,206.243C195.842,206.887 195.644,208.423 194.965,208.254C193.759,207.952 190.14,205.205 188.331,204.434C187.013,203.873 184.779,202.993 184.109,203.63C183.439,204.266 183.609,206.879 184.31,208.254C185.148,209.895 189.001,212.375 189.135,213.48C189.269,214.586 186.041,213.811 185.115,214.888C182.635,217.769 178.28,225.944 174.259,230.769C170.285,235.538 164.911,239.916 160.991,243.836C157.54,247.287 153.452,251.073 150.738,254.29C148.437,257.017 146.383,260.488 144.707,263.135C143.263,265.417 141.692,268.864 140.687,270.171C140.247,270.743 139.347,270.841 138.676,270.975C138.019,271.107 136.999,271.557 136.666,270.975Z"
      />
      <path
        fill="hsl(var(--logo-secondary))"
        d="M300.305,208.053C304.292,198.336 317.996,168.852 326.238,151.161C333.922,134.669 345.537,110.251 349.759,101.908C350.057,101.32 351.061,100.682 351.568,101.104C352.372,101.774 353.635,104.287 354.583,105.929C355.957,108.308 358.731,111.944 359.81,115.377C361.82,121.777 364.816,134.581 366.645,144.326C368.689,155.215 371.08,168.49 372.073,180.712C373.145,193.913 373.246,212.006 373.078,223.532C372.95,232.335 371.939,243.065 371.068,249.867C370.44,254.769 368.924,261.862 367.851,264.341C367.423,265.333 365.364,265.541 364.635,264.743C363.563,263.571 362.88,259.577 361.418,257.305C359.241,253.921 354.918,248.292 351.568,244.439C348.397,240.792 343.795,236.264 341.315,234.187C340.006,233.089 338.068,232.987 336.692,231.975C335.05,230.769 332.671,228.29 331.465,226.949C330.657,226.052 329.79,224.906 329.455,223.934C329.149,223.047 330.349,221.403 329.455,221.12C328.081,220.684 322.485,222.493 321.212,221.321C319.939,220.148 323.223,215.223 321.815,214.083C320.408,212.944 313.707,216.429 312.769,214.486C311.831,212.542 317.929,203.261 316.187,202.424C314.444,201.586 304.962,208.522 302.315,209.46C301.544,209.733 299.995,208.809 300.305,208.053Z"
      />
    </svg>
  );
}
