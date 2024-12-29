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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async signup(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get('/check')
  async checkNickname(@Query('nickname') nickname: string) {
    const isDuplicate = await this.userService.checkDuplicate(nickname);
    if (isDuplicate) {
      throw new ConflictException('닉네임이 중복되었습니다.');
    }
    return { message: '사용 가능한 닉네임입니다.' };
  }
}
