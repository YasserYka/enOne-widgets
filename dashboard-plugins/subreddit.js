var got = require("got");

module.exports = class Subreddit {
  
    async initialize() {
  
        this.baseurl = 'https://www.reddit.com/';
    }
  
    async render() {
      return (
        <div class="card" style="width: 26rem;">
        <div class="card-header">Top Posts <i class="fa fa-reddit fa-lg ml-1"></i></div>
          <div id="reddit-posts-list" class="list-group"></div>
      </div>
      );
    }
  
    async script() {

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

        document.getElementById('reddit-posts-list').innerHTML = posts.map( post =>
            <a target="_blank" href={this.baseurl + post.data.permalink} class="list-group-item list-group-item-action">
              <p class="list-group-item-text">{post.data.title}</p>

              <span class="badge">{post.data.ups} Upvotes</span>
            </a>
        ).join(' ');
    }

  };
