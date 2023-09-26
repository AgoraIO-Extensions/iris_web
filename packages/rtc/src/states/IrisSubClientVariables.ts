import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { UID } from 'agora-rtc-sdk-ng';

import { Container } from '../util/Container';
//Record the intermediate status of the Main client
export class IrisSubClientVariables {
  //ChannelMediaOptions
  channelMediaOptions: Container<
    NATIVE_RTC.ChannelMediaOptions
  > = new Container<NATIVE_RTC.ChannelMediaOptions>();

  //返回值为合并后万好着呢个版本的ChannelMediaOptions
  mergeChannelMediaOptions(
    connection: NATIVE_RTC.RtcConnection,
    options: NATIVE_RTC.ChannelMediaOptions
  ): NATIVE_RTC.ChannelMediaOptions {
    let channelMediaOptions: NATIVE_RTC.ChannelMediaOptions = this.channelMediaOptions.getT(
      connection.channelId,
      connection.localUid
    );
    if (channelMediaOptions == null) {
      channelMediaOptions = {};
      this.channelMediaOptions.addT(
        connection.channelId,
        connection.localUid,
        channelMediaOptions
      );
    }

    for (let key in options) {
      channelMediaOptions[key] = options[key];
    }

    return channelMediaOptions;
  }

  enabledAudioVolumeIndications: Container<{
    interval: number;
    smooth: number;
    reportVad: boolean;
  }> = new Container<{
    interval: number;
    smooth: number;
    reportVad: boolean;
  }>();
  //C++ AdjustUserPlaybackSignalVolume
  //each user playback signal volume
  playbackSignalVolumes: Map<UID, number> = new Map<UID, number>();

  //mute 远端用户流
  mutedRemoteAudioStreams: Container<Map<UID, boolean>> = new Container<
    Map<UID, boolean>
  >();
  mutedRemoteVideoStreams: Container<Map<UID, boolean>> = new Container<
    Map<UID, boolean>
  >();

  //SetVideoEncoderConfigurationEx
  videoEncoderConfigurations: Container<
    NATIVE_RTC.VideoEncoderConfiguration
  > = new Container<NATIVE_RTC.VideoEncoderConfiguration>();

  //子账户设置开启大小流
  enabledDualStreamModes: Container<
    Map<
      NATIVE_RTC.VIDEO_SOURCE_TYPE,
      { enabled: boolean; streamConfig?: NATIVE_RTC.SimulcastStreamConfig }
    >
  > = new Container<
    Map<
      NATIVE_RTC.VIDEO_SOURCE_TYPE,
      { enabled: boolean; streamConfig?: NATIVE_RTC.SimulcastStreamConfig }
    >
  >();
  //子账户设置接收大小流
  remoteVideoStreamTypes: Container<
    Map<UID, NATIVE_RTC.VIDEO_STREAM_TYPE>
  > = new Container<Map<UID, NATIVE_RTC.VIDEO_STREAM_TYPE>>();

  //加密
  encryptionConfigs: Container<{
    enabled: boolean;
    config: NATIVE_RTC.EncryptionConfig;
  }> = new Container<{
    enabled: boolean;
    config: NATIVE_RTC.EncryptionConfig;
  }>();
}
