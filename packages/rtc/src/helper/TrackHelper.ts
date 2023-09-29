import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { ICameraVideoTrack, ILocalTrack } from 'agora-rtc-sdk-ng';
import { CallIrisApiResult } from 'iris-web-core';

import { AgoraConsole } from '../util/AgoraConsole';

export class TrackHelper {
  public static async setEnabled(
    track: ILocalTrack,
    enabled: boolean
  ): Promise<void> {
    try {
      await track.setEnabled(enabled);
    } catch (e) {
      AgoraConsole.error(e);
      Promise.resolve(
        new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
      );
      throw e;
    }
  }
  public static async setMuted(
    track: ILocalTrack,
    enabled: boolean
  ): Promise<void> {
    try {
      await track.setMuted(enabled);
    } catch (e) {
      AgoraConsole.error(e);
      Promise.resolve(
        new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
      );
      throw e;
    }
  }
  public static async setDevice(
    track: ICameraVideoTrack,
    deviceId: string
  ): Promise<void> {
    try {
      await track.setDevice(deviceId);
    } catch (e) {
      AgoraConsole.error(e);
      Promise.resolve(
        new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
      );
      throw e;
    }
  }
}
