import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CurrencyWidget extends LitElement {
  static properties = {
    Currency: { type: String },
    _data: { state: Object }
  }

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: #e2cefd;
    }

    #convertForm {
    }

    .title {
      font-size: 100%;
      font-weight: bold;
      padding-top: 5%;
      padding-bottom: 5%;
    }

    .amount {
      font-size: 90%;
      padding-top: 10%;
    }

    .CurrencySelector {
      align-items: center;
      font-size: 90%;
      margin: 5%;
    }

    #box1 {
      cursor: pointer;
      width: 55px;
    }

    #box2 {
      cursor: pointer;
      width: 55px;
    }

    #Button {
      width: 200px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }

    hr {
      margin-top: 0;
      padding-top: 0;
      width: 80%;
      height: 2px;
      border-radius: 2px;
    }

    #result {
      margin-top: 8%;
    }
  `;

  constructor() {
    super();
    this.header = 'Currency Conversion';
    this.amount = 0;
    this.fromCurrency = 'AUD';
    this.toCurrency = 'USD';
  }

  static BASE_URL = "https://api.exchangerate.host"
    
  _fetch() {
    const url = `${CurrencyWidget.BASE_URL}/convert?from=${this.fromCurrency}&to=${this.toCurrency}&amount=${this.amount}`
    fetch(url) 
       .then(response => response.json())
       .then(data => {
          this._data = data;
          this.requestUpdate();

          const resultElement = this.shadowRoot.querySelector('#result');
          resultElement.innerHTML = `${data.result !== null && data.result !== undefined ? data.result : 'Error converting to'} ${this.toCurrency}`;
       })
     .catch(error => console.error(error));
   

  }

  connectedCallback() {
    super.connectedCallback();
  }  

  _AmountChange(e) {
    this.amount = e.target.value;
  }

  _FromCurrencyChange(e) {
    this.fromCurrency = e.target.value;
  }

  _ToCurrencyChange(e) {
    this.toCurrency = e.target.value;
  }

  _ConvertClick(e) {
    e.preventDefault();
    this._fetch();
  }

  render() {
    return html`
       <div class="currency-converter">
        <div class="title">
                Currency Converter
        </div>
        <hr>
        <form id="convertForm">
            <div class="amount">
                <label>Amount</label>
                <input type="number" id="amount" value="${this.amount}" @input="${this._AmountChange}"/>
            </div>
            <div class="CurrencySelector">
                <label>From</label>
                <select id="box1" @change="${this._FromCurrencyChange}">
                  <option value="AUD" ?selected="${this.fromCurrency === 'AUD'}">AUD</option>
                  <option value="EUR" ?selected="${this.fromCurrency === 'EUR'}">EUR</option>
                  <option value="USD" ?selected="${this.fromCurrency === 'USD'}">USD</option>
                  <option value="GBP" ?selected="${this.fromCurrency === 'GBP'}">GBP</option>
                </select>

                <label>To</label>
                <select id="box2" @change="${this._ToCurrencyChange}">
                  <option value="AUD" ?selected="${this.toCurrency === 'AUD'}">AUD</option>
                  <option value="EUR" ?selected="${this.toCurrency === 'EUR'}">EUR</option>
                  <option value="USD" ?selected="${this.toCurrency === 'USD'}">USD</option>
                  <option value="GBP" ?selected="${this.toCurrency === 'GBP'}">GBP</option>
                </select>
            </div>
      
            <button id="Button" type="button" @click="${this._ConvertClick}">Convert!</button>
        </form> 
        <div id="result"></div>
       </div>
    `;
  }
}

customElements.define('currency-widget', CurrencyWidget);