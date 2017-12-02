const gulp = require("gulp");
const livescript = require("gulp-livescript");
const browserify = require("gulp-browserify");
const concat = require("gulp-concat");
const through = require("through2");
const addsrc = require("gulp-add-src");

gulp.task("js", () => {
    return gulp.src("src/*.ls")
        .pipe(livescript())
        .pipe(browserify())
        .pipe(addsrc("node_modules/three/build/three.min.js"))
        .pipe(through.obj((file, encoding, callback) => {
            console.log(file);
            callback(null, file);
        }))
        .pipe(concat("index.js"))
        .pipe(gulp.dest("build"));
});

gulp.task("default", [ "js" ]);
