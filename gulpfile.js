const gulp        = require('gulp');
const shell       = require('gulp-shell');
const browserSync = require('browser-sync').create();
const uncss       = require('gulp-uncss');
const minifycss   = require('gulp-clean-css');

gulp.task('build', shell.task(['jekyll build --watch']));

gulp.task('serve', () => {
  browserSync.init({server: {baseDir: '_site/'}});
  gulp.watch('_site/**/*.*').on('change', browserSync.reload);

});

gulp.task('default', ['build', 'serve']); 

gulp.task('post', () => {
  return gulp.src('_site/css/main.css')
  .pipe(uncss({
    html: ['index.html', 'posts/**/*.html', '_includes/*.html', '_layouts/*.html' ]
  }))
  .pipe(minifycss())
  .pipe(gulp.dest('_site/css'));
});
