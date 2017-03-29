const fs = require('fs');
const gulp = require('gulp');

const browserify = require('browserify');
const vueify = require('vueify');

// Task: vueify
// Transform and bundle .js and .vue files
gulp.task('vueify_app', () => {
    return browserify('./client/app')
        .transform(vueify)
        .bundle()
        .pipe(fs.createWriteStream('./public/dist/app_bundle.js'));
});

// Task: vueify
// Transform and bundle .js and .vue files
gulp.task('vueify_register', () => {
    return browserify('./client/register')
        .transform(vueify)
        .bundle()
        .pipe(fs.createWriteStream('./public/dist/register_bundle.js'));
});

// Task: vueify
// Transform and bundle .js and .vue files
gulp.task('vueify_password', () => {
    return browserify('./client/password')
        .transform(vueify)
        .bundle()
        .pipe(fs.createWriteStream('./public/dist/password_bundle.js'));
});

gulp.task('watch', () => {
    gulp.watch('./client/app/*.js', ['vueify_app']);
    gulp.watch('./client/app/*.vue', ['vueify_app']);
    gulp.watch('./client/register/*.js', ['vueify_register']);
    gulp.watch('./client/register/*.vue', ['vueify_register']);
    gulp.watch('./client/password/*.js', ['vueify_password']);
    gulp.watch('./client/password/*.vue', ['vueify_password']);
});


// Task: vueify
// Build the necessary files
gulp.task('vueify', ['vueify_app', 'vueify_register', 'vueify_password']);

// Task: build
// Build the necessary files
gulp.task('build', ['vueify']);