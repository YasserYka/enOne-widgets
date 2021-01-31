const got = require('got');

module.exports = class Hackernews {
  
    async initialize() { }
  
    async render() {

      return (
        <div class="card mt-2 shadow bg-dark text-center">
            <div class="card-header">
                Today's hottest stories!
            </div>
            
            <div class="card-body">
                <ul class="list-group list-group-flush" id="hackernews">
                    {
                        this.getStories().then(stories => stories.map(story =>
                            <a target="_blank" href={story.url} class="list-group-item list-group-item-action"> {story.title} </a>
                            )
                        )
                    }
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

        setInterval(function renderNews() {

            document.getElementById("hackernews").innerHTML = this.getStories().then(stories => 
                stories.map(story =>
                    <a target="_blank" href={story.url} class="list-group-item list-group-item-action"> {story.title} </a>
                )
            );

            // return it self to execute the function the first time script gets executed first time without waiting the first delay
            return renderNews();
        }, 3600000 /*  one hour in milliseconds */); 
    }

    getStories(){
        return this.request('https://hacker-news.firebaseio.com/v0/beststories.json?orderBy="$key"&limitToFirst=6').then(ids => 
            Promise.all(ids.map(id => this.request(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)(id))).then(stories => {
                return stories;
            })
        );
    }

    async request(url){
        return got(url).then(response => {
        
            return JSON.parse(response.body);
        }).catch(error => {

            console.error(error);
        });
    }

  };