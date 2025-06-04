import * as NATIVE_RTC from '@iris/native-rtc';
import {
  ICameraVideoTrack,
  ILocalAudioTrack,
  ILocalTrack,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  ITrack,
  VideoPlayerConfig,
} from 'agora-rtc-sdk-ng';
import { CallIrisApiResult } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';

import { AgoraConsole } from '../util/AgoraConsole';
import { AgoraTranslate } from '../util/AgoraTranslate';

export class TrackHelper {
  _engine: IrisRtcEngine;
  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  public play(
    track: ITrack,
    element?: string | HTMLElement,
    config?: VideoPlayerConfig
  ): void {
    try {
      if (track.trackMediaType === 'video' && config) {
        (track as ICameraVideoTrack)?.play(element!, config);
      } else {
        track?.play(element);
      }
    } catch (e) {
      AgoraConsole.error(e);
      Promise.resolve(
        new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
      );
      throw e;
    }
  }

  public stop(track: ITrack): void {
    try {
      track?.stop();
    } catch (e) {
      AgoraConsole.error(e);
      Promise.resolve(
        new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
      );
      throw e;
    }
  }

  public async setEnabled(track: ILocalTrack, enabled: boolean): Promise<void> {
    try {
      if (track && !track.muted) {
        await track?.setEnabled(enabled);
      }
    } catch (e) {
      AgoraConsole.error(e);
      Promise.resolve(
        new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
      );
      throw e;
    }
  }
  public async setMuted(track: ILocalTrack, enabled: boolean): Promise<void> {
    try {
      if (track?.enabled) {
        await track?.setMuted(enabled);
      }
    } catch (e) {
      AgoraConsole.error(e);
      Promise.resolve(
        new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
      );
      throw e;
    }
  }
  public async setDevice(
    track: ICameraVideoTrack | IMicrophoneAudioTrack,
    deviceId: string
  ): Promise<void> {
    try {
      await track?.setDevice(deviceId);
    } catch (e) {
      AgoraConsole.error(e);
      Promise.resolve(
        new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
      );
      throw e;
    }
  }
  public async setPlaybackDevice(
    track: ILocalAudioTrack | IRemoteAudioTrack,
    deviceId: string
  ): Promise<void> {
    try {
      await track?.setPlaybackDevice(deviceId);
    } catch (e) {
      AgoraConsole.error(e);
      Promise.resolve(
        new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
      );
      throw e;
    }
  }

  public setVolume(
    track: ILocalAudioTrack | IRemoteAudioTrack,
    volume: number
  ): void {
    try {
      track?.setVolume(AgoraTranslate.NATIVE_RTC_Volume2WebVolume(volume));
    } catch (e) {
      AgoraConsole.error(e);
    }
  }
}
