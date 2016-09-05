#!/bin/sh

if [ -z "${1}" ]; then
  echo "Usage ${0} <chrome|firefox|opera>"
  exit 1
fi

TARGET="${1}"
BUILD_PACKAGE="dist/mdl-prettifier-build-${TARGET}.zip"
SRC_PACKAGE="dist/mdl-prettifier-src-${TARGET}.zip"

CURRENT_DIR=$(pwd)
BUILD_DIR="build/${TARGET}"

tput setaf 2
echo "Running make for ${TARGET} ..."
tput sgr0

rm -rf ${BUILD_DIR}
TARGET="${TARGET}" NODE_ENV="production" make -B

tput setaf 2
echo "Packaging extension for ${TARGET} ..."
tput sgr0

mkdir -p dist

rm -f "${BUILD_PACKAGE}"
rm -f "${SRC_PACKAGE}"

cd ${BUILD_DIR}
zip "${CURRENT_DIR}/${BUILD_PACKAGE}" $(find ./*)
cd ${CURRENT_DIR}

git archive --format zip --output "${CURRENT_DIR}/${SRC_PACKAGE}" HEAD

tput setaf 2
echo "Build package generated: ${BUILD_PACKAGE}"
echo "Source package generated: ${SRC_PACKAGE}"
tput sgr0
