/**
 * Drawer default values
 */
export abstract class DrawerDefaults {
  /**
   * Animation duration base values
   */
  static ANIMATION_DURATION = {
    /**
     * Delay amount of milliseconds for mount transition styling
     */
    DELAY: 25,
    /**
     * Fallback animation duration in milliseconds
     */
    FALLBACK: 300,
    /**
     * Maximum animation duration threshold in milliseconds
     */
    MAX: 3000,
    /**
     * Minimum animation duration threshold in milliseconds
     */
    MIN: 300,
  };

  /**
   * Base z-index value to layer drawer overlay and content
   */
  static BASE_Z_INDEX = 9999;

  /**
   * Fallback root dom node identifier | 'root' selected due to common usage of cra
   */
  static FALLBACK_ROOT_ID = 'root';

  /**
   * Maximum drawer size for both orientations
   */
  static MAX_DRAWER_SIZE = {
    /**
     * Maximum drawer size for horizontal orientation
     */
    HORIZONTAL: '30%',
    /**
     * Maximum drawer size for vertical orientation
     */
    VERTICAL: '20%',
  };
}
