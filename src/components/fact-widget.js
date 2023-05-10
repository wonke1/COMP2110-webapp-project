import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class fact extends LitElement {
  static properties = {
    header: { type: String },
    textContent: {type: String}
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 24px;
      font-family: sans-serif;
      color: white;
      background-color: #4285f4;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      padding: 20px;
    }
  `;

  constructor() {
    super();
    this.header = 'Widget';
    const today = Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    //setting the url to use when fetching data from API
    const apiUrl = `http://numbersapi.com/${month}/${day}/date`;


    //FETCHing the fun fact of the day from the API
    fetch(apiUrl)
      .then(response => response.text())
      .then(data => {
        //The fun fact recieved is set 
        this.textContent = data;
      })
      .catch(error => console.error(error));
  }


  render() {
    return html`
        <h3>${this.header}</h3>
        <title>Fun fact about today's Date!</title>
        <p>${this.textContent}</p>
    `;
  }
}

customElements.define('fact-widget', fact);