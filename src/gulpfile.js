const fs = require('fs');
const browserify = require('browserify');
const vueify = require('vueify');
const babelify = require('babelify');
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

sass.compiler = require('node-sass');

function buildCss(cb) {
    return gulp.src('scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('../dist'));
}
function buildJS(cb) {
    return browserify('./index.js')
        .transform(vueify)
        .transform(babelify)
        .require('./vendor/vue/vue.js', {expose: 'vue'})
        .bundle()
        .pipe(fs.createWriteStream('../dist/main.js'));
}

buildCss.taskName = 'Build CSS';
buildJS.taskName = 'Build JS';

gulp.task('watch', function() {
    gulp.watch(['scss/**/*.scss'], buildCss);
    gulp.watch(['**/*.js', '**/*.vue', '!gulpfile.js'], buildJS);
})

exports.default = buildCss;