import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { AREAS, IAgoraRTC } from 'agora-rtc-sdk-ng';
import { EventParam, IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisAudioSourceType } from '../../src/base/BaseType';

import { AgoraTranslate, initIrisRtc } from '../../src/index';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';

let apiEnginePtr: IrisApiEngine;
let irisRtcEngine: IrisRtcEngine;
let AgoraRTCMock: IAgoraRTC;
beforeAll(async () => {
  apiEnginePtr = IrisCore.createIrisApiEngine();
  initIrisRtc(apiEnginePtr);
  irisRtcEngine = apiEnginePtr['apiInterceptors'][0];
  AgoraRTCMock = irisRtcEngine.globalState.AgoraRTC;
  jest.spyOn(AgoraRTCMock, 'setArea');
  jest.spyOn(AgoraRTCMock, 'setLogLevel');
  jest.spyOn(AgoraRTCMock, 'checkSystemRequirements').mockReturnValue(true);
  jest.spyOn(irisRtcEngine.implHelper, 'createAudioTrack');
  jest.spyOn(irisRtcEngine, 'returnResult');

  irisRtcEngine.implHelper.createAudioTrack = jest.fn();
  let nParam = {
    context: {
      areaCode: 1,
      logConfig: {
        level: 1,
      },
    },
  };
  let apiParam = new EventParam(
    'RtcEngine_initialize',
    JSON.stringify(nParam),
    0,
    '',
    ['test'],
    [],
    1
  );
  await IrisCore.callIrisApi(apiEnginePtr, apiParam);
});

afterAll(() => {
  IrisCore.disposeIrisApiEngine(apiEnginePtr);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('IAgoraRtcEngineImpl', () => {
  test('initialize', async () => {
    expect(AgoraRTCMock.setArea).toBeCalledTimes(1);
    expect(AgoraRTCMock.setArea).toBeCalledWith([AREAS.CHINA]);
    expect(AgoraRTCMock.setLogLevel).toBeCalledTimes(1);
    expect(AgoraRTCMock.setLogLevel).toBeCalledWith(1);
    expect(AgoraRTCMock.checkSystemRequirements).toBeCalledTimes(1);
    expect(irisRtcEngine.implHelper.createAudioTrack).toBeCalledTimes(1);
    expect(irisRtcEngine.implHelper.createAudioTrack).toBeCalledWith(
      IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
    );
    expect(irisRtcEngine.returnResult).toBeCalledWith(true);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);

    //check if already initialized
    let nParam = {
      context: 'test',
    };
    let apiParam = new EventParam(
      'RtcEngine_initialize',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      true,
      NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK
    );
    expect(irisRtcEngine.returnResult).toBeCalledTimes(2);
  });
  test('joinChannel', () => {
    console.log('joinChannel');
    //call create engine
  });
});
