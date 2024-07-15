import * as NATIVE_RTC from '@iris/native-rtc';

export const defaultLeaveChannelOptions: NATIVE_RTC.LeaveChannelOptions = {
  stopAudioMixing: true,
  stopAllEffect: true,
  stopMicrophoneRecording: true,
};
