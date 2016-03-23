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

BUNDLE = $(JS_BUNDLE) build/css/prettifier.css data.json

.PHONY: all prepare-release release lint

all: $(BUNDLE)

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

data.json: data.dist.json
	cat $+ > $@

prepare-release:
	make -B
	sh util/google-signin.sh

release:
	@echo "Preparing Release"
	@node util/version-update.js
	@rm -f build/release.zip
	@zip build/release.zip $(shell find ./build)
	@sh util/publish.sh

lint:
	standard src/**/*.js
	standard util/**/*.js
