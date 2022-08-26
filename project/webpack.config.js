const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {

    entry: "./iris/app.ts",


    output: {
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "this",
        // library: "",
        filename: "lib-agora-wrapper.js",
        environment: {
            arrowFunction: false // 关闭webpack的箭头函数，可选
        },
    },

    mode: "production",

    devtool: "source-map",
    optimization: {
        minimize: true
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