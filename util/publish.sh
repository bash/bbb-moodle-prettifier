#!/bin/sh

#
# (c) 2016 Ruben Schmidmeister <ruby@fog.im>
#

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DATA="node ${DIR}/get-data.js"
PRETTY="node ${DIR}/pretty-json.js"

ACCESS_TOKEN=$(${DATA} 'googleAccessToken')
EXTENSION_ID=$(${DATA} 'extensionId')

tput setaf 4
echo "Uploading to the Chrome Webstore..."
tput sgr0

${PRETTY} "$(curl \
    -H "Authorization: Bearer ${ACCESS_TOKEN}"  \
    -H "x-goog-api-version: 2" \
    -X PUT \
    -T "${DIR}/../build/release.zip" \
    "https://www.googleapis.com/upload/chromewebstore/v1.1/items/${EXTENSION_ID}")"

tput setaf 4
echo "Publishing new version..."
tput sgr0

${PRETTY} "$(curl \
    -H "Authorization: Bearer ${ACCESS_TOKEN}"  \
    -H "x-goog-api-version: 2" \
    -H "Content-Type: application/json; charset=UTF-8" \
    -X POST \
    -d '{ "target": "default" }' \
    "https://www.googleapis.com/chromewebstore/v1.1/items/${EXTENSION_ID}/publish")"
