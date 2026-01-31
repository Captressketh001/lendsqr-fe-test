import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { vi } from 'vitest';


expect.extend(matchers);

afterEach(() => {
  cleanup();
});


Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});


const createMockObjectStore = () => ({
  put: vi.fn(() => ({ onsuccess: null, onerror: null })),
  get: vi.fn(() => ({ onsuccess: null, onerror: null })),
  getAll: vi.fn(() => ({ onsuccess: null, onerror: null })),
  delete: vi.fn(() => ({ onsuccess: null, onerror: null })),
  clear: vi.fn(() => ({ onsuccess: null, onerror: null })),
  createIndex: vi.fn(),
});

const createMockTransaction = () => ({
  objectStore: vi.fn(() => createMockObjectStore()),
  oncomplete: null,
  onerror: null,
});

const createMockDB = () => ({
  transaction: vi.fn(() => createMockTransaction()),
  objectStoreNames: {
    contains: vi.fn(() => false),
  },
  createObjectStore: vi.fn(() => createMockObjectStore()),
  close: vi.fn(),
});

const mockIndexedDB = {
  open: vi.fn(() => {
    // eslint-disable-next-line
    const request: Record<string, any> = {
      onupgradeneeded: null,
      onsuccess: null,
      onerror: null,
      result: createMockDB(),
    };

    // Simulate successful open after current call stack
    setTimeout(() => {
      if (request.onupgradeneeded) {
        request.onupgradeneeded({ target: request });
      }
      if (request.onsuccess) {
        request.onsuccess({ target: request });
      }
    }, 0);

    return request;
  }),
  deleteDatabase: vi.fn(() => ({
    onsuccess: null,
    onerror: null,
    onblocked: null,
  })),
};


vi.stubGlobal('indexedDB', mockIndexedDB);


vi.stubGlobal(
  'ResizeObserver',
  vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
);


vi.stubGlobal(
  'IntersectionObserver',
  vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
);


Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: localStorageMock,
});