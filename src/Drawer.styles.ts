import { CSSProperties } from 'react';

import { DrawerDefaults } from './Drawer.defaults';

export const wrapperStyles: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: DrawerDefaults.BASE_Z_INDEX,
};

export const overlayStyles: CSSProperties = {
  height: '100%',
  width: '100%',
  zIndex: DrawerDefaults.BASE_Z_INDEX + 1,
  backgroundColor: 'transparent',
};

export const baseContainerStyles: CSSProperties = {
  position: 'fixed',
  overflowY: 'auto',
  height: '100%',
  width: '100%',
  zIndex: DrawerDefaults.BASE_Z_INDEX + 2,
};
