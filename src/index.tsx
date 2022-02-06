import { MouseEvent, ReactPortal, useCallback, useState } from 'react';

import { Drawer, DrawerProps } from './Drawer';
import { usePreventScroll } from './usePreventScroll';
import { DrawerDefaults } from './Drawer.defaults';

interface DrawerOptions {
  /**
   * @property {'bottom' | 'left' | 'right' | 'top' | undefined} [anchor='bottom'] - Side from which the drawer will appear
   */
  anchor?: 'bottom' | 'left' | 'right' | 'top';
  /**
   * @property {number | undefined} [animationDuration=300] - Animation duration in milliseconds
   */
  animationDuration?: number;
  /**
   * @property {boolean | undefined} [preventScroll=true] - Handle to prevent scroll when drawer is open
   */
  preventScroll?: boolean;
  /**
   * @property {boolean | undefined} [closeOnOverlayClick=true] - Handle to close drawer on overlay click event
   */
  closeOnOverlayClick?: boolean;
  /**
   * @property {string | undefined} [rootId='root'] - Root dom node identifier to mount drawer component
   */
  rootId?: string;
}

type DrawerReturnProps = Omit<DrawerProps, 'children'>;

interface UseDrawer {
  /**
   * @property {(props: DrawerProps) => ReactPortal | null} DrawerWrapper - Drawer wrapper component
   */
  DrawerWrapper: (props: DrawerProps) => ReactPortal | null;
  /**
   * @property {Omit<DrawerProps, 'children'>} drawerProps - Drawer props
   * Drawer props needs to be exported and re-used at exported drawer wrapper to prevent react from creating a new hook on every rendering
   *
   * More info:
   *
   * https://dev.to/droopytersen/new-react-hooks-pattern-return-a-component-31bh
   *
   * https://www.reddit.com/r/reactjs/comments/9yq1l8/comment/ea3q7dt/?utm_source=share&utm_medium=web2x&context=3
   */
  drawerProps: DrawerReturnProps;
  /**
   * @property {() => void} openDrawer - Open drawer function
   */
  openDrawer: () => void;
  /**
   * @property {() => void} closeDrawer - Close drawer function
   */
  closeDrawer: () => void;
  /**
   * @property {boolean} open - Drawer open state indicator
   */
  open: boolean;
}

/**
 * Hook to inject a drawer component in provided root identifier
 * @param options - Drawer options
 * @returns {UseDrawer} - Drawer wrapper component, props and handler functions
 */
export function useDrawer(options?: DrawerOptions): UseDrawer {
  const {
    anchor = 'bottom',
    animationDuration = DrawerDefaults.ANIMATION_DURATION.FALLBACK,
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
      anchor,
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
