import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 회원가입
  async createUser(dto: CreateUserDto): Promise<User> {
    const userIdExists = await this.userRepository.findOne({
      where: { userId: dto.userId },
    });

    const nicknameExists = await this.userRepository.findOne({
      where: { nickname: dto.nickname },
    });

    if (userIdExists) {
      throw new ConflictException('이미 사용 중인 아이디입니다.');
    }
    if (nicknameExists) {
      throw new ConflictException('이미 사용 중인 닉네임입니다.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      userId: dto.userId,
      nickname: dto.nickname,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  // 로그인
  async login(
    dto: LoginUserDto,
  ): Promise<{ userUuid: string; nickname: string; token: string }> {
    const user = await this.userRepository.findOne({
      where: { userId: dto.userId },
    });

    if (!user) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');
    }

    const isPasswordMatching = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');
    }

    // userUuid와 nickname도 반환
    return {
      userUuid: user.userUuid,
      nickname: user.nickname,
      token: 'jwt-token-example', // 추후 실제 JWT로 대체
    };
  }

  // 아이디 중복 체크
  async checkDuplicateUserId(userId: string): Promise<boolean> {
    const exists = await this.userRepository.findOne({
      where: { userId },
    });
    return !!exists;
  }

  // 닉네임 중복 체크
  async checkDuplicateNickname(nickname: string): Promise<boolean> {
    const exists = await this.userRepository.findOne({
      where: { nickname },
    });
    return !!exists;
  }
}
