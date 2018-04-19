var gulp = require('gulp');
var ts = require('gulp-typescript');
var path = require("path");
var fs = require("fs");
var nodemon = require('gulp-nodemon');
var cache = require('gulp-cached');
var watch = require('gulp-watch');

var tsProject = ts.createProject("./tsconfig.json");

var destination = './dist';

function compile(source, destination) {
    return gulp.src(source)
        .pipe(tsProject())
        .pipe(gulp.dest(destination));
}

function copy(source, destination) {
    return gulp.src(source)
        .pipe(gulp.dest(destination));
}

function srcToDest(source, extFrom = null, extTo = null) {
    var search = path.sep + "src" + path.sep + "app" + path.sep;
    var replace = path.sep + "dist" + path.sep + "app" + path.sep;
    var filePath = source.replace(search, replace);
    if (extFrom === null && extTo === null) return filePath;
    return filePath.replace(extFrom, extTo);
}

function watcher(event, file) {

    var extension = path.extname(file);
    var tsFile = extension === ".ts";
    var destination = (tsFile) ? srcToDest(file, ".ts", ".js") : srcToDest(file);

    if (event === "change" || event === "add") {
        (tsFile)
            ? compile(file, path.dirname(destination))
            : copy(file, destination)
    } else if (event === "unlink") {
        fs.unlinkSync(destination);
    }
}

gulp.task('compile', function () {
    return compile('./src/**/*.ts', destination);
});

gulp.task('watch', ['compile'], function () {
    var tsWatcher = watch('./src/**/*');
    tsWatcher.on('change', function (file) {
        var ext = path.extname(file);


        console.log(ext);

        console.log("File was changed \"" + file + "\"");
        var destPath = srcToDest(file, ".ts", ".js");
        return compile(file, path.dirname(destPath));
    });
    tsWatcher.on('unlink', function (file) {
        console.log("File was deleted \"" + file + "\"");
        var destPath = srcToDest(file, ".ts", ".js");
        fs.unlinkSync(destPath);
    });
    tsWatcher.on('add', function (file) {
        console.log("File was added \"" + file + "\"");
        var destPath = srcToDest(file, ".ts", ".js");
        return compile(file, path.dirname(destPath));
    });
    return tsWatcher;
});

gulp.task('copy-views', function () {

});

/*gulp.task('copy-views', function () {
 return gulp.src('./src/app/!**!/!*.pug')
 .pipe(cache('un_modified_views'))
 .pipe(gulp.dest('./dist/app'));
 });*/

/*gulp.task('copy-assets', function () {
 gulp.src('./src/app/!**!/!*.{css,jpg,png,js,scss,ttf,woff,eof,svg, pug}')
 .pipe(cache('un_modified_assets'))
 .pipe(gulp.dest('./dist/public'));
 });*/

/*gulp.task('watch-views', function () {
 var viewWatcher = gulp.watch('./src/app/!**!/!*.pug', ['copy-views']);

 // on file deletion.
 viewWatcher.on('change', function (event) {
 console.log(event);
 if (event.type === "deleted") {
 console.log("File " + event.path + " is deleted");
 }
 });

 return viewWatcher;
 });*/

gulp.task('dev', ['watch', 'watch-views'], function () {
    return nodemon({
        script: 'dist/app/server.js'
    }).on('restart', function () {
        console.log('restarted');
    });
});