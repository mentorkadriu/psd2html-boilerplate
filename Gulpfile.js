 var gulp = require("gulp"),
  sass = require("gulp-sass"),
  pug = require("gulp-pug"),
plumber = require("gulp-plumber"),
   inject = require("gulp-inject"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync");


gulp.task("sass", function(){
  return gulp.src("./src/scss/app.scss")
  .pipe(plumber())
  .pipe(sass())
    .pipe(autoprefixer('last 4 version'))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task("pug", function(){
  var target = gulp.src("./src/pug/**/!(_)*.pug");
  var resources = gulp.src([
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/normalize.css/normalize.css"
  ], {read: false});
  return target.pipe(inject(resources, {relative: true}))
  .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
  .pipe(gulp.dest("dist"))
  .pipe(browserSync.reload({stream:true}));
});

 gulp.task('scripts',function(){
   gulp.src('src/scripts/**/*.js')
     .pipe(gulp.dest('dist/js'))
     .pipe(browserSync.reload({stream:true, once: true}));
 });

 gulp.task("inject", function () {
   var target = gulp.src('./dist/index.html');
   var resources = gulp.src([
     "./node_modules/jquery/dist/jquery.min.js",
     "./node_modules/normalize.css/normalize.css"
   ], {read: false});

   return target.pipe(inject(resources, {relative: true}))
     .pipe(gulp.dest("./dist"))
 });

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['sass', 'scripts', 'pug', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("src/pug/**/*.pug", ['pug']);
    gulp.watch("src/scripts/*.js", ['scripts']);
});
