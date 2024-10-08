import * as NATIVE_RTC from '@iris/native-rtc';
import { ClientRole, IAgoraRTCClient, ILocalTrack } from 'agora-rtc-sdk-ng';
import { CallIrisApiResult } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';

import { AgoraConsole } from '../util/AgoraConsole';
import { AgoraTranslate } from '../util/AgoraTranslate';

export type SendDataStreamMessage =
  | {
      payload: string | Uint8Array;
      syncWithAudio?: boolean;
      // ordered?: boolean; 当前版本暂不支持 ordered
    }
  | string
  | Uint8Array;

export class ClientHelper {
  _engine: IrisRtcEngine;
  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  public async leave(client: IAgoraRTCClient): Promise<void> {
    //@ts-ignore isStringUID 是websdk的私有属性
    //如果是string uid 登录
    if (client?.isStringUID) {
      let userAccount = '';
      userAccount = client.uid as string;
      const index = this._engine.irisClientManager.userInfoList.findIndex(
        (user) => user.userAccount === userAccount
      );
      if (index !== -1) {
        this._engine.irisClientManager.userInfoList.splice(index, 1);
      }
    }
    await client.leave();
  }

  public async setClientRole(
    client: IAgoraRTCClient,
    role: NATIVE_RTC.CLIENT_ROLE_TYPE,
    audienceLatencyLevel: NATIVE_RTC.AUDIENCE_LATENCY_LEVEL_TYPE = NATIVE_RTC
      .AUDIENCE_LATENCY_LEVEL_TYPE.AUDIENCE_LATENCY_LEVEL_ULTRA_LOW_LATENCY
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
          : undefined
      );
    } catch (e) {
      AgoraConsole.error(e);
      Promise.resolve(
        new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
      );
      throw e;
    }
  }

  public async sendStreamMessage(
    client: IAgoraRTCClient,
    message: SendDataStreamMessage,
    needRetry: boolean = true
  ): Promise<void> {
    try {
      await (client as any).sendStreamMessage(message);
    } catch (e) {
      AgoraConsole.error(e);
      Promise.resolve(
        new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
      );
      throw e;
    }
  }

  public async unpublish(
    client: IAgoraRTCClient,
    tracks?: ILocalTrack | ILocalTrack[]
  ): Promise<void> {
    try {
      await client.unpublish(tracks);
    } catch (e) {
      AgoraConsole.error(e);
      Promise.resolve(
        new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, e)
      );
      throw e;
    }
  }
}
