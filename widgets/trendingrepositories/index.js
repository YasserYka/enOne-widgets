const got = require("got");
const cheerio = require("cheerio");

module.exports = class TrendingRepositories {
  async initialize(config) {}

  async render() {
    return (
      <div class="card" style="width: 20rem;">
        <div class="card-header">Trending repositories on GitHub <i class="fa fa-github fa-lg ml-1"></i></div>
          <div id="repositories-list" class="list-group" style="width: 20rem;"></div>
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
  
      repositories.forEach((repository) => {
        document.getElementById("repositories-list").appendChild(
            <a target="_blank" href={repository.url} class="list-group-item list-group-item-action">
              <h6 class="list-group-item-heading">{repository.title}</h6>
              <i class="list-group-item-text">{repository.description}</i>

              <span class="badge">{repository.stars}</span>
            </a>
          );
        });
    });
  }

  async fetchTrendingPage() {
    return await got("https://github.com/trending")
      .then((response) => {
        const selector = cheerio.load(response.body);

        return selector(".Box-row")
          .get()
          .map((element) => {
            element = selector(element);

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
