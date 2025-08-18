import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'messages' })
export class Messages {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 120})
    content: string;
}
