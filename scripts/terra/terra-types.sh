#!/usr/bin/env bash
set -e
set -x

MY_PATH=$(realpath $(dirname "$0"))
OUTPUT_DIR=$(realpath ${MY_PATH}/../../packages/@iris/rtc/generate)

find ${OUTPUT_DIR} -type f -delete

# packages/@iris/rtc/generate
npm run build -- render \
    --config ${MY_PATH}/config/types_configs.yaml \
    --output-dir=${OUTPUT_DIR} \
    --cache \

cd ${OUTPUT_DIR}/..    

node ../../../scripts/export-types-file-generate.js output-path=$PWD/index.ts

npm run lint:fix
npm run build
