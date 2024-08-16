import * as NATIVE_RTC from '@iris/native-rtc';
import { VideoPlayerConfig } from 'agora-rtc-sdk-ng';

export const defaultLeaveChannelOptions: NATIVE_RTC.LeaveChannelOptions = {
  stopAudioMixing: true,
  stopAllEffect: true,
  stopMicrophoneRecording: true,
};

export const defaultVideoPlayerConfig: VideoPlayerConfig = {
  fit: 'cover',
  mirror: false,
};
