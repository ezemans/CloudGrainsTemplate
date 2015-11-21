var gulp = require('gulp');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var nib = require('nib');
var minify = require('gulp-minify-css');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var optimization = require('gulp-image-optimization');
var smoosher = require('gulp-smoosher');
var config = {
	html:{
		watch: './build/*html',
	},
	styles:{
		main: './src/stylus/main.styl',
		watch: './src/stylus/**/*.styl',
		output: './build/css'
	},
	scripts:{
		main: './src/javascript/main.js',
		watch: './src/javascript/**/*.js',
		output: './build/js'
	},
	images:{
		watch: ['./build/img/*jpg', './build/img/*png'],
		output: './dist/img'
	}
}

gulp.task('server', function(){
	gulp.src('./build')
		.pipe(webserver({
			host: '0.0.0.0',
			port: '8080',
			livereload: true
		}))
})

gulp.task('build:css', function(){
	gulp.src(config.styles.main)
		.pipe(stylus({
			use: nib
		}))
		.pipe(minify())
		.pipe(gulp.dest(config.styles.output))
})

gulp.task('build:js', function(){
	return browserify(config.scripts.main)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.output))
})

gulp.task('build:img', function(){
	gulp.src(config.images.watch)
		.pipe(optimization({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(config.images.output))
})

gulp.task('build:production', function(){
	gulp.src('./build/index.html')
		.pipe(smoosher())
		.pipe(gulp.dest('./dist'))
})

gulp.task('watch', function(){
	gulp.watch(config.styles.watch, ['build:css']);
	gulp.watch(config.scripts.watch, ['build:js']);
	gulp.watch(config.images.watch, ['build:img']);
	gulp.watch(config.html.watch, ['build:production']);
})

gulp.task('default', ['server', 'watch', 'build:css', 'build:js', 'build:img', 'build:production'])