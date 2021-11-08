const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const devConfig = require("../webpack.dev")();
const port = 8080;

try {
    const server = new WebpackDevServer(webpack(devConfig), {
        port,
        publicPath: "/",
        host: "0.0.0.0",
        watchOptions: { aggregateTimeout: 0 },
        stats: { all: false, errors: true, colors: true },
        clientLogLevel: "error",
    });
    server.listen(port);
} catch (err) {
    console.error(err);
}
