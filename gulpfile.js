const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const runSequence = require('run-sequence');

//compile sass

gulp.task('sass', function() {
     return gulp.src(['src/scss/**/*.scss'])
     .pipe(sourcemaps.init())
     .pipe(sass())
     .pipe(autoprefixer({
       browsers: ['last 3 versions']
     }))
     .pipe(sourcemaps.write())
     .pipe(gulp.dest('src/css'))
     .pipe(browserSync.stream());
});


//move js files to src folder

gulp.task('js', function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
         .pipe(gulp.dest('src/js'))
         .pipe(browserSync.stream());
});

//watch sass and server

gulp.task('serve',['sass'], function() {
  browserSync.init({
    server: './src'
  });

  gulp.watch(['src/scss/*.scss'], ['sass']);
  gulp.watch(['src/*.html','src/js/*.js', 'src/scss/**/*.scss'], browserSync.reload);
});


//minify css files and move to dist
gulp.task('css', function(){
  return gulp.src('src/css/**/*.css')
  .pipe(cleanCss())
  .pipe(gulp.dest('dist/css'));
});



//minify js files and move to dist
gulp.task('uglify', function(){
  return gulp.src('src/js/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});




//copy img folder and move to dist
gulp.task('copy', function() {
      gulp.src('src/img/**/*.{jpg,jpeg,png,gif}')
      .pipe(gulp.dest('dist/img/'));
});





//minify html and move to dist
gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});



gulp.task('clean', function() {
  del('dist');
});



gulp.task('build', function() {
  runSequence('clean', ['css', 'uglify', 'copy', 'minify']);

});


//server for dist folder
gulp.task('servefordist', ['build'], function() {

  browserSync.init({
      server: './dist'
  });

});

gulp.task('default', ['js','serve']);