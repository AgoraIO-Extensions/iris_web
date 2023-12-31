/// Generated by terra, DO NOT MODIFY BY HAND.

import { CallApiReturnType } from 'iris-web-core';

export enum MAX_DEVICE_ID_LENGTH_TYPE {
  MAX_DEVICE_ID_LENGTH = 512,
}

export interface IAudioDeviceManager {
  enumeratePlaybackDevices(): CallApiReturnType;

  enumerateRecordingDevices(): CallApiReturnType;

  setPlaybackDevice(deviceId: string[]): CallApiReturnType;

  getPlaybackDevice(): CallApiReturnType;

  getPlaybackDeviceInfo(): CallApiReturnType;

  setPlaybackDeviceVolume(volume: number): CallApiReturnType;

  getPlaybackDeviceVolume(): CallApiReturnType;

  setRecordingDevice(deviceId: string[]): CallApiReturnType;

  getRecordingDevice(deviceId: string): CallApiReturnType;

  getRecordingDeviceInfo(): CallApiReturnType;

  setRecordingDeviceVolume(volume: number): CallApiReturnType;

  getRecordingDeviceVolume(volume: number[]): CallApiReturnType;

  setLoopbackDevice(deviceId: string[]): CallApiReturnType;

  getLoopbackDevice(deviceId: string): CallApiReturnType;

  setPlaybackDeviceMute(mute: boolean): CallApiReturnType;

  getPlaybackDeviceMute(mute: boolean): CallApiReturnType;

  setRecordingDeviceMute(mute: boolean): CallApiReturnType;

  getRecordingDeviceMute(mute: boolean): CallApiReturnType;

  startPlaybackDeviceTest(testAudioFilePath: string): CallApiReturnType;

  stopPlaybackDeviceTest(): CallApiReturnType;

  startRecordingDeviceTest(indicationInterval: number): CallApiReturnType;

  stopRecordingDeviceTest(): CallApiReturnType;

  startAudioDeviceLoopbackTest(indicationInterval: number): CallApiReturnType;

  stopAudioDeviceLoopbackTest(): CallApiReturnType;

  followSystemPlaybackDevice(enable: boolean): CallApiReturnType;

  followSystemRecordingDevice(enable: boolean): CallApiReturnType;

  followSystemLoopbackDevice(enable: boolean): CallApiReturnType;

  release(): CallApiReturnType;
}
