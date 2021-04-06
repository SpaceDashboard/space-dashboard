'use strict';

var gulp = require('gulp'),

    // This will keeps pipes working after error event
    plumber = require('gulp-plumber'),

    // linting
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),

    // Used in linting custom reporter
    map = require('map-stream'),
    events = require('events'),
    notify = require('gulp-notify'),
    emmitter = new events.EventEmitter(),
    path = require('path');

require('require-dir')('./gulp');


gulp.task('lint', function () {
    return gulp.src('dist/js/*.js')
    .pipe(plumber())
    .pipe(jshint('.jshintrc', {fail: true}))
    .pipe(jshint.reporter(stylish)) // Console output
    .pipe(jsHintErrorReporter) // If error pop up a notify alert
    .on('error', notify.onError(function (error) {
        return error.message;
    }));
});


// Custom linting reporter used for error notify
var jsHintErrorReporter = map(function (file, cb) {
  if (!file.jshint.success) {
    file.jshint.results.forEach(function (err) {
      if (err) {
        //console.log(err);

        // Error message
        var msg = [
          path.basename(file.path),
          'Line: ' + err.error.line,
          'Reason: ' + err.error.reason
        ];

        // Emit this error event
        emmitter.emit('error', new Error(msg.join('\n')));

      }
    });

  }
  cb(null, file);
});