import { User } from '@prisma/client';
import { ICreateUserDTO } from '../../dtos/ICreteUserDTO';

export interface IUserRepository {
    create({name, email, password}: ICreateUserDTO): Promise<User>
    findByEmail(email: string): Promise<User>
}
