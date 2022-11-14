const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebPackPlugin = require('terser-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

const isDev = process.env.NODE_ENV = 'development'
const isProd = !isDev

const optimization = () => {
    const config = {}
    if (isProd) {
        config.minimizer = [
            new TerserWebPackPlugin(),
            new CssMinimizerWebpackPlugin()
        ]
    }
    return config
}

const cssLoaders = params => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        'css-loader'
    ]
    if(params){
        loaders.push(params)
    }

    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill','./app.js'],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devServer: {
        port: 4000,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.jpg$/,
                use: ['file-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders(  'sass-loader')
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                use: ['file-loader']
            }

        ]
    }

}