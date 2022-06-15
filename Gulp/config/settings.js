// === Settings Config =============================================================================================================================================================================================================================================

// ==== Configs ====================================================================================================================================================================================================================================================

import path from "./path.js"

// =================================================================================================================================================================================================================================================================

// ==== Settings Object ================================================================================================================================================================================================================================================

const isProd = process.argv.includes("--production");
const isDev = !isProd;

export default {
    isProd: isProd,
    isDev: isDev,

    htmlFileInclude: {
        prefix: "@",
        basepath: "@file",
    },

    htmlMin: {
        collapseWhitespace: isProd
    },

    autoprefixer: {
        cascade: false
    },

    imageMin: {
        verbose: true
    },

    webpHtml: {
        logger: true,
        extensions: ['.jpg', '.png', '.jpeg'],
    },

    fonter: {
        formats: ["ttf"]
    },

    svgSprite: {
        mode: {
            stack: {
                sprite: "../sprite.svg",
            },
        }
    },

    webpack: {
        mode: isProd ? "production" : "development"
    },

    favicon: {
        masterPicture: path.favicon.src,
        dest: path.favicon.dest,
        iconsPath: "./favicon/",
        design: {
            ios: {
                pictureAspect: "backgroundAndMargin",
                backgroundColor: "#000000",
                margin: "11%",
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true,
                },
                appName: path.build,
            },
            desktopBrowser: {
                design: "raw",
            },
            windows: {
                pictureAspect: "whiteSilhouette",
                backgroundColor: "#000000",
                onConflict: "override",
                assets: {
                    windows80Ie10Tile: true,
                    windows10Ie11EdgeTiles: {
                        small: true,
                        medium: true,
                        big: true,
                        rectangle: true,
                    },
                },
                appName: path.build,
            },
            androidChrome: {
                pictureAspect: "noChange",
                themeColor: "#000000",
                manifest: {
                    name: path.build,
                    display: "standalone",
                    orientation: "notSet",
                    onConflict: "override",
                    declared: true,
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false,
                },
            },
            safariPinnedTab: {
                pictureAspect: "silhouette",
                themeColor: "#000000",
            },
        },
        settings: {
            scalingAlgorithm: "Bilinear",
            errorOnImageTooSmall: false,
            readmeFile: false,
            htmlCodeFile: false,
            usePathAsIs: false,
        },
        markupFile: path.favicon.dataFile,
    }
}

// =================================================================================================================================================================================================================================================================

// =================================================================================================================================================================================================================================================================
