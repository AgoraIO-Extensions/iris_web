import { RemoteMuteState } from '../../src/state/RemoteMuteState';

describe('RemoteMuteState', () => {
  test('uses the default and stores only per-uid differences', () => {
    let state = new RemoteMuteState();
    expect(state.isMuted(456)).toBe(false);

    state.setUidMuted(456, true);
    expect(state.isMuted(456)).toBe(true);

    state.setUidMuted(456, false);
    expect(state.isMuted(456)).toBe(false);
  });

  test('mute-all replaces older uid decisions but later uid decisions win', () => {
    let state = new RemoteMuteState();
    state.setUidMuted(456, true);
    state.setAllMuted(false);
    expect(state.isMuted(456)).toBe(false);

    state.setAllMuted(true);
    expect(state.isMuted(456)).toBe(true);
    state.setUidMuted(456, false);
    expect(state.isMuted(456)).toBe(false);
    expect(state.isMuted(789)).toBe(true);
  });

  test('reset restores the initial unmuted policy', () => {
    let state = new RemoteMuteState();
    state.setAllMuted(true);
    state.setUidMuted(456, false);
    state.reset();
    expect(state.isMuted(456)).toBe(false);
    expect(state.isMuted(789)).toBe(false);
  });
});
