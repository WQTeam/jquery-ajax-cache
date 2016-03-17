const gulp = require('gulp');
const mocha = require('gulp-mocha-phantomjs');
const webpack = require('webpack');
const gutil = require('gutil');
const beep = require('beepbeep');
const config = require("./webpack.config.js");
const packageJson = require('./package.json');

const libraryName = '$ajaxCache';

gulp.task('default', ['build-dev', 'build-prod'], function (callback) {
    gulp.watch('./src/**/*', ['build-dev', 'build-prod']);
});

gulp.task('test', function () {
    return gulp.src('./test/**/*.html', {read: false})
    .pipe(mocha());
});

gulp.task('build-dev', function (callback) {

    var BANNER = '    ' + packageJson.name + ' -- ' + packageJson.description + '\n' +
                 '    Version ' + packageJson.version + '\n' +
                 '    https://github.com/WQTeam/jquery-ajax-cache\n' +
                 '    (c) 2013-2016 WQTeam, MIT license\n';

    config.output = {
        libraryTarget: 'umd',
        path: './dist/',
        filename: 'jquery-ajax-cache.js',
        library: libraryName
    }
    config.entry = './src/index';

    config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.BannerPlugin(BANNER)
    ];

    // run webpack
    webpack(config, function(err, stats) {
        if(stats.hasErrors()) {
            beep();
        }
        gutil.log("build-dev", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('build-prod', function (callback) {

    var BANNER = '    ' + packageJson.name + ' -- ' + packageJson.description + '\n' +
                 '    Version ' + packageJson.version + '\n' +
                 '    https://github.com/WQTeam/jquery-ajax-cache\n' +
                 '    (c) 2013-2015 WQTeam, MIT license\n';

    config.output = {
        path: './dist/',
        libraryTarget: "umd",
        filename: 'jquery-ajax-cache.min.js',
        library: libraryName
    }
    config.entry = './src/index';

    config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            comments: false
        }),
        new webpack.BannerPlugin(BANNER)
    ];

    // run webpack
    webpack(config, function(err, stats) {
        if(stats.hasErrors()) {
            beep();
        }
        gutil.log("build-prod", stats.toString({
            colors: true
        }));
        callback();
    });
});
