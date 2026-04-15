'use client';

import { useEffect } from 'react';
import { scrollToTopImmediate } from '@/lib/scroll-utils';

export function ScrollToTop() {
    useEffect(() => {
        scrollToTopImmediate();

        // Delayed scroll attempts to handle mobile browser address bar resizing and layout shifts
        const timeouts = [
            setTimeout(() => scrollToTopImmediate(), 10),
            setTimeout(() => scrollToTopImmediate(), 100),
            setTimeout(() => scrollToTopImmediate(), 300)
        ];

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return null;
}
