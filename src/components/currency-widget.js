import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CurrencyWidget extends LitElement {
  static properties = {
    Currency: { type: String },
    _data: { state: Object }
  }

  static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');
    :host {
        display: block;
        background-color: #e2cefd;
    }

    .title {
      font-size: 100%;
      font-weight: bold;
      padding-top: 5%;
      padding-bottom: 5%;
      font-family: 'Julius Sans One' !important;
    }

    div {
      font-family: 'Libre Baskerville';
    }

    .amount {
      font-size: 90%;
      padding-top: 5%;
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


    hr {
      margin-top: 0;
      padding-top: 0;
      width: 80%;
      height: 2px;
      border-radius: 2px;
    }

    #result {
      margin-top: 4.5%;
    }

    button {
    align-items: center;
    padding: 6px 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
    border-radius: 6px;
    color: #3D3D3D;
    background: #fff;
    border: none;
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 200px;
    cursor: pointer;
    border: 0.1px solid black;
    }

    button:hover {
      border: none;
      box-shadow: 0px 0px 0px 3.5px rgba(58, 108, 217, 0.25)
    } 

    button:focus {
      border: none;
      box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
      outline: 0;
    }
  `;

  constructor() {
    super();
    this.header = 'Currency Conversion';
    this.amount = 0;
    this.fromCurrency = 'AUD';
    this.toCurrency = 'AUD';
  }

  //Assign BASE_URL To the API link
  static BASE_URL = "https://api.exchangerate.host"
    
  connectedCallback() {
    super.connectedCallback();
  }  

  //Assigns this.amount to the outcome of the EventListener in render
  _AmountChange(e) {
    this.amount = e.target.value;
  }

  //Assigns this.fromCurrency to the outcome of the EventListener in render
  _FromCurrencyChange(e) {
    this.fromCurrency = e.target.value;
  }

  //Assigns this.toCurrency to the outcome of the EventListener in render
  _ToCurrencyChange(e) {
    this.toCurrency = e.target.value;
  }


  _ConvertClick(e) {

    e.preventDefault();

    //Changes URL based on the users chosen outcomes
    const url = `${CurrencyWidget.BASE_URL}/convert?from=${this.fromCurrency}&to=${this.toCurrency}&amount=${this.amount}`

    //Fetch the result of converted value
    fetch(url) 
       .then(response => response.json())
       .then(data => {
          this._data = data;
          this.requestUpdate();

          //Display the result in #result if succesfully converting otherwise display error in #result
          const resultElement = this.shadowRoot.querySelector('#result');

          //Checks if the result is usable
          if (data.result !== null && data.result !== undefined && this.amount > 0) {
            resultElement.innerHTML = data.result.toFixed(2) + ' ' + this.toCurrency;
          } else {
            resultElement.innerHTML = 'Error converting to ' + this.toCurrency;
          }
        
       })
     .catch(error => console.error(error));
  }

  //Renders the dispaly for the widget and assign EventListeners
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
                  <option value="AUD" >AUD</option>
                  <option value="EUR" >EUR</option>
                  <option value="USD" >USD</option>
                  <option value="GBP" >GBP</option>
                </select>

                <label>To</label>
                <select id="box2" @change="${this._ToCurrencyChange}">
                  <option value="AUD" >AUD</option>
                  <option value="EUR" >EUR</option>
                  <option value="USD" >USD</option>
                  <option value="GBP" >GBP</option>
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