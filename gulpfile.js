// --------------------------------------------
// Required
// --------------------------------------------

var browsersync		= require('browser-sync').create();
var merge 			= require('merge-stream');
var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var concat			= require('gulp-concat');
var uglify 			= require('gulp-uglify');
var rename			= require('gulp-rename');
var autoprefixer	= require('gulp-autoprefixer');

// --------------------------------------------
// File paths
// --------------------------------------------

var jsFiles	= {
	source: 'src/js/*.js',
	dest: 'public/js'
};

var scssFiles = {
	customSource: 'src/scss/*.scss',
	customDest: 'public/css',
	venderSource: 'src/scss/vendor/*.scss',
	vendorDest: 'public/css/vendor'
};

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
// Scripts
// --------------------------------------------

gulp.task('scripts', function() {  
    return gulp
    	.src(jsFiles.source)
        .pipe(concat('beasley.min.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(jsFiles.dest))
        .pipe(browsersync.reload({stream:true}));
});

// --------------------------------------------
// Sass
// --------------------------------------------

// Custom
gulp.task('sass:custom', function () {
	return gulp
		.src(scssFiles.customSource)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest(scssFiles.customDest))
		.pipe(browsersync.reload({stream:true}));
});

// Vendor
gulp.task('sass:vendor', function () {
	return gulp
		.src(scssFiles.vendorSource)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest(scssFiles.vendorDest))
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
	gulp.watch(jsFiles.source, ['scripts']);
	gulp.watch(scssFiles.customSource, ['sass:custom']);
	gulp.watch(scssFiles.vendorSource, ['sass:vendor']);
	gulp.watch(['src/*.html', 'src/img/*.*'], ['copy']);
});


// --------------------------------------------
// Default
// --------------------------------------------

gulp.task('default', ['scripts', 'sass:custom', 'sass:vendor', 'copy', 'browsersync', 'watch']);