import { SetMetadata } from '@nestjs/common';
import { ROLES, ROLE_TYPE } from '@utils/constants';

export const Role = (role: ROLE_TYPE) => SetMetadata(ROLES, role);
