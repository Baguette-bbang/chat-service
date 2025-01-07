import { IsString, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  @IsNotEmpty()
  senderUuid: string;

  @IsNumber()
  @IsNotEmpty()
  chatRoomId: number;
}
