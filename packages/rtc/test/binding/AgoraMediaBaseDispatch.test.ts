/// Generated by terra, DO NOT MODIFY BY HAND.

import * as NATIVE_RTC from '@iris/native-rtc';
import { CallIrisApiResult, IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';
import * as bufferExtensions from '../../src/extensions/CallApiBufferExtensions';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';

const bindingAPI = require('../../src/binding/AgoraMediaBaseDispatch');

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

describe('IVideoFrameMetaInfo', () => {
  test('VideoFrameMetaInfo_getMetaInfoStr_c81192f impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      key: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'VideoFrameMetaInfo_getMetaInfoStr_c81192f',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('VideoFrameMetaInfo')._impl
        ?.getMetaInfoStr_c81192f
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
describe('IAudioPcmFrameSink', () => {
  test('AudioPcmFrameSink_onFrame_95f515a impl call', async () => {
    let eventHandler = new bindingAPI.IAudioPcmFrameSink(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onFrame_95f515a(undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
describe('IAudioFrameObserverBase', () => {
  test('AudioFrameObserver_onRecordAudioFrame_4c8de15 impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onRecordAudioFrame_4c8de15(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_onPlaybackAudioFrame_4c8de15 impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPlaybackAudioFrame_4c8de15(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_onMixedAudioFrame_4c8de15 impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onMixedAudioFrame_4c8de15(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_onEarMonitoringAudioFrame_5405a47 impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onEarMonitoringAudioFrame_5405a47(undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_onPlaybackAudioFrameBeforeMixing_9215cc7 impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPlaybackAudioFrameBeforeMixing_9215cc7(
      undefined,
      undefined,
      undefined
    );
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_getObservedAudioFramePosition impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getObservedAudioFramePosition();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_getPlaybackAudioParams impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getPlaybackAudioParams();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_getRecordAudioParams impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getRecordAudioParams();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_getMixedAudioParams impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getMixedAudioParams();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_getEarMonitoringAudioParams impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getEarMonitoringAudioParams();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
describe('IAudioFrameObserver', () => {
  test('AudioFrameObserver_onPlaybackAudioFrameBeforeMixing_85ec0fc impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPlaybackAudioFrameBeforeMixing_85ec0fc(
      undefined,
      undefined,
      undefined
    );
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_onRecordAudioFrame_4c8de15 impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onRecordAudioFrame_4c8de15(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_onPlaybackAudioFrame_4c8de15 impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPlaybackAudioFrame_4c8de15(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_onMixedAudioFrame_4c8de15 impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onMixedAudioFrame_4c8de15(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_onEarMonitoringAudioFrame_5405a47 impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onEarMonitoringAudioFrame_5405a47(undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_onPlaybackAudioFrameBeforeMixing_9215cc7 impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPlaybackAudioFrameBeforeMixing_9215cc7(
      undefined,
      undefined,
      undefined
    );
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_getObservedAudioFramePosition impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getObservedAudioFramePosition();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_getPlaybackAudioParams impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getPlaybackAudioParams();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_getRecordAudioParams impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getRecordAudioParams();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_getMixedAudioParams impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getMixedAudioParams();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioFrameObserver_getEarMonitoringAudioParams impl call', async () => {
    let eventHandler = new bindingAPI.IAudioFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getEarMonitoringAudioParams();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
describe('IAudioSpectrumObserver', () => {
  test('AudioSpectrumObserver_onLocalAudioSpectrum_5822fed impl call', async () => {
    let eventHandler = new bindingAPI.IAudioSpectrumObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onLocalAudioSpectrum_5822fed(undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('AudioSpectrumObserver_onRemoteAudioSpectrum_8ea2cde impl call', async () => {
    let eventHandler = new bindingAPI.IAudioSpectrumObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onRemoteAudioSpectrum_8ea2cde(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
describe('IVideoEncodedFrameObserver', () => {
  test('VideoEncodedFrameObserver_onEncodedVideoFrameReceived_6922697 impl call', async () => {
    let eventHandler = new bindingAPI.IVideoEncodedFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onEncodedVideoFrameReceived_6922697(
      undefined,
      undefined,
      undefined,
      undefined
    );
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
describe('IVideoFrameObserver', () => {
  test('VideoFrameObserver_onCaptureVideoFrame_1673590 impl call', async () => {
    let eventHandler = new bindingAPI.IVideoFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onCaptureVideoFrame_1673590(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('VideoFrameObserver_onPreEncodeVideoFrame_1673590 impl call', async () => {
    let eventHandler = new bindingAPI.IVideoFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPreEncodeVideoFrame_1673590(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('VideoFrameObserver_onMediaPlayerVideoFrame_e648e2c impl call', async () => {
    let eventHandler = new bindingAPI.IVideoFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onMediaPlayerVideoFrame_e648e2c(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('VideoFrameObserver_onRenderVideoFrame_43dcf82 impl call', async () => {
    let eventHandler = new bindingAPI.IVideoFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onRenderVideoFrame_43dcf82(undefined, undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('VideoFrameObserver_onTranscodedVideoFrame_27754d8 impl call', async () => {
    let eventHandler = new bindingAPI.IVideoFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onTranscodedVideoFrame_27754d8(undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('VideoFrameObserver_getVideoFrameProcessMode impl call', async () => {
    let eventHandler = new bindingAPI.IVideoFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getVideoFrameProcessMode();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('VideoFrameObserver_getVideoFormatPreference impl call', async () => {
    let eventHandler = new bindingAPI.IVideoFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getVideoFormatPreference();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('VideoFrameObserver_getRotationApplied impl call', async () => {
    let eventHandler = new bindingAPI.IVideoFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getRotationApplied();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('VideoFrameObserver_getMirrorApplied impl call', async () => {
    let eventHandler = new bindingAPI.IVideoFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getMirrorApplied();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('VideoFrameObserver_getObservedFramePosition impl call', async () => {
    let eventHandler = new bindingAPI.IVideoFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.getObservedFramePosition();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
describe('IFaceInfoObserver', () => {
  test('FaceInfoObserver_onFaceInfo_3a2037f impl call', async () => {
    let eventHandler = new bindingAPI.IFaceInfoObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onFaceInfo_3a2037f(undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
describe('IMediaRecorderObserver', () => {
  test('MediaRecorderObserver_onRecorderStateChanged_c38849f impl call', async () => {
    let eventHandler = new bindingAPI.IMediaRecorderObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onRecorderStateChanged_c38849f(
      undefined,
      undefined,
      undefined,
      undefined
    );
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('MediaRecorderObserver_onRecorderInfoUpdated_64fa74a impl call', async () => {
    let eventHandler = new bindingAPI.IMediaRecorderObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onRecorderInfoUpdated_64fa74a(undefined, undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
