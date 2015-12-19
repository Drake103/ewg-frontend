var gulp          = require('gulp');
var path          = require('path');
var browserSync   = require('browser-sync').create();
var jshint        = require('gulp-jshint');
var browserify    = require('browserify');
var source        = require('vinyl-source-stream');
var pkg           = require('./package.json');
var rename        = require('gulp-rename');
var babelify      = require('babelify');
var imagemin      = require('gulp-imagemin');
var sourcemaps    = require('gulp-sourcemaps');
var plumber       = require('gulp-plumber');
var autoprefixer  = require('gulp-autoprefixer');
var concat        = require('gulp-concat');
var gulpFilter    = require('gulp-filter');
var express       = require('express');
var stylus        = require('gulp-stylus');
var koutoSwiss    = require('kouto-swiss');
var rigger        = require('gulp-rigger');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './public',
    },
  });
});

gulp.task('static-server', function() {
  var app = express();
  app.use(express.static('./public'));
  var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
});

gulp.task('stylus:build', function() {

  gulp.src('./styles/index.styl')
      .pipe(stylus({
        paths: [path.join(__dirname, '/node_modules')],
        'include css': true,
        use: [koutoSwiss()],
        urlfunc: 'embedurl',
        linenos: true,
        define: {
          $version: pkg.version,
        },
      }))
      .pipe(rename('style.css'))
      .pipe(gulp.dest('./public/assets/'));
});

gulp.task('stylus:watch', function() {
  gulp.watch('./styles/**/*.styl', ['stylus:build']);
});

gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('images:build', function() {
  gulp.src('./images/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./public/images'));
});

gulp.task('images:watch', function() {
  gulp.watch('./images/**/*', ['images:build']);
});

gulp.task('js:lint', function() {
  gulp.src('/app/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('js:build', function() {
  var bundle = browserify({
    entries: ['./app/index.js'],
    paths: ['./node_modules'],
    debug: true,
  });

  bundle.transform(babelify, { presets: ['es2015'] });
  bundle.require('./app/config/client.js', { expose: 'config' });

  bundle.bundle()
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(source('script.js'))
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('js:watch', function() {
  gulp.watch('./app/**/*.js', ['js:build']);
});

gulp.task('html:build', function() {
  gulp.src(['./app/**/*.html'])
      .pipe(rigger())
      .on('error', console.log)
  .pipe(gulp.dest('./public'));
});

gulp.task('html:watch', function() {
  gulp.watch('./app/**/*.html', ['html:build']);
});

gulp.task('watch', ['images:watch', 'js:watch', 'stylus:watch', 'html:watch']);

gulp.task('default', ['images:build', 'js:build', 'stylus:build', 'html:build', 'fonts']);

gulp.task('serve', ['default', 'static-server', 'watch']);
