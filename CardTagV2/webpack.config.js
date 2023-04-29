const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: "eval-source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        // Добавьте корневую директорию в список поиска
        modules: [
            path.resolve(__dirname, "src"),
            "node_modules",
            "./dependencies/ImageV2",
            "./dependencies/Button",
            "../IcoPack"
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                }
            },
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                    // ↑ порядок расположение важен
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        
    ],
};