const path =  require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  =  require("mini-css-extract-plugin");
const TerserPlugin  = require("terser-webpack-plugin");
const webpack = require('webpack')

let conf = {
    entry: ["@babel/polyfill",'./src/index.tsx'],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
        
    },
    devServer: {
        hot: true,
        historyApiFallback: {
            disableDotRule: true    
        },
        port: 3000,
        static:path.resolve(__dirname,"dist"),
        watchFiles: ['src/**/*'],
    },
    resolve: {
        extensions: [".tsx",".jsx", ".ts", ".js", ".css", ".scss"],
        fallback: {
            "https": false,
            "http": false,
            "crypto":false,
            "stream":false,
            "assert": false,
            "os":false,
            "buffer": require.resolve("buffer")
        },
        
        
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"src/index.html"),
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x|.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "@babel/preset-typescript",
                    ],
                    },
                },
            },
            {
                test:   /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
            },
               
        ]
    },
    stats: {
        children: true,
    },

};
module.exports = (env, options) => {
    let isProd = options.mode === "production";
    conf.devtool = isProd ? false : "inline-source-map";
    if (isProd) {
        conf.optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: /@extract/i
                }),
            ]
        };
    }
    conf.target = isProd ? "browserslist" : "web";
    return conf;
};