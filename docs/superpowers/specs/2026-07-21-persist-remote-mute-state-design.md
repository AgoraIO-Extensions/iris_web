# Persist Remote Mute State Per Connection

## Goal

Make remote audio and video mute APIs retain their last effective state for the lifetime of the local user's RTC connection. A remote user leaving, joining, or publishing again must not erase that state. State must be discarded when the local connection leaves.

This applies to both the regular and `Ex` APIs:

- `muteRemoteAudioStream` and `muteRemoteAudioStreamEx`
- `muteRemoteVideoStream` and `muteRemoteVideoStreamEx`
- `muteAllRemoteAudioStreams` and `muteAllRemoteAudioStreamsEx`
- `muteAllRemoteVideoStreams` and `muteAllRemoteVideoStreamsEx`

## Required Semantics

Remote audio and video have independent subscription policies. Each policy contains:

- A connection-wide default mute value, initially `false`.
- Per-uid overrides for values that differ from the current default.

The most recent API operation wins:

1. `muteRemote*(uid, mute)` records the requested value for that uid, even when the remote user is offline. If the value equals the current default, any existing override for that uid is removed.
2. `muteAllRemote*(mute)` changes the default, clears every per-uid override for that media type, and applies the new value to all currently known remote users.
3. A later per-uid operation may create a new exception to the latest mute-all default.

Examples:

- `muteRemote(B, true)`, B leaves and rejoins: B remains muted.
- `muteAll(true)`, C joins later: C is muted.
- B leaves, then `muteRemote(B, false)`, then B rejoins: B is unmuted.
- `muteRemote(B, true)`, then `muteAll(false)`: B is unmuted because the later mute-all operation replaces earlier per-uid decisions.

## Ownership And Lifecycle

The policy belongs to `IrisClient`, because one `IrisClient` represents one local RTC connection and owns its event handler. This keeps multi-channel state isolated without constructing external connection keys.

The policy must survive removal of a `RemoteUserPackage`. Remote user packages represent current online users and must not become the source of truth for mute state.

`IrisClient.release()` must reset both policies. This reset is required even for the initialization-created primary `IrisClient`, which is retained and reused after leaving. A new join through that client must start with the default unmuted state.

The regular APIs resolve and update the primary/default `IrisClient`. The `Ex` APIs resolve and update the `IrisClient` identified by their `RtcConnection`. Both API families use the same policy implementation.

## Components

### Remote Subscription Policy

Add a small state holder with separate audio and video policy state. It provides operations to:

- Resolve whether a uid is muted.
- Set a per-uid mute value.
- Set the default mute value and clear overrides.
- Reset all state.

The state holder does not call Web SDK APIs. Keeping state calculation separate makes precedence and lifecycle behavior directly testable.

### API Entry Points

The eight mute API entry points update policy before attempting immediate track work. This order is important for offline uid operations, where no `RemoteUserPackage` exists.

If the target remote user is online, the existing `IrisClientObserver.notifyRemote` path applies the resolved state immediately. If the user is offline, the API still succeeds after recording state.

### Remote Publish Handling

`IrisClientEventHandler.onEventUserPublished` queries its owning `IrisClient` policy before subscribing:

- If the relevant media type is muted for the uid, do not subscribe to that track.
- If it is unmuted, use the existing subscription path.

The handler must report local mute/subscription callbacks consistently with the resolved local policy. When policy prevents an audio subscription, report `onUserMuteAudioEx(connection, uid, true)` and `onRemoteAudioStateChangedEx` with `STOPPED` plus `LOCAL_MUTED`. For video, report `onUserMuteVideoEx(connection, uid, true)` and `onRemoteVideoStateChangedEx` with `STOPPED` plus `LOCAL_MUTED`. When policy permits subscription, preserve the existing `false` mute callbacks and `STARTING` plus `REMOTE_UNMUTED` state callbacks. A remote publish event must never report the user as locally unmuted when local policy prevented subscription.

Remote unpublish and remote leave continue cleaning up live tracks and packages. They must not mutate the policy.

## Error And Compatibility Behavior

- Preserve existing Iris API return conventions.
- Preserve the current behavior for invalid or unresolved local connections.
- Treat an offline target uid as a valid per-uid state update when the local connection exists.
- Do not add persistence beyond the lifetime of an `IrisClient` connection.
- Do not change local-track ownership, publish, or cleanup behavior.

## Testing

Add focused tests for both audio and video covering:

1. A per-uid mute remains effective after remote leave and rejoin/publish.
2. Mute-all applies to a user that joins or publishes later.
3. A per-uid unmute issued while the user is offline applies after rejoin.
4. Mute-all clears older per-uid overrides.
5. A later per-uid operation overrides the current mute-all default.
6. Two simultaneous `RtcConnection` instances keep independent policies.
7. Releasing the local connection resets policy, including reuse of the primary `IrisClient`.
8. Existing immediate online mute/unmute behavior remains intact.

Implementation follows red-green-refactor: add each behavioral test first, confirm it fails for the missing persistence behavior, then add the minimum production change and rerun the focused test. Final verification includes the complete regular and Ex implementation test files, type checking, and formatting checks.
