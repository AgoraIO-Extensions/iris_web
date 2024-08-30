/// Generated by terra, DO NOT MODIFY BY HAND.

import * as NATIVE_RTC from '@iris/native-rtc';
import { CallIrisApiResult, IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';
import * as bufferExtensions from '../../src/extensions/CallApiBufferExtensions';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';

const bindingAPI = require('../../src/binding/IAgoraMediaPlayerSourceDispatch');

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

describe('IMediaPlayerSourceObserver', () => {
  test('MediaPlayerSourceObserver_onPlayerSourceStateChanged_7fb38f1 impl call', async () => {
    let eventHandler = new bindingAPI.IMediaPlayerSourceObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPlayerSourceStateChanged_7fb38f1(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('MediaPlayerSourceObserver_onPositionChanged_303b92e impl call', async () => {
    let eventHandler = new bindingAPI.IMediaPlayerSourceObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPositionChanged_303b92e(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('MediaPlayerSourceObserver_onPlayerEvent_50f16fa impl call', async () => {
    let eventHandler = new bindingAPI.IMediaPlayerSourceObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPlayerEvent_50f16fa(undefined, undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('MediaPlayerSourceObserver_onMetaData_469a01b impl call', async () => {
    let eventHandler = new bindingAPI.IMediaPlayerSourceObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onMetaData_469a01b(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('MediaPlayerSourceObserver_onPlayBufferUpdated_f631116 impl call', async () => {
    let eventHandler = new bindingAPI.IMediaPlayerSourceObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPlayBufferUpdated_f631116(undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('MediaPlayerSourceObserver_onPreloadEvent_a1e3596 impl call', async () => {
    let eventHandler = new bindingAPI.IMediaPlayerSourceObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPreloadEvent_a1e3596(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('MediaPlayerSourceObserver_onCompleted impl call', async () => {
    let eventHandler = new bindingAPI.IMediaPlayerSourceObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onCompleted();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('MediaPlayerSourceObserver_onAgoraCDNTokenWillExpire impl call', async () => {
    let eventHandler = new bindingAPI.IMediaPlayerSourceObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onAgoraCDNTokenWillExpire();
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('MediaPlayerSourceObserver_onPlayerSrcInfoChanged_54f3e5a impl call', async () => {
    let eventHandler = new bindingAPI.IMediaPlayerSourceObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPlayerSrcInfoChanged_54f3e5a(undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('MediaPlayerSourceObserver_onPlayerInfoUpdated_0e902a8 impl call', async () => {
    let eventHandler = new bindingAPI.IMediaPlayerSourceObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPlayerInfoUpdated_0e902a8(undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('MediaPlayerSourceObserver_onPlayerCacheStats_0145940 impl call', async () => {
    let eventHandler = new bindingAPI.IMediaPlayerSourceObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPlayerCacheStats_0145940(undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('MediaPlayerSourceObserver_onPlayerPlaybackStats_ffa466f impl call', async () => {
    let eventHandler = new bindingAPI.IMediaPlayerSourceObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPlayerPlaybackStats_ffa466f(undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('MediaPlayerSourceObserver_onAudioVolumeIndication_46f8ab7 impl call', async () => {
    let eventHandler = new bindingAPI.IMediaPlayerSourceObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onAudioVolumeIndication_46f8ab7(undefined);
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
