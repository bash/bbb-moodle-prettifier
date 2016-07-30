#
# (c) 2015 Ruben Schmidmeister <ruby@fog.im>
#

SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

COMMON_LESS_FILES := $(shell find less/common -name "*.less")
MOODLE_LESS_FILES := $(shell find less/moodle -name "*.less")
PRETTIFIER_LESS_FILES := $(shell find less/prettifier -name "*.less")

ROLLUP_CONFIG := .rollup.config.js
JS_FILES := $(shell find src -name "*.js")
JS_BUNDLE := build/js/background.js \
		 	build/js/inject.js \
			build/js/options.js

BUNDLE := $(JS_BUNDLE) \
		 build/css/prettifier.css \
		 build/html/options.html \
		 build/manifest.json \
		 build/logo.png

.PHONY: all clean prepare-release release lint package

all: $(BUNDLE)

clean:
	rm -rf build/ data/css.json data/*-css.json

deps:
	npm prune
	npm install

build/js/%.js: src/%.js data/css.json $(JS_FILES)
	@mkdir -p $(@D)
	rollup -c $(ROLLUP_CONFIG) -o $@ $<

data/default-css.json: $(COMMON_LESS_FILES) $(MOODLE_LESS_FILES)
	@mkdir -p $(@D)
	lessc --strict-units=on --strict-math=on less/moodle/main.less | cssnano | ./util/jsonify.js css > $@

data/css.json: data/default-css.json
	@mkdir -p $(@D)
	ln -sf default-css.json $@

build/css/prettifier.css: $(COMMON_LESS_FILES) $(PRETTIFIER_LESS_FILES)
	@mkdir -p $(@D)
	lessc --strict-units=on --strict-math=on -clean-css less/prettifier/main.less > $@

build/html/options.html: html/options.html
	@mkdir -p $(@D)
	cat $+ > $@

build/manifest.json: manifest.json
	@mkdir -p $(@D)
	cat $+ > $@

build/logo.png: assets/logo.png
	@mkdir -p $(@D)
	@rm -rf $@
	cp $+ $@

prepare-release:
	node util/version-update.js
	$(MAKE) -B
	sh util/google-signin.sh

package:
	@rm -f build/release.zip
	zip build/release.zip $(shell find ./build)

release: package
	sh util/publish.sh

lint:
	standard src/**/*.js
	standard util/**/*.js
