#!/usr/bin/env bash

#
# (c) 2016 Ruben Schmidmeister <ruby@fog.im>
#

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DATA="node ${DIR}/get-data.js"
WRITE="node ${DIR}/write-oauth-response.js"

CLIENT_ID=$(${DATA} 'googleClientId')
CLIENT_SECRET=$(${DATA} 'googleClientSecret')

open "https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=${CLIENT_ID}&redirect_uri=urn:ietf:wg:oauth:2.0:oob"

echo "enter the code"
printf "> "
read CODE

DATA=$(curl "https://accounts.google.com/o/oauth2/token" -d \
"client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${CODE}&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob")

${WRITE} "${DATA}"