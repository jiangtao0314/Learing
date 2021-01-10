const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const csso = require('gulp-csso');
var uglify = require('gulp-uglify');


//压缩html
gulp.task('htmlmin', () => {
    return gulp.src('./src/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist/html'));
  });
 
  //css
  gulp.task('cssmin', () => {
      return gulp.src('./src/css/*.css')
      .pipe(csso())
      .pipe(gulp.dest('dist/css'));
  });

  //js
  gulp.task('jsmin', () => {
        return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
  });
  gulp.task('copy' , (done) => {
    gulp.src('./src/images/*')
        .pipe(gulp.dest('dist/images'))
    gulp.src('./src/upload/*')
        .pipe(gulp.dest('dist/upload'))
    done();
  })

gulp.task('default',gulp.series(['htmlmin','cssmin','jsmin','copy']));