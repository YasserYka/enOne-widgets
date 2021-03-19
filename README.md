<h1 align="center">
  <br>
    <img src="rawlogo.png" alt="enOne-logo" width="800">
  <br>
</h1>

<h4 align="center"> <b><a href="https://github.com/YasserYka/enOne">enOne</a></b>'s sub-repository for maintaining widgets.</h4>

<p align="center">enOne is still under testing and in PRE-RELEASE phase, your feedback is much appreciated!</p>

## Development

To start writing your own widgets, inside [`enOne`](https://github.com/YasserYka/enOne)'s repository run

```
$ npm run setup
```

Then answer some simple questions to generate starter package, it will create a folder with your widget name at `/enOne-widgets/widgets-dev/YourWidgetDirectory` and generate the following initial structure in it.

```
📂YourWidgetDirectory
├── 📜index.js
├── 📜config.json
├── 📜README.md
├── 📜package.json
```

##### *index.js*

```
module.exports = class YourWidgetName {
  
  // called when the module is being initialize
  async initialize(config) {

  }

  // return JSX code to generates dom to be displayed
  async render() {

    return (
        <div id="YourWidgetName"></div>
    );
  }

  // scripts to make Widget dynamic
  async script() {

  }
  
};
```

##### *config.json*

The config file can be used inside widget's index file

```
{
  "author": "YourName",
}
```

##### *README.md*

```
# YourWidgetName
Your Widget description

# Guide
How to configure
```

##### *package.json*

To install npm packages to be used inside your widgets, from the root directory please run

```
$ npm install --prefix ./PathToYour/YourWidgetDirectory/ PackageName
```

## Hot Reload

To hot reload your widget while developing, make sure your widget folder is in `/enOne-widgets/widgets-dev` then run

```
$ npm start hotreload YourWidgetDirectoryName
```

# Pull Request

Move your YourWidgetDirectory from `/enOne-widgets/widgets-dev` to `/enOne-widgets/widgets` before submitting a pull request
