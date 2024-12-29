import { IsString, MaxLength, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(8, { message: '닉네임은 최대 8자까지 가능합니다.' })
  @MinLength(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
  @Matches(/^[가-힣a-zA-Z0-9]+$/, {
    message: '닉네임은 한글, 영문, 숫자만 허용됩니다.',
  })
  nickname: string;
}
