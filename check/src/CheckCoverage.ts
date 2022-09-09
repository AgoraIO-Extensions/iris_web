// const fs = require('fs');
import * as fs from "fs";




function checkApiType() {

    let excludeKey = [
        "FUNC_KEY_ERROR",
        "FUNC_RTCENGINE_SETPARAMETERS",
        "FUNC_RTCENGINE_QUERYINTERFACE",
        "FUNC_RTCENGINE_REGISTEREVENTHANDLER",
        "FUNC_RTCENGINE_UNREGISTEREVENTHANDLER",
        "FUNC_RTCENGINE_SETMAXMETADATASIZE",
        "FUNC_RTCENGINE_SENDMETADATA",
        "FUNC_MEDIAPLAYER_INITIALIZE",
        "FUNC_MEDIAPLAYER_GETMEDIAPLAYERID",
        "FUNC_AUDIODEVICEMANAGER_RELEASE",
        "FUNC_VIDEODEVICEMANAGER_RELEASE",
        "FUNC_CLOUDSPATIALAUDIOENGINE_SETMAXAUDIORECVCOUNT",
        "FUNC_CLOUDSPATIALAUDIOENGINE_SETAUDIORECVRANGE",
        "FUNC_CLOUDSPATIALAUDIOENGINE_SETDISTANCEUNIT",
        "FUNC_CLOUDSPATIALAUDIOENGINE_UPDATESELFPOSITION",
        "FUNC_CLOUDSPATIALAUDIOENGINE_UPDATESELFPOSITIONEX",
        "FUNC_CLOUDSPATIALAUDIOENGINE_UPDATEPLAYERPOSITIONINFO",
        "FUNC_CLOUDSPATIALAUDIOENGINE_SETPARAMETERS",
        "FUNC_CLOUDSPATIALAUDIOENGINE_INITIALIZE",
        "FUNC_CLOUDSPATIALAUDIOENGINE_ADDEVENTHANDLER",
        "FUNC_CLOUDSPATIALAUDIOENGINE_REMOVEEVENTHANDLER",
        "FUNC_CLOUDSPATIALAUDIOENGINE_ENABLESPATIALIZER",
        "FUNC_CLOUDSPATIALAUDIOENGINE_SETTEAMID",
        "FUNC_CLOUDSPATIALAUDIOENGINE_SETAUDIORANGEMODE",
        "FUNC_CLOUDSPATIALAUDIOENGINE_ENTERROOM",
        "FUNC_CLOUDSPATIALAUDIOENGINE_RENEWTOKEN",
        "FUNC_CLOUDSPATIALAUDIOENGINE_EXITROOM",
        "FUNC_CLOUDSPATIALAUDIOENGINE_GETTEAMMATES",
        "FUNC_CLOUDSPATIALAUDIOENGINE_MUTELOCALAUDIOSTREAM",
        "FUNC_CLOUDSPATIALAUDIOENGINE_MUTEALLREMOTEAUDIOSTREAMS",
        "FUNC_LOCALSPATIALAUDIOENGINE_INITIALIZE",
        "FUNC_RTCRAWDATAPLUGINMANAGER_REGISTERPLUGIN",
        "FUNC_RTCRAWDATAPLUGINMANAGER_GETPLUGINPARAMETER",
        "FUNC_RTCRAWDATAPLUGINMANAGER_UNREGISTERPLUGIN",
        "FUNC_RTCRAWDATAPLUGINMANAGER_HASPLUGIN",
        "FUNC_RTCRAWDATAPLUGINMANAGER_ENABLEPLUGIN",
        "FUNC_RTCRAWDATAPLUGINMANAGER_DELETEPLUGIN",
        "FUNC_RTCRAWDATAPLUGINMANAGER_GETPLUGINS",
        "FUNC_RTCRAWDATAPLUGINMANAGER_SETPLUGINPARAMETER",
        "FUNC_RTCRAWDATAPLUGINMANAGER_REMOVEALLPLUGINS",
        "FUNC_MEDIAENGINE_RELEASE",
        "FUNC_RTCRAWDATA_REGISTERAUDIOFRAMEOBSERVER",
        "FUNC_RTCRAWDATA_UNREGISTERAUDIOFRAMEOBSERVER",
        "FUNC_RTCRAWDATA_REGISTERVIDEOFRAMEOBSERVER",
        "FUNC_RTCRAWDATA_UNREGISTERVIDEOFRAMEOBSERVER",
        "FUNC_RTCRAWDATA_REGISTERVIDEOENCODEDIMAGERECEIVER",
        "FUNC_RTCRAWDATA_UNREGISTERVIDEOENCODEDIMAGERECEIVER",
        "FUNC_RTCRAWDATA_REGISTERAUDIOENCODEDFRAMEOBSERVER",
        "FUNC_RTCRAWDATA_UNREGISTERAUDIOENCODEDFRAMEOBSERVER",
        "FUNC_RTCRAWDATA_ATTACH",
        "FUNC_RTCRAWDATA_DETACH",
    ];


    let apiTypePath = "../project/iris/base/IrisApiType.ts";
    let buffer: Buffer = fs.readFileSync(apiTypePath);
    let str = buffer.toString();

    let region = /FUNC_[A-Z]+_[A-Z|0-9]+/g;
    let array = str.matchAll(region);
    let apiTypeTimesMap: Map<string, number> = new Map();
    for (let e of array) {
        let key = e.toString();
        if (excludeKey.includes(key)) {
            apiTypeTimesMap.set(e.toString(), -100);
        }
        else {
            apiTypeTimesMap.set(e.toString(), 0);
        }
    }

    // console.log("华丽分割线")

    let testIndexPath = "../test/src/index.ts";
    buffer = fs.readFileSync(testIndexPath);
    str = buffer.toString();
    region = /FUNC_[A-Z]+_[A-Z|0-9]+/g;
    array = str.matchAll(region);
    for (let e of array) {
        let key = e.toString();
        apiTypeTimesMap.set(key, apiTypeTimesMap.get(key) as number + 1);
    }

    let results: Array<{ key: string, times: number }> = new Array();
    for (let e of apiTypeTimesMap) {
        results.push({ key: e[0], times: e[1] });
    }

    results.sort((a, b) => {
        return b.times - a.times;
    })

    for (let e of results) {
        let pre: string = "";
        if (e.times < 0) {
            pre = '\x1B[40;33m';
        }
        else if (e.times == 0) {
            pre = '\x1B[40;31m';
        }
        else {
            pre = '\x1B[40;32m'
        }
        let end: string = "";
        end = "\x1B[0m";
        console.log(pre + e.key + " : " + e.times + end);
    }

}

checkApiType();
