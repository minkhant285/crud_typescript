import { AppDataSource } from "../db/data-source";
import { User } from "../db/entities/user.entity";
import { IUser, IUserInput } from "../models/user.model";
import { Repository, UpdateResult, DeleteResult, ILike } from "typeorm";

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    async selectUsers() {
        return await this.userRepository.find();
    }

    async selectUserById(id: number) {
        return await this.userRepository.findOne({ where: { id } });
    }

    async searchUserByName(name: string) {
        return await this.userRepository.find({ where: { name: ILike(`%${name}%`) } });
    }

    async createUser(userData: IUserInput): Promise<IUser> {
        return await this.userRepository.save(userData);
    }

    async updateUser(id: number, userData: IUser): Promise<UpdateResult> {
        return await this.userRepository.update(id, userData);
    }

    async updatePhoto(id: number, photoUrl: string): Promise<UpdateResult> {
        return await this.userRepository.createQueryBuilder()
            .update(User)
            .set({
                photoUrl: photoUrl,
            })
            .where("id = :id", { id })
            .execute()
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}