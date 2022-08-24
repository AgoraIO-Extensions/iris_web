// import AgoraRTC from "../../project/node_modules/agora-rtc-sdk-ng/rtc-sdk_en";
import { test, shouldEqual, start, shouldReturnTrue, waitForSecond } from "./framwork/index";
import { AgoraWrapper } from "../../project/iris/app"
import * as agorartc from "../../project/iris/terra/rtc_types/Index"
import { IrisApiType } from "../../project/iris/base/IrisApiType";
import { GenerateVideoTrackLabelOrHtmlElementCb } from "../../project/iris/engine/IrisRtcEngine";
import { IrisVideoSourceType, IrisEventHandler } from "../../project/iris/base/BaseType";



export let AgoraTest = {
    start: start
};

const commonAppid: string = "6bb480f77c6c458696eadb61dfc6fb76";
const commonChannelId: string = "xiayangqun";
let generateVideoTrackLabelOrHtmlElementCb = function (channelName: string, uid: number, type: IrisVideoSourceType): string | HTMLElement {
    let id: string;
    if (uid == 0) {
        switch (type) {
            case IrisVideoSourceType.kVideoSourceTypeCameraPrimary:
                id = "kVideoSourceTypeCameraPrimary";
                break;
            case IrisVideoSourceType.kVideoSourceTypeCameraSecondary:
                id = "kVideoSourceTypeCameraSecondary";
                break;
            case IrisVideoSourceType.kVideoSourceTypeScreenPrimary:
                id = "kVideoSourceTypeScreenPrimary";
                break;
            case IrisVideoSourceType.kVideoSourceTypeScreenSecondary:
                id = "kVideoSourceTypeScreenSecondary";
                break;
            default:
                id = "kVideoSourceTypeCameraPrimary";
                break;
        }
    }
    else {
        id = "kVideoSourceTypeRemote";
    }

    let element = document.getElementById(id);
    return element;
};



test("Hello", async () => {
    shouldEqual("hello", 1, 1);
    await waitForSecond(1);
    shouldEqual("hello2", 2, 2);
}, 1);

test("Hello2", async () => {
    shouldEqual("嘿嘿", 2, 2);
    await waitForSecond(2);
    shouldEqual("呵呵", 2, 2);
}, 3)


// test("joinChannel", (next) => {

//     //call create engine
//     let apiEngine = AgoraWrapper.CreateIrisApiEngine();
//     apiEngine.setGenerateVideoTrackLabelOrHtmlElementCb(generateVideoTrackLabelOrHtmlElementCb);

//     //call init
//     let context: agorartc.RtcEngineContext = {
//         appId: commonAppid,
//         context: null,
//         enableAudioDevice: true,
//         channelProfile: 1,
//         audioScenario: 0,
//         logConfig: {
//             filePath: "",
//             fileSizeInKB: 1024,
//             level: 0x0004,
//         },
//         areaCode: 0x00000001,
//         useExternalEglContext: false,
//     };
//     let paramsObj: any = {
//         context
//     };

//     let param: string = JSON.stringify(paramsObj);

//     let result: any = {};
//     AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_INITIALIZE, param, param.length, null, 0, result);
//     shouldEqual("init:result", result.result, 0);

//     let triggerEventNames: string[] = [];
//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             triggerEventNames.push(event);
//         }
//     };
//     AgoraWrapper.SetIrisRtcEngineEventHandler(apiEngine, eventHandler);
//     setTimeout(() => {
//         shouldReturnTrue("WebGL_onDeviceEnumerated Triggered", () => {
//             return triggerEventNames.includes("WebGL_onDeviceEnumerated");
//         })
//     }, 1000);


//     //call joinChannel
//     let token = "";
//     let channelId = commonChannelId;
//     let info = "";
//     let uid = 0;
//     paramsObj = {
//         token,
//         channelId,
//         info,
//         uid
//     };
//     result = {};
//     param = JSON.stringify(paramsObj);
//     AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL, param, param.length, null, null);
//     shouldEqual("joinChannel : result", result.result, 0);
//     setTimeout(() => {
//         shouldReturnTrue("onJoinChannelSuccessEx Triggered", () => {
//             return triggerEventNames.includes("onJoinChannelSuccessEx");
//         })
//     }, 1000);

//     //call leave channel
//     setTimeout(() => {
//         AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, "{}", 2, null, null);
//         AgoraWrapper.DestroyIrisApiEngine(apiEngine);
//         setTimeout(() => {
//             shouldReturnTrue("onLeaveChannelEx Triggered", () => {
//                 return triggerEventNames.includes("onLeaveChannelEx");
//             })
//         }, 5);


//     })
// }




