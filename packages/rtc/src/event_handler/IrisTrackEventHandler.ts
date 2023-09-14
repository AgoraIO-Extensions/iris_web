import * as NATIVE_RTC from '@iris/web-rtc';
import {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalTrack,
  ILocalVideoTrack,
  IRemoteTrack,
  IRemoteVideoTrack,
  ITrack,
} from 'agora-rtc-sdk-ng';

import { ImageData } from 'iris-web-rtc';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { CheckVideoVisibleResult } from '../web_sdk';

export type TrackType =
  | 'ILocalTrack'
  | 'ILocalVideoTrack'
  | 'IRemoteTrack'
  | 'IRemoteVideoTrack';
export interface IrisTrackEventHandlerParam {
  channelName: string;
  client?: IAgoraRTCClient;
  remoteUser?: IAgoraRTCRemoteUser;
  track: ITrack;
  trackType: TrackType;
}

//一个track可能被多个Client发布出去，所以一个track可以同事存在多个TrackEventHandler
export class IrisTrackEventHandler {
  private _channelName: string = null;
  private _client: IAgoraRTCClient = null;
  private _remoteUser: IAgoraRTCRemoteUser = null;
  private _track: ITrack = null;
  private _trackType: TrackType = 'ILocalTrack';

  private _engine: IrisRtcEngine;

  private __onEventTrackEnded = null;
  private __onEventBeautyEffectOverload = null;
  private __onEventVideoElementVisibleStatus2 = null;
  private __onEventFirstFrameDecoded = null;
  private __onEventVideoElementVisibleStatus = null;

  constructor(params: IrisTrackEventHandlerParam, engine: IrisRtcEngine) {
    this._channelName = params.channelName;
    this._client = params.client;
    this._remoteUser = params.remoteUser;
    this._track = params.track;
    this._trackType = params.trackType;
    this._engine = engine;

    if (this._trackType == 'ILocalTrack') {
      let track = this._track as ILocalTrack;
      this.__onEventTrackEnded = this.onEventTrackEnded.bind(this);
      track.on('track-ended', this.__onEventTrackEnded);
    } else if (this._trackType == 'ILocalVideoTrack') {
      let track = this._track as ILocalVideoTrack;
      this.__onEventTrackEnded = this.onEventTrackEnded.bind(this);
      track.on('track-ended', this.__onEventTrackEnded);
      this.__onEventBeautyEffectOverload = this.onEventBeautyEffectOverload.bind(
        this
      );
      this.__onEventVideoElementVisibleStatus2 = this.onEventVideoElementVisibleStatus2.bind(
        this
      );
      track.on(
        'video-element-visible-status',
        this.__onEventVideoElementVisibleStatus2
      );
    } else if (this._trackType == 'IRemoteTrack') {
      let track = this._track as IRemoteTrack;
      this.__onEventFirstFrameDecoded = this.onEventFirstFrameDecoded.bind(
        this
      );
      track.on('first-frame-decoded', this.__onEventFirstFrameDecoded);
    } else if (this._trackType == 'IRemoteVideoTrack') {
      let track = this._track as IRemoteVideoTrack;
      this.__onEventFirstFrameDecoded = this.onEventFirstFrameDecoded.bind(
        this
      );
      track.on('first-frame-decoded', this.__onEventFirstFrameDecoded);
      this.__onEventVideoElementVisibleStatus = this.onEventVideoElementVisibleStatus.bind(
        this
      );
      track.on(
        'video-element-visible-status',
        this.__onEventVideoElementVisibleStatus
      );
    }
  }

  onEventTrackEnded() {
    //目前没有找到对应的回调
  }

  onEventBeautyEffectOverload() {
    //目前没有找到对应的回调
  }

  onEventVideoElementVisibleStatus(data?: CheckVideoVisibleResult): void {
    //目前没有找到对应的回调
  }

  onEventVideoElementVisibleStatus2(data?: CheckVideoVisibleResult): void {
    //目前没有找到对应的回调
  }

  onEventFirstFrameDecoded() {
    if (this._trackType == 'IRemoteTrack') {
      let connection: NATIVE_RTC.RtcConnection = {
        channelId: this._client.channelName,
        localUid: this._client.uid as number,
      };
      let remoteUid = (this._remoteUser?.uid as number) || -1;
      let elaspsed = 0;
      // this._engine.rtcEngineEventHandler.onFirstRemoteAudioDecodedEx(
      //   connection,
      //   remoteUid,
      //   elaspsed
      // );
      // this._engine.rtcEngineEventHandler.onFirstRemoteAudioFrameEx(
      //   connection,
      //   remoteUid,
      //   elaspsed
      // );
    } else if (this._trackType == 'IRemoteVideoTrack') {
      let connection: NATIVE_RTC.RtcConnection = {
        channelId: this._client.channelName,
        localUid: this._client.uid as number,
      };
      let remoteUid = (this._remoteUser?.uid as number) || -1;
      let elaspsed = 0;
      let width = -1;
      let height = -1;
      if (this._remoteUser.hasVideo && this._remoteUser.videoTrack) {
        let imageData: ImageData = this._remoteUser.videoTrack.getCurrentFrameData();
        width = imageData?.width || -1;
        height = imageData?.height || -1;
      }
      // this._engine.rtcEngineEventHandler.onFirstRemoteVideoDecodedEx(
      //   connection,
      //   remoteUid,
      //   width,
      //   height,
      //   elaspsed
      // );
      // this._engine.rtcEngineEventHandler.onFirstRemoteVideoFrameEx(
      //   connection,
      //   remoteUid,
      //   width,
      //   height,
      //   elaspsed
      // );
    }
  }

  getTrack(): ITrack {
    return this._track;
  }

  getRemoteUser(): IAgoraRTCRemoteUser {
    return this._remoteUser;
  }

  getTrackType(): TrackType {
    return this._trackType;
  }

  destruction() {
    if (this._trackType == 'ILocalTrack') {
      let track = this._track as ILocalTrack;
      track.off('track-ended', this.__onEventTrackEnded);
    } else if (this._trackType == 'ILocalVideoTrack') {
      let track = this._track as ILocalVideoTrack;
      track.off('track-ended', this.__onEventTrackEnded);
      track.off(
        'video-element-visible-status',
        this.__onEventVideoElementVisibleStatus2
      );
    } else if (this._trackType == 'IRemoteTrack') {
      let track = this._track as IRemoteTrack;
      track.off('first-frame-decoded', this.__onEventFirstFrameDecoded);
    } else if (this._trackType == 'IRemoteVideoTrack') {
      let track = this._track as IRemoteVideoTrack;
      track.off('first-frame-decoded', this.__onEventFirstFrameDecoded);
      track.off(
        'video-element-visible-status',
        this.__onEventVideoElementVisibleStatus
      );
    }
  }
}
