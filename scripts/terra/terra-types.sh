#!/usr/bin/env bash
set -e
set -x
export LLVM_DOWNLOAD_URL=https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.6/clang+llvm-15.0.6-x86_64-linux-gnu-ubuntu-18.04.tar.xz
MY_PATH=$(realpath $(dirname "$0"))
OUTPUT_DIR=$(realpath ${MY_PATH}/../../packages/@iris/rtc/generate)

find ${OUTPUT_DIR} -type f -delete

# packages/@iris/rtc/generate
npm exec terra -- run \
    --config ${MY_PATH}/config/types_configs.yaml \
    --output-dir=${OUTPUT_DIR} \

cd ${OUTPUT_DIR}/..    

node ../../../scripts/terra/export-types-file-generate.js output-path=$PWD/index.ts

npm run lint:fix
npm run build
