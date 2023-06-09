// DefaultApp.ts
import { html, css } from 'lit';
import { customElement, state} from 'lit/decorators.js';

import { basic, styles } from './styles';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement';

import '../default/default';

@customElement('preferences-app')
export class Preferences extends StyledElement {

  @state() styles = [basic, css``];
  static appName = 'Preferences';

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic);
  }

  static styles = css`
    /* DefaultApp.scss styles go here */
  `;

  render() {
    return html`
      <div class="c-app">
        <default-app-component name="${Preferences.appName}"></default-app-component>
      </div>
    `;
  }

}
