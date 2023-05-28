import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class HolidayWidget extends LitElement {
  static properties = {
    header: { type: String }
  }


  constructor() {
    super();
    this.header = 'Widget';
    this.toCountry = '';
    this._AvaliableCountries();
  }

  static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');

    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: azure;
        height: auto ; 
        min-height: 250px;
        background-color: #cee1fd;
    }

    hr {
      width: 80%;
      border-width: 2px;
      border-radius: 2px;
    }

    .title {
      font-size: 100%;
      font-weight: bold;
      padding-top: 5%;
      text-align: center;
      font-family: 'Julius Sans One' !important;
    }
    label {
      font-family: 'Julius Sans One' !important;
      text-decoration: underline;
    }
    #UpcomingDates {
      font-family: 'Libre Baskerville';
      box-sizing: border-block;
      font-size: 80%;
      text-align: left;
      padding-left: 5px;
      padding-right: 5px;
      margin-bottom: 1px;
      height: 60%;
      margin-top: 2%;
      overflow-y: auto;
    }
  `;
  
  //Setting the URL to the websites main page
  static BASE_URL = "https://date.nager.at"

  //Updates fetches all countries avaliable in the API, and uses them to update the options avaliable
  _AvaliableCountries() {
    const CountriesURL = `${HolidayWidget.BASE_URL}/api/v3/AvailableCountries`
    
    //Fetchces all avaliable countries
    fetch(CountriesURL)
      .then(response => response.json())
      .then(data => {

        //For loop to grab all avaliable countries in the fetch and add them as a option in select
        var resultElement = this.shadowRoot.querySelector('#SelectCountry');
        for (var i = 0; i < data.length; i++)
          resultElement.options[i] = new Option(data[i].name, data[i].countryCode); 
      })
      .catch(error => console.error(error));
  }

  //Fetches the correct countries data based on the selected country
  _ToCountry(e) {

    //Grabs the current year
    var CurrentYear = new Date().getFullYear();
    this.toCountry = e.target.value;
    //Used to change the API Url depending on the chosen countryCode
    const url = `${HolidayWidget.BASE_URL}/api/v2/publicholidays/${CurrentYear}/${this.toCountry}`

    //Fetch grabs all dates in 2023 based on the country chosen
    fetch(url) 
      .then(response => response.json())
      .then(data => {
        const CurrentDate = new Date();
        
        //For loop grabbing the index of the public holiday after the current date
        var lastIndex;
        for (lastIndex = 0; lastIndex < data.length; lastIndex++) {
          if (new Date(data[lastIndex].date) > CurrentDate)
            break
          }

        //Displays all public holidays from the most CurrentDate    
        const resultElement = this.shadowRoot.querySelector('#PublicHolidays');
        resultElement.innerHTML = '';
        var Index;
        for (Index = lastIndex; Index < data.length; Index++) {
          resultElement.innerHTML += data[Index].name + '<br>' + data[Index].date + "<br><br>";
        }
        this.requestUpdate();
      })
      .catch(error => {
        console.error(error)
      });
  }

  connectedCallback() {
    super.connectedCallback();
  }  

  //Renders the html allowing for the holidays to be displayed
  render() {
    return html`
        <div class='title'>UPCOMING HOLIDAYS</div> <hr>
        <form id="Country"> 
          <label> Country: </label>
          <select id="SelectCountry" @change="${this._ToCountry}">
          </select>
        </form>

        <div id="UpcomingDates">
          <p id="PublicHolidays"></p>
        </div>
    `;
  }
}

customElements.define('holiday-widget', HolidayWidget);