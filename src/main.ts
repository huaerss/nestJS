import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';

function GobalMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('全局中间件');
  next();
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets('public');
  app.use(GobalMiddleware);
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
