import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('message')
export class Message extends BaseEntity {
  @Column()
  content: string;

  @Column({ name: 'sender_uuid' })
  senderUuid: string;

  @Column({ name: 'chat_room_id' })
  chatRoomId: number;
}
