import * as path from 'path';

import { CXXFile, CXXTYPE, CXXTerraNode } from '@agoraio-extensions/cxx-parser';
import {
  ParseResult,
  RenderResult,
  TerraContext,
} from '@agoraio-extensions/terra-core';

import {
  IrisApiIdParserUserData,
  renderWithConfiguration,
} from '@agoraio-extensions/terra_shared_configs';

import { getIrisApiIdForWrapperFunc, isMatch } from './utils';

type CXXFileUserData = {
  fileName: string;
};

type TerraNodeUserData = IrisApiIdParserUserData & {
  isStruct: boolean;
  isEnumz: boolean;
  isClazz: boolean;
  isCallback: boolean;
};

type ClazzMethodUserData = IrisApiIdParserUserData & {
  output: string;
  input: string;
};

export default function (
  terraContext: TerraContext,
  args: any,
  parseResult: ParseResult
): RenderResult[] {
  let cxxfiles = parseResult.nodes as CXXFile[];
  let view = cxxfiles.map((cxxfile: CXXFile) => {
    const cxxUserData: CXXFileUserData = {
      fileName: path.basename(
        cxxfile.file_path,
        path.extname(cxxfile.file_path)
      ),
    };
    cxxfile.user_data = cxxUserData;

    cxxfile.nodes = cxxfile.nodes.map((node: CXXTerraNode) => {
      let isCallback = isMatch(node.name, 'isCallback');

      if (node.__TYPE === CXXTYPE.Clazz) {
        node.asClazz().methods.map((method) => {
          method.name = getIrisApiIdForWrapperFunc(method);
          const clazzMethodUserData: ClazzMethodUserData = {
            output: '',
            input: '',
            ...method.user_data,
          };
          let output_params: string[] = [];
          let input_params: string[] = [];
          method.asMemberFunction().parameters.map((param) => {
            if (param.is_output) {
              output_params.push(`${param.name}: ${param.type.name}`);
            } else {
              // if (param.default_value) {
              //   input_params.push(`${param.name}?: ${param.type.name}`);
              // } else {
                // input_params.push(`${param.name}: ${param.type.name}`);
              // }
            }
            input_params.push(`${param.name}: ${param.type.name}`);
          });
          if (output_params.length > 0) {
            if (
              method.asMemberFunction().return_type.name !== 'void' &&
              method.asMemberFunction().return_type.name !== 'number'
            ) {
              output_params.push(`result: ${method.return_type.name},`);
            }
          }
          clazzMethodUserData.input = input_params.join(',');
          if (output_params.length > 1) {
            clazzMethodUserData.output = `{${output_params.join(',')}}`;
          } else if (output_params.length == 1) {
            clazzMethodUserData.output = output_params[0]?.split(': ')[1]!;
          } else {
            clazzMethodUserData.output = `${method.return_type.name}`;
          }
          method.user_data = clazzMethodUserData;
        });
      }
      const terraNodeUserData: TerraNodeUserData = {
        isStruct: node.__TYPE === CXXTYPE.Struct,
        isEnumz: node.__TYPE === CXXTYPE.Enumz,
        isClazz: node.__TYPE === CXXTYPE.Clazz,
        isCallback: isCallback,
        ...node.user_data,
      };
      node.user_data = terraNodeUserData;

      return node;
    });

    return cxxfile;
  });
  //remove Clazz/Enumz/Struct doesn't exist file
  view = view.filter((cxxfile) => {
    return (
      cxxfile.nodes.filter((node) => {
        return (
          node.__TYPE === CXXTYPE.Clazz ||
          node.__TYPE === CXXTYPE.Enumz ||
          node.__TYPE === CXXTYPE.Struct
        );
      }).length > 0
    );
  });
  return renderWithConfiguration({
    fileNameTemplatePath: path.join(
      __dirname,
      'templates',
      'type',
      'file_name.mustache'
    ),
    fileContentTemplatePath: path.join(
      __dirname,
      'templates',
      'type',
      'file_content.mustache'
    ),
    view,
  });
}
