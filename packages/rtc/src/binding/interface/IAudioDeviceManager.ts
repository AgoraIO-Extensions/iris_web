import { Action } from "../../util/AgoraActionQueue";
import * as agorartc from '../rtc_types/Index';

export interface IAudioDeviceManager {
    putAction(action: Action);

    enumeratePlaybackDevices(): agorartc.DeviceInfo[];
    enumerateRecordingDevices(): agorartc.DeviceInfo[];
    setPlaybackDevice(deviceId: string): number;
    getPlaybackDevice(): string;
    getPlaybackDeviceInfo(): agorartc.DeviceInfo;
    setPlaybackDeviceVolume(volume: number): number;
    getPlaybackDeviceVolume(): number;
    setRecordingDevice(deviceId: string): number;
    getRecordingDevice(): string;
    getRecordingDeviceInfo(): agorartc.DeviceInfo;
    setRecordingDeviceVolume(volume: number): number;
    getRecordingDeviceVolume(): number;
    setPlaybackDeviceMute(mute: boolean): number;
    getPlaybackDeviceMute(mute: boolean): number;
    setRecordingDeviceMute(mute: boolean): number;
    getRecordingDeviceMute(mute: boolean): number;
    startPlaybackDeviceTest(testAudioFilePath: string): number;
    stopPlaybackDeviceTest(): number;
    startRecordingDeviceTest(indicationInterval: number): number;
    stopRecordingDeviceTest(): number;
    startAudioDeviceLoopbackTest(indicationInterval: number): number;
    stopAudioDeviceLoopbackTest(): number;
    followSystemPlaybackDevice(enable: boolean): number;
    followSystemRecordingDevice(enable: boolean): number;


}