import React, {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useInjectStyle } from 'use-inject-style';

interface DrawerProps {
  animationDuration?: number;
  children: ReactNode;
  open?: boolean;
  maxHeight?: number;
  rootId?: 'root' | string;
  onOverlayClick: MouseEventHandler<HTMLDivElement>;
}

const BASE_Z_INDEX = 9999;
const OPEN_ANIMATION_NAME = 'drawer-open-animation';
const CLOSE_ANIMATION_NAME = 'drawer-close-animation';

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

export function Drawer({
  animationDuration = 0.3,
  children,
  open = false,
  maxHeight = 350,
  rootId = 'root',
  onOverlayClick,
}: DrawerProps): JSX.Element | null {
  const { inject } = useInjectStyle('drawer-styles');

  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [animation, setAnimation] = useState<string | null>(null);
  const [closeAnimationFinished, setCloseAnimationFinished] = useState<
    boolean | null
  >(null);

  // animation change effect
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (!open) {
      if (!animationTimeoutRef.current) {
        timeout = setTimeout(() => {
          setCloseAnimationFinished(true);
        }, animationDuration * 1000);
        animationTimeoutRef.current = timeout;
      }

      setAnimation(`${CLOSE_ANIMATION_NAME} ${animationDuration}s forwards`);
    } else {
      setAnimation(`${OPEN_ANIMATION_NAME} ${animationDuration}s forwards`);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [animationDuration, open]);

  // inject animation styles
  useEffect(() => {
    inject(`
      @keyframes ${OPEN_ANIMATION_NAME} {
        0% { bottom: -${maxHeight}px; }
        100% { bottom: 0px; }
      }
    `);
    inject(`
      @keyframes ${CLOSE_ANIMATION_NAME} {
        0% { bottom: 0px; }
        100% { bottom: -${maxHeight}px; }
      }
    `);
  }, [inject, maxHeight]);

  // do not render if not open and nullify element after close animation finish
  if (!open && closeAnimationFinished) return null;

  // get root element to create portal
  const rootElement = document.getElementById(rootId);
  if (!rootElement) return null;

  return createPortal(
    <div role="dialog" style={wrapperStyles} onClick={onOverlayClick}>
      <div
        style={{
          ...baseContainerStyles,
          maxHeight: `${maxHeight}px`,
          bottom: `-${maxHeight}px`,
          ...(animation && { animation }),
        }}
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
