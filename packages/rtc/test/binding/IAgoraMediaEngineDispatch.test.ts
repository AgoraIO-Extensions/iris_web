import { CallIrisApiResult, EventParam, IrisApiEngine, IrisCore } from "iris-web-core";
import { IrisApiType } from "../../src/base/IrisApiType";
import { initIrisRtc } from "../../src/index";



let apiEnginePtr:IrisApiEngine;
beforeAll(() => {
  apiEnginePtr = IrisCore.createIrisApiEngine();
  initIrisRtc(apiEnginePtr);
});

afterAll(() => {
  IrisCore.disposeIrisApiEngine(apiEnginePtr);
});

IrisCore.createIrisApiEngine();
describe("IAgoraMediaEngineImpl", () => {
  test("setExternalVideoSource", async () => {
    let nParam:string = "{}";
    let apiParam = new EventParam(IrisApiType.FUNC_MEDIAENGINE_SETEXTERNALVIDEOSOURCE, nParam, 0, '', [], [], 0);
    try {
      await IrisCore.callIrisApi(apiEnginePtr,apiParam);
    }catch (e){
      expect(e).toEqual('enabled is undefined');
    }

  });
});