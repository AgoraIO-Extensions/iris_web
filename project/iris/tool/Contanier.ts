import { IAgoraRTCClient, UID } from "agora-rtc-sdk-ng";

export type walkFun<T> = (channelId: string, uid: UID, t: T) => void;

export class Contaniner<T> {

    private _contaniner: Map<string, Map<UID, T>> = new Map();

    addT(channelId: string, uid: UID, t: T) {
        if (!this._contaniner[channelId]) {
            this._contaniner[channelId] = new Map<UID, T>();
        }

        if (this._contaniner[channelId][uid] != null) {
            console.debug("t already added!");
            console.debug("channelId: " + channelId + " uid: " + uid);
        }
        else {
            this._contaniner[channelId][uid] = t;
        }
    }

    removeT(channelId: string, uid: UID) {
        if (this._contaniner[channelId] != null) {
            if (this._contaniner[channelId][uid] != null) {
                this._contaniner[channelId].delete(uid);
            }
        }
    }

    getT(channelId: string, uid: UID): T {
        return this._contaniner[channelId]?.[uid];
    }

    getTs(channelId: string): Map<UID, T> {
        return this._contaniner[channelId];
    }

    walkT(cb: walkFun<T>) {
        this._contaniner.forEach((map: Map<UID, T>, channelId: string) => {
            map.forEach((t: T, uid: UID) => {
                cb(channelId, uid, t);
            });
        })
    }

    getContaniner(): Map<string, Map<UID, T>> {
        return this._contaniner;
    }



}