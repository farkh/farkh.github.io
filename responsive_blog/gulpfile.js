var gulp          = require('gulp'),
    minifycss     = require('gulp-clean-css'),
    sass          = require('gulp-sass'),
    browserSync   = require('browser-sync'),
    reload        = browserSync.reload,
    autoprefixer  = require('gulp-autoprefixer'),
    plumber       = require('gulp-plumber'),
    del           = require('del'),
    rename        = require('gulp-rename'),
    imagemin      = require('gulp-imagemin'),
    sourcemaps    = require('gulp-sourcemaps');

// ///////////////////////////////////////////////
// paths
// //////////////////////////////////////////////

var paths = {
  scss    :[ 'src/scss/*.scss' ],
  css     :[ 'src/css/' ],
  html    :[ 'src/*.html' ],
  build   :[ 'build/' ],
  src     :[ 'src/' ]
};

// ///////////////////////////////////////////////
// Default Task
// //////////////////////////////////////////////

gulp.task('default', ['watch', 'browserSync','styles','html', 'imagemin']);

// ///////////////////////////////////////////////
// For SASS and CSS
// //////////////////////////////////////////////
gulp.task('styles',function(){
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(autoprefixer('last 20 versions'))
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(''+paths.css+''))
    .pipe(reload({stream:true}));
});

// ///////////////////////////////////////////////
// HTML
// //////////////////////////////////////////////
gulp.task('html', function(){
  return gulp.src(paths.html)
    .pipe(reload({stream:true}));
});

// ///////////////////////////////////////////////
// Images
// //////////////////////////////////////////////

gulp.task('imagemin', function() {
  gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

// ///////////////////////////////////////////////
// Browser-Sync
// //////////////////////////////////////////////
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: paths.src
    }
  });
});

// ///////////////////////////////////////////////
// Assembly Tasks
// //////////////////////////////////////////////

// Creating build/
gulp.task('build:create', function(){
  return gulp.src(paths.src+'**/*')
    .pipe(gulp.dest(''+paths.build+''));
});

// Cleaning build/
gulp.task('build:clean',['build:create'], function(){
  return del(['build/bower_components/',
              'build/scss/',
              'build/css/!(*.min.css)',
              'build/js/!(*.min.js)'
            ]);
});

// Preview Tasks
gulp.task('build:start', function() {
  browserSync({
    server: {
      baseDir: paths.build
    }
  });
});

// Deleting build/
gulp.task('build:delete', function(res){
  return del([paths.build+'/**'], res);
});

// build
gulp.task('build', ['build:create', 'build:clean']);

// ///////////////////////////////////////////////
// Watcher
// //////////////////////////////////////////////
gulp.task ('watch', function(){
  gulp.watch(paths.scss, ['styles']);
  gulp.watch(paths.html, ['html']);
});
