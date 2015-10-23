var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require("browserify");
var reactify = require('reactify');
var source = require('vinyl-source-stream');
 
gulp.task("default", function () {
  return gulp.src("./components/main.jsx")
    .pipe(babel())
    .pipe(gulp.dest("./public/build"));
});

gulp.task("browserify", ['default'], function () {
  return browserify("./public/build/main.js")
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("./public/build"));
});