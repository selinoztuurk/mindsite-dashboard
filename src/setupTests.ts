import '@testing-library/jest-dom';
import './i18n';

class ResizeObserverStub implements ResizeObserver {
  private readonly callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    const { width, height } = target.getBoundingClientRect();
    const contentRect = {
      width: width > 0 ? width : 800,
      height: height > 0 ? height : 280,
      top: 0,
      left: 0,
      bottom: height > 0 ? height : 280,
      right: width > 0 ? width : 800,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    };

    this.callback(
      [{ target, contentRect } as ResizeObserverEntry],
      this
    );
  }

  unobserve() {
    return undefined;
  }

  disconnect() {
    return undefined;
  }
}

globalThis.ResizeObserver = ResizeObserverStub;
