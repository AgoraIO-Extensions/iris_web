import * as NATIVE_RTC from '@iris/native-rtc';
import VirtualBackgroundExtension, {
    IVirtualBackgroundProcessor,
    VirtualBackgroundEffectOptions,
} from 'agora-extension-virtual-background';
import { ILocalVideoTrack } from 'agora-rtc-sdk-ng';

import { VirtualBackgroundController } from '../../src/virtual_background/VirtualBackgroundController';
import { loadVirtualBackgroundImage } from '../../src/virtual_background/VirtualBackgroundImageLoader';
import {
    mapBlurOptions,
    mapColorOptions,
    normalizeBackgroundSource,
} from '../../src/virtual_background/VirtualBackgroundMapper';

jest.mock('agora-extension-virtual-background', () => ({
    __esModule: true,
    default: jest.fn(),
}));

class Deferred {
    promise: Promise<void>;
    resolve!: () => void;

    constructor() {
        this.promise = new Promise((resolve) => {
            this.resolve = resolve;
        });
    }
}

class FakeProcessor {
    initCount = 0;
    enableCount = 0;
    disableCount = 0;
    releaseCount = 0;
    unpipeCount = 0;
    lastOptions?: VirtualBackgroundEffectOptions;
    initDeferred?: Deferred;

    async init(): Promise<void> {
        this.initCount += 1;
        await this.initDeferred?.promise;
    }

    setOptions(options: VirtualBackgroundEffectOptions): void {
        this.lastOptions = options;
    }

    async enable(): Promise<void> {
        this.enableCount += 1;
    }

    async disable(): Promise<void> {
        this.disableCount += 1;
    }

    pipe(): FakeProcessor {
        return this;
    }

    unpipe(): void {
        this.unpipeCount += 1;
    }

    async release(): Promise<void> {
        this.releaseCount += 1;
    }
}

class FakeExtension {
    processors: FakeProcessor[] = [];
    compatible = true;
    nextProcessor?: FakeProcessor;

    checkCompatibility(): boolean {
        return this.compatible;
    }

    createProcessor(): IVirtualBackgroundProcessor {
        const processor = this.nextProcessor || new FakeProcessor();
        this.nextProcessor = undefined;
        this.processors.push(processor);
        return (processor as unknown) as IVirtualBackgroundProcessor;
    }
}

class FakeTrack {
    pipeCount = 0;
    unpipeCount = 0;
    failPipe = false;
    processorDestination = {};

    pipe(processor: FakeProcessor): FakeProcessor {
        this.pipeCount += 1;
        if (this.failPipe) throw new Error('injected-pipe-failure');
        return processor;
    }

    unpipe(): void {
        this.unpipeCount += 1;
    }
}

class FakeImage {
    crossOrigin: string | null = null;
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    failLoad = false;
    failDecode = false;
    private source = '';

    get src(): string {
        return this.source;
    }

    set src(value: string) {
        this.source = value;
        if (!value) return;
        queueMicrotask(() => {
            if (this.failLoad) this.onerror?.();
            else this.onload?.();
        });
    }

    async decode(): Promise<void> {
        if (this.failDecode) throw new Error('injected-decode-failure');
    }
}

function createController(extension = new FakeExtension()) {
    const registerExtensions = jest.fn();
    const controller = new VirtualBackgroundController(
        registerExtensions,
        () => (extension as unknown) as VirtualBackgroundExtension
    );
    return { controller, extension, registerExtensions };
}

function asTrack(track: FakeTrack): ILocalVideoTrack {
    return (track as unknown) as ILocalVideoTrack;
}

const primaryCameraSource = NATIVE_RTC.MEDIA_SOURCE_TYPE.PRIMARY_CAMERA_SOURCE;
const secondaryCameraSource =
    NATIVE_RTC.MEDIA_SOURCE_TYPE.SECONDARY_CAMERA_SOURCE;

describe('VirtualBackgroundMapper', () => {
    test('normalizes native and camel-case background source fields', () => {
        expect(
            normalizeBackgroundSource({
                backgroundSourceType: 3,
                blurDegree: 2,
            })
        ).toEqual({
            background_source_type: 3,
            color: undefined,
            source: undefined,
            blur_degree: 2,
        });
    });

    test('maps blur and color options for camera sources', () => {
        expect(
            mapBlurOptions(
                {
                    background_source_type:
                        NATIVE_RTC.BACKGROUND_SOURCE_TYPE.BACKGROUND_BLUR,
                    blur_degree: NATIVE_RTC.BACKGROUND_BLUR_DEGREE.BLUR_DEGREE_MEDIUM,
                },
                NATIVE_RTC.MEDIA_SOURCE_TYPE.PRIMARY_CAMERA_SOURCE
            )
        ).toEqual({ options: { type: 'blur', blurDegree: 2 } });
        expect(
            mapColorOptions(
                {
                    background_source_type:
                        NATIVE_RTC.BACKGROUND_SOURCE_TYPE.BACKGROUND_COLOR,
                    color: 0x001122,
                },
                NATIVE_RTC.MEDIA_SOURCE_TYPE.PRIMARY_CAMERA_SOURCE
            )
        ).toEqual({ options: { type: 'color', color: '#001122' } });
    });

    test('rejects malformed options and non-camera sources', () => {
        expect(
            mapColorOptions(
                {
                    background_source_type:
                        NATIVE_RTC.BACKGROUND_SOURCE_TYPE.BACKGROUND_COLOR,
                    color: 0x1000000,
                },
                NATIVE_RTC.MEDIA_SOURCE_TYPE.PRIMARY_CAMERA_SOURCE
            )
        ).toEqual({ error: 'invalid-argument' });
        expect(
            mapBlurOptions(
                {
                    background_source_type:
                        NATIVE_RTC.BACKGROUND_SOURCE_TYPE.BACKGROUND_BLUR,
                    blur_degree: NATIVE_RTC.BACKGROUND_BLUR_DEGREE.BLUR_DEGREE_LOW,
                },
                NATIVE_RTC.MEDIA_SOURCE_TYPE.PRIMARY_SCREEN_SOURCE
            )
        ).toEqual({ error: 'not-supported' });
    });
});

describe('VirtualBackgroundImageLoader', () => {
    test('loads and releases a browser image URL', async () => {
        const image = new FakeImage();
        const loaded = await loadVirtualBackgroundImage(
            '/backgrounds/studio.png',
            100,
            () => (image as unknown) as HTMLImageElement,
            'https://example.com/session/'
        );

        expect(image.crossOrigin).toBe('anonymous');
        expect(image.src).toBe('https://example.com/backgrounds/studio.png');
        loaded.release();
        expect(image.src).toBe('');
    });

    test('rejects unsupported URL protocols', async () => {
        await expect(
            loadVirtualBackgroundImage('file:///tmp/background.png')
        ).rejects.toThrow('unsupported image URL protocol');
    });

    test.each(['load', 'decode'])(
        'cleans up an image %s failure',
        async (failure) => {
            const image = new FakeImage();
            image.failLoad = failure === 'load';
            image.failDecode = failure === 'decode';

            await expect(
                loadVirtualBackgroundImage(
                    'https://example.com/background.png',
                    100,
                    () => (image as unknown) as HTMLImageElement
                )
            ).rejects.toThrow();
            expect(image.src).toBe('');
            expect(image.onload).toBeNull();
            expect(image.onerror).toBeNull();
        }
    );
});

describe('VirtualBackgroundController', () => {
    test('registers the extension and leaves disabled tracks unprocessed', async () => {
        const { controller, registerExtensions } = createController();
        const track = new FakeTrack();
        await controller.attachCameraTrack(primaryCameraSource, asTrack(track));

        expect(registerExtensions).toHaveBeenCalledTimes(1);
        expect(track.pipeCount).toBe(0);
    });

    test('attaches an effect enabled before camera creation', async () => {
        const { controller } = createController();
        const track = new FakeTrack();

        await expect(
            controller.enable({ type: 'blur' }, primaryCameraSource)
        ).resolves.toBe(true);
        await controller.attachCameraTrack(primaryCameraSource, asTrack(track));

        expect(track.pipeCount).toBe(1);
    });

    test('reuses one processor across repeated enable calls', async () => {
        const { controller, extension } = createController();
        const track = new FakeTrack();
        await controller.attachCameraTrack(primaryCameraSource, asTrack(track));

        await expect(
            controller.enable({ type: 'blur' }, primaryCameraSource)
        ).resolves.toBe(true);
        await expect(
            controller.enable({ type: 'blur' }, primaryCameraSource)
        ).resolves.toBe(true);

        expect(extension.processors).toHaveLength(1);
        expect(track.pipeCount).toBe(2);
        expect(track.unpipeCount).toBe(1);
    });

    test('discards stale initialization when disable is requested', async () => {
        const extension = new FakeExtension();
        const processor = new FakeProcessor();
        processor.initDeferred = new Deferred();
        extension.nextProcessor = processor;
        const { controller } = createController(extension);
        const track = new FakeTrack();
        await controller.attachCameraTrack(primaryCameraSource, asTrack(track));

        const enabling = controller.enable({ type: 'blur' }, primaryCameraSource);
        const disabling = controller.disable();
        processor.initDeferred.resolve();

        await expect(enabling).resolves.toBe(false);
        await disabling;
        expect(track.pipeCount).toBe(0);
        expect(processor.releaseCount).toBe(1);
    });

    test('moves processing to a replacement camera track', async () => {
        const { controller } = createController();
        const first = new FakeTrack();
        const second = new FakeTrack();
        await controller.attachCameraTrack(primaryCameraSource, asTrack(first));
        await controller.enable({ type: 'blur' }, primaryCameraSource);
        await controller.attachCameraTrack(primaryCameraSource, asTrack(second));

        expect(first.unpipeCount).toBe(1);
        expect(second.pipeCount).toBe(1);
    });

    test('releases image resources and processor exactly once', async () => {
        const { controller, extension } = createController();
        const releaseResource = jest.fn();
        const track = new FakeTrack();
        await controller.attachCameraTrack(primaryCameraSource, asTrack(track));
        await controller.enable(
            { type: 'img' },
            primaryCameraSource,
            releaseResource
        );
        await Promise.all([controller.release(), controller.release()]);

        expect(releaseResource).toHaveBeenCalledTimes(1);
        expect(extension.processors[0].releaseCount).toBe(1);
    });

    test('routes processing to the requested camera source', async () => {
        const { controller } = createController();
        const primary = new FakeTrack();
        const secondary = new FakeTrack();
        await controller.attachCameraTrack(primaryCameraSource, asTrack(primary));
        await controller.attachCameraTrack(
            secondaryCameraSource,
            asTrack(secondary)
        );

        await controller.enable({ type: 'blur' }, primaryCameraSource);
        expect(primary.pipeCount).toBe(1);
        expect(secondary.pipeCount).toBe(0);

        await controller.enable({ type: 'blur' }, secondaryCameraSource);
        expect(primary.unpipeCount).toBe(1);
        expect(secondary.pipeCount).toBe(1);
    });

    test('keeps an active processor during overlapping enable calls', async () => {
        const { controller, extension } = createController();
        const track = new FakeTrack();
        await controller.attachCameraTrack(primaryCameraSource, asTrack(track));
        await controller.enable({ type: 'blur' }, primaryCameraSource);

        const staleEnable = controller.enable(
            { type: 'color', color: '#000000' },
            primaryCameraSource
        );
        const currentEnable = controller.enable(
            { type: 'color', color: '#ffffff' },
            primaryCameraSource
        );

        await expect(staleEnable).resolves.toBe(false);
        await expect(currentEnable).resolves.toBe(true);
        expect(extension.processors).toHaveLength(1);
        expect(extension.processors[0].releaseCount).toBe(0);
        expect(extension.processors[0].lastOptions).toEqual({
            type: 'color',
            color: '#ffffff',
        });
    });

    test('reports a failed processor attachment', async () => {
        const { controller, extension } = createController();
        const track = new FakeTrack();
        track.failPipe = true;
        await controller.attachCameraTrack(primaryCameraSource, asTrack(track));

        await expect(
            controller.enable({ type: 'blur' }, primaryCameraSource)
        ).resolves.toBe(false);
        expect(extension.processors[0].releaseCount).toBe(1);
    });
});
