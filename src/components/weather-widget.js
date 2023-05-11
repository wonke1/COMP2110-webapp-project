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

    // setting the url to use when fetching data from API
    const apiURL =  `https://api.open-meteo.com/v1/forecast?latitude=-33.87&longitude=151.21&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&forecast_days=1&timezone=auto`

    fetch (apiURL)
        .then(response => response.text())
        .then(data => {
            //The weather data received is set to variables 
             let timezone = data['timezone'];
             let temp = data['daily']['tempurature'];
             let windspeed = data['daily']['windspeed'];
             let maxTemp = data['daily']['data.temperature_2m_max'][0];
             let minTemp = data['daily']['data.temperature_2m_min'][0];
             let precipSum = data['daily']['data.precipitation_sum'][0];
             let sunrise = data['daily']['sunrise'][0];
             let sunset = data['daily']['sunset'][0];
        })
          .catch(error => console.error(error));
    
  }

  render() {
    return html`
        <h3>${this.header}</h3>
        <title>Todays Weather</title>
        <p>${this.textContent}</p>
        <ul>
          <li>Timezone: ${this.timezone}</li>
          <li>Temp: ${this.temp}</li>
          <li>Windspeed: ${this.windspeed}</li>
          <li>maxTemp: ${this.maxTemp}</li>
          <li>minTemp: ${this.minTemp}</li>
          <li>precipSum: ${this.precipSum}</li>
          <li>sunrise: ${this.sunrise}</li>
          <li>sunset: ${this.sunset}</li>
        </ul>
    `;
  }
}

customElements.define('weather-widget', WeatherWidget);