import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('4Dist API')
    .setDescription('4Dist API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
  app.useWebSocketAdapter(new WsAdapter(app));
  //app.useBodyParser('application/json');
  await app.listen(3000);
}
bootstrap();
