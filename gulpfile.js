'use strict';

// 引入gulp模块
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');

gulp.task('style', function() {
	gulp.src(['src/style/*.less', '!src/style/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('script', function() {
	gulp.src('src/script/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/script'))
		.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('image', function() {
	gulp.src('src/image/*.*')
		.pipe(gulp.dest('dist/image'))
		.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('html', function() {
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir: ['dist']
		}
	}, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });

  gulp.watch('src/style/*.less',['style']);
  gulp.watch('src/script/*.js',['script']);
  gulp.watch('src/image/*.*',['image']);
  gulp.watch('src/*.html',['html']);
});
