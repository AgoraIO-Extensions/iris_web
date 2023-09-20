import * as NATIVE_RTC from '@iris/web-rtc';
import { ClientRole, IAgoraRTCClient } from 'agora-rtc-sdk-ng';
import { CallIrisApiResult } from 'iris-web-core';

import { AgoraConsole } from '../util/AgoraConsole';
import { AgoraTranslate } from '../util/AgoraTranslate';

export class ClientHelper {
  public static async setClientRole(
    client: IAgoraRTCClient,
    role: NATIVE_RTC.CLIENT_ROLE_TYPE,
    audienceLatencyLevel: NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE
  ): Promise<void> {
    try {
      let webRole: ClientRole = AgoraTranslate.NATIVE_RTC_CLIENT_ROLE_TYPE2ClientRole(
        role
      );
      //只有观众才能设置 第二个参数。主播不能设置第二个参数
      await client.setClientRole(
        webRole,
        webRole === 'audience'
          ? AgoraTranslate.NATIVE_RTC_AUDIENCE_LATENCY_LEVEL_TYPE2ClientRoleOptions(
              audienceLatencyLevel
            )
          : null
      );
    } catch (e) {
      AgoraConsole.error(e);
      Promise.resolve(
        new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
      );
      throw e;
    }
  }
}
