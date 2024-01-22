import * as path from 'path';

import { CXXFile, CXXTYPE, CXXTerraNode } from '@agoraio-extensions/cxx-parser';

import { ParseResult, TerraContext } from '@agoraio-extensions/terra-core';

import { renderWithConfiguration } from '@agoraio-extensions/terra_shared_configs';

import {
  filterFile,
  getIrisApiIdForWrapperFunc,
  isMatch,
} from './utils';

const bindingExtensionList = require('./config/binding_extension_list.json');

const supportList = require('./config/support_list.json');


interface CXXFileUserData {
  fileName: string;
}

interface TerraNodeUserData {
  isStruct: boolean;
  isEnumz: boolean;
  isClazz: boolean;
  isCallback: boolean;
  hasBaseClazzs: boolean;
  hasSupportApi: boolean;
  prefix_name: string;
}

interface ClazzMethodUserData {
  hasParameters: boolean;
  isRegisterMethod: boolean;
  isSupport: boolean;
  bindingExtensionList: [];
}

export function binding(parseResult: ParseResult) {
  let cxxfiles = parseResult.nodes as CXXFile[];
  //移除不需要的文件
  let view = filterFile(cxxfiles).map((cxxfile: CXXFile) => {
    const cxxUserData: CXXFileUserData = {
      fileName: path.basename(
        cxxfile.file_path,
        path.extname(cxxfile.file_path)
      ),
    };
    cxxfile.user_data = cxxUserData;

    let nodes = cxxfile.nodes.filter((node: CXXTerraNode) => {
      return node.__TYPE === CXXTYPE.Clazz;
    });

    //移除没有名字的node
    cxxfile.nodes = cxxfile.nodes.filter((node) => {
      return node.name !== '';
    });

    cxxfile.nodes = nodes.map((node: CXXTerraNode) => {
      if (node.name === 'IRtcEngineEventHandler') {
        // debugger;
      }

      let hasSupportApi = false;
      node.asClazz().methods.map((method) => {
        method.name = getIrisApiIdForWrapperFunc(method);
        if(!hasSupportApi && supportList.includes(method.fullName)){
          hasSupportApi = true;
        }
        const clazzMethodUserData: ClazzMethodUserData = {
          hasParameters: method.parameters.length > 0,
          isSupport: supportList.includes(method.fullName),
          isRegisterMethod: new RegExp('registerEventHandler').test(
            method.name
          ),
          bindingExtensionList: bindingExtensionList[method.fullName],
          ...method.user_data,
        };
        method.user_data = clazzMethodUserData;
      });

      const terraNodeUserData: TerraNodeUserData = {
        isStruct: node.__TYPE === CXXTYPE.Struct,
        isEnumz: node.__TYPE === CXXTYPE.Enumz,
        isClazz: node.__TYPE === CXXTYPE.Clazz,
        prefix_name: node.name.replace(new RegExp('^I(.*)'), '$1'),
        hasBaseClazzs: node.asClazz().base_clazzs.length > 0,
        isCallback: isMatch(node.name, 'isCallback'),
        hasSupportApi: hasSupportApi,
        ...node.user_data,
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
  return view;
}

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
