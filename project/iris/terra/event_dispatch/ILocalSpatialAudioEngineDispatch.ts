import { IrisRtcEngine } from "../../engine/IrisRtcEngine";
import { LocalSpatialAudioEngineImpl } from "../../impl/LocalSpatialAudioEngineImpl";
import { Action } from "../../tool/AgoraActionQueue";
import { ILocalSpatialAudioEngine } from "../interface/ILocalSpatialAudioEngine";
import * as agorartc from '../rtc_types/Index';

export class ILocalSpatialAudioEngineDispatch {

    private _impl: ILocalSpatialAudioEngine;

    constructor(engine: IrisRtcEngine) {
        this._impl = new LocalSpatialAudioEngineImpl(engine);
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