const got = require("got");

module.exports = class Subreddit {
  
    async initialize(config) {
  
        this.baseurl = 'https://www.reddit.com/';
        this.subreddit = config.subreddit;
    }
  
    async render() {
      return (
        <div class="card" style="width: 18rem;">
        <div class="card-header">Top Posts <i class="fa fa-reddit fa-lg ml-1"></i></div>
          <div id="reddit-posts-list" class="list-group"></div>
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

        return await got(`https://www.reddit.com/r/${this.subreddit}/top/.json`).then(response => {

            return JSON.parse(response.body);
        });

    }

    renderPosts(posts){

        posts.map( post => document.getElementById('reddit-posts-list').appendChild( 
            <a target="_blank" href={this.baseurl + post.data.permalink} class="list-group-item list-group-item-action">
              <b class="list-group-item-text">{post.data.title}</b>

              <span class="badge">{post.data.ups} Upvotes</span>
            </a>
        ));
    }

  };
