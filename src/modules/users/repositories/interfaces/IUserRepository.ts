import { User } from '@prisma/client';
import { CreateUserDTO } from '../../dtos/CreteUserDTO';

export interface IUserRepository {
    create({name, email, password}: CreateUserDTO): Promise<User>
    findByEmail(email: string): Promise<User>
}
