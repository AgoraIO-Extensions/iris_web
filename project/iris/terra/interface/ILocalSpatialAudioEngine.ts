import { Action } from "../../tool/AgoraActionQueue";
import * as agorartc from '../rtc_types/Index';

export interface ILocalSpatialAudioEngine {
    putAction(action: Action);

    updateRemotePosition(uid: agorartc.uid_t, posInfo: agorartc.RemoteVoicePositionInfo): number;
    updateRemotePositionEx(uid: agorartc.uid_t, posInfo: agorartc.RemoteVoicePositionInfo, connection: agorartc.RtcConnection): number;
    removeRemotePosition(uid: agorartc.uid_t): number;
    removeRemotePositionEx(uid: agorartc.uid_t, connection: agorartc.RtcConnection): number;
    clearRemotePositions(): number;
    clearRemotePositionsEx(connection: agorartc.RtcConnection): number;
}