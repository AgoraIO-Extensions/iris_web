import {
  FAKE_PLAYBACKINPUT_DEVICE_ID,
  FAKE_RECORDINGINPUT_DEVICE_ID,
  FakeAgoraRTCWrapper,
} from '@agoraio-extensions/agora-rtc-sdk-ng-fake';
import * as NATIVE_RTC from '@iris/native-rtc';
import 'jest-canvas-mock';

import { IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';
import { IrisAudioSourceType } from '../../src/base/BaseType';

import { IAudioDeviceManagerImpl } from '../../src/impl/IAudioDeviceManagerImpl';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';

import {
  callIris,
  callIrisWithoutCheck,
  joinChannel,
  setupLocalVideo,
} from '../utils';

let apiEnginePtr: IrisApiEngine;
let irisRtcEngine: IrisRtcEngine;
let audioDeviceManagerImpl: IAudioDeviceManagerImpl;

beforeEach(async () => {
  apiEnginePtr = IrisCore.createIrisApiEngine();
  IrisWebRtc.initIrisRtc(apiEnginePtr, {
    agoraRTC: FakeAgoraRTCWrapper.getFakeAgoraRTC(),
  });
  jest.useFakeTimers();
  irisRtcEngine = apiEnginePtr['apiInterceptors'][0];
  audioDeviceManagerImpl = irisRtcEngine.implDispatchesMap.get(
    'AudioDeviceManager'
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
  await callIris(apiEnginePtr, 'RtcEngine_initialize', nParam);
});

afterEach(() => {
  IrisCore.disposeIrisApiEngine(apiEnginePtr);
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('IAgoraRtcEngineImpl', () => {
  test('enumeratePlaybackDevices', async () => {
    let result = await callIrisWithoutCheck(
      apiEnginePtr,
      'AudioDeviceManager_enumeratePlaybackDevices'
    );
    expect(result.code).toBe(NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK);
    expect(irisRtcEngine.globalState.playbackDevices.length).not.toBe(0);
    expect(irisRtcEngine.globalState.recordingDevices.length).not.toBe(0);
    expect(irisRtcEngine.globalState.videoDevices.length).not.toBe(0);
    expect(JSON.parse(result.data).result.length).toBe(1);
  });
  test('enumerateRecordingDevices', async () => {
    let result = await callIrisWithoutCheck(
      apiEnginePtr,
      'AudioDeviceManager_enumerateRecordingDevices'
    );
    expect(result.code).toBe(NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK);
    expect(irisRtcEngine.globalState.playbackDevices.length).not.toBe(0);
    expect(irisRtcEngine.globalState.recordingDevices.length).not.toBe(0);
    expect(irisRtcEngine.globalState.videoDevices.length).not.toBe(0);
    expect(JSON.parse(result.data).result.length).toBe(1);
  });
  test('setPlaybackDevice', async () => {
    let param = {
      deviceId: 1,
    };
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    await joinChannel(apiEnginePtr, null);
    let remoteAudioTrack = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      irisRtcEngine.irisClientManager.remoteUserPackages[0].connection
    ).agoraRTCClient?.remoteUsers[0].audioTrack!;
    jest.spyOn(remoteAudioTrack, 'setPlaybackDevice');
    await callIris(apiEnginePtr, 'AudioDeviceManager_setPlaybackDevice', param);
    expect(irisRtcEngine.globalState.playbackDeviceId).toBe(param.deviceId);
    expect(remoteAudioTrack.setPlaybackDevice).toBeCalledWith(param.deviceId);
  });
  test('getPlaybackDevice', async () => {
    jest.spyOn(irisRtcEngine.globalState.AgoraRTC, 'getPlaybackDevices');
    let param = {
      deviceId: 1,
    };
    let result = await callIrisWithoutCheck(
      apiEnginePtr,
      'AudioDeviceManager_getPlaybackDevice',
      param
    );
    expect(result.code).toBe(NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK);
    expect(JSON.parse(result.data).deviceId).toBe(FAKE_PLAYBACKINPUT_DEVICE_ID);
    expect(
      irisRtcEngine.globalState.AgoraRTC.getPlaybackDevices
    ).toBeCalledTimes(1);
    jest.clearAllMocks();
    await callIris(apiEnginePtr, 'AudioDeviceManager_setPlaybackDevice', param);
    await callIris(apiEnginePtr, 'AudioDeviceManager_getPlaybackDevice', param);
    expect(
      irisRtcEngine.globalState.AgoraRTC.getPlaybackDevices
    ).toBeCalledTimes(0);
  });
  test('setRecordingDevice', async () => {
    let param = {
      deviceId: 1,
    };
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    await joinChannel(apiEnginePtr, null);
    jest.spyOn(
      irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
      )[0].track as IMicrophoneAudioTrack,
      'setDevice'
    );
    await callIris(
      apiEnginePtr,
      'AudioDeviceManager_setRecordingDevice',
      param
    );
    expect(irisRtcEngine.globalState.recordingDeviceId).toBe(param.deviceId);
    expect(
      (irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
      )[0].track as IMicrophoneAudioTrack).setDevice
    ).toBeCalledWith(param.deviceId);
  });
  test('getRecordingDevice', async () => {
    jest.spyOn(irisRtcEngine.globalState.AgoraRTC, 'getMicrophones');
    let param = {
      deviceId: 1,
    };
    let result = await callIrisWithoutCheck(
      apiEnginePtr,
      'AudioDeviceManager_getRecordingDevice',
      param
    );
    expect(result.code).toBe(NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK);
    expect(JSON.parse(result.data).deviceId).toBe(
      FAKE_RECORDINGINPUT_DEVICE_ID
    );
    expect(irisRtcEngine.globalState.AgoraRTC.getMicrophones).toBeCalledTimes(
      1
    );
    jest.clearAllMocks();
    await callIris(
      apiEnginePtr,
      'AudioDeviceManager_setRecordingDevice',
      param
    );
    await callIris(
      apiEnginePtr,
      'AudioDeviceManager_getRecordingDevice',
      param
    );
    expect(irisRtcEngine.globalState.AgoraRTC.getMicrophones).toBeCalledTimes(
      0
    );
  });
  test('release', async () => {
    await callIris(apiEnginePtr, 'AudioDeviceManager_release', { sync: false });
    expect(irisRtcEngine.globalState.playbackDevices.length).toBe(0);
    expect(irisRtcEngine.globalState.recordingDevices.length).toBe(0);
  });
});
