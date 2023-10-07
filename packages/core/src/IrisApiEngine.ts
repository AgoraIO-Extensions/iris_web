import { IrisApiEngineImpl, IrisEventHandlerImpl } from './IrisApiEngineImpl';

export class CallIrisApiResult {
  public constructor(
    public readonly code: number,
    public readonly data: string
  ) {}

  public static success(
    irisReturnCode: number = 0,
    resultCode: number = 0,
    rawResult?: string
  ): CallIrisApiResult {
    let result: string;
    if (rawResult) {
      result = rawResult;
    } else {
      result = `{"result": ${resultCode}}`;
    }
    return new CallIrisApiResult(irisReturnCode, result);
  }

  public static failed(
    irisReturnCode: number,
    resultCode: number = 0,
    rawResult?: string
  ): CallIrisApiResult {
    let result: string;
    if (rawResult) {
      result = rawResult;
    } else {
      result = `{"result": ${resultCode}}`;
    }
    return new CallIrisApiResult(irisReturnCode, result);
  }
}

export type CallApiReturnType = number | Promise<CallIrisApiResult>;

export type AsyncTaskType = () => Promise<CallIrisApiResult>;

export type ApiInterceptorReturnType = Promise<CallIrisApiResult> | undefined;

// export interface IrisEventHandlerHandle {
//     id: number;
//     eventHandler: IrisEventHandler;
// }

export type IrisEventHandlerFunc = (param: EventParam) => void;

export interface IrisEventHandler {
  onEvent(param: EventParam): void;
}

export interface IrisEventHandlerManager {
  notifyEvent(key: string, param: EventParam): void;

  addEventHandler(key: string, eventHandler: IrisEventHandler): void;

  removeEventHandler(key: string, eventHandler: IrisEventHandler): void;
}

export interface ApiInterceptor {
  intercept(apiParam: ApiParam): ApiInterceptorReturnType;

  dispose(): Promise<void>;
}

export class EventParam {
  constructor(
    event: string,
    data: string,
    data_size: number,
    result: string,
    buffer: Array<any>,
    length: Array<number>,
    buffer_count: number,
    eventHandle: string = '0'
  ) {
    this.event = event;
    this.data = data;
    this.data_size = data_size;
    this.result = result;
    this.buffer = buffer;
    this.length = length;
    this.buffer_count = buffer_count;
    this.eventHandle = eventHandle;
  }

  event: string;
  data: string;
  data_size: number;
  result: string;
  buffer: Array<any>;
  length: Array<number>;
  buffer_count: number;
  eventHandle: string;
}

export type ApiParam = EventParam;

export interface IrisApiEngine {
  getIrisEventHandlerManager(): IrisEventHandlerManager;

  callIrisApi(apiParam: ApiParam): Promise<CallIrisApiResult>;

  addApiInterceptor(interceptor: ApiInterceptor): void;

  removeApiInterceptor(interceptor: ApiInterceptor): void;

  dispose(): Promise<void>;
}

export function createIrisApiEngine(): IrisApiEngineImpl {
  return new IrisApiEngineImpl();
}

export function disposeIrisApiEngine(engine_ptr: IrisApiEngine): number {
  engine_ptr.dispose();
  // IrisApiEngine.instance = null;
  return 0;
}

export function callIrisApi(
  apiEngine: IrisApiEngine,
  apiParam: ApiParam
): Promise<CallIrisApiResult> {
  return apiEngine.callIrisApi(apiParam);
}

export function createIrisEventHandler(
  event_handler: IrisEventHandlerFunc
): IrisEventHandler {
  return IrisEventHandlerImpl.create(event_handler);
}

export let IrisCore = {
  createIrisApiEngine: createIrisApiEngine,
  disposeIrisApiEngine: disposeIrisApiEngine,
  callIrisApi: callIrisApi,
  createIrisEventHandler: createIrisEventHandler,

  CallIrisApiResult: CallIrisApiResult,
  EventParam: EventParam,
};
