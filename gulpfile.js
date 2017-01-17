const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('default', function() {
	return browserify({ entries: './frontend/init.jsx', debug: true })
		.transform("babelify")
		.bundle()
		.pipe(source('index.js'))
		.pipe(buffer())
		.pipe(gulp.dest('./public/js/'));
});
