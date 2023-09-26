#!/usr/bin/env bash

set -e
set -x

OUTPUT_PATH=$1

pushd packages/rtc
pnpm exec webpack --watch  --mode=development
popd

# cp -RP project/dist/lib-iris-web.js ${OUTPUT_PATH}/lib-iris-web.js


