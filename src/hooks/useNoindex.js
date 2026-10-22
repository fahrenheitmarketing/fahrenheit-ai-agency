import { useEffect } from 'react';

// Adds <meta name="robots" content="noindex"> while active; removes it on unmount.
export default function useNoindex(active = true) {
  useEffect(() => {
    if (!active) return undefined;
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'robots');
    meta.setAttribute('content', 'noindex');
    document.head.appendChild(meta);
    return () => meta.remove();
  }, [active]);
}