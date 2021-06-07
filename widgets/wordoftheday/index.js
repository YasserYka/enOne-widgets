const gis = require('g-i-s');
const got = require("got");

module.exports = class WordOfTheDay {

  async initialize(config) {

  }

  async render() {

    return ();
  }

  async renderImage(error, images) {

    if (error || images.length == 0)
      console.error("couldn't fetch an image!");
    else {

      // images structure [{url, width, height}]
      const firstImageUrl = images[0]['url'];

      return (
        <img src={firstImageUrl} />
      );
    }
  }

  // provider of random word API is https://github.com/mcnaveen/
  async fetchRandomWord() {

    const randomWordAPI = "https://random-words-api.vercel.app/word";

    return await got(randomWordAPI).then(response => JSON.parse(response.body)).catch(error => {
      console.error(error);
    });
  }

  async script() {

    const randomWord = fetchRandomWord();

    gis(randomWord, renderImage );

  }

};
