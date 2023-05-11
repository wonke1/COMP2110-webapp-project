import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CurrencyWidget extends LitElement {
  static properties = {
    header: { type: String },
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
    this.header = 'Currency Conversion';
    

    const apiUrl = "https://api.exchangerate.host/convert?from=AUD&to=EUR"; 
  }

  fetch(apiUrl) {

  }
    

  render() {
    return html`
       <body>
       <div id="currency-converter">
        <div class="title">
            <h1> 
                Currency Converter
            </h1>
        </div>

        <form id="convertForm">
            <div>
                <label for="amount">Amount</label>
                <input type="number" id="amount" value="0">
            </div>
            <div>
                <label for="From">From</label>
                <select id="From"></select>

                <label for="To">To</label>
                <select id="To"></select>
            </div>
      
            <button>Convertion!</button>
        </form>
        <div id="Result"></div>
       </div>
      </body>
    `;
  }
}

customElements.define('currency-widget', CurrencyWidget);