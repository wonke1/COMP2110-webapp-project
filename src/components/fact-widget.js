import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class fact extends LitElement {
  static properties = {
    header: { type: String },
    _data: {type: String}
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
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    //setting the url to use when fetching data from API
    const apiUrl = `http://numbersapi.com/${month}/${day}/date`;


    //FETCHing the fun fact of the day from the API
    fetch(apiUrl)
      .then(response => response.text())
      .then(data => {
        //The fun fact recieved is set 
        this._data = data;
      })
      .catch(error => console.error(error));
  }


  render() {
    return html`
        <h3>${this.header}</h3>
        <title>Fun fact about today's Date!</title>
        <p>${this._data}</p>
    `;
  }
}

customElements.define('fact-widget', fact);