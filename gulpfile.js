/* eslint-disable @typescript-eslint/no-var-requires */

const gulp = require('gulp');
const through = require('through2');
const jsonToTypescript = require('json-schema-to-typescript');

const jsonType = () => through.obj(async (file, encoding, callback) => {
    if(file.isNull()) return callback(null, file);

    file.path = file.path.replace('schema.json', 'ts');
    file.contents = Buffer.from(await jsonToTypescript.compile(JSON.parse(file.contents.toString()), "Projects"));

    callback(null, file);
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
exports.default = () => {
    return gulp
        .src('public/data/projects.schema.json')
        .pipe(jsonType())
        .pipe(gulp.dest('types'));
}