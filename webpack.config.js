const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './public/index.html'),
    filename: 'index.html'
})

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: 'css/[name].css'
})

module.exports = {
    mode: 'development',

    entry: {
        myadmin_client: path.join(__dirname, './src/index.js')
    },

    output: {
        path: path.join(__dirname, './dist/'),
        filename: 'js/[name].js'
    },

    plugins: [
        htmlWebpackPlugin, 
        miniCssExtractPlugin
    ],

    devServer: {
        open: true,
        port: 3001,
        host: '127.0.0.1',
        // historyApiFallback: {
        //     rewrites: [
        //         {
        //             from: /.*/,
        //             to: path.join(__dirname, "../index.html")
        //         }
        //     ]
        // },
        historyApiFallback: true,
        proxy: {
            '/': {
                target: 'http://localhost:5000',
                secure: true,
                changeOrigin: true,
            }
        },

    },

    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },

            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                                modifyVars: {
                                    'outline-color': '#006666',
                                    'btn-primary-bg': '#006666'
                                },
                                javascriptEnabled: true,
                            },
                        },
                    }
                ],
                exclude: /src/
            },

            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
                exclude: /node_modules/
            },

            {
                test: /\.jpg|png|gif$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 512,
                        name: 'images/[name].[ext]',
                        publicPath: '/'
                    }
                }
            }
        ]
    },

    resolve: {
        extensions: [
            '.js', '.jsx', '.json'
        ]
    }
}