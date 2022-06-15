// === Fonts Task ==================================================================================================================================================================================================================================================

// ==== Plugins ====================================================================================================================================================================================================================================================

import gulp from "gulp"
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import newer from "gulp-newer";
// import fonter from "gulp-fonter" // for windows
import fonter from "gulp-fonter-fix"; // for other os
import ttf2woff2 from "gulp-ttf2woff2";

// =================================================================================================================================================================================================================================================================

// ==== Configs ====================================================================================================================================================================================================================================================

import path from "../config/path.js"
import settings from "../config/settings.js"

// =================================================================================================================================================================================================================================================================


// ==== Fonts processing ===========================================================================================================================================================================================================================================

const fontsTask = () => {
    return gulp.src(path.fonts.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "FONTS TASK",
                message: error
            }))
        }))
        .pipe(newer(path.src + '/fonts'))
        .pipe(fonter(settings.fonter))
        .pipe(gulp.dest(path.src + '/fonts'))
        .pipe(gulp.src(path.fonts.srcTTF))
        .pipe(newer(path.fonts.dest))
        .pipe(ttf2woff2())
        .pipe(gulp.dest(path.fonts.dest))
};

// =================================================================================================================================================================================================================================================================

// ==== Exporting Task =============================================================================================================================================================================================================================================

export default fontsTask;

// =================================================================================================================================================================================================================================================================

// =================================================================================================================================================================================================================================================================