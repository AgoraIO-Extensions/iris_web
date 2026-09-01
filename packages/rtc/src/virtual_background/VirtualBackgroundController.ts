import VirtualBackgroundExtension, {
    IVirtualBackgroundProcessor,
    VirtualBackgroundEffectOptions,
} from 'agora-extension-virtual-background';
import * as NATIVE_RTC from '@iris/native-rtc';
import { ILocalVideoTrack } from 'agora-rtc-sdk-ng';

import { AgoraConsole } from '../util/AgoraConsole';

type ExtensionFactory = () => VirtualBackgroundExtension;
type RegisterExtensions = (extensions: VirtualBackgroundExtension[]) => void;
type ResourceRelease = () => void;

export class VirtualBackgroundController {
    private readonly extension: VirtualBackgroundExtension;
    private readonly compatible: boolean;
    private processor?: IVirtualBackgroundProcessor;
    private readonly cameraTracks = new Map<
        NATIVE_RTC.MEDIA_SOURCE_TYPE,
        ILocalVideoTrack
    >();
    private activeSource?: NATIVE_RTC.MEDIA_SOURCE_TYPE;
    private resourceRelease?: ResourceRelease;
    private operationQueue: Promise<void> = Promise.resolve();
    private operationGeneration = 0;
    private effectEnabled = false;
    private processorAttached = false;
    private released = false;

    constructor(
        registerExtensions: RegisterExtensions,
        extensionFactory: ExtensionFactory = () => new VirtualBackgroundExtension()
    ) {
        this.extension = extensionFactory();
        this.compatible = this.extension.checkCompatibility();
        if (!this.compatible) return;

        try {
            registerExtensions([this.extension]);
        } catch (error) {
            this.compatible = false;
            AgoraConsole.error(`virtual background registration failed: ${error}`);
        }
    }

    get isCompatible(): boolean {
        return this.compatible;
    }

    attachCameraTrack(
        source: NATIVE_RTC.MEDIA_SOURCE_TYPE,
        track: ILocalVideoTrack
    ): Promise<void> {
        return this.enqueue(async () => {
            if (this.released || this.cameraTracks.get(source) === track) return;
            if (this.activeSource === source) this.unpipeCurrentTrack();
            this.cameraTracks.set(source, track);
            if (
                this.effectEnabled &&
                this.activeSource === source &&
                this.processor
            ) {
                this.pipeCurrentTrack();
            }
        });
    }

    enable(
        options: VirtualBackgroundEffectOptions,
        source: NATIVE_RTC.MEDIA_SOURCE_TYPE,
        resourceRelease?: ResourceRelease
    ): Promise<boolean> {
        const generation = ++this.operationGeneration;
        return this.enqueueResult(async () => {
            if (this.released || !this.compatible) {
                resourceRelease?.();
                return false;
            }

            let processor = this.processor;
            const ownsProcessor = !processor;
            if (!processor) {
                processor = this.extension.createProcessor();
                try {
                    await processor.init();
                } catch (error) {
                    await this.releaseProcessor(processor);
                    resourceRelease?.();
                    AgoraConsole.error(
                        `virtual background initialization failed: ${error}`
                    );
                    return false;
                }
            }

            if (generation !== this.operationGeneration || this.released) {
                if (ownsProcessor) await this.releaseProcessor(processor);
                resourceRelease?.();
                return false;
            }

            this.releaseCurrentResource();
            this.resourceRelease = resourceRelease;
            this.processor = processor;
            processor.setOptions(options);

            try {
                await processor.enable();
                if (generation !== this.operationGeneration || this.released) {
                    await this.releaseCurrentProcessor();
                    return false;
                }
                this.effectEnabled = true;
                this.unpipeCurrentTrack();
                this.activeSource = source;
                if (!this.pipeCurrentTrack()) {
                    await this.releaseCurrentProcessor();
                    return false;
                }
                return true;
            } catch (error) {
                await this.releaseCurrentProcessor();
                AgoraConsole.error(`virtual background enable failed: ${error}`);
                return false;
            }
        });
    }

    disable(): Promise<void> {
        ++this.operationGeneration;
        this.effectEnabled = false;
        return this.enqueue(async () => {
            this.unpipeCurrentTrack();
            await this.releaseCurrentProcessor();
        });
    }

    detachCameraTrack(): Promise<void> {
        ++this.operationGeneration;
        this.effectEnabled = false;
        return this.enqueue(async () => {
            this.unpipeCurrentTrack();
            this.cameraTracks.clear();
            this.activeSource = undefined;
            await this.releaseCurrentProcessor();
        });
    }

    release(): Promise<void> {
        if (this.released) return this.operationQueue;
        this.released = true;
        ++this.operationGeneration;
        this.effectEnabled = false;
        return this.enqueue(async () => {
            this.unpipeCurrentTrack();
            this.cameraTracks.clear();
            this.activeSource = undefined;
            await this.releaseCurrentProcessor();
        });
    }

    private pipeCurrentTrack(): boolean {
        const cameraTrack =
            this.activeSource === undefined
                ? undefined
                : this.cameraTracks.get(this.activeSource);
        if (!this.processor) return false;
        if (!cameraTrack || this.processorAttached) return true;
        try {
            cameraTrack.pipe(this.processor).pipe(cameraTrack.processorDestination);
            this.processorAttached = true;
            return true;
        } catch (error) {
            cameraTrack.unpipe();
            this.processor.unpipe();
            AgoraConsole.error(`virtual background pipe failed: ${error}`);
            return false;
        }
    }

    private unpipeCurrentTrack(): void {
        const cameraTrack =
            this.activeSource === undefined
                ? undefined
                : this.cameraTracks.get(this.activeSource);
        if (!cameraTrack || !this.processorAttached) return;
        try {
            cameraTrack.unpipe();
            this.processor?.unpipe();
        } catch (error) {
            AgoraConsole.error(`virtual background unpipe failed: ${error}`);
        } finally {
            this.processorAttached = false;
        }
    }

    private async releaseCurrentProcessor(): Promise<void> {
        this.unpipeCurrentTrack();
        const processor = this.processor;
        this.processor = undefined;
        if (processor) {
            try {
                await processor.disable();
            } catch (_) { }
            await this.releaseProcessor(processor);
        }
        this.releaseCurrentResource();
    }

    private async releaseProcessor(
        processor: IVirtualBackgroundProcessor
    ): Promise<void> {
        try {
            await processor.release();
        } catch (error) {
            AgoraConsole.error(`virtual background release failed: ${error}`);
        }
    }

    private releaseCurrentResource(): void {
        const release = this.resourceRelease;
        this.resourceRelease = undefined;
        release?.();
    }

    private enqueue(operation: () => Promise<void>): Promise<void> {
        const result = this.operationQueue.then(operation, operation);
        this.operationQueue = result.catch(() => { });
        return result;
    }

    private enqueueResult<T>(operation: () => Promise<T>): Promise<T> {
        const result = this.operationQueue.then(operation, operation);
        this.operationQueue = result.then(
            () => { },
            () => { }
        );
        return result;
    }
}
