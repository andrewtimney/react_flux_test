var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require("browserify");
var reactify = require('reactify');
 var source = require('vinyl-source-stream');
 
gulp.task("default", function () {
  return gulp.src("./components/main.jsx")
    .pipe(babel())
    .pipe(gulp.dest("./"));
});

gulp.task("browserify", ['default'], function () {
  return browserify("main.js")
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("./"));
});