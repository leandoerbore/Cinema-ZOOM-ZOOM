import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');

  app.useGlobalPipes(new ValidationPipe())

  const url = 'https://pathofexilebota.herokuapp.com/'
  app.enableCors({
    origin: [url],
    allowedHeaders: ['content-type', 'authorization', 'Access-Control-Allow-Origin']
  })

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Cinema ZOOM-ZOOM')
    .setDescription('Документация REST API ')
    .setVersion('1.0.0')
    .addTag('cinema')
    .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  const port = process.env.PORT;
  await app.listen(port || 12345);
}
bootstrap();
