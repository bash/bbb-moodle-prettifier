#
# (c) 2015 Ruben Schmidmeister <ruby@fog.im>
#

SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

COMMON_LESS_FILES = $(shell find less/common -name "*.less")
MOODLE_LESS_FILES = $(shell find less/moodle -name "*.less")
PRETTIFIER_LESS_FILES = $(shell find less/prettifier -name "*.less")

JS_FILES = $(shell find src -name "*.js")

JS_BUNDLE = build/js/background.js \
		 	build/js/inject.js \
			build/js/options.js

BUNDLE = $(JS_BUNDLE) build/css/prettifier.css

.PHONY: all release lint

all: $(BUNDLE)

build/js/%.js: src/%.js data/css.json $(JS_FILES)
	mkdir -p $(dir $@)
	browserify $< --transform babelify -o $@

data/css.json: $(COMMON_LESS_FILES) $(MOODLE_LESS_FILES)
	lessc -clean-css less/moodle/main.less | ./util/jsonify.js css > $@

build/css/prettifier.css: $(COMMON_LESS_FILES) $(PRETTIFIER_LESS_FILES)
	@mkdir -p $(dir $@)
	lessc -clean-css less/prettifier/main.less > $@

release:
	@echo "Preparing Release"
	@node util/version-update.js
	@rm -f build/release.zip
	@zip build/release.zip $(shell find ./build)
	@sh util/publish.sh

lint:
	standard src/**/*.js
	standard util/**/*.js
