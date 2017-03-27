const fs = require('fs');
const gulp = require('gulp');

const browserify = require('browserify');
const vueify = require('vueify');

// Task: vueify
// Transform and bundle .js and .vue files
gulp.task('vueify', () => {
    return browserify('./client')
        .transform(vueify)
        .bundle()
        .pipe(fs.createWriteStream('./public/dist/bundle.js'));
});

gulp.task('watch', () => {
    gulp.watch('./client/*.js', ['vueify']);
    gulp.watch('./client/*.vue', ['vueify']);
});


// Task: build
// Build the necessary files
gulp.task('build', ['vueify']);