import {
  FAKE_CHANNEL_NAME,
  FakeAgoraRTCWrapper,
} from '@agoraio-extensions/agora-rtc-sdk-ng-fake';
import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { AREAS, IAgoraRTC } from 'agora-rtc-sdk-ng';

import { IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';

import { IrisAudioSourceType } from '../../src/base/BaseType';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import {
  TEST_UID,
  callIris,
  callIrisWithoutCheck,
  joinChannel,
  setupLocalVideo,
  setupRemoteVideo,
} from '../utils';

import { IRtcEngineImpl } from './IAgoraRtcEngineImpl';

let apiEnginePtr: IrisApiEngine;
let irisRtcEngine: IrisRtcEngine;
let rtcEngineImpl: IRtcEngineImpl;
let AgoraRTCMock: IAgoraRTC;

beforeEach(async () => {
  apiEnginePtr = IrisCore.createIrisApiEngine();
  IrisWebRtc.initIrisRtc(apiEnginePtr, {
    agoraRTC: FakeAgoraRTCWrapper.getFakeAgoraRTC(),
  });
  jest.useFakeTimers();
  irisRtcEngine = apiEnginePtr['apiInterceptors'][0];
  rtcEngineImpl = irisRtcEngine.implDispatchesMap.get('RtcEngine')._impl;
  AgoraRTCMock = irisRtcEngine.globalState.AgoraRTC;
  jest.spyOn(AgoraRTCMock, 'setArea');
  jest.spyOn(AgoraRTCMock, 'setLogLevel');
  jest.spyOn(AgoraRTCMock, 'checkSystemRequirements').mockReturnValue(true);
  jest.spyOn(irisRtcEngine.implHelper, 'createAudioTrack');
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
  test('initialize', async () => {
    expect(AgoraRTCMock.setArea).toBeCalledTimes(1);
    expect(AgoraRTCMock.setArea).toBeCalledWith([AREAS.CHINA]);
    expect(AgoraRTCMock.setLogLevel).toBeCalledTimes(1);
    expect(AgoraRTCMock.setLogLevel).toBeCalledWith(1);
    expect(AgoraRTCMock.checkSystemRequirements).toBeCalledTimes(1);
    expect(irisRtcEngine.implHelper.createAudioTrack).toBeCalledTimes(1);
    expect(irisRtcEngine.implHelper.createAudioTrack).toBeCalledWith(
      IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
    );
    expect(irisRtcEngine.irisClientManager.localAudioTrackPackages.length).toBe(
      1
    );
    //check if already initialized
    let nParam = {
      context: 'test',
    };
    await callIris(apiEnginePtr, 'RtcEngine_initialize', nParam);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      true,
      NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK
    );
  });
  test('release', async () => {
    jest.spyOn(irisRtcEngine.irisClientManager, 'release');
    expect(
      irisRtcEngine.irisClientManager.irisClientList.length === 1
    ).toBeTruthy();
    expect(irisRtcEngine.irisClientManager.localAudioTrackPackages.length).toBe(
      1
    );
    await callIris(apiEnginePtr, 'RtcEngine_release', { sync: false });
    expect(irisRtcEngine.irisClientManager.release).toBeCalledTimes(1);
    expect(irisRtcEngine.irisClientManager.localAudioTrackPackages.length).toBe(
      0
    );
    expect(irisRtcEngine.irisIntervalList.length).toBe(0);
    expect(irisRtcEngine.irisElement.containerElement).toBeNull();
    expect(
      irisRtcEngine.irisClientManager.irisClientList.length === 0
    ).toBeTruthy();
    expect(
      irisRtcEngine.irisClientManager.irisClientList.length === 0
    ).toBeTruthy();
  });
  test('registerEventHandler', async () => {
    jest.spyOn(irisRtcEngine.irisEventHandlerManager, 'addEventHandler');
    await callIris(apiEnginePtr, 'RtcEngine_registerEventHandler', {
      eventHandler: 'test',
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
  test('unregisterEventHandler', async () => {
    await callIris(apiEnginePtr, 'RtcEngine_registerEventHandler', {
      eventHandler: 'test',
    });
    expect(
      irisRtcEngine.irisEventHandlerManager['eventHandlersMap'].get('RtcEngine')
        .length == 1
    ).toBe(true);
    jest.spyOn(irisRtcEngine.irisEventHandlerManager, 'removeEventHandler');
    await callIris(apiEnginePtr, 'RtcEngine_unregisterEventHandler', {
      eventHandler: 'test',
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
  test('enableAudio', async () => {
    await joinChannel(apiEnginePtr, null);

    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    expect(irisRtcEngine.globalState.enabledAudio).toBe(true);
    expect(
      irisRtcEngine.irisClientManager.localAudioTrackPackages[0].track.isPlaying
    ).toBe(true);
    for (let irisClient of irisRtcEngine.irisClientManager.irisClientList) {
      expect(irisClient.irisClientState.autoSubscribeAudio).toBeTruthy();
    }
    expect(
      irisRtcEngine.irisClientManager.irisClientList[0]?.agoraRTCClient
        .remoteUsers[0].audioTrack.isPlaying
    ).toBe(true);
  });
  test('disableAudio', async () => {
    await joinChannel(apiEnginePtr, null);

    await callIris(apiEnginePtr, 'RtcEngine_disableAudio', null);
    expect(irisRtcEngine.globalState.enabledAudio).toBe(false);
    expect(
      irisRtcEngine.irisClientManager.localAudioTrackPackages[0].track.isPlaying
    ).toBe(false);
    for (let irisClient of irisRtcEngine.irisClientManager.irisClientList) {
      expect(irisClient.irisClientState.autoSubscribeAudio).toBeFalsy();
    }
    expect(
      irisRtcEngine.irisClientManager.irisClientList[0]?.agoraRTCClient
        .remoteUsers[0].audioTrack
    ).toBeUndefined();
  });

  test('setClientRole', async () => {
    jest.spyOn(rtcEngineImpl, 'setClientRole2');
    let role = NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER;
    await callIris(apiEnginePtr, 'RtcEngine_setClientRole', {
      role: role,
    });
    expect(rtcEngineImpl.setClientRole2).toBeCalledTimes(1);
    expect(rtcEngineImpl.setClientRole2).toBeCalledWith(
      NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
      {
        audienceLatencyLevel:
          NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE
            .AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY,
      }
    );
  });

  test('setClientRole2', async () => {
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onClientRoleChangedEx');
    jest.spyOn(irisRtcEngine.clientHelper, 'setClientRole');
    let role = NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER;
    let callParam = {
      role: role,
      options: {
        audienceLatencyLevel:
          NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE
            .AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY,
      },
    };
    await callIris(apiEnginePtr, 'RtcEngine_setClientRole2', callParam);
    expect(
      irisRtcEngine.irisClientManager.getIrisClient().irisClientState
        .clientRoleType
    ).toBe(role);
    expect(irisRtcEngine.clientHelper.setClientRole).toBeCalledTimes(0);
    expect(
      irisRtcEngine.rtcEngineEventHandler.onClientRoleChangedEx
    ).toBeCalledTimes(0);

    await joinChannel(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_setClientRole2', callParam);

    expect(irisRtcEngine.clientHelper.setClientRole).toBeCalledTimes(1);
    expect(
      irisRtcEngine.rtcEngineEventHandler.onClientRoleChangedEx
    ).toBeCalledTimes(1);
  });

  test('setAudioProfile', async () => {
    let param = {
      profile: NATIVE_RTC.AUDIO_PROFILE_TYPE.AUDIO_PROFILE_DEFAULT,
      scenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE.AUDIO_SCENARIO_CHATROOM,
    };
    await callIris(apiEnginePtr, 'RtcEngine_setAudioProfile', param);
    expect(irisRtcEngine.globalState.audioProfile).toBe(param.profile);
    expect(irisRtcEngine.globalState.rtcEngineContext.audioScenario).toBe(
      param.scenario
    );
  });

  test('setAudioProfile2', async () => {
    let param = {
      profile: NATIVE_RTC.AUDIO_PROFILE_TYPE.AUDIO_PROFILE_DEFAULT,
    };
    await callIris(apiEnginePtr, 'RtcEngine_setAudioProfile2', param);
    expect(irisRtcEngine.globalState.audioProfile).toBe(param.profile);
  });

  test('joinChannel', async () => {
    jest.spyOn(rtcEngineImpl, 'joinChannel2');

    await joinChannel(apiEnginePtr, null);

    expect(rtcEngineImpl.joinChannel2).toBeCalledWith(
      null,
      FAKE_CHANNEL_NAME,
      TEST_UID,
      irisRtcEngine.irisClientManager.getIrisClient().irisClientState
    );
  });

  test('joinChannel', async () => {
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onJoinChannelSuccessEx');

    await joinChannel(apiEnginePtr, null);
    let irisClient = irisRtcEngine.irisClientManager.getIrisClient();
    jest.spyOn(irisClient, 'setConnection');

    expect(irisClient.irisClientState.token).toBe(null);
    expect(irisClient.connection.localUid).toBe(irisClient.agoraRTCClient.uid);
    expect(irisClient.agoraRTCClient.channelName).toBe(FAKE_CHANNEL_NAME);
    expect(irisClient.connection.channelId).toBe(
      irisClient.agoraRTCClient.channelName
    );
    expect(
      irisRtcEngine.rtcEngineEventHandler.onJoinChannelSuccessEx
    ).toBeCalledTimes(1);
  });

  test('updateChannelMediaOptions', async () => {
    await joinChannel(apiEnginePtr, null);
    let agoraRTCClient = irisRtcEngine.irisClientManager.getIrisClient()
      .agoraRTCClient;
    jest.spyOn(agoraRTCClient, 'renewToken');
    jest.spyOn(agoraRTCClient, 'setClientRole');
    let param = {
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
    await callIris(apiEnginePtr, 'RtcEngine_updateChannelMediaOptions', param);
    expect(agoraRTCClient.renewToken).toBeCalledTimes(1);
    expect(agoraRTCClient.setClientRole).toBeCalledTimes(1);
  });

  test('enableAudioVolumeIndication', async () => {
    await joinChannel(apiEnginePtr, null);
    jest.spyOn(
      irisRtcEngine.rtcEngineEventHandler,
      'onAudioVolumeIndicationEx'
    );

    let param = {
      interval: 111,
      smooth: 222,
      reportVad: true,
    };
    await callIris(
      apiEnginePtr,
      'RtcEngine_enableAudioVolumeIndication',
      param
    );
    expect(
      irisRtcEngine.globalState.enableAudioVolumeIndicationConfig.interval
    ).toBe(param.interval);
    expect(
      irisRtcEngine.globalState.enableAudioVolumeIndicationConfig.smooth
    ).toBe(param.smooth);
    expect(
      irisRtcEngine.globalState.enableAudioVolumeIndicationConfig.smooth
    ).toBe(param.smooth);
    expect(irisRtcEngine.irisIntervalList.length == 1).toBeTruthy();
    expect(irisRtcEngine.globalState.enableAudioVolumeIndication).toBeTruthy();
    jest.advanceTimersByTime(param.interval);
    expect(
      irisRtcEngine.rtcEngineEventHandler.onAudioVolumeIndicationEx
    ).toBeCalledTimes(2);
  });

  test('leaveChannel', async () => {
    await joinChannel(apiEnginePtr, null);
    jest.spyOn(rtcEngineImpl, 'leaveChannel2');
    await callIris(apiEnginePtr, 'RtcEngine_leaveChannel');
    expect(rtcEngineImpl.leaveChannel2).toBeCalled();
  });

  test('leaveChannel2', async () => {
    let param = {
      options: {
        stopAudioMixing: true,
        stopAllEffect: true,
        stopMicrophoneRecording: true,
      },
    };
    jest.spyOn(rtcEngineImpl, 'stopAllEffects');
    jest.spyOn(irisRtcEngine.irisClientManager.getIrisClient(), 'release');
    await joinChannel(apiEnginePtr, null);
    let agoraRTCClient = irisRtcEngine.irisClientManager.getIrisClient()
      .agoraRTCClient;
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onUserOfflineEx');
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onLeaveChannelEx');
    await callIris(apiEnginePtr, 'RtcEngine_leaveChannel2', param);
    expect(rtcEngineImpl.stopAllEffects).toBeCalledTimes(
      agoraRTCClient.remoteUsers.length
    );
    expect(irisRtcEngine.rtcEngineEventHandler.onUserOfflineEx).toBeCalledTimes(
      agoraRTCClient.remoteUsers.length
    );
    expect(
      irisRtcEngine.rtcEngineEventHandler.onLeaveChannelEx
    ).toBeCalledTimes(1);
    expect(
      irisRtcEngine.irisClientManager.getIrisClient().release
    ).toBeCalledTimes(1);
  });

  test('enableLocalAudio', async () => {
    let param = {
      enabled: true,
    };
    await callIris(apiEnginePtr, 'RtcEngine_enableLocalAudio', param);
    expect(irisRtcEngine.globalState.enabledLocalAudio).toBe(param.enabled);
  });

  test('enableVideo', async () => {
    await joinChannel(apiEnginePtr, null);
    await setupLocalVideo(apiEnginePtr, null);
    await setupRemoteVideo(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview', null);
    expect(irisRtcEngine.globalState.enabledVideo).toBeTruthy();
    expect(irisRtcEngine.globalState.autoSubscribeVideo).toBeTruthy();

    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].track.isPlaying
    ).toBe(true);
    for (let irisClient of irisRtcEngine.irisClientManager.irisClientList) {
      expect(irisClient.irisClientState.autoSubscribeVideo).toBeTruthy();
    }
    expect(
      irisRtcEngine.irisClientManager.irisClientList[0]?.agoraRTCClient
        .remoteUsers[0].videoTrack.isPlaying
    ).toBe(true);
  });
  test('disableVideo', async () => {
    await joinChannel(apiEnginePtr, null);
    await setupLocalVideo(apiEnginePtr, null);
    await setupRemoteVideo(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview', null);
    await callIris(apiEnginePtr, 'RtcEngine_disableVideo', null);
    expect(irisRtcEngine.globalState.enabledVideo).toBe(false);
    expect(irisRtcEngine.globalState.autoSubscribeVideo).toBe(false);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].track.isPlaying
    ).toBe(false);
    for (let irisClient of irisRtcEngine.irisClientManager.irisClientList) {
      expect(irisClient.irisClientState.autoSubscribeVideo).toBeFalsy();
    }
    expect(
      irisRtcEngine.irisClientManager.irisClientList[0]?.agoraRTCClient
        .remoteUsers[0].videoTrack
    ).toBeUndefined();
  });
  test('startPreview', async () => {
    await joinChannel(apiEnginePtr, null);
    jest.spyOn(rtcEngineImpl, 'startPreview2');
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview', null);
    expect(rtcEngineImpl.startPreview2).toBeCalledWith(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA
    );
  });
  test('startPreview2', async () => {
    let param = {
      sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA,
    };
    await setupLocalVideo(apiEnginePtr, null);
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onLocalVideoStateChanged');

    let result = await callIrisWithoutCheck(
      apiEnginePtr,
      'RtcEngine_startPreview2',
      param
    );
    expect(result.code).toBe(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED);
    let result2 = await callIrisWithoutCheck(
      apiEnginePtr,
      'RtcEngine_startPreview2',
      { sourceType: 100 }
    );
    expect(result2.code).toBe(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED);
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview2', param);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].track.isPlaying
    ).toBe(true);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].isPreview
    ).toBeTruthy();
    expect(
      irisRtcEngine.rtcEngineEventHandler.onLocalVideoStateChanged
    ).toBeCalled();
  });
  test('stopPreview', async () => {
    await joinChannel(apiEnginePtr, null);
    jest.spyOn(rtcEngineImpl, 'stopPreview2');
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview', null);
    await callIris(apiEnginePtr, 'RtcEngine_stopPreview', null);
    expect(rtcEngineImpl.stopPreview2).toBeCalledWith(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA
    );
  });
  test('stopPreview2', async () => {
    let param = {
      sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA,
    };
    await setupLocalVideo(apiEnginePtr, null);
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onLocalVideoStateChanged');

    let result2 = await callIrisWithoutCheck(
      apiEnginePtr,
      'RtcEngine_stopPreview2',
      { sourceType: 100 }
    );
    expect(result2.code).toBe(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED);
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview', null);
    await callIris(apiEnginePtr, 'RtcEngine_stopPreview2', param);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].track.isPlaying
    ).toBe(false);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].isPreview
    ).toBeFalsy();
    expect(
      irisRtcEngine.rtcEngineEventHandler.onLocalVideoStateChanged
    ).toBeCalled();
  });
  test('setVideoEncoderConfiguration', async () => {
    let param = {
      config: {
        codecType: NATIVE_RTC.VIDEO_CODEC_TYPE.VIDEO_CODEC_VP8,
        dimensions: {
          width: 1,
          height: 2,
        },
        frameRate: 1,
        bitrate: 1,
        minBitrate: 1,
        orientationMode: NATIVE_RTC.ORIENTATION_MODE.ORIENTATION_MODE_ADAPTIVE,
        degradationPreference:
          NATIVE_RTC.DEGRADATION_PREFERENCE.MAINTAIN_BALANCED,
        mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_AUTO,
        advanceOptions: {
          encodingPreference: NATIVE_RTC.ENCODING_PREFERENCE.PREFER_AUTO,
          compressionPreference:
            NATIVE_RTC.COMPRESSION_PREFERENCE.PREFER_LOW_LATENCY,
        },
      },
    };
    await setupLocalVideo(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(
      apiEnginePtr,
      'RtcEngine_setVideoEncoderConfiguration',
      param
    );
    expect(irisRtcEngine.globalState.videoEncoderConfiguration.codecType).toBe(
      param.config.codecType
    );
  });
  test('setupLocalVideo', async () => {
    let param = {
      canvas: {
        view: 'test-view',
        sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY,
      },
    };
    await callIris(apiEnginePtr, 'RtcEngine_setupLocalVideo', param);
    expect(irisRtcEngine.irisClientManager.localVideoTrackPackages.length).toBe(
      1
    );
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].element
    ).toBe(param.canvas.view);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].type
    ).toBe(param.canvas.sourceType);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].track
    ).not.toBeUndefined();
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].track.isPlaying
    ).toBeTruthy();
  });
});
