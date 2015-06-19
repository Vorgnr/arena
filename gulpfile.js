var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

gulp.task('browserify', function () {
  return browserify({
    debug: true,
    entries: ['./src/index.js']
  }).bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task("watch", ["browserify"], function() {
  gulp.watch("./src/*", ["browserify"])
});


gulp.task("default", ["watch"]);