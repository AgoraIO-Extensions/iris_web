import { IrisRtcEngine } from "../engine/IrisRtcEngine";
import { IMediaEngine } from "../terra/interface/IMediaEngine";
import { Action } from "../tool/AgoraActionQueue";
import { AgoraConsole } from "../tool/AgoraConsole";
import * as agorartc from "../terra/rtc_types/Index";
import { IVideoDeviceManager } from "../terra/interface/IVideoDeviceManager";
import { ImplHelper } from "./ImplHelper";
import { IrisVideoSourceType, VideoTrackPackage } from "../base/BaseType";
import { ICameraVideoTrack } from "agora-rtc-sdk-ng";

export class VideoDeviceManagerImpl implements IVideoDeviceManager {
    private _engine: IrisRtcEngine;

    public constructor(engine: IrisRtcEngine) {
        this._engine = engine;
    }

    putAction(action: Action) {
        this._engine.actionQueue.putAction(action);
    }

    //todo IVideoDeviceManager
    enumerateVideoDevices(): agorartc.DeviceInfo[] {
        ImplHelper.enumerateDevices(this._engine)
            .then((devices) => {
                let videoDevices = devices.videoDevices;
                this._engine.rtcEngineEventHandler.OnVideoDevicesEnumerated(videoDevices);
            })
            .catch((e) => {
                AgoraConsole.error("enumerateVideoDevices failed");
                AgoraConsole.log(e);
            });

        if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.videoDevices;
        }

        return [];
    }

    setDevice(deviceIdUTF8: string): number {
        this.putAction({
            fun: (deviceIdUTF8: string, next) => {
                this._engine.mainClientVariables.videoDeviceId = deviceIdUTF8;
                //todo 如果当前有LocalVideoTrack， 那么调用LocalVideoTrack.setDevice 
                this._engine.entitiesContainer.walkAllILocalVideoTrack((trackPackage: VideoTrackPackage) => {
                    if (trackPackage.type == IrisVideoSourceType.kVideoSourceTypeCameraPrimary || trackPackage.type == IrisVideoSourceType.kVideoSourceTypeCameraSecondary) {
                        let track: ICameraVideoTrack = trackPackage.track as ICameraVideoTrack;
                        track.setDevice(deviceIdUTF8)
                            .then(() => {
                                AgoraConsole.log("setDevice success");
                            })
                            .catch((reason) => {
                                AgoraConsole.error("setDevice failed");
                                AgoraConsole.error(reason);
                            })
                            .finally(() => {

                            })
                    }
                })
                next();
            },
            args: [deviceIdUTF8]
        })
        return 0;
    }

    getDevice(): string {
        if (this._engine.mainClientVariables.videoDeviceId) {
            return this._engine.mainClientVariables.videoDeviceId;
        }
        else if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.videoDevices[0]?.deviceId || "";
        }
        else {
            return "";
        }
    }

    numberOfCapabilities(deviceIdUTF8: string): number {
        AgoraConsole.warn("numberOfCapabilities not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getCapability(deviceIdUTF8: string, deviceCapabilityNumber: number, capability: agorartc.VideoFormat): number {
        AgoraConsole.warn("getCapability not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startDeviceTest(hwnd: any): number {
        AgoraConsole.warn("startDeviceTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopDeviceTest(): number {
        AgoraConsole.warn("stopDeviceTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

}