/// Generated by terra, DO NOT MODIFY BY HAND.

import {
  ERROR_CODE_TYPE,
  EncodedAudioFrameInfo,
  Packet,
} from '@iris/native-rtc';
import { ApiParam } from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { AgoraConsole } from '../util/AgoraConsole';

export class IPacketObserver {
  _engine: IrisRtcEngine;

  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  notifyEvent(param: ApiParam): void {
    this._engine.irisEventHandlerManager.notifyEvent('RtcEngine', param);
  }

  onSendAudioPacket_4ad95e3(packet: Packet): void {
    AgoraConsole.warn(
      'PacketObserver_onSendAudioPacket_4ad95e3 not supported in this platform!'
    );
    this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  onSendVideoPacket_4ad95e3(packet: Packet): void {
    AgoraConsole.warn(
      'PacketObserver_onSendVideoPacket_4ad95e3 not supported in this platform!'
    );
    this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  onReceiveAudioPacket_4ad95e3(packet: Packet): void {
    AgoraConsole.warn(
      'PacketObserver_onReceiveAudioPacket_4ad95e3 not supported in this platform!'
    );
    this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  onReceiveVideoPacket_4ad95e3(packet: Packet): void {
    AgoraConsole.warn(
      'PacketObserver_onReceiveVideoPacket_4ad95e3 not supported in this platform!'
    );
    this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }
}

export class IAudioEncodedFrameObserver {
  _engine: IrisRtcEngine;

  constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  notifyEvent(param: ApiParam): void {
    this._engine.irisEventHandlerManager.notifyEvent('RtcEngine', param);
  }

  onRecordAudioEncodedFrame_d930ddc(
    frameBuffer: Uint8Array,
    length: number,
    audioEncodedFrameInfo: EncodedAudioFrameInfo
  ): void {
    AgoraConsole.warn(
      'AudioEncodedFrameObserver_onRecordAudioEncodedFrame_d930ddc not supported in this platform!'
    );
    this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  onPlaybackAudioEncodedFrame_d930ddc(
    frameBuffer: Uint8Array,
    length: number,
    audioEncodedFrameInfo: EncodedAudioFrameInfo
  ): void {
    AgoraConsole.warn(
      'AudioEncodedFrameObserver_onPlaybackAudioEncodedFrame_d930ddc not supported in this platform!'
    );
    this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }

  onMixedAudioEncodedFrame_d930ddc(
    frameBuffer: Uint8Array,
    length: number,
    audioEncodedFrameInfo: EncodedAudioFrameInfo
  ): void {
    AgoraConsole.warn(
      'AudioEncodedFrameObserver_onMixedAudioEncodedFrame_d930ddc not supported in this platform!'
    );
    this._engine.returnResult(false, -ERROR_CODE_TYPE.ERR_NOT_SUPPORTED);
  }
}
