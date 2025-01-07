import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // 특정 채팅방 메시지 조회
  @Get('/:roomId')
  async getRoomMessages(@Param('roomId') roomId: number) {
    return this.messageService.getMessagesByRoomId(roomId);
  }

  // 메시지 전송
  @Post('/:roomId')
  async sendMessage(
    @Param('roomId') roomId: number,
    @Body() dto: SendMessageDto,
  ) {
    return this.messageService.sendMessage(roomId, dto);
  }
}
