#!/usr/bin/env bash
set -e
set -x

MY_PATH=$(realpath $(dirname "$0"))
OUTPUT_DIR=$(realpath ${MY_PATH}/../../packages/rtc)

find ${OUTPUT_DIR}/src/binding -type f -delete
find ${OUTPUT_DIR}/test/binding -type f -delete



npm run build -- run \
    --config ${MY_PATH}/config/binding_configs.yaml \
    --output-dir=${OUTPUT_DIR} \

cd ${OUTPUT_DIR} 

npm run lint:fix