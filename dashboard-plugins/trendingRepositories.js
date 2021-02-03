// It's critical to declare imports with 'var'
var got = require("got");
const cheerio = require("cheerio");

module.exports = class TrendingRepositories {
  async initialize() {}

  async render() {
    return (
      <div class="card">
        <div class="card-header">Trending repositories on GitHub <i class="fa fa-github fa-lg ml-1"></i></div>
          <div id="repositories-list" class="list-group"></div>
      </div>
    );
  }

  async script() {
    this.renderRepositories();

    setInterval(this.renderRepositories, 43200000 /* 12 hours in miliseconds */);
  }

  renderRepositories() {
    this.fetchTrendingPage().then((repositories) => {

      repositories = repositories.slice(0, 6);

      document.getElementById("repositories-list").innerHTML = repositories
        .map((repository) => {
          return (
            <a href={repository.url} class="list-group-item list-group-item-action">
              <h5 class="list-group-item-heading">{repository.title}</h5>
              <p class="list-group-item-text">{repository.description}</p>

              <span class="badge">{repository.stars}</span>
            </a>
          );
        })
        .join(" ");
    });
  }

  async fetchTrendingPage() {
    return await got("https://github.com/trending")
      .then((response) => {
        const selector = cheerio.load(response.body);

        return selector(".Box-row")
          .get()
          .map((element) => {
            element = cheerio(element);

            let uri = element.find("h1:nth-child(2) > a:nth-child(1)").attr("href").substring(1);

            return {
              stars: element.find("span:contains('stars today')").text().trim(),
              description: element.find("p:nth-child(3)").text().trim(),
              title: uri,
              url: "https://github.com/" + uri,
            };
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
