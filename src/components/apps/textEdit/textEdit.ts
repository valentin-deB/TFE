// DefaultApp.ts
import { html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';

import { basic, styles } from './styles';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement';

@customElement('text-edit-component')
export class TextEdit extends StyledElement {
  @property({ type: String }) name: string;
  @property({ type: String, attribute: 'filelink' }) filelink: string|undefined;

  @state() content: string = '';
  @state() styles = [basic, css``];

  constructor() {
    super();
    this.name = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add('c-text-edit');
  }
  
  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic);
  }

  getFileIcon(style: string) {
    console.log(this.name)
    const appName = 'textEdit';
    const fileIconPath = `/images/fileIcons/${style}/${appName}.png`;
    return fileIconPath;
  }

  async updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('filelink')) {
      if (this.filelink === undefined) {
        return;
      }
      this.content = await this.fetchFileContent(this.filelink);
    }
    // Set focus on the contenteditable div after updating the content
    const editor = this.querySelector('.text-edit__editor') as HTMLElement;
    if (editor) {
      editor.focus();
    }
  }

  async fetchFileContent(filelink: string): Promise<string> {
    try {
      const response = await fetch(filelink);
      const content = await response.text();
      return content;
    } catch (error) {
      console.error('Error fetching file content:', error);
      return '';
    }
  }

  updateContent(content: string) {
    this.content = content;
  }

  render() {
    // create a text-edit app
    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
       <div
        class="text-edit__editor"
        contenteditable
        .innerHTML="${this.content}"
      ></div>
    `;
  }
}