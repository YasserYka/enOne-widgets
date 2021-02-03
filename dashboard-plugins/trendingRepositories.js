// It's critical to declare imports with 'var'
var got = require("got");
const cheerio = require("cheerio");

module.exports = class TrendingRepositories {
  async initialize() {}

  async render() {
    return (
      <div class="card">
        <div class="card-body">
          <div id="repositories-list" class="list-group">
            
          </div>
        </div>
      </div>
    );
  }

  async script() {
    this.renderRepositories();

    setInterval(this.renderRepositories, 43200000 /* 12 hours in miliseconds */);
  }

  renderRepositories() {
    this.fetchTrendingPage().then((repositories) => {

        document.getElementById('repositories-list').innerHTML = repositories.map(repository => {

            return <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{repository.title}</h5>
                <small>{repository.stars}</small>
              </div>
              <p class="mb-1">{repository.description}</p>
              <small><a href={repository.url}>Open</a></small>
            </a>
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
