'use strick'

module.exports = {
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
        ]
    }
    // devtool: 'source-map'  //create source-map
}
