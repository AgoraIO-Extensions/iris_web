/// Generated by terra, DO NOT MODIFY BY HAND.

import { CallApiReturnType } from 'iris-web-core';

export enum PreloadStatusCode {
  kPreloadStatusCompleted = 0,
  kPreloadStatusFailed = 1,
  kPreloadStatusPreloading = 2,
  kPreloadStatusRemoved = 3,
}

export enum MusicContentCenterStatusCode {
  kMusicContentCenterStatusOk = 0,
  kMusicContentCenterStatusErr = 1,
  kMusicContentCenterStatusErrGateway = 2,
  kMusicContentCenterStatusErrPermissionAndResource = 3,
  kMusicContentCenterStatusErrInternalDataParse = 4,
  kMusicContentCenterStatusErrMusicLoading = 5,
  kMusicContentCenterStatusErrMusicDecryption = 6,
  kMusicContentCenterStatusErrHttpInternalError = 7,
}

export class MusicChartInfo {
  chartName?: string;

  id?: number;
}

export enum MUSIC_CACHE_STATUS_TYPE {
  MUSIC_CACHE_STATUS_TYPE_CACHED = 0,
  MUSIC_CACHE_STATUS_TYPE_CACHING = 1,
}

export class MusicCacheInfo {
  songCode?: number;

  status?: MUSIC_CACHE_STATUS_TYPE;
}

export interface MusicChartCollection {
  getCount(): CallApiReturnType;

  get(index: number): CallApiReturnType;
}

export class MvProperty {
  resolution?: string;

  bandwidth?: string;
}

export class ClimaxSegment {
  startTimeMs?: number;

  endTimeMs?: number;
}

export class Music {
  songCode?: number;

  name?: string;

  singer?: string;

  poster?: string;

  releaseTime?: string;

  durationS?: number;

  type?: number;

  pitchType?: number;

  lyricCount?: number;

  lyricList?: number;

  climaxSegmentCount?: number;

  climaxSegmentList?: ClimaxSegment;

  mvPropertyCount?: number;

  mvPropertyList?: MvProperty;
}

export interface MusicCollection {
  getCount(): CallApiReturnType;

  getTotal(): CallApiReturnType;

  getPage(): CallApiReturnType;

  getPageSize(): CallApiReturnType;

  getMusic(index: number): CallApiReturnType;
}

export interface IMusicContentCenterEventHandler {
  onMusicChartsResult(
    requestId: string,
    result: MusicChartCollection,
    errorCode: MusicContentCenterStatusCode
  ): void;

  onMusicCollectionResult(
    requestId: string,
    result: MusicCollection,
    errorCode: MusicContentCenterStatusCode
  ): void;

  onLyricResult(
    requestId: string,
    songCode: number,
    lyricUrl: string,
    errorCode: MusicContentCenterStatusCode
  ): void;

  onSongSimpleInfoResult(
    requestId: string,
    songCode: number,
    simpleInfo: string,
    errorCode: MusicContentCenterStatusCode
  ): void;

  onPreLoadEvent(
    requestId: string,
    songCode: number,
    percent: number,
    lyricUrl: string,
    status: PreloadStatusCode,
    errorCode: MusicContentCenterStatusCode
  ): void;
}

export class MusicContentCenterConfiguration {
  appId?: string;

  token?: string;

  mccUid?: number;

  maxCacheSize?: number;

  mccDomain?: string;
}

export interface IMusicPlayer {}

export interface IMusicContentCenter {
  initialize(configuration: MusicContentCenterConfiguration): CallApiReturnType;

  renewToken(token: string): CallApiReturnType;

  release(): CallApiReturnType;

  registerEventHandler(
    eventHandler: IMusicContentCenterEventHandler
  ): CallApiReturnType;

  unregisterEventHandler(): CallApiReturnType;

  createMusicPlayer(): CallApiReturnType;

  getMusicCharts(requestId: string): CallApiReturnType;

  getMusicCollectionByMusicChartId(
    requestId: string,
    musicChartId: number,
    page: number,
    pageSize: number,
    jsonOption: string
  ): CallApiReturnType;

  searchMusic(
    requestId: string,
    keyWord: string,
    page: number,
    pageSize: number,
    jsonOption: string
  ): CallApiReturnType;

  preload(songCode: number, jsonOption: string): CallApiReturnType;

  preload2(requestId: string, songCode: number): CallApiReturnType;

  removeCache(songCode: number): CallApiReturnType;

  getCaches(
    cacheInfo: MusicCacheInfo,
    cacheInfoSize: number
  ): CallApiReturnType;

  isPreloaded(songCode: number): CallApiReturnType;

  getLyric(
    requestId: string,
    songCode: number,
    LyricType: number
  ): CallApiReturnType;

  getSongSimpleInfo(requestId: string, songCode: number): CallApiReturnType;

  getInternalSongCode(
    songCode: number,
    jsonOption: string,
    internalSongCode: number
  ): CallApiReturnType;
}
