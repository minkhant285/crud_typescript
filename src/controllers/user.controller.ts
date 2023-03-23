import { Request, Response } from 'express';
import { IUser, IUserInput } from '../models/user.model';
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
    let id: string = req.params.id || '0';
    if (id === undefined) {
        return res.status(404).json({
            data: 'no data'
        })
    } else {
        let user: IUser | null = id ? await userService.selectUserById(Number.parseInt(id)) : null;
        return res.status(200).json({
            data: user,
            status: res.statusCode
        });

    }
};

const searchUser = async (req: Request, res: Response) => {
    let name: string = req.params.name || '';
    let users: IUser[] | [] = await userService.searchUserByName(name);
    return res.status(200).json({
        data: users,
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
    let body: IUserInput = req.body;
    let created = await userService.createUser(body);
    // return response
    return res.status(201).json({
        data: created,
        status: res.statusCode
    });
};

const uploadPhoto = async (req: Request, res: Response) => {
    try {
        userService.updatePhoto(Number.parseInt(req.params.id), req.file?.filename.toString() || '');
        res.status(200).json({
            status: "success",
            message: "File created successfully!!",
        });
    } catch (error) {
        res.json({
            error,
        });
    }
}

export default { getUsers, getUser, updateUser, deleteUser, addUser, uploadPhoto, searchUser };