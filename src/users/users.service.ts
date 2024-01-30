import { Injectable } from '@nestjs/common';
import { UserDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity)
    private userEntity: typeof UserEntity,
  ) {}

  async findAll() {
    const users = await this.userEntity.findAll();
    return users.map((user) => new UserDto(user));
  }

  async findOne(id: number) {
    const user = await this.userEntity.findByPk(id);
    return new UserDto(user);
  }
}
