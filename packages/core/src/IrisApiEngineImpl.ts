import {
  ApiInterceptor,
  ApiParam,
  CallIrisApiResult,
  EventParam,
  IrisApiEngine,
  IrisEventHandler,
  IrisEventHandlerFunc,
  IrisEventHandlerManager,
} from './IrisApiEngine';
import { IrisEventHandlerManagerImpl } from './IrisEventHandlerManagerImpl';

const DO_NOT_HANDLE = -10000;

export class IrisEventHandlerImpl implements IrisEventHandler {
  private static nextEventId: number = 1;

  private eventId: number;
  private _eventHandler: IrisEventHandlerFunc;

  public static create(eventHandler: IrisEventHandlerFunc): IrisEventHandler {
    let id = IrisEventHandlerImpl.nextEventId++;
    return new IrisEventHandlerImpl(id, eventHandler);
  }

  protected constructor(id: number, eventHandler: IrisEventHandlerFunc) {
    this.eventId = id;
    this._eventHandler = eventHandler;
  }

  public onEvent(param: EventParam): void {
    param.eventHandle = this.eventId.toString();

    let newParam = new EventParam(
      param.event,
      param.data,
      param.data_size,
      param.result,
      param.buffer,
      param.length,
      param.buffer_count,
      this.eventId.toString()
    );

    if (this._eventHandler) {
      this._eventHandler(newParam);
    }
  }
}

export class IrisApiEngineImpl implements IrisApiEngine {
  // private static instance: IrisApiEngine;

  public apiInterceptors: Array<ApiInterceptor>;

  private irisEventHandlerManager: IrisEventHandlerManager;

  constructor() {
    this.apiInterceptors = [];
    this.irisEventHandlerManager = new IrisEventHandlerManagerImpl();
  }

  getIrisEventHandlerManager(): IrisEventHandlerManager {
    return this.irisEventHandlerManager;
  }

  // static getInstance() {
  //     if (!IrisApiEngine.instance) {
  //         IrisApiEngine.instance = new IrisApiEngine();
  //     }
  //     return IrisApiEngine.instance;
  // }

  addApiInterceptor(interceptor: ApiInterceptor): void {
    let item = this.apiInterceptors.find((value) => {
      return value === interceptor;
    });

    if (!item) {
      this.apiInterceptors.push(interceptor);
    }
  }

  removeApiInterceptor(interceptor: ApiInterceptor): void {
    this.apiInterceptors.forEach((item, index) => {
      if (item === interceptor) this.apiInterceptors.splice(index, 1);
    });
  }

  public callIrisApi(apiParam: ApiParam): Promise<CallIrisApiResult> {
    for (let interceptor of this.apiInterceptors) {
      let result = interceptor.intercept(apiParam);
      if (result) {
        return result;
      }
    }
    return Promise.resolve(CallIrisApiResult.failed(DO_NOT_HANDLE, 0));
  }

  public dispose(): Promise<void> {
    this.apiInterceptors = [];
    return Promise.resolve();
  }
}
