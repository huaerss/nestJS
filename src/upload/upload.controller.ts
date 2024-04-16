import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file);
    return '上传文件';
  }
}
