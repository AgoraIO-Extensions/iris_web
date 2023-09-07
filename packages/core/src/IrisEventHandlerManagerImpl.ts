import { EventParam, IrisEventHandler, IrisEventHandlerManager } from "./IrisApiEngine";

export class IrisEventHandlerManagerImpl implements IrisEventHandlerManager {

    private eventHandlersMap: Map<string, Array<IrisEventHandler>> = new Map();

    notifyEvent(key: string, param: EventParam): void {
        let eventHandlers = this.eventHandlersMap.get(key);
        if (!eventHandlers) {
            return;
        }

        eventHandlers.forEach((eventHandler) => {
            eventHandler.onEvent(param);
        });
    }

    addEventHandler(key: string, eventHandler: IrisEventHandler): void {
        let eventHandlers = this.eventHandlersMap.get(key);
        if (!eventHandlers) {
            eventHandlers = [];
            eventHandlers.push(eventHandler);

            this.eventHandlersMap.set(key, eventHandlers);
            return;
        }

        let item = eventHandlers.find((value) => {
            return value === eventHandler;
        });
        if (!item) {
            eventHandlers.push(eventHandler);
        }
    }

    removeEventHandler(key: string, eventHandler: IrisEventHandler): void {
        let eventHandlers = this.eventHandlersMap.get(key);
        if (!eventHandlers) {
            return;
        }

        eventHandlers.forEach((item, index) => {
            if (item === eventHandler) eventHandlers?.splice(index, 1);
        });
    }

}