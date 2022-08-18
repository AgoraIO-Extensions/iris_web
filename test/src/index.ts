// import AgoraRTC from "../../project/node_modules/agora-rtc-sdk-ng/rtc-sdk_en";
import { AgoraWrapper } from "../../project/dist/dts/app";


export class Hello {
    public static say() {
        console.log("HelloWorld");
        console.log(AgoraWrapper.CreateIrisApiEngine());
    }
};


// export function a() {
// console.log(AgoraRTC.VERSION);
// };

// a();