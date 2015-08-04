'use strict'

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/client.js')
             .pipe(webpack({
              output: {
                filename: 'bundle.js'
              }
             }))
             .pipe(gulp.dest('build/'));
});

gulp.task('copy', function(){
  return gulp.src('app/**/*.html')
             .pipe(gulp.dest('build/'));
});

gulp.task('test', function(){
  return gulp.src('test/*test.js')
             .pipe(mocha());
});

gulp.task('lint', function(){
  return gulp.src('*.js')
             .pipe(jshint())
             .pipe(jshint.reporter('default'));
});

gulp.task('default', ['lint','test'], function() {});
gulp.task('build', ['webpack:dev', 'copy']);
gulp.task('default', ['build']);


// watch breaks server requests
// gulp.task('watch', function() {
//   //gulp.watch('*.js', ['test', 'lint']);
//   gulp.watch('*.js', ['test']);
// });