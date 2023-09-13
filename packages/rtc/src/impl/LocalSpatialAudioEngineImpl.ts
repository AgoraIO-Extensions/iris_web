import * as NATIVE_RTC from '@iris/rtc';

import { CallApiReturnType } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';

export class LocalSpatialAudioEngineImpl
  implements NATIVE_RTC.ILocalSpatialAudioEngine {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }
  initialize(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setRemoteAudioAttenuation(
    uid: number,
    attenuation: number,
    forceSet: boolean
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  setMaxAudioRecvCount(maxCount: number): number {
    AgoraConsole.warn('setMaxAudioRecvCount not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setAudioRecvRange(range: number): number {
    AgoraConsole.warn('setAudioRecvRange not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setDistanceUnit(unit: number): number {
    AgoraConsole.warn('setDistanceUnit not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateSelfPosition(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): number {
    AgoraConsole.warn('updateSelfPosition not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[],
    connection: NATIVE_RTC.RtcConnection
  ): number {
    AgoraConsole.warn('updateSelfPositionEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  updatePlayerPositionInfo(
    playerId: number,
    positionInfo: NATIVE_RTC.RemoteVoicePositionInfo
  ): number {
    AgoraConsole.warn(
      'updatePlayerPositionInfo not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setParameters(params: string): number {
    AgoraConsole.warn('setParameters not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteLocalAudioStream(mute: boolean): number {
    AgoraConsole.warn('muteLocalAudioStream not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  muteAllRemoteAudioStreams(mute: boolean): number {
    AgoraConsole.warn(
      'muteAllRemoteAudioStreams not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  updateRemotePosition(
    uid: number,
    posInfo: NATIVE_RTC.RemoteVoicePositionInfo
  ): number {
    AgoraConsole.warn('updateRemotePosition not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  updateRemotePositionEx(
    uid: number,
    posInfo: NATIVE_RTC.RemoteVoicePositionInfo,
    connection: NATIVE_RTC.RtcConnection
  ): number {
    AgoraConsole.warn('updateRemotePositionEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  removeRemotePosition(uid: number): number {
    AgoraConsole.warn('removeRemotePosition not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  removeRemotePositionEx(
    uid: number,
    connection: NATIVE_RTC.RtcConnection
  ): number {
    AgoraConsole.warn('removeRemotePositionEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  clearRemotePositions(): number {
    AgoraConsole.warn('clearRemotePositions not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  clearRemotePositionsEx(connection: NATIVE_RTC.RtcConnection): number {
    AgoraConsole.warn('clearRemotePositionsEx not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}
