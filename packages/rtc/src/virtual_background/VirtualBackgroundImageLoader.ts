export type LoadedVirtualBackgroundImage = {
  image: HTMLImageElement;
  release: () => void;
};

type ImageFactory = () => HTMLImageElement;

const supportedProtocols = new Set(['http:', 'https:', 'blob:']);

export async function loadVirtualBackgroundImage(
  source: string,
  timeoutMs = 10_000,
  imageFactory: ImageFactory = () => new Image(),
  baseUrl = globalThis.document?.baseURI
): Promise<LoadedVirtualBackgroundImage> {
  const trimmedSource = source.trim();
  if (!trimmedSource || timeoutMs <= 0) {
    throw new Error('invalid image source');
  }

  let resolvedUrl: URL;
  try {
    resolvedUrl = new URL(trimmedSource, baseUrl);
  } catch (_) {
    throw new Error('invalid image URL');
  }
  if (!supportedProtocols.has(resolvedUrl.protocol)) {
    throw new Error(`unsupported image URL protocol: ${resolvedUrl.protocol}`);
  }

  const image = imageFactory();
  let released = false;
  const release = (): void => {
    if (released) return;
    released = true;
    image.onload = null;
    image.onerror = null;
    image.src = '';
  };

  try {
    image.crossOrigin = 'anonymous';
    let timeout: ReturnType<typeof globalThis.setTimeout> | undefined;
    await new Promise<void>((resolve, reject) => {
      timeout = globalThis.setTimeout(
        () => reject(new Error('image load timed out')),
        timeoutMs
      );
      image.onload = () => image.decode().then(resolve, reject);
      image.onerror = () => reject(new Error('image load failed'));
      image.src = resolvedUrl.href;
    }).finally(() => {
      if (timeout !== undefined) globalThis.clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
    });
    return { image, release };
  } catch (error) {
    release();
    throw error;
  }
}
