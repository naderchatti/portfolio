'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-6rem)] w-full flex flex-col items-center justify-end">
      <motion.div
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black text-muted-foreground/25">
          404
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mt-4">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
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
            <span className="ml-2">Go Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
