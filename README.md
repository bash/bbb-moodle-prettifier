# bbb-moodle-prettifier
[![Code Climate](https://codeclimate.com/github/bash/bbb-moodle-prettifier/badges/gpa.svg)](https://codeclimate.com/github/bash/bbb-moodle-prettifier)
[![Chrome Webstore](https://img.shields.io/badge/webstore-2.9.x-yellow.svg)](https://chrome.google.com/webstore/detail/bbb-moodle-prettifier-bet/dmmgknfhhopipmibpiboppjflojgldll)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
[![Build](https://img.shields.io/badge/build%20system-make-brightgreen.svg)](Makefile)


# Building

```bash
npm install
make

# if you want to build the dark theme do this instead:
MDL_THEME_VERSION=dark make -B
```

# Releasing
```bash
make prepare-release
make release
```