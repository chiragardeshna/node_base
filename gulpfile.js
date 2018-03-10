var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject("./tsconfig.json");

var srcFiles = [
    './src/*',
    './src/**/*'
    /*'./test/!*',
    './test/!**!/!*',*/
];

gulp.task('scripts', function () {
    return gulp.src(srcFiles)
        .pipe(tsProject())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], function () {
    gulp.watch(srcFiles, ['scripts']);
});