import { Reflector } from '@nestjs/core';

export const RolesAllowed = Reflector.createDecorator<number[]>();
