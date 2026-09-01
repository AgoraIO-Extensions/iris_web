import * as NATIVE_RTC from '@iris/native-rtc';
import { VirtualBackgroundEffectOptions } from 'agora-extension-virtual-background';

export type VirtualBackgroundMappingResult =
  | { options: VirtualBackgroundEffectOptions }
  | { error: 'invalid-argument' | 'not-supported' };

export function normalizeBackgroundSource(
  source: Record<string, unknown> | undefined
): NATIVE_RTC.VirtualBackgroundSource {
  return {
    background_source_type: (source?.background_source_type ??
      source?.backgroundSourceType) as
      | NATIVE_RTC.BACKGROUND_SOURCE_TYPE
      | undefined,
    color: source?.color as number | undefined,
    source: source?.source as string | undefined,
    blur_degree: (source?.blur_degree ?? source?.blurDegree) as
      | NATIVE_RTC.BACKGROUND_BLUR_DEGREE
      | undefined,
  };
}

function isCameraSource(
  mediaSourceType: NATIVE_RTC.MEDIA_SOURCE_TYPE
): boolean {
  return (
    mediaSourceType === NATIVE_RTC.MEDIA_SOURCE_TYPE.PRIMARY_CAMERA_SOURCE ||
    mediaSourceType === NATIVE_RTC.MEDIA_SOURCE_TYPE.SECONDARY_CAMERA_SOURCE
  );
}

export function mapBlurOptions(
  backgroundSource: NATIVE_RTC.VirtualBackgroundSource,
  mediaSourceType: NATIVE_RTC.MEDIA_SOURCE_TYPE
): VirtualBackgroundMappingResult {
  if (!isCameraSource(mediaSourceType)) {
    return { error: 'not-supported' };
  }

  if (
    backgroundSource.background_source_type !==
    NATIVE_RTC.BACKGROUND_SOURCE_TYPE.BACKGROUND_BLUR
  ) {
    return { error: 'not-supported' };
  }

  const blurDegree = backgroundSource.blur_degree;
  if (
    blurDegree !== NATIVE_RTC.BACKGROUND_BLUR_DEGREE.BLUR_DEGREE_LOW &&
    blurDegree !== NATIVE_RTC.BACKGROUND_BLUR_DEGREE.BLUR_DEGREE_MEDIUM &&
    blurDegree !== NATIVE_RTC.BACKGROUND_BLUR_DEGREE.BLUR_DEGREE_HIGH
  ) {
    return { error: 'invalid-argument' };
  }

  return {
    options: {
      type: 'blur',
      blurDegree,
    },
  };
}

export function mapColorOptions(
  backgroundSource: NATIVE_RTC.VirtualBackgroundSource,
  mediaSourceType: NATIVE_RTC.MEDIA_SOURCE_TYPE
): VirtualBackgroundMappingResult {
  if (!isCameraSource(mediaSourceType)) {
    return { error: 'not-supported' };
  }

  if (
    backgroundSource.background_source_type !==
    NATIVE_RTC.BACKGROUND_SOURCE_TYPE.BACKGROUND_COLOR
  ) {
    return { error: 'not-supported' };
  }

  const color = backgroundSource.color;
  if (
    color === undefined ||
    !Number.isInteger(color) ||
    color < 0x000000 ||
    color > 0xffffff
  ) {
    return { error: 'invalid-argument' };
  }

  return {
    options: {
      type: 'color',
      color: `#${color.toString(16).padStart(6, '0')}`,
    },
  };
}

export function mapImageOptions(
  image: HTMLImageElement,
  mediaSourceType: NATIVE_RTC.MEDIA_SOURCE_TYPE
): VirtualBackgroundMappingResult {
  if (!isCameraSource(mediaSourceType)) {
    return { error: 'not-supported' };
  }

  return {
    options: {
      type: 'img',
      source: image,
      fit: 'cover',
    },
  };
}
