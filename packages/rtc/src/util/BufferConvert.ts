export const drawBufferToCanvas = (
  width: number,
  height: number,
  buffer: Array<any>,
  canvas: HTMLCanvasElement
): void => {
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;
  var imageData = ctx.createImageData(width, height);
  for (var i = 0; i < buffer[0].length; i++) {
    imageData.data[i] = buffer[0][i];
  }
  ctx.putImageData(imageData, 0, 0);

  // const imgData = new ImageData(
  //   (buffer as unknown) as Uint8ClampedArray,
  //   width,
  //   height
  // );
  // ctx.putImageData(imgData, 0, 0);

  // const rowBytes = width * 4;
  // for (let row = 0; row < height; row++) {
  //   const srow = row;
  //   const imageData = ctx.createImageData(width, 1);
  //   const start = srow * width * 4;
  //   for (let i = 0; i < rowBytes; ++i) {
  //     imageData.data[i] = buffer![start + i]!;
  //   }
  //   ctx.putImageData(imageData, 0, row);
  // }
};
