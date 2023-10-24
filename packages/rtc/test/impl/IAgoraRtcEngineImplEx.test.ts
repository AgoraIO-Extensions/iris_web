import {
  FAKE_CHANNEL_NAME,
  FakeAgoraRTCWrapper,
} from '@agoraio-extensions/agora-rtc-sdk-ng-fake';
import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { AREAS, IAgoraRTC } from 'agora-rtc-sdk-ng';

import { IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { TEST_REMOTE_UID, TEST_UID, callIris } from '../utils';

import { IRtcEngineExImpl } from './IAgoraRtcEngineExImpl';

let apiEnginePtr: IrisApiEngine;
let irisRtcEngine: IrisRtcEngine;
let rtcEngineExImpl: IRtcEngineExImpl;

beforeEach(async () => {
  apiEnginePtr = IrisCore.createIrisApiEngine();
  IrisWebRtc.initIrisRtc(apiEnginePtr, {
    agoraRTC: FakeAgoraRTCWrapper.getFakeAgoraRTC(),
  });
  jest.useFakeTimers();
  irisRtcEngine = apiEnginePtr['apiInterceptors'][0];
  rtcEngineExImpl = irisRtcEngine.implDispatchesMap.get('RtcEngineEx')._impl;
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
  test('joinChannelEx', async () => {
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onJoinChannelSuccessEx');

    let param = {
      token: '1234',
      connection: {
        channelId: FAKE_CHANNEL_NAME,
        localUid: TEST_UID,
      },
      options: {
        channelProfile:
          NATIVE_RTC.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_LIVE_BROADCASTING,
        clientRoleType: NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
      },
    };
    await callIris(apiEnginePtr, 'RtcEngineEx_joinChannelEx', param);

    let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      param.connection
    );

    expect(irisClient.irisClientState.token).toBe(param.token);
    expect(irisClient.agoraRTCClient.channelName).toBe(FAKE_CHANNEL_NAME);
    expect(irisClient.connection.channelId).toBe(
      irisClient.agoraRTCClient.channelName
    );
    expect(
      irisRtcEngine.rtcEngineEventHandler.onJoinChannelSuccessEx
    ).toBeCalledTimes(1);
  });
  test('leaveChannelEx', async () => {
    let param = {
      token: '1234',
      connection: {
        channelId: FAKE_CHANNEL_NAME,
        localUid: TEST_UID,
      },
      options: {
        channelProfile:
          NATIVE_RTC.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_LIVE_BROADCASTING,
        clientRoleType: NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
      },
    };
    await callIris(apiEnginePtr, 'RtcEngineEx_joinChannelEx', param);
    let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      param.connection
    );
    jest.spyOn(irisClient.agoraRTCClient, 'leave');
    let leaveParam = {
      connection: param.connection,
    };
    await callIris(apiEnginePtr, 'RtcEngineEx_leaveChannelEx', leaveParam);
    expect(irisClient.agoraRTCClient).toBeNull();
  });
  test('updateChannelMediaOptionsEx', async () => {
    let param = {
      token: '1234',
      connection: {
        channelId: FAKE_CHANNEL_NAME,
        localUid: TEST_UID,
      },
      options: {
        channelProfile:
          NATIVE_RTC.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_LIVE_BROADCASTING,
        clientRoleType: NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
      },
    };
    await callIris(apiEnginePtr, 'RtcEngineEx_joinChannelEx', param);
    let agoraRTCClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      param.connection
    ).agoraRTCClient;
    jest.spyOn(agoraRTCClient, 'renewToken');
    jest.spyOn(agoraRTCClient, 'setClientRole');
    let param2 = {
      connection: param.connection,
      options: {
        publishCameraTrack: true,
        publishMicrophoneTrack: true,
        publishScreenCaptureVideo: true,
        publishScreenCaptureAudio: true,
        publishScreenTrack: true,
        publishCustomVideoTrack: true,
        token: '123',
      },
    };
    await callIris(
      apiEnginePtr,
      'RtcEngineEx_updateChannelMediaOptionsEx',
      param2
    );
    expect(agoraRTCClient.renewToken).toBeCalledTimes(1);
    expect(agoraRTCClient.setClientRole).toBeCalledTimes(1);
  });
  test('setupRemoteVideoEx', async () => {
    let param = {
      token: '1234',
      connection: {
        channelId: FAKE_CHANNEL_NAME,
        localUid: TEST_UID,
      },
      options: {
        channelProfile:
          NATIVE_RTC.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_LIVE_BROADCASTING,
        clientRoleType: NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
      },
    };
    await callIris(apiEnginePtr, 'RtcEngineEx_joinChannelEx', param);
    let param2 = {
      canvas: {
        uid: TEST_REMOTE_UID,
        view: 'test-view',
        sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY,
      },
      connection: param.connection,
    };
    await callIris(apiEnginePtr, 'RtcEngineEx_setupRemoteVideoEx', param2);
    expect(irisRtcEngine.irisClientManager.remoteUserPackages.length).toBe(1);
    expect(irisRtcEngine.irisClientManager.remoteUserPackages[0].element).toBe(
      param2.canvas.view
    );
    expect(irisRtcEngine.irisClientManager.remoteUserPackages[0].uid).toBe(
      param2.canvas.uid
    );
    expect(
      irisRtcEngine.irisClientManager.remoteUserPackages[0].connection.channelId
    ).toBe(param2.connection.channelId);
    expect(
      irisRtcEngine.irisClientManager.remoteUserPackages[0].connection.localUid
    ).toBe(param2.connection.localUid);
    await callIris(apiEnginePtr, 'RtcEngineEx_leaveChannelEx', param);
    expect(irisRtcEngine.irisClientManager.remoteUserPackages.length).toBe(0);
  });
});
