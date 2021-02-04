// It's critical to declare imports with 'var'
var got = require("got");

module.exports = class Greeting {
  async initialize() {}

  async render() {
    return (
      <div class="card mt-2 shadow bg-dark text-center">
        <div class="card-body">
          <h5 id="greeting"></h5>
          <h6 id="current-time"></h6>
          <p id="advice" class="card-text"></p>
        </div>
      </div>
    );
  }

  async script() {
    this.renderInformation();
    this.renderCurrentTime();

    setInterval(this.renderCurrentTime, 60000 /* 1 minute in miliseconds */);
    setInterval(this.renderInformation, 3600000 /* 1 hour in miliseconds */);
  }

  async renderCurrentTime() {
    document.getElementById("current-time").innerHTML = new Date().toLocaleTimeString([], { timeStyle: "short" });
  }

  // bet 5$ you can't find worst looking code than this
  async renderInformation() {
    const currentHour = new Date().getHours();
    let heading;

    if (currentHour < 12) heading = { greeting: `Good Morning, Yasser` };
    else if (currentHour < 18) heading = { greeting: `Good Afternoon, Yasser` };
    else heading = { greeting: `Have A Good Night, Yasser` };

    document.getElementById("greeting").innerHTML = heading.greeting;

    got("https://api.adviceslip.com/advice", { headers: { Accept: "application/json" } }).then((response) => {
        document.getElementById("advice").innerHTML = `"${JSON.parse(response.body)["slip"]["advice"]}"`;
      })
      .catch((error) => {
        throw Error(error);
      });
  }
};
