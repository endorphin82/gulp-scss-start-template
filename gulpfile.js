const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const rigger = require('gulp-rigger');

gulp.task('scss', () =>
  gulp
    .src(['src/scss/**/*.scss', '!src/scss/libs/*.*', '!src/scss/**/_*.*'])

    //min
    // .pipe(sass({ outputStyle: 'compressed' }))
    // .pipe(rename({ suffix: '.min' }))
    
    //NoMin
    .pipe(sass({ outputStyle: 'expanded' }))

    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('html', () =>
  gulp
    .src(['src/**/*.html', '!src/**/_*.*'])
    .pipe(rigger())
    //min
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({ stream: true }))
);
//add libs scripts
// gulp.task('js-libs', () =>
//   gulp
//     .src([
//       'node_modules/slick-carousel/slick/slick.js',
//       'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
//     ])
//     .pipe(concat('libs.js'))
//     //min
//     .pipe(uglify())
//     .pipe(rename({ suffix: '.min' }))

//     .pipe(gulp.dest('build/js'))
//     .pipe(browserSync.reload({ stream: true }))
// );

gulp.task('js', () =>
  gulp
    .src(['src/js/**/*.js', '!src/js/libs/*.*', '!src/js/**/_*.*'])
    .pipe(concat('main.js'))
    //min
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))

    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: 'build/'
    }
  });
});

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('src/**/*.html', gulp.parallel('html'));
  gulp.watch('src/js/**/*.js', gulp.parallel('js'));
});

gulp.task(
  'default',
  gulp.parallel('js', 'scss', 'html', /* 'js-libs',*/ 'browser-sync', 'watch')
);
