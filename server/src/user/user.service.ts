import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const exists = await this.userRepository.findOne({
      where: { nickname: dto.nickname },
    });
    if (exists) {
      throw new ConflictException('이미 사용 중인 닉네임입니다.');
    }
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  async checkDuplicate(nickname: string): Promise<boolean> {
    const exists = await this.userRepository.findOne({
      where: { nickname },
    });
    return !!exists;
  }
}
