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
  TEST_REMOTE_UID,
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

  test('setClientRole_551dc441', async () => {
    jest.spyOn(rtcEngineImpl, 'setClientRole_291220d0');
    let role = NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER;
    await callIris(apiEnginePtr, 'RtcEngine_setClientRole_551dc441', {
      role: role,
    });
    expect(rtcEngineImpl.setClientRole_291220d0).toBeCalledTimes(1);
    expect(rtcEngineImpl.setClientRole_291220d0).toBeCalledWith(
      NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
      {
        audienceLatencyLevel:
          NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE
            .AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY,
      }
    );
  });

  test('setClientRole_291220d0', async () => {
    jest.spyOn(
      irisRtcEngine.rtcEngineEventHandler,
      'onClientRoleChanged_bb90b96'
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
    await callIris(apiEnginePtr, 'RtcEngine_setClientRole_291220d0', callParam);
    expect(
      irisRtcEngine.irisClientManager.getIrisClient().irisClientState
        .clientRoleType
    ).toBe(role);
    expect(irisRtcEngine.clientHelper.setClientRole).toBeCalledTimes(0);
    expect(
      irisRtcEngine.rtcEngineEventHandler.onClientRoleChanged_bb90b96
    ).toBeCalledTimes(0);

    await joinChannel(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_setClientRole_291220d0', callParam);

    expect(irisRtcEngine.clientHelper.setClientRole).toBeCalledTimes(1);
    expect(
      irisRtcEngine.rtcEngineEventHandler.onClientRoleChanged_bb90b96
    ).toBeCalledTimes(1);
  });

  test('setAudioProfile_38ea7f46', async () => {
    let param = {
      profile: NATIVE_RTC.AUDIO_PROFILE_TYPE.AUDIO_PROFILE_DEFAULT,
      scenario: NATIVE_RTC.AUDIO_SCENARIO_TYPE.AUDIO_SCENARIO_CHATROOM,
    };
    await callIris(apiEnginePtr, 'RtcEngine_setAudioProfile_38ea7f46', param);
    expect(irisRtcEngine.globalState.audioProfile).toBe(param.profile);
    expect(irisRtcEngine.globalState.rtcEngineContext.audioScenario).toBe(
      param.scenario
    );
  });

  test('setAudioProfile_565157fd', async () => {
    let param = {
      profile: NATIVE_RTC.AUDIO_PROFILE_TYPE.AUDIO_PROFILE_DEFAULT,
    };
    await callIris(apiEnginePtr, 'RtcEngine_setAudioProfile_565157fd', param);
    expect(irisRtcEngine.globalState.audioProfile).toBe(param.profile);
  });

  test('joinChannel', async () => {
    jest.spyOn(rtcEngineImpl, 'joinChannel_ab58eb4');

    expect(irisRtcEngine.irisIntervalList.length == 0).toBeTruthy();
    await joinChannel(apiEnginePtr, null);

    expect(rtcEngineImpl.joinChannel_ab58eb4).toBeCalledWith(
      null,
      FAKE_CHANNEL_NAME,
      TEST_UID,
      irisRtcEngine.irisClientManager.getIrisClient().irisClientState
    );
    expect(irisRtcEngine.irisIntervalList.length == 1).toBeTruthy();
  });

  test('joinChannel', async () => {
    jest.spyOn(
      irisRtcEngine.rtcEngineEventHandler,
      'onJoinChannelSuccess_7cc1c731'
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
      irisRtcEngine.rtcEngineEventHandler.onJoinChannelSuccess_7cc1c731
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
      'onAudioVolumeIndication_4719309'
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
    //irisIntervalList是因为一个是远端的onNetworkQuality 一个是enableAudioVolumeIndication的
    expect(irisRtcEngine.irisIntervalList.length == 2).toBeTruthy();
    expect(irisRtcEngine.globalState.enableAudioVolumeIndication).toBeTruthy();
    jest.advanceTimersByTime(param.interval);
    expect(
      irisRtcEngine.rtcEngineEventHandler.onAudioVolumeIndication_4719309
    ).toBeCalledTimes(2);
  });

  test('leaveChannel_6ee2c8c6', async () => {
    await joinChannel(apiEnginePtr, null);
    expect(irisRtcEngine.irisIntervalList.length == 1).toBeTruthy();
    jest.spyOn(rtcEngineImpl, 'leaveChannel_6ee2c8c6');
    await callIris(apiEnginePtr, 'RtcEngine_leaveChannel_6ee2c8c6');
    expect(rtcEngineImpl.leaveChannel_6ee2c8c6).toBeCalled();
    expect(irisRtcEngine.irisIntervalList.length == 0).toBeTruthy();
  });

  test('leaveChannel_16d487a0', async () => {
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
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onUserOffline_4482b252');
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onLeaveChannel_984843a');
    await callIris(apiEnginePtr, 'RtcEngine_leaveChannel_16d487a0', param);
    expect(rtcEngineImpl.stopAllEffects).toBeCalledTimes(
      agoraRTCClient.remoteUsers.length
    );
    expect(
      irisRtcEngine.rtcEngineEventHandler.onUserOffline_4482b252
    ).toBeCalledTimes(agoraRTCClient.remoteUsers.length);
    expect(
      irisRtcEngine.rtcEngineEventHandler.onLeaveChannel_984843a
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
    await callIris(apiEnginePtr, 'RtcEngine_startPreview_99a4d00', null);
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
    await callIris(apiEnginePtr, 'RtcEngine_startPreview_99a4d00', null);
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
    jest.spyOn(rtcEngineImpl, 'startPreview_69ae92f1');
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview_99a4d00', null);
    expect(rtcEngineImpl.startPreview_69ae92f1).toBeCalledWith(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA
    );
  });
  test('startPreview_69ae92f1', async () => {
    let param = {
      sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA,
    };
    await setupLocalVideo(apiEnginePtr, null);
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onLocalVideoStateChanged');
    jest.spyOn(AgoraConsole, 'error');

    await callIris(apiEnginePtr, 'RtcEngine_startPreview_69ae92f1', param);
    expect(AgoraConsole.error).toBeCalledWith(
      'call enableVideo(true) before startPreview'
    );
    jest.clearAllMocks();
    await callIris(apiEnginePtr, 'RtcEngine_startPreview_69ae92f1', {
      sourceType: 100,
    });
    expect(AgoraConsole.error).toBeCalledWith(
      'call enableVideo(true) before startPreview'
    );
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview_69ae92f1', param);
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
    jest.spyOn(rtcEngineImpl, 'stopPreview_11d53f7b');
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview_99a4d00', null);
    await callIris(apiEnginePtr, 'RtcEngine_stopPreview_7da70914', null);
    expect(rtcEngineImpl.stopPreview_11d53f7b).toBeCalledWith(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA
    );
  });
  test('stopPreview_11d53f7b', async () => {
    let param = {
      sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA,
    };
    await setupLocalVideo(apiEnginePtr, null);
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onLocalVideoStateChanged');

    let result2 = await callIrisWithoutCheck(
      apiEnginePtr,
      'RtcEngine_stopPreview_11d53f7b',
      { sourceType: 100 }
    );
    expect(result2.code).toBe(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED);
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview_99a4d00', null);
    await callIris(apiEnginePtr, 'RtcEngine_stopPreview_11d53f7b', param);
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
  test('setLogLevel', async () => {
    let param = {
      level: 3,
    };
    await callIris(apiEnginePtr, 'RtcEngine_setLogLevel', param);
    //由于initialize时已经调用过一次setLogLevel，所以这里调用次数为2
    expect(AgoraRTCMock.setLogLevel).toBeCalledTimes(2);
  });
  test('startScreenCapture_d5e38fa', async () => {
    let param = {
      captureParams: {
        captureAudio: true,
        captureVideo: false,
      },
    };
    let result = await callIrisWithoutCheck(
      apiEnginePtr,
      'RtcEngine_startScreenCapture_d5e38fa',
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
      'RtcEngine_startScreenCapture_d5e38fa',
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
      'RtcEngine_startScreenCapture_d5e38fa',
      param2
    );
    expect(result2.code).toBe(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED);
  });
  test('stopScreenCapture_11b608de', async () => {
    jest.spyOn(rtcEngineImpl, 'stopScreenCapture_328d8bd3');
    await callIris(apiEnginePtr, 'RtcEngine_stopScreenCapture_11b608de', null);
    expect(rtcEngineImpl.stopScreenCapture_328d8bd3).toBeCalledWith(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
    );
  });
  test('stopScreenCapture_328d8bd3', async () => {
    jest.spyOn(AgoraConsole, 'warn');
    let param = {
      sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY,
    };
    await callIris(apiEnginePtr, 'RtcEngine_stopScreenCapture_328d8bd3', param);
    expect(AgoraConsole.warn).toBeCalledWith('screenCapture is not start');

    let param2 = {
      captureParams: {
        captureAudio: true,
        captureVideo: true,
      },
    };
    await callIris(apiEnginePtr, 'RtcEngine_startScreenCapture', param2);
    await callIris(apiEnginePtr, 'RtcEngine_stopScreenCapture_328d8bd3', param);
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
  test('playEffect', async () => {
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
      'RtcEngine_playEffect',
      param
    );
    expect(AgoraConsole.error).toBeCalledWith('please enableAudio first');
    expect(result.code).toBe(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    await callIris(apiEnginePtr, 'RtcEngine_playEffect', param);
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
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onError');

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
    await callIris(apiEnginePtr, 'RtcEngine_stopEffect', errorParam);
    expect(irisRtcEngine.rtcEngineEventHandler.onError).toBeCalledWith(
      NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED,
      `soundId:${errorParam.soundId} not found`
    );
    await callIris(apiEnginePtr, 'RtcEngine_playEffect', param);
    await callIris(apiEnginePtr, 'RtcEngine_stopEffect', {
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
    jest.spyOn(rtcEngineImpl, 'stopEffect');

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
    await callIris(apiEnginePtr, 'RtcEngine_playEffect', param);
    await callIris(apiEnginePtr, 'RtcEngine_playEffect', param2);
    let bufferSourceAudioTrackPackageListLength = irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
      IrisAudioSourceType.kAudioSourceTypeBufferSourceAudio
    ).length;
    expect(bufferSourceAudioTrackPackageListLength).toBe(2);
    await callIris(apiEnginePtr, 'RtcEngine_stopAllEffects', param2);
    expect(rtcEngineImpl.stopEffect).toBeCalledTimes(
      bufferSourceAudioTrackPackageListLength
    );
  });
  test('setChannelProfile', async () => {
    jest.spyOn(rtcEngineImpl, 'setChannelProfile');

    let param = {
      profile: 1,
    };
    await callIris(apiEnginePtr, 'RtcEngine_setChannelProfile', param);
    expect(irisRtcEngine.globalState.channelProfile).toBe(param.profile);
  });
  test('muteLocalAudioStream', async () => {
    jest.spyOn(rtcEngineImpl, 'muteLocalAudioStream');
    await joinChannel(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let localAudioTrackPackage = irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
      IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
    );
    expect(localAudioTrackPackage.length).toBe(1);
    expect(localAudioTrackPackage[0].track.isPlaying).toBe(true);
    expect((localAudioTrackPackage[0].track as ILocalTrack).muted).toBe(false);

    await callIris(apiEnginePtr, 'RtcEngine_muteLocalAudioStream', {
      mute: true,
    });
    expect((localAudioTrackPackage[0].track as ILocalTrack).muted).toBe(true);

    await callIris(apiEnginePtr, 'RtcEngine_muteLocalAudioStream', {
      mute: false,
    });
    expect((localAudioTrackPackage[0].track as ILocalTrack).muted).toBe(false);
  });
  test('muteAllRemoteAudioStreams', async () => {
    jest.spyOn(rtcEngineImpl, 'muteAllRemoteAudioStreams');
    await joinChannel(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let remoteUsers =
      irisRtcEngine.irisClientManager.irisClientList[0]?.agoraRTCClient
        .remoteUsers;
    expect(remoteUsers[0].audioTrack.isPlaying).toBe(true);

    await callIris(apiEnginePtr, 'RtcEngine_muteAllRemoteAudioStreams', {
      mute: true,
    });
    expect(remoteUsers[0].audioTrack).toBeUndefined();
    await callIris(apiEnginePtr, 'RtcEngine_muteAllRemoteAudioStreams', {
      mute: false,
    });
    expect(remoteUsers[0].audioTrack).not.toBeUndefined();
  });
  test('muteRemoteAudioStream', async () => {
    jest.spyOn(rtcEngineImpl, 'muteRemoteAudioStream');
    await joinChannel(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let remoteUsers =
      irisRtcEngine.irisClientManager.irisClientList[0]?.agoraRTCClient
        .remoteUsers;
    expect(remoteUsers[0].audioTrack.isPlaying).toBe(true);

    await callIris(apiEnginePtr, 'RtcEngine_muteRemoteAudioStream', {
      mute: true,
      uid: TEST_REMOTE_UID,
    });
    expect(remoteUsers[0].audioTrack).toBeUndefined();
    await callIris(apiEnginePtr, 'RtcEngine_muteRemoteAudioStream', {
      mute: false,
      uid: TEST_REMOTE_UID,
    });
    expect(remoteUsers[0].audioTrack).not.toBeUndefined();
  });
  test('setParameters', async () => {
    let params = JSON.stringify({
      'rtc.audio.force_bluetooth_a2dp': true,
      'rtc.video.test': [true, false],
    });
    await callIris(apiEnginePtr, 'RtcEngine_setParameters', {
      parameters: params,
    });
  });
});
