import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { UserEntity, UserRoleEntity } from 'src/users/entities';

@Table({
  tableName: 'Role',
})
export class RoleEntity extends Model {
  @Column
  name: string;

  @Column
  description: string;

  @BelongsToMany(() => UserEntity, () => UserRoleEntity, 'roleId', 'userId')
  users: UserEntity[];
}
