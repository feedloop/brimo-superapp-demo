import React from 'react';

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockResolvedValue(),
    isVisible: jest.fn().mockResolvedValue(false),
    useHideAnimation: jest.fn().mockReturnValue({
      container: {},
      logo: {source: 0},
      brand: {source: 0},
    }),
  };
});

jest.mock('@callstack/repack/client', () => ({
  Federated: {
    importModule: jest.fn((container, module) => {
      if (container === 'auth') {
        const authMock = require('../auth/mocks/federated');
        return Promise.resolve(authMock.default(module));
      }
      if (container === 'toptup') {
        const topupMock = require('../topup/mocks/federated');
        return Promise.resolve(topupMock.default(module));
      }

      if (container === 'shopping') {
        const shoppingMock = require('../booking/mocks/federated');
        return Promise.resolve(shoppingMock.default(module));
      }
      if (container === 'investasi') {
        switch (module) {
          case './App':
            return Promise.resolve({default: () => <></>});
          default:
            throw new Error(`NewsMock: unknown module: ${module}`);
        }
      }
      throw new Error('jest.setup.js: unknown container: ' + container);
    }),
  },
}));
