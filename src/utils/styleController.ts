// styleController.ts

import { ReactiveController, ReactiveElement } from 'lit';

export const stylesList = [
  { call: 'modernMac', name: 'Modern Mac', date: 1982 },
  { call: 'oneBit', name: 'One bit', date: 2023 },
];

export var currentStyle = 'modernMac';

export function setCurrentStyle(style: string): void {
  currentStyle = style;
}

export function changeStyle(direction: string): string {
  const styleIndex = stylesList.findIndex((style) => style.call === currentStyle);
  if (direction === 'next') {
    if (styleIndex < stylesList.length - 1) {
      currentStyle = stylesList[styleIndex + 1].call;
      return currentStyle;
    } else {
      currentStyle = stylesList[0].call;
      return currentStyle;
    }
  } else {
    if (styleIndex > 0) {
      currentStyle = stylesList[styleIndex - 1].call;
      return currentStyle;
    } else {
      currentStyle = stylesList[stylesList.length - 1].call;
      return currentStyle;
    }
  }
}

class GlobalStyleController implements ReactiveController {
  private host?: ReactiveElement;
  private _style = currentStyle;
  public elements: HTMLElement[] = [];
  private static instance: GlobalStyleController;

  constructor(host?: ReactiveElement) {
    if (host) {
      this.host = host;
      this.host.addController(this);
    }
  
    if (GlobalStyleController.instance) {
      return GlobalStyleController.instance;
    }
  
    GlobalStyleController.instance = this;
  }

  getDate() {
    const currentStyleObj = stylesList.find(style => style.call === this.style);
    return currentStyleObj ? currentStyleObj.date : '';
  }

  getName() {
    const currentStyleObj = stylesList.find(style => style.call === this.style);
    return currentStyleObj ? currentStyleObj.name : '';
  }

  hostConnected() {
    // Perform any setup needed when the host is connected
  }

  hostDisconnected() {
    // Perform any cleanup needed when the host is disconnected
  }

  hostUpdate() {
    // Perform any actions needed before the host's update
  }

  hostUpdated() {
    // Perform any actions needed after the host's update
  }

  get style() {
    return this._style;
  }

  set style(style: string) {
    if (style !== this._style) {
      this._style = style;
      this.host?.requestUpdate();
  
      // Dispatch the 'style-changed' event
      this.dispatchEvent();
    }
  }

  dispatchEvent() {
    const event = new CustomEvent('style-changed');
    this.elements.forEach((element: HTMLElement) => element.dispatchEvent(event));
  }

  changeStyle(direction: string) {
    setCurrentStyle(changeStyle(direction));
    this.style = currentStyle;
  }
}

export { GlobalStyleController };