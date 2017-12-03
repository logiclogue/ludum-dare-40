const gulp = require("gulp");
const browserify = require("gulp-browserify");
const concat = require("gulp-concat");
const through = require("through2");
const addsrc = require("gulp-add-src");
const watch = require("gulp-watch");
const plumber = require("gulp-plumber");
const batch = require("gulp-batch");
const scrixelMap = require("scrixel-map");
const scrixelSpriteSheet = require("scrixel-spritesheet");
const Vinyl = require("vinyl");

gulp.task("js", () => {
    return gulp.src("src/main.js")
        .pipe(plumber())
        .pipe(browserify())
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

gulp.task("sprites", () => {
    return gulp.src("sprites/*")
        .pipe(through.obj((file, encoding, callback) => {
            scrixelSpriteSheet(8, 8, file.path).then(images => {
                const base64Images = images.map(image =>
                    image.toString("base64"));
                const json = JSON.stringify(base64Images);
                const newFile = new Vinyl({
                    contents: new Buffer(json)
                });

                newFile.path = file.path;
                newFile.extname = ".json";
                newFile.content = json;

                callback(null, newFile);
            }).catch(err => console.error(err));
        }))
        .pipe(function (fileName) {
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
        }("sprites.json"))
        .pipe(gulp.dest("build"));
});

gulp.task("watch", () => {
    watch("src/*.js", batch((events, done) => {
        gulp.start("js", done);
    }));

    watch("levels/*", batch((events, done) => {
        gulp.start("levels", done);
    }));
});

gulp.task("default", [ "js", "levels", "watch" ]);
