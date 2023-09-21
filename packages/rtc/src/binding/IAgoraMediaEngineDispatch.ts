/// Generated by terra, DO NOT MODIFY BY HAND.

import { ApiParam, CallApiReturnType } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { callApiBufferExtension } from '../extensions/CallApiBufferExtensions';
import { IMediaEngineImpl } from '../impl/IAgoraMediaEngineImpl';

export class IMediaEngineDispatch {
  _impl: IMediaEngineImpl;

  constructor(engine: IrisRtcEngine) {
    this._impl = new IMediaEngineImpl(engine);
  }
  registerAudioFrameObserver(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let observer = obj.observer;
    if (observer === undefined) throw 'observer is undefined';

    return this._impl.registerAudioFrameObserver(observer);
  }

  registerVideoFrameObserver(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let observer = obj.observer;
    if (observer === undefined) throw 'observer is undefined';

    return this._impl.registerVideoFrameObserver(observer);
  }

  registerVideoEncodedFrameObserver(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let observer = obj.observer;
    if (observer === undefined) throw 'observer is undefined';

    return this._impl.registerVideoEncodedFrameObserver(observer);
  }

  pushAudioFrame(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let frame = obj.frame;
    if (frame === undefined) throw 'frame is undefined';
    let trackId = obj.trackId;
    if (trackId === undefined) throw 'trackId is undefined';

    return this._impl.pushAudioFrame(frame, trackId);
  }

  pullAudioFrame(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let frame = obj.frame;
    if (frame === undefined) throw 'frame is undefined';

    return this._impl.pullAudioFrame(frame);
  }

  setExternalVideoSource(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let enabled = obj.enabled;
    if (enabled === undefined) throw 'enabled is undefined';
    let useTexture = obj.useTexture;
    if (useTexture === undefined) throw 'useTexture is undefined';
    let sourceType = obj.sourceType;
    if (sourceType === undefined) throw 'sourceType is undefined';
    let encodedVideoOption = obj.encodedVideoOption;
    if (encodedVideoOption === undefined)
      throw 'encodedVideoOption is undefined';

    return this._impl.setExternalVideoSource(
      enabled,
      useTexture,
      sourceType,
      encodedVideoOption
    );
  }

  setExternalAudioSource(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let enabled = obj.enabled;
    if (enabled === undefined) throw 'enabled is undefined';
    let sampleRate = obj.sampleRate;
    if (sampleRate === undefined) throw 'sampleRate is undefined';
    let channels = obj.channels;
    if (channels === undefined) throw 'channels is undefined';
    let localPlayback = obj.localPlayback;
    if (localPlayback === undefined) throw 'localPlayback is undefined';
    let publish = obj.publish;
    if (publish === undefined) throw 'publish is undefined';

    return this._impl.setExternalAudioSource(
      enabled,
      sampleRate,
      channels,
      localPlayback,
      publish
    );
  }

  createCustomAudioTrack(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let trackType = obj.trackType;
    if (trackType === undefined) throw 'trackType is undefined';
    let config = obj.config;
    if (config === undefined) throw 'config is undefined';

    return this._impl.createCustomAudioTrack(trackType, config);
  }

  destroyCustomAudioTrack(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let trackId = obj.trackId;
    if (trackId === undefined) throw 'trackId is undefined';

    return this._impl.destroyCustomAudioTrack(trackId);
  }

  setExternalAudioSink(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let enabled = obj.enabled;
    if (enabled === undefined) throw 'enabled is undefined';
    let sampleRate = obj.sampleRate;
    if (sampleRate === undefined) throw 'sampleRate is undefined';
    let channels = obj.channels;
    if (channels === undefined) throw 'channels is undefined';

    return this._impl.setExternalAudioSink(enabled, sampleRate, channels);
  }

  enableCustomAudioLocalPlayback(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let trackId = obj.trackId;
    if (trackId === undefined) throw 'trackId is undefined';
    let enabled = obj.enabled;
    if (enabled === undefined) throw 'enabled is undefined';

    return this._impl.enableCustomAudioLocalPlayback(trackId, enabled);
  }

  pushVideoFrame(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    obj = callApiBufferExtension(apiParam.event, obj, apiParam.buffer);
    let frame = obj.frame;
    if (frame === undefined) throw 'frame is undefined';
    let videoTrackId = obj.videoTrackId;
    if (videoTrackId === undefined) throw 'videoTrackId is undefined';

    return this._impl.pushVideoFrame(frame, videoTrackId);
  }

  pushEncodedVideoImage(apiParam: ApiParam): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let imageBuffer = obj.imageBuffer;
    if (imageBuffer === undefined) throw 'imageBuffer is undefined';
    let length = obj.length;
    if (length === undefined) throw 'length is undefined';
    let videoEncodedFrameInfo = obj.videoEncodedFrameInfo;
    if (videoEncodedFrameInfo === undefined)
      throw 'videoEncodedFrameInfo is undefined';
    let videoTrackId = obj.videoTrackId;
    if (videoTrackId === undefined) throw 'videoTrackId is undefined';

    return this._impl.pushEncodedVideoImage(
      imageBuffer,
      length,
      videoEncodedFrameInfo,
      videoTrackId
    );
  }

  release(): CallApiReturnType {
    return this._impl.release();
  }
}
