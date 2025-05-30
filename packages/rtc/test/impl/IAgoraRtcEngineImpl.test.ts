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
import { NotifyType } from '../../src/engine/IrisClientObserver';
import { AgoraConsole, AgoraTranslate } from '../../src/util';

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
  jest.spyOn(irisRtcEngine.implHelper, 'createMicrophoneAudioTrack');
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
    await callIris(apiEnginePtr, 'RtcEngine_release', {
      sync: true,
    });
    expect(irisRtcEngine.irisClientManager.release).toBeCalledTimes(1);
    expect(irisRtcEngine.irisClientManager.localAudioTrackPackages.length).toBe(
      0
    );
    expect(irisRtcEngine.irisClientManager.localVideoTrackPackages.length).toBe(
      0
    );
    expect(irisRtcEngine.irisIntervalList.length).toBe(0);
    expect(irisRtcEngine.irisElement.containerElement).toBeUndefined();
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
    jest.spyOn(rtcEngineImpl, 'enableLocalAudio');
    jest.spyOn(rtcEngineImpl, 'muteLocalAudioStream');
    jest.spyOn(rtcEngineImpl, 'muteAllRemoteAudioStreams');

    await joinChannel(apiEnginePtr, null);

    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    expect(rtcEngineImpl.enableLocalAudio).toBeCalledWith(true);
    expect(rtcEngineImpl.muteLocalAudioStream).toBeCalledWith(false);
    expect(rtcEngineImpl.muteAllRemoteAudioStreams).toBeCalledWith(false);
  });
  test('disableAudio', async () => {
    jest.spyOn(rtcEngineImpl, 'enableLocalAudio');
    jest.spyOn(rtcEngineImpl, 'muteLocalAudioStream');
    jest.spyOn(rtcEngineImpl, 'muteAllRemoteAudioStreams');

    await joinChannel(apiEnginePtr, null);

    await callIris(apiEnginePtr, 'RtcEngine_disableAudio', null);
    expect(rtcEngineImpl.enableLocalAudio).toBeCalledWith(false);
    expect(rtcEngineImpl.muteLocalAudioStream).toBeCalledWith(true);
    expect(rtcEngineImpl.muteAllRemoteAudioStreams).toBeCalledWith(true);
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

    expect(irisRtcEngine.irisIntervalList.length == 0).toBeTruthy();
    await joinChannel(apiEnginePtr, null);

    expect(rtcEngineImpl.joinChannel2).toBeCalledWith(
      null,
      FAKE_CHANNEL_NAME,
      TEST_UID,
      irisRtcEngine.irisClientManager.getIrisClient().irisClientState
    );
    expect(irisRtcEngine.irisIntervalList.length == 1).toBeTruthy();
  });

  test('joinChannel2', async () => {
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onJoinChannelSuccessEx');

    await joinChannel(apiEnginePtr, null);
    let irisClient = irisRtcEngine.irisClientManager.getIrisClient();

    expect(irisClient.irisClientState.token).toBe(null);
    expect(irisClient.connection.localUid).toBe(irisClient.agoraRTCClient!.uid);
    expect(irisClient.agoraRTCClient!.channelName).toBe(FAKE_CHANNEL_NAME);
    expect(irisClient.connection.channelId).toBe(
      irisClient.agoraRTCClient!.channelName
    );
    expect(
      irisRtcEngine.rtcEngineEventHandler.onJoinChannelSuccessEx
    ).toBeCalledTimes(1);
  });

  test('updateChannelMediaOptions', async () => {
    await joinChannel(apiEnginePtr, null);
    let agoraRTCClient = irisRtcEngine.irisClientManager.getIrisClient()
      .agoraRTCClient;
    jest.spyOn(agoraRTCClient!, 'renewToken');
    jest.spyOn(agoraRTCClient!, 'setClientRole');
    let param = {
      options: {
        clientRoleType: NATIVE_RTC.CLIENT_ROLE_TYPE.CLIENT_ROLE_AUDIENCE,
        publishCameraTrack: true,
        publishMicrophoneTrack: true,
        publishScreenTrack: true,
        publishCustomVideoTrack: true,
        token: '123',
      },
    };
    await callIris(apiEnginePtr, 'RtcEngine_updateChannelMediaOptions', param);
    expect(agoraRTCClient!.renewToken).toBeCalledTimes(1);
    expect(agoraRTCClient!.setClientRole).toBeCalledTimes(1);
  });

  test('enableAudioVolumeIndication', async () => {
    await joinChannel(apiEnginePtr, null);
    let irisClient = irisRtcEngine.irisClientManager.getIrisClient();
    jest.spyOn(irisClient.agoraRTCClient!, 'enableAudioVolumeIndicator');
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

  test('leaveChannel', async () => {
    await joinChannel(apiEnginePtr, null);
    expect(irisRtcEngine.irisIntervalList.length == 1).toBeTruthy();
    jest.spyOn(rtcEngineImpl, 'leaveChannel');
    await callIris(apiEnginePtr, 'RtcEngine_leaveChannel');
    expect(rtcEngineImpl.leaveChannel).toBeCalled();
    expect(irisRtcEngine.irisIntervalList.length == 0).toBeTruthy();
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
    let irisClient = irisRtcEngine.irisClientManager.getIrisClient();
    jest.spyOn(irisClient, 'release');
    await joinChannel(apiEnginePtr, null);
    let agoraRTCClient = irisClient.agoraRTCClient;
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onUserOfflineEx');
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onLeaveChannelEx');
    await callIris(apiEnginePtr, 'RtcEngine_leaveChannel2', param);
    expect(rtcEngineImpl.stopAllEffects).toBeCalledTimes(
      agoraRTCClient!.remoteUsers.length
    );
    expect(irisRtcEngine.rtcEngineEventHandler.onUserOfflineEx).toBeCalledTimes(
      agoraRTCClient!.remoteUsers.length
    );
    expect(
      irisRtcEngine.rtcEngineEventHandler.onLeaveChannelEx
    ).toBeCalledTimes(1);
    expect(irisClient.release).toBeCalledTimes(1);
    expect(irisRtcEngine.irisClientManager.irisClientList.length).toBe(1);
    expect(irisClient.videoTrackPackage).toBeUndefined();
    expect(irisClient.agoraRTCClient).toBeUndefined();
    expect(irisClient.audioTrackPackages.length).toBe(0);
  });

  test('enableLocalAudio', async () => {
    let param = {
      enabled: true,
    };
    await callIris(apiEnginePtr, 'RtcEngine_enableLocalAudio', param);
    expect(irisRtcEngine.globalState.enabledLocalAudio).toBe(param.enabled);
  });

  test('enableLocalVideo', async () => {
    let param = {
      enabled: true,
    };
    await callIris(apiEnginePtr, 'RtcEngine_enableLocalVideo', param);
    expect(irisRtcEngine.globalState.enabledLocalVideo).toBe(param.enabled);
  });

  test('enableVideo', async () => {
    jest.spyOn(rtcEngineImpl, 'enableLocalVideo');
    jest.spyOn(rtcEngineImpl, 'muteLocalVideoStream');
    jest.spyOn(rtcEngineImpl, 'muteAllRemoteVideoStreams');

    await joinChannel(apiEnginePtr, null);

    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    expect(rtcEngineImpl.enableLocalVideo).toBeCalledWith(true);
    expect(rtcEngineImpl.muteLocalVideoStream).toBeCalledWith(false);
    expect(rtcEngineImpl.muteAllRemoteVideoStreams).toBeCalledWith(false);
  });
  test('disableVideo', async () => {
    jest.spyOn(rtcEngineImpl, 'enableLocalVideo');
    jest.spyOn(rtcEngineImpl, 'muteLocalVideoStream');
    jest.spyOn(rtcEngineImpl, 'muteAllRemoteVideoStreams');

    await joinChannel(apiEnginePtr, null);

    await callIris(apiEnginePtr, 'RtcEngine_disableVideo', null);
    expect(rtcEngineImpl.enableLocalVideo).toBeCalledWith(false);
    expect(rtcEngineImpl.muteLocalVideoStream).toBeCalledWith(true);
    expect(rtcEngineImpl.muteAllRemoteVideoStreams).toBeCalledWith(true);
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
    jest.spyOn(AgoraConsole, 'warn');

    await callIris(apiEnginePtr, 'RtcEngine_startPreview2', param);
    expect(AgoraConsole.warn).toBeCalledWith(
      'call enableVideo(true) before startPreview'
    );
    jest.clearAllMocks();
    await callIris(apiEnginePtr, 'RtcEngine_startPreview2', {
      sourceType: 100,
    });
    expect(AgoraConsole.warn).toBeCalledWith(
      'call enableVideo(true) before startPreview'
    );
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview2', param);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].track
        ?.isPlaying
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
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].track
        ?.isPlaying
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
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0].track
        ?.isPlaying
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
  test('startScreenCapture', async () => {
    let param = {
      captureParams: {
        captureAudio: true,
        captureVideo: false,
      },
    };
    let result = await callIrisWithoutCheck(
      apiEnginePtr,
      'RtcEngine_startScreenCapture',
      param
    );
    expect(result.code).toBe(NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK);
    let param2 = {
      captureParams: {
        captureAudio: true,
        captureVideo: true,
      },
    };
    await callIris(apiEnginePtr, 'RtcEngine_startScreenCapture', param2);
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
      'RtcEngine_startScreenCapture',
      param2
    );
    expect(result2.code).toBe(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED);
  });
  test('stopScreenCapture', async () => {
    jest.spyOn(rtcEngineImpl, 'stopScreenCapture2');
    await callIris(apiEnginePtr, 'RtcEngine_stopScreenCapture', null);
    expect(rtcEngineImpl.stopScreenCapture2).toBeCalledWith(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
    );
  });
  test('stopScreenCapture2', async () => {
    jest.spyOn(AgoraConsole, 'warn');
    let param = {
      sourceType: NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY,
    };
    await callIris(apiEnginePtr, 'RtcEngine_stopScreenCapture2', param);
    expect(AgoraConsole.warn).toBeCalledWith('screenCapture is not start');

    let param2 = {
      captureParams: {
        captureAudio: true,
        captureVideo: true,
      },
    };
    await callIris(apiEnginePtr, 'RtcEngine_startScreenCapture', param2);
    await callIris(apiEnginePtr, 'RtcEngine_stopScreenCapture2', param);
    expect(
      irisRtcEngine.irisClientManager.getLocalVideoTrackPackageBySourceType(
        NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_SCREEN_PRIMARY
      ).length
    ).toBe(0);
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
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    await joinChannel(apiEnginePtr, null);
    expect(
      irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
      ).length
    ).toBe(1);
    await callIris(apiEnginePtr, 'RtcEngine_leaveChannel');
    await callIris(apiEnginePtr, 'RtcEngine_disableAudio', null);

    await joinChannel(apiEnginePtr, null);
    expect(
      irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
      ).length
    ).toBe(1);
    await joinChannel(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    expect(
      irisRtcEngine.irisClientManager.getLocalAudioTrackPackageBySourceType(
        IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary
      ).length
    ).toBe(1);
  });
  test('muteAllRemoteAudioStreams', async () => {
    jest.spyOn(rtcEngineImpl, 'muteAllRemoteAudioStreams');
    await joinChannel(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableAudio', null);
    let remoteUsers = irisRtcEngine.irisClientManager.irisClientList[0]
      ?.agoraRTCClient!.remoteUsers;
    expect(remoteUsers[0].audioTrack?.isPlaying).toBe(true);

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
    let remoteUsers = irisRtcEngine.irisClientManager.irisClientList[0]
      ?.agoraRTCClient!.remoteUsers;
    expect(remoteUsers[0].audioTrack?.isPlaying).toBe(true);

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

  test('muteLocalVideoStream', async () => {
    jest.spyOn(rtcEngineImpl, 'muteLocalVideoStream');
    await joinChannel(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    await callIris(apiEnginePtr, 'RtcEngine_startPreview', null);
    let localVideoTrackPackage = irisRtcEngine.irisClientManager.getLocalVideoTrackPackageBySourceType(
      NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY
    );
    expect(localVideoTrackPackage.length).toBe(1);

    jest.spyOn(
      irisRtcEngine.irisClientManager.irisClientObserver,
      'notifyLocal'
    );

    await callIris(apiEnginePtr, 'RtcEngine_muteLocalVideoStream', {
      mute: true,
    });
    expect(
      irisRtcEngine.irisClientManager.irisClientObserver.notifyLocal
    ).toHaveBeenNthCalledWith(
      1,
      NotifyType.UNPUBLISH_TRACK,
      irisRtcEngine.irisClientManager.localVideoTrackPackages
    );

    await callIris(apiEnginePtr, 'RtcEngine_muteLocalVideoStream', {
      mute: false,
    });
    expect(
      irisRtcEngine.irisClientManager.irisClientObserver.notifyLocal
    ).toHaveBeenNthCalledWith(
      2,
      NotifyType.PUBLISH_TRACK,
      irisRtcEngine.irisClientManager.localVideoTrackPackages
    );
  });
  test('muteAllRemoteVideoStreams', async () => {
    jest.spyOn(rtcEngineImpl, 'muteAllRemoteVideoStreams');
    await joinChannel(apiEnginePtr, null);
    await setupRemoteVideoEx(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    let remoteUsers = irisRtcEngine.irisClientManager.irisClientList[0]
      ?.agoraRTCClient!.remoteUsers;
    expect(remoteUsers[0].videoTrack?.isPlaying).toBe(true);

    await callIris(apiEnginePtr, 'RtcEngine_muteAllRemoteVideoStreams', {
      mute: true,
    });
    expect(remoteUsers[0].videoTrack).toBeUndefined();
    await callIris(apiEnginePtr, 'RtcEngine_muteAllRemoteVideoStreams', {
      mute: false,
    });
    expect(remoteUsers[0].videoTrack).not.toBeUndefined();
  });
  test('muteRemoteVideoStream', async () => {
    jest.spyOn(rtcEngineImpl, 'muteRemoteVideoStream');
    await joinChannel(apiEnginePtr, null);
    await setupRemoteVideoEx(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_enableVideo', null);
    let remoteUsers = irisRtcEngine.irisClientManager.irisClientList[0]
      ?.agoraRTCClient!.remoteUsers;
    expect(remoteUsers[0].videoTrack?.isPlaying).toBe(true);

    await callIris(apiEnginePtr, 'RtcEngine_muteRemoteVideoStream', {
      mute: true,
      uid: TEST_REMOTE_UID,
    });
    expect(remoteUsers[0].videoTrack).toBeUndefined();
    await callIris(apiEnginePtr, 'RtcEngine_muteRemoteVideoStream', {
      mute: false,
      uid: TEST_REMOTE_UID,
    });
    expect(remoteUsers[0].videoTrack).not.toBeUndefined();
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
  test('joinChannelWithUserAccount', async () => {
    jest.spyOn(rtcEngineImpl, 'joinChannelWithUserAccount2');

    expect(irisRtcEngine.irisIntervalList.length == 0).toBeTruthy();
    await joinChannelWithUserAccount(apiEnginePtr);

    expect(rtcEngineImpl.joinChannelWithUserAccount2).toBeCalledWith(
      null,
      FAKE_CHANNEL_NAME,
      TEST_STRING_UID,
      irisRtcEngine.irisClientManager.getIrisClient().irisClientState
    );
    expect(irisRtcEngine.irisIntervalList.length == 1).toBeTruthy();
  });

  test('joinChannelWithUserAccount2', async () => {
    jest.spyOn(irisRtcEngine.rtcEngineEventHandler, 'onJoinChannelSuccessEx');

    await joinChannelWithUserAccount(apiEnginePtr);
    let userInfoList = irisRtcEngine.irisClientManager.userInfoList;
    let irisClient = irisRtcEngine.irisClientManager.getIrisClient();

    expect(irisClient.irisClientState.token).toBe(null);
    expect(irisClient.agoraRTCClient?.channelName).toBe(FAKE_CHANNEL_NAME);
    expect(irisClient.connection.channelId).toBe(
      irisClient.agoraRTCClient?.channelName
    );
    expect(
      irisRtcEngine.rtcEngineEventHandler.onJoinChannelSuccessEx
    ).toBeCalledTimes(1);
  });

  test('getUserInfoByUserAccount', async () => {
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
      'RtcEngine_getUserInfoByUserAccount',
      {
        userAccount: TEST_STRING_UID,
      }
    );
    expect(JSON.parse(result.data).userInfo.userAccount).toBe(TEST_STRING_UID);
  });

  test('getUserInfoByUid', async () => {
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
    let result = await callIris(apiEnginePtr, 'RtcEngine_getUserInfoByUid', {
      uid: userInfoList[0].uid,
    });
    expect(JSON.parse(result.data).userInfo.uid).toBe(userInfoList[0].uid);
  });
  test('setLocalRenderMode', async () => {
    let param = {
      renderMode: NATIVE_RTC.RENDER_MODE_TYPE.RENDER_MODE_FIT,
      mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED,
    };
    await setupLocalVideo(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_setLocalRenderMode', param);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0]
        .videoPlayerConfig.fit
    ).toBe(AgoraTranslate.NATIVE_RTC_RENDER_MODE_TYPE2Fit(param.renderMode));
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0]
        .videoPlayerConfig.mirror
    ).toBe(true);
  });
  test('setLocalRenderMode2', async () => {
    let param = {
      renderMode: NATIVE_RTC.RENDER_MODE_TYPE.RENDER_MODE_FIT,
    };
    await setupLocalVideo(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_setLocalRenderMode2', param);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0]
        .videoPlayerConfig.fit
    ).toBe(AgoraTranslate.NATIVE_RTC_RENDER_MODE_TYPE2Fit(param.renderMode));
  });
  test('setLocalVideoMirrorMode', async () => {
    let param = {
      mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED,
    };
    await setupLocalVideo(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_setLocalVideoMirrorMode', param);
    expect(
      irisRtcEngine.irisClientManager.localVideoTrackPackages[0]
        .videoPlayerConfig.mirror
    ).toBe(true);
  });
  test('setRemoteRenderMode', async () => {
    let param = {
      uid: TEST_REMOTE_UID,
      renderMode: NATIVE_RTC.RENDER_MODE_TYPE.RENDER_MODE_FIT,
      mirrorMode: NATIVE_RTC.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED,
    };
    await setupLocalVideo(apiEnginePtr, null);
    await joinChannel(apiEnginePtr, null);
    await callIris(apiEnginePtr, 'RtcEngine_setRemoteRenderMode', param);
    expect(
      irisRtcEngine.irisClientManager.remoteUserPackages[0].videoPlayerConfig
        .fit
    ).toBe(AgoraTranslate.NATIVE_RTC_RENDER_MODE_TYPE2Fit(param.renderMode));
    expect(
      irisRtcEngine.irisClientManager.remoteUserPackages[0].videoPlayerConfig
        .mirror
    ).toBe(true);
  });
  test('adjustPlaybackSignalVolume', async () => {
    let param = {
      volume: 300,
    };
    AgoraRTCMock = irisRtcEngine.globalState.AgoraRTC;
    await joinChannel(apiEnginePtr, null);
    let remoteAudioTrack = irisRtcEngine.irisClientManager.getIrisClient()
      .agoraRTCClient?.remoteUsers[0].audioTrack;
    jest.spyOn(remoteAudioTrack!, 'setVolume');
    await callIris(apiEnginePtr, 'RtcEngine_adjustPlaybackSignalVolume', param);
    expect(remoteAudioTrack!.setVolume).toBeCalledWith(
      AgoraTranslate.NATIVE_RTC_Volume2WebVolume(param.volume)
    );
  });
  test('adjustRecordingSignalVolume', async () => {
    let param = {
      volume: 300,
    };
    await joinChannel(apiEnginePtr, null);
    let localAudioTrack = irisRtcEngine.irisClientManager
      .localAudioTrackPackages[0].track as ILocalAudioTrack;
    jest.spyOn(localAudioTrack!, 'setVolume');
    await callIris(
      apiEnginePtr,
      'RtcEngine_adjustRecordingSignalVolume',
      param
    );
    expect(localAudioTrack!.setVolume).toBeCalledWith(
      AgoraTranslate.NATIVE_RTC_Volume2WebVolume(param.volume)
    );
  });
  test('adjustUserPlaybackSignalVolume', async () => {
    let param = {
      volume: 300,
      uid: TEST_REMOTE_UID,
    };
    await joinChannel(apiEnginePtr, null);
    let remoteAudioTrack = irisRtcEngine.irisClientManager.getIrisClientByConnection(
      irisRtcEngine.irisClientManager.remoteUserPackages[0].connection
    ).agoraRTCClient?.remoteUsers[0].audioTrack;
    jest.spyOn(remoteAudioTrack!, 'setVolume');
    await callIris(
      apiEnginePtr,
      'RtcEngine_adjustUserPlaybackSignalVolume',
      param
    );
    expect(remoteAudioTrack!.setVolume).toBeCalledWith(
      AgoraTranslate.NATIVE_RTC_Volume2WebVolume(param.volume)
    );
  });
});
