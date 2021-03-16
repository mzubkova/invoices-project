const  { task, src, watch, dest } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const merge = require('merge-stream');
const gulp = require("gulp");
const ghPages = require("gulp-gh-pages");

sass.compiler = require('node-sass');

function scss() {
  return src('src/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(dest('dist/css'));
}

task('watch', () => {
  scss();
  watch('src/scss/**/*.scss', scss);
});

gulp.task("deploy", function () {
  return gulp.src("./dist/**/*").pipe(ghPages());
});