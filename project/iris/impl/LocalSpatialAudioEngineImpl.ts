import { IrisRtcEngine } from "../engine/IrisRtcEngine";
import { ILocalSpatialAudioEngine } from "../terra/interface/ILocalSpatialAudioEngine";
import { Action } from "../tool/AgoraActionQueue";
import { AgoraConsole } from "../tool/AgoraConsole";
import * as agorartc from "../terra/rtc_types/Index";

export class LocalSpatialAudioEngineImpl implements ILocalSpatialAudioEngine {
    private _engine: IrisRtcEngine;

    public constructor(engine: IrisRtcEngine) {
        this._engine = engine;
    }


    putAction(action: Action) {
        this._engine.actionQueue.putAction(action);
    }

    setMaxAudioRecvCount(maxCount: number): number {
        AgoraConsole.warn("setMaxAudioRecvCount not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setAudioRecvRange(range: number): number {
        AgoraConsole.warn("setAudioRecvRange not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setDistanceUnit(unit: number): number {
        AgoraConsole.warn("setDistanceUnit not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updateSelfPosition(position: number[], axisForward: number[], axisRight: number[], axisUp: number[]): number {
        AgoraConsole.warn("updateSelfPosition not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updateSelfPositionEx(position: number[], axisForward: number[], axisRight: number[], axisUp: number[], connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("updateSelfPositionEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    updatePlayerPositionInfo(playerId: number, positionInfo: agorartc.RemoteVoicePositionInfo): number {
        AgoraConsole.warn("updatePlayerPositionInfo not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    setParameters(params: string): number {
        AgoraConsole.warn("setParameters not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    muteLocalAudioStream(mute: boolean): number {
        AgoraConsole.warn("muteLocalAudioStream not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
    muteAllRemoteAudioStreams(mute: boolean): number {
        AgoraConsole.warn("muteAllRemoteAudioStreams not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    updateRemotePosition(uid: number, posInfo: agorartc.RemoteVoicePositionInfo): number {
        AgoraConsole.warn("updateRemotePosition not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    updateRemotePositionEx(uid: number, posInfo: agorartc.RemoteVoicePositionInfo, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("updateRemotePositionEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    removeRemotePosition(uid: number): number {
        AgoraConsole.warn("removeRemotePosition not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    removeRemotePositionEx(uid: number, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("removeRemotePositionEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    clearRemotePositions(): number {
        AgoraConsole.warn("clearRemotePositions not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    clearRemotePositionsEx(connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("clearRemotePositionsEx not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
}