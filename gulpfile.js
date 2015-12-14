var gulp = require('gulp');
var webpack = require('webpack');
var gutil = require('gutil');
var beep = require('beepbeep');
var config = require("./webpack.config.js");

gulp.task('default', ['build'], function (callback) {
    gulp.watch('./src/**/*', ['build']);
});

gulp.task('build', function (callback) {

    config.output = {
        libraryTarget: 'umd',
        path: './dist/',
        filename: 'jquery-ajax-cache.js'
    }
    config.entry = './src/index';

    config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
    ];

    // run webpack
    webpack(config, function(err, stats) {
        if(stats.hasErrors()) {
            beep();
        }
        gutil.log("build", stats.toString({
            colors: true
        }));
        callback();
    });
});
