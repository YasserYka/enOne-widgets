var got = require("got");

module.exports = class Subreddit {
  
    async initialize(config) {
  
        this.baseurl = 'https://www.reddit.com/';
    }
  
    async render() {
      return (
        <div class="card" style="width: 18rem;">
        <div class="card-header">Top Posts <i class="fa fa-reddit fa-lg ml-1"></i></div>
          <div id="reddit-posts-list" class="list-group">
            <div class="text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
          </div>
      </div>
      );
    }
  
    async script() {

        this.getAndRenderPosts();
        
        setInterval(this.getAndRenderPosts, 3600000 /*  one hour in milliseconds */); 
    }

    getAndRenderPosts(){

        this.getSubredditPosts().then(response => {

            this.renderPosts(response['data']['children'].slice(0, 6));
        });  
    }

    async getSubredditPosts() {

        return await got("https://www.reddit.com/r/webdev/top/.json").then(response => {

            return JSON.parse(response.body);
        });

    }

    renderPosts(posts){

        document.getElementById('reddit-posts-list').innerHTML = "";

        posts.map( post => document.getElementById('reddit-posts-list').appendChild( 
            <a target="_blank" href={this.baseurl + post.data.permalink} class="list-group-item list-group-item-action">
              <b class="list-group-item-text">{post.data.title}</b>

              <span class="badge">{post.data.ups} Upvotes</span>
            </a>
        ));
    }

  };
