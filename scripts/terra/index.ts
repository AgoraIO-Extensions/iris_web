import * as path from 'path';

import { CXXFile, CXXTYPE, RenderContext, TerraNode } from 'terra-cli';

import supportList = require('./config/support_list.json');

import { filterFile, isMatch } from './utils';

interface CXXFileUserData {
  fileName: string;
}

interface TerraNodeUserData {
  isStruct: boolean;
  isEnumz: boolean;
  isClazz: boolean;
  isCallback: boolean;
}

interface ClazzMethodUserData {
  isImpl: boolean;
}

export default function (cxxfiles: CXXFile[], context: RenderContext) {
  //移除不需要的文件
  let view = filterFile(cxxfiles).map((cxxfile: CXXFile) => {
    const cxxUserData: CXXFileUserData = {
      fileName: path.basename(
        cxxfile.file_path,
        path.extname(cxxfile.file_path)
      ),
    };
    cxxfile.user_data = cxxUserData;

    cxxfile.nodes = cxxfile.nodes.map((node: TerraNode) => {
      let isCallback = isMatch(node.name, 'isCallback');
      if (node.name === 'IVideoDeviceManager') {
        // debugger;
      }

      if (node.__TYPE === CXXTYPE.Clazz) {
        node.asClazz().methods = node.asClazz().methods.map((method) => {
          const clazzMethodUserData: ClazzMethodUserData = {
            isImpl:
              supportList[node.name] &&
              supportList[node.name].includes(method.name),
          };
          method.user_data = clazzMethodUserData;
          return method;
        });
      }
      const terraNodeUserData: TerraNodeUserData = {
        isStruct: node.__TYPE === CXXTYPE.Struct,
        isEnumz: node.__TYPE === CXXTYPE.Enumz,
        isClazz: node.__TYPE === CXXTYPE.Clazz,
        isCallback: isCallback,
      };
      node.user_data = terraNodeUserData;

      return node;
    });

    return cxxfile;
  });
  //移除不含有Clazz,Enumz,Struct的文件
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
  return context.mustacheRenderContext.renderWithConfiguration({
    fileNameTemplatePath: path.join(
      __dirname,
      'templates',
      'file_name.mustache'
    ),
    fileContentTemplatePath: path.join(
      __dirname,
      'templates',
      'file_content.mustache'
    ),
    view,
  });
}