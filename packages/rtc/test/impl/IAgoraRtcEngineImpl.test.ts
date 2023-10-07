import { IrisApiEngine, IrisCore } from 'iris-web-core';

import { initIrisRtc } from '../../src/index';

let apiEnginePtr: IrisApiEngine;
beforeAll(() => {
  apiEnginePtr = IrisCore.createIrisApiEngine();
  initIrisRtc(apiEnginePtr);
});

afterAll(() => {
  IrisCore.disposeIrisApiEngine(apiEnginePtr);
});

// AgoraWrapper.initIrisRtc();
IrisCore.createIrisApiEngine();
describe('support list', () => {
  test('joinChannel', () => {
    console.log('joinChannel');
    //call create engine
  });
});
