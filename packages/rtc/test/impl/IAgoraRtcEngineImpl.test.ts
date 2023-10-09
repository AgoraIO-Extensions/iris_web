import { IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisRtcEngine } from 'src/engine/IrisRtcEngine';

import { initIrisRtc } from '../../src/index';

let apiEnginePtr: IrisApiEngine;
let irisRtcEngine: IrisRtcEngine;
beforeAll(() => {
  apiEnginePtr = IrisCore.createIrisApiEngine();
  initIrisRtc(apiEnginePtr);
  irisRtcEngine = apiEnginePtr['apiInterceptors'][0];
});

afterAll(() => {
  IrisCore.disposeIrisApiEngine(apiEnginePtr);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('support list', () => {
  test('joinChannel', () => {
    console.log('joinChannel');
    //call create engine
  });
});
