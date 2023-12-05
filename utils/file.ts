import { FileDto, FileUid } from '@hooks/utils/fileUpload/types';
import { Validation } from '@hooks/utils/useValidation';
import imageCompression from 'browser-image-compression';

export function blobToFile(theBlob: Blob, fileName: string) {
  return new File([theBlob], fileName, {
    type: theBlob.type,
  });
}

export function printShow(url: string) {
  const printWin = window.open(url, 'print', 'width=1100,height=800');
  printWin?.print();
  printWin?.blur();
}

export function printImage(imageUrl: string) {
  const img = new Image();
  img.src = imageUrl;

  img.onload = function () {
    let printWindow = window.open('', 'PrintWindow');
    if (printWindow) {
      printWindow.document.write(
        '<html><head><title>Print a prescription</title></head><body><img src="' +
          imageUrl +
          '"/></body></html>',
      );
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };
}

// Encoding UTF8 ⇢ base64
export function b64EncodeUnicode(str: string) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    }),
  );
}

// Decoding base64 ⇢ UTF8
export function b64DecodeUnicode(str: string) {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
}

// image 파일 만들기
export const convertURLtoFile = async (url: string) => {
  if (typeof window !== 'undefined') {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split('.').pop();
    const filename = url.split('/').pop();
    const metadata = { type: `image/${ext}` };
    const file = new File([data], filename!, metadata);
    return file;
  }
};

export const dataURItoFile = (dataURI: string, name: string) => {
  const decode = decodeURIComponent(window.atob(dataURI));
  const mime = decode.charAt(0);
  const extens = fileExtension(mime);
  const bstr = window.atob(decode);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const file = new File(
    [u8arr],
    `${name}.${extens === 'application/pdf' ? 'pdf' : extens}`,
    {
      type: extens,
    },
  );
  return file;
};
export const forinArr = (obj: any) => {
  let arr = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      arr.push(element);
    }
  }
  return arr;
};

export const resizeFileCompression = (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 400,
  };

  return imageCompression(file, options);
};

export const ulidSeparation = (imgList: FileDto[]) => {
  let imgFile: File[] = [];
  let imgUid: FileUid[] = [];

  for (let element of imgList) {
    const reFile = async () => {
      return await convertURLtoFile(element.fileUrl);
    };
    reFile().then((img) => {
      if (img) {
        imgFile.push(img);
        imgUid.push({
          fileUlid: element.fileUlid,
          sort: element.sort,
        });
      }
    });
  }

  let res = {
    imgFile,
    imgUid,
  };

  return res;
};

export const urlFileSeparation = async (imgList: FileDto[]) => {
  let imgFile: File[] = [];

  for (let element of imgList) {
    await convertURLtoFile(element.fileUrl).then((img) => {
      if (img) {
        imgFile.push(img);
      }
    });
  }

  return imgFile;
};

export const formDataFormat = async (fileList: File[], name: string) => {
  const valid = new Validation();
  let formData = new FormData();
  for (let i = 0; i < fileList.length; i++) {
    const item = fileList[i];
    const imgName = item.name;
    const regBoo = valid.regExpFile.test(item.type);
    let resizeFile = regBoo ? item : await resizeFileCompression(item);
    const img = blobToFile(resizeFile, imgName);
    formData.append(name, img);
  }

  return formData;
};

export const fileExtension = (first: string) => {
  switch (first) {
    case '/':
      return 'jpg';
    case 'i':
      return 'png';
    case 'R':
      return 'gif';
    case 'U':
      return 'webp';
    default:
      return 'application/pdf';
  }
};
