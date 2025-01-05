import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';

@Controller('chat-room')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  // 채팅방 생성
  @Post()
  async createRoom(@Body() dto: CreateChatRoomDto) {
    return await this.chatRoomService.createRoom(dto);
  }

  // 채팅방 삭제
  @Delete(':id')
  async deleteRoom(@Param('id') id: number) {
    return await this.chatRoomService.deleteRoom(id);
  }

  // 채팅방 리스트 조회 (정렬 옵션 포함)
  @Get()
  async getRooms(
    @Query('sortBy')
    sortBy: 'createdAt' | 'participantCount' = 'participantCount',
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',
  ) {
    return await this.chatRoomService.getChatRooms(sortBy, order);
  }
}
