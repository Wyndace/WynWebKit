// === svg2sprite Task ==============================================================================================================================================================================================================================================

// ==== Plugins ====================================================================================================================================================================================================================================================

import gulp from "gulp"
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import newer from "gulp-newer";
import svgSprite from "gulp-svg-sprite";

// =================================================================================================================================================================================================================================================================

// ==== Configs ====================================================================================================================================================================================================================================================

import path from "../config/path.js"
import settings from "../config/settings.js"

// =================================================================================================================================================================================================================================================================


// ==== SvgSprite processing =============================================================================================================================================================================================================================================

const svg2sprite = () => {
    return gulp.src(path.svg.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "SVG2SPRITE TASK",
                message: error
            }))
        }))
        .pipe(newer(path.svg.dest))
        .pipe(svgSprite(settings.svgSprite))
        .pipe(gulp.dest(path.svg.dest))
};

// =================================================================================================================================================================================================================================================================

// ==== Exporting Task =============================================================================================================================================================================================================================================

export default svg2sprite;

// =================================================================================================================================================================================================================================================================

// =================================================================================================================================================================================================================================================================