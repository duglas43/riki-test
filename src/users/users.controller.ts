import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RolesAllowed } from 'src/auth/decorator';
import { PREDEFINE_ROLES } from 'src/roles/enums';
import { GetUser } from 'src/auth/decorator';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @RolesAllowed([PREDEFINE_ROLES.ADMIN])
  @ApiOkResponse({ type: UserDto, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @ApiOkResponse({ type: UserDto })
  findMe(@GetUser() user: UserDto) {
    return new UserDto(user);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
