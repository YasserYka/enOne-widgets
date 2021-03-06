// It's critical to declare imports with 'var'
var got = require('got');

module.exports = class Hackernews {
  
    async initialize(config) {

      this.limit = config.limit;
    }
  
    async render() {

      return (
        <div class="card mt-2 shadow text-center" style="width: 18rem;">
            <div class="card-header">
                Today's hottest stories! <i class="fa fa-hacker-news fa-lg" aria-hidden="true"></i>
            </div>
            
            <div class="card-body">
                <ul class="list-group list-group-flush" id="hackernews">
                    <div class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
      );
    }
  
    async script() {

        this.renderNews();
        
        setInterval(this.renderNews, 3600000 /*  one hour in milliseconds */); 
    }

    renderNews() {

        const hackernewsElement = document.getElementById("hackernews");

        this.getStories().then(stories => { 
            console.log('tf?')
            hackernewsElement.innerHTML = '';

            stories.forEach(story =>{
                document.getElementById("hackernews").appendChild(<a target="_blank" href={story.url} class="list-group-item list-group-item-action"> {story.title} </a>);
            });
        });
    }

    async getStories() {

        return await this.request(`https://hacker-news.firebaseio.com/v0/beststories.json?orderBy="$key"&limitToFirst=${this.limit}`).then(ids => 
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