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
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]">
        <div ref={targetRef} className="flex flex-col space-y-8">
          {allWords.map((words, pIndex) => (
            <p
              key={pIndex}
              className="flex flex-wrap text-sm md:text-xl font-light text-black/20 dark:text-white/20"
            >
              {words.map((word, i) => {
                const wordIndex =
                  allWords
                    .slice(0, pIndex)
                    .reduce((acc, curr) => acc + curr.length, 0) + i;
                const start = wordIndex / totalWords;
                const end = start + 1 / totalWords;
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </p>
          ))}
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
  return (
    <span className="relative mx-1">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className="text-black dark:text-white"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
