'use client';

import { useEffect } from 'react';

export function ScrollToTop() {
    useEffect(() => {
        // Immediate scroll attempt
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        // Delayed scroll attempts to handle mobile browser address bar resizing and layout shifts
        const timeouts = [
            setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 10),
            setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 100),
            setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 300)
        ];

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return null;
}
