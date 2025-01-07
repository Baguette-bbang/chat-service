import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('chat-room')
export class ChatRoom extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'creator_uuid' })
  creatorUuid: string;

  @Column({ default: 0 })
  participantCount: number;
}
