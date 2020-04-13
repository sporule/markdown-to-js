# Markdown to JS Webpack Plugin

> Merge all markdowns and load to one js file

## Installation

Node.js

```bash
npm install markdown-to-js-webpack-plugin
```

## Usage Example (ES6)

In your Webpack Config file

```javascript
const MarkdownToJS = require("markdown-to-js-webpack-plugin").default;

//define the options
const option = {
                outputPath: "md.js"
    }

//In the plugin section

 plugins: [
  new MarkdownToJS(option)
 ]

```
