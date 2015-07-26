var gulp = require('gulp'),
  connect = require('gulp-connect'),
  watch = require('gulp-watch'),
	less = require('gulp-less'),
  swig = require('gulp-swig'),
  data = require('gulp-data'),
  fs = require('fs'),
	path = require('path'),
  rev = require('gulp-rev'),
  uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
  rjs = require('gulp-requirejs'),
  amdOptimize = require('amd-optimize'),
	concat = require('gulp-concat'),
  gutil = require('gulp-util'),
  minifyHTML = require('gulp-minify-html');


// Optimization

gulp.task('minifyHtmlTemplates', function() {
  var opts = {comments:false,spare:true};
  gulp.src('./public/js/app/templates/**/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./public/assets/dist/js/templates'));
});


// Compile LESS to CSS

gulp.task('less', function () {

  var l = less({paths: [ path.join(__dirname, 'less', 'includes') ]});
  l.on('error',function(e){
    gutil.log(e);
    l.end();
  });
  return gulp.src('./public/js/less/*.less')
    .pipe(l)
    .pipe(gulp.dest('./public/assets/css'));
});

// Requirejs Compile

gulp.task('compileJs', function(){

  rjs({
      baseUrl: './public/js/app/',
      out: 'musikdk.min.js',
      name: 'config',
      optimize: true,
      mainConfigFile: './public/js/app/config.js',
      paths: {
        io: "empty:"
      }
  })
  .pipe(uglify())
  .pipe(rev())
  .pipe(gulp.dest('./public/assets/dist/js'))
  .pipe(rev.manifest())
  .pipe(gulp.dest('.'));

});

// Minify CSS

gulp.task('minifyCss', function() {
  return gulp.src(['./public/assets/css/style.css', './public/assets/css/admin.css', './public/assets/css/smoothness/jquery-ui-1.10.4.custom.css', './public/assets/css/magnific-popup.css', './public/js/lib/select2/select2.css', './public/js/lib/select2/select2-bootstrap.css', './public/assets/css/trumbowyg/trumbowyg.css'])
    .pipe(minifyCSS({keepBreaks:false,keepSpecialComments:0}))
    .pipe(concat('musikdk.min.css'))
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/dist/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('.'));
});

gulp.task('initial-setup', function(){

  gulp.src(['views/*.html'])
    .pipe(swig())
    .pipe(gulp.dest('./public/'));

});

gulp.task('compileIndex', function(){

  var manifest = JSON.parse(fs.readFileSync('rev-manifest.json', 'utf8'));

  var opts = {};
  opts.css = manifest['musikdk.min.css'] || null;
  opts.js = manifest['musikdk.min.js'] || null;
  opts.is_production = (process.env.NODE_ENV === 'production') ? true : false;
  opts.base_url = '';

  return gulp.src('./views/index.html')
        .pipe(data(opts))
        .pipe(swig())
        .pipe(gulp.dest('./public/'));

});

// DEV Webserver
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: 'public',
    port: 3000,
    fallback: 'public/index.html'
  });
});

// Watcher
gulp.task('watch', function() {
  gulp.watch('./public/js/less/*.less', ['less']);
});
// LiveReload
gulp.task('livereload', function() {
  watch(['./public/assets/css/*.css', './public/js/app/**/*.js', './public/js/app/templates/**/*.html'])
    .pipe(connect.reload());
});

gulp.task('build', ['less', 'minifyCss', 'compileJs', 'minifyHtmlTemplates', 'compileIndex']);
gulp.task('default', ['initial-setup', 'webserver', 'livereload', 'watch']);

