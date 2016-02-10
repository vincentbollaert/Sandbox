(function() {
    'use strict';

    var gulp = require('gulp');
    var sourcemaps = require('gulp-sourcemaps');
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');

    var sass = require('gulp-sass');
    var minifyCss = require('gulp-minify-css');
    var autoPrefixer = require('gulp-autoprefixer');

    var babel = require('gulp-babel');
    var jshint = require('gulp-jshint');
    var jshintStylish = require('jshint-stylish');

    var Server = require('karma').Server;

    var del = require('del');
    var runSequence = require('run-sequence');
    var argv = require('yargs').argv;
    var gulpif = require('gulp-if');
    var rename = require('gulp-rename');
    var browserSync = require('browser-sync');

    var gulpNgConfig = require('gulp-ng-config');
    var env = process.env.NODE_ENV || 'dev';


    var config = {
        src: {
            site: '../Sandbox',
            js: [
                'scripts/**/*.js',
                '!scripts/dist/*.js',
            ],
            vendor: [
                'bower_components/angular/angular.js',
                'bower_components/angular-route/angular-route.js',
                'bower_components/angular-animate/angular-animate.js',
                'bower_components/angular-local-storage/dist/angular-local-storage.js',
                'bower_components/angular-messages/angular-messages.js',
                'bower_components/angular-loading-bar/src/loading-bar.js',
            ],
            images: [
                'assets/images/**/*',
            ],
            fonts: [
                'assets/font/**/*',
            ],
            scss: [
                'assets/scss/**/*.scss',
            ],
            css: [
                'assets/css/**/*'
            ],
            assets: [
                'assets/**/*'
            ],
            views: [
                'views/**/*.html'
            ],
            dist: [
                'views/**/*',
                '*.html',
                'assets/**/*',
                'scripts/dist/**/*',
                '*.ico',
                '*.config'
            ]
        },
        dest: {
            js: 'scripts/dist/',
            css: 'assets/css/',
            scss: 'assets/css/',
            builds: 'builds/' + env,
            qa: {
                dest: 'builds/qa/',
                assets: 'builds/qa/assets/',
                views: 'builds/qa/views/',
                js: 'builds/qa/scripts/dist',
                css: 'builds/qa/assets/css'
            },
            stag: {
                dest: 'builds/stag/',
                assets: 'builds/stag/assets/',
                views: 'builds/stag/views/',
                js: 'builds/stag/scripts/dist/',
                css: 'builds/stag/assets/css'
            }
        }
    };

    //
    // Main tasks
    //

    gulp.task('test', (done) => {
        new Server({
            configFile: 'karma.conf.js',
            singleRun: true
        }, done).start();
    });

    gulp.task('serve', function() {
        return runSequence(
            [
                'serve.site',
                'vendor',
                'scripts',
                'sass',
                'watch'
            ]
        );
    });

    gulp.task('watch', () => {
        gulp.watch(config.src.js, ['scripts', 'jshint']);
        gulp.watch(config.src.scss, ['sass']);
        gulp.watch(
            [
                config.src.js,
                config.src.scss,
                config.src.fonts,
                config.src.views,
                config.src.css
            ],
            browserSync.reload
        );
    });

    gulp.task('dist', ['scripts'], () => {
        return runSequence(
                'dist.clean',
                'scripts',
                'vendor',
                'sass',
                'dist.copy'
        );
    });

    gulp.task('createConfig', () => {
        gulp.src('configFile.json')
        .pipe(gulpNgConfig('webapp.config', {
            environment: env
        }))
        .pipe(gulp.dest('scripts/'));
    });

    gulp.task('default', ['scripts', 'vendor']);

    gulp.task('dist.clean', (cb) => {
        return del(config.dest.builds, cb);
    });

    gulp.task('dist.copy', () => {
        return gulp.src(config.src.dist, {
            base: "../Sandbox"
        })
        .pipe(gulp.dest(config.dest.builds));
    });

    gulp.task('serve.site', () => {
        browserSync({
            server: {
                baseDir: config.src.site
            }
        });
    });


    gulp.task('scripts', () => {
        return gulp.src(config.src.js)
            .pipe(sourcemaps.init())
            .pipe(babel())
            .pipe(concat('scripts.min.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.dest.js));
    });

    gulp.task('jshint', () => {
        return gulp.src(config.src.js)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter(jshintStylish));
    });

    gulp.task('vendor', () => {
        return gulp.src(config.src.vendor)
            .pipe(concat('vendor.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(config.dest.js));
    });

    gulp.task('sass', () => {
        return gulp.src(config.src.scss)
            .pipe(sass({
                sass: true,
                sourcemap: true,
                style: 'compressed'
            }))
            .pipe(autoPrefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(minifyCss())
            .pipe(gulp.dest(config.dest.scss));
    });

})();
