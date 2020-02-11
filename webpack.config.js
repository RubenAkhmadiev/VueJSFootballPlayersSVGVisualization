const webpackCopy = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const outputDirectory = 'dist';

module.exports = {
    mode: 'development',
    entry: ["./src/index.js"],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, outputDirectory),
        publicPath: '/',
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            }, {
                test: /\.vue?$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  {
                    loader: 'css-loader',
                    options: { importLoaders: 1 }
                  },
                  'postcss-loader'
                ]
              },
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|eot|wav|mp3)$/,
                loader: 'file-loader'
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'typeof window': JSON.stringify('object')
        }),
        new webpackCopy([
            { from: 'stubs/index.html' },
            { from: 'node_modules/vue/dist/vue.min.js', to: 'extLib/vue.min.js' },
            { from: 'node_modules/vue-material/dist/vue-material.min.js', to: 'extLib/vue-material.min.js' }
          ])
    ],
    externals: {
        vue: 'Vue',
        'vue-material': 'VueMaterial'
    }
};
