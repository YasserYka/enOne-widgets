const got = require("got");
const yt = require("youtube-search-without-api-key");

module.exports = class Youtube {

  async initialize(config) {

    this.keyword = config.keyword;
  }

  async render() {

    return (
      <div class="card" style="opacity: 0.9; width: 22rem;">
        <div class="card-header">{this.keyword} <i class="fa fa-youtube fa-lg ml-1"> </i></div>
        <div class="embed-responsive embed-responsive-16by9" id="iframe-container"></div>
      </div>
    );
  }

  async getRandomVideoId(){

    const videos = await yt.search(this.keyword);

    return videos[Math.floor(Math.random() * videos.length)]['id']['videoId'];
  }

  async script() {

    this.getRandomVideoId().then(videoId => {

      const iframeContainer = document.getElementById("iframe-container");

      iframeContainer.innerHTML = "";

      iframeContainer.appendChild(
          <iframe src={"https://www.youtube.com/embed/" + videoId} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      );
    });
  }

};
