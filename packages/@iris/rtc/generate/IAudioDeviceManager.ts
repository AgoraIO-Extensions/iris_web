/// Generated by terra, DO NOT MODIFY BY HAND.

import { CallApiReturnType } from 'iris-web-core';

export enum MAX_DEVICE_ID_LENGTH_TYPE {
  MAX_DEVICE_ID_LENGTH = 512,
}

export interface IAudioDeviceManager {
  enumeratePlaybackDevices(): CallApiReturnType;

  enumerateRecordingDevices(): CallApiReturnType;

  setPlaybackDevice_4ad5f6e(deviceId: string): CallApiReturnType;

  getPlaybackDevice_73b9872(deviceId: string): CallApiReturnType;

  getPlaybackDeviceInfo(): CallApiReturnType;

  setPlaybackDeviceVolume_46f8ab7(volume: number): CallApiReturnType;

  getPlaybackDeviceVolume_915cb25(volume: number): CallApiReturnType;

  setRecordingDevice_4ad5f6e(deviceId: string): CallApiReturnType;

  getRecordingDevice_73b9872(deviceId: string): CallApiReturnType;

  getRecordingDeviceInfo(): CallApiReturnType;

  setRecordingDeviceVolume_46f8ab7(volume: number): CallApiReturnType;

  getRecordingDeviceVolume_915cb25(volume: number): CallApiReturnType;

  setLoopbackDevice_4ad5f6e(deviceId: string): CallApiReturnType;

  getLoopbackDevice_73b9872(deviceId: string): CallApiReturnType;

  setPlaybackDeviceMute_5039d15(mute: boolean): CallApiReturnType;

  getPlaybackDeviceMute_d942327(mute: boolean): CallApiReturnType;

  setRecordingDeviceMute_5039d15(mute: boolean): CallApiReturnType;

  getRecordingDeviceMute_d942327(mute: boolean): CallApiReturnType;

  startPlaybackDeviceTest_3a2037f(testAudioFilePath: string): CallApiReturnType;

  stopPlaybackDeviceTest(): CallApiReturnType;

  startRecordingDeviceTest_46f8ab7(
    indicationInterval: number
  ): CallApiReturnType;

  stopRecordingDeviceTest(): CallApiReturnType;

  startAudioDeviceLoopbackTest_46f8ab7(
    indicationInterval: number
  ): CallApiReturnType;

  stopAudioDeviceLoopbackTest(): CallApiReturnType;

  followSystemPlaybackDevice_5039d15(enable: boolean): CallApiReturnType;

  followSystemRecordingDevice_5039d15(enable: boolean): CallApiReturnType;

  followSystemLoopbackDevice_5039d15(enable: boolean): CallApiReturnType;

  release(): CallApiReturnType;
}
