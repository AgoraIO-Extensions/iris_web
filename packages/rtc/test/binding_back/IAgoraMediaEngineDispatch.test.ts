import { EventParam, IrisCore } from 'iris-web-core';

import { IrisApiEngineImpl } from 'iris-web-core/src/IrisApiEngineImpl';
import { IrisRtcEngine } from 'src/engine/IrisRtcEngine';

import { IrisApiType } from '../../src/base/IrisApiType';
import { initIrisRtc } from '../../src/index';

let apiEnginePtr: IrisApiEngineImpl;
let irisRtcEngine: IrisRtcEngine;
beforeAll(() => {
  apiEnginePtr = IrisCore.createIrisApiEngine();
  initIrisRtc(apiEnginePtr);
  irisRtcEngine = apiEnginePtr.apiInterceptors[0] as IrisRtcEngine;
});

afterAll(() => {
  IrisCore.disposeIrisApiEngine(apiEnginePtr);
});

describe('IAgoraMediaEngineImpl', () => {
  test('setExternalVideoSource parameter', async () => {
    let nParam = {
      enabled: null,
      useTexture: null,
      sourceType: null,
      encodedVideoOption: null,
    };
    for (let i in nParam) {
      try {
        await IrisCore.callIrisApi(
          apiEnginePtr,
          new EventParam(
            IrisApiType.FUNC_MEDIAENGINE_SETEXTERNALVIDEOSOURCE,
            JSON.stringify(nParam),
            0,
            '',
            [],
            [],
            0
          )
        );
      } catch (e) {
        expect(e).toEqual(i + ' is undefined');
      }
      nParam[i] = 'test';
    }
  });

  test('setExternalVideoSource impl call', async () => {
    jest.spyOn(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl,
      'setExternalVideoSource'
    );
    let nParam: string = JSON.stringify({
      enabled: 'test',
      useTexture: 'test',
      sourceType: 'test',
      encodedVideoOption: 'test',
    });
    let apiParam = new EventParam(
      IrisApiType.FUNC_MEDIAENGINE_SETEXTERNALVIDEOSOURCE,
      nParam,
      0,
      '',
      [],
      [],
      0
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        .setExternalVideoSource
    ).toBeCalledTimes(1);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        .setExternalVideoSource
    ).toBeCalledWith('test', 'test', 'test', 'test');
  });
});
