import { User } from '@prisma/client';
import { Session } from '../../../../shared/types/Session';
import { CreateUserDTO } from '../../dtos/CreteUserDTO';
import { UpdateUserDTO } from '../../dtos/UpdateUserDTO';

export interface IUserRepository {
    create({name, email, password}: CreateUserDTO): Promise<User>;
    update({name, email, password}: UpdateUserDTO, id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}
