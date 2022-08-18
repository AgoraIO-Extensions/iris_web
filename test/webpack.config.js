const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {

    entry: "./src/index.ts",

    output: {
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "var",
        library: "test",
        filename: "test.js",
        environment: {
            arrowFunction: false // 关闭webpack的箭头函数，可选
        },
    },

    mode: "production",
    devtool: "source-map",
    optimization: {
        minimize: false
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
    ],

    externals: {
        "../../project/dist/dts/app": "window",

        // ""
        // "../../project/node_modules/agora-rtc-sdk-ng/rtc-sdk_en": "AgoraRTC"
    }
}