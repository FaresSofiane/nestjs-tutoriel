import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule],
  providers: [MediaService],
  controllers: [MediaController],
  exports:[MediaService]
})
export class MediaModule {}
