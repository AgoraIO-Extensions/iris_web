import '@testing-library/jest-dom';

/**
 * started agora-rtc-sdk-ng@17.0.0, need mock RTCPeerConnection.
 * RTCPeerConnection does not implement global
 */
(global.RTCPeerConnection as any) = jest.fn();

/**
 * JSDOM does not implement global "HTMLMediaElement.prototype.play" function
 */
HTMLMediaElement.prototype.play = jest.fn().mockReturnValue(Promise.resolve());
HTMLMediaElement.prototype.pause = jest.fn().mockReturnValue(Promise.resolve());

/**
 * navigator does not implement global "mediaDevices.prototype.getUserMedia" function
 * navigator does not implement global "mediaDevices.prototype.enumerateDevices" function
 *
 */
const mockPromise = jest.fn(async () => {
  return new Promise<void>((resolve) => {
    resolve();
  });
});
Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: mockPromise,
    enumerateDevices: mockPromise,
  },
});

window.MediaStreamTrack = jest.fn();
window.RTCIceCandidate = jest.fn();
