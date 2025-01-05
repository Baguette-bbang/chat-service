import { BaseEntity } from 'src/common/base.entity';
import { Entity, Column, Generated } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, name: 'user_uuid' })
  @Generated('uuid')
  userUuid: string;

  @Column({ unique: true })
  userId: string; // 아이디

  @Column({ unique: true })
  nickname: string; // 닉네임

  @Column()
  password: string;
}
