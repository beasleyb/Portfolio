// ------------------------------------
// Required
// ------------------------------------

var browserSync 	= require('browser-sync').create();
var merge 			= require('merge-stream');
var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var uglify 			= require('gulp-uglify');
var autoprefixer	= require('gulp-autoprefixer');

// ------------------------------------
// Tasks
// ------------------------------------

// Compile, minify, and prefix custom scss
gulp.task('sass:custom', function () {
	return gulp
		.src('src/scss/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    	.pipe(gulp.dest('public/css'));
});

// Compile, minify, and prefix vendor scss
gulp.task('sass:vendor', function () {
	return gulp
		.src('src/scss/vendor/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    	.pipe(gulp.dest('public/css/vendor'));
});

// Copy files to public
gulp.task('copy', function() {
	var html = gulp
		.src('src/index.html')
		.pipe(gulp.dest('public'));

	var images = gulp
		.src('src/img/*.*')
		.pipe(gulp.dest('public/img'));

	return merge(html, images);
});

// Watch files
gulp.task('watch', function () {
	gulp.watch('src/scss/*.scss', ['sass:custom']);
	gulp.watch('src/scss/vendor/*.scss', ['sass:vendor']);
	gulp.watch('src/index.html', ['copy']);
});

// Default
gulp.task('default', ['sass:custom', 'sass:vendor', 'copy', 'watch']);