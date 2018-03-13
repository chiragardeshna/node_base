var gulp = require('gulp');
var ts = require('gulp-typescript');
var path = require("path");

var tsProject = ts.createProject("./tsconfig.json");

var srcFiles = [
    // './src/*',
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
    gulp.watch(srcFiles)
        .on('change', function (event) {
            var file = event.path;
            var destination = path.dirname(event.path.replace("/src/", "/dist/").replace(".ts", ".js"));
            console.log('\x1b[42m', 'Changed --> ' + file);
            return gulp.src(file).pipe(tsProject()).pipe(gulp.dest(destination));
        });
});