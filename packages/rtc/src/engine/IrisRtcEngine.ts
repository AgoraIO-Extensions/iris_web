import * as NATIVE_RTC from '@iris/native-rtc-binding';

import { UID } from 'agora-rtc-sdk-ng';
import {
  ApiInterceptor,
  ApiInterceptorReturnType,
  ApiParam,
  AsyncTaskType,
  CallApiExecutor,
  CallApiReturnType,
  CallIrisApiResult,
  IrisEventHandlerManager,
} from 'iris-web-core';

import { InitIrisRtcOptions } from '../IrisRtcApi';
import { IrisVideoFrameBufferConfig, VideoParams } from '../base/BaseType';

import { IMediaEngineDispatch } from '../binding/IAgoraMediaEngineDispatch';
import {
  IMediaPlayerCacheManagerDispatch,
  IMediaPlayerDispatch,
} from '../binding/IAgoraMediaPlayerDispatch';
import { IMediaRecorderDispatch } from '../binding/IAgoraMediaRecorderDispatch';
import {
  IMusicContentCenterDispatch,
  IMusicPlayerDispatch,
  MusicChartCollectionDispatch,
  MusicCollectionDispatch,
} from '../binding/IAgoraMusicContentCenterDispatch';
import { IVideoDeviceManagerDispatch } from '../binding/IAgoraRtcEngineDispatch';
import {
  IRtcEngineEventHandlerEx,
  IRtcEngineExDispatch,
} from '../binding/IAgoraRtcEngineExDispatch';
import {
  IBaseSpatialAudioEngineDispatch,
  ILocalSpatialAudioEngineDispatch,
} from '../binding/IAgoraSpatialAudioDispatch';
import { IAudioDeviceManagerDispatch } from '../binding/IAudioDeviceManagerDispatch';

import { IrisAgoraEventHandler } from '../event_handler/IrisAgoraEventHandler';
import { RtcEngineDispatchExtensions } from '../extensions/IAgoraRtcEngineExtensions';
import { ClientHelper } from '../helper/ClientHelper';
import { IrisElement } from '../helper/DomHelper';
import { ImplHelper } from '../helper/ImplHelper';
import { TrackHelper } from '../helper/TrackHelper';
import { IrisGlobalState } from '../state/IrisGlobalState';
import { AgoraConsole } from '../util/AgoraConsole';
import IrisRtcErrorHandler from '../util/ErrorHandler';

import { IrisClientManager } from './IrisClientManager';

export enum IrisIntervalType {
  enableAudioVolumeIndication = 0,
}

export class IrisRtcEngine implements ApiInterceptor {
  public implDispatchesMap: Map<string, any> = new Map();
  public implHelper: ImplHelper = new ImplHelper(this);
  public trackHelper: TrackHelper = new TrackHelper(this);
  public clientHelper: ClientHelper = new ClientHelper(this);

  public irisClientManager: IrisClientManager = new IrisClientManager(this);
  public rtcEngineEventHandler: NATIVE_RTC.IRtcEngineEventHandlerEx = null;

  public globalState: IrisGlobalState = null;
  public agoraEventHandler: IrisAgoraEventHandler = null;
  public executor: CallApiExecutor = null;
  public irisEventHandlerManager: IrisEventHandlerManager = null;
  public irisElement: IrisElement = null;
  public irisIntervalList: {
    type: IrisIntervalType;
    interval: NodeJS.Timeout;
  }[] = [];
  public irisRtcErrorHandler: IrisRtcErrorHandler = new IrisRtcErrorHandler(
    this
  );

  constructor(
    irisEventHandlerManager: IrisEventHandlerManager,
    options: InitIrisRtcOptions
  ) {
    const mapData = [
      ['MediaPlayer', new IMediaPlayerDispatch(this)],
      ['MediaPlayerCacheManager', new IMediaPlayerCacheManagerDispatch(this)],
      ['MediaEngine', new IMediaEngineDispatch(this)],
      ['MediaRecorder', new IMediaRecorderDispatch(this)],
      ['MusicChartCollection', new MusicChartCollectionDispatch(this)],
      ['MusicCollection', new MusicCollectionDispatch(this)],
      ['MusicPlayer', new IMusicPlayerDispatch(this)],
      ['MusicContentCenter', new IMusicContentCenterDispatch(this)],
      ['AudioDeviceManager', new IAudioDeviceManagerDispatch(this)],
      ['VideoDeviceManager', new IVideoDeviceManagerDispatch(this)],
      ['RtcEngine', new RtcEngineDispatchExtensions(this)],
      ['RtcEngineEx', new IRtcEngineExDispatch(this)],
      ['BaseSpatialAudioEngine', new IBaseSpatialAudioEngineDispatch(this)],
      ['LocalSpatialAudioEngine', new ILocalSpatialAudioEngineDispatch(this)],
    ];

    mapData.forEach(([key, value]: [string, any]) =>
      this.implDispatchesMap.set(key, value)
    );

    this.rtcEngineEventHandler = new IRtcEngineEventHandlerEx(this);
    this.globalState = new IrisGlobalState();
    this.irisElement = new IrisElement();
    this.agoraEventHandler = new IrisAgoraEventHandler(this);

    this.executor = new CallApiExecutor(true);
    this.irisEventHandlerManager = irisEventHandlerManager;

    if (options && options.agoraRTC) {
      AgoraConsole.debug('use agoraRTC from initIrisRtc');
      this.globalState.AgoraRTC = options.agoraRTC;
    }
  }

  intercept(apiParam: ApiParam): ApiInterceptorReturnType {
    return this.callIrisApiAsync(apiParam);
  }

  public async callIrisApiAsync(
    apiParam: ApiParam
  ): Promise<CallIrisApiResult> {
    let func_name = apiParam.event;
    let array = func_name.split('_');
    let className = array[0];
    let funName = array[1];

    AgoraConsole.log(
      `[callIrisApiAsync][start] ${(() => {
        let printData = JSON.parse(JSON.stringify(apiParam));
        delete printData?.buffer;
        return JSON.stringify(printData);
      })()}`
    );
    let obj = this.implDispatchesMap.get(className);
    if (obj) {
      let callApiFun = obj[funName];
      if (callApiFun) {
        if (
          func_name !== 'RtcEngine_initialize' &&
          this.irisClientManager.irisClientList.length == 0
        ) {
          AgoraConsole.error('you have not initialize yet');
          return new CallIrisApiResult(
            -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_INITIALIZED,
            ''
          );
        }
        let ret = await callApiFun.call(obj, apiParam);
        AgoraConsole.log(
          `[callIrisApiAsync][result] ${func_name} ret ${ret.code}`
        );
        return ret;
      } else {
        AgoraConsole.error(
          `[callIrisApiAsync][result] ${func_name} not found in ${className}Dispatch`
        );

        // TODO(guoxianze): Temporarily return ERR_NOT_SUPPORTED, for not implemented api.
        return this.returnResult(
          true,
          -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
        );
      }
    } else {
      AgoraConsole.error(
        `[callIrisApiAsync][result] ${className} not found in DispatchsMap`
      );

      // TODO(guoxianze): Temporarily return ERR_NOT_SUPPORTED, for not implemented module.
      return this.returnResult(
        true,
        -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
      );
    }
  }

  public getVideoFrame(uid: UID, channel_id: string): VideoParams {
    return this.irisClientManager.getVideoFrame(uid, channel_id);
  }

  public getVideoFrameByConfig(
    config: IrisVideoFrameBufferConfig
  ): VideoParams {
    return this.irisClientManager.getVideoFrameByConfig(config);
  }

  public execute(task: AsyncTaskType): CallApiReturnType {
    return this.executor.execute(task);
  }

  public returnResult(
    isSuccess: boolean = true,
    code?: number,
    data: string = '{"result": 0}'
  ): Promise<CallIrisApiResult> {
    if (isSuccess) {
      code = NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK;
    } else {
      if (typeof code !== 'number') {
        code = -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED;
      }
    }
    return Promise.resolve(new CallIrisApiResult(code, data));
  }

  public async release() {
    this.agoraEventHandler.release();
    await this.irisClientManager.release();
  }

  public addIrisInterval(type: IrisIntervalType, interval: NodeJS.Timeout) {
    this.irisIntervalList.push({
      type,
      interval,
    });
  }

  public getIrisIntervalByType(type: IrisIntervalType) {
    this.irisIntervalList.filter((a) => type == a.type);
  }

  public removeIrisIntervalByType(type: IrisIntervalType) {
    this.irisIntervalList.filter((a) => type != a.type);
  }

  public clearIrisInterval() {
    this.irisIntervalList.map((item) => {
      AgoraConsole.debug(`clear interval`);
      item.interval && clearInterval(item.interval);
    });
  }

  async dispose(): Promise<void> {
    await this.release();
    return Promise.resolve();
  }
}
