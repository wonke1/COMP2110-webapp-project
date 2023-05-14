import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser, storeUser, deleteUser} from '../auth.js';
import { BASE_URL } from '../config.js';

class LoginWidget extends LitElement {
  static properties = {
    loginUrl: { type: String },
    user: {type: String, state: true }
    ,errorMessage: {type: String, state: true }
  }

  static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');

    :host {
      font-family: 'Julius Sans One'
        display: block;
    }
    input {
      margin: 8px 0;
      box-sizing: border-box;
      border-radius: 4px;
      border: 2px solid #3250509c;
      background-color: rgba(220, 220, 220, 1);
      outline: none;
    }
    input:hover {
      background-color: gainsboro;
      box-shadow: 0px 0px 0px 3.5px rgba(58, 108, 217, 0.25)
    }
    input:focus {
      box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.3);
      border: 2px solid #325050;
    }
    input[type='submit'] {
      background-image: linear-gradient(#0dccea, #0d70ea);
      border: 0;
      border-radius: 4px;
      box-shadow: rgba(0, 0, 0, .3) 0 5px 15px;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      font-family: Montserrat,sans-serif;
      margin: 2px;
      padding: 5px 10px;
      text-align: center;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }
    input[type='submit']:hover {
      background-image: linear-gradient(#0d70ea, #ad97fd);

    `;

  constructor() {
    super();
    this.loginUrl = `${BASE_URL}users/login`;
    this.user = getUser();
  }

  submitForm(event) { 
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    fetch(this.loginUrl, {
      method: 'post',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'}
    }).then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }
      this.user = data;
      storeUser(data);
      location.reload();
    }).catch(error => {
      console.error(error);
      this.errorMessage = 'Incorrect username or password';
    });
  }

  logout() {
    deleteUser();
    this.user = null;
    location.reload();
  }

  tryAgain() {
    this.errorMessage = null;
    const form = this.querySelector('#Login');
    form.submit();
  }

  render() {
    if (this.user) {
        return html`<p>Logged in as ${this.user.name}</p><button @click=${this.logout}>Logout</button>`
    } 

    if (this.errorMessage) {
      window.alert(this.errorMessage);
      location.reload();
    }

    return html`
      <form id="Login" @submit=${this.submitForm}>
          <input name="username" placeholder= 'Username' required="">
          <input type="password" name="password" placeholder='Password' required="">
          <input type='submit' value='Login'>
      </form>`;
    
  }
}

customElements.define('login-widget',  LoginWidget);