import React, { FC, MouseEvent, useCallback, useState } from 'react';

import { Drawer } from './Drawer';
import { usePreventScroll } from './usePreventScroll';

interface DrawerOptions {
  animationDuration?: number;
  preventScroll?: boolean;
  closeOnOverlayClick?: boolean;
  rootId?: 'root' | string;
}

export function useDrawer(options?: DrawerOptions): {
  DrawerWrapper: FC<{ children: React.ReactNode }>;
  openDrawer: () => void;
  closeDrawer: () => void;
  open: boolean;
} {
  const {
    animationDuration = 0.3,
    closeOnOverlayClick = true,
    preventScroll = true,
    rootId = 'root',
  } = options || {};

  const [open, setOpen] = useState<boolean>(false);

  const { on, off } = usePreventScroll();

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);

    if (preventScroll) on();
  }, [on, preventScroll]);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);

    if (preventScroll) off();
  }, [off, preventScroll]);

  const handleOverlayClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (closeOnOverlayClick) handleDrawerClose();
    },
    [closeOnOverlayClick, handleDrawerClose],
  );

  const DrawerWrapper = useCallback(
    ({ children }) => {
      return (
        <Drawer
          animationDuration={animationDuration}
          open={open}
          rootId={rootId}
          onOverlayClick={handleOverlayClick}
        >
          {children}
        </Drawer>
      );
    },
    [animationDuration, handleOverlayClick, open, rootId],
  );

  return {
    DrawerWrapper,
    openDrawer: handleDrawerOpen,
    closeDrawer: handleDrawerClose,
    open,
  };
}
