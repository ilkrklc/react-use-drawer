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

const BASE_Z_INDEX = 9999;

const wrapperStyles: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: BASE_Z_INDEX,
  backgroundColor: 'transparent',
};

const baseContainerStyles: CSSProperties = {
  position: 'fixed',
  boxSizing: 'border-box',
  backgroundColor: '#ffffff',
  overflowY: 'auto',
  height: '100%',
  width: '100%',
  boxShadow: '0px 10px 40px 0px rgb(0 0 0 / 80%)',
  zIndex: BASE_Z_INDEX + 1,
  paddingTop: '1rem',
  paddingBottom: '1rem',
};

export interface DrawerProps {
  animationDuration?: number;
  children: ReactNode;
  open?: boolean;
  maxHeight?: number;
  rootId?: 'root' | string;
  onOverlayClick: MouseEventHandler<HTMLDivElement>;
}

export function Drawer({
  animationDuration = 0.3,
  children,
  open = false,
  maxHeight = 350,
  rootId = 'root',
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
          maxHeight: `${maxHeight}px`,
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
  animationDuration: 0.3,
  open: false,
  rootId: 'root',
  maxHeight: 350,
};
