const gulp = require("gulp");
const livescript = require("gulp-livescript");

gulp.task("js", () => {
    return gulp.src("*.ls")
        .pipe(livescript())
        .pipe(gulp.dest("build"));
});

gulp.task("default", [ "js" ]);
