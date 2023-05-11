import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class fact extends LitElement {
  static properties = {
    header: { type: String },
    _data: {state: true}
  }

  static styles = css`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-family: sans-serif;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    padding: 20px;
  }

  .title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }

  .date {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }

  .fact {
    font-size: 24px;
    text-align: center;
  }

  .divider {
    width: 80%;
    margin: 20px 0;
    border: 1px solid #ccc;
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
    if (this._data){
      return html`
          <div class="container">
          <div class="title">Today's Date</div>
          <div class="date">${new Date().toDateString()}</div>
          <div class="divider"></div>
          <div class="title">Fun fact about today</div>
          <div class="fact">${this._data}</div>
          
          
      </div>
    `;
    }else{
      return html`<p>Loading...</p>`
    }
  }
}

customElements.define('fact-widget', fact);