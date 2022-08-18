import { ILocalVideoTrack, IRemoteVideoTrack, UID } from "agora-rtc-sdk-ng";
import { IrisCVideoFrameBuffer, IrisVideoFrameBufferConfig, IrisVideoFrameBufferDelegateHandle, VideoParams } from "./base/BaseType";
import { IrisApiEngine } from "./engine/IrisApiEngine";
import { IrisVideoFrameBufferManager } from "./engine/IrisVideoFrameBufferManager";


// export namespace AgoraWrapper {

export function CreateIrisVideoFrameBufferManager(): IrisVideoFrameBufferManager {
    return new IrisVideoFrameBufferManager();
}


export function FreeIrisVideoFrameBufferManager(manager_ptr: IrisVideoFrameBufferManager) {
    manager_ptr.destruction();
}


export function EnableVideoFrameBufferByConfig(
    manager_ptr: IrisVideoFrameBufferManager,
    buffer: IrisCVideoFrameBuffer,
    config: IrisVideoFrameBufferConfig): IrisVideoFrameBufferDelegateHandle {

    manager_ptr.enableVideoFrameBufferByConfig(buffer, config);
    let handle: IrisVideoFrameBufferDelegateHandle = config;
    return handle;
}


export function DisableVideoFrameBufferByDelegate(
    manager_ptr: IrisVideoFrameBufferManager,
    handle: IrisVideoFrameBufferDelegateHandle) {

    manager_ptr.disableVideoFrameBufferByConfig(handle);
}


export function DisableVideoFrameBufferByConfig(
    manager_ptr: IrisVideoFrameBufferManager,
    config: IrisVideoFrameBufferConfig) {

    manager_ptr.disableVideoFrameBufferByConfig(config);
}

export function DisableAllVideoFrameBuffer(
    manager_ptr: IrisVideoFrameBufferManager) {

    manager_ptr.disableAllVideoFrameBuffer();
}

export function GetVideoFrame(
    manager_ptr: IrisVideoFrameBufferManager,
    uid: UID, channel_id: string): VideoParams {

    return manager_ptr.getVideoFrame(uid, channel_id);
}

export function GetVideoFrameByConfig(
    manager_ptr: IrisVideoFrameBufferManager,
    config: IrisVideoFrameBufferConfig): VideoParams {

    return manager_ptr.getVideoFrameByConfig(config);
}
// }

