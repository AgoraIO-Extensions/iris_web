import {
  FakeAgoraRTCWrapper,
  FakeLocalVideoTrack,
} from '@agoraio-extensions/agora-rtc-sdk-ng-fake';
import * as NATIVE_RTC from '@iris/native-rtc';
import 'jest-canvas-mock';

import { IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';
import { AgoraConsole } from '../../src/util';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';

import { callIris, callIrisWithoutCheck, setupLocalVideo } from '../utils';

import { IMediaEngineImpl } from './IAgoraMediaEngineImpl';

let apiEnginePtr: IrisApiEngine;
let irisRtcEngine: IrisRtcEngine;
let mediaEngineImpl: IMediaEngineImpl;

beforeEach(async () => {
  apiEnginePtr = IrisCore.createIrisApiEngine();
  IrisWebRtc.initIrisRtc(apiEnginePtr, {
    agoraRTC: FakeAgoraRTCWrapper.getFakeAgoraRTC(),
  });
  jest.useFakeTimers();
  irisRtcEngine = apiEnginePtr['apiInterceptors'][0];
  mediaEngineImpl = irisRtcEngine.implDispatchesMap.get('MediaEngine')._impl;
  jest.spyOn(irisRtcEngine, 'returnResult');

  let nParam = {
    context: {
      areaCode: 1,
      logConfig: {
        level: 1,
      },
    },
  };
  await callIris(apiEnginePtr, 'RtcEngine_initialize', nParam);
});

afterEach(() => {
  IrisCore.disposeIrisApiEngine(apiEnginePtr);
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('IAgoraRtcEngineImpl', () => {
  test('setExternalVideoSource', async () => {
    let param = {
      enabled: true,
      useTexture: true,
      sourceType: NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE.ENCODED_VIDEO_FRAME,
      encodedVideoOption: {
        ccMode: NATIVE_RTC.TCcMode.CC_DISABLED,
        codecType: NATIVE_RTC.VIDEO_CODEC_TYPE.VIDEO_CODEC_AV1,
        targetBitrate: 1,
      },
    };
    await callIris(apiEnginePtr, 'MediaEngine_setExternalVideoSource', param);
    expect(irisRtcEngine.globalState.pushVideoFrameEnabled).toBe(param.enabled);
    expect(irisRtcEngine.globalState.pushVideoFrameUseTexture).toBe(
      param.useTexture
    );
    expect(irisRtcEngine.globalState.pushVideoFrameSourceType).toBe(
      param.sourceType
    );
    expect(
      irisRtcEngine.globalState.pushVideoFrameEncodedVideoOption.ccMode
    ).toBe(param.encodedVideoOption.ccMode);
  });

  test('pushVideoFrame', async () => {
    const createElement = document.createElement.bind(document);
    document.createElement = (tagName: any) => {
      if (tagName === 'canvas') {
        const element = createElement(tagName);
        element.captureStream = jest.fn().mockReturnValue({
          getVideoTracks: jest
            .fn()
            .mockReturnValue([FakeLocalVideoTrack.create()]),
        });
        return element;
      }
      return createElement(tagName);
    };
    let param = {
      enabled: true,
      useTexture: true,
      sourceType: NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE.ENCODED_VIDEO_FRAME,
      encodedVideoOption: {
        ccMode: NATIVE_RTC.TCcMode.CC_DISABLED,
        codecType: NATIVE_RTC.VIDEO_CODEC_TYPE.VIDEO_CODEC_AV1,
        targetBitrate: 1,
      },
    };
    let param2 = {
      frame: {
        type: NATIVE_RTC.VIDEO_BUFFER_TYPE.VIDEO_BUFFER_ARRAY,
        format: NATIVE_RTC.VIDEO_PIXEL_FORMAT.VIDEO_PIXEL_BGRA,
        buffer: 'buffer',
        stride: 1,
        height: 2,
      },
      videoTrackId: 1,
    };
    jest.spyOn(AgoraConsole, 'error');

    await callIris(apiEnginePtr, 'MediaEngine_pushVideoFrame', param2);
    expect(AgoraConsole.error).toBeCalledWith(
      'call enableVideo(true) before startPreview'
    );
    jest.clearAllMocks();
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'MediaEngine_pushVideoFrame', param2);
    expect(AgoraConsole.error).toBeCalledWith(
      'pushVideoFrameEnabled is disabled , call setExternalVideoSource first'
    );
    await callIris(apiEnginePtr, 'MediaEngine_setExternalVideoSource', param);
    await callIris(apiEnginePtr, 'MediaEngine_pushVideoFrame', param2);
    expect(
      irisRtcEngine.irisClientManager.getLocalVideoTrackPackageBySourceType(
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM
      ).length
    ).toBe(1);
    expect(
      irisRtcEngine.irisClientManager.getLocalVideoTrackPackageBySourceType(
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM
      )[0].track!.isPlaying
    ).toBeFalsy();
    await setupLocalVideo(apiEnginePtr, {
      canvas: {
        view: 'test-view',
        sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM,
      },
    });
    await callIris(apiEnginePtr, 'MediaEngine_pushVideoFrame', param2);
    expect(
      irisRtcEngine.irisClientManager.getLocalVideoTrackPackageBySourceType(
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM
      )[0].track!.isPlaying
    ).toBeTruthy();
  });
  test('registerAudioFrameObserver', async () => {
    jest.spyOn(irisRtcEngine.irisEventHandlerManager, 'addEventHandler');
    await callIris(apiEnginePtr, 'MediaEngine_registerAudioFrameObserver', {
      observer: 'test',
    });

    expect(
      irisRtcEngine.irisEventHandlerManager.addEventHandler
    ).toBeCalledTimes(1);
    expect(
      irisRtcEngine.irisEventHandlerManager.addEventHandler
    ).toBeCalledWith('RtcEngine', 'test');
    expect(
      irisRtcEngine.irisEventHandlerManager['eventHandlersMap'].get('RtcEngine')
        .length == 1
    ).toBe(true);
    expect(
      irisRtcEngine.irisEventHandlerManager['eventHandlersMap'].get(
        'RtcEngine'
      )[0] === 'test'
    ).toBe(true);
  });
  test('unregisterAudioFrameObserver', async () => {
    await callIris(apiEnginePtr, 'MediaEngine_registerAudioFrameObserver', {
      observer: 'test',
    });
    expect(
      irisRtcEngine.irisEventHandlerManager['eventHandlersMap'].get('RtcEngine')
        .length == 1
    ).toBe(true);
    jest.spyOn(irisRtcEngine.irisEventHandlerManager, 'removeEventHandler');
    await callIris(apiEnginePtr, 'MediaEngine_unregisterAudioFrameObserver', {
      observer: 'test',
    });
    expect(
      irisRtcEngine.irisEventHandlerManager['eventHandlersMap'].get('RtcEngine')
        .length == 0
    ).toBe(true);
    expect(
      irisRtcEngine.irisEventHandlerManager.removeEventHandler
    ).toBeCalledTimes(1);
    expect(
      irisRtcEngine.irisEventHandlerManager.removeEventHandler
    ).toBeCalledWith('RtcEngine', 'test');
  });
});
