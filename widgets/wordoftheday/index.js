const gis = require('g-i-s');
const got = require("got");

module.exports = class WordOfTheDay {

  async initialize(config) { 

    this.update = this.update.bind(this);
  }

  async render() {
    return (
      <div class="card">
        <img style="width: 15rem; height: 15rem; filter: brightness(.55);object-fit: cover;" class="card-img-top" id="wordoftheday-img" src={__dirname + "/default.jpg"} />
        <div class="card-img-overlay text-white" style="font-family: 'Roboto', sans-serif;">
          <h2 id="wordoftheday-word"></h2>
          <h6 id="wordoftheday-definition"></h6>
          <h4 id="wordoftheday-pronunciation"></h4>
        </div>
      </div>
    );
  }

  async renderImage(error, images) {

    if (error || images.length == 0)
      console.error("couldn't fetch an image!");
    else {

      // images structure [{url, width, height}]
      const firstImageUrl = images[0]['url'];

      const wordOfTheDayElement = document.getElementById("wordoftheday-img"); 

      wordOfTheDayElement.src = firstImageUrl;
    }
  }

  // provider of random word API is https://github.com/mcnaveen/
  async fetchRandomWord() {

    const randomWordAPI = "https://random-words-api.vercel.app/word";

    return await got(randomWordAPI).then(response => {
      const responseBody = JSON.parse(response.body);

      const word = responseBody[0];

      return word;
    }).catch(error => {
      console.error(error);
    });
  }

  async update(){

    const randomWordOject = await this.fetchRandomWord();

    document.getElementById('wordoftheday-pronunciation').innerHTML = '"' + randomWordOject.pronunciation + '"';
    document.getElementById('wordoftheday-definition').innerHTML = randomWordOject.definition;
    document.getElementById('wordoftheday-word').innerHTML = randomWordOject.word;

    gis(randomWordOject.word, this.renderImage);
  }

  async script() {
    this.update();

    setInterval(this.update, 60000 /* 1 minute in miliseconds */);
  }

};
