import { LitElement, html } from 'lit';
import { basic, styles } from './styles';

const currentStyle = 'modernMac'

class AppWindow extends LitElement {
  
  static get styles() {
    const styleIndex = styles.findIndex(style => style.styleName === currentStyle);
    return [basic, styles[styleIndex].css];
  }

  render() {
    return html`
      <div class="c-window__head js-window__head">
        <ul class="c-window__controls">
          <li>
            <button
            data-window-control="quit"
              class="c-window__control c-window__control--quit"
            >
              <svg   
                class="c-window__control-icon"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.29468 1.55566L5.81547 5.07645M9.36575 8.62673L5.81547 5.07645M5.81547 5.07645L9.33429 1.55763M5.81547 5.07645L2.26322 8.6287"
                  stroke="black"
                  stroke-width="2"
                />
              </svg>
            </button>
          </li>
          <li>
            <button
              data-window-control="hide"
              class="c-window__control c-window__control--hide"
            >
              <svg
                class="c-window__control-icon"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.409668 5.10791H10.4097"
                  stroke="black"
                  stroke-width="2"
                />
              </svg>
            </button>
          </li>
          <li>
            <button
              data-window-control="scale"
              class="c-window__control c-window__control--scale"
            >
              <svg
                class="c-window__control-icon"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.32202 1.84436H8.8491V8.37143H2.32202V1.84436Z"
                  stroke="black"
                  stroke-width="2"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
      <div class="c-window__content js-window__content">
        <slot></slot>
      </div>
    </div>`;
  }

}

customElements.define('app-window', AppWindow);