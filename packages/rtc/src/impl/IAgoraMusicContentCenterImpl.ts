import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { CallApiReturnType } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { AgoraConsole } from '../util/AgoraConsole';

export class IMusicContentCenterImpl implements NATIVE_RTC.IMusicContentCenter {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  initialize(
    configuration: NATIVE_RTC.MusicContentCenterConfiguration
  ): CallApiReturnType {
    AgoraConsole.warn('initialize not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  renewToken(token: string): CallApiReturnType {
    AgoraConsole.warn('renewToken not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  release(): CallApiReturnType {
    AgoraConsole.warn('release not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  registerEventHandler(
    eventHandler: NATIVE_RTC.IMusicContentCenterEventHandler
  ): CallApiReturnType {
    AgoraConsole.warn('registerEventHandler not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  unregisterEventHandler(): CallApiReturnType {
    AgoraConsole.warn('unregisterEventHandler not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  createMusicPlayer(): CallApiReturnType {
    AgoraConsole.warn('createMusicPlayer not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getMusicCharts(requestId: string): CallApiReturnType {
    AgoraConsole.warn('getMusicCharts not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getMusicCollectionByMusicChartId(
    requestId: string,
    musicChartId: number,
    page: number,
    pageSize: number,
    jsonOption: string
  ): CallApiReturnType {
    AgoraConsole.warn(
      'getMusicCollectionByMusicChartId not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  searchMusic(
    requestId: string,
    keyWord: string,
    page: number,
    pageSize: number,
    jsonOption: string
  ): CallApiReturnType {
    AgoraConsole.warn('searchMusic not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  preload(songCode: number, jsonOption: string): CallApiReturnType {
    AgoraConsole.warn('preload not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  preload2(requestId: string, songCode: number): CallApiReturnType {
    AgoraConsole.warn('preload2 not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  removeCache(songCode: number): CallApiReturnType {
    AgoraConsole.warn('removeCache not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getCaches(
    cacheInfo: NATIVE_RTC.MusicCacheInfo[],
    cacheInfoSize: number[]
  ): CallApiReturnType {
    AgoraConsole.warn('getCaches not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  isPreloaded(songCode: number): CallApiReturnType {
    AgoraConsole.warn('isPreloaded not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getLyric(
    requestId: string,
    songCode: number,
    LyricType: number
  ): CallApiReturnType {
    AgoraConsole.warn('getLyric not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getSongSimpleInfo(requestId: string, songCode: number): CallApiReturnType {
    AgoraConsole.warn('getSongSimpleInfo not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getInternalSongCode(
    songCode: number,
    jsonOption: string,
    internalSongCode: number
  ): CallApiReturnType {
    AgoraConsole.warn('getInternalSongCode not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
}

export class MusicChartCollectionImpl
  implements NATIVE_RTC.MusicChartCollection {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  getCount(): CallApiReturnType {
    AgoraConsole.warn('getCount not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  get(index: number): CallApiReturnType {
    AgoraConsole.warn('get not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
}

export class IMusicPlayerImpl implements NATIVE_RTC.IMusicPlayer {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }
}

export class MusicCollectionImpl implements NATIVE_RTC.MusicCollection {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  getCount(): CallApiReturnType {
    AgoraConsole.warn('getCount not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getTotal(): CallApiReturnType {
    AgoraConsole.warn('getTotal not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getPage(): CallApiReturnType {
    AgoraConsole.warn('getPage not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getPageSize(): CallApiReturnType {
    AgoraConsole.warn('getPageSize not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  getMusic(index: number): CallApiReturnType {
    AgoraConsole.warn('getMusic not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
}
