# bbb-moodle-prettifier
[![Code Climate](https://codeclimate.com/github/bash/bbb-moodle-prettifier/badges/gpa.svg)](https://codeclimate.com/github/bash/bbb-moodle-prettifier)
[![Chrome Webstore](https://img.shields.io/badge/webstore-3.0.0-yellow.svg)](https://chrome.google.com/webstore/detail/bbb-moodle-prettifier/fbnoacnkmdhnmghankinjgbmlinjpkhg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
[![Build](https://img.shields.io/badge/build%20system-make-brightgreen.svg)](Makefile)


# Building

### First Build

```bash
cp data.dist.json data.json
npm install
make
```

### Rebuild after changes

```bash
make
```

# Releasing

Add your **googleClientId** and **googleClientSecret** to [data.json](data.dist.json)

```bash
make prepare-release
make release
```
