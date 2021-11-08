const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// prettier-ignore
const PATHS = {
    html:   path.resolve("html/index.hbs"),
    index:  path.resolve("src/index.ts"),
    dist:   path.resolve("dist"),
};

module.exports = () => {
    return {
        entry: {
            index: PATHS.index,
        },

        output: {
            path: PATHS.dist,
            filename: "[name].[contenthash].js",
        },

        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },

        module: {
            rules: [
                {
                    test: /\.hbs$/,
                    use: [
                        {
                            loader: "handlebars-loader",
                        },
                    ],
                },
                {
                    test: /\.(ts|js)x?$/,
                    exclude: "/node_modules/",
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-typescript"],
                            },
                        },
                    ],
                },
            ],
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: "Webpack Typescript Pixi Demo",
                template: PATHS.html,
            }),
            new CopyPlugin({
                patterns: [{ from: "assets", to: "assets" }],
            }),
        ],
    };
};
