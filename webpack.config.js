const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        'control.trackplayback': './src/control.trackplayback/index.js',
        'leaflet.trackplayback': ['./src/leaflet.trackplayback/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: '[name].js',
        // libraryTarget : 'umd'
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/control.trackplayback'),
            to: path.resolve(__dirname, 'dist'),
            ignore: ['*.js']
        }])
    ],
    target: 'web'
}