import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import * as agorartc from './rtc_types/Index';
export interface IRtcEngine {

	//IMediaEngine
	registerAudioFrameObserver(observer: agorartc.IAudioFrameObserver): number;
	registerVideoFrameObserver(observer: agorartc.IVideoFrameObserver): number;
	registerVideoEncodedFrameObserver(observer: agorartc.IVideoEncodedFrameObserver): number;
	pushAudioFrame(type: agorartc.MEDIA_SOURCE_TYPE, frame: agorartc.AudioFrame, wrap: boolean, sourceId: number): number;
	pushCaptureAudioFrame(frame: agorartc.AudioFrame): number;
	pushReverseAudioFrame(frame: agorartc.AudioFrame): number;
	pushDirectAudioFrame(frame: agorartc.AudioFrame): number;
	pullAudioFrame(frame: agorartc.AudioFrame): number;
	setExternalVideoSource(enabled: boolean, useTexture: boolean, sourceType: agorartc.EXTERNAL_VIDEO_SOURCE_TYPE, encodedVideoOption: agorartc.SenderOptions): number;
	setExternalAudioSource(enabled: boolean, sampleRate: number, channels: number, sourceNumber: number, localPlayback: boolean, publish: boolean): number;
	setExternalAudioSink(enabled: boolean, sampleRate: number, channels: number): number;
	// enableCustomAudioLocalPlayback(sourceId: number, enabled: boolean): number;
	setDirectExternalAudioSource(enable: boolean, localPlayback: boolean): number;
	pushVideoFrame(frame: agorartc.ExternalVideoFrame, videoTrackId: number): number;
	pushEncodedVideoImage(imageBuffer: number, length: number, videoEncodedFrameInfo: agorartc.EncodedVideoFrameInfo, videoTrackId: number): number;
	// release(): void;

	//IVideoDeviceManager
	enumerateVideoDevices(): number;
	setDevice(deviceIdUTF8: string): number;
	getDevice(deviceIdUTF8: string): number;
	numberOfCapabilities(deviceIdUTF8: string): number;
	getCapability(deviceIdUTF8: string, deviceCapabilityNumber: number, capability: agorartc.VideoFormat): number;
	startDeviceTest(hwnd: agorartc.view_t): number;
	stopDeviceTest(): number;
	// release(): void;

	//IRtcEngine
	release(sync: boolean): void;
	initialize(context: agorartc.RtcEngineContext): number;
	queryInterface(iid: agorartc.INTERFACE_ID_TYPE, inter: void): number;
	getVersion(build: number): string;
	getErrorDescription(code: number): string;
	joinChannel(token: string, channelId: string, info: string, uid: agorartc.uid_t): number;
	joinChannel2(token: string, channelId: string, uid: agorartc.uid_t, options: agorartc.ChannelMediaOptions): number;
	updateChannelMediaOptions(options: agorartc.ChannelMediaOptions): number;
	leaveChannel(): number;
	leaveChannel2(options: agorartc.LeaveChannelOptions): number;
	renewToken(token: string): number;
	setChannelProfile(profile: agorartc.CHANNEL_PROFILE_TYPE): number;
	setClientRole(role: agorartc.CLIENT_ROLE_TYPE): number;
	setClientRole2(role: agorartc.CLIENT_ROLE_TYPE, options: agorartc.ClientRoleOptions): number;
	startEchoTest(): number;
	startEchoTest2(intervalInSeconds: number): number;
	startEchoTest3(config: agorartc.EchoTestConfiguration): number;
	stopEchoTest(): number;
	enableVideo(): number;
	disableVideo(): number;
	startPreview(): number;
	startPreview2(sourceType: agorartc.VIDEO_SOURCE_TYPE): number;
	stopPreview(): number;
	stopPreview2(sourceType: agorartc.VIDEO_SOURCE_TYPE): number;
	startLastmileProbeTest(config: agorartc.LastmileProbeConfig): number;
	stopLastmileProbeTest(): number;
	setVideoEncoderConfiguration(config: agorartc.VideoEncoderConfiguration): number;
	setBeautyEffectOptions(enabled: boolean, options: agorartc.BeautyOptions, type: agorartc.MEDIA_SOURCE_TYPE): number;
	setLowlightEnhanceOptions(enabled: boolean, options: agorartc.LowlightEnhanceOptions, type: agorartc.MEDIA_SOURCE_TYPE): number;
	setVideoDenoiserOptions(enabled: boolean, options: agorartc.VideoDenoiserOptions, type: agorartc.MEDIA_SOURCE_TYPE): number;
	setColorEnhanceOptions(enabled: boolean, options: agorartc.ColorEnhanceOptions, type: agorartc.MEDIA_SOURCE_TYPE): number;
	enableVirtualBackground(enabled: boolean, backgroundSource: agorartc.VirtualBackgroundSource, segproperty: agorartc.SegmentationProperty, type: agorartc.MEDIA_SOURCE_TYPE): number;
	enableRemoteSuperResolution(userId: agorartc.uid_t, enable: boolean): number;
	setupRemoteVideo(canvas: agorartc.VideoCanvas): number;
	setupLocalVideo(canvas: agorartc.VideoCanvas): number;
	enableAudio(): number;
	disableAudio(): number;
	setAudioProfile(profile: agorartc.AUDIO_PROFILE_TYPE, scenario: agorartc.AUDIO_SCENARIO_TYPE): number;
	setAudioProfile2(profile: agorartc.AUDIO_PROFILE_TYPE): number;
	setAudioScenario(scenario: agorartc.AUDIO_SCENARIO_TYPE): number;
	enableLocalAudio(enabled: boolean): number;
	muteLocalAudioStream(mute: boolean): number;
	muteAllRemoteAudioStreams(mute: boolean): number;
	setDefaultMuteAllRemoteAudioStreams(mute: boolean): number;
	muteRemoteAudioStream(uid: agorartc.uid_t, mute: boolean): number;
	muteLocalVideoStream(mute: boolean): number;
	enableLocalVideo(enabled: boolean): number;
	muteAllRemoteVideoStreams(mute: boolean): number;
	setDefaultMuteAllRemoteVideoStreams(mute: boolean): number;
	muteRemoteVideoStream(uid: agorartc.uid_t, mute: boolean): number;
	setRemoteVideoStreamType(uid: agorartc.uid_t, streamType: agorartc.VIDEO_STREAM_TYPE): number;
	setRemoteVideoSubscriptionOptions(uid: agorartc.uid_t, options: agorartc.VideoSubscriptionOptions): number;
	setRemoteDefaultVideoStreamType(streamType: agorartc.VIDEO_STREAM_TYPE): number;
	setSubscribeAudioBlacklist(uidList: agorartc.uid_t[], uidNumber: number): number;
	setSubscribeAudioWhitelist(uidList: agorartc.uid_t[], uidNumber: number): number;
	setSubscribeVideoBlacklist(uidList: agorartc.uid_t[], uidNumber: number): number;
	setSubscribeVideoWhitelist(uidList: agorartc.uid_t[], uidNumber: number): number;
	enableAudioVolumeIndication(interval: number, smooth: number, reportVad: boolean): number;
	startAudioRecording(filePath: string, quality: agorartc.AUDIO_RECORDING_QUALITY_TYPE): number;
	startAudioRecording2(filePath: string, sampleRate: number, quality: agorartc.AUDIO_RECORDING_QUALITY_TYPE): number;
	startAudioRecording3(config: agorartc.AudioRecordingConfiguration): number;
	registerAudioEncodedFrameObserver(config: agorartc.AudioEncodedFrameObserverConfig, observer: agorartc.IAudioEncodedFrameObserver): number;
	stopAudioRecording(): number;
	createMediaPlayer(): agorartc.IMediaPlayer;
	destroyMediaPlayer(media_player: agorartc.IMediaPlayer): number;
	startAudioMixing(filePath: string, loopback: boolean, replace: boolean, cycle: number): number;
	startAudioMixing2(filePath: string, loopback: boolean, replace: boolean, cycle: number, startPos: number): number;
	stopAudioMixing(): number;
	pauseAudioMixing(): number;
	resumeAudioMixing(): number;
	selectAudioTrack(index: number): number;
	getAudioTrackCount(): number;
	adjustAudioMixingVolume(volume: number): number;
	adjustAudioMixingPublishVolume(volume: number): number;
	getAudioMixingPublishVolume(): number;
	adjustAudioMixingPlayoutVolume(volume: number): number;
	getAudioMixingPlayoutVolume(): number;
	getAudioMixingDuration(): number;
	getAudioMixingCurrentPosition(): number;
	setAudioMixingPosition(pos: number): number;
	setAudioMixingDualMonoMode(mode: agorartc.AUDIO_MIXING_DUAL_MONO_MODE): number;
	setAudioMixingPitch(pitch: number): number;
	getEffectsVolume(): number;
	setEffectsVolume(volume: number): number;
	preloadEffect(soundId: number, filePath: string, startPos: number): number;
	playEffect(soundId: number, filePath: string, loopCount: number, pitch: number, pan: number, gain: number, publish: boolean, startPos: number): number;
	playAllEffects(loopCount: number, pitch: number, pan: number, gain: number, publish: boolean): number;
	getVolumeOfEffect(soundId: number): number;
	setVolumeOfEffect(soundId: number, volume: number): number;
	pauseEffect(soundId: number): number;
	pauseAllEffects(): number;
	resumeEffect(soundId: number): number;
	resumeAllEffects(): number;
	stopEffect(soundId: number): number;
	stopAllEffects(): number;
	unloadEffect(soundId: number): number;
	unloadAllEffects(): number;
	getEffectDuration(filePath: string): number;
	setEffectPosition(soundId: number, pos: number): number;
	getEffectCurrentPosition(soundId: number): number;
	enableSoundPositionIndication(enabled: boolean): number;
	setRemoteVoicePosition(uid: agorartc.uid_t, pan: number, gain: number): number;
	enableSpatialAudio(enabled: boolean): number;
	setRemoteUserSpatialAudioParams(uid: agorartc.uid_t, params: agorartc.SpatialAudioParams): number;
	setVoiceBeautifierPreset(preset: agorartc.VOICE_BEAUTIFIER_PRESET): number;
	setAudioEffectPreset(preset: agorartc.AUDIO_EFFECT_PRESET): number;
	setVoiceConversionPreset(preset: agorartc.VOICE_CONVERSION_PRESET): number;
	setAudioEffectParameters(preset: agorartc.AUDIO_EFFECT_PRESET, param1: number, param2: number): number;
	setVoiceBeautifierParameters(preset: agorartc.VOICE_BEAUTIFIER_PRESET, param1: number, param2: number): number;
	setVoiceConversionParameters(preset: agorartc.VOICE_CONVERSION_PRESET, param1: number, param2: number): number;
	setLocalVoicePitch(pitch: number): number;
	setLocalVoiceEqualization(bandFrequency: agorartc.AUDIO_EQUALIZATION_BAND_FREQUENCY, bandGain: number): number;
	setLocalVoiceReverb(reverbKey: agorartc.AUDIO_REVERB_TYPE, value: number): number;
	setLogFile(filePath: string): number;
	setLogFilter(filter: number): number;
	setLogLevel(level: agorartc.LOG_LEVEL): number;
	setLogFileSize(fileSizeInKBytes: number): number;
	uploadLogFile(requestId: string): number;
	setLocalRenderMode(renderMode: agorartc.RENDER_MODE_TYPE, mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE): number;
	setRemoteRenderMode(uid: agorartc.uid_t, renderMode: agorartc.RENDER_MODE_TYPE, mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE): number;
	setLocalRenderMode2(renderMode: agorartc.RENDER_MODE_TYPE): number;
	setLocalVideoMirrorMode(mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE): number;
	enableDualStreamMode(enabled: boolean): number;
	enableDualStreamMode2(sourceType: agorartc.VIDEO_SOURCE_TYPE, enabled: boolean): number;
	enableDualStreamMode3(sourceType: agorartc.VIDEO_SOURCE_TYPE, enabled: boolean, streamConfig: agorartc.SimulcastStreamConfig): number;
	setDualStreamMode(mode: agorartc.SIMULCAST_STREAM_MODE): number;
	setDualStreamMode2(sourceType: agorartc.VIDEO_SOURCE_TYPE, mode: agorartc.SIMULCAST_STREAM_MODE): number;
	setDualStreamMode3(sourceType: agorartc.VIDEO_SOURCE_TYPE, mode: agorartc.SIMULCAST_STREAM_MODE, streamConfig: agorartc.SimulcastStreamConfig): number;
	enableEchoCancellationExternal(enabled: boolean, audioSourceDelay: number): number;
	enableCustomAudioLocalPlayback(sourceId: number, enabled: boolean): number;
	startPrimaryCustomAudioTrack(config: agorartc.AudioTrackConfig): number;
	stopPrimaryCustomAudioTrack(): number;
	startSecondaryCustomAudioTrack(config: agorartc.AudioTrackConfig): number;
	stopSecondaryCustomAudioTrack(): number;
	setRecordingAudioFrameParameters(sampleRate: number, channel: number, mode: agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE, samplesPerCall: number): number;
	setPlaybackAudioFrameParameters(sampleRate: number, channel: number, mode: agorartc.RAW_AUDIO_FRAME_OP_MODE_TYPE, samplesPerCall: number): number;
	setMixedAudioFrameParameters(sampleRate: number, channel: number, samplesPerCall: number): number;
	setPlaybackAudioFrameBeforeMixingParameters(sampleRate: number, channel: number): number;
	enableAudioSpectrumMonitor(intervalInMS: number): number;
	disableAudioSpectrumMonitor(): number;
	registerAudioSpectrumObserver(observer: agorartc.IAudioSpectrumObserver): number;
	unregisterAudioSpectrumObserver(observer: agorartc.IAudioSpectrumObserver): number;
	adjustRecordingSignalVolume(volume: number): number;
	muteRecordingSignal(mute: boolean): number;
	adjustPlaybackSignalVolume(volume: number): number;
	adjustUserPlaybackSignalVolume(uid: number, volume: number): number;
	setLocalPublishFallbackOption(option: agorartc.STREAM_FALLBACK_OPTIONS): number;
	setRemoteSubscribeFallbackOption(option: agorartc.STREAM_FALLBACK_OPTIONS): number;
	enableLoopbackRecording(enabled: boolean, deviceName: string): number;
	adjustLoopbackSignalVolume(volume: number): number;
	getLoopbackRecordingVolume(): number;
	enableInEarMonitoring(enabled: boolean, includeAudioFilters: number): number;
	setInEarMonitoringVolume(volume: number): number;
	loadExtensionProvider(path: string): number;
	setExtensionProviderProperty(provider: string, key: string, value: string): number;
	enableExtension(provider: string, extension: string, enable: boolean, type: agorartc.MEDIA_SOURCE_TYPE): number;
	setExtensionProperty(provider: string, extension: string, key: string, value: string, type: agorartc.MEDIA_SOURCE_TYPE): number;
	getExtensionProperty(provider: string, extension: string, key: string, value: string, buf_len: number, type: agorartc.MEDIA_SOURCE_TYPE): number;
	setCameraCapturerConfiguration(config: agorartc.CameraCapturerConfiguration): number;
	createCustomVideoTrack(): agorartc.video_track_id_t;
	createCustomEncodedVideoTrack(sender_option: agorartc.SenderOptions): agorartc.video_track_id_t;
	destroyCustomVideoTrack(video_track_id: agorartc.video_track_id_t): number;
	destroyCustomEncodedVideoTrack(video_track_id: agorartc.video_track_id_t): number;
	switchCamera(): number;
	isCameraZoomSupported(): boolean;
	isCameraFaceDetectSupported(): boolean;
	isCameraTorchSupported(): boolean;
	isCameraFocusSupported(): boolean;
	isCameraAutoFocusFaceModeSupported(): boolean;
	setCameraZoomFactor(factor: number): number;
	enableFaceDetection(enabled: boolean): number;
	getCameraMaxZoomFactor(): number;
	setCameraFocusPositionInPreview(positionX: number, positionY: number): number;
	setCameraTorchOn(isOn: boolean): number;
	setCameraAutoFocusFaceModeEnabled(enabled: boolean): number;
	isCameraExposurePositionSupported(): boolean;
	setCameraExposurePosition(positionXinView: number, positionYinView: number): number;
	isCameraAutoExposureFaceModeSupported(): boolean;
	setCameraAutoExposureFaceModeEnabled(enabled: boolean): number;
	setDefaultAudioRouteToSpeakerphone(defaultToSpeaker: boolean): number;
	setEnableSpeakerphone(speakerOn: boolean): number;
	isSpeakerphoneEnabled(): boolean;
	getScreenCaptureSources(thumbSize: agorartc.VideoDimensions, iconSize: agorartc.VideoDimensions, includeScreen: boolean): agorartc.IScreenCaptureSourceList[];
	setAudioSessionOperationRestriction(restriction: agorartc.AUDIO_SESSION_OPERATION_RESTRICTION): number;
	startScreenCaptureByDisplayId(displayId: number, regionRect: agorartc.Rectangle, captureParams: agorartc.ScreenCaptureParameters): number;
	startScreenCaptureByScreenRect(screenRect: agorartc.Rectangle, regionRect: agorartc.Rectangle, captureParams: agorartc.ScreenCaptureParameters): number;
	getAudioDeviceInfo(deviceInfo: agorartc.DeviceInfo): number;
	startScreenCaptureByWindowId(windowId: agorartc.view_t, regionRect: agorartc.Rectangle, captureParams: agorartc.ScreenCaptureParameters): number;
	setScreenCaptureContentHint(contentHint: agorartc.VIDEO_CONTENT_HINT): number;
	setScreenCaptureScenario(screenScenario: agorartc.SCREEN_SCENARIO_TYPE): number;
	updateScreenCaptureRegion(regionRect: agorartc.Rectangle): number;
	updateScreenCaptureParameters(captureParams: agorartc.ScreenCaptureParameters): number;
	startScreenCapture(captureParams: agorartc.ScreenCaptureParameters2): number;
	updateScreenCapture(captureParams: agorartc.ScreenCaptureParameters2): number;
	stopScreenCapture(): number;
	getCallId(callId: string): number;
	rate(callId: string, rating: number, description: string): number;
	complain(callId: string, description: string): number;
	startRtmpStreamWithoutTranscoding(url: string): number;
	startRtmpStreamWithTranscoding(url: string, transcoding: agorartc.LiveTranscoding): number;
	updateRtmpTranscoding(transcoding: agorartc.LiveTranscoding): number;
	stopRtmpStream(url: string): number;
	startLocalVideoTranscoder(config: agorartc.LocalTranscoderConfiguration): number;
	updateLocalTranscoderConfiguration(config: agorartc.LocalTranscoderConfiguration): number;
	stopLocalVideoTranscoder(): number;
	startPrimaryCameraCapture(config: agorartc.CameraCapturerConfiguration): number;
	startSecondaryCameraCapture(config: agorartc.CameraCapturerConfiguration): number;
	stopPrimaryCameraCapture(): number;
	stopSecondaryCameraCapture(): number;
	setCameraDeviceOrientation(type: agorartc.VIDEO_SOURCE_TYPE, orientation: agorartc.VIDEO_ORIENTATION): number;
	setScreenCaptureOrientation(type: agorartc.VIDEO_SOURCE_TYPE, orientation: agorartc.VIDEO_ORIENTATION): number;
	startPrimaryScreenCapture(config: agorartc.ScreenCaptureConfiguration): number;
	startSecondaryScreenCapture(config: agorartc.ScreenCaptureConfiguration): number;
	stopPrimaryScreenCapture(): number;
	stopSecondaryScreenCapture(): number;
	getConnectionState(): agorartc.CONNECTION_STATE_TYPE;
	// registerEventHandler(eventHandler: agorartc.IRtcEngineEventHandler[]): boolean;
	// unregisterEventHandler(eventHandler: agorartc.IRtcEngineEventHandler[]): boolean;
	setRemoteUserPriority(uid: agorartc.uid_t, userPriority: agorartc.PRIORITY_TYPE): number;
	registerPacketObserver(observer: agorartc.IPacketObserver): number;
	setEncryptionMode(encryptionMode: string): number;
	setEncryptionSecret(secret: string): number;
	enableEncryption(enabled: boolean, config: agorartc.EncryptionConfig): number;
	createDataStream(streamId: number, reliable: boolean, ordered: boolean): number;
	createDataStream2(streamId: number, config: agorartc.DataStreamConfig): number;
	sendStreamMessage(streamId: number, data: string, length: number): number;
	addVideoWatermark(watermark: agorartc.RtcImage): number;
	addVideoWatermark2(watermarkUrl: string, options: agorartc.WatermarkOptions): number;
	clearVideoWatermark(): number;
	clearVideoWatermarks(): number;
	addInjectStreamUrl(url: string, config: agorartc.InjectStreamConfig): number;
	removeInjectStreamUrl(url: string): number;
	pauseAudio(): number;
	resumeAudio(): number;
	enableWebSdkInteroperability(enabled: boolean): number;
	sendCustomReportMessage(id: string, category: string, event: string, label: string, value: number): number;
	registerMediaMetadataObserver(observer: agorartc.IMetadataObserver, type: agorartc.METADATA_TYPE): number;
	unregisterMediaMetadataObserver(observer: agorartc.IMetadataObserver, type: agorartc.METADATA_TYPE): number;
	startAudioFrameDump(channel_id: string, user_id: agorartc.uid_t, location: string, uuid: string, passwd: string, duration_ms: number, auto_upload: boolean): number;
	stopAudioFrameDump(channel_id: string, user_id: agorartc.uid_t, location: string): number;
	registerLocalUserAccount(appId: string, userAccount: string): number;
	joinChannelWithUserAccount(token: string, channelId: string, userAccount: string): number;
	joinChannelWithUserAccount2(token: string, channelId: string, userAccount: string, options: agorartc.ChannelMediaOptions): number;
	joinChannelWithUserAccountEx(token: string, channelId: string, userAccount: string, options: agorartc.ChannelMediaOptions, eventHandler: agorartc.IRtcEngineEventHandler): number;
	getUserInfoByUserAccount(userAccount: string, userInfo: agorartc.UserInfo[]): number;
	getUserInfoByUid(uid: agorartc.uid_t, userInfo: agorartc.UserInfo[]): number;
	startChannelMediaRelay(configuration: agorartc.ChannelMediaRelayConfiguration): number;
	updateChannelMediaRelay(configuration: agorartc.ChannelMediaRelayConfiguration): number;
	stopChannelMediaRelay(): number;
	pauseAllChannelMediaRelay(): number;
	resumeAllChannelMediaRelay(): number;
	setDirectCdnStreamingAudioConfiguration(profile: agorartc.AUDIO_PROFILE_TYPE): number;
	setDirectCdnStreamingVideoConfiguration(config: agorartc.VideoEncoderConfiguration): number;
	startDirectCdnStreaming(eventHandler: agorartc.IDirectCdnStreamingEventHandler, publishUrl: string, options: agorartc.DirectCdnStreamingMediaOptions): number;
	stopDirectCdnStreaming(): number;
	updateDirectCdnStreamingMediaOptions(options: agorartc.DirectCdnStreamingMediaOptions): number;
	startRhythmPlayer(sound1: string, sound2: string, config: agorartc.AgoraRhythmPlayerConfig): number;
	stopRhythmPlayer(): number;
	configRhythmPlayer(config: agorartc.AgoraRhythmPlayerConfig): number;
	takeSnapshot(uid: agorartc.uid_t, filePath: string): number;
	enableContentInspect(enabled: boolean, config: agorartc.ContentInspectConfig): number;
	adjustCustomAudioPublishVolume(sourceId: number, volume: number): number;
	adjustCustomAudioPlayoutVolume(sourceId: number, volume: number): number;
	setCloudProxy(proxyType: agorartc.CLOUD_PROXY_TYPE): number;
	setLocalAccessPoint(config: agorartc.LocalAccessPointConfiguration): number;
	enableFishEyeCorrection(enabled: boolean, params: agorartc.FishEyeCorrectionParams): number;
	setAdvancedAudioOptions(options: agorartc.AdvancedAudioOptions): number;
	setAVSyncSource(channelId: string, uid: agorartc.uid_t): number;
	enableVideoImageSource(enable: boolean, options: agorartc.ImageTrackOptions): number;
	enableWirelessAccelerate(enabled: boolean): number;

	//IRtcEngineEx
	joinChannelEx(token: string, connection: agorartc.RtcConnection, options: agorartc.ChannelMediaOptions, eventHandler: agorartc.IRtcEngineEventHandler[]): number;
	leaveChannelEx(connection: agorartc.RtcConnection): number;
	updateChannelMediaOptionsEx(options: agorartc.ChannelMediaOptions, connection: agorartc.RtcConnection): number;
	setVideoEncoderConfigurationEx(config: agorartc.VideoEncoderConfiguration, connection: agorartc.RtcConnection): number;
	setupRemoteVideoEx(canvas: agorartc.VideoCanvas, connection: agorartc.RtcConnection): number;
	muteRemoteAudioStreamEx(uid: agorartc.uid_t, mute: boolean, connection: agorartc.RtcConnection): number;
	muteRemoteVideoStreamEx(uid: agorartc.uid_t, mute: boolean, connection: agorartc.RtcConnection): number;
	setRemoteVideoStreamTypeEx(uid: agorartc.uid_t, streamType: agorartc.VIDEO_STREAM_TYPE, connection: agorartc.RtcConnection): number;
	setSubscribeAudioBlacklistEx(uidList: agorartc.uid_t[], uidNumber: number, connection: agorartc.RtcConnection): number;
	setSubscribeAudioWhitelistEx(uidList: agorartc.uid_t[], uidNumber: number, connection: agorartc.RtcConnection): number;
	setSubscribeVideoBlacklistEx(uidList: agorartc.uid_t[], uidNumber: number, connection: agorartc.RtcConnection): number;
	setSubscribeVideoWhitelistEx(uidList: agorartc.uid_t[], uidNumber: number, connection: agorartc.RtcConnection): number;
	setRemoteVideoSubscriptionOptionsEx(uid: agorartc.uid_t, options: agorartc.VideoSubscriptionOptions, connection: agorartc.RtcConnection): number;
	setRemoteVoicePositionEx(uid: agorartc.uid_t, pan: number, gain: number, connection: agorartc.RtcConnection): number;
	setRemoteUserSpatialAudioParamsEx(uid: agorartc.uid_t, params: agorartc.SpatialAudioParams, connection: agorartc.RtcConnection): number;
	setRemoteRenderModeEx(uid: agorartc.uid_t, renderMode: agorartc.RENDER_MODE_TYPE, mirrorMode: agorartc.VIDEO_MIRROR_MODE_TYPE, connection: agorartc.RtcConnection): number;
	enableLoopbackRecordingEx(connection: agorartc.RtcConnection, enabled: boolean, deviceName: string): number;
	getConnectionStateEx(connection: agorartc.RtcConnection): agorartc.CONNECTION_STATE_TYPE;
	enableEncryptionEx(connection: agorartc.RtcConnection, enabled: boolean, config: agorartc.EncryptionConfig): number;
	createDataStreamEx(streamId: number, reliable: boolean, ordered: boolean, connection: agorartc.RtcConnection): number;
	createDataStreamEx2(streamId: number, config: agorartc.DataStreamConfig, connection: agorartc.RtcConnection): number;
	sendStreamMessageEx(streamId: number, data: string, length: number, connection: agorartc.RtcConnection): number;
	addVideoWatermarkEx(watermarkUrl: string, options: agorartc.WatermarkOptions, connection: agorartc.RtcConnection): number;
	clearVideoWatermarkEx(connection: agorartc.RtcConnection): number;
	sendCustomReportMessageEx(id: string, category: string, event: string, label: string, value: number, connection: agorartc.RtcConnection): number;
	enableAudioVolumeIndicationEx(interval: number, smooth: number, reportVad: boolean, connection: agorartc.RtcConnection): number;
	getUserInfoByUserAccountEx(userAccount: string, userInfo: agorartc.UserInfo[], connection: agorartc.RtcConnection): number;
	getUserInfoByUidEx(uid: agorartc.uid_t, userInfo: agorartc.UserInfo[], connection: agorartc.RtcConnection): number;
	setVideoProfileEx(width: number, height: number, frameRate: number, bitrate: number): number;
	enableDualStreamModeEx(sourceType: agorartc.VIDEO_SOURCE_TYPE, enabled: boolean, streamConfig: agorartc.SimulcastStreamConfig, connection: agorartc.RtcConnection): number;
	setDualStreamModeEx(sourceType: agorartc.VIDEO_SOURCE_TYPE, mode: agorartc.SIMULCAST_STREAM_MODE, streamConfig: agorartc.SimulcastStreamConfig, connection: agorartc.RtcConnection): number;
	// enableWirelessAccelerate(enabled: boolean): number;
	takeSnapshotEx(connection: agorartc.RtcConnection, uid: agorartc.uid_t, filePath: string): number;

	//ILocalSpatialAudioEngine
	// initialize(config: agorartc.LocalSpatialAudioConfig): number;
	updateRemotePosition(uid: agorartc.uid_t, posInfo: agorartc.RemoteVoicePositionInfo): number;
	updateRemotePositionEx(uid: agorartc.uid_t, posInfo: agorartc.RemoteVoicePositionInfo, connection: agorartc.RtcConnection): number;
	removeRemotePosition(uid: agorartc.uid_t): number;
	removeRemotePositionEx(uid: agorartc.uid_t, connection: agorartc.RtcConnection): number;
	clearRemotePositions(): number;
	clearRemotePositionsEx(connection: agorartc.RtcConnection): number;

	//IAudioDeviceManager
	enumeratePlaybackDevices(): agorartc.IAudioDeviceCollection;
	enumerateRecordingDevices(): agorartc.IAudioDeviceCollection;
	setPlaybackDevice(deviceId: string): number;
	getPlaybackDevice(deviceId: string): number;
	getPlaybackDeviceInfo(deviceId: string, deviceName: string): number;
	setPlaybackDeviceVolume(volume: number): number;
	getPlaybackDeviceVolume(volume: number): number;
	setRecordingDevice(deviceId: string): number;
	getRecordingDevice(deviceId: string): number;
	getRecordingDeviceInfo(deviceId: string, deviceName: string): number;
	setRecordingDeviceVolume(volume: number): number;
	getRecordingDeviceVolume(volume: number): number;
	setPlaybackDeviceMute(mute: boolean): number;
	getPlaybackDeviceMute(mute: boolean): number;
	setRecordingDeviceMute(mute: boolean): number;
	getRecordingDeviceMute(mute: boolean): number;
	startPlaybackDeviceTest(testAudioFilePath: string): number;
	stopPlaybackDeviceTest(): number;
	startRecordingDeviceTest(indicationInterval: number): number;
	stopRecordingDeviceTest(): number;
	startAudioDeviceLoopbackTest(indicationInterval: number): number;
	stopAudioDeviceLoopbackTest(): number;
	followSystemPlaybackDevice(enable: boolean): number;
	followSystemRecordingDevice(enable: boolean): number;
	// release(): void;

}
