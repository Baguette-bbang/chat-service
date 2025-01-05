import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  // 아이디 (userId)
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: '아이디는 최소 4자 이상이어야 합니다.' })
  @MaxLength(12, { message: '아이디는 최대 12자까지 가능합니다.' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: '아이디는 영문자와 숫자만 허용됩니다.',
  })
  userId: string;

  // 닉네임 (nickname)
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
  @MaxLength(8, { message: '닉네임은 최대 8자까지 가능합니다.' })
  @Matches(/^[가-힣a-zA-Z0-9]+$/, {
    message: '닉네임은 한글, 영문, 숫자만 허용됩니다.',
  })
  nickname: string;

  // 비밀번호 (password)
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @MaxLength(20, { message: '비밀번호는 최대 20자까지 가능합니다.' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).*$/, {
    message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
  })
  password: string;
}
