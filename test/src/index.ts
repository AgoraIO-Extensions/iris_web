// import AgoraRTC from "../../project/node_modules/agora-rtc-sdk-ng/rtc-sdk_en";
import { test, shouldEqual, start, shouldReturnTrue, waitForSecond, shoudlWarn } from "./framwork/index";
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



test("JoinChannel", async () => {

    //call create engine
    let apiEngine = AgoraWrapper.CreateIrisApiEngine();
    apiEngine.setGenerateVideoTrackLabelOrHtmlElementCb(generateVideoTrackLabelOrHtmlElementCb);

    //call init
    let context: agorartc.RtcEngineContext = {
        appId: commonAppid,
        context: null,
        enableAudioDevice: true,
        channelProfile: 1,
        audioScenario: 0,
        logConfig: {
            filePath: "",
            fileSizeInKB: 1024,
            level: 0x0004,
        },
        areaCode: 0x00000001,
        useExternalEglContext: false,
    };
    let paramsObj: any = {
        context
    };

    let param: string = JSON.stringify(paramsObj);

    let result: any = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_INITIALIZE, param, param.length, null, 0, result);
    shouldEqual("init:result", result.result, 0);

    let triggerEventNames: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            triggerEventNames.push(event);
        }
    };
    AgoraWrapper.SetIrisRtcEngineEventHandler(apiEngine, eventHandler);
    await waitForSecond(1);
    shouldReturnTrue("WebGL_onDeviceEnumerated Triggered", () => {
        return triggerEventNames.includes("WebGL_onDeviceEnumerated");
    });


    //call enableAudio , enableVideo
    result = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEAUDIO, "{}", 2, null, null, result);
    shouldEqual("enableAudio: ", result.result, 0);
    result = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEVIDEO, "{}", 2, null, null, result);
    shouldEqual("enableVideo: ", result.result, 0);


    //call joinChannel
    let token = "";
    let channelId = commonChannelId;
    let info = "";
    let uid = 0;
    paramsObj = {
        token,
        channelId,
        info,
        uid
    };
    result = {};
    param = JSON.stringify(paramsObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL, param, param.length, null, null, result);
    shouldEqual("joinChannel : result", result.result, 0);
    await waitForSecond(5);
    shouldReturnTrue("onJoinChannelSuccessEx Triggered", () => {
        return triggerEventNames.includes("onJoinChannelSuccessEx");
    });
    await waitForSecond(5);

    //call leaveChannel
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, "{}", 2, null, null);
    await waitForSecond(5);
    shouldReturnTrue("onLeaveChannelEx Triggered", () => {
        return triggerEventNames.includes("onLeaveChannelEx");
    });

    //call Destroy
    let nRet = AgoraWrapper.DestroyIrisApiEngine(apiEngine);
    shouldEqual("DestroyIrisApiEngine", nRet, 0);
});


test("ScreenShare", async () => {

    //call create engine
    let apiEngine = AgoraWrapper.CreateIrisApiEngine();
    apiEngine.setGenerateVideoTrackLabelOrHtmlElementCb(generateVideoTrackLabelOrHtmlElementCb);

    //call init
    let context: agorartc.RtcEngineContext = {
        appId: commonAppid,
        context: null,
        enableAudioDevice: true,
        channelProfile: 1,
        audioScenario: 0,
        logConfig: {
            filePath: "",
            fileSizeInKB: 1024,
            level: 0x0004,
        },
        areaCode: 0x00000001,
        useExternalEglContext: false,
    };
    let paramsObj: any = { context };

    let param: string = JSON.stringify(paramsObj);

    let result: any = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_INITIALIZE, param, param.length, null, 0, result);
    shouldEqual("init:result", result.result, 0);

    let triggerEventNames: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            triggerEventNames.push(event);
        }
    };
    AgoraWrapper.SetIrisRtcEngineEventHandler(apiEngine, eventHandler);
    await waitForSecond(1);
    shouldReturnTrue("WebGL_onDeviceEnumerated Triggered", () => {
        return triggerEventNames.includes("WebGL_onDeviceEnumerated");
    });


    //call enableAudio , enableVideo
    result = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEAUDIO, "{}", 2, null, null, result);
    shouldEqual("enableAudio: ", result.result, 0);
    result = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEVIDEO, "{}", 2, null, null, result);
    shouldEqual("enableVideo: ", result.result, 0);


    //call joinChannel2
    let token = "";
    let channelId = commonChannelId;
    let info = "";
    let uid = 0;
    let options: agorartc.ChannelMediaOptions = {
        publishCameraTrack: false,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
        channelProfile: agorartc.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_COMMUNICATION,
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
    };
    paramsObj = {
        token,
        channelId,
        info,
        uid,
        options
    };
    result = {};
    param = JSON.stringify(paramsObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL2, param, param.length, null, null, result);
    shouldEqual("joinChannel2 : result", result.result, 0);
    await waitForSecond(5);
    shouldReturnTrue("onJoinChannelSuccessEx Triggered", () => {
        return triggerEventNames.includes("onJoinChannelSuccessEx");
    });
    await waitForSecond(5);

    //call startSceneShare
    let displayId = 0;
    let regionRect: agorartc.Rectangle = { x: 0, y: 0, width: 0, height: 0 }
    let captureParams: agorartc.ScreenCaptureParameters = {
        dimensions: { width: 960, height: 640 },
        frameRate: 15,
        bitrate: 0,
        captureMouseCursor: false,
        windowFocus: false,
        excludeWindowList: [],
        excludeWindowCount: 0,
    };
    paramsObj = {
        displayId, regionRect, captureParams
    }
    param = JSON.stringify(paramsObj);
    result = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSCREENCAPTUREBYDISPLAYID, param, param.length, null, 0, result);
    shouldEqual("StartScreenCaptureByDisplayId: ", result.result, 0);
    await waitForSecond(3);

    //call updateChannelMediaOption
    options = {
        publishCameraTrack: false,
        publishScreenTrack: true,
    };
    paramsObj = { options };
    param = JSON.stringify(paramsObj);
    result = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATECHANNELMEDIAOPTIONS, param, param.length, null, 0, result);
    shouldEqual("updateChannelMediaOption: ", result.result, 0);
    await waitForSecond(5);

    //call leaveChannel
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, "{}", 2, null, null);
    await waitForSecond(5);
    shouldReturnTrue("onLeaveChannelEx Triggered", () => {
        return triggerEventNames.includes("onLeaveChannelEx");
    });

    //call Destroy
    let nRet = AgoraWrapper.DestroyIrisApiEngine(apiEngine);
    shouldEqual("DestroyIrisApiEngine", nRet, 0);
});


test("SwitchCamera", async () => {

    //call create engine
    let apiEngine = AgoraWrapper.CreateIrisApiEngine();
    apiEngine.setGenerateVideoTrackLabelOrHtmlElementCb(generateVideoTrackLabelOrHtmlElementCb);

    //call init
    let context: agorartc.RtcEngineContext = {
        appId: commonAppid,
        context: null,
        enableAudioDevice: true,
        channelProfile: 1,
        audioScenario: 0,
        logConfig: {
            filePath: "",
            fileSizeInKB: 1024,
            level: 0x0004,
        },
        areaCode: 0x00000001,
        useExternalEglContext: false,
    };
    let paramsObj: any = {
        context
    };

    let param: string = JSON.stringify(paramsObj);

    let result: any = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_INITIALIZE, param, param.length, null, 0, result);
    shouldEqual("init:result", result.result, 0);

    let triggerEventNames: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            triggerEventNames.push(event);
        }
    };
    AgoraWrapper.SetIrisRtcEngineEventHandler(apiEngine, eventHandler);
    await waitForSecond(1);
    shouldReturnTrue("WebGL_onDeviceEnumerated Triggered", () => {
        return triggerEventNames.includes("WebGL_onDeviceEnumerated");
    });


    //call enableAudio , enableVideo
    result = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEAUDIO, "{}", 2, null, null, result);
    shouldEqual("enableAudio: ", result.result, 0);
    result = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEVIDEO, "{}", 2, null, null, result);
    shouldEqual("enableVideo: ", result.result, 0);


    //call joinChannel
    let token = "";
    let channelId = commonChannelId;
    let info = "";
    let uid = 0;
    paramsObj = {
        token,
        channelId,
        info,
        uid
    };
    result = {};
    param = JSON.stringify(paramsObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL, param, param.length, null, null, result);
    shouldEqual("joinChannel : result", result.result, 0);
    await waitForSecond(5);
    shouldReturnTrue("onJoinChannelSuccessEx Triggered", () => {
        return triggerEventNames.includes("onJoinChannelSuccessEx");
    });
    await waitForSecond(3);

    result = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_VIDEODEVICEMANAGER_ENUMERATEVIDEODEVICES, "{}", 2, null, 0, result);
    let deviceInfos: agorartc.DeviceInfo[] = result.result;
    shoudlWarn("camera number should more than 1", deviceInfos.length < 2);

    result = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SWITCHCAMERA, "{}", 2, null, 0, result);
    shouldEqual("switchCamera one time: ", result.result, 0);
    await waitForSecond(3);

    result = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SWITCHCAMERA, "{}", 2, null, 0, result);
    shouldEqual("switchCamera two time: ", result.result, 0);
    await waitForSecond(3);

    result = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SWITCHCAMERA, "{}", 2, null, 0, result);
    shouldEqual("switchCamera three time: ", result.result, 0);
    await waitForSecond(3);

    //call leaveChannel
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, "{}", 2, null, null);
    await waitForSecond(5);
    shouldReturnTrue("onLeaveChannelEx Triggered", () => {
        return triggerEventNames.includes("onLeaveChannelEx");
    });

    //call Destroy
    let nRet = AgoraWrapper.DestroyIrisApiEngine(apiEngine);
    shouldEqual("DestroyIrisApiEngine", nRet, 0);
}, 1);





