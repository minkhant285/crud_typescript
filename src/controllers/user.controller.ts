import { Request, Response } from 'express';
import { IUser } from '../models/user.model';
import { UserService } from '../services/user.service';

let userService = new UserService();
//get all users
const getUsers = async (req: Request, res: Response) => {
    let users: IUser[] = await userService.selectUsers();
    return res.status(200).json({
        data: users,
        status: res.statusCode
    });
};

//get user with id
const getUser = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let user: IUser | null = await userService.selectUserById(Number.parseInt(id));
    return res.status(200).json({
        data: user,
        status: res.statusCode
    });
};

// updating a user
const updateUser = async (req: Request, res: Response) => {
    let id: string = req.params.id; // get the user id from the req.params
    let body: IUser = req.body ?? null; // get the data from req.body
    let updated = await userService.updateUser(Number.parseInt(id), body);
    return res.status(204).json({
        data: updated,
        status: res.statusCode
    });
};

// deleting a user
const deleteUser = async (req: Request, res: Response) => {
    let id: string = req.params.id; // get the user id from req.params
    let deleted = await userService.deleteUser(Number.parseInt(id));
    return res.status(204).json({
        data: deleted,
        status: res.statusCode
    });
};

// adding a user
const addUser = async (req: Request, res: Response) => {
    // get the data from req.body
    let body: IUser = req.body;
    let created = await userService.createUser(body);
    // return response
    return res.status(201).json({
        data: created,
        status: res.statusCode
    });
};

export default { getUsers, getUser, updateUser, deleteUser, addUser };