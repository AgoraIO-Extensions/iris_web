import { IrisRtcEngine } from "../../engine/IrisRtcEngine";
import { LocalSpatialAudioEngineImpl } from "../../impl/LocalSpatialAudioEngineImpl";
import { Action } from "../../util/AgoraActionQueue";
import { ILocalSpatialAudioEngine } from "../interface/ILocalSpatialAudioEngine";
import * as agorartc from '../rtc_types/Index';

export class ILocalSpatialAudioEngineDispatch {

    private _impl: ILocalSpatialAudioEngine;

    constructor(engine: IrisRtcEngine) {
        this._impl = new LocalSpatialAudioEngineImpl(engine);
    }

    setMaxAudioRecvCount(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let maxCount = obj.maxCount;
        if (maxCount === undefined) throw "maxCount is undefined";
        result.result = this._impl.setMaxAudioRecvCount(maxCount);
        return 0;
    }

    setAudioRecvRange(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let range = obj.range;
        if (range === undefined) throw "range is undefined";
        result.result = this._impl.setAudioRecvRange(range);
        return 0;
    }

    setDistanceUnit(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let unit = obj.unit;
        if (unit === undefined) throw "unit is undefined";
        result.result = this._impl.setDistanceUnit(unit);
        return 0;
    }

    updateSelfPosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let position = obj.position;
        if (position === undefined) throw "position is undefined";
        let axisForward = obj.axisForward;
        if (axisForward === undefined) throw "axisForward is undefined";
        let axisRight = obj.axisRight;
        if (axisRight === undefined) throw "axisRight is undefined";
        let axisUp = obj.axisUp;
        if (axisUp === undefined) throw "axisUp is undefined";
        result.result = this._impl.updateSelfPosition(position, axisForward, axisRight, axisUp);
        return 0;
    }

    updateSelfPositionEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let position = obj.position;
        if (position === undefined) throw "position is undefined";
        let axisForward = obj.axisForward;
        if (axisForward === undefined) throw "axisForward is undefined";
        let axisRight = obj.axisRight;
        if (axisRight === undefined) throw "axisRight is undefined";
        let axisUp = obj.axisUp;
        if (axisUp === undefined) throw "axisUp is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.updateSelfPositionEx(position, axisForward, axisRight, axisUp, connection);
        return 0;
    }

    updatePlayerPositionInfo(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let playerId = obj.playerId;
        if (playerId === undefined) throw "playerId is undefined";
        let positionInfo = obj.positionInfo;
        if (positionInfo === undefined) throw "positionInfo is undefined";
        result.result = this._impl.updatePlayerPositionInfo(playerId, positionInfo);
        return 0;
    }

    setParameters(
        params1: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params1) as any;
        let params = obj.params;
        if (params === undefined) throw "params is undefined";
        result.result = this._impl.setParameters(params);
        return 0;
    }

    muteLocalAudioStream(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.muteLocalAudioStream(mute);
        return 0;
    }

    muteAllRemoteAudioStreams(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let mute = obj.mute;
        if (mute === undefined) throw "mute is undefined";
        result.result = this._impl.muteAllRemoteAudioStreams(mute);
        return 0;
    }

    updateRemotePosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let posInfo = obj.posInfo;
        if (posInfo === undefined) throw "posInfo is undefined";
        result.result = this._impl.updateRemotePosition(uid, posInfo);
        return 0;
    }

    updateRemotePositionEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let posInfo = obj.posInfo;
        if (posInfo === undefined) throw "posInfo is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.updateRemotePositionEx(uid, posInfo, connection);
        return 0;
    }

    removeRemotePosition(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        result.result = this._impl.removeRemotePosition(uid);
        return 0;
    }

    removeRemotePositionEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let uid = obj.uid;
        if (uid === undefined) throw "uid is undefined";
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.removeRemotePositionEx(uid, connection);
        return 0;
    }

    clearRemotePositions(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        result.result = this._impl.clearRemotePositions();
        return 0;
    }

    clearRemotePositionsEx(
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {
        let obj = JSON.parse(params) as any;
        let connection = obj.connection;
        if (connection === undefined) throw "connection is undefined";
        result.result = this._impl.clearRemotePositionsEx(connection);
        return 0;
    }



}