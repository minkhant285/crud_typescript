import { AppDataSource } from "../db/data-source";
import { User } from "../db/entities/user.entity";
import { IUser } from "../models/user.model";
import { Repository, UpdateResult, DeleteResult } from "typeorm";

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    async selectUsers(): Promise<IUser[]> {
        return await this.userRepository.find();
    }

    async selectUserById(id: number): Promise<IUser | null> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async createUser(userData: IUser): Promise<IUser> {
        return await this.userRepository.save(userData);
    }

    async updateUser(id: number, userData: IUser): Promise<UpdateResult> {
        return await this.userRepository.update(id, userData);
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}