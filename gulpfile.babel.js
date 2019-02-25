'use strict';

import fs from 'fs';
import path from 'path';
import del from 'del';
import vfs from 'vinyl-fs';
import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
const $ = plugins({
  pattern: ['gulp-*']
});

// base directories, paths, etc.
const SRC = 'app';
const DEST = 'build';
const PATHS = {
    // server
    app: {
        src: path.join(SRC, 'index.js'),
        dest: DEST
    },
    common: {
      src: path.join(SRC, 'common/**/*.js'),
      dest: path.join(DEST, 'common')
    },
    models: {
        src: path.join(SRC, 'models/**/*.js'),
        dest: path.join(DEST, 'models')
    },
    controllers: {
        src: path.join(SRC, 'controllers/**/*.js'),
        dest: path.join(DEST, 'controllers')
    },
    routes: {
        src: path.join(SRC, 'routes/**/*.js'),
        dest: path.join(DEST, 'routes')
    },
    seeds: {
        src: path.join(SRC, 'seeds/**/*.js'),
        dest: path.join(DEST, 'seeds')
    },
    config: {
        src: path.join(SRC, 'config/**/*.js'),
        dest: path.join(DEST, 'config')
    }
};

// commonly used sets pertaining to tasks
// set of all keys of PATHS
const ALL = new Set(Object.keys(PATHS));
// server-related set
const SERVER = new Set(ALL);
// set of things that need to be transpiled
const TRANSPILE = new Set(SERVER);

// default task is the same as serve
gulp.task('default', ['serve']);
// start express server and reload when server-side files change
gulp.task('serve', ['set_env', 'watch'], () =>
  $.nodemon({
    script: path.join(DEST, 'index.js'),
    watch: path.join(DEST, '**/*.js'),
    ignore: path.join(DEST, 'static')
  })
);

gulp.task('set_env', () => {
  process.env.NODE_ENV = 'development';
});

// watch all source files for changes
gulp.task('watch', ['build'], () => {
  for (const task of ALL) {
    // tanspile tasks
    if (TRANSPILE.has(task)) gulp.watch(PATHS[task].src, [`transpile:${task}`]);
    // add some delay for images
    else gulp.watch(PATHS[task].src, [task]);
  }
  // also lint this gulpfile on save
  gulp.watch('gulpfile.babel.js');
});

// build everything
gulp.task('build', ['build:server']);
// build server-side files
gulp.task('build:server', ['transpile']);

// create transpile tasks for server scripts
for (const task of TRANSPILE) {
  gulp.task(`transpile:${task}`, () =>
    gulp.src(PATHS[task].src)
      .pipe($.changed(PATHS[task].dest))
      .pipe($.babel())
      .pipe(gulp.dest(PATHS[task].dest))
      .pipe($.print(fp => `transpiled: ${fp}`))
  );
}
// transpile everything!
gulp.task('transpile', [...TRANSPILE].map(el => `transpile:${el}`));

// symlink package.json and node_modules to destination
gulp.task('ln', () =>
  vfs.src(['package.json', 'node_modules'], {
    followSymlinks: false
  })
  .pipe(vfs.symlink(DEST))
    // .pipe($.print(fp => `symlink: ${fp}`))
);

// create clean tasks
for (const task of ALL) {
  gulp.task(`clean:${task}`, () => del([PATHS[task].dest]));
}
// clean everything!
gulp.task('clean', () => del([DEST]));

// clear cache
gulp.task('clear', done => $.cache.clearAll(done));

// show all tasks
gulp.task('tasks', $.taskListing);