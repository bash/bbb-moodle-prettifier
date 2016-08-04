# bbb-moodle-prettifier
[![Code Climate](https://codeclimate.com/github/bash/bbb-moodle-prettifier/badges/gpa.svg)](https://codeclimate.com/github/bash/bbb-moodle-prettifier)
[![Version](https://img.shields.io/badge/version-4.1.0-yellow.svg)](manifest.json)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![WTFPL License](https://img.shields.io/badge/license-WTFPL-blue.svg)](LICENSE)
[![Build](https://img.shields.io/badge/build%20system-make-brightgreen.svg)](Makefile)

# Installing

## Chrome

Download the extension from the [Chrome Web Store](https://chrome.google.com/webstore/detail/bbb-moodle-prettifier/fbnoacnkmdhnmghankinjgbmlinjpkhg).

## Firefox (pending approval)

Download the extension from [addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/bbb-moodle-prettifier/).

## Opera (coming soon)

# Building

### First Build

```bash
make deps && make
```

### Rebuild after changes

```bash
make
```

### Clean up built files

```bash
make clean
```

# Releasing

Run

```bash
./scripts/package.sh firefox
./scripts/package.sh opera
./scripts/package.sh chrome
```

... and upload the files to the addon platforms.
