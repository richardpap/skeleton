
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
var gulp       = require('gulp');
var fs         = require("fs");


const babel    = require('gulp-babel');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var jshint     = require('gulp-jshint');
var gulpBrowser = require("gulp-browser");


var compass    = require('gulp-compass');
var cssmin     = require('gulp-cssmin');
var rename     = require('gulp-rename');
var imagemin   = require('gulp-imagemin');
var versioning = require('gulp-version-tag');



/*
=================================================================
 @ JS related tasks
=================================================================
*/



gulp.task('babel', () => {
  return gulp.src('js/app-modules.es6')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('js'));
});


gulp.task('browser',function() {
      var stream = gulp.src('./js/app-modules.js')
          .pipe(gulpBrowser.browserify({
            transform: ['babelify'],
            presets: ['es2015']
          })) // gulp.browserify() accepts an optional array of tansforms
          .pipe(gulp.dest("./js/"));
      return stream;
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

gulp.task('script',['babel', 'browser', 'concat-js','compress']);





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


gulp.task('versioning-css', () => {
	gulp.src('./css/*.min.css')
	.pipe(versioning(__dirname,'./package.json'))
	.pipe(gulp.dest('./css'));
});


gulp.task('styles',['compass', 'concat-css', 'cssmin', 'versioning-css']);



