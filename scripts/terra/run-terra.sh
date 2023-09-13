#!/usr/bin/env bash
set -e
set -x

MY_PATH=$(realpath $(dirname "$0"))
OUTPUT_DIR=$(realpath ${MY_PATH}/../../packages/@iris/rtc/generate)
EXPORT_FILE_PATH=${MY_PATH}/../../packages/@iris/rtc/AgoraSdk.ts

find ${OUTPUT_DIR} -type f -delete


    # --export-file-path=${EXPORT_FILE_PATH} \

# packages/native-rtc
npm run build -- render \
    --config ${MY_PATH}/config/render_configs.yaml \
    --output-dir=${OUTPUT_DIR} \
    --cache=true \

cd ${OUTPUT_DIR}/..    

node ../../../scripts/export-file-generate.js output-path=$PWD/index.d.ts

npm run lint:fix
