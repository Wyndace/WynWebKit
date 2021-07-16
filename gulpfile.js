"use strict"

const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const fileinclude = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');
const del = require('del')

const stylesPreBuilding = () => {
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

const imgPreBuilding = () => {
	return src(['.src/img/**.png', './src/img/**.jpeg', './src/img/**.jpg'])
		.pipe(dest('./app/img'));
};

const videoPreBuilding = () => {
	return src(['./src/video/**.mp4', './src/video/**.mpeg', './src/video/**.webm', './src/video/**.mpg', './src/video/**.avi', './src/video/**.mov'])
		.pipe(dest('.app/video'));
};

const resourcesPreBuilding = () => {
	return src('./src/resources/**')
		.pipe(dest('./app/resources'));
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
		.pipe(dest('/app/img'));
};

const fontsPreBuilding = () => {
	src('./src/fonts/**.ttf')
		.pipe(ttf2woff())
		.pipe(dest('./app/fonts'));
	return src('./src/fonts/**.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('./app/fonts'));
}

let initAttr = () => {
	let srcFonts = './src/scss/_fonts.scss';
	let appFonts = './app/fonts/';
	return [srcFonts, appFonts]
}

const cb = () => {}

const fontsStyle = (done) => {
	let pathArr = initAttr();
	let file_content = fs.readFileSync(pathArr[0]);
	fs.writeFile(pathArr[0], '', cb);
	fs.readdir(pathArr[1], function (err, items) {
		if (items) {
			let c_fontname;
			for (var i = 0; i < items.length; i++) {
				let fontname = items[i].split('.');
				fontname = fontname[0];
				if (c_fontname != fontname) {
					fs.appendFile(pathArr[0], `@include font-face("${fontname}", "${fontname}", 400);\r\n`, cb);
				}
				c_fontname = fontname;
			}
		}
	})

	done();
}

const cleaner = () => {
	return del(['./app/*'])
}

const globalWatching = () => {
	browserSync.init({
		server: {
			baseDir: './app'
		}
	});

	watch('./src/scss/**/*.scss', stylesPreBuilding);
	watch('./src/index.html', htmlBuilding);
	watch('./src/img/**.jpg', imgPreBuilding);
	watch('./src/img/**.jpeg', imgPreBuilding);
	watch('./src/img/**.png', imgPreBuilding);
	watch('./src/img/**.svg', svgToSprite);
	watch('./src/video/**.mp4', videoPreBuilding);
	watch('./src/video/**.mpeg', videoPreBuilding);
	watch('./src/video/**.webm', videoPreBuilding);
	watch('./src/video/**.mpg', videoPreBuilding);
	watch('./src/video/**.avi', videoPreBuilding);
	watch('./src/video/**.mov', videoPreBuilding);
	watch('./src/resources/**', resourcesPreBuilding);
	watch('./src/fonts/**.ttf', fontsPreBuilding);
	watch('./src/fonts/**.ttf', fontsStyle);
};

exports.stylesPreBuilding = stylesPreBuilding;
exports.htmlBuilding = htmlBuilding;
exports.imgPreBuilding = imgPreBuilding;
exports.svgToSprite = svgToSprite;
exports.videoPreBuilding = videoPreBuilding;
exports.fontsPreBuilding = fontsPreBuilding;
exports.fontsStyle = fontsStyle;
exports.cleaner = cleaner;
exports.globalWatching = globalWatching;

exports.default = series(cleaner, parallel(htmlBuilding, , fontsStyle, imgPreBuilding, svgToSprite, videoPreBuilding, resourcesPreBuilding), fontsPreBuilding, stylesPreBuilding, globalWatching);