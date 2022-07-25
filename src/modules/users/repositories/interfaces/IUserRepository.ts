import { User } from '@prisma/client';
import { Session } from '../../../../shared/types/Session';
import { CreateUserDTO } from '../../dtos/CreteUserDTO';

export interface IUserRepository {
    create({name, email, password}: CreateUserDTO): Promise<User>
    findByEmail(email: string): Promise<User>
    findById(id: string): Promise<User>
}
