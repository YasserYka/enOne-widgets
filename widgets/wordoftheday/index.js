var gis = require('g-i-s');
const got = require("got");

function logResults(error, results) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(results, null, '  '));
  }
}

module.exports = class WordOfTheDay {

  async initialize(config) {

  }

  async render() {

    return ();
  }

  async renderImage(error, images) {

    if (error || images.length == 0)
      console.error("couldn't fetch an image!");

  }

  // provider of random word API is https://github.com/mcnaveen/
  async fetchWord() {

    const url = "https://random-words-api.vercel.app/word";



  }

  async script() {}

};
