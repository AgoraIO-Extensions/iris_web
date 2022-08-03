
import { UID } from 'agora-rtc-sdk-ng';
import * as agorartc from '../terra/rtc_types/Index';
import { Contaniner } from '../tool/Contanier';
//Record the intermediate status of the Main client
export class IrisSubClientVariables {

    //ChannelMediaOptions
    channelMediaOptions: Contaniner<agorartc.ChannelMediaOptions> = new Contaniner<agorartc.ChannelMediaOptions>();

    //返回值为合并后万好着呢个版本的ChannelMediaOptions
    mergeChannelMediaOptions(connection: agorartc.RtcConnection, options: agorartc.ChannelMediaOptions): agorartc.ChannelMediaOptions {
        let channelMediaOptions: agorartc.ChannelMediaOptions = this.channelMediaOptions.getT(connection.channelId, connection.localUid);
        if (channelMediaOptions == null) {
            channelMediaOptions = {};
            this.channelMediaOptions.addT(connection.channelId, connection.localUid, channelMediaOptions);
        }

        for (let key in options) {
            channelMediaOptions[key] = options[key];
        }

        return channelMediaOptions;
    }

    enabledAudioVolumeIndications: Contaniner<{ interval: number, smooth: number, reportVad: boolean }> = new Contaniner<{ interval: number, smooth: number, reportVad: boolean }>();
    //C++ AdjustUserPlaybackSignalVolume
    //each user playback signal volume
    playbackSignalVolumes: Map<UID, number> = new Map<UID, number>();

    //mute 远端用户流
    mutedRemoteAudioStreams: Contaniner<Map<UID, boolean>> = new Contaniner<Map<UID, boolean>>();
    mutedRemoteVideoStreams: Contaniner<Map<UID, boolean>> = new Contaniner<Map<UID, boolean>>();

    //SetVideoEncoderConfigurationEx
    videoEncoderConfigurations: Contaniner<agorartc.VideoEncoderConfiguration> = new Contaniner<agorartc.VideoEncoderConfiguration>();

    //子账户设置开启大小流
    enabledDualStreamModes: Contaniner<Map<agorartc.VIDEO_SOURCE_TYPE, { enabled: boolean, streamConfig?: agorartc.SimulcastStreamConfig }>> = new Contaniner<Map<agorartc.VIDEO_SOURCE_TYPE, { enabled: boolean, streamConfig?: agorartc.SimulcastStreamConfig }>>();
    //子账户设置接收大小流
    remoteVideoStreamTypes: Contaniner<Map<UID, agorartc.VIDEO_STREAM_TYPE>> = new Contaniner<Map<UID, agorartc.VIDEO_STREAM_TYPE>>();

    //加密
    encryptionConfigs: Contaniner<{ enabled: boolean; config: agorartc.EncryptionConfig }> = new Contaniner<{ enabled: boolean; config: agorartc.EncryptionConfig }>();
}