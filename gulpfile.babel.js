import gulp from 'gulp';
import shell from 'gulp-shell';
import watch from 'gulp-watch';
import eslint from 'gulp-eslint';
import server from 'gulp-live-server';
import rimraf from 'rimraf';
import run from 'run-sequence';

const paths = {
  js: ['./src/**/*.js'],
  destination: './app'
};

gulp.task('default', cb => {
  run('server', 'build', 'watch', cb);
});

gulp.task('build', cb => {
  run('clean', 'lint', 'babel', 'restart', cb);
});

gulp.task('clean', cb => {
  rimraf(paths.destination, cb);
});

gulp.task('lint', function () {
  gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('babel', shell.task([
  'babel src --out-dir app'
]));

let express;

gulp.task('server', () => {
  express = server.new(paths.destination);
});

gulp.task('restart', () => {
  express.start.bind(express)();
});

gulp.task('watch', () => {
  return watch(paths.js, () => {
    gulp.start('build');
  });
});
