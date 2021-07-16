const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const fileinclude = require('gulp-file-include');

// sourcemap, rename, autoprefixer, browser-sync 
const stylesBuilding = () => {
	return src('./src/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed', }).on('error', notify.onError()))
		.pipe(rename({ suffix: '.min', }))
		.pipe(autoprefixer({ cascade: false, }))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./build/css/'))
		.pipe(browserSync.stream());
};


const htmlBuilding = () => {
	return src('./src/index.html')
		.pipe(fileinclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(dest('./build'))
		.pipe(browserSync.stream());
};

const globalWatching = () => {
	browserSync.init({
		server: {
			baseDir: './build'
		}
	})
	watch('./src/scss/**/*.scss', stylesBuilding);
	watch('./src/index.html', htmlBuilding);

};

exports.stylesBuilding = stylesBuilding;
exports.globalWatching = globalWatching;

exports.default = series(htmlBuilding, stylesBuilding, globalWatching)