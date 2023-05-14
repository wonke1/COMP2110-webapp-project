/**
 * A Blog widget that displays blog posts pulled from 
 * an API
 * 
 * <blog-block></blog-block>
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';
import { getUser} from '../auth.js';

class BlockBlock extends LitElement {
  static properties = {
    _posts: { state: true },
    user: {type: String, state: true }
  }

  static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

  :host {
    margin-left: 300px;
    margin-right: 300px;
    font-family: "Libre Baskerville"
  }
  .blogpost {
    width: 1320px;
    text-align: left;
  }
  .blogpost:nth-child(even) {
    background: #3250509c;
    border-bottom: 2px dotted gainsboro;
    border-top: 2px dotted gainsboro;
    color: gainsboro !important;
  }
  .blogpost:nth-child(odd) {
    background: gainsboro;
    border-bottom: 2px dotted #3250509c;
    border-top: 2px dotted #3250509c;
    color: #3250509c !important;
  }
  .blogpost h2 {
    padding-left: 3%;
    text-transform: capitalize;
    margin-bottom: 1%;
    font-family: "Julius Sans One"
  }
  .blogpost h3 {
    padding: 0 0 0 5%;
    font-size: 80%;
    text-decoration: overline;
  }
  .blogpost p {
    margin: 2% 0 2% 2%;
  }
  .blogpost p, .blogpost h2, .blogpost h3{
    margin-right: 1%;
    word-wrap: break-word;
  }
  #Content, #Title{
    width:1320px;
    margin-top: .5%;
    width:1320px;
    font-size: 90%;
    display:block;
    box-sizing: border-box;
    border-radius: 4px;
    border: 2px solid #3250509c;
    background-color: gainsboro;
    outline: none;
    margin-bottom: 5px;
    font-family: 'Comfortaa';
  }
  #Content:hover, #Title:hover {
    box-shadow: 0px 0px 0px 3.5px rgba(58, 108, 217, 0.25)
  }
  #Content:focus, #Title:focus {
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.2), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.4);
    border: 2px solid #325050;
  }
  #Content {
    height: 80px;
    cursor: auto;
    text-align: left;
  }
  #PostBlog {
    padding-top: 20px;
    text-align: left;
    margin-top: .5%;
    font-family: "Julius Sans One";
    font-weight: bold;
  }

  input[type='submit'] {
    display: inline-block;
    outline: none;
    cursor: pointer;
    font-family: "Julius Sans One";
    font-weight: bold;
    font-size: 14px;
    line-height: 1;
    border-radius: 500px;
    transition-property: background-color,border-color,color,box-shadow,filter;
    transition-duration: .3s;
    border: 1px solid transparent;
    letter-spacing: 2px;
    min-width: 160px;
    text-transform: uppercase;
    white-space: normal;
    font-weight: 700;
    text-align: center;
    padding: 16px 14px 18px;
    color: #616467;
    box-shadow: inset 0 0 0 2px #616467;
    background-color: transparent;
    height: 48px;
    width: 1320px;
  }
  input[type='submit']:hover{
      color: #fff;
      background-color: #616467;
  }
  .title {
    font-size: 50px;
    font-family: 'Comfortaa';
    color: #325050;
  }
  hr {
    height: 5px;
    border-radius: 30px;
    background-color: #3250509c;
  }
  .post {
    padding-left: 50px;
  }
  `;

  constructor() {
    super();
    this.user = getUser();
    const url = `${BASE_URL}blog`;
    fetch(url)
        .then(response => response.json())
        .then(posts => {
            this._posts = posts.posts; 
        });
  }

  SubmitPost(event) {

    const title = event.target.title.value;
    const content = event.target.content.value;
    
    fetch(`${BASE_URL}blog`, {
      method: 'POST',
      body: JSON.stringify({title, content}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${getUser().token}`
      }
    })
        .then(response => {
          response.json()
        })
        .catch(error => {
          console.error(error);
        });
  }

  // A simple formatter that just splits text into paragraphs and 
  // wraps each in a <p> tag
  // a fancier version could use markdown and a third party markdown
  // formatting library
  static formatBody(text) {
    const paragraphs = text.split('\r\n')
    return paragraphs.map(paragraph => html`<p>${paragraph}</p>`)
  }
  
  render() {
    if (!this._posts)
      return html`Loading...`
    if (this.user){
      return html`
        <div class="title"> 
          Blog Posts
        </div><hr>
          ${this._posts.map(post => html`<div class="blogpost">
            <h2>${post.title}</h2>
            <h3>By ${post.name}</h3>
            ${BlockBlock.formatBody(post.content)}
          </div>`)}
        <form id="PostBlog" @submit=${this.SubmitPost}>
          <label class='post'> Add to the Blog! </label> <br>
          <input name="title" id="Title" type="text" placeholder="Subject" required=""></input>
          <textarea name="content" id="Content" type="text" placeholder="Content..."></textarea>
          <input id="SubmitBlog" type="submit"></input>
        </form>
        `;
    }
    return html`
    <div class="title"> 
      Blog Posts
    </div>
      ${this._posts.map(post => html`<div class="blogpost">
        <h2>${post.title}</h2>
        <h3>By ${post.name}</h3>
        ${BlockBlock.formatBody(post.content)}
      </div>`)}
      `;
  }
};



// import {user} from "login-widget.js";
customElements.define('blog-block', BlockBlock);


