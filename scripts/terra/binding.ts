import * as path from 'path';

import { CXXFile, RenderContext, TerraNode } from 'terra-cli';
import { CXXTYPE } from 'terra-cli';

import {
  appendNumberToDuplicateMemberFunction,
  filterFile,
  isMatch,
} from './utils';

interface CXXFileUserData {
  fileName: string;
}

interface TerraNodeUserData {
  isStruct: boolean;
  isEnumz: boolean;
  isClazz: boolean;
  isCallback: boolean;
  _name: string;
}

interface ClazzMethodUserData {
  hasParameters: boolean;
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

    let nodes = cxxfile.nodes.filter((node: TerraNode) => {
      return node.__TYPE === CXXTYPE.Clazz;
    });

    cxxfile.nodes = nodes.map((node: TerraNode) => {
      //重载函数重命名, 自动末尾+数字
      //['joinChannel', 'joinChannel'] => ['joinChannel', 'joinChannel2']
      node.asClazz().methods = appendNumberToDuplicateMemberFunction(
        node.asClazz().methods
      );
      node.asClazz().methods.map((method) => {
        const clazzMethodUserData: ClazzMethodUserData = {
          hasParameters: method.parameters.length > 0,
        };
        method.user_data = clazzMethodUserData;
      });

      const terraNodeUserData: TerraNodeUserData = {
        isStruct: node.__TYPE === CXXTYPE.Struct,
        isEnumz: node.__TYPE === CXXTYPE.Enumz,
        isClazz: node.__TYPE === CXXTYPE.Clazz,
        _name: node.name.replace('I', ''),
        isCallback: isMatch(node.name, 'isCallback'),
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
      'binding',
      'file_name.mustache'
    ),
    fileContentTemplatePath: path.join(
      __dirname,
      'templates',
      'binding',
      'file_content.mustache'
    ),
    view,
  });
}
