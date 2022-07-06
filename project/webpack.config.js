const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {

    entry: "./src/app.ts",


    output: {
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "var",
        library: "libAgoraWrapper",
        filename: "lib-agora-wrapper.js",
        environment: {
            arrowFunction: false // 关闭webpack的箭头函数，可选
        },
    },


    resolve: {
        extensions: [".ts", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: "ts-loader"
                },
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
    ]
}