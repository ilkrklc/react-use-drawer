# useDrawer

A react hook to inject drawer component on demand.

## Usage

```javascript
import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import { useDrawer } from 'react-use-drawer';

const App = () => {
  const { DrawerWrapper, drawerProps, openDrawer, closeDrawer, open } =
    useDrawer({
      animationDuration: 500,
      anchor: 'bottom',
      onOpen: () => console.log('OPEN'),
      onClose: () => console.log('CLOSE'),
    });

  return (
    <div className="App">
      <div>Drawer - {open}</div>
      <br />
      <button type="button" onClick={openDrawer}>
        Open Drawer
      </button>
      <button type="button" onClick={closeDrawer}>
        Close Drawer
      </button>
      <DrawerWrapper {...drawerProps}>Drawer Content</DrawerWrapper>
    </div>
  );
};
render(<App />, document.getElementById('root'));
```

## Contributing

Please review [code of conduct](.github/CODE_OF_CONDUCT.md) and [contributing guide](.github/CONTRIBUTING.md) so that you can understand what actions will and will not be tolerated.

### Pull Request Guidelines

- The `main` branch is just a snapshot of the latest stable release. All development should be done in development branches. **Do not submit PRs against the `main` branch.**
- Work in the `src` folder and **DO NOT** check-in `dist` in the commits.
- It's OK to have multiple small commits as you work on the PR
- If adding a new feature add accompanying test case.
- If fixing bug,
  - Add accompanying test case if applicable.
  - Provide a detailed description of the bug in the PR.
  - If you are resolving an opened issue add issue number in your PR title.

## License

Divisor is [MIT licensed](./LICENSE).
