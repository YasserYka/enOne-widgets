
module.exports = class TimeAndDate {
  async initialize(config) {}

  async render() {
    return (
      <div class="container text-center" style="color: white;">
          <h1 id="clock"></h1>
          <h4 id="day"></h4>
          <h6 id="date"></h6>
      </div>
    );
  }

  async script() {
    this.renderCurrentTime();

    setInterval(this.renderCurrentTime, 60000 /* 1 minute in miliseconds */);
  }

  async renderCurrentTime() {
    let date = new Date();

    document.getElementById("clock").innerHTML = date.toLocaleTimeString([], { timeStyle: "short" });
    document.getElementById("day").innerHTML = date.toLocaleString('en-us', {weekday:'long'});
    document.getElementById("date").innerHTML = date.toLocaleDateString('en-us', {year: "numeric", month: "long", day: "numeric"})
  }

};
