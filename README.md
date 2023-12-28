# useDrawer ![GitHub](https://img.shields.io/github/license/ilkrklc/react-use-drawer) ![npm version](https://img.shields.io/npm/v/react-use-drawer) ![npm](https://img.shields.io/npm/dw/react-use-drawer) ![npm bundle size](https://img.shields.io/bundlephobia/min/react-use-drawer)

## Description

`useDrawer` is a React Hook that allows for the dynamic and on-demand injection of Drawer components into your React application. This is particularly useful for applications that require flexible, context-dependent user interfaces. With this hook, you can easily manage the visibility and content of Drawer components based on application state, user interactions, or other custom conditions, enhancing the overall user experience and interface responsiveness of your application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Pull Request Guidelines](#pull-request-guidelines)
- [License](#license)

## Installation

To install `useDrawer` using npm, run the following command:

```bash
npm i react-use-drawer
```

## Usage

```javascript
import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import { useDrawer } from 'react-use-drawer';

const App = () => {
  const { DrawerWrapper, drawerProps, openDrawer, closeDrawer, open } =
    useDrawer({
      animationDuration: 500,
      positioning: { anchor: 'bottom' },
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

We welcome contributions to `useDrawer`! Please review [code of conduct](.github/CODE_OF_CONDUCT.md) and [contributing guide](.github/CONTRIBUTING.md) so that you can understand what actions will and will not be tolerated.

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

`useDrawer` is [MIT licensed](./LICENSE).
