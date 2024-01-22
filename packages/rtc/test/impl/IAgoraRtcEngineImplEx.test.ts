import {
  FAKE_CHANNEL_NAME,
  FakeAgoraRTCWrapper,
} from '@agoraio-extensions/agora-rtc-sdk-ng-fake';
import * as NATIVE_RTC from '@iris/native-rtc';
import { AREAS, IAgoraRTC, ILocalTrack } from 'agora-rtc-sdk-ng';

import { IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';
import { IrisAudioSourceType } from '../../src/base/BaseType';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';

import {
  TEST_REMOTE_UID,
  TEST_UID,
  callIris,
  joinChannel,
  joinChannelEx,
} from '../utils';

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
    jest.spyOn(
      irisRtcEngine.rtcEngineEventHandler,
      'onJoinChannelSuccess_7cc1c731'
    );

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
      irisRtcEngine.rtcEngineEventHandler.onJoinChannelSuccess_7cc1c731
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
    await callIris(
      apiEnginePtr,
      'RtcEngineEx_leaveChannelEx_7b5e4af9',
      leaveParam
    );
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
    await callIris(apiEnginePtr, 'RtcEngineEx_leaveChannelEx_7b5e4af9', param);
    expect(irisRtcEngine.irisClientManager.remoteUserPackages.length).toBe(0);
  });
  test('muteLocalAudioStreamEx', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      connection
    );
    let localAudioTrackPackage = irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
      IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
    );
    expect(localAudioTrackPackage.length).toBe(1);
    expect(localAudioTrackPackage[0].track.isPlaying).toBe(true);
    expect((localAudioTrackPackage[0].track as ILocalTrack).muted).toBe(false);

    await callIris(apiEnginePtr, 'RtcEngineEx_muteLocalAudioStreamEx', {
      mute: true,
      connection,
    });
    expect((localAudioTrackPackage[0].track as ILocalTrack).muted).toBe(true);

    await callIris(apiEnginePtr, 'RtcEngineEx_muteLocalAudioStreamEx', {
      mute: false,
      connection,
    });
    expect((localAudioTrackPackage[0].track as ILocalTrack).muted).toBe(false);
  });
  test('muteAllRemoteAudioStreamsEx', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      connection
    );
    let remoteUsers = irisClient.agoraRTCClient.remoteUsers;
    expect(remoteUsers[0].audioTrack.isPlaying).toBe(true);

    await callIris(apiEnginePtr, 'RtcEngineEx_muteAllRemoteAudioStreamsEx', {
      mute: true,
      connection,
    });
    expect(remoteUsers[0].audioTrack).toBeUndefined();
    await callIris(apiEnginePtr, 'RtcEngineEx_muteAllRemoteAudioStreamsEx', {
      mute: false,
      connection,
    });
    expect(remoteUsers[0].audioTrack).not.toBeUndefined();
  });
  test('muteRemoteAudioStreamEx', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      connection
    );
    let remoteUsers = irisClient.agoraRTCClient.remoteUsers;
    expect(remoteUsers[0].audioTrack.isPlaying).toBe(true);

    await callIris(apiEnginePtr, 'RtcEngineEx_muteRemoteAudioStreamEx', {
      mute: true,
      uid: TEST_REMOTE_UID,
      connection,
    });
    expect(remoteUsers[0].audioTrack).toBeUndefined();
    await callIris(apiEnginePtr, 'RtcEngineEx_muteRemoteAudioStreamEx', {
      mute: false,
      uid: TEST_REMOTE_UID,
      connection,
    });
    expect(remoteUsers[0].audioTrack).not.toBeUndefined();
  });
});
