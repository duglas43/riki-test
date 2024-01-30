import { Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'UserRole',
})
export class UserRoleEntity extends Model {}
