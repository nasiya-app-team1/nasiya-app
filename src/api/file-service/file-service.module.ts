import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
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
})
export class FileModule {}
