import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/currency-widget.js';
import './components/fact-widget.js';
import './components/weather-widget.js';
import './components/widget-column.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/holiday-widget.js'

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
      font-size: 170%;
      color: gainsboro;
      background-color: black;
      margin-top: 0;
      background-image: url('./src/css/img/header.jpg');
      background-repeat: repeat;
      background-attachment: fixed;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
      padding-bottom: 2%
    }

    .app-footer a {
      margin-left: 5px;
    }
    header {
      font-family: "Comfortaa", cursive;
    }
    fact-widget, currency-widget, weather-widget, ad-widget, holiday-widget{
      border: .1px solid black;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      width: 20vw;
      max-width: 250px;
      height:20vw;
      max-height: 250px;
    } 
    fact-widget, currency-widget, weather-widget, ad-widget{
      overflow: hidden;
    }
    holiday-widget, fact-widget{
      overflow-y: auto;
    }
    fact-widget, currency-widget, holiday-widget{
      margin-bottom: 100px;
    }
    ad-widget, weather-widget{
      margin-bottom: 250px;
    }
    .app-footer {
      font-size: 50%;
    }
    h1 {
      margin-top: 0;
      padding-top: 5%;
      font-family: 'Julius Sans One', cursive;
      font-weight: bolder;
      text-shadow: -1px 1px 0 #325050, 1px 1px 0 #325050, 1px -1px 0 #325050, -1px -1px 0 #325050;

    }
    login-widget {
      width: 10vw;
      position:absolute;
      right: 3%;
      top: 2%;
    }
    .app-footer {
      font-size: 18px;
      background-image: url('./src/css/img/header.jpg');
      background-repeat: repeat;
      background-attachment: fixed;
      margin-bottom: 0;
      color: gainsboro;
      text-shadow: -1px 1px 0 #325050, 1px 1px 0 #325050, 1px -1px 0 #325050, -1px -1px 0 #325050;
      padding: 10px 0 10px 0;
      text-decoration: overline underline;
    }
    #column1 {
      margin-left: 1%;
    }
    #column2 {
      margin-right: 1%
    }
    blog-block {
      display:block;
      margin: 1% auto 0 auto;
      width: ${window.innerWidth * 0.68}px;
      text-align: left;
    }
  `;

  constructor() {
    super();
    this.header = 'COMP2110 PORTAL';
  }

  render() {
    return html`
      <header id='head'>
        <h1>${this.header}</h1>
        <login-widget></login-widget>
      </header>

      <main>
        <widget-column id='column1' header="">
          <fact-widget header="Fun Fact of the Day"></fact-widget>
          <currency-widget></currency-widget>
          <holiday-widget header="Upcoming Holidays"></widget-block>
        </widget-column>
        <blog-block></blog-block>       
        <widget-column id='column2' header="">
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