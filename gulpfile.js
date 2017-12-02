const gulp = require("gulp");
const livescript = require("gulp-livescript");
const browserify = require("gulp-browserify");
const concat = require("gulp-concat");
const through = require("through2");
const addsrc = require("gulp-add-src");
const watch = require("gulp-watch");
const plumber = require("gulp-plumber");
const batch = require("gulp-batch");
const scrixelMap = require("scrixel-map");
const Vinyl = require("vinyl");
const bl = require("browserify-livescript");

gulp.task("js", () => {
    return gulp.src("src/main.ls")
        //.pipe(plumber())
        //.pipe(livescript())
        .pipe(browserify({
            transform: [bl],
            extensions: [".ls"]
        }))
        .pipe(through.obj((file, encoding, callback) => {
            console.log(file);
            callback(null, file);
        }))
        .pipe(addsrc("node_modules/three/build/three.min.js"))
        .pipe(concat("index.js"))
        .pipe(gulp.dest("build"));
});

gulp.task("levels", () => {
    return gulp.src("levels/*")
        .pipe(through.obj((file, encoding, callback) => {
            scrixelMap(file.path).then(image => {
                const json = JSON.stringify(image);
                const newFile = new Vinyl({
                    contents: new Buffer(json)
                });

                newFile.path = file.path;
                newFile.extname = ".json";
                newFile.content = json;

                callback(null, newFile);
            }).catch(err => console.log(err));
        }))
        .pipe((function (fileName) {
            let obj = {};

            function bufferContents(file, encoding, callback) {
                obj[file.stem] = JSON.parse(file.contents);

                callback();
            }

            function endStream(callback) {
                const json = JSON.stringify(obj);
                const newFile = new Vinyl({
                    contents: new Buffer(json)
                });

                newFile.path = fileName;

                callback(null, newFile);
            }

            return through.obj(bufferContents, endStream);
        }("levels.json")))
        .pipe(gulp.dest("build"));
});

gulp.task("watch", () => {
    watch("src/*.ls", batch((events, done) => {
        gulp.start("js", done);
    }));

    watch("levels/*", batch((events, done) => {
        gulp.start("levels", done);
    }));
});

gulp.task("default", [ "js", "levels", "watch" ]);
