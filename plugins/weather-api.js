const got = require("got");

module.exports = class WeatherAPI {
  async initialize(config) {
    this.weather = {
      temperature: null,
      image: null,
      description: null,
      minmaxtemperature: null,
    }; // defien default values
  }

  // updates indiviual elements
  update() {
    this.weather = this.getWeatherData();

    document.getElementById("description").innerHTML = this.weather.description;
    document.getElementById("temperature").innerHTML = this.weather.temperature;
    document.getElementById("minmaxtemperature").innerHTML = this.weather.minmaxtemperature;
    document.getElementById("image").src = this.weather.image;
  }

  getWeatherData() {
    return got("https://www.metaweather.com/api/location/44418/")
      .then((response) => {
        const weatherData = JSON.parse(response.body).consolidated_weather[0];

        return {
          minmaxtemperature: `${weatherData.min_temp | 0}-${weatherData.max_temp | 0}°C`,
          temperature: `Temperature ${weatherData.th_temp | 0}°C`,
          description: `${weatherData.weather_state_name}`,
          imageUrl: `https://www.metaweather.com/static/img/weather/${weatherData.weather_state_abbr}.svg`,
        };
      })
      .catch((error) => {
        throw Error(error);
      });
  }

  // return JSX code to generates dom to be displayed.
  async render() {
    this.weather = await this.getWeatherData();

    return (
      <div class="card" style="width: 14rem; text-align: center;">

        <img id="image" src={this.weather.imageUrl} style="width:120px;display:block;margin:auto;padding-top: 20px;" class="card-img-top" alt="weather-image" />

          <h5 id="description">{this.weather.description}</h5>

          <b id="temperature">{this.weather.temperature}</b>
          <p id="minmaxtemperature">{this.weather.minmaxtemperature}</p>
      </div>
    );
  }

  async script() {
    setInterval(this.update, 43200000);
  }
};
