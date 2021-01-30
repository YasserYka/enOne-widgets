const got = require("got");

module.exports = class WeatherAPI {
  
  constructor() {
    this.weather = {
      temperature: null,
      image: null,
      description: null,
    }; // defien default values

   this.render().then(res => {
    muuriAdd(res);
    });

  }

  // updates indiviual elements
  update() {
    this.weather = this.getWeatherData();

    document.getElementById("description").innerHTML = `In London ${this.weather.description}`;
    document.getElementById("description").innerHTML = `Temperature ${this.weather.temperature}°C`;
    document.getElementById("description").src = this.weather.image;
  }

  getWeatherData() {
    return got("https://www.metaweather.com/api/location/44418/")
      .then((response) => {
        const weatherData = JSON.parse(response.body).consolidated_weather[0];

        return {
          temperature: `Temperature ${weatherData.min_temp | 0}-${weatherData.max_temp | 0}°C`,
          description: `In London ${weatherData.weather_state_name}`,
          imageUrl: `https://www.metaweather.com/static/img/weather/png/${weatherData.weather_state_abbr}.png`,
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
        <div class="card mt-2 shadow bg-dark text-center">
          <div class="card-header">Today's Weather</div>

          <img src={this.weather.imageUrl} class="card-img-top" alt="Card-Image.js" />

          <div class="card-body">
            <h5 id="description" class="undefined">
               {this.weather.description}
            </h5>

            <b id="temperature">{this.weather.temperature}</b>
          </div>

          <div class="card-footer text-white">
            <a target="_blank" href="https://www.metaweather.com/api/" class="text-white card-link">
              Weather API
            </a>
          </div>
      </div>
    );
  }

  script() {

    setInterval(this.update, 43200000);
  }
};
