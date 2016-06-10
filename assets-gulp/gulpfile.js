
/*!
 * gulp
 * $ 
 	npm install 
 		gulp 
	 	
	 	gulp-babel babel-preset-es2015
	 	gulp-browserify
	 	gulp-concat 
	 	gulp-uglify 
	 	gulp-jshint 


	 	gulp-compass
	 	gulp-cssmin

	 	

	 	gulp-ruby-sass 
	 	gulp-autoprefixer 
	 	gulp-cssnano 

	 	gulp-concat 
	 	
	 	gulp-imagemin 
	 	gulp-notify 
	 	gulp-rename 
	 	gulp-livereload 
	 	gulp-cache del 

 	--save-dev
 */

// Load plugins
const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');

const compass = require('gulp-compass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');




/*
=================================================================
 @ JS related tasks
=================================================================
*/



gulp.task('babel', () => {
	return gulp.src('src/app.js')
		.pipe(babel({presets: ['es2015']}))
		.pipe(gulp.dest('dist'));
});


gulp.task('browserify', function() {
	// Single entry point to browserify 
	gulp.src('src/js/app.js')
		.pipe(browserify({insertGlobals : true,debug : !gulp.env.production}))
		.pipe(gulp.dest('./build/js'))
});


gulp.task('concat-js', function() {
  return gulp.src(['bower_components/modernizr/modernizr.js',
                   'bower_components/jquery/dist/jquery.js',
                   'bower_components/bootstrap-sass/javascript/bootstrap.js',
                   'bower_components/momentjs/min/moment.min.js',
                   'bower_components/webfontloader/webfontloader.js',
                   'bower_components/retina.js/dist/retina.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('js/'));
});


gulp.task('compress', function() {
  return gulp.src('js/vendors.js')
    .pipe(uglify())
    .pipe(gulp.dest('js/'));
});


gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
});

gulp.task('script',['babel','concat-js','compress']);





/*
=================================================================
 @ CSS related tasks
=================================================================
*/

gulp.task('concat-css', function() {
  return gulp.src(['bower_components/fancybox/source/jquery.fancybox.css',
                   'bower_components/fancybox/source/helpers/jquery.fancybox-thumbs.css'])
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest('./css/'));
});


gulp.task('compass', function() {
  gulp.src('./sass/style.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'sass'
    }))
    .pipe(gulp.dest('./css/'));
});

gulp.task('cssmin', function () {
	gulp.src(['./css/style.css','./css/vendors.css'])
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./css/'));
});

gulp.task('image-min', () =>
    gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'))
);


gulp.task('styles',['compass', 'concat-css', 'cssmin']);



// // Styles
// gulp.task('styles', function() {
//   return sass('src/styles/main.scss', { style: 'expanded' })
//     .pipe(autoprefixer('last 2 version'))
//     .pipe(gulp.dest('dist/styles'))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(cssnano())
//     .pipe(gulp.dest('dist/styles'))
//     .pipe(notify({ message: 'Styles task complete' }));
// });

// // Scripts
// gulp.task('scripts', function() {
//   return gulp.src('src/scripts/**/*.js')
//     .pipe(jshint('.jshintrc'))
//     .pipe(jshint.reporter('default'))
//     .pipe(concat('main.js'))
//     .pipe(gulp.dest('dist/scripts'))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/scripts'))
//     .pipe(notify({ message: 'Scripts task complete' }));
// });

// // Images
// gulp.task('images', function() {
//   return gulp.src('src/images/**/*')
//     .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//     .pipe(gulp.dest('dist/images'))
//     .pipe(notify({ message: 'Images task complete' }));
// });

// // Clean
// gulp.task('clean', function() {
//   return del(['dist/styles', 'dist/scripts', 'dist/images']);
// });

// // Default task
// gulp.task('default', ['clean'], function() {
//   gulp.start('styles', 'scripts', 'images');
// });

// // Watch
// gulp.task('watch', function() {

//   // Watch .scss files
//   gulp.watch('src/styles/**/*.scss', ['styles']);

//   // Watch .js files
//   gulp.watch('src/scripts/**/*.js', ['scripts']);

//   // Watch image files
//   gulp.watch('src/images/**/*', ['images']);

//   // Create LiveReload server
//   livereload.listen();

//   // Watch any files in dist/, reload on change
//   gulp.watch(['dist/**']).on('change', livereload.changed);

// });