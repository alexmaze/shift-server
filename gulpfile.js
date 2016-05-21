'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var minifier = require('gulp-minifier');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// ---------------------------------------------
// configs

// 服务器参数
var server_env = {
    'NODE_ENV': 'development',
    'port': '4000',
    'DEBUG': 'shift-web:*'
};


// 代码压缩配置
var minifierOption = {
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: true
}

// ---------------------------------------------
// tasks

// 启动 nodemon #后端资源热部署
gulp.task('serve', function() {
    nodemon({
            script: 'bin/www',
            ext: 'js html',
            watch: './',
            env: server_env,
            ignore: ['public', 'gulpfile.js']
        })
        .on('restart', function() {})
});

// 默认任务
gulp.task('default', ['serve']);
