### Guide
```js
// webpack.config.js
const webpackPluginRuntimeAssets = require('@julong/webpack-plugin-runtime-assets').default;
module.exports = {
  plugins: [
    // ...
    new webpackPluginRuntimeAssets(),
    // ...
  ]
} 
```