// It's critical to declare imports with 'var'
var got = require('got');
const cheerio = require('cheerio');

module.exports = class TrendingRepositories {
  
    async initialize() { }
  
    async render() {

      return (
        <div class="card mt-2 shadow bg-dark text-center">
        </div>
      );
    }
  
    async script() {

        this.renderNews();
        
        setInterval(this.renderRepositories, 43200000 /* 12 hours in miliseconds */); 
    }

    renderRepositories() {
        this.fetchTrendingPage().then(repositories => {
            
        });
    }

    async fetchTrendingPage(){
        return await got('https://github.com/trending').then(response => {
        
            const selector = cheerio.load(response.body);

            return selector('.Box-row').get().map(element => {
                element = cheerio(element);
                
                let uri = element.find("h1:nth-child(2) > a:nth-child(1)").attr('href').substring(1);
        
                return {
                    'stars': element.find("span:contains('stars today')").text().trim(),
                    'description': element.find("p:nth-child(3)").text().trim(),
                    'repository': uri,
                    'url': 'https://github.com/' + uri 
                };
            });

        }).catch(error => {

            console.error(error);
        });
    }

  };