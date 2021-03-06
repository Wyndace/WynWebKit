// === Video Task ==================================================================================================================================================================================================================================================

// ==== Plugins ====================================================================================================================================================================================================================================================

import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";

// =================================================================================================================================================================================================================================================================

// ==== Configs ====================================================================================================================================================================================================================================================

import path from "../config/path.js"
import settings from "../config/settings.js"

// =================================================================================================================================================================================================================================================================


// ==== video processing ===========================================================================================================================================================================================================================================

const videoTask = () => {
    return gulp.src(path.video.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "MOVER RESOURCES TASK",
                message: error
            }))
        }))
        .pipe(gulp.dest(path.video.dest))
};

// =================================================================================================================================================================================================================================================================

// ==== Exporting Task =============================================================================================================================================================================================================================================

export default videoTask;

// =================================================================================================================================================================================================================================================================

// =================================================================================================================================================================================================================================================================