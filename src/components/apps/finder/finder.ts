// Finder.ts
import { html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';

import { basic, styles } from './styles';
import { StyledElement } from '../../../utils/globalStyledElement';
import { arrangeItemsInGrid } from '../../../utils/arrangeItemsGrid.ts';

import type { FileItem } from '../../global/file/file.ts';

@customElement('finder-component')
export class Finder extends StyledElement {
  @property({ type: String, attribute: 'filelink' }) filelink: string|undefined;
  @property({ type: Array }) childItems: FileItem[] = [];
  @state() styles = [basic, css``];

  size: DOMRect | null = null;

  constructor() {
    super();
    this.classList.add('c-finder');
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();

    if (!this.childItems) {
      this.childItems = [];
    }

    // If childItems is empty, fetch the desktop config.
    if (this.childItems.length === 0) {
      this.fetchDesktopConfig();
    } else {
      // Arrange the child items in a grid.
      this.arrangeChildItems();
    }
  }

  fetchDesktopConfig() {
    const currentStyle = this.globalStyleController.style;

    fetch(`/content/${currentStyle}/desktop/desktopConfig.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then(data => {
        this.childItems = data.childItems || [];
        this.arrangeChildItems();
      })
      .catch(error => {
        console.warn("There was an error fetching the desktop config:", error);
        this.childItems = [];
      });
  }

  arrangeChildItems() {
    // Wait for the next frame to make sure the element is rendered and has a non-zero size.
    requestAnimationFrame(() => {
      // Get the bounding box of the Finder component.
      let boundingBox = this.getBoundingClientRect();

      // Arrange the child items in a grid.
      let positions = arrangeItemsInGrid(boundingBox, 30, this.childItems.length);

      // Assign the calculated positions to the child items.
      for (let i = 0; i < this.childItems.length; i++) {
        this.childItems[i].position = positions[i];
      }

      this.requestUpdate(); // Request an update after modifying childItems.
    });
  }
  
  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic);
  }

  render() {
    return html`
      <style>
        ${this.styles}
      </style>
      <div class="finder__content">
        ${this.childItems.map(
          (item) => html`
            <file-component
              appname="${item.appname}"
              filename="${item.filename}"
              filelink="${item.filelink}"
              .childItems="${item.childItems}"
              style=" top: ${item.position?.top}px; left: ${item.position?.left}px;"
            ></file-component>
          `
        )}
      </div>
    `;
  }
}