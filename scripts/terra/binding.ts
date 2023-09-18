import * as path from 'path';

import { CXXFile, RenderContext, TerraNode } from 'terra-cli';
import { CXXTYPE } from 'terra-cli';

import {
  addMethodWrapper,
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
  classPrefix: string;
  hasBaseClazzs: boolean;
}

interface ClazzMethodUserData {
  hasParameters: boolean;
  isRegisterMethod: boolean;
  _prefix: string;
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
    // cxxfile = addMethodWrapper(cxxfile);

    let nodes = cxxfile.nodes.filter((node: TerraNode) => {
      return node.__TYPE === CXXTYPE.Clazz;
    });

    cxxfile.nodes = nodes.map((node: TerraNode) => {
      if (node.name === 'IRtcEngineEventHandlerEx') {
        // debugger;
      }

      //重载函数重命名, 自动末尾+数字
      //['joinChannel', 'joinChannel'] => ['joinChannel', 'joinChannel2']
      node.asClazz().methods = appendNumberToDuplicateMemberFunction(
        node.asClazz().methods
      );
      node.asClazz().methods.map((method) => {
        const clazzMethodUserData: ClazzMethodUserData = {
          hasParameters: method.parameters.length > 0,
          isRegisterMethod: new RegExp('registerEventHandler').test(
            method.name
          ),
          _prefix:
            method.parent.asClazz().name === 'IRtcEngineEventHandlerEx' &&
            !method.name.endsWith('Ex')
              ? 'Ex'
              : '',
        };
        method.user_data = clazzMethodUserData;
      });

      const terraNodeUserData: TerraNodeUserData = {
        isStruct: node.__TYPE === CXXTYPE.Struct,
        isEnumz: node.__TYPE === CXXTYPE.Enumz,
        isClazz: node.__TYPE === CXXTYPE.Clazz,
        classPrefix:
          node.name === 'IRtcEngineEventHandlerEx'
            ? 'RtcEngineEventHandler_'
            : node.name.replace(new RegExp('^I(.*)'), '$1_'),
        hasBaseClazzs: node.asClazz().base_clazzs.length > 0,
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
