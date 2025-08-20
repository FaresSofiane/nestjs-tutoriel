import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 120, unique: true})
    username: string;

    @Column()
    password: string;
    
    @CreateDateColumn()
    createdAt: Date;
}
