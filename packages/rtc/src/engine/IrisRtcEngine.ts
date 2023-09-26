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
  IrisEventHandler,
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
import { IrisElement } from '../helper/DomHelper';
import { IrisGlobalVariables } from '../states/IrisGlobalVariables';
import { IrisMainClientVariables } from '../states/IrisMainClientVariables';
import { IrisSubClientVariables } from '../states/IrisSubClientVariables';
import { AgoraActionQueue } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';

import { IrisEntitiesContainer } from './IrisEntitiesContainer';

export type CallApiType = (
  params: string,
  paramLength: number,
  buffer: Array<Uint8ClampedArray>,
  bufferLength: number,
  result: any
) => number;
export type CallApiAsyncType = (
  params: string,
  paramLength: number,
  buffer: Array<Uint8ClampedArray>,
  bufferLength: number,
  result: any
) => Promise<CallIrisApiResult>;
export type GenerateVideoTrackLabelOrHtmlElementCb = (
  channelName: string,
  uid: number,
  type: NATIVE_RTC.VIDEO_SOURCE_TYPE | NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE
) => string;

export enum IrisIntervalType {
  enableAudioVolumeIndication = 0,
}

export class IrisRtcEngine implements ApiInterceptor {
  //EventHandler
  private _eventHandler: IrisEventHandler = null;

  private _generateVideoTrackLabelOrHtmlElementCb: GenerateVideoTrackLabelOrHtmlElementCb = null;

  public implDispatchsMap: Map<string, any> = null;
  public entitiesContainer: IrisEntitiesContainer = null;
  public rtcEngineEventHandler: NATIVE_RTC.IRtcEngineEventHandlerEx = null;

  public globalVariables: IrisGlobalVariables = null;
  public mainClientVariables: IrisMainClientVariables = null;
  public subClientVariables: IrisSubClientVariables = null;
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
    this.implDispatchsMap = new Map();
    this.implDispatchsMap.set('MediaPlayer', new IMediaPlayerDispatch(this));
    this.implDispatchsMap.set(
      'MediaPlayerCacheManager',
      new IMediaPlayerCacheManagerDispatch(this)
    );
    this.implDispatchsMap.set('MediaEngine', new IMediaEngineDispatch(this));
    this.implDispatchsMap.set(
      'MediaRecorder',
      new IMediaRecorderDispatch(this)
    );
    this.implDispatchsMap.set(
      'MusicChartCollection',
      new MusicChartCollectionDispatch(this)
    );
    this.implDispatchsMap.set(
      'MusicCollection',
      new MusicCollectionDispatch(this)
    );
    this.implDispatchsMap.set('MusicPlayer', new IMusicPlayerDispatch(this));
    this.implDispatchsMap.set(
      'MusicContentCenter',
      new IMusicContentCenterDispatch(this)
    );
    this.implDispatchsMap.set(
      'AudioDeviceManager',
      new IAudioDeviceManagerDispatch(this)
    );
    this.implDispatchsMap.set(
      'VideoDeviceManager',
      new IVideoDeviceManagerDispatch(this)
    );
    this.implDispatchsMap.set(
      'RtcEngine',
      new RtcEngineDispatchExtensions(this)
    );
    this.implDispatchsMap.set('RtcEngineEx', new IRtcEngineExDispatch(this));
    this.implDispatchsMap.set(
      'BaseSpatialAudioEngine',
      new IBaseSpatialAudioEngineDispatch(this)
    );
    this.implDispatchsMap.set(
      'LocalSpatialAudioEngine',
      new ILocalSpatialAudioEngineDispatch(this)
    );

    this.actionQueue = new AgoraActionQueue();
    this.rtcEngineEventHandler = new IRtcEngineEventHandlerEx(this);
    this.entitiesContainer = new IrisEntitiesContainer(this);
    this.globalVariables = new IrisGlobalVariables();
    this.irisElement = new IrisElement();
    this.mainClientVariables = new IrisMainClientVariables();
    this.subClientVariables = new IrisSubClientVariables();
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

  public callIrisApi(apiParam: ApiParam): number {
    let func_name = apiParam.event;
    let params: string = apiParam.data;
    let paramLength: number = apiParam.data_size;
    let buffer: Array<any> = apiParam.buffer;
    let bufferLength: Array<any> = apiParam.length;
    let buffer_count = apiParam.buffer_count;
    let result: any = apiParam.result;
    let resultObj: any = {};

    let array = func_name.split('_');
    let className = array[0];
    let funName = array[1];

    AgoraConsole.log(`[callIrisApi][start] ${JSON.stringify(apiParam)}`);

    let obj = this.implDispatchsMap.get(className);
    if (obj) {
      let callApiFun: CallApiType = obj[funName];
      if (callApiFun) {
        let ret = callApiFun.call(
          obj,
          params,
          paramLength,
          buffer,
          bufferLength,
          resultObj
        );
        AgoraConsole.log(`[callIrisApi][result] ${func_name} ret ${ret.code}`);
        return ret;
      } else {
        AgoraConsole.error(
          `[callIrisApi][result] ${func_name} not found in ${className}Dispatch`
        );
        return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED;
      }
    } else {
      AgoraConsole.error(
        `[callIrisApi][result] ${className} not found in DispatchsMap`
      );
      return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED;
    }
  }

  public async callIrisApiAsync(
    apiParam: ApiParam
  ): Promise<CallIrisApiResult> {
    let func_name = apiParam.event;
    let array = func_name.split('_');
    let className = array[0];
    let funName = array[1];
    let buffer = apiParam.buffer;

    AgoraConsole.log(`[callIrisApiAsync][start] ${JSON.stringify(apiParam)}`);
    let obj = this.implDispatchsMap.get(className);
    if (obj) {
      let callApiFun: CallApiAsyncType = obj[funName];
      if (callApiFun) {
        let ret = await callApiFun.call(obj, apiParam);
        AgoraConsole.debug(
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

  public setEventHandler(event_handler: IrisEventHandler) {
    console.log(`IrisRtcEngine setEventHandler ${event_handler}`);
    console.log(`IrisRtcEngine setEventHandler 3333 ${event_handler}`);
    this._eventHandler = event_handler;
  }

  public setGenerateVideoTrackLabelOrHtmlElementCb(
    cb: GenerateVideoTrackLabelOrHtmlElementCb
  ) {
    this._generateVideoTrackLabelOrHtmlElementCb = cb;
  }

  public getEventHandler(): IrisEventHandler {
    return this._eventHandler;
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

  public async destruction() {
    this.agoraEventHandler.destruction();

    await this.entitiesContainer.destruction();
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
    await this.destruction();
    return Promise.resolve();
  }
}
