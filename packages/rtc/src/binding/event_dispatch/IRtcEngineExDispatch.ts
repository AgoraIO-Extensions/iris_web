
import { ApiParam, CallApiReturnType } from "iris-web-core";
import { IrisRtcEngine } from "../../engine/IrisRtcEngine";
import { RtcEngineExImpl } from "../../impl/RtcEngineExImpl";
import { IRtcEngineEx } from "../interface/IRtcEngineEx";
import * as agorartc from '../rtc_types/Index';

export class IRtcEngineExDispatch {

    private _impl: IRtcEngineEx;

    constructor(engine: IrisRtcEngine) {
        this._impl = new RtcEngineExImpl(engine);
    }

    joinChannelEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let token = obj.token;
        if (token === undefined) throw "token is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        result.result = this._impl.joinChannelEx(token, connection, options);
        return 0;
    }

    leaveChannelEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.leaveChannelEx(connection);
        return 0;
    }

    updateChannelMediaOptionsEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.updateChannelMediaOptionsEx(options, connection);
        return 0;
    }

    setVideoEncoderConfigurationEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.setVideoEncoderConfigurationEx(config, connection);
        return 0;
    }

    setupRemoteVideoEx(
        apiParam: ApiParam): CallApiReturnType {
        let obj = JSON.parse(apiParam.data) as any;
        let canvas = obj.canvas;
        if (canvas === undefined) throw "canvas is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        // result.result = this._impl.setupRemoteVideoEx(canvas, connection);
        // return 0;

        return this._impl.setupRemoteVideoEx(canvas, connection);
    }

    muteRemoteAudioStreamEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.muteRemoteAudioStreamEx(uid, mute, connection);
        return 0;
    }

    muteRemoteVideoStreamEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.muteRemoteVideoStreamEx(uid, mute, connection);
        return 0;
    }

    setRemoteVideoStreamTypeEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let streamType = obj.streamType;
        if (streamType === undefined) throw "streamType is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.setRemoteVideoStreamTypeEx(uid, streamType, connection);
        return 0;
    }

    setSubscribeAudioBlacklistEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList === undefined) throw "uidList is undefined";
        let uidNumber = obj.uidNumber;
        if (uidNumber === undefined) throw "uidNumber is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.setSubscribeAudioBlacklistEx(uidList, uidNumber, connection);
        return 0;
    }

    setSubscribeAudioWhitelistEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList === undefined) throw "uidList is undefined";
        let uidNumber = obj.uidNumber;
        if (uidNumber === undefined) throw "uidNumber is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.setSubscribeAudioWhitelistEx(uidList, uidNumber, connection);
        return 0;
    }

    setSubscribeVideoBlacklistEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList === undefined) throw "uidList is undefined";
        let uidNumber = obj.uidNumber;
        if (uidNumber === undefined) throw "uidNumber is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.setSubscribeVideoBlacklistEx(uidList, uidNumber, connection);
        return 0;
    }

    setSubscribeVideoWhitelistEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uidList = obj.uidList;
        if (uidList === undefined) throw "uidList is undefined";
        let uidNumber = obj.uidNumber;
        if (uidNumber === undefined) throw "uidNumber is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.setSubscribeVideoWhitelistEx(uidList, uidNumber, connection);
        return 0;
    }

    setRemoteVideoSubscriptionOptionsEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.setRemoteVideoSubscriptionOptionsEx(uid, options, connection);
        return 0;
    }

    setRemoteVoicePositionEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let pan = obj.pan;
        if (pan === undefined) throw "pan is undefined";
        let gain = obj.gain;
        if (gain === undefined) throw "gain is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.setRemoteVoicePositionEx(uid, pan, gain, connection);
        return 0;
    }

    setRemoteUserSpatialAudioParamsEx(
        params1: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params1) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let params = obj.params;
        if (params === undefined) throw "params is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.setRemoteUserSpatialAudioParamsEx(uid, params, connection);
        return 0;
    }

    setRemoteRenderModeEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let renderMode = obj.renderMode;
        if (renderMode === undefined) throw "renderMode is undefined";
        let mirrorMode = obj.mirrorMode;
        if (mirrorMode === undefined) throw "mirrorMode is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.setRemoteRenderModeEx(uid, renderMode, mirrorMode, connection);
        return 0;
    }

    enableLoopbackRecordingEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let deviceName = obj.deviceName;
        if (deviceName === undefined) throw "deviceName is undefined";
        result.result = this._impl.enableLoopbackRecordingEx(connection, enabled, deviceName);
        return 0;
    }

    getConnectionStateEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.getConnectionStateEx(connection);
        return 0;
    }

    enableEncryptionEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        result.result = this._impl.enableEncryptionEx(connection, enabled, config);
        return 0;
    }

    createDataStreamEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let reliable = obj.reliable;
        if (reliable === undefined) throw "reliable is undefined";
        let ordered = obj.ordered;
        if (ordered === undefined) throw "ordered is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.createDataStreamEx(reliable, ordered, connection);
        result.streamId = 0;
        return 0;
    }

    createDataStreamEx2(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let config = obj.config;
        if (config === undefined) throw "config is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.createDataStreamEx2(config, connection);
        result.streamId = 0;
        return 0;
    }

    sendStreamMessageEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let streamId = obj.streamId;
        if (streamId === undefined) throw "streamId is undefined";
        let data = obj.data;
        if (data === undefined) throw "data is undefined";
        let length = obj.length;
        if (length === undefined) throw "length is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.sendStreamMessageEx(streamId, data, length, connection);
        return 0;
    }

    addVideoWatermarkEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let watermarkUrl = obj.watermarkUrl;
        if (watermarkUrl === undefined) throw "watermarkUrl is undefined";
        let options = obj.options;
        if (options === undefined) throw "options is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.addVideoWatermarkEx(watermarkUrl, options, connection);
        return 0;
    }

    clearVideoWatermarkEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.clearVideoWatermarkEx(connection);
        return 0;
    }

    sendCustomReportMessageEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let id = obj.id;
        if (id === undefined) throw "id is undefined";
        let category = obj.category;
        if (category === undefined) throw "category is undefined";
        let event = obj.event;
        if (event === undefined) throw "event is undefined";
        let label = obj.label;
        if (label === undefined) throw "label is undefined";
        let value = obj.value;
        if (value === undefined) throw "value is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.sendCustomReportMessageEx(id, category, event, label, value, connection);
        return 0;
    }

    enableAudioVolumeIndicationEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let interval = obj.interval;
        if (interval === undefined) throw "interval is undefined";
        let smooth = obj.smooth;
        if (smooth === undefined) throw "smooth is undefined";
        let reportVad = obj.reportVad;
        if (reportVad === undefined) throw "reportVad is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.enableAudioVolumeIndicationEx(interval, smooth, reportVad, connection);
        return 0;
    }

    getUserInfoByUserAccountEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let userAccount = obj.userAccount;
        if (userAccount === undefined) throw "userAccount is undefined";
        let userInfo: agorartc.UserInfo = { userAccount: "", uid: 0 };
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.getUserInfoByUserAccountEx(userAccount, userInfo, connection);
        result.userInfo = userInfo;
        return 0;
    }

    getUserInfoByUidEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let userInfo: agorartc.UserInfo = { userAccount: "", uid: 0 };
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.getUserInfoByUidEx(uid, userInfo, connection);
        result.userInfo = userInfo;
        return 0;
    }

    setVideoProfileEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let width = obj.width;
        if (width === undefined) throw "width is undefined";
        let height = obj.height;
        if (height === undefined) throw "height is undefined";
        let frameRate = obj.frameRate;
        if (frameRate === undefined) throw "frameRate is undefined";
        let bitrate = obj.bitrate;
        if (bitrate === undefined) throw "bitrate is undefined";
        result.result = this._impl.setVideoProfileEx(width, height, frameRate, bitrate);
        return 0;
    }

    enableDualStreamModeEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType === undefined) throw "sourceType is undefined";
        let enabled = obj.enabled;
        if (enabled === undefined) throw "enabled is undefined";
        let streamConfig = obj.streamConfig;
        if (streamConfig === undefined) throw "streamConfig is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.enableDualStreamModeEx(sourceType, enabled, streamConfig, connection);
        return 0;
    }

    setDualStreamModeEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let sourceType = obj.sourceType;
        if (sourceType === undefined) throw "sourceType is undefined";
        let mode = obj.mode;
        if (mode === undefined) throw "mode is undefined";
        let streamConfig = obj.streamConfig;
        if (streamConfig === undefined) throw "streamConfig is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.setDualStreamModeEx(sourceType, mode, streamConfig, connection);
        return 0;
    }

    takeSnapshotEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let filePath = obj.filePath;
        if (filePath === undefined) throw "filePath is undefined";
        result.result = this._impl.takeSnapshotEx(connection, uid, filePath);
        return 0;
    }


    addPublishStreamUrlEx(params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let url = obj.url;
        if (url === undefined) throw "url is undefined";
        let transcodingEnabled = obj.transcodingEnabled;
        if (transcodingEnabled === undefined) throw "transcodingEnabled is undefined";
        let connection = obj.transcodingEnabled;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.addPublishStreamUrlEx(url, transcodingEnabled, connection);
        return 0;
    }

}