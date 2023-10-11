import * as path from 'path';

import { ParseResult, TerraContext } from '@agoraio-extensions/terra-core';
import { renderWithConfiguration } from '@agoraio-extensions/terra_shared_configs';

import { binding } from './binding';

export default function (
  terraContext: TerraContext,
  args: any,
  parseResult: ParseResult
) {
  let view = binding(parseResult);
  return renderWithConfiguration({
    fileNameTemplatePath: path.join(
      __dirname,
      'templates',
      'binding',
      'test',
      'file_name.mustache'
    ),
    fileContentTemplatePath: path.join(
      __dirname,
      'templates',
      'binding',
      'test',
      'file_content.mustache'
    ),
    view,
  });
}
