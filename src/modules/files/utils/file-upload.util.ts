
import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { extname } from 'path';

export const editFileName = (req: Request, file: any, callback) => {
  const time = new Date().getTime().toString();
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  console.log('fileExtName', fileExtName);
  callback(null, `${time + '-' + randomName}${fileExtName}`);
};

export const isVideo = (v: string) => {
  if (v.includes('.webm') || v.includes('.mp4')) {
    return true;
  } else {
    return false;
  }
};

export const isGif = (v: string) => {
  if (v.includes('.gif')) {
    return true;
  } else {
    return false;
  }
};

export const fileFilter = (req: Request, file: any, callback) => {
  // if (!req.body.type || !Object.values(FileTypes).includes(req.body.type)) {
  //   return callback(new BadRequestException('File type not found!'));
  // }
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|mp4|mp3|wav|avif|svg|webm|)$/)) {
    return callback(new BadRequestException('Invalid file type. Allowed types are: jpg,jpeg,png,gif,webp,mp4,avif,docx,pdf,svg,webm,xlsx,xls'), false);
  }

  callback(null, true);
};
