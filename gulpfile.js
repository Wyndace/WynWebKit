"use strict"

const { src, dest, series, parallel, task } = require('gulp');
const watch = require('gulp-watch')
const sass = require('gulp-sass')(require('sass'));
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const fileinclude = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite');
const ttf2woff2 = require('gulp-ttf2woff2');
const tinypng = require('gulp-tinypng-compress');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revDel = require('gulp-rev-delete-original');
const iconfont = require('gulp-iconfont')
const iconfontCSS = require('gulp-iconfont-css')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const fs = require('fs');
const del = require('del');
const gulpIf = require('gulp-if');
const realFavicon = require('gulp-real-favicon');

// let authKeys = JSON.parse(fs.readFileSync('./auth.json', 'utf-8'));
let isBuilding = false;
let buildDir = require('path').basename(__dirname)
const faviconDataFile = 'faviconData.json'

const building = (done) => {
	isBuilding = true;
	done();
}

const stylesBuilding = () => {
	return src('./src/scss/**/*.scss')
		.pipe(gulpIf(!isBuilding, sourcemaps.init()))
		.pipe(sass({ outputStyle: 'compressed', }).on('error', notify.onError()))
		.pipe(rename({ suffix: '.min', }))
		.pipe(autoprefixer({ cascade: false, }))
		.pipe(gulpIf(!isBuilding, sourcemaps.write('.')))
		.pipe(gulpIf(!isBuilding, dest('./app/css'), dest(`./${buildDir}/css`)))
		.pipe(gulpIf(!isBuilding, browserSync.stream()));
};

const htmlBuilding = () => {
	return src('./src/*.html')
		.pipe(fileinclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(gulpIf(!isBuilding, dest('./app'), dest(`./${buildDir}`)))
		.pipe(gulpIf(!isBuilding, browserSync.stream()));
};

const imgBuilding = () => {
	return src(['./src/img/**/*{png,jpeg,jpg,svg}'])
		.pipe(gulpIf(isBuilding, tinypng({
			key: '${authKeys.tinypng}',
		})))
		.pipe(gulpIf(!isBuilding, dest('./app/img'), dest(`./${buildDir}/img`)));
};


const videoBuilding = () => {
	return src(['./src/video/**/*{mp4,mpeg,webm,mpg,avi,mov}'])
		.pipe(gulpIf(!isBuilding, dest('./app/video'), dest(`./${buildDir}/video`)));
};
const resourcesBuilding = () => {
	return src('./src/resources/**')
		.pipe(gulpIf(!isBuilding, dest('./app/resources'), dest(`./${buildDir}/resources`)));
};

const svgToSpriteBuilding = () => {
	return src('./src/img/svg/**/*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			}
		}))
		.pipe(gulpIf(!isBuilding, dest('./app/img'), dest(`./${buildDir}/img`)));
};

const iconfontBuilding = () => {
	return src(['./src/img/fonts/**/*svg'])
		.pipe(iconfontCSS({
			fontName: 'test_font',
			targetPath: '../../src/scss/_iconfont.scss',
			fontPath: '../../fonts/'
		}))
		.pipe(iconfont({
			fontName: 'test_font',
			prependUnicode: true,
			formats: ['woff2'],
			normalize: true,
      fontHeight: 1001
		}))
		.pipe(gulpIf(!isBuilding, dest('./app/fonts'), dest(`./${buildDir}/fonts`)))
}

const fontsBuilding = () => {
	return src('./src/fonts/**/*ttf')
		.pipe(ttf2woff2())
		.pipe(gulpIf(!isBuilding, dest('./app/fonts'), dest(`./${buildDir}/fonts`)));
}

let initAttr = () => {
	let srcFonts = './src/scss/_fonts.scss';
	let appFonts = './app/fonts/';
	let buildFonts = `./${buildDir}/fonts/`;
	return [srcFonts, appFonts, buildFonts]
}

const weightCheker = (fontname) => {
	let weight = 400;
	switch (true) {
		case /Thin/.test(fontname):
			weight = 100;
			break;
		case /ExtraLight/.test(fontname):
			weight = 200;
			break;
		case /Light/.test(fontname):
			weight = 300;
			break;
		case /Regular/.test(fontname):
			weight = 400;
			break;
		case /Medium/.test(fontname):
			weight = 500;
			break;
		case /SemiBold/.test(fontname):
			weight = 600;
			break;
		case /Bold/.test(fontname):
			weight = 700;
			break;
		case /ExtraBold/.test(fontname):
			weight = 800;
			break;
		case /Black/.test(fontname):
			weight = 900;
			break;
	}
	return weight;
}

const fontsStyleBuilding = (done) => {
	let pathArr = initAttr();
	let file_content = fs.readFileSync(pathArr[0]);
	fs.writeFile(pathArr[0], '',() => {});
	fs.readdir(gulpIf(!isBuilding, pathArr[1], pathArr[2]), function (err, items) {
		if (items) {
			let c_fontname;
			for (var i = 0; i < items.length; i++) {
				let fontname = items[i].split('.');
				if (c_fontname != fontname[0]) {
					fs.appendFile(pathArr[0], `@include font-face("${fontname[0].split('-')[0]}", "${fontname[0]}", ${weightCheker(fontname)});\r\n`, () => {});
				}
				c_fontname = fontname[0];
			}
		}
	})

	done();
}

const scriptsBuilding = () => {
return src(
	['./src/js/global.js', './src/js/main.js', './src/js/vendor.js'])
	.pipe(fileinclude({
		prefix: 'fileInclude.',
		basepath: '@file'
	}))
	.pipe(gulpIf(!isBuilding, sourcemaps.init()))
	.pipe(gulpIf(isBuilding, uglify().on("error", notify.onError())))
	.pipe(gulpIf(!isBuilding, sourcemaps.write('.')))
	.pipe(gulpIf(!isBuilding, dest('./app/js'), dest(`./${buildDir}/js`)))
	.pipe(gulpIf(!isBuilding, browserSync.stream()));
}

const cleaner = () => {
	return gulpIf(!isBuilding, del(['./app/*']), del([`./${buildDir}/*`]));
}

const cachePreBuild = () => {
  return src('app/**/*.{css,js,svg,png,jpg,jpeg,woff2,mp4,mpeg,webm,mpg,avi,mov}', {
    base: 'app'})
    .pipe(rev())
    .pipe(revDel())
		.pipe(dest('./app'))
    .pipe(rev.manifest('rev.json'))
    .pipe(dest('./app'));
};

const rewritePreBuild = () => {
  const manifest = fs.readFileSync('app/rev.json');
	src('app/css/*.css')
		.pipe(revRewrite({
      manifest
    }))
		.pipe(dest('app/css'));
  return src('app/**/*.html')
    .pipe(revRewrite({
      manifest
    }))
    .pipe(dest('app'));
}

const cacheBuild = () => {
  return src(`${buildDir}/**/*.{css,js,svg,png,jpg,jpeg,woff2,mp4,mpeg,webm,mpg,avi,mov}`, {
    base: buildDir})
    .pipe(rev())
    .pipe(revDel())
		.pipe(dest(`./${buildDir}`))
    .pipe(rev.manifest('rev.json'))
    .pipe(dest(`./${buildDir}`));
};

const rewriteBuild = () => {
  const manifest = fs.readFileSync(`./${buildDir}/rev.json`);
	src(`./${buildDir}/css/*.css`)
		.pipe(revRewrite({
      manifest
    }))
		.pipe(dest(`${buildDir}/css`));
  return src(`${buildDir}/**/*.html`)
    .pipe(revRewrite({
      manifest
    }))
    .pipe(dest(`./${buildDir}`));
}

const faviconGenerator = (done) => {
	if (!isBuilding) {
		realFavicon.generateFavicon({
			masterPicture: `./src/favicon/${buildDir}.png`,
			dest: `./app/favicon/`,
			iconsPath: './favicon/',
			design: {
				ios: {
					pictureAspect: 'backgroundAndMargin',
					backgroundColor: '#000000',
					margin: '11%',
					assets: {
						ios6AndPriorIcons: false,
						ios7AndLaterIcons: false,
						precomposedIcons: false,
						declareOnlyDefaultIcon: true
					},
					appName: buildDir
				},
				desktopBrowser: {
					design: 'raw'
				},
				windows: {
					pictureAspect: 'whiteSilhouette',
					backgroundColor: '#000000',
					onConflict: 'override',
					assets: {
						windows80Ie10Tile: true,
						windows10Ie11EdgeTiles: {
							small: true,
							medium: true,
							big: true,
							rectangle: true
						}
					},
					appName: buildDir
				},
				androidChrome: {
					pictureAspect: 'noChange',
					themeColor: '#000000',
					manifest: {
						name: buildDir,
						display: 'standalone',
						orientation: 'notSet',
						onConflict: 'override',
						declared: true
					},
					assets: {
						legacyIcon: false,
						lowResolutionIcons: false
					}
				},
				safariPinnedTab: {
					pictureAspect: 'silhouette',
					themeColor: '#000000'
				}
			},
			settings: {
				scalingAlgorithm: 'Bilinear',
				errorOnImageTooSmall: false,
				readmeFile: false,
				htmlCodeFile: false,
				usePathAsIs: false
			},
			markupFile: faviconDataFile
		}, function() {
			done();
		})
	} else {
	realFavicon.generateFavicon({
		masterPicture: `./src/favicon/${buildDir}.png`,
		dest: `./${buildDir}/favicon/`,
		iconsPath: './favicon/',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#000000',
				margin: '11%',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				},
				appName: buildDir
			},
			desktopBrowser: {
				design: 'raw'
			},
			windows: {
				pictureAspect: 'whiteSilhouette',
				backgroundColor: '#000000',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: true,
					windows10Ie11EdgeTiles: {
						small: true,
						medium: true,
						big: true,
						rectangle: true
					}
				},
				appName: buildDir
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#000000',
				manifest: {
					name: buildDir,
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#000000'
			}
		},
		settings: {
			scalingAlgorithm: 'Bilinear',
			errorOnImageTooSmall: false,
			readmeFile: false,
			htmlCodeFile: false,
			usePathAsIs: false
		},
		markupFile: faviconDataFile
	}, function() {
		done();
	})}
};

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
const faviconInjector = () => {
	if (!isBuilding) {
	return src([ `./app/*.html` ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(faviconDataFile)).favicon.html_code))
		.pipe(dest('./app'))
	} else {
	return src([ `./${buildDir}/*.html` ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(faviconDataFile)).favicon.html_code))
		.pipe(dest(`./${buildDir}`))
		}
};

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(faviconDataFile)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});


const globalWatching = () => {
	browserSync.init({
		server: {
			baseDir: './app',
			
		}, open: false
	});

	watch('./src/scss/**/*.scss', stylesBuilding);
	watch('./src/**/*.html', htmlBuilding);
	watch('./src/img/**/*{jpg,jpeg,png,svg}', imgBuilding);
	watch('./src/video/**/*{mp4,mpeg,webm,mpg,avi,mov}', videoBuilding);
	watch('./src/img/fonts/**/*.svg', iconfontBuilding);
	watch('./src/resources/**', resourcesBuilding);
	watch('./src/fonts/**/*ttf', fontsBuilding);
	watch('./src/fonts/**/*ttf', fontsStyleBuilding);
	watch('./src/js/**/*.js', scriptsBuilding);
};

exports.default = series(cleaner, parallel(htmlBuilding, fontsBuilding, imgBuilding, svgToSpriteBuilding, videoBuilding, resourcesBuilding, scriptsBuilding), iconfontBuilding, fontsStyleBuilding, stylesBuilding, globalWatching);

exports.build = series(building, cleaner, faviconGenerator, parallel(htmlBuilding, fontsBuilding, svgToSpriteBuilding, videoBuilding, resourcesBuilding, scriptsBuilding), faviconInjector, iconfontBuilding, fontsStyleBuilding, stylesBuilding, cacheBuild, rewriteBuild);

exports.prebuild = series(cleaner, faviconGenerator, parallel(htmlBuilding, fontsBuilding, imgBuilding, svgToSpriteBuilding, videoBuilding, resourcesBuilding, scriptsBuilding), faviconInjector, iconfontBuilding, fontsStyleBuilding, stylesBuilding, cachePreBuild, rewritePreBuild);

exports.cache = series(cachePreBuild, rewritePreBuild);

exports.fonts = iconfontBuilding;