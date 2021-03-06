// === IMG Task ===================================================================================================================================================================================================================================================

// ==== Plugins ====================================================================================================================================================================================================================================================

import gulp from "gulp"
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import imageMin from "gulp-imagemin";
import newer from "gulp-newer";
import webp from "gulp-webp";
import avif from "gulp-avif";

// =================================================================================================================================================================================================================================================================

// ==== Configs ====================================================================================================================================================================================================================================================

import path from "../config/path.js"
import settings from "../config/settings.js"

// =================================================================================================================================================================================================================================================================


// ==== IMG processing =============================================================================================================================================================================================================================================

const imgTask = () => {
    return gulp.src(path.img.avif)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "IMG TASK",
                message: error
            }))
        }))
        .pipe(newer(path.img.dest))
        .pipe(avif(settings.avif))
        .pipe(gulp.dest(path.img.dest))
        .pipe(gulp.src(path.img.src))
        .pipe(newer(path.img.dest))
        .pipe(webp(settings.webp))
        .pipe(gulp.dest(path.img.dest))
        .pipe(gulp.src(path.img.src))
        .pipe(newer(path.img.dest))
        .pipe(imageMin(settings.imageMin))
        .pipe(gulp.dest(path.img.dest))
};

// =================================================================================================================================================================================================================================================================

// ==== Exporting Task =============================================================================================================================================================================================================================================

export default imgTask;

// =================================================================================================================================================================================================================================================================

// =================================================================================================================================================================================================================================================================