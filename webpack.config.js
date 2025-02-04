const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageWebpackLoader = require("image-webpack-loader");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: "eval-source-map",
    devServer: {
        static:path.resolve(__dirname, "dist"),
        watchFiles: ["./src/index.html"],
        open: true,
        hot: true,
        compress: true,
    },
    plugins: [
        new HtmlWebpackPlugin ({
            template: "./src/index.html",
            scriptLoading: 'defer',
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css",
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                },
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: { 
                                progressive: true,
                                quality: 40 
                            }, // compress JPGs
                            svggo: {
                                pluggins: [{ removeViewBox: false }] // ensures SVGs remail valid, don't remove viewBox
                            },
                            webp: { quality: 50 }, //convert images to WebP format, reduce WebP quality for smaller sizes
                        },
                    },
                ],
            },
        ],
    },
};