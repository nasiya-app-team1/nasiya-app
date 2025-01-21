import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvService } from 'src/config/config.service';
import { Logger, LogLevel } from '@nestjs/common';

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
    SwaggerModule.setup(apiPrefix, app, swaggerDocument);

    const envService = app.get(EnvService);
    const port = envService.get('PORT') || 4200;

    const environment = process.env.NODE_ENV || 'development';
    const logLevels: LogLevel[] =
      environment === 'production'
        ? ['error']
        : ['log', 'error', 'warn', 'debug', 'verbose'];

    app.useLogger(logLevels);

    await app.listen(port, () => {
      Application.logger.log(
        `Server is running on http://localhost:${port}/${apiPrefix}`,
      );
    });
  }
}
