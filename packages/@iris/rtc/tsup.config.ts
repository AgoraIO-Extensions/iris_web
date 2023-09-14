import { defineConfig } from 'tsup';

import * as pkg from './package.json';

const banner = `
/**
 * @license ${pkg.name}
 * @version ${pkg.version}
 *
 * Copyright (c) Agora, Inc.
 *
 * This source code is licensed under the MIT license.
 */
`;

export default defineConfig([
  {
    entry: {
      [pkg.name]: 'index.ts',
    },
    banner: () => {
      return {
        js: banner,
      };
    },
    outDir: '.dist',
    format: ['cjs', 'esm'],
    splitting: false,
    sourcemap: false,
    clean: true,
    treeshake: true,
    dts: true,
    minify: false,
  },
]);
