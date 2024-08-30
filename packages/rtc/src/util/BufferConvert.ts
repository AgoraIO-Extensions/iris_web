import * as NATIVE_RTC from '@iris/native-rtc';

export const drawRGBABufferToCanvas = (
  width: number,
  height: number,
  buffer: any,
  format: NATIVE_RTC.VIDEO_PIXEL_FORMAT,
  canvas: HTMLCanvasElement
): void => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  canvas.width = width;
  canvas.height = height;

  if (format == NATIVE_RTC.VIDEO_PIXEL_FORMAT.VIDEO_PIXEL_BGRA) {
    //下面是bgra转rgba的逻辑
    var rgbaArray = new Uint8ClampedArray(width * height * 4);
    for (var i = 0; i < buffer[0].length; i += 4) {
      rgbaArray[i] = buffer[0][i + 2];
      rgbaArray[i + 1] = buffer[0][i + 1];
      rgbaArray[i + 2] = buffer[0][i];
      rgbaArray[i + 3] = buffer[0][i + 3];
    }
    var imageData = new ImageData(rgbaArray, width, height);
    ctx.putImageData(imageData, 0, 0);
  } else if (format == NATIVE_RTC.VIDEO_PIXEL_FORMAT.VIDEO_PIXEL_RGBA) {
    var imageData = ctx.createImageData(width, height);
    for (var i = 0; i < buffer[0].length; i++) {
      imageData.data[i] = buffer[0][i];
    }
    ctx.putImageData(imageData, 0, 0);
  }
};
