import { IrisRtcEngine } from "../../engine/IrisRtcEngine";
import { AudioDeviceManagerImpl } from "../../impl/AudioDeviceManagerImpl";
import { Action } from "../../util/AgoraActionQueue";
import { IAudioDeviceManager } from "../interface/IAudioDeviceManager";
import * as agorartc from '../rtc_types/Index';

export class IAudioDeviceManagerDispatch {

    private _impl: IAudioDeviceManager;

    constructor(engine: IrisRtcEngine) {
        this._impl = new AudioDeviceManagerImpl(engine);
    }

    enumeratePlaybackDevices(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        // let obj = JSON.parse(params) as any;
        result.result = this._impl.enumeratePlaybackDevices();
        return 0;
    }

    enumerateRecordingDevices(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        // let obj = JSON.parse(params) as any;
        result.result = this._impl.enumerateRecordingDevices();
        return 0;
    }

    setPlaybackDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let deviceId = obj.deviceId;
        if (deviceId === undefined) throw "deviceId is undefined";
        result.result = this._impl.setPlaybackDevice(deviceId);
        return 0;
    }

    getPlaybackDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        // let deviceId = obj.deviceId;
        // if (deviceId === undefined) throw "deviceId is undefined";
        result.result = this._impl.getPlaybackDevice();
        return 0;
    }

    getPlaybackDeviceInfo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        // let obj = JSON.parse(params) as any;
        // let deviceId = obj.deviceId;
        // if (deviceId === undefined) throw "deviceId is undefined";
        // let deviceName = obj.deviceName;
        // if (deviceName === undefined) throw "deviceName is undefined";
        result.result = this._impl.getPlaybackDeviceInfo();
        return 0;
    }

    setPlaybackDeviceVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.setPlaybackDeviceVolume(volume);
        return 0;
    }

    getPlaybackDeviceVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        // let volume = obj.volume;
        // if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.getPlaybackDeviceVolume();
        return 0;
    }

    setRecordingDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let deviceId = obj.deviceId;
        if (deviceId === undefined) throw "deviceId is undefined";
        result.result = this._impl.setRecordingDevice(deviceId);
        return 0;
    }

    getRecordingDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        // let deviceId = obj.deviceId;
        // if (deviceId === undefined) throw "deviceId is undefined";
        result.result = this._impl.getRecordingDevice();
        return 0;
    }

    getRecordingDeviceInfo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        // let deviceId = obj.deviceId;
        // if (deviceId === undefined) throw "deviceId is undefined";
        // let deviceName = obj.deviceName;
        // if (deviceName === undefined) throw "deviceName is undefined";
        result.result = this._impl.getRecordingDeviceInfo();
        return 0;
    }

    setRecordingDeviceVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.setRecordingDeviceVolume(volume);
        return 0;
    }

    getRecordingDeviceVolume(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        // let volume = obj.volume;
        // if (volume === undefined) throw "volume is undefined";
        result.result = this._impl.getRecordingDeviceVolume();
        return 0;
    }

    setPlaybackDeviceMute(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.setPlaybackDeviceMute(mute);
        return 0;
    }

    getPlaybackDeviceMute(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.getPlaybackDeviceMute(mute);
        return 0;
    }

    setRecordingDeviceMute(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.setRecordingDeviceMute(mute);
        return 0;
    }

    getRecordingDeviceMute(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.getRecordingDeviceMute(mute);
        return 0;
    }

    startPlaybackDeviceTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let testAudioFilePath = obj.testAudioFilePath;
        if (testAudioFilePath === undefined) throw "testAudioFilePath is undefined";
        result.result = this._impl.startPlaybackDeviceTest(testAudioFilePath);
        return 0;
    }

    stopPlaybackDeviceTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopPlaybackDeviceTest();
        return 0;
    }

    startRecordingDeviceTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let indicationInterval = obj.indicationInterval;
        if (indicationInterval === undefined) throw "indicationInterval is undefined";
        result.result = this._impl.startRecordingDeviceTest(indicationInterval);
        return 0;
    }

    stopRecordingDeviceTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopRecordingDeviceTest();
        return 0;
    }

    startAudioDeviceLoopbackTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let indicationInterval = obj.indicationInterval;
        if (indicationInterval === undefined) throw "indicationInterval is undefined";
        result.result = this._impl.startAudioDeviceLoopbackTest(indicationInterval);
        return 0;
    }

    stopAudioDeviceLoopbackTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopAudioDeviceLoopbackTest();
        return 0;
    }

    followSystemPlaybackDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enable = obj.enable;
        if (enable === undefined) throw "enable is undefined";
        result.result = this._impl.followSystemPlaybackDevice(enable);
        return 0;
    }

    followSystemRecordingDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let enable = obj.enable;
        if (enable === undefined) throw "enable is undefined";
        result.result = this._impl.followSystemRecordingDevice(enable);
        return 0;
    }
}