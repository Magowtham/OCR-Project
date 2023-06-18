function detectFileType(bufferFile) {
  const arr = new Uint8Array(bufferFile).subarray(0, 4);
  let header = "";
  for (let i = 0; i < arr.length; i++) {
    header += arr[i].toString(16);
  }
  let fileType;
  switch (header) {
    case "89504e47":
      fileType = "image/png";
      break;
    case "47494638":
      fileType = "image/gif";
      break;
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
      fileType = "image/jpeg";
      break;
    case "424d":
      fileType = "image/bmp";
      break;
    case "49492a00":
    case "4d4d002a":
      fileType = "image/tiff";
      break;
    case "25504446":
      fileType = "application/pdf";
      break;
    default:
      fileType = "unknown";
      break;
  }
  return fileType;
}

exports.detectFileType = detectFileType;
