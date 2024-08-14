/// Generated by terra, DO NOT MODIFY BY HAND.

import * as NATIVE_RTC from '@iris/native-rtc';
import { CallIrisApiResult, IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';
import * as bufferExtensions from '../../src/extensions/CallApiBufferExtensions';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';

const bindingAPI = require('../../src/binding/IAgoraMediaEngineDispatch');

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

describe('IMediaEngine', () => {
  test('MediaEngine_registerAudioFrameObserver_d873a64 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      observer: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_registerAudioFrameObserver_d873a64',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        ?.registerAudioFrameObserver_d873a64
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('MediaEngine_registerVideoFrameObserver_2cc0ef1 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      observer: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_registerVideoFrameObserver_2cc0ef1',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        ?.registerVideoFrameObserver_2cc0ef1
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('MediaEngine_registerVideoEncodedFrameObserver_d45d579 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      observer: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_registerVideoEncodedFrameObserver_d45d579',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        ?.registerVideoEncodedFrameObserver_d45d579
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('MediaEngine_registerFaceInfoObserver_0303ed6 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      observer: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_registerFaceInfoObserver_0303ed6',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        ?.registerFaceInfoObserver_0303ed6
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('MediaEngine_pushAudioFrame_c71f4ab impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      frame: 'test',
      trackId: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_pushAudioFrame_c71f4ab',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        ?.pushAudioFrame_c71f4ab
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('MediaEngine_pullAudioFrame_2c74a9c impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      frame: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_pullAudioFrame_2c74a9c',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        ?.pullAudioFrame_2c74a9c
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('MediaEngine_setExternalVideoSource_fff99b6 parameter', async () => {
    let nParam = {
      enabled: undefined,
      useTexture: undefined,
      sourceType: undefined,
      encodedVideoOption: undefined,
    };
    try {
      await IrisCore.callIrisApi(
        apiEnginePtr,
        new IrisCore.EventParam(
          'MediaEngine_setExternalVideoSource_fff99b6',
          JSON.stringify(nParam),
          0,
          '',
          ['test'],
          [],
          1
        )
      );
    } catch (e) {
      expect(e).toEqual('enabled is undefined');
    }
    //@ts-ignore
    nParam.enabled = 'test';
    try {
      await IrisCore.callIrisApi(
        apiEnginePtr,
        new IrisCore.EventParam(
          'MediaEngine_setExternalVideoSource_fff99b6',
          JSON.stringify(nParam),
          0,
          '',
          ['test'],
          [],
          1
        )
      );
    } catch (e) {
      expect(e).toEqual('useTexture is undefined');
    }
    //@ts-ignore
    nParam.useTexture = 'test';
    try {
      await IrisCore.callIrisApi(
        apiEnginePtr,
        new IrisCore.EventParam(
          'MediaEngine_setExternalVideoSource_fff99b6',
          JSON.stringify(nParam),
          0,
          '',
          ['test'],
          [],
          1
        )
      );
    } catch (e) {
      expect(e).toEqual('sourceType is undefined');
    }
    //@ts-ignore
    nParam.sourceType = 'test';
    try {
      await IrisCore.callIrisApi(
        apiEnginePtr,
        new IrisCore.EventParam(
          'MediaEngine_setExternalVideoSource_fff99b6',
          JSON.stringify(nParam),
          0,
          '',
          ['test'],
          [],
          1
        )
      );
    } catch (e) {
      expect(e).toEqual('encodedVideoOption is undefined');
    }
    //@ts-ignore
    nParam.encodedVideoOption = 'test';
  });

  test('MediaEngine_setExternalVideoSource_fff99b6 impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl,
        'setExternalVideoSource_fff99b6'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      enabled: 'test',
      useTexture: 'test',
      sourceType: 'test',
      encodedVideoOption: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_setExternalVideoSource_fff99b6',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        .setExternalVideoSource_fff99b6
    ).toBeCalledTimes(1);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        .setExternalVideoSource_fff99b6
    ).toBeCalledWith('test', 'test', 'test', 'test');
  });

  test('MediaEngine_setExternalAudioSource_e6538be impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      enabled: 'test',
      sampleRate: 'test',
      channels: 'test',
      localPlayback: 'test',
      publish: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_setExternalAudioSource_e6538be',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        ?.setExternalAudioSource_e6538be
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('MediaEngine_createCustomAudioTrack_5a0bf1a impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      trackType: 'test',
      config: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_createCustomAudioTrack_5a0bf1a',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        ?.createCustomAudioTrack_5a0bf1a
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('MediaEngine_destroyCustomAudioTrack_6178b5d impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      trackId: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_destroyCustomAudioTrack_6178b5d',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        ?.destroyCustomAudioTrack_6178b5d
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('MediaEngine_setExternalAudioSink_d275ce0 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      enabled: 'test',
      sampleRate: 'test',
      channels: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_setExternalAudioSink_d275ce0',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        ?.setExternalAudioSink_d275ce0
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('MediaEngine_enableCustomAudioLocalPlayback_5f38e8a impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      trackId: 'test',
      enabled: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_enableCustomAudioLocalPlayback_5f38e8a',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        ?.enableCustomAudioLocalPlayback_5f38e8a
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('MediaEngine_pushVideoFrame_4e544e2 parameter', async () => {
    let nParam = {
      frame: 'test',
      videoTrackId: 'test',
    };
    jest.spyOn(bufferExtensions, 'callApiBufferExtension');
    await IrisCore.callIrisApi(
      apiEnginePtr,
      new IrisCore.EventParam(
        'MediaEngine_pushVideoFrame_4e544e2',
        JSON.stringify(nParam),
        0,
        '',
        ['test'],
        [],
        1
      )
    );
    expect(bufferExtensions.callApiBufferExtension).toBeCalledTimes(1);
  });

  test('MediaEngine_pushVideoFrame_4e544e2 impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl,
        'pushVideoFrame_4e544e2'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      frame: 'test',
      videoTrackId: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_pushVideoFrame_4e544e2',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        .pushVideoFrame_4e544e2
    ).toBeCalledTimes(1);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        .pushVideoFrame_4e544e2
    ).toBeCalledWith('test', 'test');
  });

  test('MediaEngine_pushEncodedVideoImage_e71452b impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      imageBuffer: 'test',
      length: 'test',
      videoEncodedFrameInfo: 'test',
      videoTrackId: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_pushEncodedVideoImage_e71452b',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        ?.pushEncodedVideoImage_e71452b
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('MediaEngine_addVideoFrameRenderer_2cc0ef1 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      renderer: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_addVideoFrameRenderer_2cc0ef1',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        ?.addVideoFrameRenderer_2cc0ef1
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('MediaEngine_removeVideoFrameRenderer_2cc0ef1 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      renderer: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_removeVideoFrameRenderer_2cc0ef1',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl
        ?.removeVideoFrameRenderer_2cc0ef1
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('MediaEngine_release impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'MediaEngine_release',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl?.release
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
