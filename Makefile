#
# (c) 2015 Ruben Schmidmeister <ruby@fog.im>
#

SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

.PHONY: all release

all: build/js/background.js build/js/inject.js build/js/options.js

build/js/%.js: src/%.js $(shell find src -name "*.js")
	mkdir -p $(dir $@)
	browserify $< --transform babelify -o $@

release:
	@echo "Preparing Release"
	@node util/version-update.js
	@rm -f build/release.zip
	@zip build/release.zip $(shell find ./build)
	@sh util/publish.sh
