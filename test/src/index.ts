// import AgoraRTC from "../../project/node_modules/agora-rtc-sdk-ng/rtc-sdk_en";
import { test, shouldEqual, start, stop, shouldReturnTrue, waitForSecond, shoudlWarn } from "./framwork/index";
import { AgoraWrapper } from "../../project/iris/app"
import * as agorartc from "../../project/iris/terra/rtc_types/Index"
import { IrisApiType } from "../../project/iris/base/IrisApiType";
import { GenerateVideoTrackLabelOrHtmlElementCb, IrisRtcEngine } from "../../project/iris/engine/IrisRtcEngine";
import { IrisVideoSourceType, IrisEventHandler } from "../../project/iris/base/BaseType";
import { IrisApiEngine } from "../../project/iris/engine/IrisApiEngine";
import { Priority } from "./framwork/TestActionQueue";



export let AgoraTest = {
    start: start,
    stop: stop,
};

const commonAppid: string = "6bb480f77c6c458696eadb61dfc6fb76";
const commonChannelId: string = "xiayangqun";
const commonUidEx: number = 123;
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


/********  special case  **********/
test("special_JoinChannel", async () => {

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

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            events.push(event);
        }
    };
    AgoraWrapper.SetIrisRtcEngineEventHandler(apiEngine, eventHandler);
    await waitForSecond(1);
    shouldReturnTrue("WebGL_onDevicesEnumerated Triggered", () => {
        return events.includes("WebGL_onDevicesEnumerated");
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
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL, param, param.length, null, 0, result);
    shouldEqual("joinChannel : result", result.result, 0);
    await waitForSecond(5);
    shouldReturnTrue("onJoinChannelSuccessEx Triggered", () => {
        return events.includes("onJoinChannelSuccessEx");
    });
    await waitForSecond(5);

    //call leaveChannel
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, "{}", 2, null, 0, result);
    await waitForSecond(5);
    shouldReturnTrue("onLeaveChannelEx Triggered", () => {
        return events.includes("onLeaveChannelEx");
    });

    //call Destroy
    let nRet = AgoraWrapper.DestroyIrisApiEngine(apiEngine);
    await waitForSecond(2);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);


}, Priority.Medium);


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

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            events.push(event);
        }
    };
    AgoraWrapper.SetIrisRtcEngineEventHandler(apiEngine, eventHandler);
    await waitForSecond(1);
    shouldReturnTrue("WebGL_onDevicesEnumerated Triggered", () => {
        return events.includes("WebGL_onDevicesEnumerated");
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
        return events.includes("onJoinChannelSuccessEx");
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
    await waitForSecond(10);

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
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, "{}", 2, null, 0, result);
    await waitForSecond(5);
    shouldReturnTrue("onLeaveChannelEx Triggered", () => {
        return events.includes("onLeaveChannelEx");
    });

    //call Destroy
    let nRet = AgoraWrapper.DestroyIrisApiEngine(apiEngine);
    shouldEqual("DestroyIrisApiEngine", nRet, 0);

    await waitForSecond(2);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);

}, Priority.Medium);

test("IRtcEngine_startScreenCaptureByScreenRect", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let screenRect: agorartc.Rectangle = { x: 0, y: 0, width: 0, height: 0 }
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
    let paramObj: any = {
        screenRect,
        regionRect,
        captureParams,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSCREENCAPTUREBYSCREENRECT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startScreenCaptureByScreenRect ", ret, 0);
    shouldEqual("IRtcEngine_startScreenCaptureByScreenRect:result ", result.result, 0);


    let options: agorartc.ChannelMediaOptions = {
        publishCameraTrack: false,
        publishScreenTrack: true,
    }
    paramObj = {
        options
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATECHANNELMEDIAOPTIONS, params, params.length, null, 0, result);
    shouldEqual("callApi:IRtcEngine_updateChannelMediaOptions:ret ", ret, 0);
    shouldEqual("callApi:IRtcEngine_updateChannelMediaOptions:result ", result.result, 0);

    await waitForSecond(5);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);


}, Priority.Medium);

test("IRtcEngine_startScreenCapture", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, false, eventHandler);

    let mediaProjectionPermissionResultData: Uint8ClampedArray = new Uint8ClampedArray();
    let captureParams: agorartc.ScreenCaptureParameters = {
        dimensions: { width: 960, height: 640 },
        frameRate: 15,
        bitrate: 0,
        captureMouseCursor: false,
        windowFocus: false,
        excludeWindowList: [],
        excludeWindowCount: 0,
    };
    let paramObj = {
        mediaProjectionPermissionResultData,
        captureParams,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSCREENCAPTURE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startScreenCapture ", ret, 0);
    shouldEqual("IRtcEngine_startScreenCapture:result ", result.result, 0);


    let token = "";
    let channelId = commonChannelId;
    let info = "";
    let uid = 0;
    let options: agorartc.ChannelMediaOptions = {
        publishCameraTrack: false,
        publishAudioTrack: true,
        publishScreenTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
        channelProfile: agorartc.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_COMMUNICATION,
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
    };
    let paramsObj = {
        token,
        channelId,
        info,
        uid,
        options
    };
    result = {};
    let param = JSON.stringify(paramsObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL2, param, param.length, null, null, result);
    shouldEqual("joinChannel2 : result", result.result, 0);

    await waitForSecond(3);

    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
}, Priority.Medium);

test("IRtcEngine_startScreenCaptureByWindowId", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, false, eventHandler);

    let windowId: agorartc.view_t = 0;
    let regionRect: agorartc.Rectangle = { x: 0, y: 0, width: 0, height: 0 };
    let captureParams: agorartc.ScreenCaptureParameters = {
        dimensions: { width: 960, height: 640 },
        frameRate: 15,
        bitrate: 0,
        captureMouseCursor: false,
        windowFocus: false,
        excludeWindowList: [],
        excludeWindowCount: 0,
    };
    let paramObj = {
        windowId,
        regionRect,
        captureParams,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSCREENCAPTUREBYWINDOWID, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startScreenCaptureByWindowId ", ret, 0);
    shouldEqual("IRtcEngine_startScreenCaptureByWindowId:result ", result.result, 0);
    await waitForSecond(5);

    let token = "";
    let channelId = commonChannelId;
    let info = "";
    let uid = 0;
    let options: agorartc.ChannelMediaOptions = {
        publishCameraTrack: false,
        publishAudioTrack: true,
        publishScreenTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
        channelProfile: agorartc.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_COMMUNICATION,
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
    };
    let paramsObj = {
        token,
        channelId,
        info,
        uid,
        options
    };
    result = {};
    let param = JSON.stringify(paramsObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL2, param, param.length, null, null, result);
    shouldEqual("joinChannel2 : result", result.result, 0);
    await (5);

    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
}, Priority.Medium);

test("IRtcEngine_setScreenCaptureContentHint", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, false, eventHandler);

    //call startSceenShare
    let windowId: agorartc.view_t = 0;
    let regionRect: agorartc.Rectangle = { x: 0, y: 0, width: 0, height: 0 };
    let captureParams: agorartc.ScreenCaptureParameters = {
        dimensions: { width: 960, height: 640 },
        frameRate: 15,
        bitrate: 0,
        captureMouseCursor: false,
        windowFocus: false,
        excludeWindowList: [],
        excludeWindowCount: 0,
    };
    let paramObj: any = {
        windowId,
        regionRect,
        captureParams,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSCREENCAPTUREBYWINDOWID, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startScreenCaptureByWindowId ", ret, 0);
    shouldEqual("IRtcEngine_startScreenCaptureByWindowId:result ", result.result, 0);
    await waitForSecond(5);


    //call joinChannel2
    let token = "";
    let channelId = commonChannelId;
    let info = "";
    let uid = 0;
    let options: agorartc.ChannelMediaOptions = {
        publishCameraTrack: false,
        publishAudioTrack: true,
        publishScreenTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
        channelProfile: agorartc.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_COMMUNICATION,
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
    };
    let paramsObj: any = {
        token,
        channelId,
        info,
        uid,
        options
    };
    result = {};
    let param = JSON.stringify(paramsObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL2, param, param.length, null, null, result);
    shouldEqual("joinChannel2 : result", result.result, 0);
    await waitForSecond(5);

    //call setScreenCaptureContentHint
    let contentHint: agorartc.VIDEO_CONTENT_HINT = agorartc.VIDEO_CONTENT_HINT.CONTENT_HINT_MOTION;
    paramObj = {
        contentHint,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETSCREENCAPTURECONTENTHINT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setScreenCaptureContentHint ", ret, 0);
    shouldEqual("IRtcEngine_setScreenCaptureContentHint:result ", result.result, 0);
    await waitForSecond(5);

    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
}, Priority.Medium);

test("IRtcEngine_updateScreenCaptureRegion", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let regionRect: agorartc.Rectangle = { x: 0, y: 0, width: 0, height: 0 };
    let paramObj = {
        regionRect,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATESCREENCAPTUREREGION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_updateScreenCaptureRegion ", ret, 0);
    shouldEqual("IRtcEngine_updateScreenCaptureRegion:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(5);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
}, Priority.Medium);

test("IRtcEngine_updateScreenCaptureParameters", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let captureParams: agorartc.ScreenCaptureParameters = {
        dimensions: { width: 960, height: 640 },
        frameRate: 15,
        bitrate: 0,
        captureMouseCursor: false,
        windowFocus: false,
        excludeWindowList: [],
        excludeWindowCount: 0,
    };
    let paramObj = {
        captureParams,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATESCREENCAPTUREPARAMETERS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_updateScreenCaptureParameters ", ret, 0);
    shouldEqual("IRtcEngine_updateScreenCaptureParameters:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(5);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
}, Priority.Medium);

test("IRtcEngine_stopScreenCapture", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    //call startScreenShare
    let windowId: agorartc.view_t = 0;
    let regionRect: agorartc.Rectangle = { x: 0, y: 0, width: 0, height: 0 };
    let captureParams: agorartc.ScreenCaptureParameters = {
        dimensions: { width: 960, height: 640 },
        frameRate: 15,
        bitrate: 0,
        captureMouseCursor: false,
        windowFocus: false,
        excludeWindowList: [],
        excludeWindowCount: 0,
    };
    let paramObj = {
        windowId,
        regionRect,
        captureParams,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSCREENCAPTUREBYWINDOWID, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startScreenCaptureByWindowId ", ret, 0);
    shouldEqual("IRtcEngine_startScreenCaptureByWindowId:result ", result.result, 0);
    await waitForSecond(5);

    //call joinChannel
    let token = "";
    let channelId = commonChannelId;
    let info = "";
    let uid = 0;
    let options: agorartc.ChannelMediaOptions = {
        publishCameraTrack: false,
        publishAudioTrack: true,
        publishScreenTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
        channelProfile: agorartc.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_COMMUNICATION,
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
    };
    let paramsObj: any = {
        token,
        channelId,
        info,
        uid,
        options
    };
    result = {};
    let param = JSON.stringify(paramsObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL2, param, param.length, null, null, result);
    shouldEqual("joinChannel2 : result", result.result, 0);
    await waitForSecond(5);

    //call stop
    paramsObj = {
    }
    params = JSON.stringify(paramsObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPSCREENCAPTURE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopScreenCapture ", ret, 0);
    shouldEqual("IRtcEngine_stopScreenCapture:result ", result.result, 0);
    await waitForSecond(5);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
}, Priority.Medium);

test("IRtcEngine_startPrimary(Seconder)CameraCapture", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, false, eventHandler);

    //call startPrimaryCameraCapture 
    let config: agorartc.CameraCapturerConfiguration = {
        cameraDirection: agorartc.CAMERA_DIRECTION.CAMERA_FRONT,
        format: { width: 960, height: 640, fps: 15 },
        deviceId: "",
    }
    let paramObj: any = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTPRIMARYCAMERACAPTURE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startPrimaryCameraCapture ", ret, 0);
    shouldEqual("IRtcEngine_startPrimaryCameraCapture:result ", result.result, 0);


    //call  startSecondaryCameraCapture
    config = {
        cameraDirection: agorartc.CAMERA_DIRECTION.CAMERA_FRONT,
        format: { width: 960, height: 640, fps: 15 },
        deviceId: "",
    }
    paramObj = {
        config,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSECONDARYCAMERACAPTURE, params, params.length, null, 0, result);
    shouldEqual("callApi:IRtcEngine_startSecondaryCameraCapture ", ret, 0);
    shouldEqual("IRtcEngine_startSecondaryCameraCapture:result ", result.result, 0);


    //call joinChannel2
    let token = "";
    let channelId = commonChannelId;
    let info = "";
    let uid = 123;
    let options: agorartc.ChannelMediaOptions = {
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
        channelProfile: agorartc.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_COMMUNICATION,
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
    };
    paramObj = {
        token,
        channelId,
        info,
        uid,
        options
    };
    result = {};
    params = JSON.stringify(paramObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL2, params, params.length, null, null, result);
    shouldEqual("joinChannel2 : result", result.result, 0);


    //call joinChannelEx
    options.publishCameraTrack = false;
    options.publishSecondaryCameraTrack = true;
    options.autoSubscribeAudio = false;
    options.autoSubscribeVideo = false;
    let connection: agorartc.RtcConnection = {
        localUid: 456,
        channelId: commonChannelId,
    };
    paramObj = {
        token,
        connection,
        options,
    }
    params = JSON.stringify(paramObj);
    result = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_JOINCHANNELEX, params, params.length, null, null, result);
    shouldEqual("joinChannelEx : result", result.result, 0);
    await waitForSecond(5);


    //stopPrimaryCamera
    paramObj = {
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPPRIMARYCAMERACAPTURE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopPrimaryCameraCapture ", ret, 0);
    shouldEqual("IRtcEngine_stopPrimaryCameraCapture:result ", result.result, 0);
    await waitForSecond(5);

    //stopSecondPrimaryCamer
    paramObj = {
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPSECONDARYCAMERACAPTURE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopSecondaryCameraCapture ", ret, 0);
    shouldEqual("IRtcEngine_stopSecondaryCameraCapture:result ", result.result, 0);
    await waitForSecond(1);

    //leaveChannel
    paramObj = {
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_leaveChannel ", ret, 0);
    shouldEqual("IRtcEngine_leaveChannel:result ", result.result, 0);
    await waitForSecond(2);


    //leaveChannelEx
    connection = {
        channelId: commonChannelId,
        localUid: 456
    };
    paramObj = {
        connection
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_LEAVECHANNELEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_leaveChannelEx ", ret, 0);
    shouldEqual("IRtcEngine_leaveChanneEx:result ", result.result, 0);
    await waitForSecond(2);


    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
}, Priority.Medium);

test("IRtcEngine_start(stop)PrimaryScreenCapture", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let config: agorartc.ScreenCaptureConfiguration = {
        isCaptureWindow: false,
        displayId: 0,
        screenRect: { x: 0, y: 0, width: 0, height: 0 },
        windowId: 0,
        params: {
            dimensions: { width: 0, height: 0 },
            frameRate: 15,
            bitrate: 0,
            captureMouseCursor: false,
            windowFocus: false,
            excludeWindowList: [],
            excludeWindowCount: 0,
        },
        regionRect: { x: 0, y: 0, width: 0, height: 0 }
    };
    let paramObj: any = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTPRIMARYSCREENCAPTURE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startPrimaryScreenCapture ", ret, 0);
    shouldEqual("IRtcEngine_startPrimaryScreenCapture:result ", result.result, 0);
    await waitForSecond(5);



    paramObj = {
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPPRIMARYSCREENCAPTURE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopPrimaryScreenCapture ", ret, 0);
    shouldEqual("IRtcEngine_stopPrimaryScreenCapture:result ", result.result, 0);
    await waitForSecond(1);

    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
}, Priority.Medium);

test("IRtcEngine_start(stop)SecondaryScreenCapture", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let config: agorartc.ScreenCaptureConfiguration = {
        isCaptureWindow: false,
        displayId: 0,
        screenRect: { x: 0, y: 0, width: 0, height: 0 },
        windowId: 0,
        params: {
            dimensions: { width: 0, height: 0 },
            frameRate: 15,
            bitrate: 0,
            captureMouseCursor: false,
            windowFocus: false,
            excludeWindowList: [],
            excludeWindowCount: 0,
        },
        regionRect: { x: 0, y: 0, width: 0, height: 0 }
    };
    let paramObj: any = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSECONDARYSCREENCAPTURE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startSecondaryScreenCapture ", ret, 0);
    shouldEqual("IRtcEngine_startSecondaryScreenCapture:result ", result.result, 0);
    await waitForSecond(5);

    //call stop
    paramObj = {
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPPRIMARYSCREENCAPTURE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopPrimaryScreenCapture ", ret, 0);
    shouldEqual("IRtcEngine_stopPrimaryScreenCapture:result ", result.result, 0);
    await waitForSecond(1);

    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
}, Priority.Medium);

test("IRtcEngine_stopPrimaryScreenCapture", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPPRIMARYSCREENCAPTURE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopPrimaryScreenCapture ", ret, 0);
    shouldEqual("IRtcEngine_stopPrimaryScreenCapture:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
}, Priority.Medium);

test("IRtcEngine_stopSecondaryScreenCapture", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPSECONDARYSCREENCAPTURE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopSecondaryScreenCapture ", ret, 0);
    shouldEqual("IRtcEngine_stopSecondaryScreenCapture:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
}, Priority.Medium);

test("IRtcEngine_ChannelMediaRelay_All", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    //call start
    let configuration: agorartc.ChannelMediaRelayConfiguration = {
        srcInfo: {
            channelName: commonChannelId,
            token: "",
            uid: 0,
        },
        destInfos: [
            {
                channelName: commonChannelId + "_1",
                token: "",
                uid: 0,
            }
        ],
        destCount: 1
    }
    let paramObj: any = {
        configuration,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTCHANNELMEDIARELAY, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startChannelMediaRelay ", ret, 0);
    shouldEqual("IRtcEngine_startChannelMediaRelay:result ", result.result, 0);
    await waitForSecond(15);


    //call update
    configuration = {
        srcInfo: {
            channelName: commonChannelId,
            token: "",
            uid: 0,
        },
        destInfos: [
            {
                channelName: commonChannelId + "_1",
                token: "",
                uid: 0,
            }
        ],
        destCount: 1
    }
    paramObj = {
        configuration,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATECHANNELMEDIARELAY, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_updateChannelMediaRelay ", ret, 0);
    shouldEqual("IRtcEngine_updateChannelMediaRelay:result ", result.result, 0);
    await waitForSecond(5);


    //pause
    paramObj = {
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PAUSEALLCHANNELMEDIARELAY, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_pauseAllChannelMediaRelay ", ret, 0);
    shouldEqual("IRtcEngine_pauseAllChannelMediaRelay:result ", result.result, 0);
    await waitForSecond(5);


    //resume
    paramObj = {
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_RESUMEALLCHANNELMEDIARELAY, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_resumeAllChannelMediaRelay ", ret, 0);
    shouldEqual("IRtcEngine_resumeAllChannelMediaRelay:result ", result.result, 0);
    await waitForSecond(5);

    //stop
    paramObj = {
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPCHANNELMEDIARELAY, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopChannelMediaRelay ", ret, 0);
    shouldEqual("IRtcEngine_stopChannelMediaRelay:result ", result.result, 0);
    await waitForSecond(1);


    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_add(remove)InjectStreamUrl", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, false, eventHandler);

    //call  startSecondaryCameraCapture
    let config = {
        cameraDirection: agorartc.CAMERA_DIRECTION.CAMERA_FRONT,
        format: { width: 960, height: 640, fps: 15 },
        deviceId: "",
    }
    let paramObj: any = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSECONDARYCAMERACAPTURE, params, params.length, null, 0, result);
    shouldEqual("callApi:IRtcEngine_startSecondaryCameraCapture ", ret, 0);
    shouldEqual("IRtcEngine_startSecondaryCameraCapture:result ", result.result, 0);


    //call joinChannel2
    let token = "";
    let channelId = commonChannelId;
    let info = "";
    let uid = 0;
    let options: agorartc.ChannelMediaOptions = {
        publishCameraTrack: true,
        publishSecondaryCameraTrack: false,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
        channelProfile: agorartc.CHANNEL_PROFILE_TYPE.CHANNEL_PROFILE_COMMUNICATION,
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
    };
    paramObj = {
        token,
        channelId,
        info,
        uid,
        options
    };
    result = {};
    params = JSON.stringify(paramObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL2, params, params.length, null, null, result);
    shouldEqual("joinChannel2 : result", result.result, 0);
    await waitForSecond(5);
    /* 
        Verify remote
        1.install ffmpeg(brew install ffmpeg)
        2.ffplay rtmp://play.qatest.agoramde.agoraio.cn/live/web_iris
     */
    let url: string = "rtmp://push.qatest.agoramde.agoraio.cn/live/web_iris";
    let config2: agorartc.InjectStreamConfig = {
        width: 125,
        height: 245,
        videoGop: 30,
        videoFramerate: 15,
        videoBitrate: 400,
        audioSampleRate: agorartc.AUDIO_SAMPLE_RATE_TYPE.AUDIO_SAMPLE_RATE_48000,
        audioBitrate: 48,
        audioChannels: 1,
    }
    paramObj = {
        url: url,
        config: config2,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADDINJECTSTREAMURL, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_addInjectStreamUrl ", ret, 0);
    shouldEqual("IRtcEngine_addInjectStreamUrl:result ", result.result, 0);
    await waitForSecond(7);


    //removeInJectStream
    paramObj = {
        url,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REMOVEINJECTSTREAMURL, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_removeInjectStreamUrl ", ret, 0);
    shouldEqual("IRtcEngine_removeInjectStreamUrl:result ", result.result, 0);
    await waitForSecond(7);


    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startRtmpStreamWithoutTranscoding", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, false, eventHandler);

    //推流要求 在创建视频轨道之前先一定要设置视频格式为 h264。 
    let config: agorartc.VideoEncoderConfiguration = {
        codecType: agorartc.VIDEO_CODEC_TYPE.VIDEO_CODEC_H264,
        dimensions: { width: 640, height: 360 },
        frameRate: 15,
        minFrameRate: 0,
        bitrate: agorartc.STANDARD_BITRATE,
        minBitrate: agorartc.DEFAULT_MIN_BITRATE,
        orientationMode: agorartc.ORIENTATION_MODE.ORIENTATION_MODE_ADAPTIVE,
        degradationPreference: agorartc.DEGRADATION_PREFERENCE.MAINTAIN_QUALITY,
        mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_DISABLED,
    }

    let paramObj: any = {
        config
    };
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETVIDEOENCODERCONFIGURATION, params, params.length, null, 0, result);
    shouldEqual("callApi:IRtcEngine_setVideoEncoderConfiguration ", ret, 0);
    shouldEqual("IRtcEngine_setVideoEncoderConfiguration:result ", result.result, 0);
    await waitForSecond(3);


    //call join Channel
    let token = "";
    let channelId = commonChannelId;
    let info = "";
    let uid = 0;
    paramObj = {
        token,
        channelId,
        info,
        uid
    };
    result = {};
    params = JSON.stringify(paramObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL, params, params.length, null, null, result);
    shouldEqual("joinChannel: ", result.result, 0);
    await waitForSecond(3);



    /* 
        Verify remote
        1.install ffmpeg(brew install ffmpeg)
        2.ffplay rtmp://play.qatest.agoramde.agoraio.cn/live/agora_rtc_unity_webgl
     */
    let url: string = "rtmp://push.qatest.agoramde.agoraio.cn/live/agora_rtc_unity_webgl";
    paramObj = {
        url,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTRTMPSTREAMWITHOUTTRANSCODING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startRtmpStreamWithoutTranscoding ", ret, 0);
    shouldEqual("IRtcEngine_startRtmpStreamWithoutTranscoding:result ", result.result, 0);
    await waitForSecond(20);

    //stop
    paramObj = {
        url,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPRTMPSTREAM, params, params.length, null, 0, result);
    shouldEqual("callApi:IRtcEngine_stopRtmpStream ", ret, 0);
    shouldEqual("IRtcEngine_stopRtmpStream:result ", result.result, 0);

    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startRtmpStreamWithTranscoding_update_stop", async () => {

    let trueUid: number = 0; 
    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            if (event == "onJoinChannelSuccessEx") {
                let obj = JSON.parse(data);
                trueUid = obj.connection.localUid;
            }
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, false, eventHandler);

    //推流要求 在创建视频轨道之前先一定要设置视频格式为 h264。 
    let config: agorartc.VideoEncoderConfiguration = {
        codecType: agorartc.VIDEO_CODEC_TYPE.VIDEO_CODEC_H264,
        dimensions: { width: 640, height: 360 },
        frameRate: 15,
        minFrameRate: 0,
        bitrate: agorartc.STANDARD_BITRATE,
        minBitrate: agorartc.DEFAULT_MIN_BITRATE,
        orientationMode: agorartc.ORIENTATION_MODE.ORIENTATION_MODE_ADAPTIVE,
        degradationPreference: agorartc.DEGRADATION_PREFERENCE.MAINTAIN_QUALITY,
        mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_DISABLED,
    }

    let paramObj: any = {
        config
    };
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETVIDEOENCODERCONFIGURATION, params, params.length, null, 0, result);
    shouldEqual("callApi:IRtcEngine_setVideoEncoderConfiguration ", ret, 0);
    shouldEqual("IRtcEngine_setVideoEncoderConfiguration:result ", result.result, 0);
    await waitForSecond(3);


    //call join Channel
    let token = "";
    let channelId = commonChannelId;
    let info = "";
    let uid = 0;
    paramObj = {
        token,
        channelId,
        info,
        uid
    };
    result = {};
    params = JSON.stringify(paramObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL, params, params.length, null, null, result);
    shouldEqual("joinChannel: ", result.result, 0);
    await waitForSecond(5);
    shoudlWarn("trueUid error", trueUid == 0, "trueUid=" + trueUid);

    //call start
    /*
       Verify remote
       1.install ffmpeg(brew install ffmpeg)
       2.ffplay rtmp://play.qatest.agoramde.agoraio.cn/live/agora_rtc_unity_webgl
    */
    let url: string = "rtmp://push.qatest.agoramde.agoraio.cn/live/agora_rtc_unity_webgl";
    let transcoding: agorartc.LiveTranscoding = {
        width: 360,
        height: 640,
        videoBitrate: 400,
        videoFramerate: 15,
        lowLatency: true,
        videoGop: 30,
        videoCodecProfile: agorartc.VIDEO_CODEC_PROFILE_TYPE.VIDEO_CODEC_PROFILE_HIGH,
        backgroundColor: 0x000000,
        videoCodecType: agorartc.VIDEO_CODEC_TYPE_FOR_STREAM.VIDEO_CODEC_H264_FOR_STREAM,
        userCount: 1,
        transcodingUsers: [
            {
                uid: trueUid,  //todo 得到自己的Uid this.Uid,
                x: 0,
                y: 0,
                width: 360,
                height: 640,
                alpha: 1,
                zOrder: 1,
                audioChannel: 0
            }
        ],
        transcodingExtraInfo: "",
        metadata: "",
        watermark: [],
        watermarkCount: 0,
        backgroundImage: [],
        backgroundImageCount: 0,
        audioSampleRate: agorartc.AUDIO_SAMPLE_RATE_TYPE.AUDIO_SAMPLE_RATE_32000,
        audioBitrate: 48,
        audioChannels: 2,
        audioCodecProfile: agorartc.AUDIO_CODEC_PROFILE_TYPE.AUDIO_CODEC_PROFILE_LC_AAC,
        advancedFeatures: [],
        advancedFeatureCount: 0,

    };
    paramObj = {
        url,
        transcoding,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTRTMPSTREAMWITHTRANSCODING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startRtmpStreamWithTranscoding ", ret, 0);
    shouldEqual("IRtcEngine_startRtmpStreamWithTranscoding:result ", result.result, 0);
    await waitForSecond(20);

    //call update
    transcoding = {
        width: 360,
        height: 640,
        videoBitrate: 400,
        videoFramerate: 15,
        lowLatency: true,
        videoGop: 30,
        videoCodecProfile: agorartc.VIDEO_CODEC_PROFILE_TYPE.VIDEO_CODEC_PROFILE_HIGH,
        backgroundColor: 0x000000,
        videoCodecType: agorartc.VIDEO_CODEC_TYPE_FOR_STREAM.VIDEO_CODEC_H264_FOR_STREAM,
        userCount: 1,
        transcodingUsers: [
            {
                uid: trueUid,  //todo 得到自己的Uid this.Uid,
                x: 0,
                y: 0,
                width: 640,
                height: 960,
                alpha: 1,
                zOrder: 1,
                audioChannel: 0
            }
        ],
        transcodingExtraInfo: "",
        metadata: "",
        watermark: [],
        watermarkCount: 0,
        backgroundImage: [],
        backgroundImageCount: 0,
        audioSampleRate: agorartc.AUDIO_SAMPLE_RATE_TYPE.AUDIO_SAMPLE_RATE_32000,
        audioBitrate: 48,
        audioChannels: 2,
        audioCodecProfile: agorartc.AUDIO_CODEC_PROFILE_TYPE.AUDIO_CODEC_PROFILE_LC_AAC,
        advancedFeatures: [],
        advancedFeatureCount: 0,

    };
    paramObj = {
        url,
        transcoding,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATERTMPTRANSCODING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_updateRtmpStreamWithTranscoding ", ret, 0);
    shouldEqual("IRtcEngine_updateRtmpStreamWithTranscoding:result ", result.result, 0);
    await waitForSecond(20);


    //stop
    paramObj = {
        url,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPRTMPSTREAM, params, params.length, null, 0, result);
    shouldEqual("callApi:IRtcEngine_stopRtmpStream ", ret, 0);
    shouldEqual("IRtcEngine_stopRtmpStream:result ", result.result, 0);

    await waitForSecond(5);

    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
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
    shouldReturnTrue("WebGL_onDevicesEnumerated Triggered", () => {
        return triggerEventNames.includes("WebGL_onDevicesEnumerated");
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
    shoudlWarn("camera number should more than 1", deviceInfos.length < 2, "length = " + deviceInfos.length);

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
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, "{}", 2, null, null, result);
    await waitForSecond(5);
    shouldReturnTrue("onLeaveChannelEx Triggered", () => {
        return triggerEventNames.includes("onLeaveChannelEx");
    });

    //call Destroy
    let nRet = AgoraWrapper.DestroyIrisApiEngine(apiEngine);
    shouldEqual("DestroyIrisApiEngine", nRet, 0);
});

test("IVideoDeviceManager_enumerateVideoDevices_setDevice", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    //call enumerateVideoDevices
    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_VIDEODEVICEMANAGER_ENUMERATEVIDEODEVICES, params, params.length, null, 0, result);
    shouldEqual("callApi:IVideoDeviceManager_enumerateVideoDevices ", ret, 0);
    shoudlWarn("IVideoDeviceManager_enumerateVideoDevices:result ", typeof result.result.length != 'number', "result" + result.result);

    //回调检测
    shoudlWarn("events_ WebGL_onDevicesEnumerated", events.includes("WebGL_onDevicesEnumerated") == false, "events.length=" + events.length);
    await waitForSecond(2);
    shoudlWarn("events_ WebGL_onVideoDevicesEnumerated", events.includes("WebGL_onVideoDevicesEnumerated") == false, "events.length=" + events.length);


    //call setDeviceId
    let devices: agorartc.DeviceInfo[] = result.result;
    let length = devices.length;
    let deviceIdUTF8: string = devices[length - 1].deviceId;
    paramObj = {
        deviceIdUTF8,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_VIDEODEVICEMANAGER_SETDEVICE, params, params.length, null, 0, result);

    shouldEqual("callApi:IVideoDeviceManager_setDevice ", ret, 0);
    shouldEqual("IVideoDeviceManager_setDevice:result ", result.result, 0);

    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_updateChannelMediaOptionsEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };
    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(true, true, true, eventHandler, commonUidEx, options);


    options.publishCameraTrack = false;
    options.publishScreenTrack = true;
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }
    let paramObj = {
        options,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_UPDATECHANNELMEDIAOPTIONSEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_updateChannelMediaOptionsEx ", ret, 0);
    shouldEqual("IRtcEngineEx_updateChannelMediaOptionsEx:result ", result.result, 0);
    await waitForSecond(5);
    await testEndEx(apiEngine, false, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);

});


export let testBegine = async function (enableAudio: boolean | null, enableVideo: boolean | null, joinChannel: boolean, eventHandler: IrisEventHandler): Promise<IrisApiEngine> {
    let apiEngine = AgoraWrapper.CreateIrisApiEngine();
    apiEngine.setGenerateVideoTrackLabelOrHtmlElementCb(generateVideoTrackLabelOrHtmlElementCb);

    AgoraWrapper.SetIrisRtcEngineEventHandler(apiEngine, eventHandler);

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
    let result: any = {};
    let param: string = JSON.stringify(paramsObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_INITIALIZE, param, param.length, null, 0, result);
    shouldEqual("init: ", result.result, 0);

    if (enableAudio === true) {
        result = {};
        AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEAUDIO, "{}", 2, null, null, result);
        shouldEqual("enableAudio: ", result.result, 0);
    }
    else if (enableAudio === false) {
        result = {};
        AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_DISABLEAUDIO, "{}", 2, null, null, result);
        shouldEqual("disableAudio: ", result.result, 0);
    }

    if (enableVideo === true) {
        result = {};
        AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEVIDEO, "{}", 2, null, null, result);
        shouldEqual("enableVideo: ", result.result, 0);
    }
    else if (enableVideo === false) {
        result = {};
        AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_DISABLEVIDEO, "{}", 2, null, null, result);
        shouldEqual("disableVideo: ", result.result, 0);
    }

    if (joinChannel) {
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
        shouldEqual("joinChannel: ", result.result, 0);
        await waitForSecond(3);
    }

    return apiEngine;
}

export let testBegineEx = async function (enableAudio: boolean | null, enableVideo: boolean | null, joinChannelEx: boolean, eventHandler: IrisEventHandler, uid: number, options: agorartc.ChannelMediaOptions): Promise<IrisApiEngine> {
    let apiEngine = AgoraWrapper.CreateIrisApiEngine();
    apiEngine.setGenerateVideoTrackLabelOrHtmlElementCb(generateVideoTrackLabelOrHtmlElementCb);

    AgoraWrapper.SetIrisRtcEngineEventHandler(apiEngine, eventHandler);

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
    let result: any = {};
    let param: string = JSON.stringify(paramsObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_INITIALIZE, param, param.length, null, 0, result);
    shouldEqual("init: ", result.result, 0);

    if (enableAudio === true) {
        result = {};
        AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEAUDIO, "{}", 2, null, null, result);
        shouldEqual("enableAudio: ", result.result, 0);
    }
    else if (enableAudio === false) {
        result = {};
        AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_DISABLEAUDIO, "{}", 2, null, null, result);
        shouldEqual("disableAudio: ", result.result, 0);
    }

    if (enableVideo === true) {
        result = {};
        AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEVIDEO, "{}", 2, null, null, result);
        shouldEqual("enableVideo: ", result.result, 0);
    }
    else if (enableVideo === false) {
        result = {};
        AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_DISABLEVIDEO, "{}", 2, null, null, result);
        shouldEqual("disableVideo: ", result.result, 0);
    }

    if (joinChannelEx) {
        let token = "";
        let connection: agorartc.RtcConnection = {
            channelId: commonChannelId,
            localUid: uid,
        }


        paramsObj = {
            token,
            connection,
            options,
        };
        result = {};
        param = JSON.stringify(paramsObj);
        AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_JOINCHANNELEX, param, param.length, null, null, result);
        shouldEqual("joinChannelEx: ", result.result, 0);
        await waitForSecond(3);
    }

    return apiEngine;
}

export let testEnd = async function (apiEngine: IrisApiEngine, leavelChannel: boolean) {

    let result: any = {};
    //call leaveChannel
    if (leavelChannel) {
        AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, "{}", 2, null, 0, result);
        shouldEqual("leaveChannel: ", result.result, 0);
        await waitForSecond(2);
    }

    //call Destroy
    let nRet = AgoraWrapper.DestroyIrisApiEngine(apiEngine);
    shouldEqual("DestroyIrisApiEngine", nRet, 0);
    await waitForSecond(2);
    let engine: IrisRtcEngine = (apiEngine as any)._engine;
    shouldEqual(" engine.entitiesContainer.getMainClient() ", engine.entitiesContainer.getMainClient(), null);

};

export let testEndEx = async function (apiEngine: IrisApiEngine, leavelChannelEx: boolean, uid: number) {

    let result: any = {};
    //call leaveChannel
    if (leavelChannelEx) {
        let connection: agorartc.RtcConnection = {
            channelId: commonChannelId,
            localUid: uid
        };
        let paramObj = {
            connection
        };
        let param = JSON.stringify(paramObj);
        AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_LEAVECHANNELEX, param, param.length, null, 0, result);
        shouldEqual("leaveChannelEx: ", result.result, 0);
        await waitForSecond(2);
    }

    //call Destroy
    let nRet = AgoraWrapper.DestroyIrisApiEngine(apiEngine);
    shouldEqual("DestroyIrisApiEngine", nRet, 0);
    await waitForSecond(1);
};

/********* normal case ***********/

//IMediaEngine

test("IMediaEngine_registerAudioFrameObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let observer: agorartc.IAudioFrameObserver = new agorartc.IAudioFrameObserver;
    let paramObj = {
        observer,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_REGISTERAUDIOFRAMEOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_registerAudioFrameObserver ", ret, 0);
    shouldEqual("IMediaEngine_registerAudioFrameObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_registerVideoFrameObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let observer: agorartc.IVideoFrameObserver = new agorartc.IVideoFrameObserver();
    let paramObj = {
        observer,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_REGISTERVIDEOFRAMEOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_registerVideoFrameObserver ", ret, 0);
    shouldEqual("IMediaEngine_registerVideoFrameObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_registerVideoEncodedImageReceiver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let receiver: agorartc.IVideoEncodedImageReceiver = new agorartc.IVideoEncodedImageReceiver();
    let paramObj = {
        receiver,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_REGISTERVIDEOENCODEDIMAGERECEIVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_registerVideoEncodedImageReceiver ", ret, 0);
    shouldEqual("IMediaEngine_registerVideoEncodedImageReceiver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_pushAudioFrame", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let type: agorartc.MEDIA_SOURCE_TYPE = agorartc.MEDIA_SOURCE_TYPE.AUDIO_RECORDING_SOURCE;
    let frame: agorartc.AudioFrame = {
        type: agorartc.AUDIO_FRAME_TYPE.FRAME_TYPE_PCM16,
        samplesPerChannel: 2,
        bytesPerSample: agorartc.BYTES_PER_SAMPLE.TWO_BYTES_PER_SAMPLE,
        channels: 2,
        samplesPerSec: 4400,
        buffer: new Uint8ClampedArray(),
        renderTimeMs: 0,
        avsync_type: 0,
    }
    let wrap: boolean = false;
    let sourceId: number = 0;
    let paramObj = {
        type,
        frame,
        wrap,
        sourceId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_PUSHAUDIOFRAME, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_pushAudioFrame ", ret, 0);
    shouldEqual("IMediaEngine_pushAudioFrame:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_pushCaptureAudioFrame", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let frame: agorartc.AudioFrame = {
        type: agorartc.AUDIO_FRAME_TYPE.FRAME_TYPE_PCM16,
        samplesPerChannel: 2,
        bytesPerSample: agorartc.BYTES_PER_SAMPLE.TWO_BYTES_PER_SAMPLE,
        channels: 2,
        samplesPerSec: 4400,
        buffer: new Uint8ClampedArray(),
        renderTimeMs: 0,
        avsync_type: 0,
    }
    let paramObj = {
        frame,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_PUSHCAPTUREAUDIOFRAME, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_pushCaptureAudioFrame ", ret, 0);
    shouldEqual("IMediaEngine_pushCaptureAudioFrame:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_pushReverseAudioFrame", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let frame: agorartc.AudioFrame = {
        type: agorartc.AUDIO_FRAME_TYPE.FRAME_TYPE_PCM16,
        samplesPerChannel: 2,
        bytesPerSample: agorartc.BYTES_PER_SAMPLE.TWO_BYTES_PER_SAMPLE,
        channels: 2,
        samplesPerSec: 4400,
        buffer: new Uint8ClampedArray(),
        renderTimeMs: 0,
        avsync_type: 0,
    };
    let paramObj = {
        frame,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_PUSHREVERSEAUDIOFRAME, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_pushReverseAudioFrame ", ret, 0);
    shouldEqual("IMediaEngine_pushReverseAudioFrame:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_pushDirectAudioFrame", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let frame: agorartc.AudioFrame = {
        type: agorartc.AUDIO_FRAME_TYPE.FRAME_TYPE_PCM16,
        samplesPerChannel: 2,
        bytesPerSample: agorartc.BYTES_PER_SAMPLE.TWO_BYTES_PER_SAMPLE,
        channels: 2,
        samplesPerSec: 4400,
        buffer: new Uint8ClampedArray(),
        renderTimeMs: 0,
        avsync_type: 0,
    };
    let paramObj = {
        frame,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_PUSHDIRECTAUDIOFRAME, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_pushDirectAudioFrame ", ret, 0);
    shouldEqual("IMediaEngine_pushDirectAudioFrame:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_pullAudioFrame", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let frame: agorartc.AudioFrame = {
        type: agorartc.AUDIO_FRAME_TYPE.FRAME_TYPE_PCM16,
        samplesPerChannel: 2,
        bytesPerSample: agorartc.BYTES_PER_SAMPLE.TWO_BYTES_PER_SAMPLE,
        channels: 2,
        samplesPerSec: 4400,
        buffer: new Uint8ClampedArray(),
        renderTimeMs: 0,
        avsync_type: 0,
    };
    let paramObj = {
        frame,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_PULLAUDIOFRAME, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_pullAudioFrame ", ret, 0);
    shouldEqual("IMediaEngine_pullAudioFrame:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_setExternalVideoSource", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = true;
    let useTexture: boolean = false;
    let sourceType: agorartc.EXTERNAL_VIDEO_SOURCE_TYPE = agorartc.EXTERNAL_VIDEO_SOURCE_TYPE.ENCODED_VIDEO_FRAME;
    let paramObj = {
        enabled,
        useTexture,
        sourceType,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_SETEXTERNALVIDEOSOURCE, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_setExternalVideoSource ", ret, 0);
    shouldEqual("IMediaEngine_setExternalVideoSource:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_setExternalAudioSource", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = true;
    let sampleRate: number = 0;
    let channels: number = 0;
    let sourceNumber: number = 0;
    let localPlayback: boolean = false;
    let publish: boolean = true;
    let paramObj = {
        enabled,
        sampleRate,
        channels,
        sourceNumber,
        localPlayback,
        publish,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_SETEXTERNALAUDIOSOURCE, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_setExternalAudioSource ", ret, 0);
    shouldEqual("IMediaEngine_setExternalAudioSource:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_setExternalAudioSink", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let sampleRate: number = 0;
    let channels: number = 0;
    let paramObj = {
        sampleRate,
        channels,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_SETEXTERNALAUDIOSINK, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_setExternalAudioSink ", ret, 0);
    shouldEqual("IMediaEngine_setExternalAudioSink:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_enableCustomAudioLocalPlayback", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let sourceId: number = 0;
    let enabled: boolean = true;
    let paramObj = {
        sourceId,
        enabled,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_ENABLECUSTOMAUDIOLOCALPLAYBACK, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_enableCustomAudioLocalPlayback ", ret, 0);
    shouldEqual("IMediaEngine_enableCustomAudioLocalPlayback:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_setDirectExternalAudioSource", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enable: boolean = true;
    let localPlayback: boolean = true;
    let paramObj = {
        enable,
        localPlayback,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_SETDIRECTEXTERNALAUDIOSOURCE, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_setDirectExternalAudioSource ", ret, 0);
    shouldEqual("IMediaEngine_setDirectExternalAudioSource:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_pushVideoFrame", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let frame: agorartc.ExternalVideoFrame = {
        type: agorartc.VIDEO_BUFFER_TYPE.VIDEO_BUFFER_RAW_DATA,
        format: agorartc.VIDEO_PIXEL_FORMAT.VIDEO_PIXEL_RGBA,
        buffer: new Uint8ClampedArray(),
        stride: 0,
        height: 0,
        cropLeft: 0,
        cropTop: 0,
        cropRight: 0,
        cropBottom: 0,
        rotation: 0,
        timestamp: 0,
        eglContext: 0,
        eglType: agorartc.EGL_CONTEXT_TYPE.EGL_CONTEXT10,
        textureId: 0,
        matrix: 0,
        metadata_buffer: 0,
        metadata_size: 0,
    };
    let paramObj = {
        frame,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_PUSHVIDEOFRAME, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_pushVideoFrame ", ret, 0);
    shouldEqual("IMediaEngine_pushVideoFrame:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_pushVideoFrame", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let frame: agorartc.ExternalVideoFrame = {
        type: agorartc.VIDEO_BUFFER_TYPE.VIDEO_BUFFER_RAW_DATA,
        format: agorartc.VIDEO_PIXEL_FORMAT.VIDEO_PIXEL_RGBA,
        buffer: new Uint8ClampedArray(),
        stride: 0,
        height: 0,
        cropLeft: 0,
        cropTop: 0,
        cropRight: 0,
        cropBottom: 0,
        rotation: 0,
        timestamp: 0,
        eglContext: 0,
        eglType: agorartc.EGL_CONTEXT_TYPE.EGL_CONTEXT10,
        textureId: 0,
        matrix: 0,
        metadata_buffer: 0,
        metadata_size: 0,
    };
    let connection: agorartc.RtcConnection = {
        localUid: 0,
        channelId: commonChannelId
    };
    let paramObj = {
        frame,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_PUSHVIDEOFRAME, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_pushVideoFrame ", ret, 0);
    shouldEqual("IMediaEngine_pushVideoFrame:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_pushEncodedVideoImage", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let imageBuffer: number = 0;
    let length: number = 0;
    let videoEncodedFrameInfo: agorartc.EncodedVideoFrameInfo = {
        codecType: agorartc.VIDEO_CODEC_TYPE.VIDEO_CODEC_GENERIC_H264,
        width: 0,
        height: 0,
        framesPerSecond: 0,
        frameType: agorartc.VIDEO_FRAME_TYPE.VIDEO_FRAME_TYPE_KEY_FRAME,
        rotation: agorartc.VIDEO_ORIENTATION.VIDEO_ORIENTATION_0,
        trackId: 0,
        captureTimeMs: 0,
        uid: 0,
        streamType: agorartc.VIDEO_STREAM_TYPE.VIDEO_STREAM_HIGH,
    };
    let paramObj = {
        imageBuffer,
        length,
        videoEncodedFrameInfo,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_PUSHENCODEDVIDEOIMAGE, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_pushEncodedVideoImage ", ret, 0);
    shouldEqual("IMediaEngine_pushEncodedVideoImage:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaEngine_pushEncodedVideoImage", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let imageBuffer: number = 0;
    let length: number = 0;
    let videoEncodedFrameInfo: agorartc.EncodedVideoFrameInfo = {
        codecType: agorartc.VIDEO_CODEC_TYPE.VIDEO_CODEC_GENERIC_H264,
        width: 0,
        height: 0,
        framesPerSecond: 0,
        frameType: agorartc.VIDEO_FRAME_TYPE.VIDEO_FRAME_TYPE_KEY_FRAME,
        rotation: agorartc.VIDEO_ORIENTATION.VIDEO_ORIENTATION_0,
        trackId: 0,
        captureTimeMs: 0,
        uid: 0,
        streamType: agorartc.VIDEO_STREAM_TYPE.VIDEO_STREAM_HIGH,
    };
    let connection: agorartc.RtcConnection = {
        localUid: 0,
        channelId: commonChannelId
    };
    let paramObj = {
        imageBuffer,
        length,
        videoEncodedFrameInfo,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAENGINE_PUSHENCODEDVIDEOIMAGE, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaEngine_pushEncodedVideoImage ", ret, 0);
    shouldEqual("IMediaEngine_pushEncodedVideoImage:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});



//IMediaPlayer

test("IMediaPlayer_open", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let url: string = "helloWorld";
    let startPos: number = 0;
    let paramObj = {
        playerId,
        url,
        startPos,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_OPEN, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_open ", ret, 0);
    shouldEqual("IMediaPlayer_open:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_openWithCustomSource", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let startPos: number = 0;
    let provider: agorartc.IMediaPlayerCustomDataProvider = new agorartc.IMediaPlayerCustomDataProvider();
    let paramObj = {
        playerId,
        startPos,
        provider,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_OPENWITHCUSTOMSOURCE, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_openWithCustomSource ", ret, 0);
    shouldEqual("IMediaPlayer_openWithCustomSource:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_play", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let paramObj = {
        playerId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_PLAY, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_play ", ret, 0);
    shouldEqual("IMediaPlayer_play:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_pause", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let paramObj = {
        playerId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_PAUSE, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_pause ", ret, 0);
    shouldEqual("IMediaPlayer_pause:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_stop", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let paramObj = {
        playerId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_STOP, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_stop ", ret, 0);
    shouldEqual("IMediaPlayer_stop:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_resume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let paramObj = {
        playerId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_RESUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_resume ", ret, 0);
    shouldEqual("IMediaPlayer_resume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_seek", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let newPos: number = 0;
    let paramObj = {
        playerId,
        newPos,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SEEK, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_seek ", ret, 0);
    shouldEqual("IMediaPlayer_seek:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_setAudioPitch", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let pitch: number = 0;
    let paramObj = {
        playerId,
        pitch,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SETAUDIOPITCH, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_setAudioPitch ", ret, 0);
    shouldEqual("IMediaPlayer_setAudioPitch:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_getDuration", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let duration: number = 0;
    let paramObj = {
        playerId,
        duration,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_GETDURATION, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_getDuration ", ret, 0);
    shouldEqual("IMediaPlayer_getDuration:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_getPlayPosition", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let pos: number = 0;
    let paramObj = {
        playerId,
        pos,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_GETPLAYPOSITION, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_getPlayPosition ", ret, 0);
    shouldEqual("IMediaPlayer_getPlayPosition:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_getStreamCount", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let count: number = 0;
    let paramObj = {
        playerId,
        count,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_GETSTREAMCOUNT, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_getStreamCount ", ret, 0);
    shouldEqual("IMediaPlayer_getStreamCount:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_getStreamInfo", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let index: number = 0;
    let info: agorartc.PlayerStreamInfo = {
        streamIndex: 0,
        streamType: agorartc.MEDIA_STREAM_TYPE.STREAM_TYPE_AUDIO,
        codecName: "h264",
        language: "cn",
        videoFrameRate: 0,
        videoBitRate: 0,
        videoWidth: 0,
        videoHeight: 0,
        videoRotation: 0,
        audioSampleRate: 0,
        audioChannels: 0,
        audioBitsPerSample: 0,
        duration: 0,
    }
    let paramObj = {
        playerId,
        index,
        info,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_GETSTREAMINFO, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_getStreamInfo ", ret, 0);
    shouldEqual("IMediaPlayer_getStreamInfo:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_setLoopCount", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let loopCount: number = 0;
    let paramObj = {
        playerId,
        loopCount,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SETLOOPCOUNT, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_setLoopCount ", ret, 0);
    shouldEqual("IMediaPlayer_setLoopCount:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_muteAudio", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let audio_mute: boolean = true;
    let paramObj = {
        playerId,
        audio_mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_MUTEAUDIO, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_muteAudio ", ret, 0);
    shouldEqual("IMediaPlayer_muteAudio:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_isAudioMuted", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let paramObj = {
        playerId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_ISAUDIOMUTED, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_isAudioMuted ", ret, 0);
    shouldEqual("IMediaPlayer_isAudioMuted:result ", result.result, false);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_muteVideo", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let video_mute: boolean = true;
    let paramObj = {
        playerId,
        video_mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_MUTEVIDEO, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_muteVideo ", ret, 0);
    shouldEqual("IMediaPlayer_muteVideo:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_isVideoMuted", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let paramObj = {
        playerId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_ISVIDEOMUTED, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_isVideoMuted ", ret, 0);
    shouldEqual("IMediaPlayer_isVideoMuted:result ", result.result, false);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_setPlaybackSpeed", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let speed: number = 0;
    let paramObj = {
        playerId,
        speed,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SETPLAYBACKSPEED, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_setPlaybackSpeed ", ret, 0);
    shouldEqual("IMediaPlayer_setPlaybackSpeed:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_selectAudioTrack", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let index: number = 0;
    let paramObj = {
        playerId,
        index,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SELECTAUDIOTRACK, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_selectAudioTrack ", ret, 0);
    shouldEqual("IMediaPlayer_selectAudioTrack:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_setPlayerOption", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let key: string = "key";
    let value: number = 0;
    let paramObj = {
        playerId,
        key,
        value,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SETPLAYEROPTION, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_setPlayerOption ", ret, 0);
    shouldEqual("IMediaPlayer_setPlayerOption:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_setPlayerOption2", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let key: string = "key";
    let value: string = "value";
    let paramObj = {
        playerId,
        key,
        value,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SETPLAYEROPTION, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_setPlayerOption2 ", ret, 0);
    shouldEqual("IMediaPlayer_setPlayerOption2:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_takeScreenshot", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let filename: string = "png.png";
    let paramObj = {
        playerId,
        filename,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_TAKESCREENSHOT, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_takeScreenshot ", ret, 0);
    shouldEqual("IMediaPlayer_takeScreenshot:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_selectInternalSubtitle", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let index: number = 0;
    let paramObj = {
        playerId,
        index,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SELECTINTERNALSUBTITLE, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_selectInternalSubtitle ", ret, 0);
    shouldEqual("IMediaPlayer_selectInternalSubtitle:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_setExternalSubtitle", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let url: string = "https://";
    let paramObj = {
        playerId,
        url,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SETEXTERNALSUBTITLE, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_setExternalSubtitle ", ret, 0);
    shouldEqual("IMediaPlayer_setExternalSubtitle:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_getState", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let paramObj = {
        playerId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_GETSTATE, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_getState ", ret, 0);
    shouldEqual("IMediaPlayer_getState:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_mute", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let mute: boolean = true;
    let paramObj = {
        playerId,
        mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_MUTE, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_mute ", ret, 0);
    shouldEqual("IMediaPlayer_mute:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_getMute", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    // let mute: boolean = false;
    let paramObj = {
        playerId,
        // mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_GETMUTE, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_getMute ", ret, 0);
    shouldEqual("IMediaPlayer_getMute:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    shoudlWarn("IMediaPlayer_getMute:mute ", (result.mute !== false && result.mute !== true), "mute = " + result.mute);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_adjustPlayoutVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let volume: number = 0;
    let paramObj = {
        playerId,
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_ADJUSTPLAYOUTVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_adjustPlayoutVolume ", ret, 0);
    shouldEqual("IMediaPlayer_adjustPlayoutVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_getPlayoutVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let volume: number = 0;
    let paramObj = {
        playerId,
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_GETPLAYOUTVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_getPlayoutVolume ", ret, 0);
    shouldEqual("IMediaPlayer_getPlayoutVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_adjustPublishSignalVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let volume: number = 0;
    let paramObj = {
        playerId,
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_ADJUSTPUBLISHSIGNALVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_adjustPublishSignalVolume ", ret, 0);
    shouldEqual("IMediaPlayer_adjustPublishSignalVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_getPublishSignalVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let volume: number = 0;
    let paramObj = {
        playerId,
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_GETPUBLISHSIGNALVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_getPublishSignalVolume ", ret, 0);
    shouldEqual("IMediaPlayer_getPublishSignalVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_setView", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let view: agorartc.view_t = 0;
    let paramObj = {
        playerId,
        view,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SETVIEW, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_setView ", ret, 0);
    shouldEqual("IMediaPlayer_setView:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_setRenderMode", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let renderMode: agorartc.RENDER_MODE_TYPE = agorartc.RENDER_MODE_TYPE.RENDER_MODE_FIT;
    let paramObj = {
        playerId,
        renderMode,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SETRENDERMODE, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_setRenderMode ", ret, 0);
    shouldEqual("IMediaPlayer_setRenderMode:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_registerPlayerSourceObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let observer: agorartc.IMediaPlayerSourceObserver = new agorartc.IMediaPlayerSourceObserver();
    let paramObj = {
        playerId,
        observer,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_REGISTERPLAYERSOURCEOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_registerPlayerSourceObserver ", ret, 0);
    shouldEqual("IMediaPlayer_registerPlayerSourceObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_unregisterPlayerSourceObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let observer: agorartc.IMediaPlayerSourceObserver = new agorartc.IMediaPlayerSourceObserver();
    let paramObj = {
        playerId,
        observer,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_UNREGISTERPLAYERSOURCEOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_unregisterPlayerSourceObserver ", ret, 0);
    shouldEqual("IMediaPlayer_unregisterPlayerSourceObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_registerAudioFrameObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let observer: agorartc.IAudioFrameObserver = new agorartc.IAudioFrameObserver();
    let paramObj = {
        playerId,
        observer,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_REGISTERAUDIOFRAMEOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_registerAudioFrameObserver ", ret, 0);
    shouldEqual("IMediaPlayer_registerAudioFrameObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_registerAudioFrameObserver2", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let observer: agorartc.IAudioFrameObserver = new agorartc.IAudioFrameObserver();
    let mode: agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE = 0;
    let paramObj = {
        playerId,
        observer,
        mode,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_REGISTERAUDIOFRAMEOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_registerAudioFrameObserver2 ", ret, 0);
    shouldEqual("IMediaPlayer_registerAudioFrameObserver2:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_unregisterAudioFrameObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let observer: agorartc.IAudioFrameObserver = new agorartc.IAudioFrameObserver();
    let paramObj = {
        playerId,
        observer,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_UNREGISTERAUDIOFRAMEOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_unregisterAudioFrameObserver ", ret, 0);
    shouldEqual("IMediaPlayer_unregisterAudioFrameObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_registerVideoFrameObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let observer: agorartc.IVideoFrameObserver = new agorartc.IVideoFrameObserver();
    let paramObj = {
        playerId,
        observer,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_REGISTERVIDEOFRAMEOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_registerVideoFrameObserver ", ret, 0);
    shouldEqual("IMediaPlayer_registerVideoFrameObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_unregisterVideoFrameObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let observer: agorartc.IVideoFrameObserver = new agorartc.IVideoFrameObserver();
    let paramObj = {
        playerId,
        observer,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_UNREGISTERVIDEOFRAMEOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_unregisterVideoFrameObserver ", ret, 0);
    shouldEqual("IMediaPlayer_unregisterVideoFrameObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_registerMediaPlayerAudioSpectrumObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let observer: agorartc.IAudioSpectrumObserver = new agorartc.IVideoFrameObserver();
    let intervalInMS: number = 0;
    let paramObj = {
        playerId,
        observer,
        intervalInMS,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_REGISTERMEDIAPLAYERAUDIOSPECTRUMOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_registerMediaPlayerAudioSpectrumObserver ", ret, 0);
    shouldEqual("IMediaPlayer_registerMediaPlayerAudioSpectrumObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_unregisterMediaPlayerAudioSpectrumObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let observer: agorartc.IAudioSpectrumObserver = new agorartc.IAudioSpectrumObserver();
    let paramObj = {
        playerId,
        observer,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_UNREGISTERMEDIAPLAYERAUDIOSPECTRUMOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_unregisterMediaPlayerAudioSpectrumObserver ", ret, 0);
    shouldEqual("IMediaPlayer_unregisterMediaPlayerAudioSpectrumObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_setAudioDualMonoMode", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let mode: agorartc.AUDIO_DUAL_MONO_MODE = 0;
    let paramObj = {
        playerId,
        mode,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SETAUDIODUALMONOMODE, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_setAudioDualMonoMode ", ret, 0);
    shouldEqual("IMediaPlayer_setAudioDualMonoMode:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_getPlayerSdkVersion", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let paramObj = {
        playerId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_GETPLAYERSDKVERSION, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_getPlayerSdkVersion ", ret, 0);
    shoudlWarn("IMediaPlayer_getPlayerSdkVersion:result ", typeof result.result != "string", "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_getPlaySrc", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let paramObj = {
        playerId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_GETPLAYSRC, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_getPlaySrc ", ret, 0);
    shoudlWarn("IMediaPlayer_getPlaySrc:result ", typeof result.result != "string", "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_openWithAgoraCDNSrc", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let src: string = "src";
    let startPos: number = 0;
    let paramObj = {
        playerId,
        src,
        startPos,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_OPENWITHAGORACDNSRC, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_openWithAgoraCDNSrc ", ret, 0);
    shouldEqual("IMediaPlayer_openWithAgoraCDNSrc:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_getAgoraCDNLineCount", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let paramObj = {
        playerId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_GETAGORACDNLINECOUNT, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_getAgoraCDNLineCount ", ret, 0);
    shouldEqual("IMediaPlayer_getAgoraCDNLineCount:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_switchAgoraCDNLineByIndex", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let index: number = 0;
    let paramObj = {
        playerId,
        index,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SWITCHAGORACDNLINEBYINDEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_switchAgoraCDNLineByIndex ", ret, 0);
    shouldEqual("IMediaPlayer_switchAgoraCDNLineByIndex:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_getCurrentAgoraCDNIndex", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let paramObj = {
        playerId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_GETCURRENTAGORACDNINDEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_getCurrentAgoraCDNIndex ", ret, 0);
    shouldEqual("IMediaPlayer_getCurrentAgoraCDNIndex:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_enableAutoSwitchAgoraCDN", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let enable: boolean = true;
    let paramObj = {
        playerId,
        enable,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_ENABLEAUTOSWITCHAGORACDN, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_enableAutoSwitchAgoraCDN ", ret, 0);
    shouldEqual("IMediaPlayer_enableAutoSwitchAgoraCDN:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_renewAgoraCDNSrcToken", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let token: string = "";
    let ts: number = 0;
    let paramObj = {
        playerId,
        token,
        ts,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_RENEWAGORACDNSRCTOKEN, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_renewAgoraCDNSrcToken ", ret, 0);
    shouldEqual("IMediaPlayer_renewAgoraCDNSrcToken:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_switchAgoraCDNSrc", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let src: string = "";
    let syncPts: boolean = true;
    let paramObj = {
        playerId,
        src,
        syncPts,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SWITCHAGORACDNSRC, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_switchAgoraCDNSrc ", ret, 0);
    shouldEqual("IMediaPlayer_switchAgoraCDNSrc:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_switchSrc", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let src: string = "";
    let syncPts: boolean = false;
    let paramObj = {
        playerId,
        src,
        syncPts,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SWITCHSRC, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_switchSrc ", ret, 0);
    shouldEqual("IMediaPlayer_switchSrc:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_preloadSrc", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let src: string = "";
    let startPos: number = 0;
    let paramObj = {
        playerId,
        src,
        startPos,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_PRELOADSRC, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_preloadSrc ", ret, 0);
    shouldEqual("IMediaPlayer_preloadSrc:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_playPreloadedSrc", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let src: string = "";
    let paramObj = {
        playerId,
        src,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_PLAYPRELOADEDSRC, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_playPreloadedSrc ", ret, 0);
    shouldEqual("IMediaPlayer_playPreloadedSrc:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_unloadSrc", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let src: string = "";
    let paramObj = {
        playerId,
        src,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_UNLOADSRC, params, params.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_unloadSrc ", ret, 0);
    shouldEqual("IMediaPlayer_unloadSrc:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IMediaPlayer_setSpatialAudioParams", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let playerId: number = 0;
    let params: agorartc.SpatialAudioParams = {

    }
    let paramObj = {
        playerId,
        params,
    }
    let params2 = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_MEDIAPLAYER_SETSPATIALAUDIOPARAMS, params2, params2.length, null, 0, result);

    shouldEqual("callApi:IMediaPlayer_setSpatialAudioParams ", ret, 0);
    shouldEqual("IMediaPlayer_setSpatialAudioParams:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

//IVideoDeviceManager
test("IVideoDeviceManager_getDevice", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    // let deviceIdUTF8: string = "";
    let paramObj = {
        // deviceIdUTF8,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_VIDEODEVICEMANAGER_GETDEVICE, params, params.length, null, 0, result);

    shouldEqual("callApi:IVideoDeviceManager_getDevice ", ret, 0);
    shoudlWarn("IVideoDeviceManager_getDevice:result ", typeof result.result != "string", "result:" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IVideoDeviceManager_startDeviceTest", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let hwnd: agorartc.view_t = 0;
    let paramObj = {
        hwnd,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_VIDEODEVICEMANAGER_STARTDEVICETEST, params, params.length, null, 0, result);

    shouldEqual("callApi:IVideoDeviceManager_startDeviceTest ", ret, 0);
    shouldEqual("IVideoDeviceManager_startDeviceTest:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IVideoDeviceManager_stopDeviceTest", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_VIDEODEVICEMANAGER_STOPDEVICETEST, params, params.length, null, 0, result);

    shouldEqual("callApi:IVideoDeviceManager_stopDeviceTest ", ret, 0);
    shouldEqual("IVideoDeviceManager_stopDeviceTest:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});


//IRtcEngine
test("IRtcEngine_getVersion", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let build: number = 0;
    let paramObj = {
        build,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETVERSION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getVersion ", ret, 0);
    shoudlWarn("IRtcEngine_getVersion:result ", typeof result.result != "string", "result" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_getErrorDescription", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let code: number = 0;
    let paramObj = {
        code,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETERRORDESCRIPTION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getErrorDescription ", ret, 0);
    shoudlWarn("IRtcEngine_getErrorDescription:result ", typeof result.result != "string", "result" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});


test("IRtcEngine_leaveChannel", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_leaveChannel ", ret, 0);
    shouldEqual("IRtcEngine_leaveChannel:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_leaveChannel2", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let options: agorartc.LeaveChannelOptions = {
        stopAudioMixing: true,
        stopAllEffect: true,
        stopMicrophoneRecording: true,
    };
    let paramObj = {
        options,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_leaveChannel ", ret, 0);
    shouldEqual("IRtcEngine_leaveChannel:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_renewToken", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let token: string = "hello";
    let paramObj = {
        token,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_RENEWTOKEN, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_renewToken ", ret, 0);
    shouldEqual("IRtcEngine_renewToken:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setChannelProfile", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let profile: agorartc.CHANNEL_PROFILE_TYPE = 0;
    let paramObj = {
        profile,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCHANNELPROFILE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setChannelProfile ", ret, 0);
    shouldEqual("IRtcEngine_setChannelProfile:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setClientRole", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let role: agorartc.CLIENT_ROLE_TYPE = agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER;
    let paramObj = {
        role,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCLIENTROLE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setClientRole ", ret, 0);
    shouldEqual("IRtcEngine_setClientRole:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setClientRole", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let role: agorartc.CLIENT_ROLE_TYPE = 0;
    let options: agorartc.ClientRoleOptions = {
        audienceLatencyLevel: agorartc.AUDIENCE_LATENCY_LEVEL_TYPE.AUDIENCE_LATENCY_LEVEL_LOW_LATENCY,
        stopMicrophoneRecording: true,
        stopPreview: true,
    }
    let paramObj = {
        role,
        options,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCLIENTROLE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setClientRole ", ret, 0);
    shouldEqual("IRtcEngine_setClientRole:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startEchoTest", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTECHOTEST, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startEchoTest ", ret, 0);
    shouldEqual("IRtcEngine_startEchoTest:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startEchoTest2", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let intervalInSeconds: number = 1;
    let paramObj = {
        intervalInSeconds,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTECHOTEST2, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startEchoTest ", ret, 0);
    shouldEqual("IRtcEngine_startEchoTest:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_stopEchoTest", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPECHOTEST, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopEchoTest ", ret, 0);
    shouldEqual("IRtcEngine_stopEchoTest:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableVideo", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEVIDEO, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableVideo ", ret, 0);
    shouldEqual("IRtcEngine_enableVideo:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_disableVideo", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_DISABLEVIDEO, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_disableVideo ", ret, 0);
    shouldEqual("IRtcEngine_disableVideo:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startPreview_stopPreview", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = AgoraWrapper.CreateIrisApiEngine();
    apiEngine.setGenerateVideoTrackLabelOrHtmlElementCb(generateVideoTrackLabelOrHtmlElementCb);
    AgoraWrapper.SetIrisRtcEngineEventHandler(apiEngine, eventHandler);

    let result: any = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEVIDEO, "{}", 2, null, null, result);
    shouldEqual("enableVideo: ", result.result, 0);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    result = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTPREVIEW, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startPreview ", ret, 0);
    shouldEqual("IRtcEngine_startPreview:result ", result.result, 0);


    paramObj = {
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPPREVIEW, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopPreview ", ret, 0);
    shouldEqual("IRtcEngine_stopPreview:result ", result.result, 0);

    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startPreview2_stopPreview", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = AgoraWrapper.CreateIrisApiEngine();
    apiEngine.setGenerateVideoTrackLabelOrHtmlElementCb(generateVideoTrackLabelOrHtmlElementCb);
    AgoraWrapper.SetIrisRtcEngineEventHandler(apiEngine, eventHandler);

    let result: any = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_DISABLEAUDIO, "{}", 2, null, null, result);
    shouldEqual("disableAudio: ", result.result, 0);

    result = {};
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEVIDEO, "{}", 2, null, null, result);
    shouldEqual("enableVideo: ", result.result, 0);

    let sourceType: agorartc.VIDEO_SOURCE_TYPE = 0;
    let paramObj: any = {
        sourceType,
    }
    let params = JSON.stringify(paramObj);
    result = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTPREVIEW2, params, params.length, null, 0, result);
    shouldEqual("callApi:IRtcEngine_startPreview ", ret, 0);
    shouldEqual("IRtcEngine_startPreview:result ", result.result, 0);
    await waitForSecond(3);

    paramObj = {
        sourceType,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPPREVIEW2, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopPreview ", ret, 0);
    shouldEqual("IRtcEngine_stopPreview:result ", result.result, 0);

    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});


test("IRtcEngine_startLastmileProbeTest", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let config: agorartc.LastmileProbeConfig = {
        probeUplink: true,
        probeDownlink: true,
        expectedUplinkBitrate: 0,
        expectedDownlinkBitrate: 0,
    };
    let paramObj = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTLASTMILEPROBETEST, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startLastmileProbeTest ", ret, 0);
    shouldEqual("IRtcEngine_startLastmileProbeTest:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_stopLastmileProbeTest", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPLASTMILEPROBETEST, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopLastmileProbeTest ", ret, 0);
    shouldEqual("IRtcEngine_stopLastmileProbeTest:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setVideoEncoderConfiguration", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let config: agorartc.VideoEncoderConfiguration = {
        codecType: agorartc.VIDEO_CODEC_TYPE.VIDEO_CODEC_H264,
        dimensions: { width: 640, height: 360 },
        frameRate: 15,
        minFrameRate: 0,
        bitrate: agorartc.STANDARD_BITRATE,
        minBitrate: agorartc.DEFAULT_MIN_BITRATE,
        orientationMode: agorartc.ORIENTATION_MODE.ORIENTATION_MODE_ADAPTIVE,
        degradationPreference: agorartc.DEGRADATION_PREFERENCE.MAINTAIN_QUALITY,
        mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_DISABLED,
    }
    let paramObj = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETVIDEOENCODERCONFIGURATION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setVideoEncoderConfiguration ", ret, 0);
    shouldEqual("IRtcEngine_setVideoEncoderConfiguration:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setBeautyEffectOptions", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = false;
    let options: agorartc.BeautyOptions = {
        lighteningContrastLevel: agorartc.LIGHTENING_CONTRAST_LEVEL.LIGHTENING_CONTRAST_HIGH,
        lighteningLevel: 0,
        smoothnessLevel: 0,
        rednessLevel: 0,
        sharpnessLevel: 0,
    }
    let type: agorartc.MEDIA_SOURCE_TYPE = 0;
    let paramObj = {
        enabled,
        options,
        type,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETBEAUTYEFFECTOPTIONS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setBeautyEffectOptions ", ret, 0);
    shouldEqual("IRtcEngine_setBeautyEffectOptions:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableVirtualBackground", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = false;
    let backgroundSource: agorartc.VirtualBackgroundSource = {
        background_source_type: agorartc.BACKGROUND_SOURCE_TYPE.BACKGROUND_COLOR,
        color: 0,
        source: "",
        blur_degree: agorartc.BACKGROUND_BLUR_DEGREE.BLUR_DEGREE_HIGH,
    }
    let paramObj = {
        enabled,
        backgroundSource,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEVIRTUALBACKGROUND, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableVirtualBackground ", ret, 0);
    shouldEqual("IRtcEngine_enableVirtualBackground:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableRemoteSuperResolution", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let userId: agorartc.uid_t = 0;
    let enable: boolean = false;
    let paramObj = {
        userId,
        enable,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEREMOTESUPERRESOLUTION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableRemoteSuperResolution ", ret, 0);
    shouldEqual("IRtcEngine_enableRemoteSuperResolution:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setupRemoteVideo", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let canvas: agorartc.VideoCanvas = {
        view: 0,
        renderMode: agorartc.RENDER_MODE_TYPE.RENDER_MODE_FIT,
        mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_AUTO,
        uid: 0,
        isScreenView: false,
        priv: null,
        priv_size: 0,
        sourceType: agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA,
        cropArea: { x: 0, y: 0, width: 0, height: 0 },
        setupMode: agorartc.VIDEO_VIEW_SETUP_MODE.VIDEO_VIEW_SETUP_ADD,
    }
    let paramObj = {
        canvas,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETUPREMOTEVIDEO, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setupRemoteVideo ", ret, 0);
    shouldEqual("IRtcEngine_setupRemoteVideo:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setupLocalVideo", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let canvas: agorartc.VideoCanvas = {
        view: 0,
        renderMode: agorartc.RENDER_MODE_TYPE.RENDER_MODE_FIT,
        mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_AUTO,
        uid: 0,
        isScreenView: false,
        priv: null,
        priv_size: 0,
        sourceType: agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA,
        cropArea: { x: 0, y: 0, width: 0, height: 0 },
        setupMode: agorartc.VIDEO_VIEW_SETUP_MODE.VIDEO_VIEW_SETUP_ADD,
    }
    let paramObj = {
        canvas,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETUPLOCALVIDEO, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setupLocalVideo ", ret, 0);
    shouldEqual("IRtcEngine_setupLocalVideo:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});


test("IRtcEngine_setAudioProfile", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let profile: agorartc.AUDIO_PROFILE_TYPE = agorartc.AUDIO_PROFILE_TYPE.AUDIO_PROFILE_SPEECH_STANDARD;
    let scenario: agorartc.AUDIO_SCENARIO_TYPE = agorartc.AUDIO_SCENARIO_TYPE.AUDIO_SCENARIO_CHATROOM;
    let paramObj = {
        profile,
        scenario,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAUDIOPROFILE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setAudioProfile ", ret, 0);
    shouldEqual("IRtcEngine_setAudioProfile:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setAudioProfile2", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let profile: agorartc.AUDIO_PROFILE_TYPE = agorartc.AUDIO_PROFILE_TYPE.AUDIO_PROFILE_SPEECH_STANDARD;
    let paramObj = {
        profile,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAUDIOPROFILE2, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setAudioProfile ", ret, 0);
    shouldEqual("IRtcEngine_setAudioProfile:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableLocalAudio", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = true;
    let paramObj = {
        enabled,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLELOCALAUDIO, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableLocalAudio ", ret, 0);
    shouldEqual("IRtcEngine_enableLocalAudio:result ", result.result, 0);

    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_muteLocalAudioStream", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let mute: boolean = true;
    let paramObj = {
        mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_MUTELOCALAUDIOSTREAM, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_muteLocalAudioStream ", ret, 0);
    shouldEqual("IRtcEngine_muteLocalAudioStream:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_muteAllRemoteAudioStreams", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let mute: boolean = true;
    let paramObj = {
        mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_MUTEALLREMOTEAUDIOSTREAMS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_muteAllRemoteAudioStreams ", ret, 0);
    shouldEqual("IRtcEngine_muteAllRemoteAudioStreams:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setDefaultMuteAllRemoteAudioStreams", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let mute: boolean = true;
    let paramObj = {
        mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETDEFAULTMUTEALLREMOTEAUDIOSTREAMS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setDefaultMuteAllRemoteAudioStreams ", ret, 0);
    shouldEqual("IRtcEngine_setDefaultMuteAllRemoteAudioStreams:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_muteRemoteAudioStream", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let uid: agorartc.uid_t = 0;
    let mute: boolean = false;
    let paramObj = {
        uid,
        mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_MUTEREMOTEAUDIOSTREAM, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_muteRemoteAudioStream ", ret, 0);
    shouldEqual("IRtcEngine_muteRemoteAudioStream:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_muteLocalVideoStream", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let mute: boolean = true;
    let paramObj = {
        mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_MUTELOCALVIDEOSTREAM, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_muteLocalVideoStream ", ret, 0);
    shouldEqual("IRtcEngine_muteLocalVideoStream:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableLocalVideo", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = true;
    let paramObj = {
        enabled,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLELOCALVIDEO, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableLocalVideo ", ret, 0);
    shouldEqual("IRtcEngine_enableLocalVideo:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_muteAllRemoteVideoStreams", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let mute: boolean = true;
    let paramObj = {
        mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_MUTEALLREMOTEVIDEOSTREAMS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_muteAllRemoteVideoStreams ", ret, 0);
    shouldEqual("IRtcEngine_muteAllRemoteVideoStreams:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setDefaultMuteAllRemoteVideoStreams", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let mute: boolean = true;
    let paramObj = {
        mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETDEFAULTMUTEALLREMOTEVIDEOSTREAMS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setDefaultMuteAllRemoteVideoStreams ", ret, 0);
    shouldEqual("IRtcEngine_setDefaultMuteAllRemoteVideoStreams:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_muteRemoteVideoStream", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let uid: agorartc.uid_t = 0;
    let mute: boolean = true;
    let paramObj = {
        uid,
        mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_MUTEREMOTEVIDEOSTREAM, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_muteRemoteVideoStream ", ret, 0);
    shouldEqual("IRtcEngine_muteRemoteVideoStream:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setRemoteVideoStreamType", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let uid: agorartc.uid_t = 0;
    let streamType: agorartc.VIDEO_STREAM_TYPE = agorartc.VIDEO_STREAM_TYPE.VIDEO_STREAM_HIGH;
    let paramObj = {
        uid,
        streamType,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETREMOTEVIDEOSTREAMTYPE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setRemoteVideoStreamType ", ret, 0);
    shouldEqual("IRtcEngine_setRemoteVideoStreamType:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setRemoteDefaultVideoStreamType", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let streamType: agorartc.VIDEO_STREAM_TYPE = agorartc.VIDEO_STREAM_TYPE.VIDEO_STREAM_HIGH;
    let paramObj = {
        streamType,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETREMOTEDEFAULTVIDEOSTREAMTYPE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setRemoteDefaultVideoStreamType ", ret, 0);
    shouldEqual("IRtcEngine_setRemoteDefaultVideoStreamType:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableAudioVolumeIndication", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let interval: number = 0;
    let smooth: number = 0;
    let reportVad: boolean = true;
    let paramObj = {
        interval,
        smooth,
        reportVad,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEAUDIOVOLUMEINDICATION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableAudioVolumeIndication ", ret, 0);
    shouldEqual("IRtcEngine_enableAudioVolumeIndication:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startAudioRecording", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let filePath: string = "";
    let quality: agorartc.AUDIO_RECORDING_QUALITY_TYPE = agorartc.AUDIO_RECORDING_QUALITY_TYPE.AUDIO_RECORDING_QUALITY_HIGH;
    let paramObj = {
        filePath,
        quality,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTAUDIORECORDING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startAudioRecording ", ret, 0);
    shouldEqual("IRtcEngine_startAudioRecording:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startAudioRecording2", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let filePath: string = "";
    let sampleRate: number = 0;
    let quality: agorartc.AUDIO_RECORDING_QUALITY_TYPE = 0;
    let paramObj = {
        filePath,
        sampleRate,
        quality,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTAUDIORECORDING2, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startAudioRecording ", ret, 0);
    shouldEqual("IRtcEngine_startAudioRecording:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startAudioRecording3", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let config: agorartc.AudioRecordingConfiguration = {
        filePath: "",
        encode: false,
        sampleRate: 32000,
        fileRecordingType: agorartc.AUDIO_FILE_RECORDING_TYPE.AUDIO_FILE_RECORDING_MIC,
        quality: agorartc.AUDIO_RECORDING_QUALITY_TYPE.AUDIO_RECORDING_QUALITY_HIGH,
        recordingChannel: 2
    }
    let paramObj = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTAUDIORECORDING3, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startAudioRecording ", ret, 0);
    shouldEqual("IRtcEngine_startAudioRecording:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_registerAudioEncodedFrameObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let config: agorartc.AudioEncodedFrameObserverConfig = {
        postionType: agorartc.AUDIO_ENCODED_FRAME_OBSERVER_POSITION.AUDIO_ENCODED_FRAME_OBSERVER_POSITION_MIXED,
        encodingType: agorartc.AUDIO_ENCODING_TYPE.AUDIO_ENCODING_TYPE_AAC_16000_LOW
    }
    let observer: agorartc.IAudioEncodedFrameObserver = new agorartc.IAudioEncodedFrameObserver();
    let paramObj = {
        config,
        observer,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REGISTERAUDIOENCODEDFRAMEOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_registerAudioEncodedFrameObserver ", ret, 0);
    shouldEqual("IRtcEngine_registerAudioEncodedFrameObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_stopAudioRecording", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPAUDIORECORDING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopAudioRecording ", ret, 0);
    shouldEqual("IRtcEngine_stopAudioRecording:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_createMediaPlayer", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_CREATEMEDIAPLAYER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_createMediaPlayer ", ret, 0);
    shouldEqual("IRtcEngine_createMediaPlayer:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_destroyMediaPlayer", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let media_player = null;
    let paramObj = {
        media_player,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_DESTROYMEDIAPLAYER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_destroyMediaPlayer ", ret, 0);
    shouldEqual("IRtcEngine_destroyMediaPlayer:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startAudioMixing", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let filePath: string = "";
    let loopback: boolean = true;
    let replace: boolean = true;
    let cycle: number = 0;
    let paramObj = {
        filePath,
        loopback,
        replace,
        cycle,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTAUDIOMIXING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startAudioMixing ", ret, 0);
    shouldEqual("IRtcEngine_startAudioMixing:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startAudioMixing", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let filePath: string = "";
    let loopback: boolean = true;
    let replace: boolean = true;
    let cycle: number = 0;
    let startPos: number = 0;
    let paramObj = {
        filePath,
        loopback,
        replace,
        cycle,
        startPos,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTAUDIOMIXING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startAudioMixing ", ret, 0);
    shouldEqual("IRtcEngine_startAudioMixing:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_stopAudioMixing", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPAUDIOMIXING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopAudioMixing ", ret, 0);
    shouldEqual("IRtcEngine_stopAudioMixing:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_pauseAudioMixing", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PAUSEAUDIOMIXING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_pauseAudioMixing ", ret, 0);
    shouldEqual("IRtcEngine_pauseAudioMixing:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_resumeAudioMixing", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_RESUMEAUDIOMIXING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_resumeAudioMixing ", ret, 0);
    shouldEqual("IRtcEngine_resumeAudioMixing:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_adjustAudioMixingVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let volume: number = 0;
    let paramObj = {
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTAUDIOMIXINGVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_adjustAudioMixingVolume ", ret, 0);
    shouldEqual("IRtcEngine_adjustAudioMixingVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_adjustAudioMixingPublishVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let volume: number = 0;
    let paramObj = {
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTAUDIOMIXINGPUBLISHVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_adjustAudioMixingPublishVolume ", ret, 0);
    shouldEqual("IRtcEngine_adjustAudioMixingPublishVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_getAudioMixingPublishVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETAUDIOMIXINGPUBLISHVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getAudioMixingPublishVolume ", ret, 0);
    shouldEqual("IRtcEngine_getAudioMixingPublishVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_adjustAudioMixingPlayoutVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let volume: number = 0;
    let paramObj = {
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTAUDIOMIXINGPLAYOUTVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_adjustAudioMixingPlayoutVolume ", ret, 0);
    shouldEqual("IRtcEngine_adjustAudioMixingPlayoutVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_getAudioMixingPlayoutVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETAUDIOMIXINGPLAYOUTVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getAudioMixingPlayoutVolume ", ret, 0);
    shouldEqual("IRtcEngine_getAudioMixingPlayoutVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_getAudioMixingDuration", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETAUDIOMIXINGDURATION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getAudioMixingDuration ", ret, 0);
    shouldEqual("IRtcEngine_getAudioMixingDuration:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_getAudioMixingCurrentPosition", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETAUDIOMIXINGCURRENTPOSITION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getAudioMixingCurrentPosition ", ret, 0);
    shouldEqual("IRtcEngine_getAudioMixingCurrentPosition:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setAudioMixingPosition", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let pos: number = 0;
    let paramObj = {
        pos,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAUDIOMIXINGPOSITION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setAudioMixingPosition ", ret, 0);
    shouldEqual("IRtcEngine_setAudioMixingPosition:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setAudioMixingPitch", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let pitch: number = 0;
    let paramObj = {
        pitch,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAUDIOMIXINGPITCH, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setAudioMixingPitch ", ret, 0);
    shouldEqual("IRtcEngine_setAudioMixingPitch:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_getEffectsVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETEFFECTSVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getEffectsVolume ", ret, 0);
    shouldEqual("IRtcEngine_getEffectsVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setEffectsVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let volume: number = 0;
    let paramObj = {
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETEFFECTSVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setEffectsVolume ", ret, 0);
    shouldEqual("IRtcEngine_setEffectsVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_preloadEffect", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let soundId: number = 0;
    let filePath: string = "";
    let startPos: number = 0;
    let paramObj = {
        soundId,
        filePath,
        startPos,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PRELOADEFFECT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_preloadEffect ", ret, 0);
    shouldEqual("IRtcEngine_preloadEffect:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_playEffect", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let soundId: number = 0;
    let filePath: string = "";
    let loopCount: number = 0;
    let pitch: number = 0;
    let pan: number = 0;
    let gain: number = 0;
    let publish: boolean = true;
    let startPos: number = 0;
    let paramObj = {
        soundId,
        filePath,
        loopCount,
        pitch,
        pan,
        gain,
        publish,
        startPos,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PLAYEFFECT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_playEffect ", ret, 0);
    shouldEqual("IRtcEngine_playEffect:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_playAllEffects", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let loopCount: number = 0;
    let pitch: number = 0;
    let pan: number = 0;
    let gain: number = 0;
    let publish: boolean = true;
    let paramObj = {
        loopCount,
        pitch,
        pan,
        gain,
        publish,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PLAYALLEFFECTS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_playAllEffects ", ret, 0);
    shouldEqual("IRtcEngine_playAllEffects:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_getVolumeOfEffect", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let soundId: number = 0;
    let paramObj = {
        soundId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETVOLUMEOFEFFECT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getVolumeOfEffect ", ret, 0);
    shouldEqual("IRtcEngine_getVolumeOfEffect:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setVolumeOfEffect", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let soundId: number = 0;
    let volume: number = 0;
    let paramObj = {
        soundId,
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETVOLUMEOFEFFECT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setVolumeOfEffect ", ret, 0);
    shouldEqual("IRtcEngine_setVolumeOfEffect:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_pauseEffect", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let soundId: number = 0;
    let paramObj = {
        soundId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PAUSEEFFECT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_pauseEffect ", ret, 0);
    shouldEqual("IRtcEngine_pauseEffect:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_pauseAllEffects", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PAUSEALLEFFECTS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_pauseAllEffects ", ret, 0);
    shouldEqual("IRtcEngine_pauseAllEffects:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_resumeEffect", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let soundId: number = 0;
    let paramObj = {
        soundId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_RESUMEEFFECT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_resumeEffect ", ret, 0);
    shouldEqual("IRtcEngine_resumeEffect:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_resumeAllEffects", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_RESUMEALLEFFECTS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_resumeAllEffects ", ret, 0);
    shouldEqual("IRtcEngine_resumeAllEffects:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_stopEffect", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let soundId: number = 0;
    let paramObj = {
        soundId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPEFFECT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopEffect ", ret, 0);
    shouldEqual("IRtcEngine_stopEffect:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_stopAllEffects", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPALLEFFECTS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopAllEffects ", ret, 0);
    shouldEqual("IRtcEngine_stopAllEffects:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_unloadEffect", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let soundId: number = 0;
    let paramObj = {
        soundId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UNLOADEFFECT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_unloadEffect ", ret, 0);
    shouldEqual("IRtcEngine_unloadEffect:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_unloadAllEffects", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UNLOADALLEFFECTS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_unloadAllEffects ", ret, 0);
    shouldEqual("IRtcEngine_unloadAllEffects:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableSoundPositionIndication", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = true;
    let paramObj = {
        enabled,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLESOUNDPOSITIONINDICATION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableSoundPositionIndication ", ret, 0);
    shouldEqual("IRtcEngine_enableSoundPositionIndication:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setRemoteVoicePosition", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let uid: agorartc.uid_t = 0;
    let pan: number = 0;
    let gain: number = 0;
    let paramObj = {
        uid,
        pan,
        gain,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETREMOTEVOICEPOSITION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setRemoteVoicePosition ", ret, 0);
    shouldEqual("IRtcEngine_setRemoteVoicePosition:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableSpatialAudio", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = true;
    let paramObj = {
        enabled,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLESPATIALAUDIO, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableSpatialAudio ", ret, 0);
    shouldEqual("IRtcEngine_enableSpatialAudio:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setRemoteUserSpatialAudioParams", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let uid: agorartc.uid_t = 0;
    let params: agorartc.SpatialAudioParams = {};
    let paramObj = {
        uid,
        params,
    }
    let params2 = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETREMOTEUSERSPATIALAUDIOPARAMS, params2, params2.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setRemoteUserSpatialAudioParams ", ret, 0);
    shouldEqual("IRtcEngine_setRemoteUserSpatialAudioParams:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setVoiceBeautifierPreset", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let preset: agorartc.VOICE_BEAUTIFIER_PRESET = 0;
    let paramObj = {
        preset,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETVOICEBEAUTIFIERPRESET, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setVoiceBeautifierPreset ", ret, 0);
    shouldEqual("IRtcEngine_setVoiceBeautifierPreset:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setAudioEffectPreset", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let preset: agorartc.AUDIO_EFFECT_PRESET = 0;
    let paramObj = {
        preset,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAUDIOEFFECTPRESET, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setAudioEffectPreset ", ret, 0);
    shouldEqual("IRtcEngine_setAudioEffectPreset:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setVoiceConversionPreset", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let preset: agorartc.VOICE_CONVERSION_PRESET = 0;
    let paramObj = {
        preset,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETVOICECONVERSIONPRESET, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setVoiceConversionPreset ", ret, 0);
    shouldEqual("IRtcEngine_setVoiceConversionPreset:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setAudioEffectParameters", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let preset: agorartc.AUDIO_EFFECT_PRESET = agorartc.AUDIO_EFFECT_PRESET.ROOM_ACOUSTICS_3D_VOICE;
    let param1: number = 0;
    let param2: number = 0;
    let paramObj = {
        preset,
        param1,
        param2,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAUDIOEFFECTPARAMETERS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setAudioEffectParameters ", ret, 0);
    shouldEqual("IRtcEngine_setAudioEffectParameters:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setVoiceBeautifierParameters", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let preset: agorartc.VOICE_BEAUTIFIER_PRESET = 0;
    let param1: number = 0;
    let param2: number = 0;
    let paramObj = {
        preset,
        param1,
        param2,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETVOICEBEAUTIFIERPARAMETERS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setVoiceBeautifierParameters ", ret, 0);
    shouldEqual("IRtcEngine_setVoiceBeautifierParameters:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setVoiceConversionParameters", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let preset: agorartc.VOICE_CONVERSION_PRESET = agorartc.VOICE_CONVERSION_PRESET.VOICE_CHANGER_NEUTRAL;
    let param1: number = 0;
    let param2: number = 0;
    let paramObj = {
        preset,
        param1,
        param2,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETVOICECONVERSIONPARAMETERS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setVoiceConversionParameters ", ret, 0);
    shouldEqual("IRtcEngine_setVoiceConversionParameters:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setLocalVoicePitch", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let pitch: number = 0;
    let paramObj = {
        pitch,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALVOICEPITCH, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setLocalVoicePitch ", ret, 0);
    shouldEqual("IRtcEngine_setLocalVoicePitch:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setLocalVoiceEqualization", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let bandFrequency: agorartc.AUDIO_EQUALIZATION_BAND_FREQUENCY = 0;
    let bandGain: number = 0;
    let paramObj = {
        bandFrequency,
        bandGain,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALVOICEEQUALIZATION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setLocalVoiceEqualization ", ret, 0);
    shouldEqual("IRtcEngine_setLocalVoiceEqualization:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setLocalVoiceReverb", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let reverbKey: agorartc.AUDIO_REVERB_TYPE = 0;
    let value: number = 0;
    let paramObj = {
        reverbKey,
        value,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALVOICEREVERB, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setLocalVoiceReverb ", ret, 0);
    shouldEqual("IRtcEngine_setLocalVoiceReverb:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setLogFile", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let filePath: string = "";
    let paramObj = {
        filePath,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOGFILE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setLogFile ", ret, 0);
    shouldEqual("IRtcEngine_setLogFile:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setLogFilter", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let filter: number = 0;
    let paramObj = {
        filter,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOGFILTER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setLogFilter ", ret, 0);
    shouldEqual("IRtcEngine_setLogFilter:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setLogLevel", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let level: agorartc.LOG_LEVEL = 0;
    let paramObj = {
        level,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOGLEVEL, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setLogLevel ", ret, 0);
    shouldEqual("IRtcEngine_setLogLevel:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setLogFileSize", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let fileSizeInKBytes: number = 0;
    let paramObj = {
        fileSizeInKBytes,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOGFILESIZE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setLogFileSize ", ret, 0);
    shouldEqual("IRtcEngine_setLogFileSize:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_uploadLogFile", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);


    let paramObj = {

    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPLOADLOGFILE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_uploadLogFile ", ret, 0);
    shouldEqual("IRtcEngine_uploadLogFile:result ", result.result, 0);
    shoudlWarn("IRtcEngine_uploadLogFile:requestId ", typeof result.requestId != "string", "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setLocalRenderMode", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let renderMode: agorartc.RENDER_MODE_TYPE = agorartc.RENDER_MODE_TYPE.RENDER_MODE_FIT;
    let mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE = agorartc.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_AUTO;
    let paramObj = {
        renderMode,
        mirrorMode,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALRENDERMODE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setLocalRenderMode ", ret, 0);
    shouldEqual("IRtcEngine_setLocalRenderMode:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setRemoteRenderMode", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let uid: agorartc.uid_t = 0;
    let renderMode: agorartc.RENDER_MODE_TYPE = 0;
    let mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE = 0;
    let paramObj = {
        uid,
        renderMode,
        mirrorMode,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETREMOTERENDERMODE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setRemoteRenderMode ", ret, 0);
    shouldEqual("IRtcEngine_setRemoteRenderMode:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setLocalRenderMode2", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let renderMode: agorartc.RENDER_MODE_TYPE = agorartc.RENDER_MODE_TYPE.RENDER_MODE_FIT;
    let paramObj = {
        renderMode,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALRENDERMODE2, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setLocalRenderMode ", ret, 0);
    shouldEqual("IRtcEngine_setLocalRenderMode:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setLocalVideoMirrorMode", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE = agorartc.VIDEO_MIRROR_MODE_TYPE.VIDEO_MIRROR_MODE_ENABLED;
    let paramObj = {
        mirrorMode,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALVIDEOMIRRORMODE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setLocalVideoMirrorMode ", ret, 0);
    shouldEqual("IRtcEngine_setLocalVideoMirrorMode:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableDualStreamMode", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = true;
    let paramObj = {
        enabled,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEDUALSTREAMMODE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableDualStreamMode ", ret, 0);
    shouldEqual("IRtcEngine_enableDualStreamMode:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableDualStreamMode2", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let sourceType: agorartc.VIDEO_SOURCE_TYPE = agorartc.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CAMERA;
    let enabled: boolean = true;
    let paramObj = {
        sourceType,
        enabled,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEDUALSTREAMMODE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableDualStreamMode ", ret, 0);
    shouldEqual("IRtcEngine_enableDualStreamMode:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableDualStreamMode3", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let sourceType: agorartc.VIDEO_SOURCE_TYPE = 0;
    let enabled: boolean = true;
    let streamConfig: agorartc.SimulcastStreamConfig = {
        dimensions: { width: 0, height: 0 },
        bitrate: 0,
        framerate: 15,
    };
    let paramObj = {
        sourceType,
        enabled,
        streamConfig,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEDUALSTREAMMODE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableDualStreamMode ", ret, 0);
    shouldEqual("IRtcEngine_enableDualStreamMode:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableEchoCancellationExternal", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = true;
    let audioSourceDelay: number = 0;
    let paramObj = {
        enabled,
        audioSourceDelay,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEECHOCANCELLATIONEXTERNAL, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableEchoCancellationExternal ", ret, 0);
    shouldEqual("IRtcEngine_enableEchoCancellationExternal:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableCustomAudioLocalPlayback", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let sourceId: number = 0;
    let enabled: boolean = true;
    let paramObj = {
        sourceId,
        enabled,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLECUSTOMAUDIOLOCALPLAYBACK, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableCustomAudioLocalPlayback ", ret, 0);
    shouldEqual("IRtcEngine_enableCustomAudioLocalPlayback:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startPrimaryCustomAudioTrack", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let config: agorartc.AudioTrackConfig = {
        enableLocalPlayback: true,
    }
    let paramObj = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTPRIMARYCUSTOMAUDIOTRACK, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startPrimaryCustomAudioTrack ", ret, 0);
    shouldEqual("IRtcEngine_startPrimaryCustomAudioTrack:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_stopPrimaryCustomAudioTrack", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPPRIMARYCUSTOMAUDIOTRACK, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopPrimaryCustomAudioTrack ", ret, 0);
    shouldEqual("IRtcEngine_stopPrimaryCustomAudioTrack:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startSecondaryCustomAudioTrack", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let config: agorartc.AudioTrackConfig = {
        enableLocalPlayback: true,
    }
    let paramObj = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSECONDARYCUSTOMAUDIOTRACK, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startSecondaryCustomAudioTrack ", ret, 0);
    shouldEqual("IRtcEngine_startSecondaryCustomAudioTrack:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_stopSecondaryCustomAudioTrack", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPSECONDARYCUSTOMAUDIOTRACK, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopSecondaryCustomAudioTrack ", ret, 0);
    shouldEqual("IRtcEngine_stopSecondaryCustomAudioTrack:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setRecordingAudioFrameParameters", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let sampleRate: number = 0;
    let channel: number = 0;
    let mode: agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE = agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE.RAW_AUDIO_FRAME_OP_MODE_READ_WRITE;
    let samplesPerCall: number = 0;
    let paramObj = {
        sampleRate,
        channel,
        mode,
        samplesPerCall,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETRECORDINGAUDIOFRAMEPARAMETERS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setRecordingAudioFrameParameters ", ret, 0);
    shouldEqual("IRtcEngine_setRecordingAudioFrameParameters:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setPlaybackAudioFrameParameters", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let sampleRate: number = 0;
    let channel: number = 0;
    let mode: agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE = agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE.RAW_AUDIO_FRAME_OP_MODE_READ_WRITE;
    let samplesPerCall: number = 0;
    let paramObj = {
        sampleRate,
        channel,
        mode,
        samplesPerCall,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETPLAYBACKAUDIOFRAMEPARAMETERS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setPlaybackAudioFrameParameters ", ret, 0);
    shouldEqual("IRtcEngine_setPlaybackAudioFrameParameters:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setMixedAudioFrameParameters", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let sampleRate: number = 0;
    let channel: number = 0;
    let samplesPerCall: number = 0;
    let paramObj = {
        sampleRate,
        channel,
        samplesPerCall,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETMIXEDAUDIOFRAMEPARAMETERS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setMixedAudioFrameParameters ", ret, 0);
    shouldEqual("IRtcEngine_setMixedAudioFrameParameters:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setPlaybackAudioFrameBeforeMixingParameters", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let sampleRate: number = 0;
    let channel: number = 0;
    let paramObj = {
        sampleRate,
        channel,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETPLAYBACKAUDIOFRAMEBEFOREMIXINGPARAMETERS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setPlaybackAudioFrameBeforeMixingParameters ", ret, 0);
    shouldEqual("IRtcEngine_setPlaybackAudioFrameBeforeMixingParameters:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableAudioSpectrumMonitor", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let intervalInMS: number = 0;
    let paramObj = {
        intervalInMS,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEAUDIOSPECTRUMMONITOR, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableAudioSpectrumMonitor ", ret, 0);
    shouldEqual("IRtcEngine_enableAudioSpectrumMonitor:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_disableAudioSpectrumMonitor", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_DISABLEAUDIOSPECTRUMMONITOR, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_disableAudioSpectrumMonitor ", ret, 0);
    shouldEqual("IRtcEngine_disableAudioSpectrumMonitor:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_registerAudioSpectrumObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let observer: agorartc.IAudioSpectrumObserver = new agorartc.IAudioSpectrumObserver();
    let paramObj = {
        observer,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REGISTERAUDIOSPECTRUMOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_registerAudioSpectrumObserver ", ret, 0);
    shouldEqual("IRtcEngine_registerAudioSpectrumObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_unregisterAudioSpectrumObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let observer: agorartc.IAudioSpectrumObserver = new agorartc.IAudioSpectrumObserver();
    let paramObj = {
        observer,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UNREGISTERAUDIOSPECTRUMOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_unregisterAudioSpectrumObserver ", ret, 0);
    shouldEqual("IRtcEngine_unregisterAudioSpectrumObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_adjustRecordingSignalVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let volume: number = 50;
    let paramObj = {
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTRECORDINGSIGNALVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_adjustRecordingSignalVolume ", ret, 0);
    shouldEqual("IRtcEngine_adjustRecordingSignalVolume:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_muteRecordingSignal", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let mute: boolean = true;
    let paramObj = {
        mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_MUTERECORDINGSIGNAL, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_muteRecordingSignal ", ret, 0);
    shouldEqual("IRtcEngine_muteRecordingSignal:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_adjustPlaybackSignalVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let volume: number = 50;
    let paramObj = {
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTPLAYBACKSIGNALVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_adjustPlaybackSignalVolume:50 ", ret, 0);
    shouldEqual("IRtcEngine_adjustPlaybackSignalVolume:result:50 ", result.result, 0);
    await waitForSecond(1);


    volume = -10;
    paramObj = {

        volume,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTPLAYBACKSIGNALVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_adjustUserPlaybackSignalVolume:-10 ", ret, 0);
    shouldEqual("IRtcEngine_adjustUserPlaybackSignalVolume:result:-10 ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_INVALID_ARGUMENT);
    waitForSecond(1);


    volume = 101;
    paramObj = {

        volume,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTPLAYBACKSIGNALVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_adjustUserPlaybackSignalVolume:101 ", ret, 0);
    shouldEqual("IRtcEngine_adjustUserPlaybackSignalVolume:result:101 ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_INVALID_ARGUMENT);
    waitForSecond(1);

    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_adjustUserPlaybackSignalVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let uid: number = 0;
    let volume: number = 50;
    let paramObj = {
        uid,
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTUSERPLAYBACKSIGNALVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_adjustUserPlaybackSignalVolume:50 ", ret, 0);
    shouldEqual("IRtcEngine_adjustUserPlaybackSignalVolume:result:50 ", result.result, 0);
    await waitForSecond(1);

    uid = 0;
    volume = -10;
    paramObj = {
        uid,
        volume,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTUSERPLAYBACKSIGNALVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_adjustUserPlaybackSignalVolume:-10 ", ret, 0);
    shouldEqual("IRtcEngine_adjustUserPlaybackSignalVolume:result:-10 ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_INVALID_ARGUMENT);
    await waitForSecond(1);

    uid = 0;
    volume = 101;
    paramObj = {
        uid,
        volume,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTUSERPLAYBACKSIGNALVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_adjustUserPlaybackSignalVolume:101 ", ret, 0);
    shouldEqual("IRtcEngine_adjustUserPlaybackSignalVolume:result:101 ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_INVALID_ARGUMENT);
    await waitForSecond(1);

    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setLocalPublishFallbackOption", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let option: agorartc.STREAM_FALLBACK_OPTIONS = 0;
    let paramObj = {
        option,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALPUBLISHFALLBACKOPTION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setLocalPublishFallbackOption ", ret, 0);
    shouldEqual("IRtcEngine_setLocalPublishFallbackOption:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setRemoteSubscribeFallbackOption", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let option: agorartc.STREAM_FALLBACK_OPTIONS = agorartc.STREAM_FALLBACK_OPTIONS.STREAM_FALLBACK_OPTION_DISABLED;
    let paramObj = {
        option,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETREMOTESUBSCRIBEFALLBACKOPTION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setRemoteSubscribeFallbackOption ", ret, 0);
    shouldEqual("IRtcEngine_setRemoteSubscribeFallbackOption:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableLoopbackRecording", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = true;
    let deviceName: string = "";
    let paramObj = {
        enabled,
        deviceName,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLELOOPBACKRECORDING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableLoopbackRecording ", ret, 0);
    shouldEqual("IRtcEngine_enableLoopbackRecording:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_adjustLoopbackRecordingVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let volume: number = 0;
    let paramObj = {
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTLOOPBACKRECORDINGVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_adjustLoopbackRecordingVolume ", ret, 0);
    shouldEqual("IRtcEngine_adjustLoopbackRecordingVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_getLoopbackRecordingVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETLOOPBACKRECORDINGVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getLoopbackRecordingVolume ", ret, 0);
    shouldEqual("IRtcEngine_getLoopbackRecordingVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableInEarMonitoring", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = true;
    let includeAudioFilters: number = 0;
    let paramObj = {
        enabled,
        includeAudioFilters,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEINEARMONITORING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableInEarMonitoring ", ret, 0);
    shouldEqual("IRtcEngine_enableInEarMonitoring:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setInEarMonitoringVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let volume: number = 0;
    let paramObj = {
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETINEARMONITORINGVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setInEarMonitoringVolume ", ret, 0);
    shouldEqual("IRtcEngine_setInEarMonitoringVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_loadExtensionProvider", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let path: string = "";
    let paramObj = {
        path,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LOADEXTENSIONPROVIDER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_loadExtensionProvider ", ret, 0);
    shouldEqual("IRtcEngine_loadExtensionProvider:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setExtensionProviderProperty", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let provider: string = "";
    let key: string = "";
    let value: string = "";
    let paramObj = {
        provider,
        key,
        value,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETEXTENSIONPROVIDERPROPERTY, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setExtensionProviderProperty ", ret, 0);
    shouldEqual("IRtcEngine_setExtensionProviderProperty:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableExtension", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let provider: string = "";
    let extension: string = "";
    let enable: boolean = true;
    let type: agorartc.MEDIA_SOURCE_TYPE = 0;
    let paramObj = {
        provider,
        extension,
        enable,
        type,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEEXTENSION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableExtension ", ret, 0);
    shouldEqual("IRtcEngine_enableExtension:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setExtensionProperty", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let provider: string = "";
    let extension: string = "";
    let key: string = "";
    let value: string = "";
    let type: agorartc.MEDIA_SOURCE_TYPE = 0;
    let paramObj = {
        provider,
        extension,
        key,
        value,
        type,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETEXTENSIONPROPERTY, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setExtensionProperty ", ret, 0);
    shouldEqual("IRtcEngine_setExtensionProperty:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_getExtensionProperty", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let provider: string = "";
    let extension: string = "";
    let key: string = "";
    let value: string = "";
    let buf_len: number = 0;
    let type: agorartc.MEDIA_SOURCE_TYPE = 0;
    let paramObj = {
        provider,
        extension,
        key,
        value,
        buf_len,
        type,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETEXTENSIONPROPERTY, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getExtensionProperty ", ret, 0);
    shouldEqual("IRtcEngine_getExtensionProperty:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setCameraCapturerConfiguration", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);


    // let deviceIdUTF8: string = "";

    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_VIDEODEVICEMANAGER_ENUMERATEVIDEODEVICES, "{}", 2, null, 0, result);

    shouldEqual("callApi:IVideoDeviceManager_getDevice ", ret, 0);
    shoudlWarn("IVideoDeviceManager_getDevice:result ", typeof result.result.length != "number", "result:" + result.result);
    await waitForSecond(1);

    let devices: agorartc.DeviceInfo[] = result.result;
    let config: agorartc.CameraCapturerConfiguration = {
        cameraDirection: agorartc.CAMERA_DIRECTION.CAMERA_FRONT,
        format: {
            width: 960,
            height: 640,
            fps: 15,
        },
        deviceId: devices[0].deviceId,
    };
    let paramObj = {
        config,
    }
    let params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERACAPTURERCONFIGURATION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setCameraCapturerConfiguration ", ret, 0);
    shouldEqual("IRtcEngine_setCameraCapturerConfiguration:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_isCameraZoomSupported", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISCAMERAZOOMSUPPORTED, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_isCameraZoomSupported ", ret, 0);
    shoudlWarn("IRtcEngine_isCameraZoomSupported:result ", typeof result.result != "boolean", "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_isCameraFaceDetectSupported", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISCAMERAFACEDETECTSUPPORTED, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_isCameraFaceDetectSupported ", ret, 0);
    shoudlWarn("IRtcEngine_isCameraFaceDetectSupported:result ", typeof result.result != "boolean", "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_isCameraTorchSupported", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISCAMERATORCHSUPPORTED, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_isCameraTorchSupported ", ret, 0);
    shoudlWarn("IRtcEngine_isCameraTorchSupported:result ", typeof result.result != "boolean", "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_isCameraFocusSupported", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISCAMERAFOCUSSUPPORTED, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_isCameraFocusSupported ", ret, 0);
    shoudlWarn("IRtcEngine_isCameraFocusSupported:result ", typeof result.result != "boolean", "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_isCameraAutoFocusFaceModeSupported", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISCAMERAAUTOFOCUSFACEMODESUPPORTED, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_isCameraAutoFocusFaceModeSupported ", ret, 0);
    shoudlWarn("IRtcEngine_isCameraAutoFocusFaceModeSupported:result ", typeof result.result != "boolean", "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setCameraZoomFactor", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let factor: number = 0;
    let paramObj = {
        factor,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERAZOOMFACTOR, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setCameraZoomFactor ", ret, 0);
    shouldEqual("IRtcEngine_setCameraZoomFactor:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableFaceDetection", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = true;
    let paramObj = {
        enabled,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEFACEDETECTION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableFaceDetection ", ret, 0);
    shouldEqual("IRtcEngine_enableFaceDetection:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_getCameraMaxZoomFactor", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETCAMERAMAXZOOMFACTOR, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getCameraMaxZoomFactor ", ret, 0);
    shoudlWarn("IRtcEngine_getCameraMaxZoomFactor:result ", typeof result.result != "number", "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);

});

test("IRtcEngine_setCameraFocusPositionInPreview", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let positionX: number = 0;
    let positionY: number = 0;
    let paramObj = {
        positionX,
        positionY,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERAFOCUSPOSITIONINPREVIEW, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setCameraFocusPositionInPreview ", ret, 0);
    shouldEqual("IRtcEngine_setCameraFocusPositionInPreview:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setCameraTorchOn", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let isOn: boolean = true;
    let paramObj = {
        isOn,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERATORCHON, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setCameraTorchOn ", ret, 0);
    shouldEqual("IRtcEngine_setCameraTorchOn:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setCameraAutoFocusFaceModeEnabled", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = true;
    let paramObj = {
        enabled,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERAAUTOFOCUSFACEMODEENABLED, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setCameraAutoFocusFaceModeEnabled ", ret, 0);
    shouldEqual("IRtcEngine_setCameraAutoFocusFaceModeEnabled:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_isCameraExposurePositionSupported", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISCAMERAEXPOSUREPOSITIONSUPPORTED, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_isCameraExposurePositionSupported ", ret, 0);
    shoudlWarn("IRtcEngine_isCameraExposurePositionSupported:result ", typeof result.result != "boolean", 'result=' + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setCameraExposurePosition", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let positionXinView: number = 0;
    let positionYinView: number = 0;
    let paramObj = {
        positionXinView,
        positionYinView,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERAEXPOSUREPOSITION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setCameraExposurePosition ", ret, 0);
    shouldEqual("IRtcEngine_setCameraExposurePosition:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_isCameraAutoExposureFaceModeSupported", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISCAMERAAUTOEXPOSUREFACEMODESUPPORTED, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_isCameraAutoExposureFaceModeSupported ", ret, 0);
    shoudlWarn("IRtcEngine_isCameraAutoExposureFaceModeSupported:result ", typeof result.result != 'boolean', "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setCameraAutoExposureFaceModeEnabled", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = true;
    let paramObj = {
        enabled,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERAAUTOEXPOSUREFACEMODEENABLED, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setCameraAutoExposureFaceModeEnabled ", ret, 0);
    shouldEqual("IRtcEngine_setCameraAutoExposureFaceModeEnabled:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setDefaultAudioRouteToSpeakerphone", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let defaultToSpeaker: boolean = true;
    let paramObj = {
        defaultToSpeaker,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETDEFAULTAUDIOROUTETOSPEAKERPHONE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setDefaultAudioRouteToSpeakerphone ", ret, 0);
    shouldEqual("IRtcEngine_setDefaultAudioRouteToSpeakerphone:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setEnableSpeakerphone", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let speakerOn: boolean = true;
    let paramObj = {
        speakerOn,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETENABLESPEAKERPHONE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setEnableSpeakerphone ", ret, 0);
    shouldEqual("IRtcEngine_setEnableSpeakerphone:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_isSpeakerphoneEnabled", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISSPEAKERPHONEENABLED, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_isSpeakerphoneEnabled ", ret, 0);
    shoudlWarn("IRtcEngine_isSpeakerphoneEnabled:result ", typeof result.result != 'boolean', "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_getScreenCaptureSources", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let thumbSize: number = 0;
    let iconSize: number = 0;
    let includeScreen: boolean = true;
    let paramObj = {
        thumbSize,
        iconSize,
        includeScreen,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETSCREENCAPTURESOURCES, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getScreenCaptureSources ", ret, 0);
    shoudlWarn("IRtcEngine_getScreenCaptureSources:result ", typeof result.result.length != 'number', 'result=' + result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setAudioSessionOperationRestriction", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let restriction: agorartc.AUDIO_SESSION_OPERATION_RESTRICTION = 0;
    let paramObj = {
        restriction,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAUDIOSESSIONOPERATIONRESTRICTION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setAudioSessionOperationRestriction ", ret, 0);
    shouldEqual("IRtcEngine_setAudioSessionOperationRestriction:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});



test("IRtcEngine_getAudioDeviceInfo", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {

    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETAUDIODEVICEINFO, params, params.length, null, 0, result);
    shouldEqual("callApi:IRtcEngine_getAudioDeviceInfo ", ret, 0);
    let deviceInfo: agorartc.DeviceInfo = result.result;

    // shoudlWarn("IRtcEngine_getAudioDeviceInfo:result deviceId", typeof deviceInfo.deviceId != 'string', 'deviceId=' + deviceInfo.deviceId);
    // shoudlWarn("IRtcEngine_getAudioDeviceInfo:result deviceName", typeof deviceInfo.deviceName != 'string', 'deviceName=' + deviceInfo.deviceName);
    shouldEqual("IRtcEngine_getAudioDeviceInfo:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);

});


test("IRtcEngine_getCallId", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {

    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETCALLID, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getCallId ", ret, 0);
    shouldEqual("IRtcEngine_getCallId:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    shoudlWarn("IRtcEngine_getCallId:callId ", typeof result.callId != "string", "callId=" + result.callId);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_rate", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let callId: string = "";
    let rating: number = 0;
    let description: string = "";
    let paramObj = {
        callId,
        rating,
        description,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_RATE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_rate ", ret, 0);
    shouldEqual("IRtcEngine_rate:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_complain", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let callId: string = "";
    let description: string = "";
    let paramObj = {
        callId,
        description,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_COMPLAIN, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_complain ", ret, 0);
    shouldEqual("IRtcEngine_complain:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_addPublishStreamUrl", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let url: string = "";
    let transcodingEnabled: boolean = true;
    let paramObj = {
        url,
        transcodingEnabled,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADDPUBLISHSTREAMURL, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_addPublishStreamUrl ", ret, 0);
    shouldEqual("IRtcEngine_addPublishStreamUrl:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_removePublishStreamUrl", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let url: string = "";
    let paramObj = {
        url,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REMOVEPUBLISHSTREAMURL, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_removePublishStreamUrl ", ret, 0);
    shouldEqual("IRtcEngine_removePublishStreamUrl:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setLiveTranscoding", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let transcoding: agorartc.LiveTranscoding = {
        width: 0,
        height: 0,
        videoBitrate: 0,
        videoFramerate: 0,
        lowLatency: false,
        videoGop: 0,
        videoCodecProfile: agorartc.VIDEO_CODEC_PROFILE_TYPE.VIDEO_CODEC_PROFILE_BASELINE,
        backgroundColor: 0,
        videoCodecType: agorartc.VIDEO_CODEC_TYPE_FOR_STREAM.VIDEO_CODEC_H264_FOR_STREAM,
        userCount: 0,
        transcodingUsers: null,
        transcodingExtraInfo: "",
        metadata: "",
        watermark: null,
        watermarkCount: 0,
        backgroundImage: null,
        backgroundImageCount: 0,
        audioSampleRate: agorartc.AUDIO_SAMPLE_RATE_TYPE.AUDIO_SAMPLE_RATE_32000,
        audioBitrate: 0,
        audioChannels: 0,
        audioCodecProfile: agorartc.AUDIO_CODEC_PROFILE_TYPE.AUDIO_CODEC_PROFILE_HE_AAC,
        advancedFeatures: null,
        advancedFeatureCount: 0,
    }
    let paramObj = {
        transcoding,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLIVETRANSCODING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setLiveTranscoding ", ret, 0);
    shouldEqual("IRtcEngine_setLiveTranscoding:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});


test("IRtcEngine_startLocalVideoTranscoder", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let config: agorartc.LocalTranscoderConfiguration = {
        streamCount: 0,
        VideoInputStreams: [],
        videoOutputConfiguration: new agorartc.VideoEncoderConfiguration()
    }
    let paramObj = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTLOCALVIDEOTRANSCODER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startLocalVideoTranscoder ", ret, 0);
    shouldEqual("IRtcEngine_startLocalVideoTranscoder:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_updateLocalTranscoderConfiguration", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let config: agorartc.LocalTranscoderConfiguration = {
        streamCount: 0,
        VideoInputStreams: [],
        videoOutputConfiguration: new agorartc.VideoEncoderConfiguration()
    }
    let paramObj = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATELOCALTRANSCODERCONFIGURATION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_updateLocalTranscoderConfiguration ", ret, 0);
    shouldEqual("IRtcEngine_updateLocalTranscoderConfiguration:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_stopLocalVideoTranscoder", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPLOCALVIDEOTRANSCODER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopLocalVideoTranscoder ", ret, 0);
    shouldEqual("IRtcEngine_stopLocalVideoTranscoder:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setCameraDeviceOrientation", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let type: agorartc.VIDEO_SOURCE_TYPE = 0;
    let orientation: agorartc.VIDEO_ORIENTATION = 0;
    let paramObj = {
        type,
        orientation,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERADEVICEORIENTATION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setCameraDeviceOrientation ", ret, 0);
    shouldEqual("IRtcEngine_setCameraDeviceOrientation:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setScreenCaptureOrientation", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let type: agorartc.VIDEO_SOURCE_TYPE = 0;
    let orientation: agorartc.VIDEO_ORIENTATION = 0;
    let paramObj = {
        type,
        orientation,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETSCREENCAPTUREORIENTATION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setScreenCaptureOrientation ", ret, 0);
    shouldEqual("IRtcEngine_setScreenCaptureOrientation:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});


test("IRtcEngine_getConnectionState", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETCONNECTIONSTATE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getConnectionState ", ret, 0);
    shoudlWarn("IRtcEngine_getConnectionState:result ", result.result == agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_DISCONNECTED || result.result == agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_FAILED, "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});


test("IRtcEngine_setRemoteUserPriority", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let uid: agorartc.uid_t = 0;
    let userPriority: agorartc.PRIORITY_TYPE = 0;
    let paramObj = {
        uid,
        userPriority,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETREMOTEUSERPRIORITY, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setRemoteUserPriority ", ret, 0);
    shouldEqual("IRtcEngine_setRemoteUserPriority:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_registerPacketObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let observer: agorartc.IPacketObserver = new agorartc.IPacketObserver();
    let paramObj = {
        observer,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REGISTERPACKETOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_registerPacketObserver ", ret, 0);
    shouldEqual("IRtcEngine_registerPacketObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableEncryption_setEncryptionSecret_setEncryptionMode", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, false, eventHandler);

    let enabled: boolean = true;
    let config: agorartc.EncryptionConfig = new agorartc.EncryptionConfig();
    config.encryptionKey = "heloworld";
    let array: number[] = [69, 110, 99, 114, 121, 112, 116, 105, 111, 110, 75, 100, 102, 83, 97, 108, 116, 73, 110, 66, 97, 115, 101, 54, 52, 83, 116, 114, 105, 110, 103, 115];
    config.encryptionKdfSalt = array;

    let paramObj: any = {
        enabled,
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEENCRYPTION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableEncryption ", ret, 0);
    shouldEqual("IRtcEngine_enableEncryption:result ", result.result, 0);


    let secret: string = "Hello_Unity";
    paramObj = {
        secret,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETENCRYPTIONSECRET, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setEncryptionSecret ", ret, 0);
    shouldEqual("IRtcEngine_setEncryptionSecret:result ", result.result, 0);


    let encryptionMode: string = "aes-128-gcm2";
    paramObj = {
        encryptionMode,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETENCRYPTIONMODE, params, params.length, null, 0, result);
    shouldEqual("callApi:IRtcEngine_setEncryptionMode ", ret, 0);
    shouldEqual("IRtcEngine_setEncryptionMode:result ", result.result, 0);


    let token = "";
    let channelId = commonChannelId;
    let info = "";
    let uid = 0;
    paramObj = {
        token,
        channelId,
        info,
        uid
    };
    result = {};
    params = JSON.stringify(paramObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL, params, params.length, null, null, result);
    shouldEqual("joinChannel: ", result.result, 0);
    await waitForSecond(10);

    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
}  );

test("IRtcEngine_createDataStream", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let streamId: number = 0;
    let reliable: boolean = true;
    let ordered: boolean = true;
    let paramObj = {
        streamId,
        reliable,
        ordered,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_CREATEDATASTREAM, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_createDataStream ", ret, 0);
    shouldEqual("IRtcEngine_createDataStream:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_createDataStream2", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let streamId: number = 0;
    let config: agorartc.DataStreamConfig = {
        syncWithAudio: true,
        ordered: true,
    }
    let paramObj = {
        streamId,
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_CREATEDATASTREAM2, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_createDataStream2 ", ret, 0);
    shouldEqual("IRtcEngine_createDataStream2:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_sendStreamMessage", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let streamId: number = 0;
    let data: string = "";
    let length: number = 0;
    let paramObj = {
        streamId,
        data,
        length,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SENDSTREAMMESSAGE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_sendStreamMessage ", ret, 0);
    shouldEqual("IRtcEngine_sendStreamMessage:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_addVideoWatermark", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let watermark: agorartc.RtcImage = {
        url: "",
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        zOrder: 0,
        alpha: 0,
    }
    let paramObj = {
        watermark,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADDVIDEOWATERMARK, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_addVideoWatermark ", ret, 0);
    shouldEqual("IRtcEngine_addVideoWatermark:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_addVideoWatermark2", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let watermarkUrl: string = "";
    let options: agorartc.WatermarkOptions = null;
    let paramObj = {
        watermarkUrl,
        options,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADDVIDEOWATERMARK2, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_addVideoWatermark2 ", ret, 0);
    shouldEqual("IRtcEngine_addVideoWatermark2:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_clearVideoWatermark", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_CLEARVIDEOWATERMARK, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_clearVideoWatermark ", ret, 0);
    shouldEqual("IRtcEngine_clearVideoWatermark:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_clearVideoWatermarks", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_CLEARVIDEOWATERMARKS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_clearVideoWatermarks ", ret, 0);
    shouldEqual("IRtcEngine_clearVideoWatermarks:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});


test("IRtcEngine_pauseAudio", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PAUSEAUDIO, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_pauseAudio ", ret, 0);
    shouldEqual("IRtcEngine_pauseAudio:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_resumeAudio", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_RESUMEAUDIO, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_resumeAudio ", ret, 0);
    shouldEqual("IRtcEngine_resumeAudio:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableWebSdkInteroperability", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let enabled: boolean = true;
    let paramObj = {
        enabled,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEWEBSDKINTEROPERABILITY, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableWebSdkInteroperability ", ret, 0);
    shouldEqual("IRtcEngine_enableWebSdkInteroperability:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_sendCustomReportMessage", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, false, true, eventHandler);

    let id: string = "";
    let category: string = "";
    let event: string = "";
    let label: string = "";
    let value: number = 0;
    let paramObj = {
        id,
        category,
        event,
        label,
        value,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SENDCUSTOMREPORTMESSAGE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_sendCustomReportMessage ", ret, 0);
    shouldEqual("IRtcEngine_sendCustomReportMessage:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_registerMediaMetadataObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let observer: agorartc.IMetadataObserver = new agorartc.IMetadataObserver();
    let type: agorartc.METADATA_TYPE = agorartc.METADATA_TYPE.UNKNOWN_METADATA;
    let paramObj = {
        observer,
        type,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REGISTERMEDIAMETADATAOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_registerMediaMetadataObserver ", ret, 0);
    shouldEqual("IRtcEngine_registerMediaMetadataObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_unregisterMediaMetadataObserver", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let observer: agorartc.IMetadataObserver = new agorartc.IMetadataObserver();
    let type: agorartc.METADATA_TYPE = agorartc.METADATA_TYPE.VIDEO_METADATA;
    let paramObj = {
        observer,
        type,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UNREGISTERMEDIAMETADATAOBSERVER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_unregisterMediaMetadataObserver ", ret, 0);
    shouldEqual("IRtcEngine_unregisterMediaMetadataObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startAudioFrameDump", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let channel_id: string = "";
    let user_id: agorartc.uid_t = 0;
    let location: string = "";
    let uuid: string = "";
    let passwd: string = "";
    let duration_ms: number = 0;
    let auto_upload: boolean = true;
    let paramObj = {
        channel_id,
        user_id,
        location,
        uuid,
        passwd,
        duration_ms,
        auto_upload,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTAUDIOFRAMEDUMP, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startAudioFrameDump ", ret, 0);
    shouldEqual("IRtcEngine_startAudioFrameDump:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_stopAudioFrameDump", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let channel_id: string = "";
    let user_id: agorartc.uid_t = 0;
    let location: string = "";
    let paramObj = {
        channel_id,
        user_id,
        location,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPAUDIOFRAMEDUMP, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopAudioFrameDump ", ret, 0);
    shouldEqual("IRtcEngine_stopAudioFrameDump:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_registerLocalUserAccount", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let appId: string = "";
    let userAccount: string = "";
    let paramObj = {
        appId,
        userAccount,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REGISTERLOCALUSERACCOUNT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_registerLocalUserAccount ", ret, 0);
    shouldEqual("IRtcEngine_registerLocalUserAccount:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_joinChannelWithUserAccount", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let token: string = "";
    let channelId: string = "";
    let userAccount: string = "";
    let paramObj = {
        token,
        channelId,
        userAccount,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNELWITHUSERACCOUNT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_joinChannelWithUserAccount ", ret, 0);
    shouldEqual("IRtcEngine_joinChannelWithUserAccount:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_joinChannelWithUserAccount", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let token: string = "";
    let channelId: string = "";
    let userAccount: string = "";
    let options: agorartc.ChannelMediaOptions = {
        publishCameraTrack: true,
        publishAudioTrack: true,
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
    }
    let paramObj = {
        token,
        channelId,
        userAccount,
        options,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNELWITHUSERACCOUNT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_joinChannelWithUserAccount ", ret, 0);
    shouldEqual("IRtcEngine_joinChannelWithUserAccount:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_joinChannelWithUserAccountEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let token: string = "";
    let channelId: string = "";
    let userAccount: string = "";
    let options: agorartc.ChannelMediaOptions = {
        publishCameraTrack: true,
        publishAudioTrack: true,
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
    }

    let paramObj = {
        token,
        channelId,
        userAccount,
        options,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNELWITHUSERACCOUNTEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_joinChannelWithUserAccountEx ", ret, 0);
    shouldEqual("IRtcEngine_joinChannelWithUserAccountEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_getUserInfoByUserAccount", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let userAccount: string = "";

    let paramObj = {
        userAccount,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETUSERINFOBYUSERACCOUNT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getUserInfoByUserAccount ", ret, 0);
    shouldEqual("IRtcEngine_getUserInfoByUserAccount:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    shoudlWarn("IRtcEngine_getUserInfoByUserAccount:userInfo ", typeof result.userInfo == 'undefined', "userInfo=" + result.userInfo);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_getUserInfoByUid", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let uid: agorartc.uid_t = 0;

    let paramObj = {
        uid,

    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETUSERINFOBYUID, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_getUserInfoByUid ", ret, 0);
    shouldEqual("IRtcEngine_getUserInfoByUid:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    shoudlWarn("IRtcEngine_getUserInfoByUserAccount:userInfo ", typeof result.userInfo == 'undefined', "userInfo=" + result.userInfo);

    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});


test("IRtcEngine_setDirectCdnStreamingAudioConfiguration", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let profile: agorartc.AUDIO_PROFILE_TYPE = 0;
    let paramObj = {
        profile,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETDIRECTCDNSTREAMINGAUDIOCONFIGURATION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setDirectCdnStreamingAudioConfiguration ", ret, 0);
    shouldEqual("IRtcEngine_setDirectCdnStreamingAudioConfiguration:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setDirectCdnStreamingVideoConfiguration", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let config: agorartc.VideoEncoderConfiguration = new agorartc.VideoEncoderConfiguration();
    let paramObj = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETDIRECTCDNSTREAMINGVIDEOCONFIGURATION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setDirectCdnStreamingVideoConfiguration ", ret, 0);
    shouldEqual("IRtcEngine_setDirectCdnStreamingVideoConfiguration:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startDirectCdnStreaming", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let eventHandler2: agorartc.IDirectCdnStreamingEventHandler = null;
    let publishUrl: string = "";
    let options2: agorartc.DirectCdnStreamingMediaOptions = null;
    let paramObj = {
        eventHandler: eventHandler2,
        publishUrl,
        options: options2,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTDIRECTCDNSTREAMING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startDirectCdnStreaming ", ret, 0);
    shouldEqual("IRtcEngine_startDirectCdnStreaming:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_stopDirectCdnStreaming", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPDIRECTCDNSTREAMING, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopDirectCdnStreaming ", ret, 0);
    shouldEqual("IRtcEngine_stopDirectCdnStreaming:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_updateDirectCdnStreamingMediaOptions", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let options2: agorartc.DirectCdnStreamingMediaOptions = null;
    let paramObj = {
        options: options2,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATEDIRECTCDNSTREAMINGMEDIAOPTIONS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_updateDirectCdnStreamingMediaOptions ", ret, 0);
    shouldEqual("IRtcEngine_updateDirectCdnStreamingMediaOptions:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_pushDirectCdnStreamingCustomVideoFrame", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let frame: agorartc.ExternalVideoFrame = null;
    let paramObj = {
        frame,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PUSHDIRECTCDNSTREAMINGCUSTOMVIDEOFRAME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_pushDirectCdnStreamingCustomVideoFrame ", ret, 0);
    shouldEqual("IRtcEngine_pushDirectCdnStreamingCustomVideoFrame:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_takeSnapshot", async () => {

    let remoteUid = 0;
    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            if (event == "onUserJoinedEx") {
                let obj = JSON.parse(data);
                remoteUid = obj.remoteUid;
            }
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    //验证本地截图
    let config: agorartc.SnapShotConfig = {
        channel: commonChannelId,
        uid: 0,
        filePath: "/Users/xiayangqun/Downloads/Local.png",
    }
    let callback: agorartc.ISnapshotCallback = null;
    let paramObj = {
        config,
        callback,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_TAKESNAPSHOT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_takeSnapshot Local ", ret, 0);
    shouldEqual("IRtcEngine_takeSnapshot Local :result ", result.result, 0);

    //验证远端不存在的截图
    config = {
        channel: commonChannelId,
        uid: 10086,
        filePath: "/Users/xiayangqun/Downloads/noRemote.png",
    }

    paramObj = {
        config,
        callback,
    }
    params = JSON.stringify(paramObj);
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_TAKESNAPSHOT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_takeSnapshot with no remote ", ret, 0);
    shouldEqual("IRtcEngine_takeSnapshot  with no remote :result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_READY);
    await waitForSecond(3);

    //验证远端存在的截图
    if (remoteUid != 0) {
        config = {
            channel: commonChannelId,
            uid: remoteUid,
            filePath: "/Users/xiayangqun/Downloads/haveRemote.png",
        }
        paramObj = {
            config,
            callback,
        }
        params = JSON.stringify(paramObj);
        ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_TAKESNAPSHOT, params, params.length, null, 0, result);

        shouldEqual("callApi:IRtcEngine_takeSnapshot with had remote ", ret, 0);
        shouldEqual("IRtcEngine_takeSnapshot  with had remote :result ", result.result, 0);
    }
    else {
        shoudlWarn("callApi:IRtcEngine_takeSnapshot remote uid ", remoteUid == 0, "remoteUid" + remoteUid);
    }

    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_SetContentInspect", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let config: agorartc.ContentInspectConfig = {
        enable: true,
        DeviceWork: true,
        CloudWork: true,
        extraInfo: "",
        modules: [
            {
                type: agorartc.CONTENT_INSPECT_TYPE.CONTENT_INSPECT_MODERATION,
                frequency: 1,
            }
        ],
        moduleCount: 1,
    }
    let paramObj = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCONTENTINSPECT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_SetContentInspect ", ret, 0);
    shouldEqual("IRtcEngine_SetContentInspect:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_switchChannel", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let token: string = "";
    let channel: string = commonChannelId + "_1";
    let paramObj = {
        token,
        channel,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SWITCHCHANNEL, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_switchChannel ", ret, 0);
    shouldEqual("IRtcEngine_switchChannel:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_startRhythmPlayer", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let sound1: string = "";
    let sound2: string = "";
    let config: agorartc.AgoraRhythmPlayerConfig = {
        beatsPerMeasure: 10,
        beatsPerMinute: 3,
    };
    let paramObj = {
        sound1,
        sound2,
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTRHYTHMPLAYER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_startRhythmPlayer ", ret, 0);
    shouldEqual("IRtcEngine_startRhythmPlayer:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_stopRhythmPlayer", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPRHYTHMPLAYER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_stopRhythmPlayer ", ret, 0);
    shouldEqual("IRtcEngine_stopRhythmPlayer:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_configRhythmPlayer", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let config: agorartc.AgoraRhythmPlayerConfig = {
        beatsPerMeasure: 10,
        beatsPerMinute: 3,
    };
    let paramObj = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_CONFIGRHYTHMPLAYER, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_configRhythmPlayer ", ret, 0);
    shouldEqual("IRtcEngine_configRhythmPlayer:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_adjustCustomAudioPublishVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let sourceId: number = 0;
    let volume: number = 0;
    let paramObj = {
        sourceId,
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTCUSTOMAUDIOPUBLISHVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_adjustCustomAudioPublishVolume ", ret, 0);
    shouldEqual("IRtcEngine_adjustCustomAudioPublishVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_adjustCustomAudioPlayoutVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let sourceId: number = 0;
    let volume: number = 0;
    let paramObj = {
        sourceId,
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTCUSTOMAUDIOPLAYOUTVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_adjustCustomAudioPlayoutVolume ", ret, 0);
    shouldEqual("IRtcEngine_adjustCustomAudioPlayoutVolume:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setCloudProxy", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let proxyType: agorartc.CLOUD_PROXY_TYPE = agorartc.CLOUD_PROXY_TYPE.TCP_PROXY;
    let paramObj = {
        proxyType,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCLOUDPROXY, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setCloudProxy ", ret, 0);
    shouldEqual("IRtcEngine_setCloudProxy:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setLocalAccessPoint", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let config: agorartc.LocalAccessPointConfiguration = null;
    let paramObj = {
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALACCESSPOINT, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setLocalAccessPoint ", ret, 0);
    shouldEqual("IRtcEngine_setLocalAccessPoint:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_enableFishCorrection", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let enabled: boolean = true;
    let params2: agorartc.FishCorrectionParams = null;
    let paramObj = {
        enabled,
        params: params2,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEFISHCORRECTION, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_enableFishCorrection ", ret, 0);
    shouldEqual("IRtcEngine_enableFishCorrection:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setAdvancedAudioOptions", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let options: agorartc.AdvancedAudioOptions = {
        audioProcessingChannels: 2,
    }
    let paramObj = {
        options,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETADVANCEDAUDIOOPTIONS, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setAdvancedAudioOptions ", ret, 0);
    shouldEqual("IRtcEngine_setAdvancedAudioOptions:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngine_setAVSyncSource", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let channelId: string = "";
    let uid: agorartc.uid_t = 0;
    let paramObj = {
        channelId,
        uid,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAVSYNCSOURCE, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngine_setAVSyncSource ", ret, 0);
    shouldEqual("IRtcEngine_setAVSyncSource:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

//IRtcEngineEx

test("IRtcEngineEx_setVideoEncoderConfigurationEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(true, true, true, eventHandler, commonUidEx, options);

    let config: agorartc.VideoEncoderConfiguration = new agorartc.VideoEncoderConfiguration();
    config.dimensions = { width: 1920, height: 720 };
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    };
    let paramObj = {
        config,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SETVIDEOENCODERCONFIGURATIONEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_setVideoEncoderConfigurationEx ", ret, 0);
    shouldEqual("IRtcEngineEx_setVideoEncoderConfigurationEx:result ", result.result, 0);
    await waitForSecond(1);
    await testEndEx(apiEngine, true, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_setupRemoteVideoEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);

    let canvas: agorartc.VideoCanvas = null;
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }

    let paramObj = {
        canvas,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SETUPREMOTEVIDEOEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_setupRemoteVideoEx ", ret, 0);
    shouldEqual("IRtcEngineEx_setupRemoteVideoEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);


    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_muteRemoteAudioStreamEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(true, true, true, eventHandler, commonUidEx, options);

    let uid: agorartc.uid_t = 0;
    let mute: boolean = true;
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }
    let paramObj = {
        uid,
        mute,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_MUTEREMOTEAUDIOSTREAMEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_muteRemoteAudioStreamEx ", ret, 0);
    shouldEqual("IRtcEngineEx_muteRemoteAudioStreamEx:result ", result.result, 0);
    await waitForSecond(1);
    await testEndEx(apiEngine, true, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_muteRemoteVideoStreamEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(true, true, true, eventHandler, commonUidEx, options);


    let uid: agorartc.uid_t = 0;
    let mute: boolean = true;
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }
    let paramObj = {
        uid,
        mute,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_MUTEREMOTEVIDEOSTREAMEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_muteRemoteVideoStreamEx ", ret, 0);
    shouldEqual("IRtcEngineEx_muteRemoteVideoStreamEx:result ", result.result, 0);
    await waitForSecond(1);
    await testEndEx(apiEngine, true, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_setRemoteVideoStreamTypeEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(true, true, true, eventHandler, commonUidEx, options);

    let uid: agorartc.uid_t = 0;

    let streamType: agorartc.VIDEO_STREAM_TYPE = 0;
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }
    let paramObj = {
        uid,
        streamType,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SETREMOTEVIDEOSTREAMTYPEEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_setRemoteVideoStreamTypeEx ", ret, 0);
    shouldEqual("IRtcEngineEx_setRemoteVideoStreamTypeEx:result ", result.result, 0);
    await waitForSecond(1);
    await testEndEx(apiEngine, true, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_setRemoteVoicePositionEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);


    let uid: agorartc.uid_t = 0;
    let pan: number = 0;
    let gain: number = 0;
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }

    let paramObj = {
        uid,
        pan,
        gain,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SETREMOTEVOICEPOSITIONEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_setRemoteVoicePositionEx ", ret, 0);
    shouldEqual("IRtcEngineEx_setRemoteVoicePositionEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);


    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_setRemoteUserSpatialAudioParamsEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };


    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);


    let uid: agorartc.uid_t = 0;
    let params2: agorartc.SpatialAudioParams = null
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }
    let paramObj = {
        uid,
        params: params2,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SETREMOTEUSERSPATIALAUDIOPARAMSEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_setRemoteUserSpatialAudioParamsEx ", ret, 0);
    shouldEqual("IRtcEngineEx_setRemoteUserSpatialAudioParamsEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);


    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_setRemoteRenderModeEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(true, true, true, eventHandler, commonUidEx, options);


    let uid: agorartc.uid_t = 0;
    let renderMode: agorartc.RENDER_MODE_TYPE = 0;
    let mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE = 0;

    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }
    let paramObj = {
        uid,
        renderMode,
        mirrorMode,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SETREMOTERENDERMODEEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_setRemoteRenderModeEx ", ret, 0);
    shouldEqual("IRtcEngineEx_setRemoteRenderModeEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, true, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_enableLoopbackRecordingEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);


    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }

    let enabled: boolean = true;
    let deviceName: string = "";
    let paramObj = {
        connection,
        enabled,
        deviceName,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_ENABLELOOPBACKRECORDINGEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_enableLoopbackRecordingEx ", ret, 0);
    shouldEqual("IRtcEngineEx_enableLoopbackRecordingEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);


    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_getConnectionStateEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };


    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(true, true, true, eventHandler, commonUidEx, options);


    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }

    let paramObj = {
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_GETCONNECTIONSTATEEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_getConnectionStateEx ", ret, 0);
    shoudlWarn("IRtcEngineEx_getConnectionStateEx:result ", result.result != agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTING && result.result != agorartc.CONNECTION_STATE_TYPE.CONNECTION_STATE_CONNECTED, "result=" + result.result);
    await waitForSecond(1);
    await testEndEx(apiEngine, true, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});


test("IRtcEngineEx_enableEncryptionEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(true, true, false, eventHandler, commonUidEx, options);


    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }

    let enabled: boolean = true;
    let config: agorartc.EncryptionConfig = {
        encryptionMode: agorartc.ENCRYPTION_MODE.AES_128_GCM2,
        encryptionKey: "Hello_Unity",
        encryptionKdfSalt: [69, 110, 99, 114, 121, 112, 116, 105, 111, 110, 75, 100, 102, 83, 97, 108, 116, 73, 110, 66, 97, 115, 101, 54, 52, 83, 116, 114, 105, 110, 103, 115],
    }
    let paramObj: any = {
        connection,
        enabled,
        config,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_ENABLEENCRYPTIONEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_enableEncryptionEx ", ret, 0);
    shouldEqual("IRtcEngineEx_enableEncryptionEx:result ", result.result, 0);


    let token = "";
    paramObj = {
        token,
        connection,
        options,
    };
    result = {};
    params = JSON.stringify(paramObj);
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_JOINCHANNELEX, params, params.length, null, null, result);
    shouldEqual("joinChannelEx: ", result.result, 0);
    await waitForSecond(30);


    await testEndEx(apiEngine, true, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
}  );

test("IRtcEngineEx_createDataStreamEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);


    let streamId: number = 0;
    let reliable: boolean = true;
    let ordered: boolean = true;
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }
    let paramObj = {
        streamId,
        reliable,
        ordered,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_CREATEDATASTREAMEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_createDataStreamEx ", ret, 0);
    shouldEqual("IRtcEngineEx_createDataStreamEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, true, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_createDataStreamEx2", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };


    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);


    let streamId: number = 0;
    let config: agorartc.DataStreamConfig = null;
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }

    let paramObj = {
        streamId,
        config,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_CREATEDATASTREAMEX2, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_createDataStreamEx2 ", ret, 0);
    shouldEqual("IRtcEngineEx_createDataStreamEx2:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_sendStreamMessageEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);



    let streamId: number = 0;
    let data: string = "";
    let length: number = 0;
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }
    let paramObj = {
        streamId,
        data,
        length,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SENDSTREAMMESSAGEEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_sendStreamMessageEx ", ret, 0);
    shouldEqual("IRtcEngineEx_sendStreamMessageEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_addVideoWatermarkEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);


    let watermarkUrl: string = "";
    let options2: agorartc.WatermarkOptions = null;
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }
    let paramObj = {
        watermarkUrl,
        options: options2,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_ADDVIDEOWATERMARKEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_addVideoWatermarkEx ", ret, 0);
    shouldEqual("IRtcEngineEx_addVideoWatermarkEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_clearVideoWatermarkEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };


    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);


    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }

    let paramObj = {
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_CLEARVIDEOWATERMARKEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_clearVideoWatermarkEx ", ret, 0);
    shouldEqual("IRtcEngineEx_clearVideoWatermarkEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_sendCustomReportMessageEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(true, true, true, eventHandler, commonUidEx, options);



    let id: string = "";
    let category: string = "";
    let event: string = "";
    let label: string = "";
    let value: number = 0;
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }

    let paramObj = {
        id,
        category,
        event,
        label,
        value,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SENDCUSTOMREPORTMESSAGEEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_sendCustomReportMessageEx ", ret, 0);
    shouldEqual("IRtcEngineEx_sendCustomReportMessageEx:result ", result.result, 0);
    await waitForSecond(1);
    await testEndEx(apiEngine, true, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_enableAudioVolumeIndicationEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(true, true, true, eventHandler, commonUidEx, options);


    let interval: number = 0;
    let smooth: number = 0;
    let reportVad: boolean = true;
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }

    let paramObj = {
        interval,
        smooth,
        reportVad,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_ENABLEAUDIOVOLUMEINDICATIONEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_enableAudioVolumeIndicationEx ", ret, 0);
    shouldEqual("IRtcEngineEx_enableAudioVolumeIndicationEx:result ", result.result, 0);
    await waitForSecond(1);
    await testEndEx(apiEngine, true, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_getUserInfoByUserAccountEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);



    let userAccount: string = "";
    let userInfo: agorartc.UserInfo = { uid: 0, userAccount: "" };
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }

    let paramObj = {
        userAccount,
        userInfo,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_GETUSERINFOBYUSERACCOUNTEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_getUserInfoByUserAccountEx ", ret, 0);
    shouldEqual("IRtcEngineEx_getUserInfoByUserAccountEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_getUserInfoByUidEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };
    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);


    let uid: agorartc.uid_t = 0;
    let userInfo: agorartc.UserInfo = { uid: 0, userAccount: "" };
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }
    let paramObj = {
        uid,
        userInfo,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_GETUSERINFOBYUIDEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_getUserInfoByUidEx ", ret, 0);
    shouldEqual("IRtcEngineEx_getUserInfoByUidEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_setVideoProfileEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);


    let width: number = 0;
    let height: number = 0;
    let frameRate: number = 0;
    let bitrate: number = 0;
    let paramObj = {
        width,
        height,
        frameRate,
        bitrate,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SETVIDEOPROFILEEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_setVideoProfileEx ", ret, 0);
    shouldEqual("IRtcEngineEx_setVideoProfileEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_enableDualStreamModeEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };


    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(true, true, true, eventHandler, commonUidEx, options);



    let sourceType: agorartc.VIDEO_SOURCE_TYPE = 0;
    let enabled: boolean = true;
    let streamConfig: agorartc.SimulcastStreamConfig = {
        dimensions: { width: 320, height: 240 },
        bitrate: 130,
        framerate: 5,
    }
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }

    let paramObj = {
        sourceType,
        enabled,
        streamConfig,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_ENABLEDUALSTREAMMODEEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_enableDualStreamModeEx ", ret, 0);
    shouldEqual("IRtcEngineEx_enableDualStreamModeEx:result ", result.result, 0);
    await waitForSecond(1);
    await testEndEx(apiEngine, true, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IRtcEngineEx_addPublishStreamUrlEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };


    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);


    let url: string = "";
    let transcodingEnabled: boolean = true;
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }
    let paramObj = {
        url,
        transcodingEnabled,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_ADDPUBLISHSTREAMURLEX, params, params.length, null, 0, result);

    shouldEqual("callApi:IRtcEngineEx_addPublishStreamUrlEx ", ret, 0);
    shouldEqual("IRtcEngineEx_addPublishStreamUrlEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

//ILocalSpatialAudioEngine



test("ILocalSpatialAudioEngine_updateRemotePosition", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let uid: agorartc.uid_t = 0;
    let posInfo: agorartc.RemoteVoicePositionInfo = {
        position: [0, 0, 0],
        forward: [0, 0, 0]
    }
    let paramObj = {
        uid,
        posInfo,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_LOCALSPATIALAUDIOENGINE_UPDATEREMOTEPOSITION, params, params.length, null, 0, result);

    shouldEqual("callApi:ILocalSpatialAudioEngine_updateRemotePosition ", ret, 0);
    shouldEqual("ILocalSpatialAudioEngine_updateRemotePosition:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("ILocalSpatialAudioEngine_updateRemotePositionEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);



    let uid: agorartc.uid_t = 0;
    let posInfo: agorartc.RemoteVoicePositionInfo = {
        position: [0, 0, 0],
        forward: [0, 0, 0]
    }
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }

    let paramObj = {
        uid,
        posInfo,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_LOCALSPATIALAUDIOENGINE_UPDATEREMOTEPOSITIONEX, params, params.length, null, 0, result);

    shouldEqual("callApi:ILocalSpatialAudioEngine_updateRemotePositionEx ", ret, 0);
    shouldEqual("ILocalSpatialAudioEngine_updateRemotePositionEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("ILocalSpatialAudioEngine_removeRemotePosition", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let uid: agorartc.uid_t = 0;
    let paramObj = {
        uid,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_LOCALSPATIALAUDIOENGINE_REMOVEREMOTEPOSITION, params, params.length, null, 0, result);

    shouldEqual("callApi:ILocalSpatialAudioEngine_removeRemotePosition ", ret, 0);
    shouldEqual("ILocalSpatialAudioEngine_removeRemotePosition:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("ILocalSpatialAudioEngine_removeRemotePositionEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);


    let uid: agorartc.uid_t = 0;
    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }
    let paramObj = {
        uid,
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_LOCALSPATIALAUDIOENGINE_REMOVEREMOTEPOSITIONEX, params, params.length, null, 0, result);

    shouldEqual("callApi:ILocalSpatialAudioEngine_removeRemotePositionEx ", ret, 0);
    shouldEqual("ILocalSpatialAudioEngine_removeRemotePositionEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("ILocalSpatialAudioEngine_clearRemotePositions", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_LOCALSPATIALAUDIOENGINE_CLEARREMOTEPOSITIONS, params, params.length, null, 0, result);

    shouldEqual("callApi:ILocalSpatialAudioEngine_clearRemotePositions ", ret, 0);
    shouldEqual("ILocalSpatialAudioEngine_clearRemotePositions:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("ILocalSpatialAudioEngine_clearRemotePositionsEx", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };


    let options: agorartc.ChannelMediaOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
        publishCameraTrack: true,
        publishAudioTrack: true,
        clientRoleType: agorartc.CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER,
    };
    let apiEngine = await testBegineEx(false, false, false, eventHandler, commonUidEx, options);


    let connection: agorartc.RtcConnection = {
        channelId: commonChannelId,
        localUid: commonUidEx,
    }

    let paramObj = {
        connection,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_LOCALSPATIALAUDIOENGINE_CLEARREMOTEPOSITIONSEX, params, params.length, null, 0, result);

    shouldEqual("callApi:ILocalSpatialAudioEngine_clearRemotePositionsEx ", ret, 0);
    shouldEqual("ILocalSpatialAudioEngine_clearRemotePositionsEx:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEndEx(apiEngine, false, commonUidEx);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

//IAudioDeviceManager

test("IAudioDeviceManager_enumeratePlaybackDevices_setPlaybackDevices", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(true, true, true, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_ENUMERATEPLAYBACKDEVICES, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_enumeratePlaybackDevices ", ret, 0);
    shoudlWarn("IAudioDeviceManager_enumeratePlaybackDevices:result ", typeof result.result.length != "number", "length=" + result.result.length);
    await waitForSecond(2);
    shoudlWarn("IAudioDeviceManager_enumeratePlaybackDevices WebGL_onPlaybackDevicesEnumerated", events.includes("WebGL_onPlaybackDevicesEnumerated") == false, "events.length=" + events.length);

    let devices: agorartc.DeviceInfo[] = result.result;
    let deviceId: string = devices[0].deviceId;
    paramObj = {
        deviceId,
    }
    params = JSON.stringify(paramObj);
    result = {};
    ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_SETPLAYBACKDEVICE, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_setPlaybackDevice ", ret, 0);
    shouldEqual("IAudioDeviceManager_setPlaybackDevice:result ", result.result, 0);
    await waitForSecond(1);

    await waitForSecond(1);
    await testEnd(apiEngine, true);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_enumerateRecordingDevices", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_ENUMERATERECORDINGDEVICES, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_enumerateRecordingDevices ", ret, 0);
    shoudlWarn("IAudioDeviceManager_enumerateRecordingDevices:result ", typeof result.result.length != "number", "length=" + result.result.length);
    await waitForSecond(2);
    shoudlWarn("IAudioDeviceManager_enumeratePlaybackDevices WebGL_onRecordingDevicesEnumerated", events.includes("WebGL_onRecordingDevicesEnumerated") == false, "events.length=" + events.length);



    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});



test("IAudioDeviceManager_getPlaybackDevice", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let deviceId: string = "";
    let paramObj = {
        deviceId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETPLAYBACKDEVICE, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_getPlaybackDevice ", ret, 0);
    shoudlWarn("IAudioDeviceManager_getPlaybackDevice:result ", typeof result.result != "string", 'result=' + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_getPlaybackDeviceInfo", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let deviceId: string = "";
    let deviceName: string = "";
    let paramObj = {
        deviceId,
        deviceName,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETPLAYBACKDEVICEINFO, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_getPlaybackDeviceInfo ", ret, 0);
    shoudlWarn("IAudioDeviceManager_getPlaybackDeviceInfo deviceId:result ", typeof result.result.deviceId != "string", "deviceId=" + result.result.deviceId);
    shoudlWarn("IAudioDeviceManager_getPlaybackDeviceInfo deviceName:result ", typeof result.result.deviceName != "string", "deviceName=" + result.result.deviceName);

    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_setPlaybackDeviceVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let volume: number = 50;
    let paramObj = {
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_SETPLAYBACKDEVICEVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_setPlaybackDeviceVolume ", ret, 0);
    shouldEqual("IAudioDeviceManager_setPlaybackDeviceVolume:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_getPlaybackDeviceVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let volume: number = 0;
    let paramObj = {
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETPLAYBACKDEVICEVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_getPlaybackDeviceVolume ", ret, 0);
    shoudlWarn("IAudioDeviceManager_getPlaybackDeviceVolume:result ", typeof result.result != "number", "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_setRecordingDevice", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let deviceId: string = "";
    let paramObj = {
        deviceId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_SETRECORDINGDEVICE, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_setRecordingDevice ", ret, 0);
    shouldEqual("IAudioDeviceManager_setRecordingDevice:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_getRecordingDevice", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let deviceId: string = "";
    let paramObj = {
        deviceId,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETRECORDINGDEVICE, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_getRecordingDevice ", ret, 0);
    shoudlWarn("IAudioDeviceManager_getRecordingDevice:result ", typeof result.result != "string", "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_getRecordingDeviceInfo", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let deviceId: string = "";
    let deviceName: string = "";
    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETRECORDINGDEVICEINFO, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_getRecordingDeviceInfo ", ret, 0);
    shoudlWarn("IAudioDeviceManager_getRecordingDeviceInfo deviceId:result ", typeof result.result.deviceId != "string", "deviceId=" + result.result.deviceId);
    shoudlWarn("IAudioDeviceManager_getRecordingDeviceInfo deviceName:result ", typeof result.result.deviceName != "string", "deviceName=" + result.result.deviceName);

    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_setRecordingDeviceVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let volume: number = 50;
    let paramObj = {
        volume,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_SETRECORDINGDEVICEVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_setRecordingDeviceVolume ", ret, 0);
    shouldEqual("IAudioDeviceManager_setRecordingDeviceVolume:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_getRecordingDeviceVolume", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);


    let paramObj = {

    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETRECORDINGDEVICEVOLUME, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_getRecordingDeviceVolume ", ret, 0);
    shoudlWarn("IAudioDeviceManager_getRecordingDeviceVolume:result ", typeof result.result != "number", "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_setPlaybackDeviceMute", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let mute: boolean = true;
    let paramObj = {
        mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_SETPLAYBACKDEVICEMUTE, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_setPlaybackDeviceMute ", ret, 0);
    shouldEqual("IAudioDeviceManager_setPlaybackDeviceMute:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_getPlaybackDeviceMute", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let mute: boolean = true;
    let paramObj = {
        mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETPLAYBACKDEVICEMUTE, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_getPlaybackDeviceMute ", ret, 0);
    shouldEqual("IAudioDeviceManager_getPlaybackDeviceMute:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_setRecordingDeviceMute", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let mute: boolean = true;
    let paramObj = {
        mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_SETRECORDINGDEVICEMUTE, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_setRecordingDeviceMute ", ret, 0);
    shouldEqual("IAudioDeviceManager_setRecordingDeviceMute:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_getRecordingDeviceMute", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let mute: boolean = true;
    let paramObj = {
        mute,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETRECORDINGDEVICEMUTE, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_getRecordingDeviceMute ", ret, 0);
    shouldEqual("IAudioDeviceManager_getRecordingDeviceMute:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_startPlaybackDeviceTest", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let testAudioFilePath: string = "";
    let paramObj = {
        testAudioFilePath,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_STARTPLAYBACKDEVICETEST, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_startPlaybackDeviceTest ", ret, 0);
    shouldEqual("IAudioDeviceManager_startPlaybackDeviceTest:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_stopPlaybackDeviceTest", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_STOPPLAYBACKDEVICETEST, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_stopPlaybackDeviceTest ", ret, 0);
    shouldEqual("IAudioDeviceManager_stopPlaybackDeviceTest:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_startRecordingDeviceTest", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let indicationInterval: number = 0;
    let paramObj = {
        indicationInterval,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_STARTRECORDINGDEVICETEST, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_startRecordingDeviceTest ", ret, 0);
    shouldEqual("IAudioDeviceManager_startRecordingDeviceTest:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_stopRecordingDeviceTest", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_STOPRECORDINGDEVICETEST, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_stopRecordingDeviceTest ", ret, 0);
    shouldEqual("IAudioDeviceManager_stopRecordingDeviceTest:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_startAudioDeviceLoopbackTest", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let indicationInterval: number = 0;
    let paramObj = {
        indicationInterval,
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_STARTAUDIODEVICELOOPBACKTEST, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_startAudioDeviceLoopbackTest ", ret, 0);
    shouldEqual("IAudioDeviceManager_startAudioDeviceLoopbackTest:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});

test("IAudioDeviceManager_stopAudioDeviceLoopbackTest", async () => {

    let events: string[] = [];
    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
            events.push(event);
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    let paramObj = {
    }
    let params = JSON.stringify(paramObj);
    let result: any = {};
    let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_STOPAUDIODEVICELOOPBACKTEST, params, params.length, null, 0, result);

    shouldEqual("callApi:IAudioDeviceManager_stopAudioDeviceLoopbackTest ", ret, 0);
    shouldEqual("IAudioDeviceManager_stopAudioDeviceLoopbackTest:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
    shouldEqual("WebGL_onEngineDestroy", events.includes("WebGL_onEngineDestroy"), true);
});




