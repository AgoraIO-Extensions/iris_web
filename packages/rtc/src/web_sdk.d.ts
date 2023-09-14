export declare enum InspectState {
  CONNECTING = 'CONNECTING',
  RECONNECTING = 'RECONNECTING',
  CONNECTED = 'CONNECTED',
  CLOSED = 'CLOSED',
}

export declare type CheckVideoVisibleResult =
  | { visible: true }
  | {
      visible: false;
      reason: VisibleHiddenReason;
    };

export declare enum VisibleHiddenReason {
  COVERED = 'COVERED',
  POSITION = 'POSITION',
  SIZE = 'SIZE',
  STYLE = 'STYLE',
}
