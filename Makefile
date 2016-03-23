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

BUNDLE = $(JS_BUNDLE) \
		 build/css/prettifier.css \
		 build/html/options.html \
		 build/manifest.json \
		 build/logo.png

.PHONY: all clean prepare-release release lint

all: $(BUNDLE)
clean:
	rm -rf build/ data/css.json data/*-css.json

build/js/%.js: src/%.js data/css.json $(JS_FILES)
	mkdir -p $(dir $@)
	browserify $< --transform babelify -o $@

data/default-css.json: $(COMMON_LESS_FILES) $(MOODLE_LESS_FILES)
	lessc -clean-css less/moodle/main.less | ./util/jsonify.js css > $@

data/dark-css.json: $(COMMON_LESS_FILES) $(MOODLE_LESS_FILES)
	lessc -clean-css less/moodle/dark.less | ./util/jsonify.js css > $@

data/css.json: data/default-css.json data/dark-css.json
	rm -rf $@
ifeq ($(MDL_THEME_VERSION),dark)
	ln -s dark-css.json $@
else
	ln -s default-css.json $@
endif

build/css/prettifier.css: $(COMMON_LESS_FILES) $(PRETTIFIER_LESS_FILES)
	@mkdir -p $(dir $@)
	lessc -clean-css less/prettifier/main.less > $@

build/html/options.html: html/options.html
	@mkdir -p $(dir $@)
	cat $+ > $@

build/manifest.json: manifest.json
	@mkdir -p $(dir $@)
	cat $+ > $@

build/logo.png: assets/logo.png
	@mkdir -p $(dir $@)
	rm -rf $@
	cp $+ $@

prepare-release:
	node util/version-update.js
	make -B
	sh util/google-signin.sh

release:
	@rm -f build/release.zip
	@zip build/release.zip $(shell find ./build)
	@sh util/publish.sh

lint:
	standard src/**/*.js
	standard util/**/*.js
