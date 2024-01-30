import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  email: string | null;

  @ApiPropertyOptional()
  firstName: string | null;

  @ApiPropertyOptional()
  lastName: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date | null;

  constructor(model: any) {
    this.id = model?.id;
    this.firstName = model?.firstName;
    this.lastName = model?.lastName;
    this.email = model?.email;
    this.createdAt = model?.createdAt;
    this.updatedAt = model?.updatedAt;
  }
}
