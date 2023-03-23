export interface IUser {
    name: string;
    age: number;
    address: string;
    email: string;
    photoUrl: string;
    phone: string;
}
export interface IUserInput extends IUser {
    id: number;
    password: string;
}
