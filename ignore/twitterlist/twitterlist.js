module.exports = class TwitterList {
  
  /* 
    This widget won't work if twitter's script element is inside Muuri's item
      a workaround is to append the script in the body then after rendering the 
      widget the script won't be needed, remove the script 
  */

  async initialize(config) { 
    
      this.url = config.url;
    
    this.appendWidgetScript();
  }

  async render() {

    return (
      <div class="card">
          <a class="twitter-timeline" data-height="500" href={this.url}></a>
      </div>
    );
  }

  async script() {

    document.body.removeChild(this.widgetScript);
  }

  appendWidgetScript() {

    this.widgetScript = document.createElement('script');
    this.widgetScript.src = 'https://platform.twitter.com/widgets.js';
    this.widgetScript.setAttribute("charset", "utf-8");
    this.widgetScript.async = true;
    
    document.body.appendChild(this.widgetScript);
  }

};                  