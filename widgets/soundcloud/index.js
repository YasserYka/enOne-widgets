module.exports = class Soundcloud {
  
  async initialize(config) {

    const partOfDay = this.getPartOfDay();

    this.playlist = this.getPlaylist(config.playlists, partOfDay);
    this.title = this.getTitle(partOfDay);
  }

  // return JSX code to generates dom to be displayed.
  async render() {
    return (
      <div class="card shadow text-center">
            <div class="card-header"> 
                {this.title} <i class="fa fa-soundcloud fa-sm"></i>
            </div>
            <iframe class="embed-responsive-item" scrolling="no" allow="autoplay" src={this.playlist} width="100%" height="300" frameborder="no"></iframe>
      </div>
    );
  }

  async script() { }

  /* 
      TODO: in meanwhile playlist's id will be hardcoded with playlists I like until
  I      finish scraping algorithm or find ready to use one that fits this plugin needs
  */

 getPlaylist(playlists, partOfDay){

      const ids = playlists[partOfDay];

      const randomIndex = Math.floor(Math.random() * ids.length); 

      return this.buildEmbeddedUrl(ids[randomIndex]);
  }

  getTitle(partOfDay){

      return {
          'MORNING': 'Songs to Kickstart Your Day',
          'AFTERNOON': 'Songs To Lighten The Mood',
          'MIDNIGHT': 'Late Night Vibes'
      }[partOfDay];
  }

  getPartOfDay(){
const currentHour = new Date().getHours();

      if (currentHour < 12)
          return 'MORNING';
      else if (currentHour < 18)
          return 'AFTERNOON';
      else
          return 'MIDNIGHT';
  }

  buildEmbeddedUrl(id) {

      return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
  }
};
