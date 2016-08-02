#
# (c) 2015 Ruben Schmidmeister <ruby@fog.im>
#

SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

TARGET ?= unknown

COMMON_LESS_FILES := $(shell find less/common -name "*.less")
MOODLE_LESS_FILES := $(shell find less/moodle -name "*.less")
PRETTIFIER_LESS_FILES := $(shell find less/prettifier -name "*.less")

ROLLUP_CONFIG := .rollup.config.js
JS_FILES := $(shell find src -name "*.js")
JS_BUNDLE := build/$(TARGET)/js/background.js \
		 	build/$(TARGET)/js/inject.js \
			build/$(TARGET)/js/options.js \
			build/$(TARGET)/js/polyfills.js

POLYFILLS := polyfills/CustomElements.js

BUNDLE := $(JS_BUNDLE) \
		 build/$(TARGET)/css/prettifier.css \
		 build/$(TARGET)/html/options.html \
		 build/$(TARGET)/manifest.json \
		 build/$(TARGET)/logo.png

.PHONY: all clean prepare-release release lint package chrome opera firefox all-targets

all: $(BUNDLE)

clean:
	rm -rf build/ data/css.json data/*-css.json

firefox:
	TARGET=firefox $(MAKE)

chrome:
	TARGET=chrome $(MAKE)

opera:
	TARGET=opera $(MAKE)

all-targets: firefox chrome opera

deps:
	npm prune
	npm install

build/$(TARGET)/js/%.js: src/%.js data/css.json $(JS_FILES)
	@mkdir -p $(@D)
	rollup -c $(ROLLUP_CONFIG) -o $@ $<

data/default-css.json: $(COMMON_LESS_FILES) $(MOODLE_LESS_FILES)
	@mkdir -p $(@D)
	lessc --strict-units=on --strict-math=on less/moodle/main.less | cssnano | ./util/jsonify.js css > $@

data/css.json: data/default-css.json
	@mkdir -p $(@D)
	ln -sf default-css.json $@

build/$(TARGET)/css/prettifier.css: $(COMMON_LESS_FILES) $(PRETTIFIER_LESS_FILES)
	@mkdir -p $(@D)
	lessc --strict-units=on --strict-math=on -clean-css less/prettifier/main.less > $@

build/$(TARGET)/html/options.html: html/options.html
	@mkdir -p $(@D)
	cat $+ > $@

build/$(TARGET)/manifest.json: manifest.json
	@mkdir -p $(@D)
	cat $+ > $@

ifeq ($(TARGET),firefox)
build/$(TARGET)/js/polyfills.js: $(POLYFILLS)
	@mkdir -p $(@D)
	uglifyjs $+ > $@
else
build/$(TARGET)/js/polyfills.js:
	@mkdir -p $(@D)
	echo > $@
endif

build/$(TARGET)/logo.png: assets/logo.png
	@mkdir -p $(@D)
	@rm -rf $@
	cp $+ $@

lint:
	standard src/**/*.js
	standard util/**/*.js
