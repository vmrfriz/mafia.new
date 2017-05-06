var gulp						= require('gulp'),
	less							= require('gulp-less'),
	browserSync				= require('browser-sync'),
	concat						= require('gulp-concat'),
	uglify						= require('gulp-uglifyjs')
	cssnano						= require('gulp-cssnano'),
	rename						= require('gulp-rename'),
	del								= require('del'),
	imagemin					= require('gulp-imagemin'),
	pngquant					= require('imagemin-pngquant'),
	cache							= require('gulp-cache'),
	autoprefixer			= require('gulp-autoprefixer'),
	uncss							= require('gulp-uncss'),
	//sourcemaps			= require('gulp-sourcemaps'),
	concatCss					= require('gulp-concat-css');

/*---------- Конкатенация, компиляция и минификация LESS ----------*/
gulp.task('less', function(){
	return gulp.src('app/less/**/*.less')
		.pipe( less() )
		.pipe( autoprefixer(['last 2 versions'], { cascade: true }) )
		.pipe( cssnano() )
		.pipe( rename({suffix: '.min'}) )
		.pipe( gulp.dest('app/css') )
		.pipe( browserSync.reload({ stream: true }) );
});

/*---------- BrowserSync ----------*/
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});

/*---------- Scripts ----------*/
gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

/*---------- Watch ----------*/
gulp.task('watch', ['browser-sync', 'less', 'scripts'], function(){
	gulp.watch('app/less/**/*.less', ['less']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

/*===============================
------------- BUILD -------------
===============================*/

/*---------- Удаление папки dist ----------*/
gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

/*---------- Оптимизация изображений ----------*/
gulp.task('img', function() {
	return gulp.src('app/img/**/*') // Берем все изображения из app
		.pipe( cache( imagemin({ // Сжимаем их с наилучшими настройками
					interlaced: true,
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					use: [pngquant()]
		}) ) )
		.pipe( gulp.dest('dist/img') ); // Выгружаем на продакшен
});

/*---------- Build ----------*/
gulp.task('build', ['clean', 'img', 'less', 'scripts'], function() {

	var buildCss = gulp.src('app/css/**/*')
		.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

	var buildPhp = gulp.src('app/**/*.php')
		.pipe(gulp.dest('dist'));

	var buildPhp = gulp.src('app/**/*.ico')
		.pipe(gulp.dest('dist'));

});