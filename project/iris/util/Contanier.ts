import { IAgoraRTCClient, UID } from "agora-rtc-sdk-ng";

export type walkFun<T> = (channelId: string, uid: UID, t: T) => void;

// export type walkFunAsync<T> = (channelId: string, uid: UID, t: T) => void async;

export class Contaniner<T> {

    private _contaniner: Map<string, Map<UID, T>> = new Map();

    addT(channelId: string, uid: UID, t: T) {
        if (!this._contaniner.has(channelId)) {
            this._contaniner.set(channelId, new Map<UID, T>());
        }

        if (this._contaniner.get(channelId).has(uid)) {
            console.debug("t already added!");
            console.debug("channelId: " + channelId + " uid: " + uid);
        }
        else {
            this._contaniner.get(channelId).set(uid, t);
        }
    }

    removeT(channelId: string, uid: UID) {
        if (this._contaniner.has(channelId)) {
            if (this._contaniner.get(channelId).has(uid)) {
                this._contaniner.get(channelId).delete(uid);
            }
        }
    }

    removeTs(channelId: string) {
        if (this._contaniner.has(channelId)) {
            this._contaniner.delete(channelId);
        }
    }

    getT(channelId: string, uid: UID): T {
        return this._contaniner.get(channelId)?.get(uid);
    }

    getTs(channelId: string): Map<UID, T> {
        return this._contaniner.get(channelId);
    }

    walkT(cb: walkFun<T>) {
        for (let c of this._contaniner) {
            let channelId = c[0];
            let map = c[1];
            for (let m of map) {
                let uid = m[0];
                let t = m[1];
                cb(channelId, uid, t);
            }
        }
    }

    async walkTAsync(cb: walkFun<T>) {
        for (let c of this._contaniner) {
            let channelId = c[0];
            let map = c[1];
            for (let m of map) {
                let uid = m[0];
                let t = m[1];
                await cb(channelId, uid, t);
            }
        }
    }



    getContaniner(): Map<string, Map<UID, T>> {
        return this._contaniner;
    }

}