import { IAgoraRTCClient, UID } from "agora-rtc-sdk-ng";


export class IrisContaniner<T> {

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

    public clear() {
        //todo 
    }

}