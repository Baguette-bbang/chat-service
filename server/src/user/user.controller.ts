import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // 회원가입
  @Post('/signup')
  async signup(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  // 아이디 중복 검사
  @Get('/check/userId')
  async checkUserId(@Query('userId') userId: string) {
    const isDuplicate = await this.userService.checkDuplicateUserId(userId);
    if (isDuplicate) {
      throw new ConflictException('아이디가 이미 사용 중입니다.');
    }
    return { message: '사용 가능한 아이디입니다.' };
  }

  // 닉네임 중복 검사
  @Get('/check/nickname')
  async checkNickname(@Query('nickname') nickname: string) {
    const isDuplicate = await this.userService.checkDuplicateNickname(nickname);
    if (isDuplicate) {
      throw new ConflictException('닉네임이 이미 사용 중입니다.');
    }
    return { message: '사용 가능한 닉네임입니다.' };
  }

  // 로그인
  @Post('/login')
  async login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }
}
