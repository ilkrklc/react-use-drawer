import { MouseEvent, ReactPortal, useCallback, useState } from 'react';

import { Drawer, DrawerProps } from './Drawer';
import { usePreventScroll } from './usePreventScroll';
import { DrawerDefaults } from './Drawer.defaults';

interface DrawerOptions {
  animationDuration?: number;
  preventScroll?: boolean;
  closeOnOverlayClick?: boolean;
  rootId?: typeof DrawerDefaults.FALLBACK_ROOT_ID;
}

export function useDrawer(options?: DrawerOptions): {
  DrawerWrapper: (props: DrawerProps) => ReactPortal | null;
  drawerProps: Omit<DrawerProps, 'children'>;
  openDrawer: () => void;
  closeDrawer: () => void;
  open: boolean;
} {
  const {
    animationDuration = DrawerDefaults.FALLBACK_ANIMATION_DURATION,
    closeOnOverlayClick = true,
    preventScroll = true,
    rootId = DrawerDefaults.FALLBACK_ROOT_ID,
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

  return {
    DrawerWrapper: Drawer,
    drawerProps: {
      animationDuration,
      open,
      rootId,
      onOverlayClick: handleOverlayClick,
    },
    openDrawer: handleDrawerOpen,
    closeDrawer: handleDrawerClose,
    open,
  };
}
