import { useCallback, useRef } from 'react';

export function usePreventScroll(): {
  on: () => void;
  off: () => void;
} {
  const scrollBlockActive = useRef<boolean | null>(null);

  const handleScrollOn = useCallback(() => {
    if (!scrollBlockActive.current) return;

    if (typeof document === 'undefined') return;

    const { body, documentElement } = document;
    if (!body || !body.style) return;

    const scrollBarWidth = window.innerWidth - documentElement.clientWidth;
    const bodyPaddingRight =
      parseInt(
        window.getComputedStyle(body).getPropertyValue('padding-right'),
      ) || 0;

    documentElement.style.position = 'relative';
    documentElement.style.overflow = 'hidden';
    body.style.position = 'relative';
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

    scrollBlockActive.current = false;
  }, []);

  const handleScrollOff = useCallback(() => {
    if (scrollBlockActive.current) return;

    if (typeof document === 'undefined') return;

    const { body, documentElement } = document;
    if (!body || !body.style) return;

    documentElement.style.position = '';
    documentElement.style.overflow = '';
    body.style.position = '';
    body.style.overflow = '';
    body.style.paddingRight = '';

    scrollBlockActive.current = true;
  }, []);

  return {
    on: handleScrollOn,
    off: handleScrollOff,
  };
}
