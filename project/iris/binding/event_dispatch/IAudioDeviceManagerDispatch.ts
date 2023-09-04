import { ApiParam } from "../../engine/IrisApiEngine";
import { IrisRtcEngine } from "../../engine/IrisRtcEngine";
import { AudioDeviceManagerImpl } from "../../impl/AudioDeviceManagerImpl";
import { IAudioDeviceManager } from "../interface/IAudioDeviceManager";

export class IAudioDeviceManagerDispatch {

    private _impl: IAudioDeviceManager;

    constructor(engine: IrisRtcEngine) {
        this._impl = new AudioDeviceManagerImpl(engine);
    }

    enumeratePlaybackDevices(
        apiParam: ApiParam): number {
        // let obj = JSON.parse(params) as any;
        // result.result = this._impl.enumeratePlaybackDevices();
        return 0;
    }

    enumerateRecordingDevices(
        apiParam: ApiParam): number {
        // let obj = JSON.parse(params) as any;
        // result.result = this._impl.enumerateRecordingDevices();
        return 0;
    }

    setPlaybackDevice(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        let deviceId = obj.deviceId;
        if (deviceId === undefined) throw "deviceId is undefined";
        return this._impl.setPlaybackDevice(deviceId);
    }

    getPlaybackDevice(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        // let deviceId = obj.deviceId;
        // if (deviceId === undefined) throw "deviceId is undefined";
        // result.result = this._impl.getPlaybackDevice();
        return 0;
    }

    getPlaybackDeviceInfo(
        apiParam: ApiParam): number {
        // let obj = JSON.parse(params) as any;
        // let deviceId = obj.deviceId;
        // if (deviceId === undefined) throw "deviceId is undefined";
        // let deviceName = obj.deviceName;
        // if (deviceName === undefined) throw "deviceName is undefined";
        // result.result = this._impl.getPlaybackDeviceInfo();
        return 0;
    }

    setPlaybackDeviceVolume(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        return this._impl.setPlaybackDeviceVolume(volume);
    }

    getPlaybackDeviceVolume(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        // let volume = obj.volume;
        // if (volume === undefined) throw "volume is undefined";
        return this._impl.getPlaybackDeviceVolume();
    }

    setRecordingDevice(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        let deviceId = obj.deviceId;
        if (deviceId === undefined) throw "deviceId is undefined";
        return this._impl.setRecordingDevice(deviceId);
    }

    getRecordingDevice(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        // let deviceId = obj.deviceId;
        // if (deviceId === undefined) throw "deviceId is undefined";
        // result.result = this._impl.getRecordingDevice();
        return 0;
    }

    getRecordingDeviceInfo(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        // let deviceId = obj.deviceId;
        // if (deviceId === undefined) throw "deviceId is undefined";
        // let deviceName = obj.deviceName;
        // if (deviceName === undefined) throw "deviceName is undefined";
        // result.result = this._impl.getRecordingDeviceInfo();
        return 0;
    }

    setRecordingDeviceVolume(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        let volume = obj.volume;
        if (volume === undefined) throw "volume is undefined";
        return this._impl.setRecordingDeviceVolume(volume);
    }

    getRecordingDeviceVolume(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        // let volume = obj.volume;
        // if (volume === undefined) throw "volume is undefined";
        return this._impl.getRecordingDeviceVolume();
    }

    setPlaybackDeviceMute(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        return this._impl.setPlaybackDeviceMute(mute);
    }

    getPlaybackDeviceMute(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        return this._impl.getPlaybackDeviceMute(mute);
    }

    setRecordingDeviceMute(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        return this._impl.setRecordingDeviceMute(mute);
    }

    getRecordingDeviceMute(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        return this._impl.getRecordingDeviceMute(mute);
    }

    startPlaybackDeviceTest(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        let testAudioFilePath = obj.testAudioFilePath;
        if (testAudioFilePath === undefined) throw "testAudioFilePath is undefined";
        return this._impl.startPlaybackDeviceTest(testAudioFilePath);
    }

    stopPlaybackDeviceTest(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        return this._impl.stopPlaybackDeviceTest();
    }

    startRecordingDeviceTest(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        let indicationInterval = obj.indicationInterval;
        if (indicationInterval === undefined) throw "indicationInterval is undefined";
        return this._impl.startRecordingDeviceTest(indicationInterval);
    }

    stopRecordingDeviceTest(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        return this._impl.stopRecordingDeviceTest();
    }

    startAudioDeviceLoopbackTest(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        let indicationInterval = obj.indicationInterval;
        if (indicationInterval === undefined) throw "indicationInterval is undefined";
        return this._impl.startAudioDeviceLoopbackTest(indicationInterval);
    }

    stopAudioDeviceLoopbackTest(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        return this._impl.stopAudioDeviceLoopbackTest();
    }

    followSystemPlaybackDevice(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        let enable = obj.enable;
        if (enable === undefined) throw "enable is undefined";
        return this._impl.followSystemPlaybackDevice(enable);
    }

    followSystemRecordingDevice(
        apiParam: ApiParam): number {
        let obj = JSON.parse(apiParam.data) as any;
        let enable = obj.enable;
        if (enable === undefined) throw "enable is undefined";
        return this._impl.followSystemRecordingDevice(enable);
    }
}