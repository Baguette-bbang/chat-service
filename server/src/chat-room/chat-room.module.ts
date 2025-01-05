import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './chat-room.entity';
import { ChatRoomController } from './chat-room.controller';
import { ChatRoomService } from './chat-room.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  controllers: [ChatRoomController],
  providers: [ChatRoomService],
})
export class ChatRoomModule {}
