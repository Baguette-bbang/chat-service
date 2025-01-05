import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from './chat-room.entity';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
  ) {}

  // 채팅방 생성
  async createRoom(dto: CreateChatRoomDto): Promise<ChatRoom> {
    const chatRoom = this.chatRoomRepository.create({
      name: dto.name,
      creatorUuid: dto.creatorUuid,
    });
    return await this.chatRoomRepository.save(chatRoom);
  }

  // 채팅방 삭제
  async deleteRoom(roomId: number): Promise<void> {
    const result = await this.chatRoomRepository.delete(roomId);
    if (result.affected === 0) {
      throw new NotFoundException('존재하지 않는 채팅방입니다.');
    }
  }

  // 채팅방 리스트 조회
  async getChatRooms(
    sortBy: 'createdAt' | 'participantCount',
    order: 'ASC' | 'DESC',
  ): Promise<ChatRoom[]> {
    return await this.chatRoomRepository.find({
      order: { [sortBy]: order },
    });
  }
}
