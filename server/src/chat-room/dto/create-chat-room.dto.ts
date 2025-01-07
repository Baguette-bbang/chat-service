import { IsString, MaxLength, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateChatRoomDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10, { message: '채팅방 이름은 10자 이내로 입력해주세요.' })
  name: string;

  @IsUUID()
  @IsNotEmpty()
  creatorUuid: string;
}
