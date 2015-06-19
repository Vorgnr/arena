var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

gulp.task('default', function () {
  return browserify({
    debug: true,
    entries: ['./src/index.js']
  }).bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/'));
});