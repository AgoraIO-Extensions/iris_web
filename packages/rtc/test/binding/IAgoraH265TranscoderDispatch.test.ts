/// Generated by terra, DO NOT MODIFY BY HAND.

import * as NATIVE_RTC from '@iris/native-rtc';
import { CallIrisApiResult, IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';

const bindingAPI = require('../../src/binding/IAgoraH265TranscoderDispatch');

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

describe('IH265TranscoderObserver', () => {
  test('H265TranscoderObserver_onEnableTranscode_6ba6646 impl call', async () => {
    let eventHandler = new bindingAPI.IH265TranscoderObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onEnableTranscode_6ba6646(undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('H265TranscoderObserver_onQueryChannel_31ba3df impl call', async () => {
    let eventHandler = new bindingAPI.IH265TranscoderObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onQueryChannel_31ba3df(undefined, undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('H265TranscoderObserver_onTriggerTranscode_6ba6646 impl call', async () => {
    let eventHandler = new bindingAPI.IH265TranscoderObserver(irisRtcEngine);
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onTriggerTranscode_6ba6646(undefined);
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
describe('IH265Transcoder', () => {
  test('H265Transcoder_enableTranscode_a0779eb impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      token: 'test',
      channel: 'test',
      uid: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'H265Transcoder_enableTranscode_a0779eb',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('H265Transcoder')._impl
        ?.enableTranscode_a0779eb
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('H265Transcoder_queryChannel_a0779eb impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      token: 'test',
      channel: 'test',
      uid: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'H265Transcoder_queryChannel_a0779eb',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('H265Transcoder')._impl
        ?.queryChannel_a0779eb
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('H265Transcoder_triggerTranscode_a0779eb impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      token: 'test',
      channel: 'test',
      uid: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'H265Transcoder_triggerTranscode_a0779eb',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('H265Transcoder')._impl
        ?.triggerTranscode_a0779eb
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('H265Transcoder_registerTranscoderObserver_e1ee996 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      observer: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'H265Transcoder_registerTranscoderObserver_e1ee996',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('H265Transcoder')._impl
        ?.registerTranscoderObserver_e1ee996
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('H265Transcoder_unregisterTranscoderObserver_e1ee996 impl call', async () => {
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      observer: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'H265Transcoder_unregisterTranscoderObserver_e1ee996',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('H265Transcoder')._impl
        ?.unregisterTranscoderObserver_e1ee996
    ).toBeUndefined();
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
