# bbb-moodle-prettifier
[![Code Climate](https://codeclimate.com/github/bash/bbb-moodle-prettifier/badges/gpa.svg)](https://codeclimate.com/github/bash/bbb-moodle-prettifier)
[![Version](https://img.shields.io/badge/version-4.1.0-yellow.svg)](manifest.json)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![WTFPL License](https://img.shields.io/badge/license-WTFPL-blue.svg)](LICENSE)
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

Run

```bash
./scripts/package.sh firefox
./scripts/package.sh opera
./scripts/package.sh chrome
```

... and upload the files to the addon platforms.
