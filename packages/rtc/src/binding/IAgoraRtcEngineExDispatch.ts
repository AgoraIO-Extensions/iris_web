/// Generated by terra, DO NOT MODIFY BY HAND.

import { ERROR_CODE_TYPE, IRtcEngineEx } from '@iris/native-rtc';
import { ApiParam, CallApiReturnType } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { callApiBufferExtension } from '../extensions/CallApiBufferExtensions';
import { IRtcEngineExImpl } from '../impl/IAgoraRtcEngineExImpl';
import { AgoraConsole } from '../util/AgoraConsole';

import { IRtcEngineDispatch } from './IAgoraRtcEngineDispatch';

export class IRtcEngineExDispatch extends IRtcEngineDispatch
  implements IRtcEngineEx {
  // @ts-ignore
  _impl: IRtcEngineExImpl;
  _engine: IrisRtcEngine = null;

  constructor(engine: IrisRtcEngine) {
    super(engine);
    this._impl = new IRtcEngineExImpl(engine);
    this._engine = engine;
  }
  // @ts-ignore
  joinChannelEx_a3cd08c(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let token = obj.token;
    if (token === undefined) {
      AgoraConsole.error('token is undefined');
      throw 'token is undefined';
    }
    let connection = obj.connection;
    if (connection === undefined) {
      AgoraConsole.error('connection is undefined');
      throw 'connection is undefined';
    }
    let options = obj.options;
    if (options === undefined) {
      AgoraConsole.error('options is undefined');
      throw 'options is undefined';
    }

    return this._impl.joinChannelEx_a3cd08c(token, connection, options);
  }

  // @ts-ignore
  leaveChannelEx_c81e1a4(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let connection = obj.connection;
    if (connection === undefined) {
      AgoraConsole.error('connection is undefined');
      throw 'connection is undefined';
    }

    return this._impl.leaveChannelEx_c81e1a4(connection);
  }

  // @ts-ignore
  leaveChannelEx_b03ee9a(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_leaveChannelEx_b03ee9a not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  updateChannelMediaOptionsEx_457bb35(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let options = obj.options;
    if (options === undefined) {
      AgoraConsole.error('options is undefined');
      throw 'options is undefined';
    }
    let connection = obj.connection;
    if (connection === undefined) {
      AgoraConsole.error('connection is undefined');
      throw 'connection is undefined';
    }

    return this._impl.updateChannelMediaOptionsEx_457bb35(options, connection);
  }

  // @ts-ignore
  setVideoEncoderConfigurationEx_4670c1e(
    apiParam: ApiParam
  ): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_setVideoEncoderConfigurationEx_4670c1e not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  setupRemoteVideoEx_522a409(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let canvas = obj.canvas;
    if (canvas === undefined) {
      AgoraConsole.error('canvas is undefined');
      throw 'canvas is undefined';
    }
    let connection = obj.connection;
    if (connection === undefined) {
      AgoraConsole.error('connection is undefined');
      throw 'connection is undefined';
    }

    return this._impl.setupRemoteVideoEx_522a409(canvas, connection);
  }

  // @ts-ignore
  muteRemoteAudioStreamEx_6d93082(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let uid = obj.uid;
    if (uid === undefined) {
      AgoraConsole.error('uid is undefined');
      throw 'uid is undefined';
    }
    let mute = obj.mute;
    if (mute === undefined) {
      AgoraConsole.error('mute is undefined');
      throw 'mute is undefined';
    }
    let connection = obj.connection;
    if (connection === undefined) {
      AgoraConsole.error('connection is undefined');
      throw 'connection is undefined';
    }

    return this._impl.muteRemoteAudioStreamEx_6d93082(uid, mute, connection);
  }

  // @ts-ignore
  muteRemoteVideoStreamEx_6d93082(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let uid = obj.uid;
    if (uid === undefined) {
      AgoraConsole.error('uid is undefined');
      throw 'uid is undefined';
    }
    let mute = obj.mute;
    if (mute === undefined) {
      AgoraConsole.error('mute is undefined');
      throw 'mute is undefined';
    }
    let connection = obj.connection;
    if (connection === undefined) {
      AgoraConsole.error('connection is undefined');
      throw 'connection is undefined';
    }

    return this._impl.muteRemoteVideoStreamEx_6d93082(uid, mute, connection);
  }

  // @ts-ignore
  setRemoteVideoStreamTypeEx_01dc428(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_setRemoteVideoStreamTypeEx_01dc428 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  muteLocalAudioStreamEx_3cf17a4(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let mute = obj.mute;
    if (mute === undefined) {
      AgoraConsole.error('mute is undefined');
      throw 'mute is undefined';
    }
    let connection = obj.connection;
    if (connection === undefined) {
      AgoraConsole.error('connection is undefined');
      throw 'connection is undefined';
    }

    return this._impl.muteLocalAudioStreamEx_3cf17a4(mute, connection);
  }

  // @ts-ignore
  muteLocalVideoStreamEx_3cf17a4(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let mute = obj.mute;
    if (mute === undefined) {
      AgoraConsole.error('mute is undefined');
      throw 'mute is undefined';
    }
    let connection = obj.connection;
    if (connection === undefined) {
      AgoraConsole.error('connection is undefined');
      throw 'connection is undefined';
    }

    return this._impl.muteLocalVideoStreamEx_3cf17a4(mute, connection);
  }

  // @ts-ignore
  muteAllRemoteAudioStreamsEx_3cf17a4(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let mute = obj.mute;
    if (mute === undefined) {
      AgoraConsole.error('mute is undefined');
      throw 'mute is undefined';
    }
    let connection = obj.connection;
    if (connection === undefined) {
      AgoraConsole.error('connection is undefined');
      throw 'connection is undefined';
    }

    return this._impl.muteAllRemoteAudioStreamsEx_3cf17a4(mute, connection);
  }

  // @ts-ignore
  muteAllRemoteVideoStreamsEx_3cf17a4(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let mute = obj.mute;
    if (mute === undefined) {
      AgoraConsole.error('mute is undefined');
      throw 'mute is undefined';
    }
    let connection = obj.connection;
    if (connection === undefined) {
      AgoraConsole.error('connection is undefined');
      throw 'connection is undefined';
    }

    return this._impl.muteAllRemoteVideoStreamsEx_3cf17a4(mute, connection);
  }

  // @ts-ignore
  setSubscribeAudioBlocklistEx_9f1e85c(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_setSubscribeAudioBlocklistEx_9f1e85c not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  setSubscribeAudioAllowlistEx_9f1e85c(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_setSubscribeAudioAllowlistEx_9f1e85c not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  setSubscribeVideoBlocklistEx_9f1e85c(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_setSubscribeVideoBlocklistEx_9f1e85c not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  setSubscribeVideoAllowlistEx_9f1e85c(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_setSubscribeVideoAllowlistEx_9f1e85c not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  setRemoteVideoSubscriptionOptionsEx_3cd36bc(
    apiParam: ApiParam
  ): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_setRemoteVideoSubscriptionOptionsEx_3cd36bc not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  setRemoteVoicePositionEx_fc0471c(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_setRemoteVoicePositionEx_fc0471c not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  setRemoteUserSpatialAudioParamsEx_40ca9fb(
    apiParam: ApiParam
  ): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_setRemoteUserSpatialAudioParamsEx_40ca9fb not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  setRemoteRenderModeEx_a72fe4e(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_setRemoteRenderModeEx_a72fe4e not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  enableLoopbackRecordingEx_4f41542(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_enableLoopbackRecordingEx_4f41542 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  adjustRecordingSignalVolumeEx_e84d10e(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_adjustRecordingSignalVolumeEx_e84d10e not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  muteRecordingSignalEx_3cf17a4(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_muteRecordingSignalEx_3cf17a4 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  adjustUserPlaybackSignalVolumeEx_adbd29c(
    apiParam: ApiParam
  ): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_adjustUserPlaybackSignalVolumeEx_adbd29c not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  getConnectionStateEx_c81e1a4(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_getConnectionStateEx_c81e1a4 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  enableEncryptionEx_10cd872(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_enableEncryptionEx_10cd872 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  createDataStreamEx_1767167(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_createDataStreamEx_1767167 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  createDataStreamEx_9f641b6(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let config = obj.config;
    if (config === undefined) {
      AgoraConsole.error('config is undefined');
      throw 'config is undefined';
    }
    let connection = obj.connection;
    if (connection === undefined) {
      AgoraConsole.error('connection is undefined');
      throw 'connection is undefined';
    }

    return this._impl.createDataStreamEx_9f641b6(config, connection);
  }

  // @ts-ignore
  sendStreamMessageEx_0c34857(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    obj = callApiBufferExtension(apiParam.event, obj, apiParam.buffer);
    let streamId = obj.streamId;
    if (streamId === undefined) {
      AgoraConsole.error('streamId is undefined');
      throw 'streamId is undefined';
    }
    let data = obj.data;
    if (data === undefined) {
      AgoraConsole.error('data is undefined');
      throw 'data is undefined';
    }
    let length = obj.length;
    if (length === undefined) {
      AgoraConsole.error('length is undefined');
      throw 'length is undefined';
    }
    let connection = obj.connection;
    if (connection === undefined) {
      AgoraConsole.error('connection is undefined');
      throw 'connection is undefined';
    }

    return this._impl.sendStreamMessageEx_0c34857(
      streamId,
      data,
      length,
      connection
    );
  }

  // @ts-ignore
  addVideoWatermarkEx_ad7daa3(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_addVideoWatermarkEx_ad7daa3 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  clearVideoWatermarkEx_c81e1a4(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_clearVideoWatermarkEx_c81e1a4 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  sendCustomReportMessageEx_833b8a5(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_sendCustomReportMessageEx_833b8a5 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  enableAudioVolumeIndicationEx_ac84f2a(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_enableAudioVolumeIndicationEx_ac84f2a not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  startRtmpStreamWithoutTranscodingEx_e405325(
    apiParam: ApiParam
  ): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_startRtmpStreamWithoutTranscodingEx_e405325 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  startRtmpStreamWithTranscodingEx_ab121b5(
    apiParam: ApiParam
  ): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_startRtmpStreamWithTranscodingEx_ab121b5 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  updateRtmpTranscodingEx_77f3ee8(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_updateRtmpTranscodingEx_77f3ee8 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  stopRtmpStreamEx_e405325(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_stopRtmpStreamEx_e405325 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  startOrUpdateChannelMediaRelayEx_4ad39a8(
    apiParam: ApiParam
  ): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_startOrUpdateChannelMediaRelayEx_4ad39a8 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  stopChannelMediaRelayEx_c81e1a4(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_stopChannelMediaRelayEx_c81e1a4 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  pauseAllChannelMediaRelayEx_c81e1a4(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_pauseAllChannelMediaRelayEx_c81e1a4 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  resumeAllChannelMediaRelayEx_c81e1a4(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_resumeAllChannelMediaRelayEx_c81e1a4 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  getUserInfoByUserAccountEx_ca39cc6(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_getUserInfoByUserAccountEx_ca39cc6 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  getUserInfoByUidEx_1e78da1(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_getUserInfoByUidEx_1e78da1 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  enableDualStreamModeEx_4b18f41(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_enableDualStreamModeEx_4b18f41 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  setDualStreamModeEx_622d0f3(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_setDualStreamModeEx_622d0f3 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  setHighPriorityUserListEx_8736b5c(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_setHighPriorityUserListEx_8736b5c not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  takeSnapshotEx_de1c015(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_takeSnapshotEx_de1c015 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  enableContentInspectEx_c4e7f69(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_enableContentInspectEx_c4e7f69 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  startMediaRenderingTracingEx_c81e1a4(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_startMediaRenderingTracingEx_c81e1a4 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  setParametersEx_8225ea3(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'RtcEngineEx_setParametersEx_8225ea3 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }
}
