import { SimpleTypeKind } from '@agoraio-extensions/cxx-parser';

module.exports = {
  'agora::rtc::IRtcEngine.createDataStream.config@type': {
    name: 'DataStreamConfig',
    source: 'const DataStreamConfig&',
    kind: SimpleTypeKind.reference_t,
    is_const: true,
    is_builtin_type: false,
  },
  'agora::rtc::IRtcEngineEx.createDataStreamEx.config@type': {
    name: 'DataStreamConfig',
    source: 'const DataStreamConfig&',
    kind: SimpleTypeKind.reference_t,
    is_const: true,
    is_builtin_type: false,
  },
};
