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
        background-color: white;
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

    #box {
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
    

    const apiUrl = "https://api.exchangerate.host/convert?from=AUD&to=EUR"; 
    fetch(apiUrl) 
       .then(response => response.json())
       .then(data => {
          this._data = data;
       })
     .catch(error => console.error(error));
  
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
                <input type="number" id="amount" value="0">
            </div>
            <div class="CurrencySelector">
                <label>From</label>
                <select id="box">
                  <option value="AUD">AUD</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>

                <label>To</label>
                <select id="box">
                  <option value="AUD">AUD</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
            </div>
      
            <button id="Button">Convert!</button>
        </form>
        <div id="Result"></div>
       </div>
    `;
  }
}

customElements.define('currency-widget', CurrencyWidget);