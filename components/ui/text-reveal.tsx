'use client';

import { FC, ReactNode, useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextRevealByWordProps {
  text: string | string[];
  className?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const paragraphs = Array.isArray(text) ? text : [text];
  const allWords = paragraphs.map((p) => p.split(' '));
  const totalWords = allWords.reduce((acc, curr) => acc + curr.length, 0);

  return (
    <div ref={targetRef} className={cn('relative z-0 h-[200vh]', className)}>
      <div className="sticky top-0 flex h-[50%] items-center bg-transparent px-4">
        <div className="mx-auto w-full lg:max-w-5xl">
          <div ref={targetRef} className="flex flex-col space-y-8">
            {allWords.map((words, pIndex) => (
              <p
                key={pIndex}
                className="flex flex-wrap items-baseline text-sm md:text-xl font-light text-foreground"
              >
                {words.map((word, i) => {
                  const wordIndex =
                    allWords
                      .slice(0, pIndex)
                      .reduce((acc, curr) => acc + curr.length, 0) + i;
                  const start = wordIndex / totalWords;
                  const end = start + 1 / totalWords;
                  return (
                    <Word
                      key={i}
                      progress={scrollYProgress}
                      range={[start, end]}
                    >
                      {word}
                    </Word>
                  );
                })}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const text = children as string;
  const hasComma = text.includes(',');
  const isBold = text === 'Nader' || text === 'Chatti' || text === 'Chatti,';

  if (hasComma && isBold) {
    const [word, comma] = [text.slice(0, -1), text.slice(-1)];
    return (
      <span className="relative mx-1 inline-flex items-baseline">
        <span className="absolute inset-0 flex items-baseline">
          <span className="opacity-30">
            <span className="font-bold text-base md:text-2xl">{word}</span>
            {comma}
          </span>
        </span>
        <motion.span style={{ opacity: opacity }} className="text-primary">
          <span className="font-bold text-base md:text-2xl">{word}</span>
          {comma}
        </motion.span>
      </span>
    );
  }

  return (
    <span className="relative mx-1 inline-flex items-baseline">
      <span className="absolute inset-0 flex items-baseline">
        <span className="opacity-30">
          <span className={cn(isBold && 'font-bold text-base md:text-2xl')}>
            {children}
          </span>
        </span>
      </span>
      <motion.span style={{ opacity: opacity }} className="text-primary">
        <span className={cn(isBold && 'font-bold text-base md:text-2xl')}>
          {children}
        </span>
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
