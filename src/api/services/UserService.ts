import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<User[]> {
        this.log.info('Find all users');
        return this.userRepository.find();
    }

    public findOne(id: string): Promise<User | undefined> {
        this.log.info('Find one user');
        return this.userRepository.findOne({ id });
    }

    public create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    public update(id: string, user: User): Promise<User> {
        this.log.info('Update a user');
        user.id = id;
        return this.userRepository.save(user);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a user');
        await this.userRepository.delete(id);
        return;
    }

}