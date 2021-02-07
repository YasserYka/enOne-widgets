// It's critical to declare imports with 'var'
var got = require('got');

module.exports = class Hackernews {
  
    async initialize(config) {}
  
    async render() {

      return (
        <div class="card mt-2 shadow bg-dark text-center">
            <div class="card-header">
                Today's hottest stories!
            </div>
            
            <div class="card-body">
                <ul class="list-group list-group-flush" id="hackernews">
                </ul>
            </div>
            
            <div class="card-footer text-white">
                <a target="_blank" href="https://news.ycombinator.com" class="text-white card-link">
                    Hacker News
                </a>
                <i class="fa fa-hacker-news fa-lg" aria-hidden="true"></i>    
            </div>
        </div>
      );
    }
  
    async script() {

        this.renderNews();
        
        setInterval(this.renderNews, 3600000 /*  one hour in milliseconds */); 
    }

    renderNews() {
        this.getStories().then(stories => 
            document.getElementById("hackernews").innerHTML = stories.map(story =>
                <a target="_blank" href={story.url} class="list-group-item list-group-item-action"> {story.title} </a>
            ).join(' ')
        );
    }

    async getStories() {

        return await this.request('https://hacker-news.firebaseio.com/v0/beststories.json?orderBy="$key"&limitToFirst=6').then(ids => 
            Promise.all(ids.map(id => this.getStory(id))).then(stories => {
                
                return stories;
            })
        );
    }

    getStory(id) {

        return this.request(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    }

    async request(url){
        return await got(url).then(response => {
        
            return JSON.parse(response.body);
        }).catch(error => {

            console.error(error);
        });
    }

  };