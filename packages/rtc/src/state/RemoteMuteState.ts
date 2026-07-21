export class RemoteMuteState {
  private defaultMuted: boolean = false;
  private uidOverrides: Map<number, boolean> = new Map<number, boolean>();

  isMuted(uid: number): boolean {
    return this.uidOverrides.get(uid) ?? this.defaultMuted;
  }

  setUidMuted(uid: number, muted: boolean): void {
    if (muted === this.defaultMuted) {
      this.uidOverrides.delete(uid);
      return;
    }
    this.uidOverrides.set(uid, muted);
  }

  setAllMuted(muted: boolean): void {
    this.defaultMuted = muted;
    this.uidOverrides.clear();
  }

  reset(): void {
    this.defaultMuted = false;
    this.uidOverrides.clear();
  }
}
