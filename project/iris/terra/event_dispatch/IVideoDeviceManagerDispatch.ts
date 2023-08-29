import { IrisRtcEngine } from "../../engine/IrisRtcEngine";
import { VideoDeviceManagerImpl } from "../../impl/VideoDeviceManagerImpl";
import { Action } from "../../util/AgoraActionQueue";
import { IVideoDeviceManager } from "../interface/IVideoDeviceManager";
import * as agorartc from '../rtc_types/Index';

export class IVideoDeviceManagerDispatch {

    private _impl: IVideoDeviceManager;

    constructor(engine: IrisRtcEngine) {
        this._impl = new VideoDeviceManagerImpl(engine);
    }

    //IVideoDeviceManager
    enumerateVideoDevices(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        // let obj = JSON.parse(params) as any;
        result.result = this._impl.enumerateVideoDevices();
        return 0;
    }

    setDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let deviceIdUTF8 = obj.deviceIdUTF8;
        if (deviceIdUTF8 === undefined) throw "deviceIdUTF8 is undefined";
        result.result = this._impl.setDevice(deviceIdUTF8);
        return 0;
    }

    getDevice(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        // let obj = JSON.parse(params) as any;
        // let deviceIdUTF8 = obj.deviceIdUTF8;
        // if (deviceIdUTF8 === undefined) throw "deviceIdUTF8 is undefined";
        result.result = this._impl.getDevice();
        return 0;
    }

    numberOfCapabilities(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let deviceIdUTF8 = obj.deviceIdUTF8;
        if (deviceIdUTF8 === undefined) throw "deviceIdUTF8 is undefined";
        result.result = this._impl.numberOfCapabilities(deviceIdUTF8);
        return 0;
    }

    getCapability(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let deviceIdUTF8 = obj.deviceIdUTF8;
        if (deviceIdUTF8 === undefined) throw "deviceIdUTF8 is undefined";
        let deviceCapabilityNumber = obj.deviceCapabilityNumber;
        if (deviceCapabilityNumber === undefined) throw "deviceCapabilityNumber is undefined";
        let capability = obj.capability;
        if (capability === undefined) throw "capability is undefined";
        result.result = this._impl.getCapability(deviceIdUTF8, deviceCapabilityNumber, capability);
        return 0;
    }

    startDeviceTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let hwnd = obj.hwnd;
        if (hwnd === undefined) throw "hwnd is undefined";
        result.result = this._impl.startDeviceTest(hwnd);
        return 0;
    }

    stopDeviceTest(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.stopDeviceTest();
        return 0;
    }
}