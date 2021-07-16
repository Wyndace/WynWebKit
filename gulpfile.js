const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// sourcemap, rename, autoprefixer, browser-sync 
const styles = () => {
	return src('./src/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed', }).on('error', notify.onError()))
		.pipe(rename({ suffix: '.min', }))
		.pipe(autoprefixer({ cascade: false, }))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./build/css/'))
;
}


exports.styles = styles;	