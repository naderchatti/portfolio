'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getDictionary } from '@/lib/getDictionary';
import { ValidLocale } from '@/lib/i18n';
import { use } from 'react';

export default function NotFound({
  params,
}: {
  params: Promise<{ lang: ValidLocale }>;
}) {
  const resolvedParams = use(params);
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    getDictionary(resolvedParams.lang).then(setDict);
  }, [resolvedParams.lang]);

  if (!dict) return null;

  return (
    <div className="h-[calc(100vh-6rem)] w-full flex flex-col items-center justify-center">
      <motion.div
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black text-muted-foreground/25">
          {dict.notFound.title}
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mt-4">
            {dict.notFound.heading}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {dict.notFound.description}
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: -4 }}
              transition={{ duration: 0.2 }}
            >
              ←
            </motion.span>
            <span className="ml-2">{dict.notFound.goHome}</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
