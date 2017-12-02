const gulp = require("gulp");
const livescript = require("gulp-livescript");
const browserify = require("gulp-browserify");
const concat = require("gulp-concat");

gulp.task("js", () => {
    return gulp.src("src/*.ls")
        .pipe(livescript())
        .pipe(browserify())
        .pipe(concat("node_modules/three/build/three.min.js"))
        .pipe(gulp.dest("build"));
});

gulp.task("default", [ "js" ]);
