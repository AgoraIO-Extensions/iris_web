import { Action } from "../../util/AgoraActionQueue";
import * as agorartc from '../rtc_types/Index';

export interface ILocalSpatialAudioEngine {
    putAction(action: Action);

    setMaxAudioRecvCount(maxCount: number): number;
    setAudioRecvRange(range: number): number;
    setDistanceUnit(unit: number): number;
    updateSelfPosition(position: number[], axisForward: number[], axisRight: number[], axisUp: number[]): number;
    updateSelfPositionEx(position: number[], axisForward: number[], axisRight: number[], axisUp: number[], connection: agorartc.RtcConnection): number;
    updatePlayerPositionInfo(playerId: number, positionInfo: agorartc.RemoteVoicePositionInfo): number;
    setParameters(params: string): number;
    muteLocalAudioStream(mute: boolean): number;
    muteAllRemoteAudioStreams(mute: boolean): number;
    updateRemotePosition(uid: agorartc.uid_t, posInfo: agorartc.RemoteVoicePositionInfo): number;
    updateRemotePositionEx(uid: agorartc.uid_t, posInfo: agorartc.RemoteVoicePositionInfo, connection: agorartc.RtcConnection): number;
    removeRemotePosition(uid: agorartc.uid_t): number;
    removeRemotePositionEx(uid: agorartc.uid_t, connection: agorartc.RtcConnection): number;
    clearRemotePositions(): number;
    clearRemotePositionsEx(connection: agorartc.RtcConnection): number;
}