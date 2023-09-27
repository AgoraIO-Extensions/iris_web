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

import { IrisVideoFrameBufferConfig, VideoParams } from 'src/base/BaseType';

import { InitIrisRtcOptions } from '../IrisRtcApi';

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
import { IrisElement } from '../helper/DomHelper';
import { IrisGlobalVariables } from '../states/IrisGlobalVariables';
import { AgoraActionQueue } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';

import { IrisClientManager } from './IrisClientManager';

export type GenerateVideoTrackLabelOrHtmlElementCb = (
  channelName: string,
  uid: number,
  type: NATIVE_RTC.VIDEO_SOURCE_TYPE | NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE
) => string;

export enum IrisIntervalType {
  enableAudioVolumeIndication = 0,
}

export class IrisRtcEngine implements ApiInterceptor {
  private _generateVideoTrackLabelOrHtmlElementCb: GenerateVideoTrackLabelOrHtmlElementCb = null;

  public implDispatchesMap: Map<string, any> = new Map();
  public entitiesContainer: IrisClientManager = new IrisClientManager(this);
  public rtcEngineEventHandler: NATIVE_RTC.IRtcEngineEventHandlerEx = null;

  public globalVariables: IrisGlobalVariables = null;
  public agoraEventHandler: IrisAgoraEventHandler = null;
  public actionQueue: AgoraActionQueue = null;
  public executor: CallApiExecutor = null;
  public irisEventHandlerManager: IrisEventHandlerManager = null;
  public irisElement: IrisElement = null;
  public irisIntervalList: {
    type: IrisIntervalType;
    interval: NodeJS.Timeout;
  }[] = [];

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

    this.actionQueue = new AgoraActionQueue();
    this.rtcEngineEventHandler = new IRtcEngineEventHandlerEx(this);
    this.globalVariables = new IrisGlobalVariables();
    this.irisElement = new IrisElement();
    this.agoraEventHandler = new IrisAgoraEventHandler(this);

    this.executor = new CallApiExecutor(true);
    this.irisEventHandlerManager = irisEventHandlerManager;

    if (options && options.fakeAgoraRTC) {
      AgoraConsole.debug('use fake agora rtc');
      this.globalVariables.AgoraRTC = options.fakeAgoraRTC;
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

    AgoraConsole.log(`[callIrisApiAsync][start] ${JSON.stringify(apiParam)}`);
    let obj = this.implDispatchesMap.get(className);
    if (obj) {
      let callApiFun = obj[funName];
      if (callApiFun) {
        let ret = await callApiFun.call(obj, apiParam);
        AgoraConsole.log(
          `[callIrisApiAsync][result] ${func_name} ret ${ret.code}`
        );
        return ret;
      } else {
        AgoraConsole.error(
          `[callIrisApiAsync][result] ${func_name} not found in ${className}Dispatch`
        );
        return new CallIrisApiResult(
          -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED,
          ''
        );
      }
    } else {
      AgoraConsole.error(
        `[callIrisApiAsync][result] ${className} not found in DispatchsMap`
      );
      return new CallIrisApiResult(-NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED, '');
    }
  }

  public getVideoFrame(uid: UID, channel_id: string): VideoParams {
    return this.entitiesContainer.getVideoFrame(uid, channel_id);
  }

  public getVideoFrameByConfig(
    config: IrisVideoFrameBufferConfig
  ): VideoParams {
    return this.entitiesContainer.getVideoFrameByConfig(config);
  }

  public execute(task: AsyncTaskType): CallApiReturnType {
    return this.executor.execute(task);
  }

  public setGenerateVideoTrackLabelOrHtmlElementCb(
    cb: GenerateVideoTrackLabelOrHtmlElementCb
  ) {
    this._generateVideoTrackLabelOrHtmlElementCb = cb;
  }

  public returnResult(
    isSuccess: boolean = true,
    code: number = NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK,
    data: string = '{"result": 0}'
  ): Promise<CallIrisApiResult> {
    if (!isSuccess) {
      code = -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED;
    }
    return Promise.resolve(new CallIrisApiResult(code, data));
  }

  public async release() {
    this.agoraEventHandler.release();
    await this.entitiesContainer.release();
  }

  public generateVideoTrackLabelOrHtmlElement(
    channelName: string,
    uid: number,
    type: NATIVE_RTC.VIDEO_SOURCE_TYPE | NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE
  ): string {
    if (this._generateVideoTrackLabelOrHtmlElementCb) {
      return this._generateVideoTrackLabelOrHtmlElementCb(
        channelName,
        uid,
        type
      );
    }

    return channelName + '_' + uid + '_' + type;
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
