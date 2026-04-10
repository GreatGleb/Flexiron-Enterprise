const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const rename = require('gulp-rename');

const cssSrc = 'assets/css/admin/main.scss';
const cssDest = 'assets/css/admin/';

function buildCss() {
  return gulp.src(cssSrc)
    .pipe(postcss([postcssImport()]))
    .pipe(rename('main.css'))
    .pipe(gulp.dest(cssDest));
}

function watchCss() {
  gulp.watch('assets/css/admin/**/*.css', buildCss);
}

exports.buildCss = buildCss;
exports.watchCss = watchCss;
exports.default = buildCss;
