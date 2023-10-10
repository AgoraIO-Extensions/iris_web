import { IrisApiEngine, IrisCore } from 'iris-web-core';

import { initIrisRtc } from '../../src/index';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';

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
