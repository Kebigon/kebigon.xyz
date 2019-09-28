const { dest, parallel, series, src, task } = require("gulp");

const cssnano = require("cssnano");
const cssvariables = require("postcss-css-variables");
const concat = require("gulp-concat");
const del = require("del");
var lunr = require("lunr");
require("lunr-languages/lunr.stemmer.support")(lunr);
require("lunr-languages/lunr.multi")(lunr);
require("lunr-languages/tinyseg")(lunr);
require("lunr-languages/lunr.ja")(lunr);
require("lunr-languages/lunr.fr")(lunr);
const pako = require("pako");
const postcss = require("gulp-postcss");
const purgecss = require("gulp-purgecss")
const rename = require("gulp-rename");
const transform = require("gulp-transform");
const uglify = require("gulp-uglify");

const dictionnaireJaponaisData = "/home/kebigon/Unison/japanese/dictionnaire-japonais.json";

/*
 * Generate minified css file
 */

task("style.min.css", function () {
	return src("_src/css/style.css")
		.pipe(postcss([require("precss"), cssvariables()]))
		.pipe(purgecss({ content: ["_layouts/**/*.html", "pages/**/*.html"] }))
		.pipe(postcss([cssnano({ preset: "default" })]))
		.pipe(rename({ extname: ".min.css" }))
		.pipe(dest("generated"));
});

/*
 * Generated compressed data files
 */

task("dictionnaire-japonais.zz", function () {
	return src(dictionnaireJaponaisData)
		.pipe(transform(deflate))
		.pipe(rename({ extname: ".zz" }))
		.pipe(dest("generated"));
});

task("dictionnaire-japonais-index.zz", function () {
	return src(dictionnaireJaponaisData)
		.pipe(transform("utf-8", index))
		.pipe(transform(deflate))
		.pipe(rename({ suffix: "-index", extname: ".zz" }))
		.pipe(dest("generated"));
});

function deflate(contents) {
	return Buffer.from(pako.deflate(contents, { level: 9, windowBits: 15, memLevel: 9, strategy: 0 }));
}

function index(contents) {
	return JSON.stringify(lunr(function () {
		this.use(lunr.multiLanguage("fr", "ja"))
		this.ref("id")
		this.field("j")
		this.field("k")
		this.field("f")

		JSON.parse(contents).forEach(function (doc) {
			this.add(doc)
		}, this)
	}));
}

/*
 * Generate minified javascript files
 */

task("dictionnaire-japonais.min.js", function () {
	return src([
		"node_modules/pako/dist/pako_inflate.js",
		"node_modules/lunr/lunr.js",
		"node_modules/lunr-languages/lunr.stemmer.support.js",
		"node_modules/lunr-languages/lunr.multi.js",
		"node_modules/lunr-languages/tinyseg.js",
		"node_modules/lunr-languages/lunr.ja.js",
		"node_modules/lunr-languages/lunr.fr.js",
		"_src/js/dictionnaire-japonais.js",
	])
		.pipe(concat("dictionnaire-japonais.min.js"))
		.pipe(uglify())
		.pipe(dest("generated"));
});

task("rss-feeds.min.js", function () {
	return src("_src/js/rss-feeds.js")
		.pipe(uglify())
		.pipe(rename({ extname: ".min.js" }))
		.pipe(dest("generated"));
});

/*
 * Utility tasks
 */

task("clean", function () {
	return del([
		"generated",
		"_site"
	]);
});

task("default",
	series(
		"clean",
		parallel(
			"dictionnaire-japonais.min.js",
			"dictionnaire-japonais.zz",
			"dictionnaire-japonais-index.zz",
			"rss-feeds.min.js",
			"style.min.css"
		)
	)
);