import { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';

export function mergeArray(dest: Array<any>, src: Array<any>) {
  for (let i = 0; i < src.length; i++) {
    dest.push(src[i]);
  }
}

//get file name from a file path
export function spliceFileName(filePath: string): string {
  let lastIndex = 0;
  lastIndex = filePath.lastIndexOf('/');
  if (lastIndex == -1) {
    lastIndex = filePath.lastIndexOf('\\');
  }
  let fileName: string;
  if (lastIndex == -1) {
    fileName = filePath;
  } else {
    fileName = filePath.substring(lastIndex + 1);
  }
  return fileName;
}

//
export function downloadCanvasAsImage(canvas: any, fileName: string) {
  let dataUrl = canvas.toDataURL('image/jpeg', 1.0);
  let a = document.createElement('a');
  a.href = dataUrl;
  a.download = fileName;
  a.click();
}

export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

export function getUidFromRemoteUser(user: IAgoraRTCRemoteUser): number {
  let remoteUid: number;
  //if joinchannel with string uid
  if (typeof user.uid === 'string') {
    //@ts-ignore websdk private property
    remoteUid = user._uintid;
  } else {
    remoteUid = user.uid;
  }
  return remoteUid;
}
