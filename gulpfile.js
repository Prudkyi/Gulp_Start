// main module
import gulp from "gulp";
// import tracks
import { path } from "./gulp/config/path.js";
// task import
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";
// import generic plugins
import { plugins } from "./gulp/config/plugins.js";
// we transfer the value to the global variable
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

// watcher for changes in src files
function watcher() {
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svgSprive }

// sequential processing of fonts
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// specifying task performance scenarios
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// export scripts
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// execution of the task by default
gulp.task('default', dev);