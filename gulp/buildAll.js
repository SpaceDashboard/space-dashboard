'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('build-all', function() {
    // runSequence('copy-concat-css', 'copy-files'); // Not used! Look at webpack
    runSequence('copy-concat-css');
});
