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
      display:block;
      box-sizing: border-box;
      border-radius: 4px;
      border: 2px solid #3250509c;
      background-color: rgba(220, 220, 220, 1);
      outline: none;
      margin-bottom: 5px;
      float: center;
    }
    input:hover {
      background-color: gainsboro;
      box-shadow: 0px 0px 0px 3.5px rgba(58, 108, 217, 0.25)
    }
    input:focus {
      box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.2), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.4);
      border: 2px solid #325050;
    }
    .login, .logout {
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
      width: 90%;
      float: center;
    }
    .login:hover, .logout:hover {
      background-image: linear-gradient(#0d70ea, #ad97fd);
    }
    .loggedIn {
      font-size: 50%;
      font-family: 'Libre Baskerville'
    }
    .logout {
      width: 40% !important;
      float: center;
    }
    .login {
      margin: 15px auto auto auto;
    }
    .notice {
      font-size: 40px;
      float: center;
      font-family: 'Julius Sans One'
    }
    label {
      text-shadow: -1px 1px 0 gainsboro, 1px 1px 0 gainsboro, 1px -1px 0 gainsboro, -1px -1px 0 gainsboro;
      color: #325050;
    }
    .loggedIn {
      font-size: 25px;
    }
    .username, .password {
      display: block;
      margin: auto auto 5px auto;
    }
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
        return html`<label class='loggedIn'>Hi, ${this.user.name}!</label><button class='logout' @click=${this.logout}>Logout</button>`
    } 

    if (this.errorMessage) {
      window.alert(this.errorMessage);
      location.reload();
    }

    return html`
      <form id="Login" @submit=${this.submitForm}>       
          <label class = 'notice'> Login </label>
          <input class='username' name="username" placeholder= 'Username' required="">
          <input class= 'password' type="password" name="password" placeholder='Password' required="">
          <input class= 'login' type='submit' value='Login'>
      </form>`;
    
  }
}

customElements.define('login-widget',  LoginWidget);