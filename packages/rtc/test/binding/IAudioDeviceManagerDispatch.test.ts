/// Generated by terra, DO NOT MODIFY BY HAND.

import * as NATIVE_RTC from '@iris/native-rtc';
import { CallIrisApiResult, IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';
import * as bufferExtensions from '../../src/extensions/CallApiBufferExtensions';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';

const bindingAPI = require('../../src/binding/IAudioDeviceManagerDispatch');

let apiEnginePtr: IrisApiEngine;
let irisRtcEngine: IrisRtcEngine;
beforeAll(async () => {
  apiEnginePtr = IrisCore.createIrisApiEngine();
  IrisWebRtc.initIrisRtc(apiEnginePtr);
  irisRtcEngine = apiEnginePtr['apiInterceptors'][0];
  irisRtcEngine.implHelper.createAudioTrack = jest.fn();
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

describe('IAudioDeviceManager', () => {
  test('AudioDeviceManager_enumeratePlaybackDevices impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_enumeratePlaybackDevices',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.enumeratePlaybackDevices
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_enumerateRecordingDevices impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_enumerateRecordingDevices',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.enumerateRecordingDevices
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_setPlaybackDevice_4ad5f6e impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      deviceId: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_setPlaybackDevice_4ad5f6e',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.setPlaybackDevice_4ad5f6e
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_getPlaybackDevice_73b9872 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      deviceId: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_getPlaybackDevice_73b9872',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.getPlaybackDevice_73b9872
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_getPlaybackDeviceInfo_5540658 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_getPlaybackDeviceInfo_5540658',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.getPlaybackDeviceInfo_5540658
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_setPlaybackDeviceVolume_46f8ab7 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      volume: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_setPlaybackDeviceVolume_46f8ab7',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.setPlaybackDeviceVolume_46f8ab7
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_getPlaybackDeviceVolume_915cb25 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      volume: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_getPlaybackDeviceVolume_915cb25',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.getPlaybackDeviceVolume_915cb25
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_setRecordingDevice_4ad5f6e impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      deviceId: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_setRecordingDevice_4ad5f6e',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.setRecordingDevice_4ad5f6e
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_getRecordingDevice_73b9872 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      deviceId: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_getRecordingDevice_73b9872',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.getRecordingDevice_73b9872
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_getRecordingDeviceInfo_5540658 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_getRecordingDeviceInfo_5540658',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.getRecordingDeviceInfo_5540658
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_setRecordingDeviceVolume_46f8ab7 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      volume: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_setRecordingDeviceVolume_46f8ab7',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.setRecordingDeviceVolume_46f8ab7
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_getRecordingDeviceVolume_915cb25 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      volume: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_getRecordingDeviceVolume_915cb25',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.getRecordingDeviceVolume_915cb25
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_setLoopbackDevice_4ad5f6e impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      deviceId: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_setLoopbackDevice_4ad5f6e',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.setLoopbackDevice_4ad5f6e
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_getLoopbackDevice_73b9872 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      deviceId: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_getLoopbackDevice_73b9872',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.getLoopbackDevice_73b9872
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_setPlaybackDeviceMute_5039d15 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      mute: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_setPlaybackDeviceMute_5039d15',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.setPlaybackDeviceMute_5039d15
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_getPlaybackDeviceMute_d942327 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      mute: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_getPlaybackDeviceMute_d942327',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.getPlaybackDeviceMute_d942327
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_setRecordingDeviceMute_5039d15 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      mute: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_setRecordingDeviceMute_5039d15',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.setRecordingDeviceMute_5039d15
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_getRecordingDeviceMute_d942327 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      mute: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_getRecordingDeviceMute_d942327',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.getRecordingDeviceMute_d942327
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_startPlaybackDeviceTest_3a2037f impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      testAudioFilePath: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_startPlaybackDeviceTest_3a2037f',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.startPlaybackDeviceTest_3a2037f
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_stopPlaybackDeviceTest impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_stopPlaybackDeviceTest',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.stopPlaybackDeviceTest
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_startRecordingDeviceTest_46f8ab7 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      indicationInterval: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_startRecordingDeviceTest_46f8ab7',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.startRecordingDeviceTest_46f8ab7
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_stopRecordingDeviceTest impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_stopRecordingDeviceTest',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.stopRecordingDeviceTest
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_startAudioDeviceLoopbackTest_46f8ab7 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      indicationInterval: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_startAudioDeviceLoopbackTest_46f8ab7',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.startAudioDeviceLoopbackTest_46f8ab7
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_stopAudioDeviceLoopbackTest impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_stopAudioDeviceLoopbackTest',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.stopAudioDeviceLoopbackTest
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_followSystemPlaybackDevice_5039d15 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      enable: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_followSystemPlaybackDevice_5039d15',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.followSystemPlaybackDevice_5039d15
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_followSystemRecordingDevice_5039d15 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      enable: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_followSystemRecordingDevice_5039d15',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.followSystemRecordingDevice_5039d15
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_followSystemLoopbackDevice_5039d15 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      enable: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_followSystemLoopbackDevice_5039d15',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl
        ?.followSystemLoopbackDevice_5039d15
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('AudioDeviceManager_release impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'AudioDeviceManager_release',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('AudioDeviceManager')._impl?.release
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
