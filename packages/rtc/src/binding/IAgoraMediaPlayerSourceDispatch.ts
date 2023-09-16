/// Generated by terra, DO NOT MODIFY BY HAND.

import {
  MEDIA_PLAYER_ERROR,
  MEDIA_PLAYER_EVENT,
  MEDIA_PLAYER_STATE,
  PLAYER_PRELOAD_EVENT,
  PlayerUpdatedInfo,
  SrcInfo,
} from '@iris/web-rtc';
import { EventParam } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';

export class IMediaPlayerSourceObserver {
  classPrefix: string = 'IMediaPlayerSourceObserver_';

  _engine: IrisRtcEngine = null;

  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  eventKey(event: string): string {
    return `${this.classPrefix}${event}`;
  }

  notifyEvent(param: EventParam): void {
    this._engine.irisEventHandlerManager.notifyEvent('RtcEngine', param);
  }

  onPlayerSourceStateChanged(
    state: MEDIA_PLAYER_STATE,
    ec: MEDIA_PLAYER_ERROR
  ): void {
    let _obj = {
      state,
      ec,
    };
    let _json = JSON.stringify(_obj);
    let _key = this.eventKey('onPlayerSourceStateChanged');

    let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
    console.log(
      `onPlayerSourceStateChanged eventParam ${JSON.stringify(eventParam)}`
    );
    this.notifyEvent(eventParam);
  }

  onPositionChanged(position_ms: number): void {
    let _obj = {
      position_ms,
    };
    let _json = JSON.stringify(_obj);
    let _key = this.eventKey('onPositionChanged');

    let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
    console.log(`onPositionChanged eventParam ${JSON.stringify(eventParam)}`);
    this.notifyEvent(eventParam);
  }

  onPlayerEvent(
    eventCode: MEDIA_PLAYER_EVENT,
    elapsedTime: number,
    message: string
  ): void {
    let _obj = {
      eventCode,
      elapsedTime,
      message,
    };
    let _json = JSON.stringify(_obj);
    let _key = this.eventKey('onPlayerEvent');

    let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
    console.log(`onPlayerEvent eventParam ${JSON.stringify(eventParam)}`);
    this.notifyEvent(eventParam);
  }

  onMetaData(data: void[], length: number): void {
    let _obj = {
      data,
      length,
    };
    let _json = JSON.stringify(_obj);
    let _key = this.eventKey('onMetaData');

    let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
    console.log(`onMetaData eventParam ${JSON.stringify(eventParam)}`);
    this.notifyEvent(eventParam);
  }

  onPlayBufferUpdated(playCachedBuffer: number): void {
    let _obj = {
      playCachedBuffer,
    };
    let _json = JSON.stringify(_obj);
    let _key = this.eventKey('onPlayBufferUpdated');

    let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
    console.log(`onPlayBufferUpdated eventParam ${JSON.stringify(eventParam)}`);
    this.notifyEvent(eventParam);
  }

  onPreloadEvent(src: string, event: PLAYER_PRELOAD_EVENT): void {
    let _obj = {
      src,
      event,
    };
    let _json = JSON.stringify(_obj);
    let _key = this.eventKey('onPreloadEvent');

    let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
    console.log(`onPreloadEvent eventParam ${JSON.stringify(eventParam)}`);
    this.notifyEvent(eventParam);
  }

  onCompleted(): void {
    let _obj = {};
    let _json = JSON.stringify(_obj);
    let _key = this.eventKey('onCompleted');

    let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
    console.log(`onCompleted eventParam ${JSON.stringify(eventParam)}`);
    this.notifyEvent(eventParam);
  }

  onAgoraCDNTokenWillExpire(): void {
    let _obj = {};
    let _json = JSON.stringify(_obj);
    let _key = this.eventKey('onAgoraCDNTokenWillExpire');

    let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
    console.log(
      `onAgoraCDNTokenWillExpire eventParam ${JSON.stringify(eventParam)}`
    );
    this.notifyEvent(eventParam);
  }

  onPlayerSrcInfoChanged(from: SrcInfo, to: SrcInfo): void {
    let _obj = {
      from,
      to,
    };
    let _json = JSON.stringify(_obj);
    let _key = this.eventKey('onPlayerSrcInfoChanged');

    let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
    console.log(
      `onPlayerSrcInfoChanged eventParam ${JSON.stringify(eventParam)}`
    );
    this.notifyEvent(eventParam);
  }

  onPlayerInfoUpdated(info: PlayerUpdatedInfo): void {
    let _obj = {
      info,
    };
    let _json = JSON.stringify(_obj);
    let _key = this.eventKey('onPlayerInfoUpdated');

    let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
    console.log(`onPlayerInfoUpdated eventParam ${JSON.stringify(eventParam)}`);
    this.notifyEvent(eventParam);
  }

  onAudioVolumeIndication(volume: number): void {
    let _obj = {
      volume,
    };
    let _json = JSON.stringify(_obj);
    let _key = this.eventKey('onAudioVolumeIndication');

    let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
    console.log(
      `onAudioVolumeIndication eventParam ${JSON.stringify(eventParam)}`
    );
    this.notifyEvent(eventParam);
  }
}
