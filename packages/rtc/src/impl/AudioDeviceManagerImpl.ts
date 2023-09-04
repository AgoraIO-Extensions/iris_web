import { IrisRtcEngine } from "../engine/IrisRtcEngine";
import { IAudioDeviceManager } from "../binding/interface/IAudioDeviceManager";
import { Action } from "../util/AgoraActionQueue";
import * as agorartc from "../binding/rtc_types/Index";
import { ImplHelper } from "./ImplHelper";
import { AgoraConsole } from "../util/AgoraConsole";
import { ILocalAudioTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { IrisAudioSourceType } from "../base/BaseType";

export class AudioDeviceManagerImpl implements IAudioDeviceManager {
    private _engine: IrisRtcEngine;

    public constructor(engine: IrisRtcEngine) {
        this._engine = engine;
    }

    putAction(action: Action) {
        this._engine.actionQueue.putAction(action);
    }

    enumeratePlaybackDevices(): agorartc.DeviceInfo[] {
        ImplHelper.enumerateDevices(this._engine)
            .then((device) => {
                let playbackDevices = device.playbackDevices;
                this._engine.rtcEngineEventHandler.onPlaybackDevicesEnumerated(playbackDevices);
            })
            .catch((e) => {
                AgoraConsole.error("enumeratePlaybackDevices failed");
                AgoraConsole.log(e);
            });

        if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.playbackDevices;
        }

        return [];
    }

    enumerateRecordingDevices(): agorartc.DeviceInfo[] {
        ImplHelper.enumerateDevices(this._engine)
            .then((device) => {
                let recordingDevices = device.recordingDevices;
                this._engine.rtcEngineEventHandler.onRecordingDevicesEnumerated(recordingDevices);
            })
            .catch((e) => {
                AgoraConsole.error("enumerateRecordingDevices failed");
                AgoraConsole.log(e);
            });

        if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.recordingDevices;
        }

        return [];
    }

    setPlaybackDevice(deviceId: string): number {
        this.putAction({
            fun: (deviceId: string, next) => {

                let process = async () => {
                    this._engine.mainClientVariables.playbackDeviceId = deviceId;
                    let entitiesContainer = this._engine.entitiesContainer;
                    let localAudioTracks = entitiesContainer.getLocalAudioTracks();
                    for (let trackPackage of localAudioTracks) {
                        let track = trackPackage.track as ILocalAudioTrack;
                        try {
                            await track.setPlaybackDevice(deviceId)
                        }
                        catch (e) {
                            AgoraConsole.error("localAudioTrack setPlaybackDevice setFailed");
                            e && AgoraConsole.log(e);
                        }
                    }

                    let remoteUsers = entitiesContainer.getAllRemoteUsers();
                    for (let remoteUser of remoteUsers) {
                        if (remoteUser.hasAudio && remoteUser.audioTrack) {
                            try {
                                await remoteUser.audioTrack.setPlaybackDevice(deviceId);
                            }
                            catch (e) {
                                AgoraConsole.error("remoteAudioTrack setPlaybackDevice setFailed");
                            }
                        }
                    }
                    next();
                };

                setTimeout(process, 0);
            },
            args: [deviceId]
        })

        return 0;
    }

    getPlaybackDevice(): string {
        if (this._engine.mainClientVariables.playbackDeviceId) {
            return this._engine.mainClientVariables.playbackDeviceId;
        }
        else if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.playbackDevices[0]?.deviceId || "";
        }
        else {
            return "";
        }
    }

    getPlaybackDeviceInfo(): agorartc.DeviceInfo {
        if (this._engine.mainClientVariables.playbackDeviceId) {
            for (let e of this._engine.globalVariables.playbackDevices) {
                if (e.deviceId == this._engine.mainClientVariables.playbackDeviceId)
                    return e;
            }
        }

        if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.playbackDevices[0] || { deviceId: "", deviceName: "" }
        }
        else {
            return { deviceId: "", deviceName: "" };
        }
    }

    //native传入的值为[0,400] 100:The original volume.
    setPlaybackDeviceVolume(volume: number): number {
        if (volume < 0 || volume > 100) {
            AgoraConsole.warn("the volume must be in [0,100] on web");
            return -agorartc.ERROR_CODE_TYPE.ERR_INVALID_ARGUMENT;
        }

        this.putAction({

            fun: (volume: number, next) => {

                this._engine.globalVariables.playbackSignalVolume = volume;
                this._engine.globalVariables.playbackSignalVolumes.clear();

                //找到远端audio
                let remoteUsers = this._engine.entitiesContainer.getAllRemoteUsers();
                for (let remoteUser of remoteUsers) {
                    if (remoteUser.audioTrack) {
                        //web端传入值为[0,100], 100:表示原始音量
                        remoteUser.audioTrack.setVolume(volume);
                    }
                }

                next();
            },
            args: [volume]
        })
        return 0;
    }

    getPlaybackDeviceVolume(): number {
        return this._engine.globalVariables.playbackSignalVolume;
    }

    setRecordingDevice(deviceId: string): number {
        this.putAction({
            fun: (deviceId: string, next) => {
                this._engine.mainClientVariables.recordingDeviceId = deviceId;
                let trackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary);
                if (trackPackage) {
                    let track = trackPackage.track as IMicrophoneAudioTrack;
                    track.setDevice(deviceId)
                        .then(() => {
                            AgoraConsole.log("setRecordingDevice success");
                        })
                        .catch(() => {
                            AgoraConsole.error("setRecordingDevice failed");
                        })
                        .finally(() => {
                            next();
                        })
                }
                else {
                    next();
                }
            },
            args: [deviceId]
        })

        return 0;
    }

    getRecordingDevice(): string {
        if (this._engine.mainClientVariables.recordingDeviceId) {
            return this._engine.mainClientVariables.recordingDeviceId;
        }
        else if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.recordingDevices[0]?.deviceId || "";
        }
        else {
            return "";
        }
    }

    getRecordingDeviceInfo(): agorartc.DeviceInfo {
        if (this._engine.mainClientVariables.recordingDeviceId) {
            for (let e of this._engine.globalVariables.recordingDevices) {
                if (e.deviceId == this._engine.mainClientVariables.recordingDeviceId)
                    return e;
            }
        }

        if (this._engine.globalVariables.deviceEnumerated) {
            return this._engine.globalVariables.recordingDevices[0] || { deviceId: "", deviceName: "" }
        }
        else {
            return { deviceId: "", deviceName: "" };
        }
    }

    //native传入的值为[0,400] 100:The original volume.
    setRecordingDeviceVolume(volume: number): number {
        if (volume < 0 || volume > 100) {
            AgoraConsole.error("volume must be [0,100] in web platform");
            return -agorartc.ERROR_CODE_TYPE.ERR_INVALID_ARGUMENT;
        }

        this.putAction({
            fun: (volume: number, next) => {

                this._engine.globalVariables.recordingSignalVolume = volume;
                let trackPackage = this._engine.entitiesContainer.getLocalAudioTrackByType(IrisAudioSourceType.kAudioSourceTypeMicrophonePrimary);
                if (trackPackage) {
                    let track = trackPackage.track;
                    //web 传入的值为 [0,1000], 100: The original volume. 似乎不需要转换
                    track.setVolume(volume);
                }
                next();
            },
            args: [volume]
        })

        return 0;
    }

    getRecordingDeviceVolume(): number {
        return this._engine.globalVariables.recordingSignalVolume;
    }

    setPlaybackDeviceMute(mute: boolean): number {
        AgoraConsole.warn("setPlaybackDeviceMute not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getPlaybackDeviceMute(mute: boolean): number {
        AgoraConsole.warn("getPlaybackDeviceMute not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setRecordingDeviceMute(mute: boolean): number {
        AgoraConsole.warn("setRecordingDeviceMute not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    getRecordingDeviceMute(mute: boolean): number {
        AgoraConsole.warn("getRecordingDeviceMute not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startPlaybackDeviceTest(testAudioFilePath: string): number {
        AgoraConsole.warn("startPlaybackDeviceTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopPlaybackDeviceTest(): number {
        AgoraConsole.warn("stopPlaybackDeviceTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startRecordingDeviceTest(indicationInterval: number): number {
        AgoraConsole.warn("startRecordingDeviceTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopRecordingDeviceTest(): number {
        AgoraConsole.warn("stopRecordingDeviceTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    startAudioDeviceLoopbackTest(indicationInterval: number): number {
        AgoraConsole.warn("startAudioDeviceLoopbackTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    stopAudioDeviceLoopbackTest(): number {
        AgoraConsole.warn("stopAudioDeviceLoopbackTest not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    followSystemPlaybackDevice(enable: boolean): number {
        AgoraConsole.warn("followSystemPlaybackDevice not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    followSystemRecordingDevice(enable: boolean): number {
        AgoraConsole.warn("followSystemRecordingDevice not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
}