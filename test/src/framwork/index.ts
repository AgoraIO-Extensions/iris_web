import { TestCallBack, TestActionQueue, Priority } from "./TestActionQueue";


let testActionQueue = new TestActionQueue();

export { waitForSecond } from "./TestActionQueue";

export let test = function (title: string, cb: TestCallBack, priority: Priority = Priority.Low) {
    testActionQueue.putAction(title, cb, priority);
};

export let shouldEqual = function (title: string, compareValue: any, expectValue: any) {
    testActionQueue.shouldEqual(title, compareValue, expectValue);
};

export let shouldReturnTrue = function (titile: string, cb: any) {
    testActionQueue.shouldReturnTrue(titile, cb);
};

export let shoudlWarn = function (titile: string, val: boolean, des: string) {
    testActionQueue.shouldWarn(titile, val, des);
};

export let start = async function () {
    await testActionQueue.start();
};

export let stop = function () {
    testActionQueue.stop();
};





