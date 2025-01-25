import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileService } from './file-service.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/api/v1/static',
    }),
  ],
  controllers: [],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
