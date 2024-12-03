/// Generated by terra, DO NOT MODIFY BY HAND.

import { ERROR_CODE_TYPE, IMediaEngine } from '@iris/native-rtc';
import { ApiParam, CallApiReturnType } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { callApiBufferExtension } from '../extensions/CallApiBufferExtensions';
import { IMediaEngineImpl } from '../impl/IAgoraMediaEngineImpl';
import { AgoraConsole } from '../util/AgoraConsole';

export class IMediaEngineDispatch implements IMediaEngine {
  // @ts-ignore
  _impl: IMediaEngineImpl;
  _engine: IrisRtcEngine;

  constructor(engine: IrisRtcEngine) {
    this._impl = new IMediaEngineImpl(engine);
    this._engine = engine;
  }
  // @ts-ignore
  registerAudioFrameObserver_d873a64(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_registerAudioFrameObserver_d873a64 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  registerVideoFrameObserver_2cc0ef1(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_registerVideoFrameObserver_2cc0ef1 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  registerVideoEncodedFrameObserver_d45d579(
    apiParam: ApiParam
  ): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_registerVideoEncodedFrameObserver_d45d579 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  registerFaceInfoObserver_0303ed6(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_registerFaceInfoObserver_0303ed6 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  pushAudioFrame_c71f4ab(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_pushAudioFrame_c71f4ab not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  pullAudioFrame_2c74a9c(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_pullAudioFrame_2c74a9c not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  setExternalVideoSource_fff99b6(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let enabled = obj.enabled;
    if (enabled === undefined) {
      AgoraConsole.error('enabled is undefined');
      throw 'enabled is undefined';
    }
    let useTexture = obj.useTexture;
    if (useTexture === undefined) {
      AgoraConsole.error('useTexture is undefined');
      throw 'useTexture is undefined';
    }
    let sourceType = obj.sourceType;
    if (sourceType === undefined) {
      AgoraConsole.error('sourceType is undefined');
      throw 'sourceType is undefined';
    }
    let encodedVideoOption = obj.encodedVideoOption;
    if (encodedVideoOption === undefined) {
      AgoraConsole.error('encodedVideoOption is undefined');
      throw 'encodedVideoOption is undefined';
    }

    return this._impl.setExternalVideoSource_fff99b6(
      enabled,
      useTexture,
      sourceType,
      encodedVideoOption
    );
  }

  // @ts-ignore
  setExternalRemoteEglContext_f337cbf(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_setExternalRemoteEglContext_f337cbf not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  setExternalAudioSource_e6538be(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_setExternalAudioSource_e6538be not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  createCustomAudioTrack_5a0bf1a(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_createCustomAudioTrack_5a0bf1a not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  destroyCustomAudioTrack_6178b5d(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_destroyCustomAudioTrack_6178b5d not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  setExternalAudioSink_d275ce0(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_setExternalAudioSink_d275ce0 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  enableCustomAudioLocalPlayback_5f38e8a(
    apiParam: ApiParam
  ): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_enableCustomAudioLocalPlayback_5f38e8a not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  pushVideoFrame_4e544e2(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    obj = callApiBufferExtension(apiParam.event, obj, apiParam.buffer);
    let frame = obj.frame;
    if (frame === undefined) {
      AgoraConsole.error('frame is undefined');
      throw 'frame is undefined';
    }
    let videoTrackId = obj.videoTrackId;
    if (videoTrackId === undefined) {
      AgoraConsole.error('videoTrackId is undefined');
      throw 'videoTrackId is undefined';
    }

    return this._impl.pushVideoFrame_4e544e2(frame, videoTrackId);
  }

  // @ts-ignore
  pushEncodedVideoImage_e71452b(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_pushEncodedVideoImage_e71452b not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  addVideoFrameRenderer_2cc0ef1(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_addVideoFrameRenderer_2cc0ef1 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  removeVideoFrameRenderer_2cc0ef1(apiParam: ApiParam): CallApiReturnType {
    AgoraConsole.warn(
      'MediaEngine_removeVideoFrameRenderer_2cc0ef1 not supported in this platform!'
    );
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  // @ts-ignore
  release(): CallApiReturnType {
    AgoraConsole.warn('MediaEngine_release not supported in this platform!');
    return this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }
}
