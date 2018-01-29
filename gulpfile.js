let gulp = require('gulp');
let ts = require('gulp-typescript');

let tsProject = ts.createProject("./tsconfig.json");

let files = [
	'./src/*',
	'./src/**/*',
    './test/*',
    './test/**/*',
];

gulp.task('scripts', () => {
	return gulp.src(files)
	.pipe(tsProject())
	.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
	gulp.watch(files, ['scripts']);
});