// import AgoraRTC from "../../project/node_modules/agora-rtc-sdk-ng/rtc-sdk_en";
import { test, shouldEqual, start, shouldReturnTrue, waitForSecond, shoudlWarn } from "./framwork/index";
import { AgoraWrapper } from "../../project/iris/app"
import * as agorartc from "../../project/iris/terra/rtc_types/Index"
import { IrisApiType } from "../../project/iris/base/IrisApiType";
import { GenerateVideoTrackLabelOrHtmlElementCb } from "../../project/iris/engine/IrisRtcEngine";
import { IrisVideoSourceType, IrisEventHandler } from "../../project/iris/base/BaseType";
import { IrisApiEngine } from "../../project/iris/engine/IrisApiEngine";





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


/********  special case  **********/
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
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNEL, param, param.length, null, 0, result);
    shouldEqual("joinChannel : result", result.result, 0);
    await waitForSecond(5);
    shouldReturnTrue("onJoinChannelSuccessEx Triggered", () => {
        return triggerEventNames.includes("onJoinChannelSuccessEx");
    });
    await waitForSecond(5);

    //call leaveChannel
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, "{}", 2, null, 0, result);
    await waitForSecond(5);
    shouldReturnTrue("onLeaveChannelEx Triggered", () => {
        return triggerEventNames.includes("onLeaveChannelEx");
    });

    //call Destroy
    let nRet = AgoraWrapper.DestroyIrisApiEngine(apiEngine);
    shouldEqual("DestroyIrisApiEngine", nRet, 0);
}, -999);


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
    AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, "{}", 2, null, 0, result);
    await waitForSecond(5);
    shouldReturnTrue("onLeaveChannelEx Triggered", () => {
        return triggerEventNames.includes("onLeaveChannelEx");
    });

    //call Destroy
    let nRet = AgoraWrapper.DestroyIrisApiEngine(apiEngine);
    shouldEqual("DestroyIrisApiEngine", nRet, 0);
}, -999);


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
}, -999);



test("IVideoDeviceManager_enumerateVideoDevices_setDevice", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
};

/********* normal case ***********/

//IMediaEngine

test("IMediaEngine_registerAudioFrameObserver", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_registerVideoFrameObserver", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_registerVideoEncodedImageReceiver", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_pushAudioFrame", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_pushCaptureAudioFrame", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_pushReverseAudioFrame", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_pushDirectAudioFrame", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_pullAudioFrame", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_setExternalVideoSource", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_setExternalAudioSource", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_setExternalAudioSink", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_enableCustomAudioLocalPlayback", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_setDirectExternalAudioSource", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_pushVideoFrame", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_pushVideoFrame", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_pushEncodedVideoImage", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaEngine_pushEncodedVideoImage", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});



//IMediaPlayer

test("IMediaPlayer_open", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_openWithCustomSource", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_play", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_pause", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_stop", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_resume", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_seek", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_setAudioPitch", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_getDuration", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_getPlayPosition", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_getStreamCount", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_getStreamInfo", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_setLoopCount", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_muteAudio", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_isAudioMuted", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_muteVideo", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_isVideoMuted", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_setPlaybackSpeed", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_selectAudioTrack", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_setPlayerOption", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_setPlayerOption2", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_takeScreenshot", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_selectInternalSubtitle", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_setExternalSubtitle", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_getState", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_mute", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_getMute", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_adjustPlayoutVolume", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_getPlayoutVolume", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_adjustPublishSignalVolume", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_getPublishSignalVolume", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_setView", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_setRenderMode", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_registerPlayerSourceObserver", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_unregisterPlayerSourceObserver", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_registerAudioFrameObserver", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_registerAudioFrameObserver", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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

    shouldEqual("callApi:IMediaPlayer_registerAudioFrameObserver ", ret, 0);
    shouldEqual("IMediaPlayer_registerAudioFrameObserver:result ", result.result, -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
});

test("IMediaPlayer_unregisterAudioFrameObserver", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_registerVideoFrameObserver", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_unregisterVideoFrameObserver", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_registerMediaPlayerAudioSpectrumObserver", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_unregisterMediaPlayerAudioSpectrumObserver", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_setAudioDualMonoMode", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_getPlayerSdkVersion", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_getPlaySrc", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
    shouldEqual("IMediaPlayer_getPlaySrc:result ", typeof result.result != "string", "result=" + result.result);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
});

test("IMediaPlayer_openWithAgoraCDNSrc", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_getAgoraCDNLineCount", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
    shouldEqual("IMediaPlayer_getAgoraCDNLineCount:result ", result.result, 0);
    await waitForSecond(1);
    await testEnd(apiEngine, false);
});

test("IMediaPlayer_switchAgoraCDNLineByIndex", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_getCurrentAgoraCDNIndex", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_enableAutoSwitchAgoraCDN", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_renewAgoraCDNSrcToken", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_switchAgoraCDNSrc", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_switchSrc", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_preloadSrc", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_playPreloadedSrc", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_unloadSrc", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IMediaPlayer_setSpatialAudioParams", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

//IVideoDeviceManager
test("IVideoDeviceManager_getDevice", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
        }
    };

    let apiEngine = await testBegine(false, false, false, eventHandler);

    // let deviceIdUTF8: string = 0;
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
});

test("IVideoDeviceManager_startDeviceTest", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IVideoDeviceManager_stopDeviceTest", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});


//IRtcEngine
test("IRtcEngine_getVersion", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

test("IRtcEngine_getErrorDescription", async () => {

    let eventHandler: IrisEventHandler = {
        onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
            //do something in there
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
});

// test("IRtcEngine_updateChannelMediaOptions", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let options: agorartc.ChannelMediaOptions = 0;
//     let paramObj = {
//         options,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATECHANNELMEDIAOPTIONS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_updateChannelMediaOptions ", ret, 0);
//     shouldEqual("IRtcEngine_updateChannelMediaOptions:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_leaveChannel", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_leaveChannel ", ret, 0);
//     shouldEqual("IRtcEngine_leaveChannel:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_leaveChannel", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let options: agorartc.LeaveChannelOptions = 0;
//     let paramObj = {
//         options,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LEAVECHANNEL, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_leaveChannel ", ret, 0);
//     shouldEqual("IRtcEngine_leaveChannel:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_renewToken", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let token: string = 0;
//     let paramObj = {
//         token,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_RENEWTOKEN, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_renewToken ", ret, 0);
//     shouldEqual("IRtcEngine_renewToken:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setChannelProfile", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let profile: agorartc.CHANNEL_PROFILE_TYPE = 0;
//     let paramObj = {
//         profile,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCHANNELPROFILE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setChannelProfile ", ret, 0);
//     shouldEqual("IRtcEngine_setChannelProfile:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setClientRole", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let role: agorartc.CLIENT_ROLE_TYPE = 0;
//     let paramObj = {
//         role,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCLIENTROLE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setClientRole ", ret, 0);
//     shouldEqual("IRtcEngine_setClientRole:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setClientRole", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let role: agorartc.CLIENT_ROLE_TYPE = 0;
//     let options: agorartc.ClientRoleOptions = 0;
//     let paramObj = {
//         role,
//         options,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCLIENTROLE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setClientRole ", ret, 0);
//     shouldEqual("IRtcEngine_setClientRole:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startEchoTest", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTECHOTEST, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startEchoTest ", ret, 0);
//     shouldEqual("IRtcEngine_startEchoTest:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startEchoTest", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let intervalInSeconds: number = 0;
//     let paramObj = {
//         intervalInSeconds,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTECHOTEST, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startEchoTest ", ret, 0);
//     shouldEqual("IRtcEngine_startEchoTest:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopEchoTest", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPECHOTEST, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopEchoTest ", ret, 0);
//     shouldEqual("IRtcEngine_stopEchoTest:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableVideo", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEVIDEO, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableVideo ", ret, 0);
//     shouldEqual("IRtcEngine_enableVideo:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_disableVideo", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_DISABLEVIDEO, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_disableVideo ", ret, 0);
//     shouldEqual("IRtcEngine_disableVideo:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startPreview", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTPREVIEW, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startPreview ", ret, 0);
//     shouldEqual("IRtcEngine_startPreview:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startPreview", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let sourceType: agorartc.VIDEO_SOURCE_TYPE = 0;
//     let paramObj = {
//         sourceType,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTPREVIEW, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startPreview ", ret, 0);
//     shouldEqual("IRtcEngine_startPreview:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopPreview", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPPREVIEW, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopPreview ", ret, 0);
//     shouldEqual("IRtcEngine_stopPreview:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopPreview", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let sourceType: agorartc.VIDEO_SOURCE_TYPE = 0;
//     let paramObj = {
//         sourceType,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPPREVIEW, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopPreview ", ret, 0);
//     shouldEqual("IRtcEngine_stopPreview:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startLastmileProbeTest", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.LastmileProbeConfig = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTLASTMILEPROBETEST, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startLastmileProbeTest ", ret, 0);
//     shouldEqual("IRtcEngine_startLastmileProbeTest:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopLastmileProbeTest", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPLASTMILEPROBETEST, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopLastmileProbeTest ", ret, 0);
//     shouldEqual("IRtcEngine_stopLastmileProbeTest:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setVideoEncoderConfiguration", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.VideoEncoderConfiguration = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETVIDEOENCODERCONFIGURATION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setVideoEncoderConfiguration ", ret, 0);
//     shouldEqual("IRtcEngine_setVideoEncoderConfiguration:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setBeautyEffectOptions", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let options: agorartc.BeautyOptions = 0;
//     let type: agorartc.MEDIA_SOURCE_TYPE = 0;
//     let paramObj = {
//         enabled,
//         options,
//         type,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETBEAUTYEFFECTOPTIONS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setBeautyEffectOptions ", ret, 0);
//     shouldEqual("IRtcEngine_setBeautyEffectOptions:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableVirtualBackground", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let backgroundSource: agorartc.VirtualBackgroundSource = 0;
//     let paramObj = {
//         enabled,
//         backgroundSource,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEVIRTUALBACKGROUND, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableVirtualBackground ", ret, 0);
//     shouldEqual("IRtcEngine_enableVirtualBackground:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableRemoteSuperResolution", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let userId: agorartc.uid_t = 0;
//     let enable: boolean = 0;
//     let paramObj = {
//         userId,
//         enable,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEREMOTESUPERRESOLUTION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableRemoteSuperResolution ", ret, 0);
//     shouldEqual("IRtcEngine_enableRemoteSuperResolution:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setupRemoteVideo", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let canvas: agorartc.VideoCanvas = 0;
//     let paramObj = {
//         canvas,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETUPREMOTEVIDEO, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setupRemoteVideo ", ret, 0);
//     shouldEqual("IRtcEngine_setupRemoteVideo:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setupLocalVideo", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let canvas: agorartc.VideoCanvas = 0;
//     let paramObj = {
//         canvas,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETUPLOCALVIDEO, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setupLocalVideo ", ret, 0);
//     shouldEqual("IRtcEngine_setupLocalVideo:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableAudio", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEAUDIO, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableAudio ", ret, 0);
//     shouldEqual("IRtcEngine_enableAudio:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_disableAudio", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_DISABLEAUDIO, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_disableAudio ", ret, 0);
//     shouldEqual("IRtcEngine_disableAudio:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setAudioProfile", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let profile: agorartc.AUDIO_PROFILE_TYPE = 0;
//     let scenario: agorartc.AUDIO_SCENARIO_TYPE = 0;
//     let paramObj = {
//         profile,
//         scenario,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAUDIOPROFILE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setAudioProfile ", ret, 0);
//     shouldEqual("IRtcEngine_setAudioProfile:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setAudioProfile", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let profile: agorartc.AUDIO_PROFILE_TYPE = 0;
//     let paramObj = {
//         profile,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAUDIOPROFILE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setAudioProfile ", ret, 0);
//     shouldEqual("IRtcEngine_setAudioProfile:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableLocalAudio", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let paramObj = {
//         enabled,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLELOCALAUDIO, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableLocalAudio ", ret, 0);
//     shouldEqual("IRtcEngine_enableLocalAudio:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_muteLocalAudioStream", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let mute: boolean = 0;
//     let paramObj = {
//         mute,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_MUTELOCALAUDIOSTREAM, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_muteLocalAudioStream ", ret, 0);
//     shouldEqual("IRtcEngine_muteLocalAudioStream:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_muteAllRemoteAudioStreams", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let mute: boolean = 0;
//     let paramObj = {
//         mute,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_MUTEALLREMOTEAUDIOSTREAMS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_muteAllRemoteAudioStreams ", ret, 0);
//     shouldEqual("IRtcEngine_muteAllRemoteAudioStreams:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setDefaultMuteAllRemoteAudioStreams", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let mute: boolean = 0;
//     let paramObj = {
//         mute,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETDEFAULTMUTEALLREMOTEAUDIOSTREAMS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setDefaultMuteAllRemoteAudioStreams ", ret, 0);
//     shouldEqual("IRtcEngine_setDefaultMuteAllRemoteAudioStreams:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_muteRemoteAudioStream", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let mute: boolean = 0;
//     let paramObj = {
//         uid,
//         mute,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_MUTEREMOTEAUDIOSTREAM, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_muteRemoteAudioStream ", ret, 0);
//     shouldEqual("IRtcEngine_muteRemoteAudioStream:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_muteLocalVideoStream", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let mute: boolean = 0;
//     let paramObj = {
//         mute,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_MUTELOCALVIDEOSTREAM, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_muteLocalVideoStream ", ret, 0);
//     shouldEqual("IRtcEngine_muteLocalVideoStream:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableLocalVideo", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let paramObj = {
//         enabled,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLELOCALVIDEO, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableLocalVideo ", ret, 0);
//     shouldEqual("IRtcEngine_enableLocalVideo:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_muteAllRemoteVideoStreams", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let mute: boolean = 0;
//     let paramObj = {
//         mute,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_MUTEALLREMOTEVIDEOSTREAMS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_muteAllRemoteVideoStreams ", ret, 0);
//     shouldEqual("IRtcEngine_muteAllRemoteVideoStreams:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setDefaultMuteAllRemoteVideoStreams", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let mute: boolean = 0;
//     let paramObj = {
//         mute,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETDEFAULTMUTEALLREMOTEVIDEOSTREAMS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setDefaultMuteAllRemoteVideoStreams ", ret, 0);
//     shouldEqual("IRtcEngine_setDefaultMuteAllRemoteVideoStreams:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_muteRemoteVideoStream", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let mute: boolean = 0;
//     let paramObj = {
//         uid,
//         mute,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_MUTEREMOTEVIDEOSTREAM, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_muteRemoteVideoStream ", ret, 0);
//     shouldEqual("IRtcEngine_muteRemoteVideoStream:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setRemoteVideoStreamType", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let streamType: agorartc.VIDEO_STREAM_TYPE = 0;
//     let paramObj = {
//         uid,
//         streamType,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETREMOTEVIDEOSTREAMTYPE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setRemoteVideoStreamType ", ret, 0);
//     shouldEqual("IRtcEngine_setRemoteVideoStreamType:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setRemoteDefaultVideoStreamType", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let streamType: agorartc.VIDEO_STREAM_TYPE = 0;
//     let paramObj = {
//         streamType,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETREMOTEDEFAULTVIDEOSTREAMTYPE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setRemoteDefaultVideoStreamType ", ret, 0);
//     shouldEqual("IRtcEngine_setRemoteDefaultVideoStreamType:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableAudioVolumeIndication", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let interval: number = 0;
//     let smooth: number = 0;
//     let reportVad: boolean = 0;
//     let paramObj = {
//         interval,
//         smooth,
//         reportVad,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEAUDIOVOLUMEINDICATION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableAudioVolumeIndication ", ret, 0);
//     shouldEqual("IRtcEngine_enableAudioVolumeIndication:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startAudioRecording", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let filePath: string = 0;
//     let quality: agorartc.AUDIO_RECORDING_QUALITY_TYPE = 0;
//     let paramObj = {
//         filePath,
//         quality,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTAUDIORECORDING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startAudioRecording ", ret, 0);
//     shouldEqual("IRtcEngine_startAudioRecording:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startAudioRecording", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let filePath: string = 0;
//     let sampleRate: number = 0;
//     let quality: agorartc.AUDIO_RECORDING_QUALITY_TYPE = 0;
//     let paramObj = {
//         filePath,
//         sampleRate,
//         quality,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTAUDIORECORDING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startAudioRecording ", ret, 0);
//     shouldEqual("IRtcEngine_startAudioRecording:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startAudioRecording", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.AudioRecordingConfiguration = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTAUDIORECORDING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startAudioRecording ", ret, 0);
//     shouldEqual("IRtcEngine_startAudioRecording:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_registerAudioEncodedFrameObserver", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.AudioEncodedFrameObserverConfig = 0;
//     let observer: agorartc.IAudioEncodedFrameObserver[] = 0;
//     let paramObj = {
//         config,
//         observer,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REGISTERAUDIOENCODEDFRAMEOBSERVER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_registerAudioEncodedFrameObserver ", ret, 0);
//     shouldEqual("IRtcEngine_registerAudioEncodedFrameObserver:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopAudioRecording", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPAUDIORECORDING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopAudioRecording ", ret, 0);
//     shouldEqual("IRtcEngine_stopAudioRecording:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_createMediaPlayer", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_CREATEMEDIAPLAYER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_createMediaPlayer ", ret, 0);
//     shouldEqual("IRtcEngine_createMediaPlayer:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_destroyMediaPlayer", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let media_player:  = 0;
//     let paramObj = {
//         media_player,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_DESTROYMEDIAPLAYER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_destroyMediaPlayer ", ret, 0);
//     shouldEqual("IRtcEngine_destroyMediaPlayer:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startAudioMixing", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let filePath: string = 0;
//     let loopback: boolean = 0;
//     let replace: boolean = 0;
//     let cycle: number = 0;
//     let paramObj = {
//         filePath,
//         loopback,
//         replace,
//         cycle,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTAUDIOMIXING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startAudioMixing ", ret, 0);
//     shouldEqual("IRtcEngine_startAudioMixing:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startAudioMixing", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let filePath: string = 0;
//     let loopback: boolean = 0;
//     let replace: boolean = 0;
//     let cycle: number = 0;
//     let startPos: number = 0;
//     let paramObj = {
//         filePath,
//         loopback,
//         replace,
//         cycle,
//         startPos,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTAUDIOMIXING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startAudioMixing ", ret, 0);
//     shouldEqual("IRtcEngine_startAudioMixing:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopAudioMixing", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPAUDIOMIXING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopAudioMixing ", ret, 0);
//     shouldEqual("IRtcEngine_stopAudioMixing:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_pauseAudioMixing", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PAUSEAUDIOMIXING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_pauseAudioMixing ", ret, 0);
//     shouldEqual("IRtcEngine_pauseAudioMixing:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_resumeAudioMixing", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_RESUMEAUDIOMIXING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_resumeAudioMixing ", ret, 0);
//     shouldEqual("IRtcEngine_resumeAudioMixing:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_adjustAudioMixingVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let volume: number = 0;
//     let paramObj = {
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTAUDIOMIXINGVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_adjustAudioMixingVolume ", ret, 0);
//     shouldEqual("IRtcEngine_adjustAudioMixingVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_adjustAudioMixingPublishVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let volume: number = 0;
//     let paramObj = {
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTAUDIOMIXINGPUBLISHVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_adjustAudioMixingPublishVolume ", ret, 0);
//     shouldEqual("IRtcEngine_adjustAudioMixingPublishVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getAudioMixingPublishVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETAUDIOMIXINGPUBLISHVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getAudioMixingPublishVolume ", ret, 0);
//     shouldEqual("IRtcEngine_getAudioMixingPublishVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_adjustAudioMixingPlayoutVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let volume: number = 0;
//     let paramObj = {
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTAUDIOMIXINGPLAYOUTVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_adjustAudioMixingPlayoutVolume ", ret, 0);
//     shouldEqual("IRtcEngine_adjustAudioMixingPlayoutVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getAudioMixingPlayoutVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETAUDIOMIXINGPLAYOUTVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getAudioMixingPlayoutVolume ", ret, 0);
//     shouldEqual("IRtcEngine_getAudioMixingPlayoutVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getAudioMixingDuration", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETAUDIOMIXINGDURATION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getAudioMixingDuration ", ret, 0);
//     shouldEqual("IRtcEngine_getAudioMixingDuration:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getAudioMixingCurrentPosition", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETAUDIOMIXINGCURRENTPOSITION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getAudioMixingCurrentPosition ", ret, 0);
//     shouldEqual("IRtcEngine_getAudioMixingCurrentPosition:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setAudioMixingPosition", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let pos: number = 0;
//     let paramObj = {
//         pos,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAUDIOMIXINGPOSITION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setAudioMixingPosition ", ret, 0);
//     shouldEqual("IRtcEngine_setAudioMixingPosition:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setAudioMixingPitch", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let pitch: number = 0;
//     let paramObj = {
//         pitch,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAUDIOMIXINGPITCH, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setAudioMixingPitch ", ret, 0);
//     shouldEqual("IRtcEngine_setAudioMixingPitch:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getEffectsVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETEFFECTSVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getEffectsVolume ", ret, 0);
//     shouldEqual("IRtcEngine_getEffectsVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setEffectsVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let volume: number = 0;
//     let paramObj = {
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETEFFECTSVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setEffectsVolume ", ret, 0);
//     shouldEqual("IRtcEngine_setEffectsVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_preloadEffect", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let soundId: number = 0;
//     let filePath: string = 0;
//     let startPos: number = 0;
//     let paramObj = {
//         soundId,
//         filePath,
//         startPos,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PRELOADEFFECT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_preloadEffect ", ret, 0);
//     shouldEqual("IRtcEngine_preloadEffect:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_playEffect", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let soundId: number = 0;
//     let filePath: string = 0;
//     let loopCount: number = 0;
//     let pitch: number = 0;
//     let pan: number = 0;
//     let gain: number = 0;
//     let publish: boolean = 0;
//     let startPos: number = 0;
//     let paramObj = {
//         soundId,
//         filePath,
//         loopCount,
//         pitch,
//         pan,
//         gain,
//         publish,
//         startPos,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PLAYEFFECT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_playEffect ", ret, 0);
//     shouldEqual("IRtcEngine_playEffect:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_playAllEffects", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let loopCount: number = 0;
//     let pitch: number = 0;
//     let pan: number = 0;
//     let gain: number = 0;
//     let publish: boolean = 0;
//     let paramObj = {
//         loopCount,
//         pitch,
//         pan,
//         gain,
//         publish,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PLAYALLEFFECTS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_playAllEffects ", ret, 0);
//     shouldEqual("IRtcEngine_playAllEffects:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getVolumeOfEffect", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let soundId: number = 0;
//     let paramObj = {
//         soundId,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETVOLUMEOFEFFECT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getVolumeOfEffect ", ret, 0);
//     shouldEqual("IRtcEngine_getVolumeOfEffect:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setVolumeOfEffect", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let soundId: number = 0;
//     let volume: number = 0;
//     let paramObj = {
//         soundId,
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETVOLUMEOFEFFECT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setVolumeOfEffect ", ret, 0);
//     shouldEqual("IRtcEngine_setVolumeOfEffect:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_pauseEffect", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let soundId: number = 0;
//     let paramObj = {
//         soundId,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PAUSEEFFECT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_pauseEffect ", ret, 0);
//     shouldEqual("IRtcEngine_pauseEffect:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_pauseAllEffects", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PAUSEALLEFFECTS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_pauseAllEffects ", ret, 0);
//     shouldEqual("IRtcEngine_pauseAllEffects:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_resumeEffect", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let soundId: number = 0;
//     let paramObj = {
//         soundId,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_RESUMEEFFECT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_resumeEffect ", ret, 0);
//     shouldEqual("IRtcEngine_resumeEffect:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_resumeAllEffects", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_RESUMEALLEFFECTS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_resumeAllEffects ", ret, 0);
//     shouldEqual("IRtcEngine_resumeAllEffects:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopEffect", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let soundId: number = 0;
//     let paramObj = {
//         soundId,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPEFFECT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopEffect ", ret, 0);
//     shouldEqual("IRtcEngine_stopEffect:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopAllEffects", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPALLEFFECTS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopAllEffects ", ret, 0);
//     shouldEqual("IRtcEngine_stopAllEffects:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_unloadEffect", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let soundId: number = 0;
//     let paramObj = {
//         soundId,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UNLOADEFFECT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_unloadEffect ", ret, 0);
//     shouldEqual("IRtcEngine_unloadEffect:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_unloadAllEffects", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UNLOADALLEFFECTS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_unloadAllEffects ", ret, 0);
//     shouldEqual("IRtcEngine_unloadAllEffects:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableSoundPositionIndication", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let paramObj = {
//         enabled,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLESOUNDPOSITIONINDICATION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableSoundPositionIndication ", ret, 0);
//     shouldEqual("IRtcEngine_enableSoundPositionIndication:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setRemoteVoicePosition", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let pan: number = 0;
//     let gain: number = 0;
//     let paramObj = {
//         uid,
//         pan,
//         gain,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETREMOTEVOICEPOSITION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setRemoteVoicePosition ", ret, 0);
//     shouldEqual("IRtcEngine_setRemoteVoicePosition:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableSpatialAudio", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let paramObj = {
//         enabled,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLESPATIALAUDIO, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableSpatialAudio ", ret, 0);
//     shouldEqual("IRtcEngine_enableSpatialAudio:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setRemoteUserSpatialAudioParams", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let params: agorartc.SpatialAudioParams = 0;
//     let paramObj = {
//         uid,
//         params,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETREMOTEUSERSPATIALAUDIOPARAMS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setRemoteUserSpatialAudioParams ", ret, 0);
//     shouldEqual("IRtcEngine_setRemoteUserSpatialAudioParams:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setVoiceBeautifierPreset", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let preset: agorartc.VOICE_BEAUTIFIER_PRESET = 0;
//     let paramObj = {
//         preset,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETVOICEBEAUTIFIERPRESET, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setVoiceBeautifierPreset ", ret, 0);
//     shouldEqual("IRtcEngine_setVoiceBeautifierPreset:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setAudioEffectPreset", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let preset: agorartc.AUDIO_EFFECT_PRESET = 0;
//     let paramObj = {
//         preset,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAUDIOEFFECTPRESET, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setAudioEffectPreset ", ret, 0);
//     shouldEqual("IRtcEngine_setAudioEffectPreset:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setVoiceConversionPreset", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let preset: agorartc.VOICE_CONVERSION_PRESET = 0;
//     let paramObj = {
//         preset,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETVOICECONVERSIONPRESET, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setVoiceConversionPreset ", ret, 0);
//     shouldEqual("IRtcEngine_setVoiceConversionPreset:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setAudioEffectParameters", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let preset: agorartc.AUDIO_EFFECT_PRESET = 0;
//     let param1: number = 0;
//     let param2: number = 0;
//     let paramObj = {
//         preset,
//         param1,
//         param2,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAUDIOEFFECTPARAMETERS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setAudioEffectParameters ", ret, 0);
//     shouldEqual("IRtcEngine_setAudioEffectParameters:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setVoiceBeautifierParameters", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let preset: agorartc.VOICE_BEAUTIFIER_PRESET = 0;
//     let param1: number = 0;
//     let param2: number = 0;
//     let paramObj = {
//         preset,
//         param1,
//         param2,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETVOICEBEAUTIFIERPARAMETERS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setVoiceBeautifierParameters ", ret, 0);
//     shouldEqual("IRtcEngine_setVoiceBeautifierParameters:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setVoiceConversionParameters", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let preset: agorartc.VOICE_CONVERSION_PRESET = 0;
//     let param1: number = 0;
//     let param2: number = 0;
//     let paramObj = {
//         preset,
//         param1,
//         param2,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETVOICECONVERSIONPARAMETERS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setVoiceConversionParameters ", ret, 0);
//     shouldEqual("IRtcEngine_setVoiceConversionParameters:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setLocalVoicePitch", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let pitch: number = 0;
//     let paramObj = {
//         pitch,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALVOICEPITCH, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setLocalVoicePitch ", ret, 0);
//     shouldEqual("IRtcEngine_setLocalVoicePitch:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setLocalVoiceEqualization", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let bandFrequency: agorartc.AUDIO_EQUALIZATION_BAND_FREQUENCY = 0;
//     let bandGain: number = 0;
//     let paramObj = {
//         bandFrequency,
//         bandGain,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALVOICEEQUALIZATION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setLocalVoiceEqualization ", ret, 0);
//     shouldEqual("IRtcEngine_setLocalVoiceEqualization:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setLocalVoiceReverb", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let reverbKey: agorartc.AUDIO_REVERB_TYPE = 0;
//     let value: number = 0;
//     let paramObj = {
//         reverbKey,
//         value,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALVOICEREVERB, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setLocalVoiceReverb ", ret, 0);
//     shouldEqual("IRtcEngine_setLocalVoiceReverb:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setLogFile", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let filePath: string = 0;
//     let paramObj = {
//         filePath,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOGFILE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setLogFile ", ret, 0);
//     shouldEqual("IRtcEngine_setLogFile:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setLogFilter", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let filter: number = 0;
//     let paramObj = {
//         filter,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOGFILTER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setLogFilter ", ret, 0);
//     shouldEqual("IRtcEngine_setLogFilter:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setLogLevel", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let level: agorartc.LOG_LEVEL = 0;
//     let paramObj = {
//         level,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOGLEVEL, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setLogLevel ", ret, 0);
//     shouldEqual("IRtcEngine_setLogLevel:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setLogFileSize", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let fileSizeInKBytes: number = 0;
//     let paramObj = {
//         fileSizeInKBytes,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOGFILESIZE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setLogFileSize ", ret, 0);
//     shouldEqual("IRtcEngine_setLogFileSize:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_uploadLogFile", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let requestId: agorartc.AString = 0;
//     let paramObj = {
//         requestId,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPLOADLOGFILE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_uploadLogFile ", ret, 0);
//     shouldEqual("IRtcEngine_uploadLogFile:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setLocalRenderMode", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let renderMode: agorartc.RENDER_MODE_TYPE = 0;
//     let mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE = 0;
//     let paramObj = {
//         renderMode,
//         mirrorMode,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALRENDERMODE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setLocalRenderMode ", ret, 0);
//     shouldEqual("IRtcEngine_setLocalRenderMode:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setRemoteRenderMode", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let renderMode: agorartc.RENDER_MODE_TYPE = 0;
//     let mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE = 0;
//     let paramObj = {
//         uid,
//         renderMode,
//         mirrorMode,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETREMOTERENDERMODE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setRemoteRenderMode ", ret, 0);
//     shouldEqual("IRtcEngine_setRemoteRenderMode:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setLocalRenderMode", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let renderMode: agorartc.RENDER_MODE_TYPE = 0;
//     let paramObj = {
//         renderMode,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALRENDERMODE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setLocalRenderMode ", ret, 0);
//     shouldEqual("IRtcEngine_setLocalRenderMode:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setLocalVideoMirrorMode", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE = 0;
//     let paramObj = {
//         mirrorMode,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALVIDEOMIRRORMODE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setLocalVideoMirrorMode ", ret, 0);
//     shouldEqual("IRtcEngine_setLocalVideoMirrorMode:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableDualStreamMode", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let paramObj = {
//         enabled,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEDUALSTREAMMODE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableDualStreamMode ", ret, 0);
//     shouldEqual("IRtcEngine_enableDualStreamMode:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableDualStreamMode", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let sourceType: agorartc.VIDEO_SOURCE_TYPE = 0;
//     let enabled: boolean = 0;
//     let paramObj = {
//         sourceType,
//         enabled,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEDUALSTREAMMODE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableDualStreamMode ", ret, 0);
//     shouldEqual("IRtcEngine_enableDualStreamMode:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableDualStreamMode", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let sourceType: agorartc.VIDEO_SOURCE_TYPE = 0;
//     let enabled: boolean = 0;
//     let streamConfig: agorartc.SimulcastStreamConfig = 0;
//     let paramObj = {
//         sourceType,
//         enabled,
//         streamConfig,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEDUALSTREAMMODE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableDualStreamMode ", ret, 0);
//     shouldEqual("IRtcEngine_enableDualStreamMode:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableEchoCancellationExternal", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let audioSourceDelay: number = 0;
//     let paramObj = {
//         enabled,
//         audioSourceDelay,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEECHOCANCELLATIONEXTERNAL, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableEchoCancellationExternal ", ret, 0);
//     shouldEqual("IRtcEngine_enableEchoCancellationExternal:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableCustomAudioLocalPlayback", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let sourceId: number = 0;
//     let enabled: boolean = 0;
//     let paramObj = {
//         sourceId,
//         enabled,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLECUSTOMAUDIOLOCALPLAYBACK, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableCustomAudioLocalPlayback ", ret, 0);
//     shouldEqual("IRtcEngine_enableCustomAudioLocalPlayback:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startPrimaryCustomAudioTrack", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.AudioTrackConfig = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTPRIMARYCUSTOMAUDIOTRACK, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startPrimaryCustomAudioTrack ", ret, 0);
//     shouldEqual("IRtcEngine_startPrimaryCustomAudioTrack:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopPrimaryCustomAudioTrack", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPPRIMARYCUSTOMAUDIOTRACK, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopPrimaryCustomAudioTrack ", ret, 0);
//     shouldEqual("IRtcEngine_stopPrimaryCustomAudioTrack:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startSecondaryCustomAudioTrack", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.AudioTrackConfig = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSECONDARYCUSTOMAUDIOTRACK, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startSecondaryCustomAudioTrack ", ret, 0);
//     shouldEqual("IRtcEngine_startSecondaryCustomAudioTrack:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopSecondaryCustomAudioTrack", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPSECONDARYCUSTOMAUDIOTRACK, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopSecondaryCustomAudioTrack ", ret, 0);
//     shouldEqual("IRtcEngine_stopSecondaryCustomAudioTrack:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setRecordingAudioFrameParameters", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let sampleRate: number = 0;
//     let channel: number = 0;
//     let mode: agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE = 0;
//     let samplesPerCall: number = 0;
//     let paramObj = {
//         sampleRate,
//         channel,
//         mode,
//         samplesPerCall,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETRECORDINGAUDIOFRAMEPARAMETERS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setRecordingAudioFrameParameters ", ret, 0);
//     shouldEqual("IRtcEngine_setRecordingAudioFrameParameters:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setPlaybackAudioFrameParameters", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let sampleRate: number = 0;
//     let channel: number = 0;
//     let mode: agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE = 0;
//     let samplesPerCall: number = 0;
//     let paramObj = {
//         sampleRate,
//         channel,
//         mode,
//         samplesPerCall,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETPLAYBACKAUDIOFRAMEPARAMETERS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setPlaybackAudioFrameParameters ", ret, 0);
//     shouldEqual("IRtcEngine_setPlaybackAudioFrameParameters:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setMixedAudioFrameParameters", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let sampleRate: number = 0;
//     let channel: number = 0;
//     let samplesPerCall: number = 0;
//     let paramObj = {
//         sampleRate,
//         channel,
//         samplesPerCall,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETMIXEDAUDIOFRAMEPARAMETERS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setMixedAudioFrameParameters ", ret, 0);
//     shouldEqual("IRtcEngine_setMixedAudioFrameParameters:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setPlaybackAudioFrameBeforeMixingParameters", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let sampleRate: number = 0;
//     let channel: number = 0;
//     let paramObj = {
//         sampleRate,
//         channel,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETPLAYBACKAUDIOFRAMEBEFOREMIXINGPARAMETERS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setPlaybackAudioFrameBeforeMixingParameters ", ret, 0);
//     shouldEqual("IRtcEngine_setPlaybackAudioFrameBeforeMixingParameters:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableAudioSpectrumMonitor", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let intervalInMS: number = 0;
//     let paramObj = {
//         intervalInMS,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEAUDIOSPECTRUMMONITOR, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableAudioSpectrumMonitor ", ret, 0);
//     shouldEqual("IRtcEngine_enableAudioSpectrumMonitor:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_disableAudioSpectrumMonitor", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_DISABLEAUDIOSPECTRUMMONITOR, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_disableAudioSpectrumMonitor ", ret, 0);
//     shouldEqual("IRtcEngine_disableAudioSpectrumMonitor:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_registerAudioSpectrumObserver", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let observer: agorartc.IAudioSpectrumObserver[] = 0;
//     let paramObj = {
//         observer,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REGISTERAUDIOSPECTRUMOBSERVER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_registerAudioSpectrumObserver ", ret, 0);
//     shouldEqual("IRtcEngine_registerAudioSpectrumObserver:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_unregisterAudioSpectrumObserver", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let observer: agorartc.IAudioSpectrumObserver[] = 0;
//     let paramObj = {
//         observer,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UNREGISTERAUDIOSPECTRUMOBSERVER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_unregisterAudioSpectrumObserver ", ret, 0);
//     shouldEqual("IRtcEngine_unregisterAudioSpectrumObserver:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_adjustRecordingSignalVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let volume: number = 0;
//     let paramObj = {
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTRECORDINGSIGNALVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_adjustRecordingSignalVolume ", ret, 0);
//     shouldEqual("IRtcEngine_adjustRecordingSignalVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_muteRecordingSignal", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let mute: boolean = 0;
//     let paramObj = {
//         mute,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_MUTERECORDINGSIGNAL, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_muteRecordingSignal ", ret, 0);
//     shouldEqual("IRtcEngine_muteRecordingSignal:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_adjustPlaybackSignalVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let volume: number = 0;
//     let paramObj = {
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTPLAYBACKSIGNALVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_adjustPlaybackSignalVolume ", ret, 0);
//     shouldEqual("IRtcEngine_adjustPlaybackSignalVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_adjustUserPlaybackSignalVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: number = 0;
//     let volume: number = 0;
//     let paramObj = {
//         uid,
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTUSERPLAYBACKSIGNALVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_adjustUserPlaybackSignalVolume ", ret, 0);
//     shouldEqual("IRtcEngine_adjustUserPlaybackSignalVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setLocalPublishFallbackOption", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let option: agorartc.STREAM_FALLBACK_OPTIONS = 0;
//     let paramObj = {
//         option,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALPUBLISHFALLBACKOPTION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setLocalPublishFallbackOption ", ret, 0);
//     shouldEqual("IRtcEngine_setLocalPublishFallbackOption:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setRemoteSubscribeFallbackOption", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let option: agorartc.STREAM_FALLBACK_OPTIONS = 0;
//     let paramObj = {
//         option,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETREMOTESUBSCRIBEFALLBACKOPTION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setRemoteSubscribeFallbackOption ", ret, 0);
//     shouldEqual("IRtcEngine_setRemoteSubscribeFallbackOption:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableLoopbackRecording", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let deviceName: string = 0;
//     let paramObj = {
//         enabled,
//         deviceName,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLELOOPBACKRECORDING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableLoopbackRecording ", ret, 0);
//     shouldEqual("IRtcEngine_enableLoopbackRecording:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_adjustLoopbackRecordingVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let volume: number = 0;
//     let paramObj = {
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTLOOPBACKRECORDINGVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_adjustLoopbackRecordingVolume ", ret, 0);
//     shouldEqual("IRtcEngine_adjustLoopbackRecordingVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getLoopbackRecordingVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETLOOPBACKRECORDINGVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getLoopbackRecordingVolume ", ret, 0);
//     shouldEqual("IRtcEngine_getLoopbackRecordingVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableInEarMonitoring", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let includeAudioFilters: number = 0;
//     let paramObj = {
//         enabled,
//         includeAudioFilters,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEINEARMONITORING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableInEarMonitoring ", ret, 0);
//     shouldEqual("IRtcEngine_enableInEarMonitoring:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setInEarMonitoringVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let volume: number = 0;
//     let paramObj = {
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETINEARMONITORINGVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setInEarMonitoringVolume ", ret, 0);
//     shouldEqual("IRtcEngine_setInEarMonitoringVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_loadExtensionProvider", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let extension_lib_path: string = 0;
//     let paramObj = {
//         extension_lib_path,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_LOADEXTENSIONPROVIDER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_loadExtensionProvider ", ret, 0);
//     shouldEqual("IRtcEngine_loadExtensionProvider:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setExtensionProviderProperty", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let provider: string = 0;
//     let key: string = 0;
//     let value: string = 0;
//     let paramObj = {
//         provider,
//         key,
//         value,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETEXTENSIONPROVIDERPROPERTY, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setExtensionProviderProperty ", ret, 0);
//     shouldEqual("IRtcEngine_setExtensionProviderProperty:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableExtension", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let provider: string = 0;
//     let extension: string = 0;
//     let enable: boolean = 0;
//     let type: agorartc.MEDIA_SOURCE_TYPE = 0;
//     let paramObj = {
//         provider,
//         extension,
//         enable,
//         type,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEEXTENSION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableExtension ", ret, 0);
//     shouldEqual("IRtcEngine_enableExtension:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setExtensionProperty", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let provider: string = 0;
//     let extension: string = 0;
//     let key: string = 0;
//     let value: string = 0;
//     let type: agorartc.MEDIA_SOURCE_TYPE = 0;
//     let paramObj = {
//         provider,
//         extension,
//         key,
//         value,
//         type,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETEXTENSIONPROPERTY, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setExtensionProperty ", ret, 0);
//     shouldEqual("IRtcEngine_setExtensionProperty:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getExtensionProperty", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let provider: string = 0;
//     let extension: string = 0;
//     let key: string = 0;
//     let value: string = 0;
//     let buf_len: number = 0;
//     let type: agorartc.MEDIA_SOURCE_TYPE = 0;
//     let paramObj = {
//         provider,
//         extension,
//         key,
//         value,
//         buf_len,
//         type,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETEXTENSIONPROPERTY, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getExtensionProperty ", ret, 0);
//     shouldEqual("IRtcEngine_getExtensionProperty:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setCameraCapturerConfiguration", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.CameraCapturerConfiguration = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERACAPTURERCONFIGURATION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setCameraCapturerConfiguration ", ret, 0);
//     shouldEqual("IRtcEngine_setCameraCapturerConfiguration:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_switchCamera", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SWITCHCAMERA, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_switchCamera ", ret, 0);
//     shouldEqual("IRtcEngine_switchCamera:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_isCameraZoomSupported", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISCAMERAZOOMSUPPORTED, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_isCameraZoomSupported ", ret, 0);
//     shouldEqual("IRtcEngine_isCameraZoomSupported:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_isCameraFaceDetectSupported", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISCAMERAFACEDETECTSUPPORTED, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_isCameraFaceDetectSupported ", ret, 0);
//     shouldEqual("IRtcEngine_isCameraFaceDetectSupported:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_isCameraTorchSupported", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISCAMERATORCHSUPPORTED, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_isCameraTorchSupported ", ret, 0);
//     shouldEqual("IRtcEngine_isCameraTorchSupported:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_isCameraFocusSupported", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISCAMERAFOCUSSUPPORTED, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_isCameraFocusSupported ", ret, 0);
//     shouldEqual("IRtcEngine_isCameraFocusSupported:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_isCameraAutoFocusFaceModeSupported", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISCAMERAAUTOFOCUSFACEMODESUPPORTED, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_isCameraAutoFocusFaceModeSupported ", ret, 0);
//     shouldEqual("IRtcEngine_isCameraAutoFocusFaceModeSupported:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setCameraZoomFactor", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let factor: number = 0;
//     let paramObj = {
//         factor,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERAZOOMFACTOR, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setCameraZoomFactor ", ret, 0);
//     shouldEqual("IRtcEngine_setCameraZoomFactor:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableFaceDetection", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let paramObj = {
//         enabled,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEFACEDETECTION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableFaceDetection ", ret, 0);
//     shouldEqual("IRtcEngine_enableFaceDetection:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getCameraMaxZoomFactor", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETCAMERAMAXZOOMFACTOR, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getCameraMaxZoomFactor ", ret, 0);
//     shouldEqual("IRtcEngine_getCameraMaxZoomFactor:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setCameraFocusPositionInPreview", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let positionX: number = 0;
//     let positionY: number = 0;
//     let paramObj = {
//         positionX,
//         positionY,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERAFOCUSPOSITIONINPREVIEW, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setCameraFocusPositionInPreview ", ret, 0);
//     shouldEqual("IRtcEngine_setCameraFocusPositionInPreview:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setCameraTorchOn", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let isOn: boolean = 0;
//     let paramObj = {
//         isOn,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERATORCHON, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setCameraTorchOn ", ret, 0);
//     shouldEqual("IRtcEngine_setCameraTorchOn:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setCameraAutoFocusFaceModeEnabled", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let paramObj = {
//         enabled,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERAAUTOFOCUSFACEMODEENABLED, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setCameraAutoFocusFaceModeEnabled ", ret, 0);
//     shouldEqual("IRtcEngine_setCameraAutoFocusFaceModeEnabled:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_isCameraExposurePositionSupported", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISCAMERAEXPOSUREPOSITIONSUPPORTED, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_isCameraExposurePositionSupported ", ret, 0);
//     shouldEqual("IRtcEngine_isCameraExposurePositionSupported:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setCameraExposurePosition", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let positionXinView: number = 0;
//     let positionYinView: number = 0;
//     let paramObj = {
//         positionXinView,
//         positionYinView,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERAEXPOSUREPOSITION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setCameraExposurePosition ", ret, 0);
//     shouldEqual("IRtcEngine_setCameraExposurePosition:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_isCameraAutoExposureFaceModeSupported", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISCAMERAAUTOEXPOSUREFACEMODESUPPORTED, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_isCameraAutoExposureFaceModeSupported ", ret, 0);
//     shouldEqual("IRtcEngine_isCameraAutoExposureFaceModeSupported:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setCameraAutoExposureFaceModeEnabled", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let paramObj = {
//         enabled,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERAAUTOEXPOSUREFACEMODEENABLED, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setCameraAutoExposureFaceModeEnabled ", ret, 0);
//     shouldEqual("IRtcEngine_setCameraAutoExposureFaceModeEnabled:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setDefaultAudioRouteToSpeakerphone", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let defaultToSpeaker: boolean = 0;
//     let paramObj = {
//         defaultToSpeaker,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETDEFAULTAUDIOROUTETOSPEAKERPHONE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setDefaultAudioRouteToSpeakerphone ", ret, 0);
//     shouldEqual("IRtcEngine_setDefaultAudioRouteToSpeakerphone:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setEnableSpeakerphone", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let speakerOn: boolean = 0;
//     let paramObj = {
//         speakerOn,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETENABLESPEAKERPHONE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setEnableSpeakerphone ", ret, 0);
//     shouldEqual("IRtcEngine_setEnableSpeakerphone:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_isSpeakerphoneEnabled", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ISSPEAKERPHONEENABLED, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_isSpeakerphoneEnabled ", ret, 0);
//     shouldEqual("IRtcEngine_isSpeakerphoneEnabled:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getScreenCaptureSources", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let thumbSize: number = 0;
//     let iconSize: number = 0;
//     let includeScreen: boolean = 0;
//     let paramObj = {
//         thumbSize,
//         iconSize,
//         includeScreen,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETSCREENCAPTURESOURCES, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getScreenCaptureSources ", ret, 0);
//     shouldEqual("IRtcEngine_getScreenCaptureSources:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setAudioSessionOperationRestriction", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let restriction: agorartc.AUDIO_SESSION_OPERATION_RESTRICTION = 0;
//     let paramObj = {
//         restriction,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAUDIOSESSIONOPERATIONRESTRICTION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setAudioSessionOperationRestriction ", ret, 0);
//     shouldEqual("IRtcEngine_setAudioSessionOperationRestriction:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startScreenCaptureByScreenRect", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let screenRect: agorartc.Rectangle = 0;
//     let regionRect: agorartc.Rectangle = 0;
//     let captureParams: agorartc.ScreenCaptureParameters = 0;
//     let paramObj = {
//         screenRect,
//         regionRect,
//         captureParams,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSCREENCAPTUREBYSCREENRECT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startScreenCaptureByScreenRect ", ret, 0);
//     shouldEqual("IRtcEngine_startScreenCaptureByScreenRect:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startScreenCapture", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let mediaProjectionPermissionResultData: void = 0;
//     let captureParams: agorartc.ScreenCaptureParameters = 0;
//     let paramObj = {
//         mediaProjectionPermissionResultData,
//         captureParams,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSCREENCAPTURE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startScreenCapture ", ret, 0);
//     shouldEqual("IRtcEngine_startScreenCapture:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getAudioDeviceInfo", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let deviceInfo: agorartc.DeviceInfo = 0;
//     let paramObj = {
//         deviceInfo,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETAUDIODEVICEINFO, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getAudioDeviceInfo ", ret, 0);
//     shouldEqual("IRtcEngine_getAudioDeviceInfo:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startScreenCaptureByWindowId", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let windowId: agorartc.view_t = 0;
//     let regionRect: agorartc.Rectangle = 0;
//     let captureParams: agorartc.ScreenCaptureParameters = 0;
//     let paramObj = {
//         windowId,
//         regionRect,
//         captureParams,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSCREENCAPTUREBYWINDOWID, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startScreenCaptureByWindowId ", ret, 0);
//     shouldEqual("IRtcEngine_startScreenCaptureByWindowId:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setScreenCaptureContentHint", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let contentHint: agorartc.VIDEO_CONTENT_HINT = 0;
//     let paramObj = {
//         contentHint,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETSCREENCAPTURECONTENTHINT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setScreenCaptureContentHint ", ret, 0);
//     shouldEqual("IRtcEngine_setScreenCaptureContentHint:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_updateScreenCaptureRegion", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let regionRect: agorartc.Rectangle = 0;
//     let paramObj = {
//         regionRect,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATESCREENCAPTUREREGION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_updateScreenCaptureRegion ", ret, 0);
//     shouldEqual("IRtcEngine_updateScreenCaptureRegion:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_updateScreenCaptureParameters", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let captureParams: agorartc.ScreenCaptureParameters = 0;
//     let paramObj = {
//         captureParams,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATESCREENCAPTUREPARAMETERS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_updateScreenCaptureParameters ", ret, 0);
//     shouldEqual("IRtcEngine_updateScreenCaptureParameters:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopScreenCapture", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPSCREENCAPTURE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopScreenCapture ", ret, 0);
//     shouldEqual("IRtcEngine_stopScreenCapture:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getCallId", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let callId: agorartc.AString = 0;
//     let paramObj = {
//         callId,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETCALLID, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getCallId ", ret, 0);
//     shouldEqual("IRtcEngine_getCallId:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_rate", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let callId: string = 0;
//     let rating: number = 0;
//     let description: string = 0;
//     let paramObj = {
//         callId,
//         rating,
//         description,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_RATE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_rate ", ret, 0);
//     shouldEqual("IRtcEngine_rate:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_complain", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let callId: string = 0;
//     let description: string = 0;
//     let paramObj = {
//         callId,
//         description,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_COMPLAIN, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_complain ", ret, 0);
//     shouldEqual("IRtcEngine_complain:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_addPublishStreamUrl", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let url: string = 0;
//     let transcodingEnabled: boolean = 0;
//     let paramObj = {
//         url,
//         transcodingEnabled,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADDPUBLISHSTREAMURL, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_addPublishStreamUrl ", ret, 0);
//     shouldEqual("IRtcEngine_addPublishStreamUrl:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_removePublishStreamUrl", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let url: string = 0;
//     let paramObj = {
//         url,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REMOVEPUBLISHSTREAMURL, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_removePublishStreamUrl ", ret, 0);
//     shouldEqual("IRtcEngine_removePublishStreamUrl:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setLiveTranscoding", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let transcoding: agorartc.LiveTranscoding = 0;
//     let paramObj = {
//         transcoding,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLIVETRANSCODING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setLiveTranscoding ", ret, 0);
//     shouldEqual("IRtcEngine_setLiveTranscoding:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startRtmpStreamWithoutTranscoding", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let url: string = 0;
//     let paramObj = {
//         url,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTRTMPSTREAMWITHOUTTRANSCODING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startRtmpStreamWithoutTranscoding ", ret, 0);
//     shouldEqual("IRtcEngine_startRtmpStreamWithoutTranscoding:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startRtmpStreamWithTranscoding", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let url: string = 0;
//     let transcoding: agorartc.LiveTranscoding = 0;
//     let paramObj = {
//         url,
//         transcoding,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTRTMPSTREAMWITHTRANSCODING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startRtmpStreamWithTranscoding ", ret, 0);
//     shouldEqual("IRtcEngine_startRtmpStreamWithTranscoding:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_updateRtmpTranscoding", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let transcoding: agorartc.LiveTranscoding = 0;
//     let paramObj = {
//         transcoding,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATERTMPTRANSCODING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_updateRtmpTranscoding ", ret, 0);
//     shouldEqual("IRtcEngine_updateRtmpTranscoding:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopRtmpStream", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let url: string = 0;
//     let paramObj = {
//         url,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPRTMPSTREAM, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopRtmpStream ", ret, 0);
//     shouldEqual("IRtcEngine_stopRtmpStream:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startLocalVideoTranscoder", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.LocalTranscoderConfiguration = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTLOCALVIDEOTRANSCODER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startLocalVideoTranscoder ", ret, 0);
//     shouldEqual("IRtcEngine_startLocalVideoTranscoder:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_updateLocalTranscoderConfiguration", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.LocalTranscoderConfiguration = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATELOCALTRANSCODERCONFIGURATION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_updateLocalTranscoderConfiguration ", ret, 0);
//     shouldEqual("IRtcEngine_updateLocalTranscoderConfiguration:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopLocalVideoTranscoder", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPLOCALVIDEOTRANSCODER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopLocalVideoTranscoder ", ret, 0);
//     shouldEqual("IRtcEngine_stopLocalVideoTranscoder:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startPrimaryCameraCapture", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.CameraCapturerConfiguration = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTPRIMARYCAMERACAPTURE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startPrimaryCameraCapture ", ret, 0);
//     shouldEqual("IRtcEngine_startPrimaryCameraCapture:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startSecondaryCameraCapture", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.CameraCapturerConfiguration = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSECONDARYCAMERACAPTURE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startSecondaryCameraCapture ", ret, 0);
//     shouldEqual("IRtcEngine_startSecondaryCameraCapture:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopPrimaryCameraCapture", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPPRIMARYCAMERACAPTURE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopPrimaryCameraCapture ", ret, 0);
//     shouldEqual("IRtcEngine_stopPrimaryCameraCapture:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopSecondaryCameraCapture", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPSECONDARYCAMERACAPTURE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopSecondaryCameraCapture ", ret, 0);
//     shouldEqual("IRtcEngine_stopSecondaryCameraCapture:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setCameraDeviceOrientation", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let type: agorartc.VIDEO_SOURCE_TYPE = 0;
//     let orientation: agorartc.VIDEO_ORIENTATION = 0;
//     let paramObj = {
//         type,
//         orientation,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCAMERADEVICEORIENTATION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setCameraDeviceOrientation ", ret, 0);
//     shouldEqual("IRtcEngine_setCameraDeviceOrientation:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setScreenCaptureOrientation", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let type: agorartc.VIDEO_SOURCE_TYPE = 0;
//     let orientation: agorartc.VIDEO_ORIENTATION = 0;
//     let paramObj = {
//         type,
//         orientation,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETSCREENCAPTUREORIENTATION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setScreenCaptureOrientation ", ret, 0);
//     shouldEqual("IRtcEngine_setScreenCaptureOrientation:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startPrimaryScreenCapture", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.ScreenCaptureConfiguration = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTPRIMARYSCREENCAPTURE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startPrimaryScreenCapture ", ret, 0);
//     shouldEqual("IRtcEngine_startPrimaryScreenCapture:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startSecondaryScreenCapture", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.ScreenCaptureConfiguration = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTSECONDARYSCREENCAPTURE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startSecondaryScreenCapture ", ret, 0);
//     shouldEqual("IRtcEngine_startSecondaryScreenCapture:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopPrimaryScreenCapture", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPPRIMARYSCREENCAPTURE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopPrimaryScreenCapture ", ret, 0);
//     shouldEqual("IRtcEngine_stopPrimaryScreenCapture:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopSecondaryScreenCapture", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPSECONDARYSCREENCAPTURE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopSecondaryScreenCapture ", ret, 0);
//     shouldEqual("IRtcEngine_stopSecondaryScreenCapture:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getConnectionState", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETCONNECTIONSTATE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getConnectionState ", ret, 0);
//     shouldEqual("IRtcEngine_getConnectionState:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_registerEventHandler", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let eventHandler: agorartc.IRtcEngineEventHandler[] = 0;
//     let paramObj = {
//         eventHandler,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REGISTEREVENTHANDLER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_registerEventHandler ", ret, 0);
//     shouldEqual("IRtcEngine_registerEventHandler:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_unregisterEventHandler", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let eventHandler: agorartc.IRtcEngineEventHandler[] = 0;
//     let paramObj = {
//         eventHandler,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UNREGISTEREVENTHANDLER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_unregisterEventHandler ", ret, 0);
//     shouldEqual("IRtcEngine_unregisterEventHandler:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setRemoteUserPriority", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let userPriority: agorartc.PRIORITY_TYPE = 0;
//     let paramObj = {
//         uid,
//         userPriority,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETREMOTEUSERPRIORITY, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setRemoteUserPriority ", ret, 0);
//     shouldEqual("IRtcEngine_setRemoteUserPriority:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_registerPacketObserver", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let observer: agorartc.IPacketObserver[] = 0;
//     let paramObj = {
//         observer,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REGISTERPACKETOBSERVER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_registerPacketObserver ", ret, 0);
//     shouldEqual("IRtcEngine_registerPacketObserver:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setEncryptionMode", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let encryptionMode: string = 0;
//     let paramObj = {
//         encryptionMode,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETENCRYPTIONMODE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setEncryptionMode ", ret, 0);
//     shouldEqual("IRtcEngine_setEncryptionMode:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setEncryptionSecret", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let secret: string = 0;
//     let paramObj = {
//         secret,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETENCRYPTIONSECRET, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setEncryptionSecret ", ret, 0);
//     shouldEqual("IRtcEngine_setEncryptionSecret:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableEncryption", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let config: agorartc.EncryptionConfig = 0;
//     let paramObj = {
//         enabled,
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEENCRYPTION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableEncryption ", ret, 0);
//     shouldEqual("IRtcEngine_enableEncryption:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_createDataStream", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let streamId: number = 0;
//     let reliable: boolean = 0;
//     let ordered: boolean = 0;
//     let paramObj = {
//         streamId,
//         reliable,
//         ordered,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_CREATEDATASTREAM, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_createDataStream ", ret, 0);
//     shouldEqual("IRtcEngine_createDataStream:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_createDataStream", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let streamId: number = 0;
//     let config: agorartc.DataStreamConfig = 0;
//     let paramObj = {
//         streamId,
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_CREATEDATASTREAM, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_createDataStream ", ret, 0);
//     shouldEqual("IRtcEngine_createDataStream:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_sendStreamMessage", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let streamId: number = 0;
//     let data: string = 0;
//     let length: number = 0;
//     let paramObj = {
//         streamId,
//         data,
//         length,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SENDSTREAMMESSAGE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_sendStreamMessage ", ret, 0);
//     shouldEqual("IRtcEngine_sendStreamMessage:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_addVideoWatermark", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let watermark: agorartc.RtcImage = 0;
//     let paramObj = {
//         watermark,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADDVIDEOWATERMARK, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_addVideoWatermark ", ret, 0);
//     shouldEqual("IRtcEngine_addVideoWatermark:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_addVideoWatermark", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let watermarkUrl: string = 0;
//     let options: agorartc.WatermarkOptions = 0;
//     let paramObj = {
//         watermarkUrl,
//         options,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADDVIDEOWATERMARK, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_addVideoWatermark ", ret, 0);
//     shouldEqual("IRtcEngine_addVideoWatermark:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_clearVideoWatermark", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_CLEARVIDEOWATERMARK, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_clearVideoWatermark ", ret, 0);
//     shouldEqual("IRtcEngine_clearVideoWatermark:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_clearVideoWatermarks", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_CLEARVIDEOWATERMARKS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_clearVideoWatermarks ", ret, 0);
//     shouldEqual("IRtcEngine_clearVideoWatermarks:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_addInjectStreamUrl", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let url: string = 0;
//     let config: agorartc.InjectStreamConfig = 0;
//     let paramObj = {
//         url,
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADDINJECTSTREAMURL, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_addInjectStreamUrl ", ret, 0);
//     shouldEqual("IRtcEngine_addInjectStreamUrl:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_removeInjectStreamUrl", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let url: string = 0;
//     let paramObj = {
//         url,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REMOVEINJECTSTREAMURL, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_removeInjectStreamUrl ", ret, 0);
//     shouldEqual("IRtcEngine_removeInjectStreamUrl:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_pauseAudio", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PAUSEAUDIO, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_pauseAudio ", ret, 0);
//     shouldEqual("IRtcEngine_pauseAudio:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_resumeAudio", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_RESUMEAUDIO, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_resumeAudio ", ret, 0);
//     shouldEqual("IRtcEngine_resumeAudio:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableWebSdkInteroperability", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let paramObj = {
//         enabled,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEWEBSDKINTEROPERABILITY, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableWebSdkInteroperability ", ret, 0);
//     shouldEqual("IRtcEngine_enableWebSdkInteroperability:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_sendCustomReportMessage", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let id: string = 0;
//     let category: string = 0;
//     let event: string = 0;
//     let label: string = 0;
//     let value: number = 0;
//     let paramObj = {
//         id,
//         category,
//         event,
//         label,
//         value,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SENDCUSTOMREPORTMESSAGE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_sendCustomReportMessage ", ret, 0);
//     shouldEqual("IRtcEngine_sendCustomReportMessage:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_registerMediaMetadataObserver", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let observer: agorartc.IMetadataObserver[] = 0;
//     let type: agorartc.METADATA_TYPE = 0;
//     let paramObj = {
//         observer,
//         type,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REGISTERMEDIAMETADATAOBSERVER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_registerMediaMetadataObserver ", ret, 0);
//     shouldEqual("IRtcEngine_registerMediaMetadataObserver:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_unregisterMediaMetadataObserver", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let observer: agorartc.IMetadataObserver[] = 0;
//     let type: agorartc.METADATA_TYPE = 0;
//     let paramObj = {
//         observer,
//         type,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UNREGISTERMEDIAMETADATAOBSERVER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_unregisterMediaMetadataObserver ", ret, 0);
//     shouldEqual("IRtcEngine_unregisterMediaMetadataObserver:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startAudioFrameDump", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let channel_id: string = 0;
//     let user_id: agorartc.uid_t = 0;
//     let location: string = 0;
//     let uuid: string = 0;
//     let passwd: string = 0;
//     let duration_ms: long = 0;
//     let auto_upload: boolean = 0;
//     let paramObj = {
//         channel_id,
//         user_id,
//         location,
//         uuid,
//         passwd,
//         duration_ms,
//         auto_upload,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTAUDIOFRAMEDUMP, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startAudioFrameDump ", ret, 0);
//     shouldEqual("IRtcEngine_startAudioFrameDump:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopAudioFrameDump", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let channel_id: string = 0;
//     let user_id: agorartc.uid_t = 0;
//     let location: string = 0;
//     let paramObj = {
//         channel_id,
//         user_id,
//         location,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPAUDIOFRAMEDUMP, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopAudioFrameDump ", ret, 0);
//     shouldEqual("IRtcEngine_stopAudioFrameDump:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_registerLocalUserAccount", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let appId: string = 0;
//     let userAccount: string = 0;
//     let paramObj = {
//         appId,
//         userAccount,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_REGISTERLOCALUSERACCOUNT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_registerLocalUserAccount ", ret, 0);
//     shouldEqual("IRtcEngine_registerLocalUserAccount:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_joinChannelWithUserAccount", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let token: string = 0;
//     let channelId: string = 0;
//     let userAccount: string = 0;
//     let paramObj = {
//         token,
//         channelId,
//         userAccount,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNELWITHUSERACCOUNT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_joinChannelWithUserAccount ", ret, 0);
//     shouldEqual("IRtcEngine_joinChannelWithUserAccount:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_joinChannelWithUserAccount", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let token: string = 0;
//     let channelId: string = 0;
//     let userAccount: string = 0;
//     let options: agorartc.ChannelMediaOptions = 0;
//     let paramObj = {
//         token,
//         channelId,
//         userAccount,
//         options,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNELWITHUSERACCOUNT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_joinChannelWithUserAccount ", ret, 0);
//     shouldEqual("IRtcEngine_joinChannelWithUserAccount:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_joinChannelWithUserAccountEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let token: string = 0;
//     let channelId: string = 0;
//     let userAccount: string = 0;
//     let options: agorartc.ChannelMediaOptions = 0;
//     let eventHandler: agorartc.IRtcEngineEventHandler[] = 0;
//     let paramObj = {
//         token,
//         channelId,
//         userAccount,
//         options,
//         eventHandler,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_JOINCHANNELWITHUSERACCOUNTEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_joinChannelWithUserAccountEx ", ret, 0);
//     shouldEqual("IRtcEngine_joinChannelWithUserAccountEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getUserInfoByUserAccount", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let userAccount: string = 0;
//     let userInfo: agorartc.UserInfo[] = 0;
//     let paramObj = {
//         userAccount,
//         userInfo,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETUSERINFOBYUSERACCOUNT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getUserInfoByUserAccount ", ret, 0);
//     shouldEqual("IRtcEngine_getUserInfoByUserAccount:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_getUserInfoByUid", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let userInfo: agorartc.UserInfo[] = 0;
//     let paramObj = {
//         uid,
//         userInfo,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_GETUSERINFOBYUID, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_getUserInfoByUid ", ret, 0);
//     shouldEqual("IRtcEngine_getUserInfoByUid:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startChannelMediaRelay", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let configuration: agorartc.ChannelMediaRelayConfiguration = 0;
//     let paramObj = {
//         configuration,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTCHANNELMEDIARELAY, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startChannelMediaRelay ", ret, 0);
//     shouldEqual("IRtcEngine_startChannelMediaRelay:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_updateChannelMediaRelay", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let configuration: agorartc.ChannelMediaRelayConfiguration = 0;
//     let paramObj = {
//         configuration,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATECHANNELMEDIARELAY, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_updateChannelMediaRelay ", ret, 0);
//     shouldEqual("IRtcEngine_updateChannelMediaRelay:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopChannelMediaRelay", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPCHANNELMEDIARELAY, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopChannelMediaRelay ", ret, 0);
//     shouldEqual("IRtcEngine_stopChannelMediaRelay:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_pauseAllChannelMediaRelay", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PAUSEALLCHANNELMEDIARELAY, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_pauseAllChannelMediaRelay ", ret, 0);
//     shouldEqual("IRtcEngine_pauseAllChannelMediaRelay:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_resumeAllChannelMediaRelay", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_RESUMEALLCHANNELMEDIARELAY, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_resumeAllChannelMediaRelay ", ret, 0);
//     shouldEqual("IRtcEngine_resumeAllChannelMediaRelay:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setDirectCdnStreamingAudioConfiguration", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let profile: agorartc.AUDIO_PROFILE_TYPE = 0;
//     let paramObj = {
//         profile,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETDIRECTCDNSTREAMINGAUDIOCONFIGURATION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setDirectCdnStreamingAudioConfiguration ", ret, 0);
//     shouldEqual("IRtcEngine_setDirectCdnStreamingAudioConfiguration:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setDirectCdnStreamingVideoConfiguration", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.VideoEncoderConfiguration = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETDIRECTCDNSTREAMINGVIDEOCONFIGURATION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setDirectCdnStreamingVideoConfiguration ", ret, 0);
//     shouldEqual("IRtcEngine_setDirectCdnStreamingVideoConfiguration:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startDirectCdnStreaming", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let eventHandler: agorartc.IDirectCdnStreamingEventHandler[] = 0;
//     let publishUrl: string = 0;
//     let options: agorartc.DirectCdnStreamingMediaOptions = 0;
//     let paramObj = {
//         eventHandler,
//         publishUrl,
//         options,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTDIRECTCDNSTREAMING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startDirectCdnStreaming ", ret, 0);
//     shouldEqual("IRtcEngine_startDirectCdnStreaming:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopDirectCdnStreaming", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPDIRECTCDNSTREAMING, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopDirectCdnStreaming ", ret, 0);
//     shouldEqual("IRtcEngine_stopDirectCdnStreaming:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_updateDirectCdnStreamingMediaOptions", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let options: agorartc.DirectCdnStreamingMediaOptions = 0;
//     let paramObj = {
//         options,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_UPDATEDIRECTCDNSTREAMINGMEDIAOPTIONS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_updateDirectCdnStreamingMediaOptions ", ret, 0);
//     shouldEqual("IRtcEngine_updateDirectCdnStreamingMediaOptions:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_pushDirectCdnStreamingCustomVideoFrame", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let frame: agorartc.ExternalVideoFrame[] = 0;
//     let paramObj = {
//         frame,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_PUSHDIRECTCDNSTREAMINGCUSTOMVIDEOFRAME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_pushDirectCdnStreamingCustomVideoFrame ", ret, 0);
//     shouldEqual("IRtcEngine_pushDirectCdnStreamingCustomVideoFrame:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_takeSnapshot", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.SnapShotConfig = 0;
//     let callback: agorartc.ISnapshotCallback[] = 0;
//     let paramObj = {
//         config,
//         callback,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_TAKESNAPSHOT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_takeSnapshot ", ret, 0);
//     shouldEqual("IRtcEngine_takeSnapshot:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_SetContentInspect", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.ContentInspectConfig = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCONTENTINSPECT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_SetContentInspect ", ret, 0);
//     shouldEqual("IRtcEngine_SetContentInspect:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_switchChannel", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let token: string = 0;
//     let channel: string = 0;
//     let paramObj = {
//         token,
//         channel,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SWITCHCHANNEL, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_switchChannel ", ret, 0);
//     shouldEqual("IRtcEngine_switchChannel:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_startRhythmPlayer", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let sound1: string = 0;
//     let sound2: string = 0;
//     let config: agorartc.AgoraRhythmPlayerConfig = 0;
//     let paramObj = {
//         sound1,
//         sound2,
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STARTRHYTHMPLAYER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_startRhythmPlayer ", ret, 0);
//     shouldEqual("IRtcEngine_startRhythmPlayer:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_stopRhythmPlayer", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_STOPRHYTHMPLAYER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_stopRhythmPlayer ", ret, 0);
//     shouldEqual("IRtcEngine_stopRhythmPlayer:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_configRhythmPlayer", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.AgoraRhythmPlayerConfig = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_CONFIGRHYTHMPLAYER, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_configRhythmPlayer ", ret, 0);
//     shouldEqual("IRtcEngine_configRhythmPlayer:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_adjustCustomAudioPublishVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let sourceId: int32_t = 0;
//     let volume: number = 0;
//     let paramObj = {
//         sourceId,
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTCUSTOMAUDIOPUBLISHVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_adjustCustomAudioPublishVolume ", ret, 0);
//     shouldEqual("IRtcEngine_adjustCustomAudioPublishVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_adjustCustomAudioPlayoutVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let sourceId: int32_t = 0;
//     let volume: number = 0;
//     let paramObj = {
//         sourceId,
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ADJUSTCUSTOMAUDIOPLAYOUTVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_adjustCustomAudioPlayoutVolume ", ret, 0);
//     shouldEqual("IRtcEngine_adjustCustomAudioPlayoutVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setCloudProxy", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let proxyType: agorartc.CLOUD_PROXY_TYPE = 0;
//     let paramObj = {
//         proxyType,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETCLOUDPROXY, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setCloudProxy ", ret, 0);
//     shouldEqual("IRtcEngine_setCloudProxy:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setLocalAccessPoint", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.LocalAccessPointConfiguration = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETLOCALACCESSPOINT, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setLocalAccessPoint ", ret, 0);
//     shouldEqual("IRtcEngine_setLocalAccessPoint:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_enableFishCorrection", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let enabled: boolean = 0;
//     let params: agorartc.FishCorrectionParams = 0;
//     let paramObj = {
//         enabled,
//         params,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_ENABLEFISHCORRECTION, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_enableFishCorrection ", ret, 0);
//     shouldEqual("IRtcEngine_enableFishCorrection:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setAdvancedAudioOptions", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let options: agorartc.AdvancedAudioOptions = 0;
//     let paramObj = {
//         options,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETADVANCEDAUDIOOPTIONS, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setAdvancedAudioOptions ", ret, 0);
//     shouldEqual("IRtcEngine_setAdvancedAudioOptions:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngine_setAVSyncSource", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let channelId: string = 0;
//     let uid: agorartc.uid_t = 0;
//     let paramObj = {
//         channelId,
//         uid,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINE_SETAVSYNCSOURCE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngine_setAVSyncSource ", ret, 0);
//     shouldEqual("IRtcEngine_setAVSyncSource:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// //IRtcEngineEx

// test("IRtcEngineEx_joinChannelEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let token: string = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let options: agorartc.ChannelMediaOptions = 0;
//     let eventHandler: agorartc.IRtcEngineEventHandler[] = 0;
//     let paramObj = {
//         token,
//         connection,
//         options,
//         eventHandler,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_JOINCHANNELEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_joinChannelEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_joinChannelEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_leaveChannelEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_LEAVECHANNELEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_leaveChannelEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_leaveChannelEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_updateChannelMediaOptionsEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let options: agorartc.ChannelMediaOptions = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         options,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_UPDATECHANNELMEDIAOPTIONSEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_updateChannelMediaOptionsEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_updateChannelMediaOptionsEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_setVideoEncoderConfigurationEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.VideoEncoderConfiguration = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         config,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SETVIDEOENCODERCONFIGURATIONEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_setVideoEncoderConfigurationEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_setVideoEncoderConfigurationEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_setupRemoteVideoEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let canvas: agorartc.VideoCanvas = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         canvas,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SETUPREMOTEVIDEOEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_setupRemoteVideoEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_setupRemoteVideoEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_muteRemoteAudioStreamEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let mute: boolean = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         uid,
//         mute,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_MUTEREMOTEAUDIOSTREAMEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_muteRemoteAudioStreamEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_muteRemoteAudioStreamEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_muteRemoteVideoStreamEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let mute: boolean = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         uid,
//         mute,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_MUTEREMOTEVIDEOSTREAMEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_muteRemoteVideoStreamEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_muteRemoteVideoStreamEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_setRemoteVideoStreamTypeEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let streamType: agorartc.VIDEO_STREAM_TYPE = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         uid,
//         streamType,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SETREMOTEVIDEOSTREAMTYPEEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_setRemoteVideoStreamTypeEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_setRemoteVideoStreamTypeEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_setRemoteVoicePositionEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let pan: number = 0;
//     let gain: number = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         uid,
//         pan,
//         gain,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SETREMOTEVOICEPOSITIONEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_setRemoteVoicePositionEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_setRemoteVoicePositionEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_setRemoteUserSpatialAudioParamsEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let params: agorartc.SpatialAudioParams = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         uid,
//         params,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SETREMOTEUSERSPATIALAUDIOPARAMSEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_setRemoteUserSpatialAudioParamsEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_setRemoteUserSpatialAudioParamsEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_setRemoteRenderModeEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let renderMode: agorartc.RENDER_MODE_TYPE = 0;
//     let mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         uid,
//         renderMode,
//         mirrorMode,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SETREMOTERENDERMODEEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_setRemoteRenderModeEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_setRemoteRenderModeEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_enableLoopbackRecordingEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let connection: agorartc.RtcConnection = 0;
//     let enabled: boolean = 0;
//     let deviceName: string = 0;
//     let paramObj = {
//         connection,
//         enabled,
//         deviceName,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_ENABLELOOPBACKRECORDINGEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_enableLoopbackRecordingEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_enableLoopbackRecordingEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_getConnectionStateEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_GETCONNECTIONSTATEEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_getConnectionStateEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_getConnectionStateEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_enableEncryptionEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let connection: agorartc.RtcConnection = 0;
//     let enabled: boolean = 0;
//     let config: agorartc.EncryptionConfig = 0;
//     let paramObj = {
//         connection,
//         enabled,
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_ENABLEENCRYPTIONEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_enableEncryptionEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_enableEncryptionEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_createDataStreamEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let streamId: number = 0;
//     let reliable: boolean = 0;
//     let ordered: boolean = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         streamId,
//         reliable,
//         ordered,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_CREATEDATASTREAMEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_createDataStreamEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_createDataStreamEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_createDataStreamEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let streamId: number = 0;
//     let config: agorartc.DataStreamConfig = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         streamId,
//         config,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_CREATEDATASTREAMEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_createDataStreamEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_createDataStreamEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_sendStreamMessageEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let streamId: number = 0;
//     let data: string = 0;
//     let length: number = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         streamId,
//         data,
//         length,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SENDSTREAMMESSAGEEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_sendStreamMessageEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_sendStreamMessageEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_addVideoWatermarkEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let watermarkUrl: string = 0;
//     let options: agorartc.WatermarkOptions = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         watermarkUrl,
//         options,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_ADDVIDEOWATERMARKEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_addVideoWatermarkEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_addVideoWatermarkEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_clearVideoWatermarkEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_CLEARVIDEOWATERMARKEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_clearVideoWatermarkEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_clearVideoWatermarkEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_sendCustomReportMessageEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let id: string = 0;
//     let category: string = 0;
//     let event: string = 0;
//     let label: string = 0;
//     let value: number = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         id,
//         category,
//         event,
//         label,
//         value,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SENDCUSTOMREPORTMESSAGEEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_sendCustomReportMessageEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_sendCustomReportMessageEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_enableAudioVolumeIndicationEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let interval: number = 0;
//     let smooth: number = 0;
//     let reportVad: boolean = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         interval,
//         smooth,
//         reportVad,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_ENABLEAUDIOVOLUMEINDICATIONEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_enableAudioVolumeIndicationEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_enableAudioVolumeIndicationEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_getUserInfoByUserAccountEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let userAccount: string = 0;
//     let userInfo: agorartc.UserInfo[] = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         userAccount,
//         userInfo,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_GETUSERINFOBYUSERACCOUNTEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_getUserInfoByUserAccountEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_getUserInfoByUserAccountEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_getUserInfoByUidEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let userInfo: agorartc.UserInfo[] = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         uid,
//         userInfo,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_GETUSERINFOBYUIDEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_getUserInfoByUidEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_getUserInfoByUidEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_setVideoProfileEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let width: number = 0;
//     let height: number = 0;
//     let frameRate: number = 0;
//     let bitrate: number = 0;
//     let paramObj = {
//         width,
//         height,
//         frameRate,
//         bitrate,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_SETVIDEOPROFILEEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_setVideoProfileEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_setVideoProfileEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_enableDualStreamModeEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let sourceType: agorartc.VIDEO_SOURCE_TYPE = 0;
//     let enabled: boolean = 0;
//     let streamConfig: agorartc.SimulcastStreamConfig = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         sourceType,
//         enabled,
//         streamConfig,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_ENABLEDUALSTREAMMODEEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_enableDualStreamModeEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_enableDualStreamModeEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IRtcEngineEx_addPublishStreamUrlEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let url: string = 0;
//     let transcodingEnabled: boolean = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         url,
//         transcodingEnabled,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_RTCENGINEEX_ADDPUBLISHSTREAMURLEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:IRtcEngineEx_addPublishStreamUrlEx ", ret, 0);
//     shouldEqual("IRtcEngineEx_addPublishStreamUrlEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// //ILocalSpatialAudioEngine

// test("ILocalSpatialAudioEngine_initialize", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let config: agorartc.LocalSpatialAudioConfig = 0;
//     let paramObj = {
//         config,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_LOCALSPATIALAUDIOENGINE_INITIALIZE, params, params.length, null, 0, result);

//     shouldEqual("callApi:ILocalSpatialAudioEngine_initialize ", ret, 0);
//     shouldEqual("ILocalSpatialAudioEngine_initialize:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("ILocalSpatialAudioEngine_updateRemotePosition", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let posInfo: agorartc.RemoteVoicePositionInfo = 0;
//     let paramObj = {
//         uid,
//         posInfo,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_LOCALSPATIALAUDIOENGINE_UPDATEREMOTEPOSITION, params, params.length, null, 0, result);

//     shouldEqual("callApi:ILocalSpatialAudioEngine_updateRemotePosition ", ret, 0);
//     shouldEqual("ILocalSpatialAudioEngine_updateRemotePosition:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("ILocalSpatialAudioEngine_updateRemotePositionEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let posInfo: agorartc.RemoteVoicePositionInfo = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         uid,
//         posInfo,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_LOCALSPATIALAUDIOENGINE_UPDATEREMOTEPOSITIONEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:ILocalSpatialAudioEngine_updateRemotePositionEx ", ret, 0);
//     shouldEqual("ILocalSpatialAudioEngine_updateRemotePositionEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("ILocalSpatialAudioEngine_removeRemotePosition", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let paramObj = {
//         uid,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_LOCALSPATIALAUDIOENGINE_REMOVEREMOTEPOSITION, params, params.length, null, 0, result);

//     shouldEqual("callApi:ILocalSpatialAudioEngine_removeRemotePosition ", ret, 0);
//     shouldEqual("ILocalSpatialAudioEngine_removeRemotePosition:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("ILocalSpatialAudioEngine_removeRemotePositionEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let uid: agorartc.uid_t = 0;
//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         uid,
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_LOCALSPATIALAUDIOENGINE_REMOVEREMOTEPOSITIONEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:ILocalSpatialAudioEngine_removeRemotePositionEx ", ret, 0);
//     shouldEqual("ILocalSpatialAudioEngine_removeRemotePositionEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("ILocalSpatialAudioEngine_clearRemotePositions", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_LOCALSPATIALAUDIOENGINE_CLEARREMOTEPOSITIONS, params, params.length, null, 0, result);

//     shouldEqual("callApi:ILocalSpatialAudioEngine_clearRemotePositions ", ret, 0);
//     shouldEqual("ILocalSpatialAudioEngine_clearRemotePositions:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("ILocalSpatialAudioEngine_clearRemotePositionsEx", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let connection: agorartc.RtcConnection = 0;
//     let paramObj = {
//         connection,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_LOCALSPATIALAUDIOENGINE_CLEARREMOTEPOSITIONSEX, params, params.length, null, 0, result);

//     shouldEqual("callApi:ILocalSpatialAudioEngine_clearRemotePositionsEx ", ret, 0);
//     shouldEqual("ILocalSpatialAudioEngine_clearRemotePositionsEx:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// //IAudioDeviceManager

// test("IAudioDeviceManager_enumeratePlaybackDevices", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_ENUMERATEPLAYBACKDEVICES, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_enumeratePlaybackDevices ", ret, 0);
//     shouldEqual("IAudioDeviceManager_enumeratePlaybackDevices:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_enumerateRecordingDevices", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_ENUMERATERECORDINGDEVICES, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_enumerateRecordingDevices ", ret, 0);
//     shouldEqual("IAudioDeviceManager_enumerateRecordingDevices:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_setPlaybackDevice", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let deviceId: string = 0;
//     let paramObj = {
//         deviceId,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_SETPLAYBACKDEVICE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_setPlaybackDevice ", ret, 0);
//     shouldEqual("IAudioDeviceManager_setPlaybackDevice:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_getPlaybackDevice", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let deviceId: string = 0;
//     let paramObj = {
//         deviceId,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETPLAYBACKDEVICE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_getPlaybackDevice ", ret, 0);
//     shouldEqual("IAudioDeviceManager_getPlaybackDevice:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_getPlaybackDeviceInfo", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let deviceId: string = 0;
//     let deviceName: string = 0;
//     let paramObj = {
//         deviceId,
//         deviceName,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETPLAYBACKDEVICEINFO, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_getPlaybackDeviceInfo ", ret, 0);
//     shouldEqual("IAudioDeviceManager_getPlaybackDeviceInfo:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_setPlaybackDeviceVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let volume: number = 0;
//     let paramObj = {
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_SETPLAYBACKDEVICEVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_setPlaybackDeviceVolume ", ret, 0);
//     shouldEqual("IAudioDeviceManager_setPlaybackDeviceVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_getPlaybackDeviceVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let volume: number = 0;
//     let paramObj = {
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETPLAYBACKDEVICEVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_getPlaybackDeviceVolume ", ret, 0);
//     shouldEqual("IAudioDeviceManager_getPlaybackDeviceVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_setRecordingDevice", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let deviceId: string = 0;
//     let paramObj = {
//         deviceId,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_SETRECORDINGDEVICE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_setRecordingDevice ", ret, 0);
//     shouldEqual("IAudioDeviceManager_setRecordingDevice:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_getRecordingDevice", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let deviceId: string = 0;
//     let paramObj = {
//         deviceId,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETRECORDINGDEVICE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_getRecordingDevice ", ret, 0);
//     shouldEqual("IAudioDeviceManager_getRecordingDevice:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_getRecordingDeviceInfo", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let deviceId: string = 0;
//     let deviceName: string = 0;
//     let paramObj = {
//         deviceId,
//         deviceName,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETRECORDINGDEVICEINFO, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_getRecordingDeviceInfo ", ret, 0);
//     shouldEqual("IAudioDeviceManager_getRecordingDeviceInfo:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_setRecordingDeviceVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let volume: number = 0;
//     let paramObj = {
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_SETRECORDINGDEVICEVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_setRecordingDeviceVolume ", ret, 0);
//     shouldEqual("IAudioDeviceManager_setRecordingDeviceVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_getRecordingDeviceVolume", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let volume: number = 0;
//     let paramObj = {
//         volume,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETRECORDINGDEVICEVOLUME, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_getRecordingDeviceVolume ", ret, 0);
//     shouldEqual("IAudioDeviceManager_getRecordingDeviceVolume:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_setPlaybackDeviceMute", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let mute: boolean = 0;
//     let paramObj = {
//         mute,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_SETPLAYBACKDEVICEMUTE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_setPlaybackDeviceMute ", ret, 0);
//     shouldEqual("IAudioDeviceManager_setPlaybackDeviceMute:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_getPlaybackDeviceMute", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let mute: boolean = 0;
//     let paramObj = {
//         mute,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETPLAYBACKDEVICEMUTE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_getPlaybackDeviceMute ", ret, 0);
//     shouldEqual("IAudioDeviceManager_getPlaybackDeviceMute:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_setRecordingDeviceMute", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let mute: boolean = 0;
//     let paramObj = {
//         mute,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_SETRECORDINGDEVICEMUTE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_setRecordingDeviceMute ", ret, 0);
//     shouldEqual("IAudioDeviceManager_setRecordingDeviceMute:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_getRecordingDeviceMute", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let mute: boolean = 0;
//     let paramObj = {
//         mute,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_GETRECORDINGDEVICEMUTE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_getRecordingDeviceMute ", ret, 0);
//     shouldEqual("IAudioDeviceManager_getRecordingDeviceMute:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_startPlaybackDeviceTest", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let testAudioFilePath: string = 0;
//     let paramObj = {
//         testAudioFilePath,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_STARTPLAYBACKDEVICETEST, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_startPlaybackDeviceTest ", ret, 0);
//     shouldEqual("IAudioDeviceManager_startPlaybackDeviceTest:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_stopPlaybackDeviceTest", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_STOPPLAYBACKDEVICETEST, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_stopPlaybackDeviceTest ", ret, 0);
//     shouldEqual("IAudioDeviceManager_stopPlaybackDeviceTest:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_startRecordingDeviceTest", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let indicationInterval: number = 0;
//     let paramObj = {
//         indicationInterval,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_STARTRECORDINGDEVICETEST, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_startRecordingDeviceTest ", ret, 0);
//     shouldEqual("IAudioDeviceManager_startRecordingDeviceTest:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_stopRecordingDeviceTest", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_STOPRECORDINGDEVICETEST, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_stopRecordingDeviceTest ", ret, 0);
//     shouldEqual("IAudioDeviceManager_stopRecordingDeviceTest:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_startAudioDeviceLoopbackTest", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let indicationInterval: number = 0;
//     let paramObj = {
//         indicationInterval,
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_STARTAUDIODEVICELOOPBACKTEST, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_startAudioDeviceLoopbackTest ", ret, 0);
//     shouldEqual("IAudioDeviceManager_startAudioDeviceLoopbackTest:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_stopAudioDeviceLoopbackTest", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_STOPAUDIODEVICELOOPBACKTEST, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_stopAudioDeviceLoopbackTest ", ret, 0);
//     shouldEqual("IAudioDeviceManager_stopAudioDeviceLoopbackTest:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });

// test("IAudioDeviceManager_release", async () => {

//     let eventHandler: IrisEventHandler = {
//         onEvent(event: string, data: string, buffer: Array<Uint8ClampedArray>, length: Array<number>, buffer_count: number) {
//             //do something in there
//         }
//     };

//     let apiEngine = await testBegine(false,false, false, eventHandler);

//     let paramObj = {
//     }
//     let params = JSON.stringify(paramObj);
//     let result: any = {};
//     let ret = AgoraWrapper.CallIrisApi(apiEngine, IrisApiType.FUNC_AUDIODEVICEMANAGER_RELEASE, params, params.length, null, 0, result);

//     shouldEqual("callApi:IAudioDeviceManager_release ", ret, 0);
//     shouldEqual("IAudioDeviceManager_release:result ", result.result, 0);
//     await waitForSecond(1);
//     await testEnd(apiEngine, false);
// });





