const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");

module.exports = () => {
    return merge(commonConfig(), {
        mode: "production",

        stats: "errors-only",

        plugins: [new HtmlInlineScriptPlugin()],

        module: {
            rules: [
                //                 {
                //                     test: /\.(jpe?g|png)?$/,
                //                     use: [
                //                         {
                //                             loader: "url-loader",
                //                             options: {
                //                                 name: "[path][name].[ext]",
                //                                 fallback: require.resolve("base64-inline-loader"),
                //                             },
                //                         },
                //                         {
                //                             loader: "image-webpack-loader",
                //                             options: {
                //                                 disable: false,
                //                                 mozjpeg: {
                //                                     progressive: true,
                //                                     quality: 85,
                //                                 },
                //                                 optipng: {
                //                                     enabled: true,
                //                                 },
                //                                 pngquant: {
                //                                     quality: [0.8, 0.9],
                //                                     speed: 1,
                //                                 },
                //                             },
                //                         },
                //                     ],
                //                 },
                //                 {
                //                     test: /\.(woff|mp3)?$/,
                //                     use: [
                //                         {
                //                             loader: "url-loader",
                //                             options: {
                //                                 name: "[path][name].[ext]",
                //                                 fallback: require.resolve("base64-inline-loader"),
                //                             },
                //                         },
                //                     ],
                //                 },
            ],
        },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        chunks: "all",
                    },
                },
            },
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    parallel: true,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                        output: {
                            comments: false,
                        },
                    },
                }),
            ],
        },
    });
};
