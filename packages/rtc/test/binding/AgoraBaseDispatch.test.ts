/// Generated by terra, DO NOT MODIFY BY HAND.

import * as NATIVE_RTC from '@iris/native-rtc';
import { CallIrisApiResult, IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';

const bindingAPI = require('../../src/binding/AgoraBaseDispatch');

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

describe('IAudioEncodedFrameObserver', () => {
  test('AudioEncodedFrameObserver_onRecordAudioEncodedFrame_d930ddc impl call', async () => {
    let eventHandler = new bindingAPI.IAudioEncodedFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onRecordAudioEncodedFrame_d930ddc(
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
  test('AudioEncodedFrameObserver_onPlaybackAudioEncodedFrame_d930ddc impl call', async () => {
    let eventHandler = new bindingAPI.IAudioEncodedFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPlaybackAudioEncodedFrame_d930ddc(
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
  test('AudioEncodedFrameObserver_onMixedAudioEncodedFrame_d930ddc impl call', async () => {
    let eventHandler = new bindingAPI.IAudioEncodedFrameObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onMixedAudioEncodedFrame_d930ddc(
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
