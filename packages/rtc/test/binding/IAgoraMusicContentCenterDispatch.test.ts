/// Generated by terra, DO NOT MODIFY BY HAND.

import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { CallIrisApiResult, IrisApiEngine, IrisCore } from 'iris-web-core';

import { IrisWebRtc } from '../../src/IrisRtcApi';
import { IrisRtcEngine } from '../engine/IrisRtcEngine';

const bindingAPI = require('../../src/binding/IAgoraMusicContentCenterDispatch');

let apiEnginePtr: IrisApiEngine;
let irisRtcEngine: IrisRtcEngine;
beforeAll(async () => {
  apiEnginePtr = IrisCore.createIrisApiEngine();
  IrisWebRtc.initIrisRtc(apiEnginePtr);
  irisRtcEngine = apiEnginePtr['apiInterceptors'][0];
  irisRtcEngine.implHelper.createAudioTrack = jest.fn();
  let nParam = {
    context: 'test',
  };
  let apiParam = new IrisCore.EventParam(
    'RtcEngine_initialize',
    JSON.stringify(nParam),
    0,
    '',
    ['test'],
    [],
    1
  );
  await IrisCore.callIrisApi(apiEnginePtr, apiParam);
});

afterAll(() => {
  IrisCore.disposeIrisApiEngine(apiEnginePtr);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('MusicChartCollection', () => {
  test('getCount impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicChartCollection')._impl,
        'getCount'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'MusicChartCollection_getCount',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicChartCollection')._impl.getCount
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('get impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicChartCollection')._impl,
        'get'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      index: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicChartCollection_get',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicChartCollection')._impl.get
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
describe('MusicCollection', () => {
  test('getCount impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicCollection')._impl,
        'getCount'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'MusicCollection_getCount',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicCollection')._impl.getCount
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('getTotal impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicCollection')._impl,
        'getTotal'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'MusicCollection_getTotal',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicCollection')._impl.getTotal
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('getPage impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicCollection')._impl,
        'getPage'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'MusicCollection_getPage',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicCollection')._impl.getPage
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('getPageSize impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicCollection')._impl,
        'getPageSize'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'MusicCollection_getPageSize',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicCollection')._impl.getPageSize
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('getMusic impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicCollection')._impl,
        'getMusic'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      index: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicCollection_getMusic',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicCollection')._impl.getMusic
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
describe('IMusicContentCenterEventHandler', () => {
  test('onMusicChartsResult impl call', async () => {
    let eventHandler = new bindingAPI.IMusicContentCenterEventHandler(
      irisRtcEngine
    );
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest.spyOn(eventHandler, 'eventKey');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onMusicChartsResult(undefined, undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(eventHandler.eventKey).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('onMusicCollectionResult impl call', async () => {
    let eventHandler = new bindingAPI.IMusicContentCenterEventHandler(
      irisRtcEngine
    );
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest.spyOn(eventHandler, 'eventKey');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onMusicCollectionResult(undefined, undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(eventHandler.eventKey).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('onLyricResult impl call', async () => {
    let eventHandler = new bindingAPI.IMusicContentCenterEventHandler(
      irisRtcEngine
    );
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest.spyOn(eventHandler, 'eventKey');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onLyricResult(undefined, undefined, undefined, undefined);
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(eventHandler.eventKey).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('onSongSimpleInfoResult impl call', async () => {
    let eventHandler = new bindingAPI.IMusicContentCenterEventHandler(
      irisRtcEngine
    );
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest.spyOn(eventHandler, 'eventKey');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onSongSimpleInfoResult(
      undefined,
      undefined,
      undefined,
      undefined
    );
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(eventHandler.eventKey).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
  test('onPreLoadEvent impl call', async () => {
    let eventHandler = new bindingAPI.IMusicContentCenterEventHandler(
      irisRtcEngine
    );
    jest.spyOn(eventHandler._engine.irisEventHandlerManager, 'notifyEvent');
    jest.spyOn(eventHandler, 'eventKey');
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    eventHandler.onPreLoadEvent(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
    expect(
      eventHandler._engine.irisEventHandlerManager.notifyEvent
    ).toBeCalledTimes(0);
    expect(eventHandler.eventKey).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
describe('IMusicPlayer', () => {});
describe('IMusicContentCenter', () => {
  test('initialize impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'initialize'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      configuration: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_initialize',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl.initialize
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('renewToken impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'renewToken'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      token: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_renewToken',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl.renewToken
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('release impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'release'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_release',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl.release
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('registerEventHandler impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'registerEventHandler'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      eventHandler: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_registerEventHandler',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl
        .registerEventHandler
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('unregisterEventHandler impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'unregisterEventHandler'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_unregisterEventHandler',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl
        .unregisterEventHandler
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('createMusicPlayer impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'createMusicPlayer'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {};
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_createMusicPlayer',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl
        .createMusicPlayer
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('getMusicCharts impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'getMusicCharts'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      requestId: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_getMusicCharts',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl
        .getMusicCharts
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('getMusicCollectionByMusicChartId impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'getMusicCollectionByMusicChartId'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      requestId: 'test',
      musicChartId: 'test',
      page: 'test',
      pageSize: 'test',
      jsonOption: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_getMusicCollectionByMusicChartId',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl
        .getMusicCollectionByMusicChartId
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('searchMusic impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'searchMusic'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      requestId: 'test',
      keyWord: 'test',
      page: 'test',
      pageSize: 'test',
      jsonOption: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_searchMusic',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl
        .searchMusic
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('preload impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'preload'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      songCode: 'test',
      jsonOption: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_preload',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl.preload
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('preload2 impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'preload2'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      requestId: 'test',
      songCode: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_preload2',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl.preload2
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('removeCache impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'removeCache'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      songCode: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_removeCache',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl
        .removeCache
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('getCaches impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'getCaches'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      cacheInfo: 'test',
      cacheInfoSize: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_getCaches',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl.getCaches
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('isPreloaded impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'isPreloaded'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      songCode: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_isPreloaded',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl
        .isPreloaded
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('getLyric impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'getLyric'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      requestId: 'test',
      songCode: 'test',
      LyricType: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_getLyric',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl.getLyric
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('getSongSimpleInfo impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'getSongSimpleInfo'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      requestId: 'test',
      songCode: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_getSongSimpleInfo',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl
        .getSongSimpleInfo
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });

  test('getInternalSongCode impl call', async () => {
    jest
      .spyOn(
        irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl,
        'getInternalSongCode'
      )
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    jest
      .spyOn(irisRtcEngine, 'returnResult')
      .mockResolvedValue(new CallIrisApiResult(0, ''));
    let nParam = {
      songCode: 'test',
      jsonOption: 'test',
      internalSongCode: 'test',
    };
    let apiParam = new IrisCore.EventParam(
      'MusicContentCenter_getInternalSongCode',
      JSON.stringify(nParam),
      0,
      '',
      ['test'],
      [],
      1
    );
    await IrisCore.callIrisApi(apiEnginePtr, apiParam);
    expect(
      irisRtcEngine.implDispatchesMap.get('MusicContentCenter')._impl
        .getInternalSongCode
    ).toBeCalledTimes(0);
    expect(irisRtcEngine.returnResult).toBeCalledTimes(1);
    expect(irisRtcEngine.returnResult).toBeCalledWith(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  });
});
