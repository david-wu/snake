var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');
var babelify = require('babelify');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var runSequence = require('run-sequence');

var paths = {
  scssDir: './src',
  htmlSrc: './index.html',
  browserifyEntryPoint: './src/app.js',
  buildDir: './dist/build',
  productionDir: './dist/production',
  jsFileName: 'build.js',
  cssFileName: 'style.css',
};


// Copies html and watches for changes
gulp.task('watchHtml', ['copyHTML'], function(){
    gulp.watch(paths.htmlSrc, ['copyHTML']);
});

gulp.task('copyHTML', function(){
  gulp.src(paths.htmlSrc)
    .pipe(gulp.dest(paths.buildDir))
    .pipe(gulp.dest(paths.productionDir));
});


// Builds .scss files, then watches for changes
gulp.task('watchScss', ['buildSass'], function(){
  gulp.watch([paths.scssDir + '/**/*.scss'], ['buildSass']);
});

gulp.task('buildSass', function(){
  return gulp.src(paths.scssDir + '/**/*.scss')
    .pipe(sass())
    .pipe(concatCss(paths.cssFileName))
    .pipe(minifyCss({keepBreaks:true}))
    .pipe(gulp.dest(paths.buildDir))
    .pipe(gulp.dest(paths.productionDir));
});


// Browserifies JS files and watches for changes
gulp.task('watchJs', function() {
  var watcher = watchify(browserify({
    entries: [paths.browserifyEntryPoint],
    transform: [babelify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }))

  return watcher.on('update', function(){
    runSequence('copyHTML');
    watcher
      .bundle(logErrorToHtml)
      .pipe(source(paths.jsFileName))
      .pipe(gulp.dest(paths.productionDir))
  })
    .bundle(logErrorToHtml)
    .pipe(source(paths.jsFileName))
    .pipe(gulp.dest(paths.productionDir));
});

// Log error text into the html
function logErrorToHtml(e){
  if(!e){return;}
  console.log(e.toString());
  var stream = source('index.html')
  stream.end(e.toString());
  stream
    .pipe(gulp.dest(paths.buildDir))
    .pipe(gulp.dest(paths.productionDir));
}

// Builds ugly JS
gulp.task('buildUglyJs', function(){
  browserify({
    entries: [paths.browserifyEntryPoint],
    transform: [babelify],
  })
    .bundle()
    .pipe(source(paths.jsFileName))
    .pipe(streamify(uglify(paths.jsFileName)))
    .pipe(gulp.dest(paths.buildDir));
});


gulp.task('default', ['watchHtml', 'watchJs', 'watchScss']);
gulp.task('build', ['copyHTML', 'buildUglyJs', 'buildSass']);

