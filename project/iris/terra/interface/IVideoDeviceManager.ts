import { Action } from "../../tool/AgoraActionQueue";
import * as agorartc from '../rtc_types/Index';

export interface IVideoDeviceManager {
    putAction(action: Action);

    enumerateVideoDevices(): agorartc.DeviceInfo[];
    setDevice(deviceIdUTF8: string): number;
    getDevice(): string;
    numberOfCapabilities(deviceIdUTF8: string): number;
    getCapability(deviceIdUTF8: string, deviceCapabilityNumber: number, capability: agorartc.VideoFormat): number;
    startDeviceTest(hwnd: agorartc.view_t): number;
    stopDeviceTest(): number;
}