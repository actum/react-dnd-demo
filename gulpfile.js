const gulp = require('gulp');
const sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', () => {
    return gulp.src('src/style/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('watch', ['browserSync', 'sass'], () => {
    gulp.watch('src/style/*.scss', ['sass']);
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
});