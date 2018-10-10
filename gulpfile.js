require('es6-promise').polyfill();

var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    rtlcss        = require('gulp-rtlcss'),
    autoprefixer  = require('gulp-autoprefixer'),
    plumber       = require('gulp-plumber'),
    gutil         = require('gulp-util'),
    rename        = require('gulp-rename'),
    concat        = require('gulp-concat'),
    jshint        = require('gulp-jshint'),
    uglify        = require('gulp-uglify'),
    useref        = require('gulp-useref'),
    imagemin      = require('gulp-imagemin'),
    browserSync   = require('browser-sync').create(),
    reload        = browserSync.reload;

var onError = function( err ) {
  console.log('An error occurred:', gutil.colors.magenta(err.message));
  gutil.beep();
  this.emit('end');
};

// Sass
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest('src/css'))

  .pipe(rtlcss())                     // Convert to RTL
  .pipe(rename({ basename: 'rtl' }))  // Rename to rtl.css
  .pipe(gulp.dest('src/css'));             // Output RTL stylesheets (rtl.css)
});

// JavaScript
gulp.task('js', function() {
  return gulp.src(['src/js/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(concat('app.js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('./js'));
});

// Images
gulp.task('images', function() {
  return gulp.src('./images/src/*')
  .pipe(plumber({ errorHandler: onError }))
  .pipe(imagemin({ optimizationLevel: 7, progressive: true }))
  .pipe(gulp.dest('./images/dist'));
});

gulp.task('useref', function(){
  return gulp.src('./*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Watch
gulp.task('watch', function() {
  browserSync.init({
    files: ['./**/*.php'],
    proxy: 'http://localhost:8888/toko/',
  });
  gulp.watch('src/scss/**/*.scss', ['sass', reload]);
  gulp.watch('src/js/**/*.js', ['js', reload]);
  gulp.watch('src/img/**/*.+(png|jpg|gif|svg)', ['images', reload]);
  gulp.watch('./*.php', browserSync.reload);
});

gulp.task('default', ['sass', 'js', 'images', 'watch']);
