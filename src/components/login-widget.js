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
    :host {
        display: block;
    }
    input {
      margin: 8px 0;
      box-sizing: border-box;
      border: 2px solid #3250509c;
      border-radius: 4px;
      background-color: rgba(220, 220, 220, 0.1);
    }
    input:hover {
      background-color: gainsboro;
    }
    input:active {
      
    }
    input[type="submit"]{
      border: 1px solid black;
    }
    input[type="submit"]:hover {
      background-color: unset;
      cursor: pointer;
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
    }).catch(error => {
      console.error(error);
      this.errorMessage = 'Incorrect Username & Password';
    });
  }

  logout() {
    deleteUser();
    this.user = null;
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
     return html`<p>${this.errorMessage}</p><button @click=${this.tryAgain}>Try Again</button>`
    }

    return html`
      <form id="Login" @submit=${this.submitForm}>
          <input name="username" placeholder= 'Username'>
          <input type="password" name="password" placeholder='Password'>
          <input type='submit' value='Login'>
      </form>`;
    
  }
}

customElements.define('login-widget',  LoginWidget);