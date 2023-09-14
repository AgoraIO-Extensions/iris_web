import { CallApiReturnType } from 'iris-web-core';
import * as NATIVE_RTC from 'iris-web-rtc';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util/AgoraActionQueue';

export class IMediaPlayerCacheManagerImpl
  implements NATIVE_RTC.IMediaPlayerCacheManager {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }
  removeAllCaches(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  removeOldCache(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  removeCacheByUri(uri: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setCacheDir(path: string): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setMaxCacheFileCount(count: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setMaxCacheFileSize(cacheSize: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableAutoRemoveCache(enable: boolean): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getCacheDir(path: string, length: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getMaxCacheFileCount(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getMaxCacheFileSize(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  getCacheFileCount(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  //IMediaPlayer
}
