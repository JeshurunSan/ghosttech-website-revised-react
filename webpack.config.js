const path = require('path');
const webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const config = {
        entry: './src/index.js',
        output: {
            filename: 'assets/js/app.[hash].js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            alias: {
                '@svg': path.resolve(__dirname, './src/svg'),
                '@img': path.resolve(__dirname, './src/img'),
                '@style': path.resolve(__dirname, './src/style'),
                '@components': path.resolve(__dirname, './src/components'),
                '@providers': path.resolve(__dirname, './src/providers'),
                '@views': path.resolve(__dirname, './src/views'),
                '@animations': path.resolve(__dirname, './src/animations'),
                '@helpers': path.resolve(__dirname, './src/helpers')
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.svg$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'svg-react-loader'
                    },
                },
                {
                    test: /\.(gif|png|jpe?g)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                emitFile: true,
                                name: '[name].[hash].[ext]',
                                outputPath: 'assets/img/'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './src/index.html',
                filename: './index.html',
                alwaysWriteToDisk: true,
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true
                }
            }),
            new HtmlWebpackHarddiskPlugin(),
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({

            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            host: '127.0.0.1',
            port: 8000,
            historyApiFallback: true,
            publicPath: '/',
            https: false,
            disableHostCheck: true
        }
    };

    return config;
};
