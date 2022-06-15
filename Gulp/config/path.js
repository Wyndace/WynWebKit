// === Path Config =================================================================================================================================================================================================================================================

// ==== Plugins ====================================================================================================================================================================================================================================================

import path from "path"

// =================================================================================================================================================================================================================================================================

const isProd = process.argv.includes("--production");

// ==== Constant Paths =============================================================================================================================================================================================================================================

const pathSrc = "./src";
const pathDest = "./app";
const pathBuildDest = path.basename(path.resolve());

// =================================================================================================================================================================================================================================================================

// ==== Path Object ================================================================================================================================================================================================================================================

export default {
    root: isProd ? pathBuildDest : pathDest,
    src: pathSrc,
    build: pathBuildDest,

    html: {
        src: pathSrc + "/*.html",
        watch: pathSrc + "/**/*.html",
        dest: isProd ? pathBuildDest : pathDest,
    },

    scss: {
        src: pathSrc + "/scss/*.{sass,scss}",
        watch: pathSrc + "/scss/**/*.{sass,scss}",
        dest: isProd ? pathBuildDest + '/css' : pathDest + '/css',
    },

    img: {
        src: pathSrc + "/img/img/**/*.{png,jpeg,jpg,webp,svg,gif}",
        watch: pathSrc + "/img/img/**/*.{png,jpeg,jpg,webp,svg,gif}",
        dest: isProd ? pathBuildDest + '/img/' : pathDest + '/img/',
    },

    fonts: {
        src: pathSrc + "/fonts/*.{ttf,otf,woff,woff2,svg,ttc,otc,eot}",
        srcTTF: pathSrc + "/fonts/*.ttf",
        watch: pathSrc + "/fonts/*.{ttf,otf,woff,woff2,svg,ttc,otc,eot}",
        dest: isProd ? pathBuildDest + '/fonts' : pathDest + '/fonts',
    },

    resources: {
        src: pathSrc + "/resources/**/*",
        watch: pathSrc + "/resources/**/*",
        dest: isProd ? pathBuildDest  + '/resources' : pathDest + '/resources',
    },

    video: {
        src: pathSrc + "/video/**/*.{mp4,mpeg,webm,mpg,avi,mov}",
        watch: pathSrc + "/video/**/*.{mp4,mpeg,webm,mpg,avi,mov}",
        dest: isProd ? pathBuildDest + '/video' : pathDest + '/video',
    },

    svg: {
        src: pathSrc + "/img/svg/**/*.svg",
        watch: pathSrc + "/img/svg/**/*.svg",
        dest: isProd ? pathBuildDest : pathDest + '/img',
    },

    favicon: {
        src: pathSrc + `/favicon/favicon.png`,
        dest: isProd ? pathBuildDest + '/favicon' : pathDest + '/favicon',
        dataFile: 'faviconData.json'
    },

    js: {
        src: pathSrc + `/js/`,
        watch: pathSrc + "/js/**/*.js",
        dest: isProd ? pathBuildDest + '/js' : pathDest + '/js',
    }
}

// =================================================================================================================================================================================================================================================================

// =================================================================================================================================================================================================================================================================
