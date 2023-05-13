import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/currency-widget.js';
import './components/fact-widget.js';
import './components/weather-widget.js';
import './components/widget-column.js';
import './components/ad-widget.js';
import './components/login-widget.js';

class Comp2110Portal extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');
    :host {
      min-height: 100vh;   
      font-size: 14pt;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: gainsboro;
    }

    main {
      display: flex;
      background-color: gainsboro;
    }
    header{
      background-color: gainsboro;
    }
    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
    header {
      font-family: "Comfortaa", cursive;
    }
    fact-widget, currency-widget, weather-widget, ad-widget{
      position:fixed;
      border: .1px solid black;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      width: 20vw;
      max-width: 250px;
    } 
    currency-widget, weather-widget, ad-widget{
      height:20vw;
      max-height: 250px;
    }
    fact-widget{
      left: 1%;
      top: 17%;
    }
    currency-widget {
      left: 1%;
      bottom:17%;
    }
    ad-widget{
      top: 17%;
      right: 1%;
    }
    weather-widget {
      bottom: 17%;
      right: 1%
    }
  `;

  constructor() {
    super();
    this.header = 'COMP2110 PORTAL';
  }

  render() {
    return html`
      <header>
        <h1>${this.header}</h1>
        <login-widget></login-widget>
      </header>

      <main>
        <widget-column header="">
          <fact-widget header="Fun Fact of the Day"></fact-widget>
          <currency-widget></currency-widget>
          <!-- <widget-block header="Third Widget"></widget-block> -->
        </widget-column>
        <blog-block></blog-block>       
        <widget-column header="">
          <ad-widget></ad-widget>
          <weather-widget header="Todays Weather"></widget-block>
          <widget-block header="Fifth Widget"></widget-block>
        </widget-column>
      </main>

      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2023
      </p>
    `;
  }
}

customElements.define('comp2110-portal', Comp2110Portal);