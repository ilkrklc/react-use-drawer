import React, {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  ReactPortal,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { DrawerDefaults } from './Drawer.defaults';
import { wrapperStyles, baseContainerStyles } from './Drawer.styles';

export interface DrawerProps {
  animationDuration?: number;
  children: ReactNode;
  open?: boolean;
  rootId?: typeof DrawerDefaults.FALLBACK_ROOT_ID;
  onOverlayClick: MouseEventHandler<HTMLDivElement>;
}

export function Drawer({
  animationDuration = DrawerDefaults.FALLBACK_ANIMATION_DURATION,
  children,
  open = false,
  rootId = DrawerDefaults.FALLBACK_ROOT_ID,
  onOverlayClick,
}: DrawerProps): ReactPortal | null {
  const [show, setShow] = useState<boolean>(false);
  const [animationStyles, setAnimationStyles] = useState<CSSProperties>({
    bottom: '-100%',
  });

  // get root element to create portal
  const rootElement = useMemo<HTMLElement | null>(() => {
    return document.getElementById(rootId);
  }, [rootId]);

  // handles transition end unmounting
  const handleTransitionEnd = useCallback(() => {
    if (open) return;

    setShow(false);
  }, [open]);

  // open prop change effect
  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined;

    if (!open) {
      setAnimationStyles({ transform: 'translateY(100%)' });

      return;
    }

    setShow(true);
    timeout = setTimeout(() => {
      setAnimationStyles({ transform: 'translateY(0)' });
    }, 25);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [open]);

  if (!show) return null;
  if (!rootElement) return null;

  return createPortal(
    <div role="dialog" style={wrapperStyles} onClick={onOverlayClick}>
      <div
        style={{
          ...baseContainerStyles,
          maxHeight: DrawerDefaults.MAX_DRAWER_SIZE.VERTICAL,
          bottom: '0px',
          transition: `transform ${animationDuration * 1000}ms ease-in-out`,
          ...animationStyles,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {children}
      </div>
    </div>,
    rootElement,
  );
}

Drawer.defaultProps = {
  animationDuration: DrawerDefaults.FALLBACK_ANIMATION_DURATION,
  open: false,
  rootId: DrawerDefaults.FALLBACK_ROOT_ID,
};
