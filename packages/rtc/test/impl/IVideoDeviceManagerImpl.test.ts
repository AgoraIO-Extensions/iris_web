import {
  FAKE_VIDEOINPUT_DEVICE_ID,
  FakeAgoraRTCWrapper,
  FakeLocalVideoTrack,
} from '@agoraio-extensions/agora-rtc-sdk-ng-fake';
import * as NATIVE_RTC from '@iris/native-rtc';
import 'jest-canvas-mock';

import { ICameraVideoTrack } from 'agora-rtc-sdk-ng';
import { IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';

import { IVideoDeviceManagerImpl } from '../../src/impl/IVideoDeviceManagerImpl';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';

import { callIris, callIrisWithoutCheck, setupLocalVideo } from '../utils';

let apiEnginePtr: IrisApiEngine;
let irisRtcEngine: IrisRtcEngine;
let videoDeviceManagerImpl: IVideoDeviceManagerImpl;

beforeEach(async () => {
  apiEnginePtr = IrisCore.createIrisApiEngine();
  IrisWebRtc.initIrisRtc(apiEnginePtr, {
    agoraRTC: FakeAgoraRTCWrapper.getFakeAgoraRTC(),
  });
  jest.useFakeTimers();
  irisRtcEngine = apiEnginePtr['apiInterceptors'][0];
  videoDeviceManagerImpl = irisRtcEngine.implDispatchesMap.get(
    'VideoDeviceManager'
  )._impl;
  jest.spyOn(irisRtcEngine, 'returnResult');

  let nParam = {
    context: {
      areaCode: 1,
      logConfig: {
        level: 1,
      },
    },
  };
  await callIris(apiEnginePtr, 'RtcEngine_initialize_0320339', nParam);
});

afterEach(() => {
  IrisCore.disposeIrisApiEngine(apiEnginePtr);
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('IAgoraRtcEngineImpl', () => {
  test('enumerateVideoDevices', async () => {
    let result = await callIrisWithoutCheck(
      apiEnginePtr,
      'VideoDeviceManager_enumerateVideoDevices'
    );
    expect(result.code).toBe(NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK);
    expect(irisRtcEngine.globalState.playbackDevices.length).not.toBe(0);
    expect(irisRtcEngine.globalState.recordingDevices.length).not.toBe(0);
    expect(irisRtcEngine.globalState.videoDevices.length).not.toBe(0);
    expect(JSON.parse(result.data).result.length).toBe(1);
  });
  test('setDevice_4ad5f6e', async () => {
    let param = {
      deviceIdUTF8: 1,
    };
    await setupLocalVideo(apiEnginePtr);
    jest.spyOn(
      irisRtcEngine.irisClientManager.getLocalVideoTrackPackageBySourceType(
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA
      )[0].track as ICameraVideoTrack,
      'setDevice'
    );
    await callIris(apiEnginePtr, 'VideoDeviceManager_setDevice_4ad5f6e', param);
    expect(irisRtcEngine.globalState.videoDeviceId).toBe(param.deviceIdUTF8);
    expect(
      (irisRtcEngine.irisClientManager.getLocalVideoTrackPackageBySourceType(
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA
      )[0].track as ICameraVideoTrack).setDevice
    ).toBeCalledWith(param.deviceIdUTF8);
  });
  test('getDevice_73b9872', async () => {
    jest.spyOn(irisRtcEngine.globalState.AgoraRTC, 'getCameras');
    let param = {
      deviceIdUTF8: 1,
    };
    let result = await callIrisWithoutCheck(
      apiEnginePtr,
      'VideoDeviceManager_getDevice_73b9872',
      param
    );
    expect(result.code).toBe(NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK);
    expect(JSON.parse(result.data).deviceIdUTF8).toBe(
      FAKE_VIDEOINPUT_DEVICE_ID
    );
    expect(irisRtcEngine.globalState.AgoraRTC.getCameras).toBeCalledTimes(1);
    jest.clearAllMocks();
    await callIris(apiEnginePtr, 'VideoDeviceManager_setDevice_4ad5f6e', param);
    await callIris(apiEnginePtr, 'VideoDeviceManager_getDevice_73b9872', param);
    expect(irisRtcEngine.globalState.AgoraRTC.getCameras).toBeCalledTimes(0);
  });
  test('release', async () => {
    await callIris(apiEnginePtr, 'VideoDeviceManager_release', { sync: false });
    expect(irisRtcEngine.globalState.videoDevices.length).toBe(0);
  });
});
