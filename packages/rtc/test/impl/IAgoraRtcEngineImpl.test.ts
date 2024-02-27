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

import { IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';

import { IrisAudioSourceType } from '../../src/base/BaseType';
import { BufferSourceAudioTrackPackage } from '../../src/engine/IrisClientManager';
import { AgoraConsole } from '../../src/util';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';

import {
  TEST_REMOTE_STRING_UID,
  TEST_REMOTE_UID,
  TEST_STRING_UID,
  TEST_UID,
  callIris,
  callIrisWithoutCheck,
  joinChannel,
  joinChannelWithUserAccount,
  setupLocalVideo,
  setupRemoteVideoEx,
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
  await callIris(apiEnginePtr, 'RtcEngine_initialize_0320339', nParam);
});

afterEach(() => {
  IrisCore.disposeIrisApiEngine(apiEnginePtr);
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('IAgoraRtcEngineImpl', () => {
  test('initialize_0320339', async () => {
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
    await callIris(apiEnginePtr, 'RtcEngine_initialize_0320339', nParam);
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
    await callIris(apiEnginePtr, 'RtcEngine_release', null);
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
  test('registerEventHandler_5fc0465', async () => {
    jest.spyOn(irisRtcEngine.irisEventHandlerManager, 'addEventHandler');
    await callIris(apiEnginePtr, 'RtcEngine_registerEventHandler_5fc0465', {
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
  test('unregisterEventHandler_5fc0465', async () => {
    await callIris(apiEnginePtr, 'RtcEngine_registerEventHandler_5fc0465', {
      eventHandler: 'test',
    });
    expect(
      irisRtcEngine.irisEventHandlerManager['eventHandlersMap'].get('RtcEngine')
        .length == 1
    ).toBe(true);
    jest.spyOn(irisRtcEngine.irisEventHandlerManager, 'removeEventHandler');
    await callIris(apiEnginePtr, 'RtcEngine_unregisterEventHandler_5fc0465', {
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

  test('setClientRole_3426fa6', async () => {
    jest.spyOn(rtcEngineImpl, 'setClientRole_b46cc48');
    let role = NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER;
    await callIris(apiEnginePtr, 'RtcEngine_setClientRole_3426fa6', {
      role: role,
    });
    expect(rtcEngineImpl.setClientRole_b46cc48).toBeCalledTimes(1);
    expect(rtcEngineImpl.setClientRole_b46cc48).toBeCalledWith(
      NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
      {
        audienceLatencyLevel:
          NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE
            .AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY,
      }
    );
  });

  test('setClientRole_b46cc48', async () => {
    jest.spyOn(
      irisRtcEngine.rtcEngineEventHandler,
      'onClientRoleChanged_2acaf10'
    );
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
    await callIris(apiEnginePtr, 'RtcEngine_setClientRole_b46cc48', callParam);
    expect(
      irisRtcEngine.irisClientManager.getIrisClient().irisClientState
        .clientRoleType
    ).toBe(role);
    expect(irisRtcEngine.clientHelper.setClientRole).toBeCalledTimes(0);
    expect(
      irisRtcEngine.rtcEngineEventHandler.onClientRoleChanged_2acaf10
    ).toBeCalledTimes(0);

    await joinChannel(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_setClientRole_b46cc48', callParam);

    expect(irisRtcEngine.clientHelper.setClientRole).toBeCalledTimes(1);
    expect(
      irisRtcEngine.rtcEngineEventHandler.onClientRoleChanged_2acaf10
    ).toBeCalledTimes(1);
  });

  test('setAudioProfile_d944543', async () => {
    let param = {
      profile: NATIVE_RTC.AUDIO_PROFILE_TYPE.AUDIO_PROFILE_DEFAULT,
      scenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE.AUDIO_SCENARIO_CHATROOM,
    };
    await callIris(apiEnginePtr, 'RtcEngine_setAudioProfile_d944543', param);
    expect(irisRtcEngine.globalState.audioProfile).toBe(param.profile);
    expect(irisRtcEngine.globalState.rtcEngineContext.audioScenario).toBe(
      param.scenario
    );
  });

  test('setAudioProfile_ac39c15', async () => {
    let param = {
      profile: NATIVE_RTC.AUDIO_PROFILE_TYPE.AUDIO_PROFILE_DEFAULT,
    };
    await callIris(apiEnginePtr, 'RtcEngine_setAudioProfile_ac39c15', param);
    expect(irisRtcEngine.globalState.audioProfile).toBe(param.profile);
  });

  test('joinChannel_f097389', async () => {
    jest.spyOn(rtcEngineImpl, 'joinChannel_cdbb747');

    expect(irisRtcEngine.irisIntervalList.length == 0).toBeTruthy();
    await joinChannel(apiEnginePtr, null);

    expect(rtcEngineImpl.joinChannel_cdbb747).toBeCalledWith(
      null,
      FAKE_CHANNEL_NAME,
      TEST_UID,
      irisRtcEngine.irisClientManager.getIrisClient().irisClientState
    );
    expect(irisRtcEngine.irisIntervalList.length == 1).toBeTruthy();
  });

  test('joinChannel_cdbb747', async () => {
    jest.spyOn(
      irisRtcEngine.rtcEngineEventHandler,
      'onJoinChannelSuccess_263e4cd'
    );

    await joinChannel(apiEnginePtr, null);
    let irisClient = irisRtcEngine.irisClientManager.getIrisClient();

    expect(irisClient.irisClientState.token).toBe(null);
    expect(irisClient.connection.localUid).toBe(irisClient.agoraRTCClient.uid);
    expect(irisClient.agoraRTCClient.channelName).toBe(FAKE_CHANNEL_NAME);
    expect(irisClient.connection.channelId).toBe(
      irisClient.agoraRTCClient.channelName
    );
    expect(
      irisRtcEngine.rtcEngineEventHandler.onJoinChannelSuccess_263e4cd
    ).toBeCalledTimes(1);
  });

  test('updateChannelMediaOptions_7bfc1d7', async () => {
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
    await callIris(
      apiEnginePtr,
      'RtcEngine_updateChannelMediaOptions_7bfc1d7',
      param
    );
    expect(agoraRTCClient.renewToken).toBeCalledTimes(1);
    expect(agoraRTCClient.setClientRole).toBeCalledTimes(1);
  });

  test('enableAudioVolumeIndication_39794a0', async () => {
    await joinChannel(apiEnginePtr, null);
    jest.spyOn(
      irisRtcEngine.rtcEngineEventHandler,
      'onAudioVolumeIndication_781482a'
    );

    let param = {
      interval: 111,
      smooth: 222,
      reportVad: true,
    };
    await callIris(
      apiEnginePtr,
      'RtcEngine_enableAudioVolumeIndication_39794a0',
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
    //irisIntervalList是因为一个是远端的onNetworkQuality 一个是enableAudioVolumeIndication的
    expect(irisRtcEngine.irisIntervalList.length == 2).toBeTruthy();
    expect(irisRtcEngine.globalState.enableAudioVolumeIndication).toBeTruthy();
    jest.advanceTimersByTime(param.interval);
    expect(
      irisRtcEngine.rtcEngineEventHandler.onAudioVolumeIndication_781482a
    ).toBeCalledTimes(2);
  });

  test('leaveChannel', async () => {
    await joinChannel(apiEnginePtr, null);
    expect(irisRtcEngine.irisIntervalList.length == 1).toBeTruthy();
    jest.spyOn(rtcEngineImpl, 'leaveChannel_2c0e3aa');
    await callIris(apiEnginePtr, 'RtcEngine_leaveChannel');
    expect(rtcEngineImpl.leaveChannel_2c0e3aa).toBeCalled();
    expect(irisRtcEngine.irisIntervalList.length == 0).toBeTruthy();
  });

  test('leaveChannel_2c0e3aa', async () => {
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
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onUserOffline_0a32aac');
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onLeaveChannel_c8e730d');
    await callIris(apiEnginePtr, 'RtcEngine_leaveChannel_2c0e3aa', param);
    expect(rtcEngineImpl.stopAllEffects).toBeCalledTimes(
      agoraRTCClient.remoteUsers.length
    );
    expect(
      irisRtcEngine.rtcEngineEventHandler.onUserOffline_0a32aac
    ).toBeCalledTimes(agoraRTCClient.remoteUsers.length);
    expect(
      irisRtcEngine.rtcEngineEventHandler.onLeaveChannel_c8e730d
    ).toBeCalledTimes(1);
    expect(
      irisRtcEngine.irisClientManager.getIrisClient().release
    ).toBeCalledTimes(1);
  });

  test('enableLocalAudio_5039d15', async () => {
    let param = {
      enabled: true,
    };
    await callIris(apiEnginePtr, 'RtcEngine_enableLocalAudio_5039d15', param);
    expect(irisRtcEngine.globalState.enabledLocalAudio).toBe(param.enabled);
  });

  test('enableLocalVideo_5039d15', async () => {
    let param = {
      enabled: true,
    };
    await callIris(apiEnginePtr, 'RtcEngine_enableLocalVideo_5039d15', param);
    expect(irisRtcEngine.globalState.enabledLocalVideo).toBe(param.enabled);
  });

  test('enableVideo', async () => {
    await joinChannel(apiEnginePtr, null);
    await setupLocalVideo(apiEnginePtr, null);
    await setupRemoteVideoEx(apiEnginePtr, null);
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
    await setupRemoteVideoEx(apiEnginePtr, null);
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
    jest.spyOn(rtcEngineImpl, 'startPreview_4fd718e');
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview', null);
    expect(rtcEngineImpl.startPreview_4fd718e).toBeCalledWith(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA
    );
  });
  test('startPreview_4fd718e', async () => {
    let param = {
      sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA,
    };
    await setupLocalVideo(apiEnginePtr, null);
    jest.spyOn(
      irisRtcEngine.rtcEngineEventHandler,
      'onLocalVideoStateChanged_a44228a'
    );
    jest.spyOn(AgoraConsole, 'error');

    await callIris(apiEnginePtr, 'RtcEngine_startPreview_4fd718e', param);
    expect(AgoraConsole.error).toBeCalledWith(
      'call enableVideo(true) before startPreview'
    );
    jest.clearAllMocks();
    await callIris(apiEnginePtr, 'RtcEngine_startPreview_4fd718e', {
      sourceType: 100,
    });
    expect(AgoraConsole.error).toBeCalledWith(
      'call enableVideo(true) before startPreview'
    );
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview_4fd718e', param);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].track.isPlaying
    ).toBe(true);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].isPreview
    ).toBeTruthy();
    expect(
      irisRtcEngine.rtcEngineEventHandler.onLocalVideoStateChanged_a44228a
    ).toBeCalled();
  });
  test('stopPreview', async () => {
    await joinChannel(apiEnginePtr, null);
    jest.spyOn(rtcEngineImpl, 'stopPreview_4fd718e');
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview', null);
    await callIris(apiEnginePtr, 'RtcEngine_stopPreview', null);
    expect(rtcEngineImpl.stopPreview_4fd718e).toBeCalledWith(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA
    );
  });
  test('stopPreview_4fd718e', async () => {
    let param = {
      sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA,
    };
    await setupLocalVideo(apiEnginePtr, null);
    jest.spyOn(
      irisRtcEngine.rtcEngineEventHandler,
      'onLocalVideoStateChanged_a44228a'
    );

    let result2 = await callIrisWithoutCheck(
      apiEnginePtr,
      'RtcEngine_stopPreview_4fd718e',
      { sourceType: 100 }
    );
    expect(result2.code).toBe(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED);
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview', null);
    await callIris(apiEnginePtr, 'RtcEngine_stopPreview_4fd718e', param);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].track.isPlaying
    ).toBe(false);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].isPreview
    ).toBeFalsy();
    expect(
      irisRtcEngine.rtcEngineEventHandler.onLocalVideoStateChanged_a44228a
    ).toBeCalled();
  });
  test('setVideoEncoderConfiguration_89677d8', async () => {
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
      'RtcEngine_setVideoEncoderConfiguration_89677d8',
      param
    );
    expect(irisRtcEngine.globalState.videoEncoderConfiguration.codecType).toBe(
      param.config.codecType
    );
  });
  test('setupLocalVideo_acc9c38', async () => {
    let param = {
      canvas: {
        view: 'test-view',
        sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY,
      },
    };
    await callIris(apiEnginePtr, 'RtcEngine_setupLocalVideo_acc9c38', param);
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
  test('setLogLevel_f125d83', async () => {
    let param = {
      level: 3,
    };
    await callIris(apiEnginePtr, 'RtcEngine_setLogLevel_f125d83', param);
    //由于initialize时已经调用过一次setLogLevel，所以这里调用次数为2
    expect(AgoraRTCMock.setLogLevel).toBeCalledTimes(2);
  });
  test('startScreenCapture_270da41', async () => {
    let param = {
      captureParams: {
        captureAudio: true,
        captureVideo: false,
      },
    };
    let result = await callIrisWithoutCheck(
      apiEnginePtr,
      'RtcEngine_startScreenCapture_270da41',
      param
    );
    expect(result.code).toBe(NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK);
    let param2 = {
      captureParams: {
        captureAudio: true,
        captureVideo: true,
      },
    };
    await callIris(
      apiEnginePtr,
      'RtcEngine_startScreenCapture_270da41',
      param2
    );
    expect(
      irisRtcEngine.irisClientManager.getLocalVideoTrackPackageBySourceType(
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
      ).length
    ).toBe(1);
    //由于initialize时已经创建了一个microphone track，所以这里是2
    expect(
      irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeScreenCapture
      ).length
    ).toBe(1);
    let result2 = await callIrisWithoutCheck(
      apiEnginePtr,
      'RtcEngine_startScreenCapture_270da41',
      param2
    );
    expect(result2.code).toBe(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED);
  });
  test('stopScreenCapture', async () => {
    jest.spyOn(rtcEngineImpl, 'stopScreenCapture_4fd718e');
    await callIris(apiEnginePtr, 'RtcEngine_stopScreenCapture', null);
    expect(rtcEngineImpl.stopScreenCapture_4fd718e).toBeCalledWith(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
    );
  });
  test('stopScreenCapture_4fd718e', async () => {
    jest.spyOn(AgoraConsole, 'warn');
    let param = {
      sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY,
    };
    await callIris(apiEnginePtr, 'RtcEngine_stopScreenCapture_4fd718e', param);
    expect(AgoraConsole.warn).toBeCalledWith('screenCapture is not start');

    let param2 = {
      captureParams: {
        captureAudio: true,
        captureVideo: true,
      },
    };
    await callIris(
      apiEnginePtr,
      'RtcEngine_startScreenCapture_270da41',
      param2
    );
    await callIris(apiEnginePtr, 'RtcEngine_stopScreenCapture_4fd718e', param);
    expect(
      irisRtcEngine.irisClientManager.getLocalVideoTrackPackageBySourceType(
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
      ).length
    ).toBe(0);
    //由于initialize时已经创建了一个microphone track，所以这里是1
    expect(
      irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeScreenCapture
      ).length
    ).toBe(0);
  });
  test('playEffect_531a783', async () => {
    jest.spyOn(AgoraConsole, 'error');
    jest.spyOn(AgoraRTCMock, 'createBufferSourceAudioTrack');
    let param = {
      soundId: 1,
      filePath: 'test-file-path',
      loopCount: 2,
      pitch: 1,
      pan: 2,
      gain: 5,
      publish: true,
      startPos: 6,
    };
    await callIris(apiEnginePtr, 'RtcEngine_disableAudio', null);
    let result = await callIrisWithoutCheck(
      apiEnginePtr,
      'RtcEngine_playEffect_531a783',
      param
    );
    expect(AgoraConsole.error).toBeCalledWith('please enableAudio first');
    expect(result.code).toBe(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    await callIris(apiEnginePtr, 'RtcEngine_playEffect_531a783', param);
    expect(AgoraRTCMock.createBufferSourceAudioTrack).toBeCalledTimes(1);
    expect(AgoraRTCMock.createBufferSourceAudioTrack).toBeCalledWith({
      source: `${location.origin}/${param.filePath}`,
    });
    expect(
      irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio
      ).length
    ).toBe(1);
    expect(
      (irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio
      )[0] as BufferSourceAudioTrackPackage).needPublish
    ).toBe(param.publish);
    expect(
      (irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio
      )[0] as BufferSourceAudioTrackPackage).soundId
    ).toBe(param.soundId);
    expect(
      (irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio
      )[0] as BufferSourceAudioTrackPackage).track.getVolumeLevel()
    ).toBe(param.gain / 100);
    expect(
      (irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio
      )[0] as BufferSourceAudioTrackPackage).track.isPlaying
    ).toBeTruthy();
  });
  test('stopEffect', async () => {
    jest.spyOn(AgoraConsole, 'error');
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onError_d26c0fd');

    let param = {
      soundId: 1,
      filePath: 'test-file-path',
      loopCount: 2,
      pitch: 1,
      pan: 2,
      gain: 5,
      publish: true,
      startPos: 6,
    };
    let errorParam = {
      soundId: 666,
    };
    await callIris(apiEnginePtr, 'RtcEngine_stopEffect_46f8ab7', errorParam);
    expect(irisRtcEngine.rtcEngineEventHandler.onError_d26c0fd).toBeCalledWith(
      NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED,
      `soundId:${errorParam.soundId} not found`
    );
    await callIris(apiEnginePtr, 'RtcEngine_playEffect_531a783', param);
    await callIris(apiEnginePtr, 'RtcEngine_stopEffect_46f8ab7', {
      soundId: param.soundId,
    });
    expect(
      irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio
      ).length
    ).toBe(0);
  });
  test('stopAllEffects', async () => {
    jest.spyOn(AgoraConsole, 'error');
    jest.spyOn(rtcEngineImpl, 'stopEffect_46f8ab7');

    let param = {
      soundId: 1,
      filePath: 'test-file-path',
      loopCount: 2,
      pitch: 1,
      pan: 2,
      gain: 5,
      publish: true,
      startPos: 6,
    };
    let param2 = {
      soundId: 2,
      filePath: 'test-file-path',
      loopCount: 2,
      pitch: 1,
      pan: 2,
      gain: 5,
      publish: true,
      startPos: 6,
    };
    await callIris(apiEnginePtr, 'RtcEngine_playEffect_531a783', param);
    await callIris(apiEnginePtr, 'RtcEngine_playEffect_531a783', param2);
    let bufferSourceAudioTrackPackageListLength = irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
      IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio
    ).length;
    expect(bufferSourceAudioTrackPackageListLength).toBe(2);
    await callIris(apiEnginePtr, 'RtcEngine_stopAllEffects', param2);
    expect(rtcEngineImpl.stopEffect_46f8ab7).toBeCalledTimes(
      bufferSourceAudioTrackPackageListLength
    );
  });
  test('setChannelProfile_a78fa4f', async () => {
    jest.spyOn(rtcEngineImpl, 'setChannelProfile_a78fa4f');

    let param = {
      profile: 1,
    };
    await callIris(apiEnginePtr, 'RtcEngine_setChannelProfile_a78fa4f', param);
    expect(irisRtcEngine.globalState.channelProfile).toBe(param.profile);
  });
  test('muteLocalAudioStream_5039d15', async () => {
    jest.spyOn(rtcEngineImpl, 'muteLocalAudioStream_5039d15');
    await joinChannel(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let localAudioTrackPackage = irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
      IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
    );
    expect(localAudioTrackPackage.length).toBe(1);
    expect(localAudioTrackPackage[0].track.isPlaying).toBe(true);
    expect((localAudioTrackPackage[0].track as ILocalTrack).muted).toBe(false);

    await callIris(apiEnginePtr, 'RtcEngine_muteLocalAudioStream_5039d15', {
      mute: true,
    });
    expect((localAudioTrackPackage[0].track as ILocalTrack).muted).toBe(true);

    await callIris(apiEnginePtr, 'RtcEngine_muteLocalAudioStream_5039d15', {
      mute: false,
    });
    expect((localAudioTrackPackage[0].track as ILocalTrack).muted).toBe(false);
  });
  test('muteAllRemoteAudioStreams_5039d15', async () => {
    jest.spyOn(rtcEngineImpl, 'muteAllRemoteAudioStreams_5039d15');
    await joinChannel(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let remoteUsers =
      irisRtcEngine.irisClientManager.irisClientList[0]?.agoraRTCClient
        .remoteUsers;
    expect(remoteUsers[0].audioTrack.isPlaying).toBe(true);

    await callIris(
      apiEnginePtr,
      'RtcEngine_muteAllRemoteAudioStreams_5039d15',
      {
        mute: true,
      }
    );
    expect(remoteUsers[0].audioTrack).toBeUndefined();
    await callIris(
      apiEnginePtr,
      'RtcEngine_muteAllRemoteAudioStreams_5039d15',
      {
        mute: false,
      }
    );
    expect(remoteUsers[0].audioTrack).not.toBeUndefined();
  });
  test('muteRemoteAudioStream_dbdc15a', async () => {
    jest.spyOn(rtcEngineImpl, 'muteRemoteAudioStream_dbdc15a');
    await joinChannel(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let remoteUsers =
      irisRtcEngine.irisClientManager.irisClientList[0]?.agoraRTCClient
        .remoteUsers;
    expect(remoteUsers[0].audioTrack.isPlaying).toBe(true);

    await callIris(apiEnginePtr, 'RtcEngine_muteRemoteAudioStream_dbdc15a', {
      mute: true,
      uid: TEST_REMOTE_UID,
    });
    expect(remoteUsers[0].audioTrack).toBeUndefined();
    await callIris(apiEnginePtr, 'RtcEngine_muteRemoteAudioStream_dbdc15a', {
      mute: false,
      uid: TEST_REMOTE_UID,
    });
    expect(remoteUsers[0].audioTrack).not.toBeUndefined();
  });

  test('muteLocalVideoStream_5039d15', async () => {
    jest.spyOn(rtcEngineImpl, 'muteLocalVideoStream_5039d15');
    await joinChannel(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview', null);
    let localVideoTrackPackage = irisRtcEngine.irisClientManager.getLocalVideoTrackPackageBySourceType(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY
    );
    expect(localVideoTrackPackage.length).toBe(1);
    expect(localVideoTrackPackage[0].track.isPlaying).toBe(true);
    expect((localVideoTrackPackage[0].track as ILocalTrack).muted).toBe(false);

    await callIris(apiEnginePtr, 'RtcEngine_muteLocalVideoStream_5039d15', {
      mute: true,
    });
    expect((localVideoTrackPackage[0].track as ILocalTrack).muted).toBe(true);

    await callIris(apiEnginePtr, 'RtcEngine_muteLocalVideoStream_5039d15', {
      mute: false,
    });
    expect((localVideoTrackPackage[0].track as ILocalTrack).muted).toBe(false);
  });
  test('muteAllRemoteVideoStreams_5039d15', async () => {
    jest.spyOn(rtcEngineImpl, 'muteAllRemoteVideoStreams_5039d15');
    await joinChannel(apiEnginePtr, null);
    await setupRemoteVideoEx(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    let remoteUsers =
      irisRtcEngine.irisClientManager.irisClientList[0]?.agoraRTCClient
        .remoteUsers;
    expect(remoteUsers[0].videoTrack.isPlaying).toBe(true);

    await callIris(
      apiEnginePtr,
      'RtcEngine_muteAllRemoteVideoStreams_5039d15',
      {
        mute: true,
      }
    );
    expect(remoteUsers[0].videoTrack).toBeUndefined();
    await callIris(
      apiEnginePtr,
      'RtcEngine_muteAllRemoteVideoStreams_5039d15',
      {
        mute: false,
      }
    );
    expect(remoteUsers[0].videoTrack).not.toBeUndefined();
  });
  test('muteRemoteVideoStream_dbdc15a', async () => {
    jest.spyOn(rtcEngineImpl, 'muteRemoteVideoStream_dbdc15a');
    await joinChannel(apiEnginePtr, null);
    await setupRemoteVideoEx(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    let remoteUsers =
      irisRtcEngine.irisClientManager.irisClientList[0]?.agoraRTCClient
        .remoteUsers;
    expect(remoteUsers[0].videoTrack.isPlaying).toBe(true);

    await callIris(apiEnginePtr, 'RtcEngine_muteRemoteVideoStream_dbdc15a', {
      mute: true,
      uid: TEST_REMOTE_UID,
    });
    expect(remoteUsers[0].videoTrack).toBeUndefined();
    await callIris(apiEnginePtr, 'RtcEngine_muteRemoteVideoStream_dbdc15a', {
      mute: false,
      uid: TEST_REMOTE_UID,
    });
    expect(remoteUsers[0].videoTrack).not.toBeUndefined();
  });

  test('setParameters_3a2037f', async () => {
    let params = JSON.stringify({
      'rtc.audio.force_bluetooth_a2dp': true,
      'rtc.video.test': [true, false],
    });
    await callIris(apiEnginePtr, 'RtcEngine_setParameters_3a2037f', {
      parameters: params,
    });
  });
  test('createDataStream_5862815', async () => {
    await callIris(apiEnginePtr, 'RtcEngine_createDataStream_5862815', {
      config: {
        syncWithAudio: true,
        ordered: true,
      },
    });
    let irisClientState =
      irisRtcEngine.irisClientManager.irisClientList[0]?.irisClientState;
    expect(irisClientState.dataStreamConfig.syncWithAudio).toBe(true);
    expect(irisClientState.dataStreamConfig.ordered).toBe(true);
  });
  test('sendStreamMessage_8715a45', async () => {
    await callIris(apiEnginePtr, 'RtcEngine_createDataStream_5862815', {
      config: {
        syncWithAudio: true,
        ordered: true,
      },
    });
    let result = await callIrisWithoutCheck(
      apiEnginePtr,
      'RtcEngine_sendStreamMessage_8715a45',
      {
        streamId: '1',
        data: 'hello world',
        length: 11,
      }
    );
    expect(result.code).toBe(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_IN_CHANNEL);
    const mockFunction = jest.spyOn(
      irisRtcEngine.clientHelper,
      'sendStreamMessage'
    );
    await joinChannel(apiEnginePtr, null);
    let result2 = await callIrisWithoutCheck(
      apiEnginePtr,
      'RtcEngine_sendStreamMessage_8715a45',
      {
        streamId: '1',
        data: 'hello world',
        length: 11,
      }
    );
    expect(result2.code).toBe(NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK);
    expect(mockFunction.mock.calls[0][1]).toMatchObject({
      syncWithAudio: true,
      payload: 'hello world',
    });
  });
  test('joinChannelWithUserAccount_0e4f59e', async () => {
    jest.spyOn(rtcEngineImpl, 'joinChannelWithUserAccount_4685af9');

    expect(irisRtcEngine.irisIntervalList.length == 0).toBeTruthy();
    await joinChannelWithUserAccount(apiEnginePtr);

    expect(rtcEngineImpl.joinChannelWithUserAccount_4685af9).toBeCalledWith(
      null,
      FAKE_CHANNEL_NAME,
      TEST_STRING_UID,
      irisRtcEngine.irisClientManager.getIrisClient().irisClientState
    );
    expect(irisRtcEngine.irisIntervalList.length == 1).toBeTruthy();
  });

  test('joinChannelWithUserAccount_4685af9', async () => {
    jest.spyOn(
      irisRtcEngine.rtcEngineEventHandler,
      'onJoinChannelSuccess_263e4cd'
    );

    await joinChannelWithUserAccount(apiEnginePtr);
    let userInfoList = irisRtcEngine.irisClientManager.userInfoList;
    let irisClient = irisRtcEngine.irisClientManager.getIrisClient();

    expect(irisClient.irisClientState.token).toBe(null);
    expect(irisClient.agoraRTCClient.channelName).toBe(FAKE_CHANNEL_NAME);
    expect(irisClient.connection.channelId).toBe(
      irisClient.agoraRTCClient.channelName
    );
    expect(
      irisRtcEngine.rtcEngineEventHandler.onJoinChannelSuccess_263e4cd
    ).toBeCalledTimes(1);
  });

  test('getUserInfoByUserAccount_c6a8f08', async () => {
    await joinChannelWithUserAccount(apiEnginePtr);
    let userInfoList = irisRtcEngine.irisClientManager.userInfoList;

    expect(userInfoList[0].userAccount).toBe(TEST_STRING_UID);
    expect(JSON.stringify(userInfoList[1])).toBe(
      JSON.stringify({
        uid: TEST_REMOTE_UID,
        userAccount: TEST_REMOTE_STRING_UID,
      })
    );
    expect(userInfoList.length).toBe(2);
    let result = await callIris(
      apiEnginePtr,
      'RtcEngine_getUserInfoByUserAccount_c6a8f08',
      {
        userAccount: TEST_STRING_UID,
      }
    );
    expect(JSON.parse(result.data).userInfo.userAccount).toBe(TEST_STRING_UID);
  });

  test('getUserInfoByUid_6b7aee8', async () => {
    await joinChannelWithUserAccount(apiEnginePtr);
    let userInfoList = irisRtcEngine.irisClientManager.userInfoList;
    expect(userInfoList[0].userAccount).toBe(TEST_STRING_UID);
    expect(JSON.stringify(userInfoList[1])).toBe(
      JSON.stringify({
        uid: TEST_REMOTE_UID,
        userAccount: TEST_REMOTE_STRING_UID,
      })
    );
    expect(userInfoList.length).toBe(2);
    let result = await callIris(
      apiEnginePtr,
      'RtcEngine_getUserInfoByUid_6b7aee8',
      {
        uid: userInfoList[0].uid,
      }
    );
    expect(JSON.parse(result.data).userInfo.uid).toBe(userInfoList[0].uid);
  });
});
