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
import {
  wrapperStyles,
  baseContainerStyles,
  overlayStyles,
} from './Drawer.styles';

export interface DrawerProps {
  anchor?: 'bottom' | 'left' | 'right' | 'top';
  animationDuration?: number;
  children: ReactNode;
  onClose?: () => void;
  onOpen?: () => void;
  onOverlayClick: MouseEventHandler<HTMLDivElement>;
  open?: boolean;
  rootId?: typeof DrawerDefaults.FALLBACK_ROOT_ID;
}

export function Drawer({
  anchor = 'bottom',
  animationDuration = DrawerDefaults.ANIMATION_DURATION.FALLBACK,
  children,
  onClose,
  onOpen,
  onOverlayClick,
  open = false,
  rootId = DrawerDefaults.FALLBACK_ROOT_ID,
}: DrawerProps): ReactPortal | null {
  const parsedAnimationStyles = useMemo<CSSProperties>(() => {
    const parsedAnimationDuration =
      animationDuration < DrawerDefaults.ANIMATION_DURATION.MIN
        ? DrawerDefaults.ANIMATION_DURATION.MIN
        : animationDuration;
    const animationDurationDelta = open
      ? parsedAnimationDuration - DrawerDefaults.ANIMATION_DURATION.DELAY
      : parsedAnimationDuration;
    const baseAnimationStyles: CSSProperties = {
      transition: `transform ${animationDurationDelta}ms ease-in-out`,
    };

    switch (anchor) {
      case 'bottom':
        return {
          ...baseAnimationStyles,
          bottom: '0px',
          left: '0px',
          maxHeight: DrawerDefaults.MAX_DRAWER_SIZE.VERTICAL,
          transform: `translateY(${open ? '0' : '100%'})`,
        };
      case 'left':
        return {
          ...baseAnimationStyles,
          top: '0px',
          left: '0px',
          maxWidth: DrawerDefaults.MAX_DRAWER_SIZE.HORIZONTAL,
          transform: `translateX(${open ? '0' : '-100%'})`,
        };
      case 'right':
        return {
          ...baseAnimationStyles,
          top: '0px',
          right: '0px',
          maxWidth: DrawerDefaults.MAX_DRAWER_SIZE.HORIZONTAL,
          transform: `translateX(${open ? '0' : '100%'})`,
        };
      case 'top':
        return {
          ...baseAnimationStyles,
          top: '0px',
          left: '0px',
          maxHeight: DrawerDefaults.MAX_DRAWER_SIZE.VERTICAL,
          transform: `translateY(${open ? '0' : '-100%'})`,
        };
      default:
        return { ...baseAnimationStyles };
    }
  }, [anchor, animationDuration, open]);

  const [show, setShow] = useState<boolean>(false);
  const [animationStyles, setAnimationStyles] = useState<CSSProperties>(
    parsedAnimationStyles,
  );

  const rootElement = useMemo<HTMLElement | null>(() => {
    return document.getElementById(rootId);
  }, [rootId]);

  const handleTransitionEnd = useCallback(() => {
    if (open) {
      if (onOpen) onOpen();
      return;
    }

    setShow(false);
    if (onClose) onClose();
  }, [onClose, onOpen, open]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined;

    if (!open) {
      setAnimationStyles(parsedAnimationStyles);

      return;
    }

    setShow(true);
    timeout = setTimeout(() => {
      setAnimationStyles(parsedAnimationStyles);
    }, DrawerDefaults.ANIMATION_DURATION.DELAY);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [open, parsedAnimationStyles]);

  if (!show) return null;
  if (!rootElement) return null;

  return createPortal(
    <div role="dialog" style={wrapperStyles}>
      <div onClick={onOverlayClick} style={overlayStyles} />
      <div
        style={{
          ...baseContainerStyles,
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
  anchor: 'bottom',
  animationDuration: DrawerDefaults.ANIMATION_DURATION.FALLBACK,
  open: false,
  rootId: DrawerDefaults.FALLBACK_ROOT_ID,
};
