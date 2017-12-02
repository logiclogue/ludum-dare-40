const gulp = require("gulp");
const livescript = require("gulp-livescript");
const browserify = require("gulp-browserify");
const concat = require("gulp-concat");
const through = require("through2");
const addsrc = require("gulp-add-src");
const watch = require("gulp-watch");
const plumber = require("gulp-plumber");
const batch = require("gulp-batch");

gulp.task("js", () => {
    return gulp.src("src/*.ls")
        .pipe(through.obj((file, encoding, callback) => {
            console.log(file);
            callback(null, file);
        }))
        .pipe(plumber())
        .pipe(livescript())
        .pipe(browserify())
        .pipe(addsrc("node_modules/three/build/three.min.js"))
        .pipe(concat("index.js"))
        .pipe(gulp.dest("build"));
});

gulp.task("watch", () => {
    watch("src/*.ls", batch((events, done) => {
        gulp.start("js", done);
    }));
});

gulp.task("default", [ "watch" ]);
