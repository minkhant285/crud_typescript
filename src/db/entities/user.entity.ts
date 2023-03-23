import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    photoUrl: string;

}