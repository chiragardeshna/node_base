var gulp = require('gulp');
var ts = require('gulp-typescript');
var path = require("path");
var fs = require("fs");
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');

//var tsProject = ts.createProject("./tsconfig.json");

var destination = './dist';
var extensions = ['ts'];
var assetExtensions = ['pug', 'css', 'jpg', 'png', 'js', 'scss'];

function compile(source, destination) {
    return gulp.src(source)
        .pipe(ts.createProject("./tsconfig.json")())
        .pipe(gulp.dest(destination));
}

function copy(source, destination) {
    return gulp.src(source)
        .pipe(gulp.dest(destination));
}

function srcToDest(source, extFrom = null, extTo = null) {
    var search = path.sep + "src" + path.sep;
    var replace = path.sep + "dist" + path.sep;
    var filePath = source.replace(search, replace);
    if (extFrom === null && extTo === null) return filePath;
    return filePath.replace(extFrom, extTo);
}

function process(event, file) {

    var extension = path.extname(file);
    var tsFile = extension === ".ts";
    var destination = (tsFile) ? srcToDest(file, ".ts", ".js") : srcToDest(file);

    if (event === "change" || event === "add") {
        return (tsFile)
            ? compile(file, path.dirname(destination))
            : copy(file, path.dirname(destination))
    } else if (event === "unlink") {
        return (fs.existsSync(destination)) ? fs.unlinkSync(destination) : null;
    }
}

gulp.task('compile', function () {
    return compile('./src/**/*.ts', destination);
});

gulp.task('copy', function () {
    return copy('./src/**/*.{' + assetExtensions.join(',') + '}', destination);
});

gulp.task('watch', ['compile', 'copy'], function () {

    var watcher = watch('./src/**/*.{' + extensions.concat(assetExtensions).join(',') + '}');

    watcher.on('add', function (file) {
        console.log("File was added \"" + file + "\"");
        return process("add", file);
    });

    watcher.on('change', function (file) {
        console.log("File was changed \"" + file + "\"");
        return process("change", file);
    });

    watcher.on('unlink', function (file) {
        console.log("File was deleted \"" + file + "\"");
        return process("unlink", file);
    });

    nodemon({
        script: 'dist/app/server.js'
    }).on('restart', function () {
        console.log('restarted');
    });

    return watcher;
});