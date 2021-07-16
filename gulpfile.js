"use strict"

const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const fileinclude = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite');

const stylesBuilding = () => {
	return src('./src/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed', }).on('error', notify.onError()))
		.pipe(rename({ suffix: '.min', }))
		.pipe(autoprefixer({ cascade: false, }))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./app/css/'))
		.pipe(browserSync.stream());
};

const htmlBuilding = () => {
	return src('./src/index.html')
		.pipe(fileinclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(dest('./app'))
		.pipe(browserSync.stream());
};

const imgToApp = () => {
	return src(['.src/img/**.png', './src/img/**.jpeg', './src/img/**.jpg'])
		.pipe(dest('./app/img'));
};

const videoToApp = () => {
	return src(['./src/video/**.mp4', './src/video/**.mpeg', './src/video/**.webm', './src/video/**.mpg', './src/video/**.avi', './src/video/**.mov'])
		.pipe(dest('.app/video'));
};

const resourcesToApp = () => {
	return src('./src/resources/**')
		.pipe(dest('./app/resources/'));
}

const svgToSprite = () => {
	return src('.src/img/**.svg')
		.pipe((svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			}
		})))
		.pipe(dest('/app/img/'));
};

const globalWatching = () => {
	browserSync.init({
		server: {
			baseDir: './app'
		}
	});
	watch('./src/scss/**/*.scss', stylesBuilding);
	watch('./src/index.html', htmlBuilding);
	watch('./src/img/**.jpg', imgToApp);
	watch('./src/img/**.jpeg', imgToApp);
	watch('./src/img/**.png', imgToApp);
	watch('./src/img/**.svg', svgToSprite);
	watch('./src/video/**.mp4', videoToApp);
	watch('./src/video/**.mpeg', videoToApp);
	watch('./src/video/**.webm', videoToApp);
	watch('./src/video/**.mpg', videoToApp);
	watch('./src/video/**.avi', videoToApp);
	watch('./src/video/**.mov', videoToApp);
	watch('./src/resources/**', resourcesToApp);
};

exports.stylesBuilding = stylesBuilding;
exports.htmlBuilding = htmlBuilding;
exports.imgToApp = imgToApp;
exports.svgToSprite = svgToSprite;
exports.videoToApp = videoToApp;
exports.globalWatching = globalWatching;

exports.default = series(htmlBuilding, stylesBuilding, imgToApp, svgSprite, videoToApp, globalWatching);