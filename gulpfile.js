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
    'port': '3000',
    'DEBUG': 'shift-web:*'
};

// 合并文件的配置信息
var concat_files = {
    scripts: [
        "public/scripts/app.js",
        "public/scripts/controllers/home.js",
        "public/scripts/controllers/login.js",
        "public/scripts/controllers/workbench.js",
        "public/scripts/services/user.js"
    ],
    styles: []
};

// 库文件配置信息
var libs = {
    scripts: [
        'public/libs/angular/angular.min.js',
        'public/libs/angular-animate/angular-animate.min.js',
        'public/libs/angular-cookies/angular-cookies.min.js',
        'public/libs/angular-resource/angular-resource.min.js',
        'public/libs/angular-sanitize/angular-sanitize.min.js',
        'public/libs/angular-touch/angular-touch.min.js',
        'public/libs/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/libs/angular-ui-router/release/angular-ui-router.min.js',
    ],
    styles: [
        'public/libs/normalize-css/normalize.css',
        'public/libs/bootstrap/dist/css/bootstrap.min.css'
    ]
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

// 启动 browser-sync #前端资源热部署
gulp.task('bsync', ['sass'], function() {
    browserSync.init({
        proxy: 'localhost:3000',
        port: '8080'
    });

    // 监控 sass, 热编译
    gulp.watch('public/**/*.scss', ['sass']);
    gulp.watch(['public/scripts/**/*.js']).on('change', reload);
});

// 编译 sass -> css
gulp.task('sass', function() {
    return gulp.src('public/styles/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/styles/css'))
        // 加载到 browser-sync
        .pipe(reload({ stream: true }));
});

// // 合并脚本文件
// gulp.task('build-js', function() {
//     return gulp.src(concat_files.scripts)
//         .pipe(sourcemaps.init())
//         .pipe(concat('main.js', { newLine: ';' }))
//         .pipe(minifier(minifierOption).on('error', gutil.log))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('public/dist'));
// });

// // 合并样式文件
// gulp.task('build-css', function() {
//     return gulp.src(concat_files.styles)
//         .pipe(sourcemaps.init())
//         .pipe(concat('main.css', { newLine: ';' }))
//         .pipe(minifier(minifierOption).on('error', gutil.log))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('public/dist'));
// });

// // 合并库文件
// gulp.task('build-libs', function() {
//     gulp.src(libs.scripts)
//         .pipe(sourcemaps.init())
//         .pipe(concat('plugin.js', { newLine: ';' }))
//         .pipe(minifier(minifierOption).on('error', gutil.log))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('public/dist'));
//     gulp.src(libs.styles)
//         .pipe(sourcemaps.init())
//         .pipe(concat('plugin.css', { newLine: ';' }))
//         .pipe(minifier(minifierOption).on('error', gutil.log))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('public/dist'));
// });

// 默认任务
gulp.task('default', ['serve']);
