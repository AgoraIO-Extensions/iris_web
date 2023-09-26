import { UID } from 'agora-rtc-sdk-ng';

import {
  IrisCVideoFrameBuffer,
  IrisVideoFrameBufferConfig,
  IrisVideoFrameBufferDelegateHandle,
  Size,
  VideoParams,
} from '../base/BaseType';

import { IrisRtcEngine } from './IrisRtcEngine';

interface VideoFrameBufferAndConf {
  buffer: IrisCVideoFrameBuffer;
  conf: IrisVideoFrameBufferConfig;
}

export class IrisVideoFrameBufferManager {
  private _configMap: Map<string, VideoFrameBufferAndConf> = new Map<
    string,
    VideoFrameBufferAndConf
  >();
  private _sizeMap: Map<string, Size> = new Map<string, Size>();
  private _scheduleHandle: any = null;
  private _engine: IrisRtcEngine = null;

  setEngine(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  public enableVideoFrameBufferByConfig(
    buffer: IrisCVideoFrameBuffer,
    config: IrisVideoFrameBufferConfig
  ): IrisVideoFrameBufferDelegateHandle {
    let key: string = this.getConfigKey(config);
    this._configMap.set(key, { buffer: buffer, conf: config });
    let handle: IrisVideoFrameBufferDelegateHandle = config;

    //todo 订阅流，或者不订阅流

    return handle;
  }

  public disableVideoFrameBufferByDelegate(
    handle: IrisVideoFrameBufferDelegateHandle
  ) {
    let config: IrisVideoFrameBufferDelegateHandle = handle;
    this.disableVideoFrameBufferByConfig(config);
  }

  public disableVideoFrameBufferByConfig(config: IrisVideoFrameBufferConfig) {
    let key: string = this.getConfigKey(config);
    if (this._configMap.has(key)) this._configMap.delete(key);

    //todo 订阅流，或者不订阅流
  }

  public disableAllVideoFrameBuffer() {
    this._configMap.clear();

    //todo 订阅流，或者不订阅流
  }

  public getVideoFrame(uid: UID, channel_id: string): VideoParams {
    return this._engine?.getVideoFrame(uid, channel_id);
  }

  public getVideoFrameByConfig(
    config: IrisVideoFrameBufferConfig
  ): VideoParams {
    return this._engine.getVideoFrameByConfig(config);
  }

  public destruction() {
    this._configMap.clear();
    if (this._scheduleHandle != null) {
      clearInterval(this._scheduleHandle);
      this._scheduleHandle = null;
    }
    this._engine = null;
  }

  private getConfigKey(config: IrisVideoFrameBufferConfig): string {
    return config.type.toString() + '_' + config.id + '_' + config.key;
  }

  private upgradeScheduleState() {
    let callBacks: number = 0;
    this._configMap.forEach((val: VideoFrameBufferAndConf, key: string) => {
      if (val.buffer.OnVideoFrameReceived != null) callBacks++;
    });

    if (this._scheduleHandle == null) {
      if (callBacks > 0) {
        this._scheduleHandle = setInterval(this.update.bind(this), 16);
      }
    } else {
      if (callBacks <= 0) {
        clearInterval(this._scheduleHandle);
        this._scheduleHandle = null;
      }
    }
  }

  private update(dt: number) {
    //每16毫秒触发回调
    this._configMap.forEach((val: VideoFrameBufferAndConf, key: string) => {
      if (val.buffer.OnVideoFrameReceived != null) {
        var config = val.conf;
        let videoParams: VideoParams = this.getVideoFrameByConfig(config);
        if (videoParams != null) {
          let resize = false;
          let curWidth = 0;
          let curHeight = 0;

          if (this._sizeMap.has(key)) {
            let size: Size = this._sizeMap.get(key);
            curWidth = (videoParams.video_track as any)._videoWidth;
            curHeight = (videoParams.video_track as any)._videoHeight;

            resize = size.width != curWidth || size.height != curHeight;
          } else {
            resize = true;
          }
          val.buffer.OnVideoFrameReceived(
            videoParams.video_track,
            config,
            resize
          );
          this._sizeMap.set(key, { width: curWidth, height: curHeight });
        }
      }
    });
  }
}
