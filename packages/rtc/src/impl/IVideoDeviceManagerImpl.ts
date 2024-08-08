import * as NATIVE_RTC from '@iris/native-rtc';
import { ICameraVideoTrack } from 'agora-rtc-sdk-ng';
import { CallApiReturnType } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { AgoraConsole } from '../util';

//@ts-ignore
export class IVideoDeviceManagerImpl implements NATIVE_RTC.IVideoDeviceManager {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  enumerateVideoDevices(): CallApiReturnType {
    let deviceList: MediaDeviceInfo[] = [];
    let process = async () => {
      try {
        deviceList = (await this._engine.implHelper.enumerateDevices())
          ?.videoDevices;
      } catch (e) {
        AgoraConsole.log(e);
        return this._engine.returnResult(false);
      }
      return this._engine.returnResult(
        true,
        0,
        JSON.stringify({ result: deviceList })
      );
    };
    return this._engine.execute(process);
  }
  setDevice_4ad5f6e(deviceIdUTF8: string): CallApiReturnType {
    let process = async () => {
      this._engine.globalState.videoDeviceId = deviceIdUTF8;

      for (let videoTrackPackage of this._engine.irisClientManager
        .localVideoTrackPackages) {
        if (videoTrackPackage.track) {
          if (
            videoTrackPackage.type ==
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_PRIMARY ||
            videoTrackPackage.type ==
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_SECONDARY ||
            videoTrackPackage.type ==
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_THIRD ||
            videoTrackPackage.type ==
              NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA_FOURTH
          ) {
            await this._engine.trackHelper.setDevice(
              videoTrackPackage.track as ICameraVideoTrack,
              deviceIdUTF8
            );
          }
        }
      }

      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }
  getDevice_73b9872(): CallApiReturnType {
    let process = async () => {
      let list: MediaDeviceInfo[] = [];
      let deviceId = '';
      if (this._engine.globalState.videoDeviceId) {
        deviceId = this._engine.globalState.videoDeviceId;
      } else {
        try {
          list = await this._engine.globalState.AgoraRTC.getCameras();
        } catch (e) {
          return this._engine.returnResult(false);
        }
        if (list && list.length > 0) {
          deviceId = list[0].deviceId;
        }
      }
      return this._engine.returnResult(
        true,
        0,
        JSON.stringify({
          result: NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK,
          deviceIdUTF8: deviceId,
        })
      );
    };
    return this._engine.execute(process);
  }

  release(): CallApiReturnType {
    let process = async () => {
      let engine = this._engine;
      engine.globalState.videoDevices = new Array();
      return this._engine.returnResult();
    };
    return this._engine.execute(process);
  }
}
