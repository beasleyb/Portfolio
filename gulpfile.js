// --------------------------------------------
// Required
// --------------------------------------------

var browsersync		= require('browser-sync').create();
var merge 			= require('merge-stream');
var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var uglify 			= require('gulp-uglify');
var rename			= require('gulp-rename');
var autoprefixer	= require('gulp-autoprefixer');

// --------------------------------------------
// Browsersync
// --------------------------------------------

gulp.task('browsersync', function() {
	browsersync.init({
		server: {
			baseDir: 'public/'
		}
	});
});

// --------------------------------------------
// Sass
// --------------------------------------------

// Custom
gulp.task('sass:custom', function () {
	return gulp
		.src('src/scss/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('public/css'))
		.pipe(browsersync.reload({stream:true}));
});

// Vendor
gulp.task('sass:vendor', function () {
	return gulp
		.src('src/scss/vendor/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('public/css/vendor'))
		.pipe(browsersync.reload({stream:true}));
});

// --------------------------------------------
// Copy
// --------------------------------------------

gulp.task('copy', function() {
	var html = gulp
		.src('src/*.html')
		.pipe(gulp.dest('public'))
		.pipe(browsersync.reload({stream:true}));

	var images = gulp
		.src(['src/img/*.*', '!src/img/*.svg'])
		.pipe(gulp.dest('public/img'));

	return merge(html, images);
});

// --------------------------------------------
// Watch
// --------------------------------------------

gulp.task('watch', ['browsersync'], function () {
	gulp.watch('src/scss/*.scss', ['sass:custom']);
	gulp.watch('src/scss/vendor/*.scss', ['sass:vendor']);
	gulp.watch(['src/*.html', 'src/img/*.*'], ['copy']);
});

// --------------------------------------------
// Default
// --------------------------------------------

gulp.task('default', ['sass:custom', 'sass:vendor', 'copy', 'browsersync', 'watch']);