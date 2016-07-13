var gulp = require('gulp');

gulp.task('default', function() {
  return gulp
    .src('./node_modules/bootstrap/dist/css/*.min.css')
    .pipe(gulp.dest('./assets/compiled'));
});
