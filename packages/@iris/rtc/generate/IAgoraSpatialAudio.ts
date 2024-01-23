/// Generated by terra, DO NOT MODIFY BY HAND.

import { CallApiReturnType } from 'iris-web-core';

import { RtcConnection } from './IAgoraRtcEngineEx';

export class RemoteVoicePositionInfo {
  position?: number[];

  forward?: number[];
}

export class SpatialAudioZone {
  zoneSetId?: number;

  position?: number[];

  forward?: number[];

  right?: number[];

  up?: number[];

  forwardLength?: number;

  rightLength?: number;

  upLength?: number;

  audioAttenuation?: number;
}

export interface ILocalSpatialAudioEngine {
  release(): CallApiReturnType;

  initialize(): CallApiReturnType;

  updateRemotePosition_adc0909(
    uid: number,
    posInfo: RemoteVoicePositionInfo
  ): CallApiReturnType;

  updateRemotePositionEx_f0252d9(
    uid: number,
    posInfo: RemoteVoicePositionInfo,
    connection: RtcConnection
  ): CallApiReturnType;

  removeRemotePosition_c8d091a(uid: number): CallApiReturnType;

  removeRemotePositionEx_58a9850(
    uid: number,
    connection: RtcConnection
  ): CallApiReturnType;

  clearRemotePositionsEx_c81e1a4(connection: RtcConnection): CallApiReturnType;

  updateSelfPositionEx_502183a(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[],
    connection: RtcConnection
  ): CallApiReturnType;

  setMaxAudioRecvCount_46f8ab7(maxCount: number): CallApiReturnType;

  setAudioRecvRange_685e803(range: number): CallApiReturnType;

  setDistanceUnit_685e803(unit: number): CallApiReturnType;

  updateSelfPosition_9c9930f(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): CallApiReturnType;

  updatePlayerPositionInfo_b37c59d(
    playerId: number,
    positionInfo: RemoteVoicePositionInfo
  ): CallApiReturnType;

  setParameters_3a2037f(params: string): CallApiReturnType;

  muteLocalAudioStream_5039d15(mute: boolean): CallApiReturnType;

  muteAllRemoteAudioStreams_5039d15(mute: boolean): CallApiReturnType;

  muteRemoteAudioStream_dbdc15a(uid: number, mute: boolean): CallApiReturnType;

  setRemoteAudioAttenuation_74c3e98(
    uid: number,
    attenuation: number,
    forceSet: boolean
  ): CallApiReturnType;

  setZones_414a27e(
    zones: SpatialAudioZone[],
    zoneCount: number
  ): CallApiReturnType;

  setPlayerAttenuation_a15bc51(
    playerId: number,
    attenuation: number,
    forceSet: boolean
  ): CallApiReturnType;

  clearRemotePositions(): CallApiReturnType;
}
