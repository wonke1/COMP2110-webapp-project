import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WeatherWidget extends LitElement {
    static properties = {
        header: {
            type: String
        },
        timezone: {
            type: String
        },
        maxTemp: {
            type: String
        },
        minTemp: {
            type: String
        },
        precipSum: {
            type: String
        },
        sunrise: {
            type: String
        },
        sunset: {
            type: String
        },
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    }

    static styles = css `
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: azure;
    }
    button {
        cursor: pointer;
    }
    #status {
        font-size: 10px;
        margin: -4%;
    }
    #weatherInfo {
        font-size: 80%;
        text-align: center;
    }
    #weatherData {
        text-decoration: overline;
        font-size: 120%;
    }
    #find-me:hover {
        filter: invert(20%);
    }
    #find-me:active {
        filter: invert(40%);
    }
    #find-me {

    }
    .title {
        font-size: 100%;
        font-weight: bold;
        padding-top: 5%;
    }
    hr {
        width: 80%;
        height: 2px; 
        border-radius: 2px;
    }
    `;

    constructor() {
        super();
        this.header = "Today's Weather";
        this.timezone = '';
        this.maxTemp = '';
        this.minTemp = '';
        this.precipSum = '';
        this.sunrise = '';
        this.sunset = '';
        this.latitude = 40.7128
        this.longitude = -74.0060

        // setting the url to use when fetching data from API
        const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&forecast_days=1&timezone=auto`;
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                //The weather data received is set to variables
                this.timezone = data['timezone'];
                this.maxTemp = data['daily']['temperature_2m_max'][0];
                this.minTemp = data['daily']['temperature_2m_min'][0];
                this.precipSum = data['daily']['precipitation_sum'][0];
                this.sunrise = data['daily']['sunrise'][0];
                this.sunset = data['daily']['sunset'][0];
                this.tempUnit = data['daily_units']['temperature_2m_max'];
                this.precipUnit = data['daily_units']['precipitation_sum'];
                console.log("1. " + this.timezone, this.maxTemp, this.minTemp, this.precipSum, this.sunrise, this.sunset);
            })
            .catch(error => console.error(error));
        
    };

    render() {
        if (this.timezone == '') 
            return html `Loading Weather Data...`;
        console.log(this.timezone, this.maxTemp, this.minTemp, this.precipSum, this.sunrise, this.sunset);
        return html `
            <div class='title'>Todays' Weather</div><hr>
            <p id='weatherInfo'>Timezone <br><span id='weatherData'>${this.timezone}</span><br>
            Min. Tempurature <br><span id='weatherData'>${this.minTemp}${this.tempUnit}</span><br>
            Max. Tempurature <br><span id='weatherData'>${this.maxTemp}${this.tempUnit}</span><br>
            Precipitation Sum <br><span id='weatherData'>${this.precipSum}${this.precipUnit}</span></p>
            <p id="status"></p>
            <button id="find-me">Set to my location</button> <br>
            `;  
    };

    updated() {
        const geoFindMe = () => {
            const findMeBtn = this.shadowRoot.querySelector('#find-me');
            const statusBtn = this.shadowRoot.querySelector('#status');
            let status = statusBtn
            const success = (position) => {   
                const latitude = position.coords.latitude.toFixed(2);
                const longitude = position.coords.longitude.toFixed(2);
                console.log(latitude, longitude);
                statusBtn.innerHTML = `Current Location: <br>Latitude: ${latitude}, Longitude: ${longitude}`;
                this.latitude = latitude;
                this.longitude = longitude;
                const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&forecast_days=1&timezone=auto`;
                fetch(apiURL)
                  .then(response => response.json())
                  .then(data => {
                    //The weather data received is set to variables
                    this.timezone = data['timezone'];
                    this.maxTemp = data['daily']['temperature_2m_max'][0];
                    this.minTemp = data['daily']['temperature_2m_min'][0];
                    this.precipSum = data['daily']['precipitation_sum'][0];
                    this.sunrise = data['daily']['sunrise'][0];
                    this.sunset = data['daily']['sunset'][0];
                    this.tempUnit = data['daily_units']['temperature_2m_max'];
                    this.precipUnit = data['daily_units']['precipitation_sum'];
                    console.log("2. " + this.timezone, this.maxTemp, this.minTemp, this.precipSum, this.sunrise, this.sunset);
                    this.requestUpdate();
                    findMeBtn.style.display = 'none';
                  })
                  .catch(error => console.error(error));
            }
            const error = () => {
                statusBtn.textContent = "Unable to retrieve your location";
            };
            if (!navigator.geolocation) {
                statusBtn.textContent = "Geolocation is not supported by your browser";
            } else {
                statusBtn.textContent = "Locating…";
                navigator.geolocation.getCurrentPosition(success, error);
            }
        };

        const findMeBtn = this.shadowRoot.querySelector('#find-me');
        findMeBtn.removeEventListener('click', this.geoFindMe);

        this.geoFindMe = geoFindMe.bind(this);
        findMeBtn.addEventListener('click', this.geoFindMe);
    };
}

customElements.define('weather-widget', WeatherWidget);