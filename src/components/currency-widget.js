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
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    #convertForm {
      padding:1.5%;
    }

    .title {
      margin-top: 30px;
      margin: 20px;
      font-size: 15px;
      font-weigth: 900;
    }

    .amount {
      font-size: 20px;
      margin: 10px;
    }

    .CurrencySelector {
      align-items: center;
      font-size: 20px;
      margin: 10px;
    }

    #box1 {
      cursor: crosshair;
      width: 55px;
    }

    #box2 {
      cursor: crosshair;
      width: 55px;
    }

    #Button {
      width: 200px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      cursor: crosshair;
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
          resultElement.innerHTML = `${data.result !== null && data.result !== undefined ? data.result : 'Error'} ${this.toCurrency}`;
       })
     .catch(error => console.error(error));
   

  }

  connectedCallback() {
    super.connectedCallback();
    this._CurrencyChange();
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
            <h1> 
                Currency Converter
            </h1>
        </div>
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