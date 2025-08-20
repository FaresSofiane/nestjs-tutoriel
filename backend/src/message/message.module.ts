import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './message.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Messages])],
  providers: [MessageService],
  controllers: [MessageController]
})
export class MessageModule {}
