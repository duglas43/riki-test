import {
  Column,
  Model,
  Table,
  IsEmail,
  BelongsToMany,
} from 'sequelize-typescript';
import { RoleEntity } from '../../roles/entities/role.entity';
import { UserRoleEntity } from './';

@Table({
  tableName: 'User',
})
export class UserEntity extends Model {
  @IsEmail
  @Column
  email: string | null;

  @Column
  passwordHash: string | null;

  @Column
  refreshToken: string | null;

  @Column
  firstName: string | null;

  @Column
  lastName: string | null;

  @BelongsToMany(() => RoleEntity, () => UserRoleEntity, 'userId', 'roleId')
  roles: RoleEntity[];
}
