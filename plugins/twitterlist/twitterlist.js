module.exports = class TwitterList {
  
  /* 
    This widget won't work if twitter's script element is inside Muuri's item
      a workaround is to append the script in the body then after rendering the 
      widget the script won't be needed, remove the script 
  */

  async initialize(config) { 
    
      this.href = config.url;
    
    this.appendWidgetScript();
  }

  async render() {

    return (
      <div class="card shadow bg-dark">
          <a class="twitter-timeline" data-height="500" data-theme="dark" href="https://twitter.com/the1certificate/lists/dev-16567?ref_src=twsrc%5Etfw"></a>
          <div class="card-footer"><i class="fa fa-twitter fa-lg" aria-hidden="true"></i></div>
      </div>
    );
  }

  async script() {

    document.body.removeChild(this.script);
  }

  appendWidgetScript() {

    this.script = document.createElement('script');
    this.script.src = 'https://platform.twitter.com/widgets.js';
    this.script.setAttribute("charset", "utf-8");
    this.script.async = true;
    
    document.body.appendChild(this.script);
  }

};                  