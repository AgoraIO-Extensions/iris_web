import {
  FAKE_CHANNEL_NAME,
  FakeAgoraRTCWrapper,
} from '@agoraio-extensions/agora-rtc-sdk-ng-fake';
import * as NATIVE_RTC from '@iris/native-rtc';
import { AREAS, IAgoraRTC, ILocalTrack } from 'agora-rtc-sdk-ng';

import { EventParam, IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';
import { IrisAudioSourceType } from '../../src/base/BaseType';
import { defaultLeaveChannelOptions } from '../../src/base/DefaultValue';
import { NotifyType } from '../../src/engine/IrisClientObserver';

import { AgoraTranslate } from '../../src/util';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';

import {
  TEST_REMOTE_UID,
  TEST_UID,
  callIris,
  joinChannelEx,
  setupRemoteVideoEx,
} from '../utils';

import { IRtcEngineExImpl } from './IAgoraRtcEngineExImpl';

let apiEnginePtr: IrisApiEngine;
let irisRtcEngine: IrisRtcEngine;
let rtcEngineExImpl: IRtcEngineExImpl;

beforeEach(async () => {
  apiEnginePtr = IrisCore.createIrisApiEngine();
  IrisCore.createIrisEventHandler({} as any);
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
    expect(irisClient.agoraRTCClient?.channelName).toBe(FAKE_CHANNEL_NAME);
    expect(irisClient.connection.channelId).toBe(
      irisClient.agoraRTCClient?.channelName
    );
    expect(
      irisRtcEngine.rtcEngineEventHandler.onJoinChannelSuccessEx
    ).toBeCalledTimes(1);
  });
  test('leaveChannelEx2', async () => {
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    let connection = await joinChannelEx(apiEnginePtr);
    jest.spyOn(rtcEngineExImpl, 'leaveChannelEx');
    let leaveParam = {
      connection: connection,
    };
    await callIris(apiEnginePtr, 'RtcEngineEx_leaveChannelEx2', leaveParam);
    expect(rtcEngineExImpl.leaveChannelEx).toBeCalled();
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
    jest.spyOn(irisClient.agoraRTCClient!, 'leave');
    let leaveParam = {
      connection: param.connection,
      options: defaultLeaveChannelOptions,
    };
    await callIris(apiEnginePtr, 'RtcEngineEx_leaveChannelEx', leaveParam);
    expect(irisClient.agoraRTCClient).toBeUndefined();
    expect(irisRtcEngine.irisClientManager.remoteUserPackages.length).toBe(0);
    expect(irisClient.videoTrackPackage).toBeUndefined();
    expect(irisClient.audioTrackPackages.length).toBe(0);
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
    jest.spyOn(agoraRTCClient!, 'renewToken');
    jest.spyOn(agoraRTCClient!, 'setClientRole');
    let param2 = {
      connection: param.connection,
      options: {
        clientRoleType: NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_AUDIENCE,
        publishCameraTrack: true,
        publishMicrophoneTrack: true,
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
    expect(agoraRTCClient?.renewToken).toBeCalledTimes(1);
    expect(agoraRTCClient?.setClientRole).toBeCalledTimes(1);
  });
  test('setupRemoteVideoEx', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    let param2 = {
      canvas: {
        uid: TEST_REMOTE_UID,
        view: 'test-view',
        sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_REMOTE,
      },
      connection: connection,
    };
    await callIris(apiEnginePtr, 'RtcEngine_registerEventHandler', null, [
      {
        onEvent: async (e: EventParam) => {
          if (e.event === 'RtcEngineEventHandler_onRemoteVideoStateChangedEx') {
            await callIris(
              apiEnginePtr,
              'RtcEngineEx_setupRemoteVideoEx',
              param2
            );
            expect(
              irisRtcEngine.irisClientManager.remoteUserPackages.length
            ).toBe(1);
            expect(
              irisRtcEngine.irisClientManager.remoteUserPackages[0].element
            ).toBe(param2.canvas.view);
            expect(
              irisRtcEngine.irisClientManager.remoteUserPackages[0].uid
            ).toBe(param2.canvas.uid);
            expect(
              irisRtcEngine.irisClientManager.remoteUserPackages[0].connection
                .channelId
            ).toBe(param2.connection.channelId);
            expect(
              irisRtcEngine.irisClientManager.remoteUserPackages[0].connection
                .localUid
            ).toBe(param2.connection.localUid);
          }
        },
      },
    ]);
  });
  test('muteLocalAudioStreamEx', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let localAudioTrackPackage = irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
      IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
    );
    expect(localAudioTrackPackage.length).toBe(1);

    jest.spyOn(
      irisRtcEngine.irisClientManager.irisClientObserver,
      'notifyLocal'
    );
    await callIris(apiEnginePtr, 'RtcEngineEx_muteLocalAudioStreamEx', {
      mute: true,
      connection,
    });
    expect(
      irisRtcEngine.irisClientManager.irisClientObserver.notifyLocal
    ).toBeCalled();

    await callIris(apiEnginePtr, 'RtcEngineEx_muteLocalAudioStreamEx', {
      mute: false,
      connection,
    });
    expect(
      irisRtcEngine.irisClientManager.irisClientObserver.notifyLocal
    ).toBeCalled();
  });
  test('muteAllRemoteAudioStreamsEx', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      connection
    );
    let remoteUsers = irisClient.agoraRTCClient!.remoteUsers;
    expect(remoteUsers[0].audioTrack!.isPlaying).toBe(true);

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
    let remoteUsers = irisClient.agoraRTCClient!.remoteUsers;
    expect(remoteUsers[0].audioTrack!.isPlaying).toBe(true);

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

  test('muteLocalVideoStreamEx', async () => {
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview', null);
    let connection = await joinChannelEx(apiEnginePtr);
    let localVideoTrackPackage = irisRtcEngine.irisClientManager.getLocalVideoTrackPackageBySourceType(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY
    );
    expect(localVideoTrackPackage.length).toBe(1);

    jest.spyOn(
      irisRtcEngine.irisClientManager.irisClientObserver,
      'notifyLocal'
    );
    await callIris(apiEnginePtr, 'RtcEngineEx_muteLocalVideoStreamEx', {
      mute: true,
      connection,
    });
    expect(
      irisRtcEngine.irisClientManager.irisClientObserver.notifyLocal
    ).toHaveBeenNthCalledWith(
      1,
      NotifyType.UNPUBLISH_TRACK,
      irisRtcEngine.irisClientManager.localVideoTrackPackages
    );

    await callIris(apiEnginePtr, 'RtcEngineEx_muteLocalVideoStreamEx', {
      mute: false,
      connection,
    });
    expect(
      irisRtcEngine.irisClientManager.irisClientObserver.notifyLocal
    ).toHaveBeenNthCalledWith(
      2,
      NotifyType.PUBLISH_TRACK,
      irisRtcEngine.irisClientManager.localVideoTrackPackages
    );
  });
  test('muteRemoteVideoStreamEx', async () => {
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    let connection = await joinChannelEx(apiEnginePtr);
    await setupRemoteVideoEx(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_registerEventHandler', null, [
      {
        onEvent: async (e: EventParam) => {
          if (e.event === 'RtcEngineEventHandler_onRemoteVideoStateChangedEx') {
            let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
              connection
            );
            let remoteUsers = irisClient.agoraRTCClient!.remoteUsers;
            if (
              (JSON.parse(e.data).state as NATIVE_RTC.REMOTE_VIDEO_STATE) ===
              NATIVE_RTC.REMOTE_VIDEO_STATE.REMOTE_VIDEO_STATE_STARTING
            ) {
              expect(remoteUsers[0].videoTrack).toBeUndefined();
            } else {
              expect(remoteUsers[0].videoTrack).not.toBeUndefined();
              expect(remoteUsers[0].videoTrack?.isPlaying).toBe(true);
            }
          }
        },
      },
    ]);

    await callIris(apiEnginePtr, 'RtcEngineEx_muteRemoteVideoStreamEx', {
      mute: true,
      uid: TEST_REMOTE_UID,
      connection,
    });
    await callIris(apiEnginePtr, 'RtcEngineEx_muteRemoteVideoStreamEx', {
      mute: false,
      uid: TEST_REMOTE_UID,
      connection,
    });
  });

  test('sendStreamMessageEx_0c34857', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    await callIris(apiEnginePtr, 'RtcEngineEx_createDataStreamEx_9f641b6', {
      connection,
      config: {
        syncWithAudio: true,
        ordered: true,
      },
    });
    const mockFunction = jest.spyOn(
      irisRtcEngine.clientHelper,
      'sendStreamMessage'
    );
    await callIris(apiEnginePtr, 'RtcEngineEx_sendStreamMessageEx_0c34857', {
      connection: connection,
      streamId: '1',
      length: 11,
    });
    expect(mockFunction.mock.calls[0][1]).toMatchObject({
      syncWithAudio: true,
      payload: 'test',
    });
  });
  test('setRemoteRenderModeEx', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    let param = {
      uid: TEST_REMOTE_UID,
      renderMode: NATIVE_RTC.RENDER_MODE_TYPE.RENDER_MODE_FIT,
      mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED,
      connection: connection,
    };
    await callIris(apiEnginePtr, 'RtcEngineEx_setRemoteRenderModeEx', param);
    expect(
      irisRtcEngine.irisClientManager.remoteUserPackages[0].videoPlayerConfig
        .fit
    ).toBe(AgoraTranslate.NATIVE_RTC_RENDER_MODE_TYPE2Fit(param.renderMode));
    expect(
      irisRtcEngine.irisClientManager.remoteUserPackages[0].videoPlayerConfig
        .mirror
    ).toBe(true);
  });
});
