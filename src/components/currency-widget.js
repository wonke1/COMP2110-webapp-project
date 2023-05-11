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
    .title {
      margin: 10%;
      padding: 1.5%;
      bottom: 10%;
      font-size: 15px;
      font-weigth: 1000;
    }
    .convertForm {
      display: block;
      flex-direction: column;
      margin: 10px;
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
      width: 50px;
    }

    #Button {
      width: 200px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      padding: 2%;
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
       <body>
       <div id="currency-converter">
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
                <select id="box"></select>

                <label>To</label>
                <select id="box"></select>
            </div>
      
            <button id="Button">Convert!</button>
        </form>
        <div id="Result"></div>
       </div>
      </body>
    `;
  }
}

customElements.define('currency-widget', CurrencyWidget);