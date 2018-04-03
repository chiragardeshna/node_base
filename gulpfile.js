var gulp = require('gulp');
var ts = require('gulp-typescript');
var path = require("path");
var nodemon = require('gulp-nodemon');
var cache = require('gulp-cached');

var tsProject = ts.createProject("./tsconfig.json");

gulp.task('compile', function () {
	return gulp.src('./src/**/*')
	.pipe(cache('un_modified'))
	.pipe(tsProject())
	.pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['compile'], function(){
	return gulp.watch('./src/**/*', ['compile']);
});

gulp.task('copy-views', function(){
	return gulp.src('./src/Resources/**/*')
    .pipe(cache('un_modified_views'))
    .pipe(gulp.dest('./dist/Resources'));
});

gulp.task('watch-views', function(){
   return gulp.watch('./src/Resources/**/*', ['copy-views']);
});

gulp.task('dev', ['watch', 'watch-views'], function(){
	return nodemon({
		script: 'dist/server.js'
	}).on('restart', function(){
		console.log('restarted');
	});
});