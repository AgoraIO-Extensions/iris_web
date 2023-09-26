import * as NATIVE_RTC from '@iris/web-rtc';
import { CallApiReturnType, CallIrisApiResult } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { AgoraConsole } from '../util/AgoraConsole';

export class ILocalSpatialAudioEngineImpl
  implements NATIVE_RTC.ILocalSpatialAudioEngine {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  private returnResult(
    isSuccess: boolean = true,
    code: number = NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK,
    data: string = '{"result": 0}'
  ): Promise<CallIrisApiResult> {
    if (!isSuccess) {
      code = -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED;
    }
    return Promise.resolve(new CallIrisApiResult(code, data));
  }

  initialize(): CallApiReturnType {
    AgoraConsole.warn('initialize not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRemoteAudioAttenuation(
    uid: number,
    attenuation: number,
    forceSet: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteAudioAttenuation not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  setMaxAudioRecvCount(maxCount: number): CallApiReturnType {
    AgoraConsole.warn('setMaxAudioRecvCount not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setAudioRecvRange(range: number): CallApiReturnType {
    AgoraConsole.warn('setAudioRecvRange not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setDistanceUnit(unit: number): CallApiReturnType {
    AgoraConsole.warn('setDistanceUnit not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updateSelfPosition(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): CallApiReturnType {
    AgoraConsole.warn('updateSelfPosition not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[],
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('updateSelfPositionEx not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updatePlayerPositionInfo(
    playerId: number,
    positionInfo: NATIVE_RTC.RemoteVoicePositionInfo
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updatePlayerPositionInfo not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setParameters(params: string): CallApiReturnType {
    AgoraConsole.warn('setParameters not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteLocalAudioStream(mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteLocalAudioStream not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteAllRemoteAudioStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'muteAllRemoteAudioStreams not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  updateRemotePosition(
    uid: number,
    posInfo: NATIVE_RTC.RemoteVoicePositionInfo
  ): CallApiReturnType {
    AgoraConsole.warn('updateRemotePosition not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  updateRemotePositionEx(
    uid: number,
    posInfo: NATIVE_RTC.RemoteVoicePositionInfo,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('updateRemotePositionEx not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  removeRemotePosition(uid: number): CallApiReturnType {
    AgoraConsole.warn('removeRemotePosition not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  removeRemotePositionEx(
    uid: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('removeRemotePositionEx not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  clearRemotePositions(): CallApiReturnType {
    AgoraConsole.warn('clearRemotePositions not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  clearRemotePositionsEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('clearRemotePositionsEx not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
}

export class IBaseSpatialAudioEngineImpl
  implements NATIVE_RTC.IBaseSpatialAudioEngine {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  private returnResult(
    isSuccess: boolean = true,
    code: number = NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK,
    data: string = '{"result": 0}'
  ): Promise<CallIrisApiResult> {
    if (!isSuccess) {
      code = -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED;
    }
    return Promise.resolve(new CallIrisApiResult(code, data));
  }

  release(): CallApiReturnType {
    AgoraConsole.warn('release not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setZones(
    zones: NATIVE_RTC.SpatialAudioZone[],
    zoneCount: number
  ): CallApiReturnType {
    AgoraConsole.warn('setZones not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setPlayerAttenuation(
    playerId: number,
    attenuation: number,
    forceSet: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('setPlayerAttenuation not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteRemoteAudioStream(uid: number, mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteRemoteAudioStream not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  initialize(): CallApiReturnType {
    AgoraConsole.warn('initialize not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setRemoteAudioAttenuation(
    uid: number,
    attenuation: number,
    forceSet: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setRemoteAudioAttenuation not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  setMaxAudioRecvCount(maxCount: number): CallApiReturnType {
    AgoraConsole.warn('setMaxAudioRecvCount not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setAudioRecvRange(range: number): CallApiReturnType {
    AgoraConsole.warn('setAudioRecvRange not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setDistanceUnit(unit: number): CallApiReturnType {
    AgoraConsole.warn('setDistanceUnit not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updateSelfPosition(
    position: number,
    axisForward: number,
    axisRight: number,
    axisUp: number
  ): CallApiReturnType {
    AgoraConsole.warn('updateSelfPosition not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updateSelfPositionEx(
    position: number,
    axisForward: number,
    axisRight: number,
    axisUp: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('updateSelfPositionEx not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  updatePlayerPositionInfo(
    playerId: number,
    positionInfo: NATIVE_RTC.RemoteVoicePositionInfo
  ): CallApiReturnType {
    AgoraConsole.warn(
      'updatePlayerPositionInfo not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setParameters(params: string): CallApiReturnType {
    AgoraConsole.warn('setParameters not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteLocalAudioStream(mute: boolean): CallApiReturnType {
    AgoraConsole.warn('muteLocalAudioStream not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  muteAllRemoteAudioStreams(mute: boolean): CallApiReturnType {
    AgoraConsole.warn(
      'muteAllRemoteAudioStreams not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  updateRemotePosition(
    uid: number,
    posInfo: NATIVE_RTC.RemoteVoicePositionInfo
  ): CallApiReturnType {
    AgoraConsole.warn('updateRemotePosition not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  updateRemotePositionEx(
    uid: number,
    posInfo: NATIVE_RTC.RemoteVoicePositionInfo,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('updateRemotePositionEx not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  removeRemotePosition(uid: number): CallApiReturnType {
    AgoraConsole.warn('removeRemotePosition not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  removeRemotePositionEx(
    uid: number,
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('removeRemotePositionEx not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  clearRemotePositions(): CallApiReturnType {
    AgoraConsole.warn('clearRemotePositions not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  clearRemotePositionsEx(
    connection: NATIVE_RTC.RtcConnection
  ): CallApiReturnType {
    AgoraConsole.warn('clearRemotePositionsEx not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
}
