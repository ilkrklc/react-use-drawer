import { CSSProperties } from 'react';

import { DrawerDefaults } from './Drawer.defaults';

export const wrapperStyles: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: DrawerDefaults.DRAWER_Z_INDEX,
};

export const overlayStyles: CSSProperties = {
  height: '100%',
  width: '100%',
  zIndex: DrawerDefaults.DRAWER_Z_INDEX + 1,
  backgroundColor: 'transparent',
};

export const baseContainerStyles: CSSProperties = {
  position: 'fixed',
  boxSizing: 'border-box',
  backgroundColor: '#ffffff',
  overflowY: 'auto',
  height: '100%',
  width: '100%',
  boxShadow: '0px 10px 40px 0px rgb(0 0 0 / 80%)',
  zIndex: DrawerDefaults.DRAWER_Z_INDEX + 2,
  paddingTop: '1rem',
  paddingBottom: '1rem',
};
