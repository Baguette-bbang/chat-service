import { IsString, MinLength, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MinLength(4, { message: '아이디는 최소 4자 이상이어야 합니다.' })
  @MaxLength(12, { message: '아이디는 최대 12자까지 가능합니다.' })
  userId: string;

  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  password: string;
}
