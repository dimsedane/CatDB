/// <binding Clean='clean' />
"use strict";
var gulp = require("gulp"),
    gplugs = require("gulp-load-plugins")(),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    tsLintConfig = require('./tslint.json'),
    project = require("./project.json"),
    tsProject = gplugs.typescript.createProject('tsconfig.json');

var paths = {
  webroot: "./wwwroot/"
};

paths.ts = paths.webroot + "app/**/*.ts";
paths.tsDest = paths.webroot + "app/**/*.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatCssDest = paths.webroot + "css/site.min.css";
paths.angular2Libs = [
    "node_modules/systemjs/dist/system.src.js",
    "node_modules/angular2/bundles/angular2-polyfills.js",
    "node_modules/rxjs/bundles/Rx.js",
    "node_modules/angular2/bundles/angular2.dev.js"
]

gulp.task("compile:ts", ["lint:ts"], function(){
    var tsResult = tsProject.src()
        .pipe(gplugs.typescript(tsProject));
    
    return tsResult.js.pipe(gulp.dest('.')); 
});

gulp.task("compile", ["compile:ts"]);

gulp.task("lint:ts", function() {
    return gulp.src(paths.ts)
               .pipe(gplugs.tslint({configuration: tsLintConfig}))
               .pipe(gplugs.tslint.report('verbose'));
});

gulp.task("clean:ts", function(cb) {
    rimraf(paths.tsDest, cb);
})

gulp.task("clean:css", function(cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:css", "clean:ts"]);

gulp.task("concat:lib",  function() {
   return gulp.src(paths.angular2Libs)
              .pipe(gplugs.concat("lib.js"))
              .pipe(gulp.dest(paths.webroot + "lib")) 
});

gulp.task("min:css", function() {
  gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
});

gulp.task("min", ["min:css"]);

gulp.task("build", ["concat:lib", "min", "compile"]);
