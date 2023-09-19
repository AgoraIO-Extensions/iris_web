import * as NATIVE_RTC from '@iris/web-rtc';
import { ILocalTrack } from 'agora-rtc-sdk-ng';
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
}
