import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WeatherWidget extends LitElement {
  static properties = {
    header: { type: String },
    location: {type: Object},
    forecast: {type: Object},
    loading: {type: boolean}
  }

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: azure;
    }
  `;

  constructor() {
    super();
    this.header = 'Widget';
  }

  render() {
    return html`
        <h3>${this.header}</h3>
    `;
  }
}

customElements.define('weather-widget', WeatherWidget);