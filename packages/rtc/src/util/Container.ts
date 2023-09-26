import { UID } from 'agora-rtc-sdk-ng';

export type walkFun<T> = (channelId: string, uid: UID, t: T) => void;

export class Container<T> {
  private _container: Map<string, Map<UID, T>> = new Map();

  addT(channelId: string, uid: UID, t: T) {
    if (!this._container.has(channelId)) {
      this._container.set(channelId, new Map<UID, T>());
    }

    if (this._container.get(channelId).has(uid)) {
      console.debug('t already added!');
      console.debug('channelId: ' + channelId + ' uid: ' + uid);
    } else {
      this._container.get(channelId).set(uid, t);
    }
  }

  removeT(channelId: string, uid: UID) {
    if (this._container.has(channelId)) {
      if (this._container.get(channelId).has(uid)) {
        this._container.get(channelId).delete(uid);
      }
    }
  }

  removeTs(channelId: string) {
    if (this._container.has(channelId)) {
      this._container.delete(channelId);
    }
  }

  getT(channelId: string, uid: UID): T {
    return this._container.get(channelId)?.get(uid);
  }

  getTs(channelId: string): Map<UID, T> {
    return this._container.get(channelId);
  }

  walkT(cb: walkFun<T>) {
    for (let c of this._container) {
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
    for (let c of this._container) {
      let channelId = c[0];
      let map = c[1];
      for (let m of map) {
        let uid = m[0];
        let t = m[1];
        await cb(channelId, uid, t);
      }
    }
  }

  getContainer(): Map<string, Map<UID, T>> {
    return this._container;
  }
}
