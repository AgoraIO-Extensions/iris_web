#!/usr/bin/env bash
set -e
set -x

MY_PATH=$(realpath $(dirname "$0"))
OUTPUT_DIR=$(realpath ${MY_PATH}/../../packages/rtc/src/binding)

find ${OUTPUT_DIR} -type f -delete



# packages/rtc/src/binding
npm run build -- run \
    --config ${MY_PATH}/config/binding_configs.yaml \
    --output-dir=${OUTPUT_DIR} \
    --cache \

cd ${OUTPUT_DIR}/..    

npm run lint:fix
