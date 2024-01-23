import {
  FAKE_CHANNEL_NAME,
  FakeLocalAudioTrack,
  FakeLocalVideoTrack,
  dispatchRTCEvent,
} from '@agoraio-extensions/agora-rtc-sdk-ng-fake';
import {
  CHANNEL_PROFILE_TYPE,
  CLIENT_ROLE_TYPE,
  ChannelMediaOptions,
  ERROR_CODE_TYPE,
  RtcConnection,
  VIDEO_SOURCE_TYPE,
  VideoCanvas,
} from '@iris/native-rtc';
import { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';
import { IrisApiEngine, IrisCore } from 'iris-web-core';
import { AgoraConsole, IrisRtcEngine } from 'src';

export const TEST_UID = 123;
export const TEST_REMOTE_UID = 456;

export async function callIris(
  apiEnginePtr: IrisApiEngine,
  apiName: string,
  options: any = null
) {
  let result = await IrisCore.callIrisApi(
    apiEnginePtr,
    new IrisCore.EventParam(
      apiName,
      JSON.stringify(options),
      0,
      '',
      ['test'],
      [],
      1
    )
  );
  expect(result.code).toBe(0);
  return result;
}

export async function callIrisWithoutCheck(
  apiEnginePtr: IrisApiEngine,
  apiName: string,
  options: any = null
) {
  return await IrisCore.callIrisApi(
    apiEnginePtr,
    new IrisCore.EventParam(
      apiName,
      JSON.stringify(options),
      0,
      '',
      ['test'],
      [],
      1
    )
  );
}

export function triggerCallback(
  irisRtcEngine: IrisRtcEngine,
  callbackName: string,
  parameters: any
) {
  let { ...rest } = parameters;
  const values = Object.values({ ...rest });

  irisRtcEngine.rtcEngineEventHandler[callbackName](...values);
}

export async function joinChannel(apiEnginePtr: IrisApiEngine, options?: any) {
  if (!options) {
    options = {};
  }
  if (!options?.token) {
    options.token = null;
  }
  if (!options?.channelId) {
    options.channelId = FAKE_CHANNEL_NAME;
  }
  if (!options?.uid) {
    options.uid = TEST_UID;
  }
  if (!options?.info) {
    options.info = null;
  }
  if (!options?.options) {
    options.options = {
      channelProfile: CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_LIVE_BROADCASTING,
      clientRoleType: CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
  }
  let result = await callIris(
    apiEnginePtr,
    'RtcEngine_joinChannel_f097389',
    options
  );
  expect(result.code).toBe(0);
  let irisRtcEngine = apiEnginePtr['apiInterceptors'][0];
  let agoraRTCClient =
    irisRtcEngine.irisClientManager.irisClientList[0].agoraRTCClient;
  let user = [
    {
      uid: TEST_REMOTE_UID,
      hasAudio: true,
      hasVideo: true,
      audioTrack: FakeLocalAudioTrack.create(),
      videoTrack: FakeLocalVideoTrack.create(),
    } as IAgoraRTCRemoteUser,
  ];
  // triggerCallback(irisRtcEngine, 'onEventUserJoined', user);
  dispatchRTCEvent(agoraRTCClient, 'user-joined', user[0]);
  agoraRTCClient.remoteUsers = user;
}

export async function joinChannelEx(
  apiEnginePtr: IrisApiEngine
): Promise<RtcConnection> {
  let param = {
    token: '1234',
    connection: {
      channelId: FAKE_CHANNEL_NAME,
      localUid: TEST_UID,
    },
    options: {
      channelProfile: CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_LIVE_BROADCASTING,
      clientRoleType: CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    },
  };
  let result = await callIris(
    apiEnginePtr,
    'RtcEngineEx_joinChannelEx_a3cd08c',
    param
  );
  expect(result.code).toBe(0);
  let irisRtcEngine = apiEnginePtr['apiInterceptors'][0];
  let irisClient = irisRtcEngine.irisClientManager.getIrisClientByConnection(
    param.connection
  );
  let agoraRTCClient = irisClient.agoraRTCClient;
  let user = [
    {
      uid: TEST_REMOTE_UID,
      hasAudio: true,
      hasVideo: true,
      audioTrack: FakeLocalAudioTrack.create(),
      videoTrack: FakeLocalVideoTrack.create(),
    } as IAgoraRTCRemoteUser,
  ];
  // triggerCallback(irisRtcEngine, 'onEventUserJoined', user);
  dispatchRTCEvent(agoraRTCClient, 'user-joined', user[0]);
  agoraRTCClient.remoteUsers = user;
  irisClient.connection.localUid = agoraRTCClient.uid;
  return irisClient.connection;
}

export async function setupLocalVideo(
  apiEnginePtr: IrisApiEngine,
  options?: any
) {
  if (!options) {
    options = {};
  }
  if (!options?.canvas) {
    options.canvas = {
      view: 'test-view',
      sourceType: VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY,
    };
  }
  let result = await callIris(
    apiEnginePtr,
    'RtcEngine_setupLocalVideo_acc9c38',
    options
  );
  expect(result.code).toBe(0);
}

export async function setupRemoteVideo(
  apiEnginePtr: IrisApiEngine,
  options?: any
) {
  if (!options) {
    options = {};
  }
  if (!options?.canvas) {
    options.canvas = {
      uid: TEST_REMOTE_UID,
      view: 'test-view',
      sourceType: VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY,
    };
  }
  if (!options?.connection) {
    options.connection = {
      channelId: FAKE_CHANNEL_NAME,
      localUid: TEST_REMOTE_UID,
    };
  }
  let result = await callIris(
    apiEnginePtr,
    'RtcEngineEx_setupRemoteVideoEx_522a409',
    options
  );
  expect(result.code).toBe(0);
}
