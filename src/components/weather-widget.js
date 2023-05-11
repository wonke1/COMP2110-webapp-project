import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WeatherWidget extends LitElement {
  static properties = {
    header: { type: String },
    textContent: {type: String}
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
    const today = Date()
    function geoFindMe() {
        const status = document.querySelector("#status");
        const mapLink = document.querySelector("#map-link");
      
        mapLink.href = "";
        mapLink.textContent = "";

        function success(position) { //gets location co-ordinates and stores them
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
        }

        function error() { // if geolocator does not work, set location to Sydney
            const latitude = -33.87
            const longitude = 151.21
        }

        if (!navigator.geolocation) { //checks if geolocator is compatible with browser
            status.textContent = "Geolocation is not supported by your browser";
        } else {
            status.textContent = "Locating…";
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }
    // setting the url to use when fetching data from API
    const apiURL =  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&forecast_days=1&timezone=auto`

    fetch (apiURL)
        .then(response => response.text())
        .then(data => {
            //The weather data received is set to variables 
             var timezone = data['timezone'];
             var temp = data['daily']['tempurature'];
             var windspeed = data['daily']['windspeed'];
             var maxTemp = data['daily']['data.temperature_2m_max'][0];
             var minTemp = data['daily']['data.temperature_2m_min'][0];
             var precipSum = data['daily']['data.precipitation_sum'][0];
             var sunrise = data['daily']['sunrise'][0];
             var sunset = data['daily']['sunset'][0];
        })
          .catch(error => console.error(error));
    
  }

  render() {
    return html`
        <h3>${this.header}</h3>
        <title>Todays Weather</title>
        <p>${this.textContent}</p>
    `;
  }
}

customElements.define('weather-widget', WeatherWidget);