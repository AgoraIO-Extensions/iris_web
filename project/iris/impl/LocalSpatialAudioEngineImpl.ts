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