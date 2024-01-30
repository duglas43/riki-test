import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UserDto } from '../users/dto';
import { SignInDto, SignUpDto, AccessDto, RefreshDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserEntity)
    private userEntity: typeof UserEntity,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async googleLogin(userDto: UserDto) {
    const user = await this.userEntity.findOne({
      where: { email: userDto.email },
    });
    if (user) {
      const payload = { email: user.email, id: user.id };
      const access_token = await this.signAccessToken(payload);
      const refresh_token = await this.signRefreshToken(payload);
      return {
        access_token,
        refresh_token,
      };
    }
    const newUser = await this.userEntity.create({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    await newUser.$set('roles', [3]);
    const payload = { email: newUser.email, id: newUser.id };
    const access_token = await this.signAccessToken(payload);
    const refresh_token = await this.signRefreshToken(payload);
    return {
      access_token,
      refresh_token,
    };
  }
  async signUp(dto: SignUpDto) {
    const candidate = await this.userEntity.findOne({
      where: { email: dto.email },
    });
    if (candidate) {
      throw new BadRequestException(
        `User with email ${dto.email} already exists`,
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userEntity.create({
      ...dto,
      passwordHash: hashPassword,
    });
    await user.$set('roles', [3]);
    const refresh_token = await this.signRefreshToken({
      id: user.id,
      email: user.email,
    });
    await user.update({ refreshToken: refresh_token });
    const access_token = await this.signAccessToken({
      id: user.id,
      email: user.email,
    });
    return {
      access_token,
      refresh_token,
    };
  }

  async signIn(dto: SignInDto) {
    const user = await this.userEntity.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new ForbiddenException('Incorrect email or password');
    }
    const isCorrectPassword = bcrypt.compare(dto.password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new ForbiddenException('Incorrect email or password');
    }
    const access_token = await this.signAccessToken({
      id: user.id,
      email: user.email,
    });
    const refresh_token = await this.signRefreshToken({
      id: user.id,
      email: user.email,
    });
    await user.update({ refreshToken: refresh_token });
    return {
      access_token,
      refresh_token,
    };
  }

  async refresh(dto: RefreshDto) {
    const user = await this.userEntity.findOne({
      where: { refreshToken: dto.refresh_token },
    });
    if (!user) {
      throw new ForbiddenException('Incorrect refresh token');
    }
    const access_token = await this.signAccessToken({
      id: user.id,
      email: user.email,
    });
    const refresh_token = await this.signRefreshToken({
      id: user.id,
      email: user.email,
    });
    await user.update({ refresh_token });
    return {
      access_token,
      refresh_token,
    };
  }

  async logout(userId: number) {
    const user = await this.userEntity.findByPk(userId);
    await user.update({ refreshToken: null });
    return new AccessDto(null);
  }

  async signAccessToken(dto: { id: number; email: string }) {
    const payload = { email: dto.email, sub: dto.id };
    const secret = this.configService.get('JWT_ACCESS_TOKEN_SECRET');
    return this.jwtService.sign(payload, {
      expiresIn: '30m',
      secret,
    });
  }

  async signRefreshToken(dto: { id: number; email: string }) {
    const payload = { email: dto.email, sub: dto.id };
    const secret = this.configService.get('JWT_REFRESH_TOKEN_SECRET');
    return this.jwtService.sign(payload, {
      expiresIn: '365d',
      secret,
    });
  }
}
