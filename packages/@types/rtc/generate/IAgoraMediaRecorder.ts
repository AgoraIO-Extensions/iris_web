/// Generated by terra, DO NOT MODIFY BY HAND.

import { CallApiReturnType } from 'iris-web-core';

import {
  IMediaRecorderObserver,
  MediaRecorderConfiguration,
} from './AgoraMediaBase';

export interface IMediaRecorder {
  setMediaRecorderObserver?(
    callback: IMediaRecorderObserver
  ): CallApiReturnType;

  startRecording?(config: MediaRecorderConfiguration): CallApiReturnType;

  stopRecording?(): CallApiReturnType;
}
