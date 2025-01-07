import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { SendMessageDto } from './dto/send-message.dto';
import { ChatRoom } from 'src/chat-room/chat-room.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 특정 채팅방 메시지 조회
  async getMessagesByRoomId(chatRoomId: number): Promise<Message[]> {
    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect(User, 'user', 'user.userUuid = message.senderUuid')
      .where('message.chatRoomId = :chatRoomId', { chatRoomId })
      .select([
        'message.content AS content',
        'message.senderUuid AS senderUuid',
        'user.nickname AS nickname',
      ])
      .orderBy('message.createdAt', 'ASC')
      .getRawMany();
  }

  // 메시지 전송
  async sendMessage(chatRoomId: number, dto: SendMessageDto): Promise<Message> {
    const message = this.messageRepository.create({
      content: dto.content,
      senderUuid: dto.senderUuid,
      chatRoomId: chatRoomId,
    });

    return this.messageRepository.save(message);
  }
}
