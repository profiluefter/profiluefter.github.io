/* eslint-disable @typescript-eslint/no-var-requires */

const gulp = require("gulp");
const sitemap = require("gulp-sitemap");

gulp.task("sitemap", function() {
    return gulp
        .src("out/**/*.html", {
            read: false
        })
        .pipe(sitemap({
            siteUrl: "https://profiluefter.me",
            lastmod: false,
            getLoc: (siteURL, location) => location.replace(/\.html$/, "") //Remove html suffix from sitemap
        }))
        .pipe(gulp.dest("./out"));
});