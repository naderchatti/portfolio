'use client';

import React, { PropsWithChildren, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMobileDetect } from '@/lib/hooks/use-mobile-detect';

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: 'top' | 'middle' | 'bottom';
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;
const MOBILE_ICON_SIZE = 40;

const dockVariants = cva(
  'supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max gap-2 rounded-2xl border p-2 backdrop-blur-md'
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = 'bottom',
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(-999999); // Set to a value far outside
    const isMobile = useMobileDetect();

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            magnification: magnification,
            distance: distance,
            isMobile: isMobile,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => !isMobile && mouseX.set(e.pageX)}
        onMouseLeave={() => !isMobile && mouseX.set(-999999)}
        {...props}
        className={cn(dockVariants({ className }), {
          'items-start': direction === 'top',
          'items-center': direction === 'middle',
          'items-end': direction === 'bottom',
        })}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);

Dock.displayName = 'Dock';

export interface DockIconProps {
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
  isMobile?: boolean;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

const DockIcon = ({
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  isMobile,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform<number, number>(
    mouseX ?? useMotionValue(0),
    (val: number) => {
      if (isMobile || typeof window === 'undefined' || !ref.current) return 0;
      const bounds = ref.current.getBoundingClientRect();
      return val - bounds.x - bounds.width / 2;
    }
  );

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [MOBILE_ICON_SIZE, magnification, MOBILE_ICON_SIZE],
    {
      clamp: true, // Ensure the values stay within the specified range
    }
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  const commonProps = {
    ref,
    className: cn(
      'flex aspect-square cursor-pointer items-center justify-center rounded-full',
      className
    ),
    ...props,
  };

  if (isMobile) {
    return (
      <div {...commonProps} style={{ width: MOBILE_ICON_SIZE }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      {...commonProps}
      initial={{ width: MOBILE_ICON_SIZE }}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = 'DockIcon';

export { Dock, DockIcon, dockVariants };
