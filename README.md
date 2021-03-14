# enOne Widgets

EnOne's widgets

## Development

To start writing your own widgets, run

```
$ npm setup
```

Then answer some simple questions to generate starter folder, it will create a folder with your widget name and generate the following initial structure in it.

```
📂YourWidgetName
├── 📜YourWidgetName.js
├── 📜configuration.json
├── 📜README.md  
```

##### *YourWidgetName.js*

```
module.exports = class YourWidgetName {
  
  // called when the module is initialize
  async initialize() {

  }

  // return JSX code to generates dom to be displayed
  async render() {

    return (
        <div></div>
    );
  }

  // scripts to make Widget dynamic
  async script() {

  }
  
};
```

##### *configuration.json*

```
{
  "author": "YourName",
  "verion": "1.0"
}
```

##### *README.md*

```
# YourWidgetName
Your Widget description

# Guide
How to configure
```

## Hot Reload

To hot reload your widget while developing, make sure your widget folder is in `/output` then run

```
$ npm start hotreload YourWidgetName
```
