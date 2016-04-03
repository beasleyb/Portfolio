// ------------------------------------
// Required
// ------------------------------------

var gulp 	= require('gulp');
var sass 	= require('gulp-sass');
var uglify 	= require('gulp-uglify');

// ------------------------------------
// Tasks
// ------------------------------------

// Compile custom scss
gulp.task('sass:custom', function () {
	return gulp.src('src/_scss/*.scss')
		.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('src/css'));
});

// Compile vendor scss
gulp.task('sass:vendor', function () {
	return gulp.src('src/_scss/vendor/*.scss')
		.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('src/css/vendor'));
});

// Watch files
gulp.task('watch', function () {
	gulp.watch('src/_scss/*.scss', ['sass:custom']);
	gulp.watch('src/_scss/vendor/*.scss', ['sass:vendor']);
});

// Default task
gulp.task('default', ['sass:custom', 'sass:vendor', 'watch']);