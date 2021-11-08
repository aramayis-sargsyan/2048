const webpack = require("webpack");
const devConfig = require("../webpack.prod")();

webpack(devConfig, (err) => {
    err && console.warn(err);
});
