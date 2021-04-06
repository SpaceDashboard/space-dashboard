'use strict';

var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    concatCss = require('gulp-concat-css'),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence'),
    shell = require('gulp-shell');

var libCssFiles = [
    './node_modules/font-awesome/css/font-awesome.min.css',
    './node_modules/sweetalert2/dist/sweetalert2.min.css'
];

var coreCssFiles = [
    './dev/css/default.css',
    './dev/css/buttons.css',
    './dev/css/grid.css',
    './dev/css/menus.css',
    './dev/css/nav-menu.css',
    './dev/css/responsive.css'
];


gulp.task('copy-concat-css', ['copy-css-npm', 'copy-css']);

gulp.task('copy-css-npm', function() {
    return gulp.src(libCssFiles)
        .pipe(concatCss('space-dashboard-libs.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./build/css/lib/'));
});

gulp.task('copy-css', function() {
    return gulp.src(coreCssFiles)
        .pipe(concatCss('space-dashboard.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./build/css/'));
});

// gulp.task('watch', function () {
//     gulp.watch('./dev/css/*.css', function () {
//         return gulp.src('./dev/css/*.css')
//             .pipe(concatCss('space-dashboard.css'))
//             .pipe(cleanCSS())
//             .pipe(gulp.dest('./build/css/'));
//     });
// });

gulp.task('neo-feed', shell.task('/usr/bin/php ./build/api/neo-feed-s7m1GMwJZKwXyxz5cpNQ5nfcB.php'));
gulp.task('cron-job-10-min', shell.task('/usr/bin/php ./build/api/cron-job-10-min-hvLwXAoUl5MJ3tmu422MNG6eB.php'));
gulp.task('cron-job-1-day', shell.task('/usr/bin/php ./build/api/cron-job-1-day-z2LXE3pDaB1ivWsVWtuXAWF2j.php'));
gulp.task('cron-job-2-min', shell.task('/usr/bin/php ./build/api/cron-job-2-min-r5fn18qgspPn2IOeqQorHKFZh.php'));

gulp.task('build-local', function () {
    runSequence('copy-concat-css');
    runSequence('neo-feed');
    runSequence('cron-job-10-min');
    runSequence('cron-job-1-day');
    runSequence('cron-job-2-min');
    gulp.watch('./dev/css/*.css', ['copy-concat-css']);
});
