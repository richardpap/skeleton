
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


gulp.task('test', function() {
  console.log('hello');
});


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


gulp.task('concat', function() {
  return return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('compress', function() {
  return gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});


gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
});

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