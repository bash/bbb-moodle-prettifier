#
# (c) 2015 Ruben Schmidmeister <ruby@fog.im>
#

SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

LESS_FILES = $(shell find less -name "*.less")
JS_FILES = $(shell find src -name "*.js")

JS_BUNDLE = build/js/background.js \
		 	build/js/inject.js \
			build/js/options.js

BUNDLE = $(JS_BUNDLE)

.PHONY: all release lint

all: $(BUNDLE)

build/js/%.js: src/%.js data/css.json $(JS_FILES)
	mkdir -p $(dir $@)
	browserify $< --transform babelify -o $@

data/css.json: $(LESS_FILES)
	lessc -clean-css less/main.less | ./util/jsonify.js css > $@

release:
	@echo "Preparing Release"
	@node util/version-update.js
	@rm -f build/release.zip
	@zip build/release.zip $(shell find ./build)
	@sh util/publish.sh

lint:
	standard src/**/*.js
	standard util/**/*.js
