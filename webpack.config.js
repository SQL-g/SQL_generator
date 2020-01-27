const path = require('path');

module.exports = {
    // entry point of the app - indicates which module webpack should use to begin building out its internal dependency graph
    entry: './client/index.js',
    // output - tells webpack where to emit the bundles it creates and how to name these files.
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV,
    // configuration for webpack dev server
    devServer: {
        // specifies where the bundle will be available in the browser
        publicPath: '/build/',
        historyApiFallback: true,
        compress: true,
        port: 8080,
        proxy: {
            '/api': 'http://localhost:3000',
        },
    },
    // Loaders - allow webpack to process other types of files and convert them into valid modules
    // transpiling ES6+ and non-JS code into all-browser interpretable format within the bundle
    module: { 
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets:[
                        [
                            '@babel/preset-env',
                            { targets: { node: "10" } },
                        ],
                        '@babel/preset-react',
                    ],
                },
            },
        },
        { 
            test: /.(css|scss)$/i,
            use: ['style-loader', 'css-loader'],
        }],
    },
    resolve: {
        // Enable importing JS / JSX files without specifying their extension
        extensions: ['.js', '.jsx'],
    },
};