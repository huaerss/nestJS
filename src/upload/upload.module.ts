import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 上传文件的存储方式
        destination: join(__dirname, '../../public/images'), // 上传文件的存储目录
        filename: (_, file, cb) => {
          // 上传文件的文件名
          const filename = file.originalname; // 保留原文件名
          cb(null, filename); // 保存文件
        },
      }),
    }),
  ],
})
export class UploadModule {}
