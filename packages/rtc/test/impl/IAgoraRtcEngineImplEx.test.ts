import {
  FAKE_CHANNEL_NAME,
  FakeAgoraRTCWrapper,
} from '@agoraio-extensions/agora-rtc-sdk-ng-fake';
import * as NATIVE_RTC from '@iris/native-rtc';
import {
  AREAS,
  IAgoraRTC,
  ILocalAudioTrack,
  ILocalTrack,
} from 'agora-rtc-sdk-ng';

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

function createDeferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let promise = new Promise<T>((res) => {
    resolve = res;
  });

  return { promise, resolve };
}

async function flushMicrotasks(times: number = 5) {
  for (let i = 0; i < times; i += 1) {
    await Promise.resolve();
  }
}

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
  await callIris(apiEnginePtr, 'RtcEngine_initialize_0320339', nParam);
});

afterEach(() => {
  IrisCore.disposeIrisApiEngine(apiEnginePtr);
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('IAgoraRtcEngineImpl', () => {
  test('joinChannelEx_a3cd08c', async () => {
    jest.spyOn(
      irisRtcEngine.rtcEngineEventHandler,
      'onJoinChannelSuccess_263e4cd'
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
    await callIris(apiEnginePtr, 'RtcEngineEx_joinChannelEx_a3cd08c', param);

    let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      param.connection
    );

    expect(irisClient.irisClientState.token).toBe(param.token);
    expect(irisClient.agoraRTCClient?.channelName).toBe(FAKE_CHANNEL_NAME);
    expect(irisClient.connection.channelId).toBe(
      irisClient.agoraRTCClient?.channelName
    );
    expect(
      irisRtcEngine.rtcEngineEventHandler.onJoinChannelSuccess_263e4cd
    ).toBeCalledTimes(1);
  });
  test('leaveChannelEx_c81e1a4', async () => {
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    let connection = await joinChannelEx(apiEnginePtr);
    jest.spyOn(rtcEngineExImpl, 'leaveChannelEx_b03ee9a');
    let leaveParam = {
      connection: connection,
    };
    await callIris(
      apiEnginePtr,
      'RtcEngineEx_leaveChannelEx_c81e1a4',
      leaveParam
    );
    expect(rtcEngineExImpl.leaveChannelEx_b03ee9a).toBeCalled();
  });
  test('leaveChannelEx_b03ee9a', async () => {
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
    await callIris(apiEnginePtr, 'RtcEngineEx_joinChannelEx_a3cd08c', param);
    let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      param.connection
    );
    jest.spyOn(irisClient.agoraRTCClient!, 'leave');
    let leaveParam = {
      connection: param.connection,
      options: defaultLeaveChannelOptions,
    };
    await callIris(
      apiEnginePtr,
      'RtcEngineEx_leaveChannelEx_b03ee9a',
      leaveParam
    );
    expect(irisClient.agoraRTCClient).toBeUndefined();
    expect(irisRtcEngine.irisClientManager.remoteUserPackages.length).toBe(0);
    expect(irisClient.videoTrackPackage).toBeUndefined();
    expect(irisClient.audioTrackPackages.length).toBe(0);
  });
  test('leaveChannelEx2 keeps shared microphone track alive for remaining channel', async () => {
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);

    let firstConnection: NATIVE_RTC.RtcConnection = {
      channelId: FAKE_CHANNEL_NAME,
      localUid: TEST_UID,
    };
    await callIris(apiEnginePtr, 'RtcEngineEx_joinChannelEx_a3cd08c', {
      token: '1234',
      connection: firstConnection,
      options: {
        channelProfile:
          NATIVE_RTC.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_LIVE_BROADCASTING,
        clientRoleType: NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
        publishMicrophoneTrack: true,
      },
    });

    let secondConnection: NATIVE_RTC.RtcConnection = {
      channelId: `${FAKE_CHANNEL_NAME}_2`,
      localUid: TEST_UID + 1,
    };

    await callIris(apiEnginePtr, 'RtcEngineEx_joinChannelEx_a3cd08c', {
      token: '5678',
      connection: secondConnection,
      options: {
        channelProfile:
          NATIVE_RTC.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_LIVE_BROADCASTING,
        clientRoleType: NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
        publishMicrophoneTrack: true,
      },
    });

    let firstClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      firstConnection
    );
    let secondClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      secondConnection
    );
    firstConnection = firstClient.connection;
    secondConnection = secondClient.connection;
    let sharedAudioTrackPackage = irisRtcEngine.irisClientManager.getLocalAudioTrackPackageByConnection(
      firstConnection
    )[0];
    let sharedAudioTrack = sharedAudioTrackPackage.track as ILocalAudioTrack;

    let closeSpy = jest.spyOn(sharedAudioTrack, 'close');
    let setEnabledSpy = jest.spyOn(sharedAudioTrack, 'setEnabled');

    await callIris(apiEnginePtr, 'RtcEngineEx_leaveChannelEx_b03ee9a', {
      connection: secondConnection,
      options: defaultLeaveChannelOptions,
    });

    expect(closeSpy).not.toBeCalled();
    expect(setEnabledSpy).not.toBeCalledWith(false);
    expect(firstClient.audioTrackPackages).toContain(sharedAudioTrackPackage);
    expect(secondClient.audioTrackPackages).not.toContain(
      sharedAudioTrackPackage
    );
    expect(
      irisRtcEngine.irisClientManager.getLocalAudioTrackPackageByConnection(
        firstConnection
      )
    ).toContain(sharedAudioTrackPackage);
    expect(
      irisRtcEngine.irisClientManager.getLocalAudioTrackPackageByConnection(
        secondConnection
      )
    ).toHaveLength(0);
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
    await callIris(apiEnginePtr, 'RtcEngineEx_joinChannelEx_a3cd08c', param);
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
      'RtcEngineEx_updateChannelMediaOptionsEx_457bb35',
      param2
    );
    expect(agoraRTCClient?.renewToken).toBeCalledTimes(1);
    expect(agoraRTCClient?.setClientRole).toBeCalledTimes(1);
  });
  test('updateChannelMediaOptionsEx waits for local mute tasks before resolving', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    let muteAudioDeferred = createDeferred<any>();
    let muteVideoDeferred = createDeferred<any>();
    let setClientRoleDeferred = createDeferred<void>();

    jest
      .spyOn(rtcEngineExImpl, 'muteLocalAudioStreamEx_3cf17a4')
      .mockReturnValue(muteAudioDeferred.promise);
    jest
      .spyOn(rtcEngineExImpl, 'muteLocalVideoStreamEx_3cf17a4')
      .mockReturnValue(muteVideoDeferred.promise);
    jest
      .spyOn(irisRtcEngine.clientHelper, 'setClientRole')
      .mockReturnValue(setClientRoleDeferred.promise as any);

    let updatePromise = rtcEngineExImpl.updateChannelMediaOptionsEx_457bb35(
      {
        clientRoleType: NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_AUDIENCE,
      },
      connection
    ) as Promise<any>;
    let settled = false;

    updatePromise.then(() => {
      settled = true;
    });

    setClientRoleDeferred.resolve();
    await flushMicrotasks();
    expect(settled).toBe(false);

    muteAudioDeferred.resolve(await irisRtcEngine.returnResult());
    await flushMicrotasks();
    expect(settled).toBe(false);

    muteVideoDeferred.resolve(await irisRtcEngine.returnResult());
    await updatePromise;

    expect(irisRtcEngine.clientHelper.setClientRole).toBeCalledTimes(1);
    expect(settled).toBe(true);
  });
  test('updateChannelMediaOptionsEx only regenerates microphone track when parameters change stereo or bitrate', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    let reGenSpy = jest.spyOn(
      irisRtcEngine.implHelper,
      'reGenMicrophoneAudioTrack'
    );

    await callIris(
      apiEnginePtr,
      'RtcEngineEx_updateChannelMediaOptionsEx_457bb35',
      {
        connection,
        options: {
          parameters: JSON.stringify({
            'che.audio.custom_channel_num': 1,
            'che.audio.custom_bitrate': 32,
          }),
        },
      }
    );

    expect(reGenSpy).toBeCalledTimes(0);

    await callIris(
      apiEnginePtr,
      'RtcEngineEx_updateChannelMediaOptionsEx_457bb35',
      {
        connection,
        options: {
          parameters: JSON.stringify({
            'che.audio.custom_channel_num': 2,
            'che.audio.custom_bitrate': 32,
          }),
        },
      }
    );

    expect(reGenSpy).toBeCalledTimes(1);
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
    await callIris(
      apiEnginePtr,
      'RtcEngine_registerEventHandler_5fc0465',
      null,
      [
        {
          onEvent: async (e: EventParam) => {
            if (
              e.event ===
              'RtcEngineEventHandler_onRemoteVideoStateChanged_a14e9d1'
            ) {
              await callIris(
                apiEnginePtr,
                'RtcEngineEx_setupRemoteVideoEx_522a409',
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
      ]
    );
  });
  test('muteLocalAudioStreamEx_3cf17a4', async () => {
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
    await callIris(apiEnginePtr, 'RtcEngineEx_muteLocalAudioStreamEx_3cf17a4', {
      mute: true,
      connection,
    });
    expect(
      irisRtcEngine.irisClientManager.irisClientObserver.notifyLocal
    ).toBeCalled();

    await callIris(apiEnginePtr, 'RtcEngineEx_muteLocalAudioStreamEx_3cf17a4', {
      mute: false,
      connection,
    });
    expect(
      irisRtcEngine.irisClientManager.irisClientObserver.notifyLocal
    ).toBeCalled();
  });
  test('muteAllRemoteAudioStreamsEx_3cf17a4', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      connection
    );
    let remoteUsers = irisClient.agoraRTCClient!.remoteUsers;
    expect(remoteUsers[0].audioTrack!.isPlaying).toBe(true);

    await callIris(
      apiEnginePtr,
      'RtcEngineEx_muteAllRemoteAudioStreamsEx_3cf17a4',
      {
        mute: true,
        connection,
      }
    );
    expect(remoteUsers[0].audioTrack).toBeUndefined();
    await callIris(
      apiEnginePtr,
      'RtcEngineEx_muteAllRemoteAudioStreamsEx_3cf17a4',
      {
        mute: false,
        connection,
      }
    );
    expect(remoteUsers[0].audioTrack).not.toBeUndefined();
  });
  test('muteRemoteAudioStreamEx_6d93082', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      connection
    );
    let remoteUsers = irisClient.agoraRTCClient!.remoteUsers;
    expect(remoteUsers[0].audioTrack!.isPlaying).toBe(true);

    await callIris(
      apiEnginePtr,
      'RtcEngineEx_muteRemoteAudioStreamEx_6d93082',
      {
        mute: true,
        uid: TEST_REMOTE_UID,
        connection,
      }
    );
    expect(remoteUsers[0].audioTrack).toBeUndefined();
    await callIris(
      apiEnginePtr,
      'RtcEngineEx_muteRemoteAudioStreamEx_6d93082',
      {
        mute: false,
        uid: TEST_REMOTE_UID,
        connection,
      }
    );
    expect(remoteUsers[0].audioTrack).not.toBeUndefined();
  });

  test('muteLocalVideoStreamEx_3cf17a4', async () => {
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
    await callIris(apiEnginePtr, 'RtcEngineEx_muteLocalVideoStreamEx_3cf17a4', {
      mute: true,
      connection,
    });
    expect(
      irisRtcEngine.irisClientManager.irisClientObserver.notifyLocal
    ).toHaveBeenNthCalledWith(
      1,
      NotifyType.UNPUBLISH_TRACK,
      irisRtcEngine.irisClientManager.localVideoTrackPackages,
      [irisRtcEngine.irisClientManager.getIrisClientByConnection(connection)]
    );

    await callIris(apiEnginePtr, 'RtcEngineEx_muteLocalVideoStreamEx_3cf17a4', {
      mute: false,
      connection,
    });
    expect(
      irisRtcEngine.irisClientManager.irisClientObserver.notifyLocal
    ).toHaveBeenNthCalledWith(
      2,
      NotifyType.PUBLISH_TRACK,
      irisRtcEngine.irisClientManager.localVideoTrackPackages,
      [irisRtcEngine.irisClientManager.getIrisClientByConnection(connection)]
    );
  });
  test('muteRemoteVideoStreamEx_6d93082', async () => {
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    let connection = await joinChannelEx(apiEnginePtr);
    await setupRemoteVideoEx(apiEnginePtr, null);
    await callIris(
      apiEnginePtr,
      'RtcEngine_registerEventHandler_5fc0465',
      null,
      [
        {
          onEvent: async (e: EventParam) => {
            if (
              e.event ===
              'RtcEngineEventHandler_onRemoteVideoStateChanged_a14e9d1'
            ) {
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
      ]
    );

    await callIris(
      apiEnginePtr,
      'RtcEngineEx_muteRemoteVideoStreamEx_6d93082',
      {
        mute: true,
        uid: TEST_REMOTE_UID,
        connection,
      }
    );
    await callIris(
      apiEnginePtr,
      'RtcEngineEx_muteRemoteVideoStreamEx_6d93082',
      {
        mute: false,
        uid: TEST_REMOTE_UID,
        connection,
      }
    );
  });

  test('createDataStreamEx_9f641b6', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    await callIris(apiEnginePtr, 'RtcEngineEx_createDataStreamEx_9f641b6', {
      connection,
      config: {
        syncWithAudio: true,
        ordered: true,
      },
    });
    let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      connection
    );
    let irisClientState = irisClient.irisClientState;
    expect(irisClientState.dataStreamConfig.syncWithAudio).toBe(true);
    expect(irisClientState.dataStreamConfig.ordered).toBe(true);
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
  test('setRemoteRenderModeEx_a72fe4e', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    let param = {
      uid: TEST_REMOTE_UID,
      renderMode: NATIVE_RTC.RENDER_MODE_TYPE.RENDER_MODE_FIT,
      mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED,
      connection: connection,
    };
    await callIris(
      apiEnginePtr,
      'RtcEngineEx_setRemoteRenderModeEx_a72fe4e',
      param
    );
    expect(
      irisRtcEngine.irisClientManager.remoteUserPackages[0].videoPlayerConfig
        .fit
    ).toBe(AgoraTranslate.NATIVE_RTC_RENDER_MODE_TYPE2Fit(param.renderMode));
    expect(
      irisRtcEngine.irisClientManager.remoteUserPackages[0].videoPlayerConfig
        .mirror
    ).toBe(true);
  });

  test('enableAudioVolumeIndicationEx', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      connection
    );
    jest.spyOn(irisClient.agoraRTCClient!, 'enableAudioVolumeIndicator');
    jest.spyOn(
      irisRtcEngine.rtcEngineEventHandler,
      'onAudioVolumeIndication_781482a'
    );

    let param = {
      interval: 111,
      smooth: 222,
      reportVad: true,
      connection: connection,
    };
    await callIris(
      apiEnginePtr,
      'RtcEngineEx_enableAudioVolumeIndicationEx_ac84f2a',
      param
    );
    expect(
      irisClient.irisClientState.enableAudioVolumeIndicationConfig.smooth
    ).toBe(param.smooth);
    expect(
      irisClient.irisClientState.enableAudioVolumeIndicationConfig.smooth
    ).toBe(param.smooth);
    expect(irisClient.irisClientState.enableAudioVolumeIndication).toBeTruthy();
    expect(
      irisClient.agoraRTCClient?.enableAudioVolumeIndicator
    ).toBeCalledTimes(1);
  });
  test('adjustRecordingSignalVolumeEx', async () => {
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let connection = await joinChannelEx(apiEnginePtr);
    let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      connection
    );
    let param = {
      volume: 300,
      connection: connection,
    };
    let localAudioTrack = irisClient.audioTrackPackages[0]
      .track as ILocalAudioTrack;
    jest.spyOn(localAudioTrack!, 'setVolume');
    await callIris(
      apiEnginePtr,
      'RtcEngineEx_adjustRecordingSignalVolumeEx_e84d10e',
      param
    );
    expect(localAudioTrack!.setVolume).toBeCalledWith(
      AgoraTranslate.NATIVE_RTC_Volume2WebVolume(param.volume)
    );
  });
  test('RtcEngineEx_adjustUserPlaybackSignalVolumeEx_adbd29c', async () => {
    let connection = await joinChannelEx(apiEnginePtr);
    let param = {
      volume: 300,
      uid: TEST_REMOTE_UID,
      connection: connection,
    };
    let remoteAudioTrack = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      connection
    ).agoraRTCClient?.remoteUsers[0].audioTrack;
    jest.spyOn(remoteAudioTrack!, 'setVolume');
    await callIris(
      apiEnginePtr,
      'RtcEngineEx_adjustUserPlaybackSignalVolumeEx_adbd29c',
      param
    );
    expect(remoteAudioTrack!.setVolume).toBeCalledWith(
      AgoraTranslate.NATIVE_RTC_Volume2WebVolume(param.volume)
    );
  });
});
