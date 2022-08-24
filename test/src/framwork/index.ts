import { TestCallBack, TestActionQueue } from "./TestActionQueue";


let testActionQueue = new TestActionQueue();

export { waitForSecond } from "./TestActionQueue";

export let test = function (title: string, cb: TestCallBack, priority: number = 0) {
    testActionQueue.putAction(title, cb, priority);
};

export let shouldEqual = function (title: string, compareValue: any, expectValue: any) {
    testActionQueue.shouldEqual(title, compareValue, expectValue);
}

export let shouldReturnTrue = function (titile: string, cb: any) {
    testActionQueue.shouldReturnTrue(titile, cb);
}


export let start = async function () {
    await testActionQueue.start();
};




