const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = () => {
    return merge(commonConfig(), {
        mode: "development",

        plugins: [new WebpackManifestPlugin()],

        devtool: "inline-cheap-source-map",

        module: {
            rules: [
                // {
                //     test: /\.(jpe?g|png|woff|mp3)?$/,
                //     use: [
                //         {
                //             loader: "file-loader",
                //             options: {
                //                 name: "[path][name].[ext]",
                //             },
                //         },
                //     ],
                // },
            ],
        },
    });
};
