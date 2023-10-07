/// Generated by terra, DO NOT MODIFY BY HAND.

import { ApiParam, CallApiReturnType, EventParam } from 'iris-web-core';
import { AgoraConsole } from '../util/AgoraConsole';

export class MusicChartCollectionDispatch{
    _impl: MusicChartCollectionImpl;
    
    constructor(engine: IrisRtcEngine) {
      this._impl = new MusicChartCollectionImpl(engine);
    }
  getCount(
    
    
    ): CallApiReturnType {

    return this._impl.getCount();
  }

  get(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let index = obj.index;
    if (index === undefined) throw "index is undefined";

    return this._impl.get(index,);
  }

}

export class MusicCollectionDispatch{
    _impl: MusicCollectionImpl;
    
    constructor(engine: IrisRtcEngine) {
      this._impl = new MusicCollectionImpl(engine);
    }
  getCount(
    
    
    ): CallApiReturnType {

    return this._impl.getCount();
  }

  getTotal(
    
    
    ): CallApiReturnType {

    return this._impl.getTotal();
  }

  getPage(
    
    
    ): CallApiReturnType {

    return this._impl.getPage();
  }

  getPageSize(
    
    
    ): CallApiReturnType {

    return this._impl.getPageSize();
  }

  getMusic(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let index = obj.index;
    if (index === undefined) throw "index is undefined";

    return this._impl.getMusic(index,);
  }

}

export class IMusicContentCenterEventHandler {
  classPrefix: string = "MusicContentCenterEventHandler_";

  _engine: IrisRtcEngine = null;

  constructor(engine: IrisRtcEngine) {
      this._engine = engine;
  }

  eventKey(event: string): string {
      return `${this.classPrefix}${event}`;
  }

  notifyEvent(param: EventParam): void {
      this._engine.irisEventHandlerManager.notifyEvent("RtcEngine", param);
  }

    onMusicChartsResult(requestId:string,result:MusicChartCollection,errorCode:MusicContentCenterStatusCode,): void {
      let _obj = {
        requestId,result,errorCode,
      };
      let _json = JSON.stringify(_obj);
      let _key = this.eventKey('onMusicChartsResult');

      let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
      AgoraConsole.log(`onMusicChartsResult eventParam ${JSON.stringify(eventParam)}`);
      this.notifyEvent(eventParam);
    }

    onMusicCollectionResult(requestId:string,result:MusicCollection,errorCode:MusicContentCenterStatusCode,): void {
      let _obj = {
        requestId,result,errorCode,
      };
      let _json = JSON.stringify(_obj);
      let _key = this.eventKey('onMusicCollectionResult');

      let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
      AgoraConsole.log(`onMusicCollectionResult eventParam ${JSON.stringify(eventParam)}`);
      this.notifyEvent(eventParam);
    }

    onLyricResult(requestId:string,songCode:number,lyricUrl:string,errorCode:MusicContentCenterStatusCode,): void {
      let _obj = {
        requestId,songCode,lyricUrl,errorCode,
      };
      let _json = JSON.stringify(_obj);
      let _key = this.eventKey('onLyricResult');

      let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
      AgoraConsole.log(`onLyricResult eventParam ${JSON.stringify(eventParam)}`);
      this.notifyEvent(eventParam);
    }

    onSongSimpleInfoResult(requestId:string,songCode:number,simpleInfo:string,errorCode:MusicContentCenterStatusCode,): void {
      let _obj = {
        requestId,songCode,simpleInfo,errorCode,
      };
      let _json = JSON.stringify(_obj);
      let _key = this.eventKey('onSongSimpleInfoResult');

      let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
      AgoraConsole.log(`onSongSimpleInfoResult eventParam ${JSON.stringify(eventParam)}`);
      this.notifyEvent(eventParam);
    }

    onPreLoadEvent(requestId:string,songCode:number,percent:number,lyricUrl:string,status:PreloadStatusCode,errorCode:MusicContentCenterStatusCode,): void {
      let _obj = {
        requestId,songCode,percent,lyricUrl,status,errorCode,
      };
      let _json = JSON.stringify(_obj);
      let _key = this.eventKey('onPreLoadEvent');

      let eventParam = new EventParam(_key, _json, 0, '', [], [], 0);
      AgoraConsole.log(`onPreLoadEvent eventParam ${JSON.stringify(eventParam)}`);
      this.notifyEvent(eventParam);
    }

}

export class IMusicPlayerDispatch{
    _impl: IMusicPlayerImpl;
    
    constructor(engine: IrisRtcEngine) {
      this._impl = new IMusicPlayerImpl(engine);
    }
}

export class IMusicContentCenterDispatch{
    _impl: IMusicContentCenterImpl;
    
    constructor(engine: IrisRtcEngine) {
      this._impl = new IMusicContentCenterImpl(engine);
    }
  initialize(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let configuration = obj.configuration;
    if (configuration === undefined) throw "configuration is undefined";

    return this._impl.initialize(configuration,);
  }

  renewToken(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let token = obj.token;
    if (token === undefined) throw "token is undefined";

    return this._impl.renewToken(token,);
  }

  release(
    
    
    ): CallApiReturnType {

    return this._impl.release();
  }

  registerEventHandler(
    apiParam: ApiParam
    
    ): CallApiReturnType {
    let eventHandler = apiParam.buffer[0]; //obj.eventHandler;
    if (eventHandler === undefined) throw 'eventHandler is undefined';
    return this._impl.registerEventHandler(eventHandler);
  }

  unregisterEventHandler(
    apiParam: ApiParam
    
    ): CallApiReturnType {
    let eventHandler = apiParam.buffer[0]; //obj.eventHandler;
    if (eventHandler === undefined) throw 'eventHandler is undefined';
    return this._impl.registerEventHandler(eventHandler);
  }

  createMusicPlayer(
    
    
    ): CallApiReturnType {

    return this._impl.createMusicPlayer();
  }

  getMusicCharts(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let requestId = obj.requestId;
    if (requestId === undefined) throw "requestId is undefined";

    return this._impl.getMusicCharts(requestId,);
  }

  getMusicCollectionByMusicChartId(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let requestId = obj.requestId;
    if (requestId === undefined) throw "requestId is undefined";
    let musicChartId = obj.musicChartId;
    if (musicChartId === undefined) throw "musicChartId is undefined";
    let page = obj.page;
    if (page === undefined) throw "page is undefined";
    let pageSize = obj.pageSize;
    if (pageSize === undefined) throw "pageSize is undefined";
    let jsonOption = obj.jsonOption;
    if (jsonOption === undefined) throw "jsonOption is undefined";

    return this._impl.getMusicCollectionByMusicChartId(requestId,musicChartId,page,pageSize,jsonOption,);
  }

  searchMusic(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let requestId = obj.requestId;
    if (requestId === undefined) throw "requestId is undefined";
    let keyWord = obj.keyWord;
    if (keyWord === undefined) throw "keyWord is undefined";
    let page = obj.page;
    if (page === undefined) throw "page is undefined";
    let pageSize = obj.pageSize;
    if (pageSize === undefined) throw "pageSize is undefined";
    let jsonOption = obj.jsonOption;
    if (jsonOption === undefined) throw "jsonOption is undefined";

    return this._impl.searchMusic(requestId,keyWord,page,pageSize,jsonOption,);
  }

  preload(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let songCode = obj.songCode;
    if (songCode === undefined) throw "songCode is undefined";
    let jsonOption = obj.jsonOption;
    if (jsonOption === undefined) throw "jsonOption is undefined";

    return this._impl.preload(songCode,jsonOption,);
  }

  preload2(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let requestId = obj.requestId;
    if (requestId === undefined) throw "requestId is undefined";
    let songCode = obj.songCode;
    if (songCode === undefined) throw "songCode is undefined";

    return this._impl.preload2(requestId,songCode,);
  }

  removeCache(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let songCode = obj.songCode;
    if (songCode === undefined) throw "songCode is undefined";

    return this._impl.removeCache(songCode,);
  }

  getCaches(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let cacheInfo = obj.cacheInfo;
    if (cacheInfo === undefined) throw "cacheInfo is undefined";
    let cacheInfoSize = obj.cacheInfoSize;
    if (cacheInfoSize === undefined) throw "cacheInfoSize is undefined";

    return this._impl.getCaches(cacheInfo,cacheInfoSize,);
  }

  isPreloaded(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let songCode = obj.songCode;
    if (songCode === undefined) throw "songCode is undefined";

    return this._impl.isPreloaded(songCode,);
  }

  getLyric(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let requestId = obj.requestId;
    if (requestId === undefined) throw "requestId is undefined";
    let songCode = obj.songCode;
    if (songCode === undefined) throw "songCode is undefined";
    let LyricType = obj.LyricType;
    if (LyricType === undefined) throw "LyricType is undefined";

    return this._impl.getLyric(requestId,songCode,LyricType,);
  }

  getSongSimpleInfo(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let requestId = obj.requestId;
    if (requestId === undefined) throw "requestId is undefined";
    let songCode = obj.songCode;
    if (songCode === undefined) throw "songCode is undefined";

    return this._impl.getSongSimpleInfo(requestId,songCode,);
  }

  getInternalSongCode(
    
    apiParam: ApiParam
    ): CallApiReturnType {
    let obj = JSON.parse(apiParam.data) as any;
    let songCode = obj.songCode;
    if (songCode === undefined) throw "songCode is undefined";
    let jsonOption = obj.jsonOption;
    if (jsonOption === undefined) throw "jsonOption is undefined";
    let internalSongCode = obj.internalSongCode;
    if (internalSongCode === undefined) throw "internalSongCode is undefined";

    return this._impl.getInternalSongCode(songCode,jsonOption,internalSongCode,);
  }

}
