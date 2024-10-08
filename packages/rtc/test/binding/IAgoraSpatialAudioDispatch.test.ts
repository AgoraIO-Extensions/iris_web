/// Generated by terra, DO NOT MODIFY BY HAND.

import * as NATIVE_RTC from '@iris/native-rtc';
import { CallIrisApiResult, IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';
import * as bufferExtensions from '../../src/extensions/CallApiBufferExtensions';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';

const bindingAPI = require('../../src/binding/IAgoraSpatialAudioDispatch');

let apiEnginePtr: IrisApiEngine;
let irisRtcEngine: IrisRtcEngine;
beforeAll(async () => {
  apiEnginePtr = IrisCore.createIrisApiEngine();
  IrisWebRtc.initIrisRtc(apiEnginePtr);
  irisRtcEngine = apiEnginePtr['apiInterceptors'][0];
  irisRtcEngine.implHelper.createMicrophoneAudioTrack = jest.fn();
  let nParam = {
    context: 'test',
  };
  let apiParam = new IrisCore.EventParam(
    'RtcEngine_initialize_0320339',
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

describe('ILocalSpatialAudioEngine', () => {
  test('LocalSpatialAudioEngine_release impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_release',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.release
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_initialize_cf94fbf impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_initialize_cf94fbf',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.initialize_cf94fbf
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_updateRemotePosition_adc0909 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      uid: 'test',
      posInfo: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_updateRemotePosition_adc0909',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.updateRemotePosition_adc0909
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_updateRemotePositionEx_f0252d9 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      uid: 'test',
      posInfo: 'test',
      connection: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_updateRemotePositionEx_f0252d9',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.updateRemotePositionEx_f0252d9
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_removeRemotePosition_c8d091a impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      uid: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_removeRemotePosition_c8d091a',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.removeRemotePosition_c8d091a
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_removeRemotePositionEx_58a9850 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      uid: 'test',
      connection: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_removeRemotePositionEx_58a9850',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.removeRemotePositionEx_58a9850
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_clearRemotePositionsEx_c81e1a4 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      connection: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_clearRemotePositionsEx_c81e1a4',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.clearRemotePositionsEx_c81e1a4
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_updateSelfPositionEx_502183a impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      position: 'test',
      axisForward: 'test',
      axisRight: 'test',
      axisUp: 'test',
      connection: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_updateSelfPositionEx_502183a',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.updateSelfPositionEx_502183a
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_setMaxAudioRecvCount_46f8ab7 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      maxCount: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_setMaxAudioRecvCount_46f8ab7',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.setMaxAudioRecvCount_46f8ab7
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_setAudioRecvRange_685e803 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      range: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_setAudioRecvRange_685e803',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.setAudioRecvRange_685e803
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_setDistanceUnit_685e803 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      unit: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_setDistanceUnit_685e803',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.setDistanceUnit_685e803
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_updateSelfPosition_9c9930f impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      position: 'test',
      axisForward: 'test',
      axisRight: 'test',
      axisUp: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_updateSelfPosition_9c9930f',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.updateSelfPosition_9c9930f
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_updatePlayerPositionInfo_b37c59d impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      playerId: 'test',
      positionInfo: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_updatePlayerPositionInfo_b37c59d',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.updatePlayerPositionInfo_b37c59d
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_setParameters_3a2037f impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      params: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_setParameters_3a2037f',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.setParameters_3a2037f
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_muteLocalAudioStream_5039d15 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      mute: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_muteLocalAudioStream_5039d15',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.muteLocalAudioStream_5039d15
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_muteAllRemoteAudioStreams_5039d15 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      mute: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_muteAllRemoteAudioStreams_5039d15',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.muteAllRemoteAudioStreams_5039d15
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_muteRemoteAudioStream_dbdc15a impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      uid: 'test',
      mute: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_muteRemoteAudioStream_dbdc15a',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.muteRemoteAudioStream_dbdc15a
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_setRemoteAudioAttenuation_74c3e98 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      uid: 'test',
      attenuation: 'test',
      forceSet: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_setRemoteAudioAttenuation_74c3e98',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.setRemoteAudioAttenuation_74c3e98
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_setZones_414a27e impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      zones: 'test',
      zoneCount: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_setZones_414a27e',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.setZones_414a27e
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_setPlayerAttenuation_a15bc51 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      playerId: 'test',
      attenuation: 'test',
      forceSet: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_setPlayerAttenuation_a15bc51',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.setPlayerAttenuation_a15bc51
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('LocalSpatialAudioEngine_clearRemotePositions impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'LocalSpatialAudioEngine_clearRemotePositions',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('LocalSpatialAudioEngine')._impl
        ?.clearRemotePositions
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
