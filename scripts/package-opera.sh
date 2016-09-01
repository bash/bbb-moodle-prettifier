#!/bin/sh

if [ -z "${1}" ]; then
    echo "Usage: [signature.pem]"
    exit 1
fi

SIGNATURE="${1}"
CURRENT_DIR=$(pwd)
BUILD_DIR="build/opera"
PACKAGE="dist/mdl-prettifier-build-opera.nex"

tput setaf 2
echo "Running make for opera..."
tput sgr0

rm -rf ${BUILD_DIR}
TARGET="opera" NODE_ENV="production" make -B

tput setaf 2
echo "Packaging extension for opera ..."
tput sgr0

mkdir -p dist

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
    --pack-extension=${BUILD_DIR} \
    --pack-extension-key=${SIGNATURE}

rm -f "build/opera.pem"
mv "build/opera.crx" ${PACKAGE}

tput setaf 2
echo "Build package generated"
tput sgr0
