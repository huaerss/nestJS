import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';
import { filter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';

function GobalMiddleware(req: Request, res: Response, next: NextFunction) {
  // 配置白名单路径
  const whiteList = ['/auth', '/auth/profile'];
  if (whiteList.includes(req.path)) {
    return next();
  }

  next();
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets('public');
  app.use(GobalMiddleware);
  app.useGlobalFilters(new filter());
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: 'gyh',
      // rolling: true, // 每次请求都重新设置cookie
      // resave: false, // 强制保存session
      name: 'gyh_session',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 设置session的有效时间 24小时
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
