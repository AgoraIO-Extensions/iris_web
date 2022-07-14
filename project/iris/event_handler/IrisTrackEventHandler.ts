import { IAgoraRTCClient, IAgoraRTCRemoteUser, ITrack, ILocalTrack, ILocalVideoTrack, IRemoteTrack, IRemoteVideoTrack, CheckVideoVisibleResult } from "agora-rtc-sdk-ng";
import { IrisRtcEngine } from "../engine/IrisRtcEngine";


export type TrackType = 'ILocalTrack' | 'ILocalVideoTrack' | 'IRemoteTrack' | 'IRemoteVideoTrack';
export interface IrisTrackEventHandlerParam {
    channelName: string;
    client?: IAgoraRTCClient;
    remoteUser?: IAgoraRTCRemoteUser;
    track: ITrack;
    trackType: TrackType;
}


export class IrisTrackEventHandler {
    private _channelName: string = null;
    private _client: IAgoraRTCClient = null;
    private _remoteUser: IAgoraRTCRemoteUser = null;
    private _track: ITrack = null;
    private _trackType: TrackType = "ILocalTrack";

    private _engine: IrisRtcEngine;

    constructor(params: IrisTrackEventHandlerParam, engine: IrisRtcEngine) {
        this._channelName = params.channelName;
        this._client = params.client;
        this._remoteUser = params.remoteUser;
        this._track = params.track;
        this._trackType = params.trackType;
        this._engine = engine;

        if (this._trackType == 'ILocalTrack') {
            let track = this._track as ILocalTrack;
            track.on('track-ended', this.onEventTrackEnded.bind(this));
        }
        else if (this._trackType == 'ILocalVideoTrack') {
            let track = this._track as ILocalVideoTrack;
            track.on('track-ended', this.onEventTrackEnded.bind(this));
            track.on("beauty-effect-overload", this.onEventBeautyEffectOverload.bind(this))
            track.on("video-element-visible-status", this.onEventVideoElementVisibleStatus2.bind(this));
        }
        else if (this._trackType == 'IRemoteTrack') {
            let track = this._track as IRemoteTrack;
            track.on("first-frame-decoded", this.onEventFirstFrameDecoded.bind(this));
        }
        else if (this._trackType == 'IRemoteVideoTrack') {
            let track = this._track as IRemoteVideoTrack;
            track.on("first-frame-decoded", this.onEventFirstFrameDecoded.bind(this));
            track.on("video-element-visible-status", this.onEventVideoElementVisibleStatus);
        }
    }

    onEventTrackEnded() {

    }

    onEventBeautyEffectOverload() {

    }

    onEventVideoElementVisibleStatus(data?: CheckVideoVisibleResult): void {

    }

    onEventVideoElementVisibleStatus2(data?: CheckVideoVisibleResult): void {

    }

    onEventFirstFrameDecoded() {

    }

    destruction() {
        this._track.removeAllListeners();
    }

}