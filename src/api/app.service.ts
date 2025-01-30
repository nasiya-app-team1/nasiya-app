import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'src/config';
import { logger, UUIDInterceptor } from 'src/infrastructure';

export default class Application {
  private static readonly logger = new Logger(Application.name);

  public static async main(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.enableCors({ origin: '*' });

    const apiPrefix = 'api/v1';
    app.setGlobalPrefix(apiPrefix);

    const swaggerConfig = new DocumentBuilder()
      .setTitle('Base app')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        in: 'Header',
      })
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

    const swaggerEndpoint = `${apiPrefix}/docs`;
    SwaggerModule.setup(swaggerEndpoint, app, swaggerDocument);

    const port = config.APP_PORT || 3000;
    const environment = config.NODE_ENV || 'development';
    const logLevels: LogLevel[] =
      environment === 'production'
        ? ['error']
        : ['log', 'error', 'warn', 'debug', 'verbose'];

    app.useLogger(logLevels);
    app.useGlobalInterceptors(new UUIDInterceptor());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    await app.listen(port, () => {
      logger.info(`Server is running on http://localhost:${port}/${apiPrefix}`);
    });
  }
}
